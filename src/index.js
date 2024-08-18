import express from 'express';
import { createServer } from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { fileURLToPath } from 'url';
import { hostname } from 'node:os';
import cors from 'cors'; // Import the cors package
import axios from 'axios';
import { JSDOM } from 'jsdom'; // For parsing HTML

const publicPath = fileURLToPath(new URL('./public', import.meta.url));
const bare = createBareServer('/bare/');
const app = express();

// Enable CORS for all origins
app.use(cors());

// Load our publicPath first and prioritize it over UV.
app.use(express.static(publicPath));
// Load vendor files last.
app.use('/uv/', express.static(uvPath));


// Define the /siteinfo route
app.get('/siteinfo', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL parameter' });
  }

  try {
    // Fetch the HTML content of the page
    const response = await axios.get(url);
    const html = response.data;

    // Parse the HTML content to extract the title
    const dom = new JSDOM(html);
    const title = dom.window.document.querySelector('title')?.textContent || 'No title found';

    res.json({ title });
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

const server = createServer();

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || '');

if (isNaN(port)) port = 8080;

server.on('listening', () => {
  const address = server.address();

  console.log('Listening on:');
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${address.family === 'IPv6' ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});
