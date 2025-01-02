/**********************************************************
 * main.js
 * A single-file Phaser 3 setup with two scenes:
 *   1) MainScene
 *   2) UIScene
 * 
 * Ensures the code is not duplicated 
 * and classes are declared only once.
 **********************************************************/

// If needed for tasks, keep a global array:
window.globalTasks = window.globalTasks || [];

/* ---------------------------
 * MainScene
 * --------------------------- */
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Dummy player sprite
    const playerCanvas = this.textures.createCanvas('player_dummy', 64, 64);
    const pctx = playerCanvas.getContext();
    pctx.fillStyle = '#0000ff';
    pctx.fillRect(16, 16, 32, 32);
    pctx.fillStyle = '#ff0000';
    pctx.fillRect(24, 8, 16, 16);
    playerCanvas.refresh();

    // Dummy vendor sprite
    const vendorCanvas = this.textures.createCanvas('vendor_dummy', 32, 32);
    const vctx = vendorCanvas.getContext();
    vctx.fillStyle = '#00ff00';
    vctx.fillRect(0, 0, 32, 32);
    vendorCanvas.refresh();
  }

  create() {
    this.player = this.physics.add.sprite(400, 300, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    this.vendor = this.physics.add.staticSprite(200, 200, 'vendor_dummy');

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(
      this.player,
      this.vendor,
      () => {
        console.log('Vendor overlapped');
      },
      null,
      this
    );

    // Launch the UI scene
    this.scene.launch('UIScene');
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }
}

/* ---------------------------
 * UIScene
 * --------------------------- */
class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.add.text(10, 10, 'UIScene - Task List or Info', 
      { fontSize: '16px', fill: '#000' }
    );
  }
}

/* ---------------------------
 * Phaser Config
 * --------------------------- */
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [ MainScene, UIScene ]
};

/* ---------------------------
 * Start the Game
 * --------------------------- */
new Phaser.Game(config);
