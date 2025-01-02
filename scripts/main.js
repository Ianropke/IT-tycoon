// main.js

// MainScene handles the top-down movement and vendor overlap logic
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
    // Player sprite with basic physics
    this.player = this.physics.add.sprite(400, 300, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // A static vendor sprite
    this.vendor = this.physics.add.staticSprite(200, 200, 'vendor_dummy');

    // Overlap detection
    this.physics.add.overlap(
      this.player,
      this.vendor,
      this.onVendorOverlap,
      null,
      this
    );

    // Cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create new tasks every few seconds
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        const task = createRandomTask();
        window.globalTasks.push(task);
        console.log('New Task:', task.description);
      },
      loop: true
    });

    // Launch UI Scene
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

  onVendorOverlap() {
    // Could open a vendor UI or check SLA
    console.log('Vendor overlapped. Possibly call openVendorUI(this) from vendor.js');
  }
}

// Phaser config that references both MainScene & UIScene
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

// Launch the game
new Phaser.Game(config);
