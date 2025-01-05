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
      cybersecurity: new Stakeholder(this, 'Cybersecurity', 100),
      legal: new Stakeholder(this, 'Legal', 100),
      informationSecurity: new Stakeholder(this, 'Information Security', 100)
    };

    // Initialize player at the center of the screen
    this.player = new Player(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'player');
    this.player.sprite.setDepth(15); // Ensure player is above zones and UI

    // Define zones with Phaser graphics
    this.createZones();

    // Task system
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
    // Define UI panel widths and padding
    const backlogWidth = 300;
    const activeTaskWidth = 250;
    const padding = 50;
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;

    // Calculate center area to avoid overlapping with UI panels
    const centerAreaStartX = backlogWidth + padding * 2;
    const centerAreaEndX = gameWidth - activeTaskWidth - padding * 2;

    // Define zone positions and sizes within the center area
    const zones = [
      { key: 'hospital', x: centerAreaStartX + 100, y: 200, width: 200, height: 200, color: 0x1abc9c },
      { key: 'infrastructure', x: centerAreaStartX + 400, y: 200, width: 200, height: 200, color: 0x3498db },
      { key: 'cybersecurity', x: centerAreaStartX + 700, y: 200, width: 200, height: 200, color: 0xe74c3c },
      { key: 'legal', x: centerAreaStartX + 250, y: 450, width: 200, height: 200, color: 0x8e44ad },
      { key: 'informationSecurity', x: centerAreaStartX + 550, y: 450, width: 200, height: 200, color: 0x2ecc71 }
    ];

    zones.forEach(zone => {
      const graphics = this.add.graphics();
      graphics.fillStyle(zone.color, 1);
      graphics.fillRect(zone.x - zone.width / 2, zone.y - zone.height / 2, zone.width, zone.height);
      graphics.setDepth(5); // Lower than player and UI

      // Define the hit area using Phaser.Geom.Rectangle
      const rect = new Phaser.Geom.Rectangle(zone.x - zone.width / 2, zone.y - zone.height / 2, zone.width, zone.height);
      graphics.setInteractive(rect, Phaser.Geom.Rectangle.Contains);

      graphics.on('pointerdown', () => {
        this.handleZoneInteraction(zone.key);
      });

      // Add labels to zones
      this.add.text(zone.x, zone.y, zone.key.charAt(0).toUpperCase() + zone.key.slice(1), {
        font: '20px Arial',
        fill: '#ffffff'
      }).setOrigin(0.5).setDepth(6); // Above the zone
    });

    // Backlog zone (optional interaction)
    const backlogZone = {
      key: 'backlog',
      x: padding,
      y: gameHeight - 100,
      width: backlogWidth,
      height: 100,
      color: 0x9b59b6
    };

    const backlogGraphics = this.add.graphics();
    backlogGraphics.fillStyle(backlogZone.color, 1);
    backlogGraphics.fillRect(backlogZone.x, backlogZone.y - backlogZone.height / 2, backlogZone.width, backlogZone.height);
    backlogGraphics.setDepth(5); // Lower than player and UI

    const backlogRect = new Phaser.Geom.Rectangle(backlogZone.x, backlogZone.y - backlogZone.height / 2, backlogZone.width, backlogZone.height);
    backlogGraphics.setInteractive(backlogRect, Phaser.Geom.Rectangle.Contains);

    backlogGraphics.on('pointerdown', () => {
      console.log('Backlog zone clicked.');
      // Optionally, focus on backlog panel or perform specific actions
    });

    // Add label to backlog
    this.add.text(backlogZone.x + backlogZone.width / 2, backlogZone.y, 'Backlog', {
      font: '20px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5).setDepth(6); // Above the backlog zone
  }

  handleZoneInteraction(zoneKey) {
    switch (zoneKey) {
      case 'hospital':
        console.log('Hospital zone clicked.');
        break;
      case 'infrastructure':
        console.log('Infrastructure zone clicked.');
        break;
      case 'cybersecurity':
        console.log('Cybersecurity zone clicked.');
        break;
      case 'legal':
        console.log('Legal zone clicked.');
        break;
      case 'informationSecurity':
        console.log('Information Security zone clicked.');
        break;
      case 'backlog':
        console.log('Backlog zone clicked.');
        // Optionally, highlight the backlog panel or perform specific actions
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
      console.log(`Generated task: ${task.description}`);
      this.events.emit('newTask', task);
    }
  }

  commitTask(task) {
    if (task.status === 'backlog') {
      task.commit();
      this.activeTasks.push(task);
      this.backlog = this.backlog.filter(t => t !== task);
      console.log(`Task committed: ${task.description}`);
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
    console.log(`Task completed: ${task.description}`);
    this.uiScene.updateScore({ amount: task.reward });
    // Additional logic as needed
  }

  handleTaskFailure(task) {
    const penalty = task.riskLevel * 10;
    this.score -= penalty;
    this.stakeholders[task.stakeholder.key].decreaseScore(penalty);
    console.log(`Task failed: ${task.description}, Penalty: ${penalty}`);
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
