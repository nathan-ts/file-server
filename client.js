// client.js

const net = require('net');
const rl = require('readline');

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

const conn = net.createConnection({ 
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  console.log('Server: ', data);
  if (data.slice(0,6) === "ENOENT") {
    process.exit(1);
  }
});

conn.on('connect', () => {
  conn.write('Hello from client!');
});

let input = ""

stdin.on('data', data => {
  // console.log("\nreceived", data, input);
  if (data === '\u0003') {  // CTRL+C
    process.stdout.write(`\r`);
    process.exit(1);
  } 
  // else if (data.charCodeAt(0) === 127) {  // BACKSPACE
  //   input = input.slice(0,-1);
  //   process.stdout.write(`\r${input}`);
  // } 
  else if (data === '\u000d') { // ENTER
    conn.write(input);
    process.stdout.write(`\n`);
    input = "";
  } else {
    input += data;
    process.stdout.write(`${data}`);
  }
});


