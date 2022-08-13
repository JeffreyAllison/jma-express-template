// server js allows the app to serve HTTP requests

const http = require('node:http');
const app = require('./lib/app');
const pool = require('./lib/utils/pool');

// these constants provider the server file with the data necessary to make the http request - app links the server to the app routes, pool links the server to the data being served.

const PORT = process.env.PORT || 7890;

// this assigns the server port, set to be 7890 or whatever the env file port is set to.

const server = http.createServer(app);

// this constant is assigned the server site

server.listen(PORT, () => {
  console.log('Server running', server.address());
});

// this prompts our assigned server to listen for the specified port and route to the http site

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
