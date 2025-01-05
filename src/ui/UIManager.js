// src/ui/UIManager.js
export default class UIManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.stakeholderScores = {};
    this.backlogTasks = [];
    this.activeTasks = [];
  }

  createUI() {
    // Create top scoreboard
    this.createScoreboard();

    // Create stakeholder scores
    this.createStakeholderScores();

    // Create backlog panel with scrolling
    this.createBacklogPanel();

    // Create active task panel
    this.createActiveTaskPanel();

    // Listen to game events
    this.scene.game.events.on('newTask', this.addBacklogTask, this);
  }

  createScoreboard() {
    this.scoreText = this.scene.add.text(20, 20, 'Score: 0', {
      font: '24px Arial',
      fill: '#ffffff'
    });
  }

  createStakeholderScores() {
    const stakeholders = this.scene.stakeholders;
    let xOffset = 200;
    for (let key in stakeholders) {
      const stakeholder = stakeholders[key];
      this.stakeholderScores[key] = this.scene.add.text(xOffset, 20, `${stakeholder.name}: ${stakeholder.score}`, {
        font: '24px Arial',
        fill: '#ffffff'
      });
      xOffset += 200;
    }
  }

  createBacklogPanel() {
    this.backlogContainer = this.scene.add.container(50, 100);
    const backlogBackground = this.scene.add.rectangle(0, 0, 300, 600, 0x333333).setOrigin(0);
    this.backlogContainer.add(backlogBackground);

    this.backlogText = this.scene.add.text(10, 10, 'Backlog', {
      font: '20px Arial',
      fill: '#ffffff'
    });
    this.backlogContainer.add(this.backlogText);

    // Scrollable area
    this.backlogScroll = this.scene.add.container(10, 40);
    this.backlogContainer.add(this.backlogScroll);

    // Enable scrolling with the mouse wheel
    this.backlogContainer.setInteractive();
    this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (pointer.x >= 50 && pointer.x <= 350 && pointer.y >= 100 && pointer.y <= 700) {
        this.backlogScroll.y += deltaY * 0.5;
        // Clamp the scroll position
        const maxScroll = Math.max(0, this.backlogTasks.length * 30 - 550);
        this.backlogScroll.y = Phaser.Math.Clamp(this.backlogScroll.y, -maxScroll, 0);
      }
    });
  }

  createActiveTaskPanel() {
    this.activeTaskContainer = this.scene.add.container(1000, 100);
    const activeTaskBackground = this.scene.add.rectangle(0, 0, 250, 600, 0x333333).setOrigin(0);
    this.activeTaskContainer.add(activeTaskBackground);

    this.activeTaskText = this.scene.add.text(10, 10, 'Active Tasks', {
      font: '20px Arial',
      fill: '#ffffff'
    });
    this.activeTaskContainer.add(this.activeTaskText);

    // Scrollable area
    this.activeTaskScroll = this.scene.add.container(10, 40);
    this.activeTaskContainer.add(this.activeTaskScroll);

    // Enable scrolling with the mouse wheel
    this.activeTaskContainer.setInteractive();
    this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (pointer.x >= 1000 && pointer.x <= 1250 && pointer.y >= 100 && pointer.y <= 700) {
        this.activeTaskScroll.y += deltaY * 0.5;
        // Clamp the scroll position
        const maxScroll = Math.max(0, this.activeTasks.length * 50 - 550);
        this.activeTaskScroll.y = Phaser.Math.Clamp(this.activeTaskScroll.y, -maxScroll, 0);
      }
    });
  }

  addBacklogTask(task) {
    this.backlogTasks.push(task);
    const taskText = this.scene.add.text(0, this.backlogTasks.length * 30, task.description, {
      font: '16px Arial',
      fill: '#ffffff',
      wordWrap: { width: 280 }
    });
    this.backlogScroll.add(taskText);

    // Add interactivity to commit task
    taskText.setInteractive();
    taskText.on('pointerdown', () => {
      this.scene.commitTask(task);
    });
  }

  commitTask(task) {
    this.scene.commitTask(task);
    this.backlogTasks = this.backlogTasks.filter(t => t !== task);
    this.refreshBacklog();
    this.activeTasks.push(task);
    this.addActiveTask(task);
  }

  refreshBacklog() {
    this.backlogScroll.removeAll(true);
    this.backlogTasks.forEach((t, index) => {
      const taskText = this.scene.add.text(0, index * 30, t.description, {
        font: '16px Arial',
        fill: '#ffffff',
        wordWrap: { width: 280 }
      });
      this.backlogScroll.add(taskText);
      taskText.setInteractive();
      taskText.on('pointerdown', () => {
        this.scene.commitTask(t);
      });
    });
  }

  addActiveTask(task) {
    const yPosition = this.activeTasks.length * 50;
    const taskInfo = `• ${task.description} (Steps: ${task.steps}, Risk: ${task.riskLevel})`;
    const taskText = this.scene.add.text(0, yPosition, taskInfo, {
      font: '16px Arial',
      fill: '#ffffff'
    });
    this.activeTaskScroll.add(taskText);

    // Add Gather button
    const gatherButton = this.scene.add.text(150, yPosition, 'Gather', {
      font: '16px Arial',
      fill: '#00ff00',
      backgroundColor: '#000000'
    }).setInteractive();
    gatherButton.on('pointerdown', () => {
      task.progress();
      this.refreshActiveTasks();
    });
    this.activeTaskScroll.add(gatherButton);

    // Add Finalize button
    const finalizeButton = this.scene.add.text(220, yPosition, 'Finalize', {
      font: '16px Arial',
      fill: '#ff0000',
      backgroundColor: '#000000'
    }).setInteractive();
    finalizeButton.on('pointerdown', () => {
      this.scene.finalizeTask(task);
    });
    this.activeTaskScroll.add(finalizeButton);
  }

  refreshActiveTasks() {
    this.activeTaskScroll.removeAll(true);
    this.activeTasks.forEach((task, index) => {
      this.addActiveTask(task);
    });
  }

  finalizeTask(task) {
    if (task.isCompleted()) {
      this.score += task.reward;
      this.scoreText.setText(`Score: ${this.score}`);
      this.stakeholderScores[task.stakeholder.key].setText(`${task.stakeholder.name}: ${task.stakeholder.score}`);
      this.activeTasks = this.activeTasks.filter(t => t !== task);
      this.refreshActiveTasks();
    } else {
      // Handle incomplete task finalization
      // Possibly emit an event or handle penalties elsewhere
    }
  }

  removeActiveTask(task) {
    this.activeTasks = this.activeTasks.filter(t => t !== task);
    this.refreshActiveTasks();
  }

  updateScore(scoreData) {
    this.score += scoreData.amount;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  updateStakeholderScores(stakeholderData) {
    const { key, name, score } = stakeholderData;
    if (this.stakeholderScores[key]) {
      this.stakeholderScores[key].setText(`${name}: ${score}`);
    }
  }
}
