// src/scenes/BootScene.js

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Preload any assets if needed
  }

  create() {
    // Create a "Start Game" button
    const startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start Game', {
      font: '32px Arial',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    startButton.on('pointerdown', () => {
      // Resume AudioContext
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }

      // Start GameScene
      this.scene.start('GameScene');

      // Destroy the button
      startButton.destroy();
    });
  }
}
