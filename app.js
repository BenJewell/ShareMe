const express = require('express');
const path = require("path");
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');
const { Server } = require("socket.io");


var https_options = {
  key: fs.readFileSync("ssl/privkey.pem"),
  cert: fs.readFileSync("ssl/fullchain.pem"),
  ca: [
    //fs.readFileSync('ssl/chain.pem'),
    //fs.readFileSync('ssl/fullchain.pem')
  ]
}

const server = https.createServer(https_options, app);
const io = new Server(server);

// app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'frontend')));

// app.get('/', (req, res) => {
//   //res.send('<h1>Hello world</h1>');
//   res.sendFile(__dirname + '/frontend/*');
// });

function generateID() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('requestID', () => {
        socket.emit('ID', generateID())
      });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});