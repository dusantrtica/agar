// Where all our main stuff go
const io = require('../server').io;
const Orb = require('./classes/Orb');

let orbs = [];

initGame();
console.log('hello');

io.on('connection', (socket) => {
    console.log('connected')
    socket.emit('init', {orbs})
})

function initGame() {
    for(let i = 0; i < 500; i++) {
        orbs.push(new Orb());
    }
}

module.exports = io;
