/***************************************************************
 * main.js
 * 
 * Sets up the Phaser game config, creates global references,
 * and defines the core MainScene that handles player movement
 * and vendor interactions.
 ***************************************************************/

// A global array to hold tasks (populated in tasks.js)
window.globalTasks = window.globalTasks || [];

// Phaser game configuration
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

// Initialize the Phaser game
new Phaser.Game(config);

/***************************************************************
 * MainScene Class
 ***************************************************************/
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Create a dummy texture for player
    const playerCanvas = this.textures.createCanvas('player_dummy', 64, 64);
    const pctx = playerCanvas.getContext();
    pctx.fillStyle = '#0000ff'; // Blue body
    pctx.fillRect(16, 16, 32, 32);
    pctx.fillStyle = '#ff0000'; // Red head
    pctx.fillRect(24, 8, 16, 16);
    playerCanvas.refresh();

    // Create a dummy texture for vendor
    const vendorCanvas = this.textures.createCanvas('vendor_dummy', 32, 32);
    const vctx = vendorCanvas.getContext();
    vctx.fillStyle = '#00ff00';
    vctx.fillRect(0, 0, 32, 32);
    vendorCanvas.refresh();
  }

  create() {
    // Player
    this.player = this.physics.add.sprite(400, 300, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Example vendor sprite
    this.vendor = this.physics.add.staticSprite(200, 200, 'vendor_dummy');

    // Cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Overlap detection for vendor
    this.physics.add.overlap(
      this.player,
      this.vendor,
      this.handleVendorOverlap,
      null,
      this
    );

    // Periodically create new tasks
    this.time.addEvent({
      delay: 5000,
      callback: this.generateRandomTask,
      callbackScope: this,
      loop: true
    });

    // Start the UI scene
    this.scene.launch('UIScene');
  }

  update() {
    // Simple top-down movement
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }

  // Vendor Overlap -> Possibly open a vendor negotiation UI or call vendor script
  handleVendorOverlap() {
    console.log('Player overlapped with vendor. Potential vendor interaction...');
    // We could call a function from vendor.js, e.g. openVendorUI(this);
  }

  // Example of generating a random task
  generateRandomTask() {
    // This function is defined in tasks.js
    const newTask = createRandomTask();
    window.globalTasks.push(newTask);

    console.log('New Task Generated:', newTask.description);
  }
}
