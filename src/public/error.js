"use strict";
const error = document.getElementById("uv-error");
const gif = document.getElementById('register-gif');
const errorCode = document.getElementById("uv-error-code");

// Is the service worker registered?
if (location.pathname.startsWith(__uv$config.prefix)) {
  error.textContent = "The service worker is not registered. We will now make an attempt to register it.";

  // Register the service worker
  try {
    registerSW();
    location.reload();
  } catch (err) {
    gif.style.display = 'none';
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
  }
} else {
  gif.style.display = 'none';
  errorCode.textContent = "There was an issue with Infrared. You can get more information about this error in the console. It is likely that this is a network" +
  "error. However please do not report this until you obtain the error code."
}


