// src/scenes/BootScene.js
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Preload any assets if needed in the future
  }

  create() {
    this.scene.start('GameScene');
    this.scene.launch('UIScene');
  }
}
