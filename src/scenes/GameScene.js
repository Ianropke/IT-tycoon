// src/scenes/GameScene.js
import Player from '../objects/Player.js';
import Task from '../objects/Task.js';
import Stakeholder from '../objects/Stakeholder.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // Initialize score
    this.score = 0;

    // Initialize stakeholders
    this.stakeholders = {
      hospital: new Stakeholder(this, 'Hospital', 100),
      infrastructure: new Stakeholder(this, 'Infrastructure', 100),
      cybersecurity: new Stakeholder(this, 'Cybersecurity', 100)
    };

    // Initialize player
    this.player = new Player(this, 640, 360, 'player');

    // Define zones with Phaser graphics
    this.createZones();

    // Task system
    this.tasks = [];
    this.backlog = [];
    this.activeTasks = [];

    // Generate initial tasks
    this.generateTasks(5);

    // Input handling
    this.cursors = this.input.keyboard.createCursorKeys();

    // Reference to UIScene
    this.uiScene = this.scene.get('UIScene');

    // Event listeners
    this.events.on('completed', this.handleTaskCompletion, this);
    this.events.on('taskFailed', this.handleTaskFailure, this);
  }

  createZones() {
    // Define zone positions and sizes
    const zones = [
      { key: 'hospital', x: 200, y: 150, width: 200, height: 200, color: 0x1abc9c },
      { key: 'infrastructure', x: 600, y: 150, width: 200, height: 200, color: 0x3498db },
      { key: 'cybersecurity', x: 1000, y: 150, width: 200, height: 200, color: 0xe74c3c },
      { key: 'backlog', x: 640, y: 600, width: 200, height: 100, color: 0x9b59b6 }
    ];

    zones.forEach(zone => {
      const graphics = this.add.graphics();
      graphics.fillStyle(zone.color, 1);
      graphics.fillRectZone = new Phaser.Geom.Rectangle(zone.x - zone.width / 2, zone.y - zone.height / 2, zone.width, zone.height);
      graphics.fillRectShape(graphics.fillRectZone);
      graphics.setInteractive(graphics.fillRectZone, Phaser.Geom.Rectangle.Contains);
      graphics.on('pointerdown', () => {
        this.handleZoneInteraction(zone.key);
      });

      // Add labels to zones
      this.add.text(zone.x, zone.y, zone.key.charAt(0).toUpperCase() + zone.key.slice(1), {
        font: '20px Arial',
        fill: '#ffffff'
      }).setOrigin(0.5);
    });
  }

  handleZoneInteraction(zoneKey) {
    switch (zoneKey) {
      case 'hospital':
        // Display tasks or UI related to Hospital
        // For simplicity, you can highlight tasks related to Hospital in the UI
        break;
      case 'infrastructure':
        // Display tasks or UI related to Infrastructure
        break;
      case 'cybersecurity':
        // Display tasks or UI related to Cybersecurity
        break;
      case 'backlog':
        // Display backlog tasks
        break;
      default:
        break;
    }
  }

  update(time, delta) {
    this.player.update(this.cursors);
    this.updateTasks(time, delta);
  }

  generateTasks(number) {
    const stakeholders = Object.keys(this.stakeholders);
    for (let i = 0; i < number; i++) {
      const stakeholderKey = Phaser.Utils.Array.GetRandom(stakeholders);
      const stakeholder = this.stakeholders[stakeholderKey];
      const task = new Task(this, stakeholder);
      this.backlog.push(task);
      this.events.emit('newTask', task);
    }
  }

  commitTask(task) {
    if (task.status === 'backlog') {
      task.commit();
      this.activeTasks.push(task);
      this.backlog = this.backlog.filter(t => t !== task);
      this.uiScene.commitTask(task);
    }
  }

  finalizeTask(task) {
    if (task.isCompleted()) {
      this.score += task.reward;
      this.stakeholders[task.stakeholder.key].increaseScore(task.reward);
      this.events.emit('completed', task);
      this.activeTasks = this.activeTasks.filter(t => t !== task);
      this.uiScene.finalizeTask(task);
    } else {
      // Handle incomplete task finalization
      this.events.emit('taskFailed', task);
    }
  }

  handleTaskCompletion(task) {
    // Update overall score and stakeholder scores
    this.uiScene.updateScore({ amount: task.reward });
    // Additional logic as needed
  }

  handleTaskFailure(task) {
    const penalty = task.riskLevel * 10;
    this.score -= penalty;
    this.stakeholders[task.stakeholder.key].decreaseScore(penalty);
    this.uiScene.updateScore({ amount: -penalty });
    // Remove failed task from active tasks
    this.activeTasks = this.activeTasks.filter(t => t !== task);
    this.uiScene.removeActiveTask(task);
  }

  updateTasks(time, delta) {
    // Update active tasks progress
    this.activeTasks.forEach(task => {
      task.update(time);
      if (task.isCompleted()) {
        this.finalizeTask(task);
      }
    });

    // Handle deadlines
    this.activeTasks.forEach(task => {
      if (this.time.now > task.deadline && task.status !== 'finalized') {
        this.events.emit('taskFailed', task);
      }
    });

    // Dynamically generate new tasks or adjust priorities
    if (Phaser.Math.Between(0, 1000) < 1) { // Random chance
      this.generateTasks(1);
    }
  }
}
