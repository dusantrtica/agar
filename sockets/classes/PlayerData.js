class PlayerData {
  constructor(playerName, settings) {
    this.name = playerName;
    const { worldHeight, worldWidth } = settings;
    this.locX = Math.floor(worldWidth * Math.random() + 100);
    this.locY = Math.floor(worldHeight * Math.random() + 100);
    this.radius = 5;
    this.color = this.getRandomColor();
    this.score = 6;
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 200 + 50);
    const g = Math.floor(Math.random() * 200 + 50);
    const b = Math.floor(Math.random() * 200 + 50);

    return `rgb(${r},${g},${b})`;
  }
}

module.exports = PlayerData;
