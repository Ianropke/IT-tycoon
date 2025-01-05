// src/scenes/UIScene.js
import UIManager from '../ui/UIManager.js';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true });
  }

  create() {
    this.uiManager = new UIManager(this);
    this.uiManager.createUI();
  }

  updateScore(scoreData) {
    this.uiManager.updateScore(scoreData);
  }

  updateStakeholderScores(stakeholderData) {
    this.uiManager.updateStakeholderScores(stakeholderData);
  }

  commitTask(task) {
    this.uiManager.commitTask(task);
  }

  finalizeTask(task) {
    this.uiManager.finalizeTask(task);
  }

  removeActiveTask(task) {
    this.uiManager.removeActiveTask(task);
  }
}
