// server.js
"use strict"
const {promises: {readFile}} = require("fs");
const net = require('net');
// const fs = require('fs')

const server = net.createServer();

// add this line after server is created, before listen is called
server.on('connection', (client) => {
  console.log('New client connected!');
  client.write("Hello! Please enter a query starting with '[SEARCH]' to search for a file by filename.");
  client.setEncoding('utf8'); // interpret data as text

  
  client.on('data', (data) => {
    console.log('Message from client: ', data)
    if (data.substring(0,8) === "[SEARCH]") {
      console.log("Search query detected.");

      readFile(`./data/${data.substring(8)}`).then(fileBuffer => { //`./data/$[data.substring(8)}`
        client.write(`Here are your lyrics: ${fileBuffer.toString()}`);
      }).catch(error => {
        client.write(error.message);
        console.error(error);
        process.exit(1);
      });
    }
  });

});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

