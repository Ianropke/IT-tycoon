// js/main.js

import { initializeTasks, commitTask, gatherTask, finalizeTask, changePage, createRandomTask, getActiveTask } from './tasks.js';
import { updateBacklogUI, updateActiveTaskUI, updateScoresUI } from './ui.js';

/**
 * Main Phaser Scene
 */
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Dynamically create dummy textures
    this.makeSquare('player_dummy', 0x0000ff);
    this.makeSquare('backlog_dummy', 0xffa500);
    this.makeSquare('hospital_dummy', 0xffff00);
    this.makeSquare('infrastructure_dummy', 0xff00ff);
    this.makeSquare('infoSec_dummy', 0x00ffff);
    this.makeSquare('cybersecurity_dummy', 0x40e0d0);
  }

  /**
   * Creates a colored square texture.
   * @param {string} key - Texture key.
   * @param {number} colorInt - Hexadecimal color.
   */
  makeSquare(key, colorInt) {
    const canvas = this.textures.createCanvas(key, 100, 100); // 100x100 px
    const ctx = canvas.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 100, 100);
    canvas.refresh();
  }

  create() {
    // Initialize player
    this.player = this.physics.add.sprite(100, 450, 'player_dummy').setCollideWorldBounds(true);
    this.player.setInteractive();

    // Define zones with positions and sizes
    this.zones = {
      backlog: { x: 150, y: 140, width: 100, height: 100, name: 'backlog_dummy' },
      hospital: { x: 300, y: 200, width: 100, height: 100, name: 'hospital_dummy' },
      infrastructure: { x: 500, y: 200, width: 100, height: 100, name: 'infrastructure_dummy' },
      infoSec: { x: 300, y: 350, width: 100, height: 100, name: 'infoSec_dummy' },
      cybersecurity: { x: 500, y: 350, width: 100, height: 100, name: 'cybersecurity_dummy' }
    };

    // Create interactive zones
    for (let key in this.zones) {
      const zone = this.zones[key];
      const zoneSprite = this.physics.add.staticSprite(zone.x, zone.y, zone.name).setInteractive();
      zoneSprite.setDisplaySize(zone.width, zone.height);

      // Add overlap handlers
      this.physics.add.overlap(this.player, zoneSprite, () => this.handleZone(zone.name));
    }

    // Initialize keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Initialize UI interactions
    document.getElementById('commit-button').addEventListener('click', commitTask);
    document.getElementById('gather-button').addEventListener('click', gatherTask);
    document.getElementById('finalize-button').addEventListener('click', finalizeTask);

    // Initialize Pagination Controls
    document.getElementById('prev-page').addEventListener('click', () => changePage(-1));
    document.getElementById('next-page').addEventListener('click', () => changePage(1));

    // Initialize Backlog and UI
    initializeTasks();
    updateBacklogUI(backlog, currentPage, tasksPerPage);
    updateActiveTaskUI(activeTask);

    // Dynamic stakeholder demands
    this.time.addEvent({
      delay: 15000, // Every 15 seconds
      callback: () => {
        const stakeholdersList = ['hospital', 'infrastructure', 'informationSecurity', 'cybersecurity'];
        const randomGiver = stakeholdersList[Math.floor(Math.random() * stakeholdersList.length)];
        createRandomTask({ giver: randomGiver });
      },
      loop: true,
    });
  }

  update() {
    // Handle player movement
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }

  /**
   * Handles interactions when the player overlaps with a zone.
   * @param {string} zoneName 
   */
  handleZone(zoneName) {
    switch(zoneName) {
      case 'hospital_dummy':
      case 'infrastructure_dummy':
      case 'cybersecurity_dummy':
      case 'infoSec_dummy':
        const task = getActiveTask();
        if (task && task.giver.toLowerCase() === zoneName.replace('_dummy', '')) {
          gatherTask();
        } else {
          alert(`No active task for ${zoneName.replace('_dummy', '')}.`);
        }
        break;
      case 'backlog_dummy':
        alert('Backlog Zone: Review or manage your backlog here.');
        break;
      default:
        console.warn(`Unhandled zone: ${zoneName}`);
    }
  }
}

// Phaser Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 900, // Changed from 1440 to 900 to match the 'game-area' div width
  height: 900,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [GameScene],
  parent: 'game-area' // Ensures the game canvas is attached to the 'game-area' div
};

// Initialize Phaser Game
new Phaser.Game(config);
