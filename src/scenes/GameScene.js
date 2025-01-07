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
  }

  preload() {
    this.add.text(10, 10, 'Loading...', { font: '16px Arial', fill: '#000' });
  }

  create() {
    this.uiManager = new UIManager(this);

    this.add.text(10, 10, 'IT Tycoon MVP', { font: '20px Arial', fill: '#000' });

    this.input.once('pointerdown', () => {
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }
    });

    for (let i = 0; i < 5; i++) {
      const task = new Task(`Task ${i + 1}`, 'Low', 'Normal', 3, 50, 10);
      this.tasks.push(task);
    }

    this.uiManager.updateUI(this.resources, this.tasks, this.activeTasks);
  }

  update() {
    this.uiManager.updateUI(this.resources, this.tasks, this.activeTasks);
  }
}
