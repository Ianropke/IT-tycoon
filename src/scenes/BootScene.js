// src/scenes/BootScene.js

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Preload any assets if needed in the future
  }

  create() {
    // Add a start button for user interaction to handle AudioContext
    const startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start Game', {
      font: '32px Arial',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    startText.on('pointerdown', () => {
      this.scene.start('GameScene');
      this.scene.launch('UIScene');

      // Resume Audio Context if needed
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }
      
      startText.destroy(); // Remove the start button after starting the game
    });
  }
}
