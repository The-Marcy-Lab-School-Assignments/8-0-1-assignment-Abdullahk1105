
const express = require('express');

// Import the path module to construct the absolute 
// path to the static assets folder
const path = require('path');

// 1. Import Path

// 2. Define a path to the dist folder

const app = express();
const pathToDistFolder =  path.join(__dirname, '../vite-project/dist')

const serveStatic = express.static(pathToDistFolder)

/////////////////////
// Controllers
/////////////////////

// 3. Create the logRoutes middleware

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  // variable holding time
  const time = new Date().toLocaleString();

  // console.logs the requsted method and orignal url
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  // move to the next controller 
  next(); // Passes the request to the next middleware/controller
};


// 4. Create the serveStatic middleware


// "Response" controllers send data to the client
// const serveData = (req, res, next)
const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send(`hello ${name}`);
}

////////////////////////
// Routes
////////////////////////

// 5. Use both middleware

app.use(logRoutes);
app.use(serveStatic)
app.get('/api/hello', serveHello);
// app.get('/api/data', serveData);


const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});