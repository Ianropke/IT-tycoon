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

    // Initialize player at the center of the screen
    this.player = new Player(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'player');

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
    // Define zone positions and sizes centrally, avoiding UI panels
    const zones = [
      { key: 'hospital', x: 300, y: 200, width: 200, height: 200, color: 0x1abc9c },
      { key: 'infrastructure', x: this.sys.game.config.width / 2, y: 200, width: 200, height: 200, color: 0x3498db },
      { key: 'cybersecurity', x: this.sys.game.config.width - 300, y: 200, width: 200, height: 200, color: 0xe74c3c },
      { key: 'backlog', x: this.sys.game.config.width / 2, y: this.sys.game.config.height - 100, width: 200, height: 100, color: 0x9b59b6 }
    ];

    zones.forEach(zone => {
      const graphics = this.add.graphics();
      graphics.fillStyle(zone.color, 1);
      graphics.fillRect(zone.x - zone.width / 2, zone.y - zone.height / 2, zone.wi
