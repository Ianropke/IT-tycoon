import GameScene from './scenes/GameScene.js';

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#f8f9fa',
  parent: 'game-container',
  scene: [GameScene],
};

new Phaser.Game(gameConfig);
