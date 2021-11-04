'use strict';

var os = require('os');
var nodeStatic = require('node-static');
 const https = require('https'); 
var socketIO = require('socket.io')(https,{cors:{}}); 
const axios = require('axios');
const fs = require('fs'); 

var numVideoClient = 0;
//var numClientsMax = 2;

const options = { 
  key: fs.readFileSync('../certs/server.key'),
  cert: fs.readFileSync('../certs/server.crt')

}; 

///////////////////////////////////////////////
var fileServer = new(nodeStatic.Server)(); 
var express = require("express")();
var cors = require("cors");
express.use(cors({
  origin: '*',
  allowedHeaders: ['content-type', 'authorization', 'x-metadata', 'x-to'],
  exposedHeaders: ['content-type', 'content-disposition', 'x-metadata']
}));
let app = https.createServer(options,express, (req,res)=>{ 
  fileServer.serve(req, res); 
}).listen(3000); 

console.log('Started chating server...');

var io = socketIO.listen(app);

io.sockets.on('connection', function(socket) {
  
  console.log('connection ');
  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }
  //전반적인 message 이벤트
  socket.on('message', function(message) {
    var room = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
     
    io.sockets.in(room).emit('message', message);
  });
  
  //room 생성 및 조인 이벤트
  socket.on('create or join', function(room) {
    console.log('create or join ',room );
    
		
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s) (videoClients: ' + numVideoClient + ')');


    if (numClients === 0) {
      //room에
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      io.sockets.in(room).emit('created', room, socket.id);
    } else {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      io.sockets.in(room).emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');          
    }
  });

  socket.on('ipaddr', function() {
    var room = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
    
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          io.sockets.in(room).emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    var currentRoom = Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id);
 
    console.log('received bye (room: '+currentRoom + ")");
    socket.leave(currentRoom);

  });
});
