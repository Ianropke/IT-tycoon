import Task from '../objects/Task.js';
import UIManager from '../ui/UIManager.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.resources = {
      time: 100,
      budget: 500,
      personnel: 5,
    };

    this.tasks = [];
    this.activeTasks = [];
    this.completedTasks = [];
  }

  preload() {
    // Use a CORS-enabled placeholder service for dummy images
    this.load.image('player', 'https://dummyimage.com/32x32/000/fff.png&text=P'); // Player placeholder
    this.load.image('location', 'https://dummyimage.com/64x64/ccc/000.png&text=L'); // Location placeholder
  }

  create() {
    this.uiManager = new UIManager(this);

    this.add.text(10, 10, 'IT Tycoon MVP', { font: '20px Arial', fill: '#000' });

    // Player setup
    this.player = this.physics.add.sprite(400, 300, 'player').setScale(1);
    this.player.setCollideWorldBounds(true);

    // Keyboard input for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Locations setup
    this.locations = {
      Legal: this.createLocation(200, 150, 'Legal'),
      Infrastructure: this.createLocation(400, 150, 'Infrastructure'),
      Vendors: this.createLocation(600, 150, 'Vendors'),
    };

    // Generate initial tasks
    for (let i = 0; i < 3; i++) {
      const task = new Task(`Task ${i + 1}`, 'Low', 'Normal', 3, 50, 10, [
        'Legal',
        'Infrastructure',
        'Vendors',
      ]);
      this.tasks.push(task);
    }

    this.uiManager.updateUI(this.resources, this.tasks, this.activeTasks);

    // Track current task
    this.currentTask = null;
  }

  update() {
    this.handlePlayerMovement();

    // Check for interaction with locations
    Object.values(this.locations).forEach((location) => {
      if (
        Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          location.x,
          location.y
        ) < 50
      ) {
        this.handleLocationInteraction(location.name);
      }
    });

    this.uiManager.updateUI(this.resources, this.tasks, this.activeTasks);
  }

  handlePlayerMovement() {
    const speed = 200;

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    } else {
      this.player.setVelocityY(0);
    }
  }

  createLocation(x, y, name) {
    const location = this.physics.add.sprite(x, y, 'location').setScale(1);
    location.name = name;

    this.add.text(x - 30, y - 40, name, { font: '14px Arial', fill: '#000' });
    return location;
  }

  handleLocationInteraction(locationName) {
    if (!this.currentTask) return;

    const nextRequiredLocation = this.currentTask.requiredLocations[0];

    if (locationName === nextRequiredLocation) {
      this.currentTask.requiredLocations.shift(); // Remove the completed location

      if (this.currentTask.requiredLocations.length === 0) {
        this.completeTask(this.currentTask);
        this.currentTask = null; // Clear the current task
      }
    }
  }

  completeTask(task) {
    this.completedTasks.push(task);
    this.resources.time -= 10; // Simulate time consumption
    this.resources.budget -= 20; // Simulate budget consumption
  }
}
