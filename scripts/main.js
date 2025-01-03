// Main logic for handling tasks
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // Add player sprite
    this.player = this.add.rectangle(400, 300, 32, 32, 0x007aff);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Add locations
    this.locations = {
      backlog: this.add.rectangle(200, 100, 50, 50, 0xffa500), // Orange
      hospital: this.add.rectangle(600, 200, 50, 50, 0x00ff00), // Green
      infrastructure: this.add.rectangle(600, 400, 50, 50, 0xffff00), // Yellow
      infoSec: this.add.rectangle(200, 400, 50, 50, 0x0000ff), // Blue
      cyberSec: this.add.rectangle(400, 500, 50, 50, 0x00ffff), // Cyan
    };

    for (const loc in this.locations) {
      this.physics.add.existing(this.locations[loc], true);
    }

    // Keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Task logic
    createExampleTasks();
    this.activeTask = null;
  }

  update() {
    // Player movement
    const speed = 200;
    this.player.body.setVelocity(0);
    if (this.cursors.left.isDown) this.player.body.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.body.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.body.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.body.setVelocityY(speed);

    // Detect location interaction
    for (const locName in this.locations) {
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.locations[locName].getBounds())) {
        handleLocationInteraction(locName);
      }
    }
  }
}

function handleLocationInteraction(location) {
  if (location === 'backlog') {
    console.log('View backlog tasks');
  } else {
    console.log(`Visited ${location}`);
  }
}

// Task Example
function createExampleTasks() {
  window.globalTasks = [
    {
      id: '1',
      description: 'Critical Fix',
      steps: ['Hospital approval', 'Infrastructure verification', 'Document'],
      currentStep: 0,
      risk: 10,
      giver: 'infrastructure',
      status: 'New',
      committed: false,
    },
  ];
}
