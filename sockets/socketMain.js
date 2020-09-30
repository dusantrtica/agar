// Where all our main stuff go
const { io } = require('../server');
const Orb = require('./classes/Orb');
const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');

const orbs = [];
const players = [];

const settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  // as the player gets bigger we need to zoom out
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();

io.on('connection', (socket) => {
  // a player has connected
  // make a playerconfig object
  let player = {};
  socket.on('init', (data) => {
    // add the player to the gamespaces
    socket.join('game');
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(data.playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);

    setInterval(() => {
      io.to('game').emit('tock', {
        players,
        player: { locX: player.playerData.locX, locY: player.playerData.locY },
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      });
    }, 33); // 30fps

    socket.emit('initReturn', { orbs });
    players.push(player);
  });

  socket.on('tick', (data) => {
    const { speed } = player.playerConfig;
    const xV = (player.playerConfig.xVector = data.xVector);
    const yV = (player.playerConfig.yVector = data.yVector);

    if (
      (player.playerData.locX < 5 && player.playerData.xVector < 0) ||
      (player.playerData.locX > 500 && xV > 0)
    ) {
      player.playerData.locY -= speed * yV;
    } else if (
      (player.playerData.locY < 5 && yV > 0) ||
      (player.playerData.locY > 500 && yV < 0)
    ) {
      player.playerData.locX += speed * xV;
    } else {
      player.playerData.locX += speed * xV;
      player.playerData.locY -= speed * yV;
    }
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i += 1) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
