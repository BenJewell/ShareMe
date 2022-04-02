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

const sockets = new Map();

function generateID() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

io.on('connection', (socket) => {
    console.log('a user connected');
    var ID = generateID()

    socket.on('requestID', () => {
        socket.emit('ID', ID)
        sockets.set(ID, socket)
        console.log("added", ID, "to the map")
      });

      socket.on('giveDestination', (ID, URL) => {
        ID = parseInt(ID, 10)
        console.log(`Got a URL of ${URL} for ID ${ID}`)
        console.log(sockets.get(ID), typeof(ID))
        // Next time: if undefined, we need to throw an error the the phone saying the client ID is wrong. Otherwise continue with the URL pass.
        //sockets.get(ID).emit('URL', URL)
      });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      sockets.delete(ID)
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});