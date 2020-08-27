// server.js is only for making of the socketio server and express servers

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
const socketio = require('socket.io');
const expressServer = app.listen(8000);
const io = socketio(expressServer);
const helmet = require('helmet');

app.use(helmet());

console.log('Express and socketio are listennin on port 8000');

module.exports = {
    app,
    io
}