// Where all our main stuff go
const { io } = require('../server');
const Orb = require('./classes/Orb');

const orbs = [];

initGame();

io.on('connection', (socket) => {
  socket.emit('init', { orbs });
});

function initGame() {
  for (let i = 0; i < 500; i += 1) {
    orbs.push(new Orb());
  }
}

module.exports = io;
