<p align="center"><img src="https://raw.githubusercontent.com/freedombrowser/Infrared/main/src/public/ir.png" height="200"></p>

<h1 align="center">Infrared</h1>


This is a simple front-end for the <a href="https://github.com/titaniumnetwork-dev/Ultraviolet">Ultraviolet</a> proxy. This new fork uses Ultraviolet 2.0.0 but we will soon upgrade to a later version. I reccomend that you do not host this yourself instead if you want to host a proxy, you should look into <a href="https://github.com/titaniumnetwork-dev/Ultraviolet-app">Ultraviolet-app</a> on which this package is based.

> [!WARNING]  
> By default the transport we use (TompHTTP Bare) is NOT encrypted!

For internal use this is how to run this package:
```sh
# Clone repo
git clone https://github.com/freedombrowser/Infrared-2.git
cd Infrared-2/

# Install dependencies
npm install

# Run Infrared
# Then specify a port (For Freedombrowser it's 7070)
PORT=7070 npm start
```
