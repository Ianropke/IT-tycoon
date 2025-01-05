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

  // Proxy methods to UIManager
  addBacklogTask(task) {
    this.uiManager.addBacklogTask(task);
  }

  addActiveTask(task) {
    this.uiManager.addActiveTask(task);
  }

  renderBacklog() {
    this.uiManager.renderBacklog();
  }

  renderActiveTasks() {
    this.uiManager.renderActiveTasks();
  }

  handleGather(task) {
    this.uiManager.handleGather(task);
  }

  handleFinalize(task) {
    this.uiManager.handleFinalize(task);
  }

  finalizeTask(task) {
    this.uiManager.finalizeTask(task);
  }

  removeActiveTask(task) {
    this.uiManager.removeActiveTask(task);
  }

  updateScore(scoreData) {
    this.uiManager.updateScore(scoreData);
  }

  updateStakeholderScores(stakeholderData) {
    this.uiManager.updateStakeholderScores(stakeholderData);
  }
}
