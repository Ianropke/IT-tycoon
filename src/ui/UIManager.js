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
    const panelWidth = 300;
    const panelHeight = 600;
    const padding = 50;
    
    this.backlogContainer = this.scene.add.container(padding, padding + 100);
    
    // Background for backlog
    const backlogBackground = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x333333).setOrigin(0);
    backlogBackground.setInteractive(new Phaser.Geom.Rectangle(0, 0, panelWidth, panelHeight), Phaser.Geom.Rectangle.Contains);
    this.backlogContainer.add(backlogBackground);

    // Title for backlog
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
      if (pointer.x >= padding && pointer.x <= padding + panelWidth && pointer.y >= padding + 100 && pointer.y <= padding + 100 + panelHeight) {
        this.backlogScroll.y += deltaY * 0.5;
        // Clamp the scroll position
        const maxScroll = Math.max(0, this.backlogTasks.length * 30 - 550);
        this.backlogScroll.y = Phaser.Math.Clamp(this.backlogScroll.y, -maxScroll, 0);
      }
    });

    // Ensure backlogContainer is above other elements
    this.backlogContainer.setDepth(10);
  }

  createActiveTaskPanel() {
    const panelWidth = 250;
    const panelHeight = 600;
    const padding = 50;
    const gameWidth = this.scene.sys.game.config.width;

    this.activeTaskContainer = this.scene.add.container(gameWidth - panelWidth - padding, padding + 100);
    
    // Background for active tasks
    const activeTaskBackground = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x333333).setOrigin(0);
    activeTaskBackground.setInteractive(new Phaser.Geom.Rectangle(0, 0, panelWidth, panelHeight), Phaser.Geom.Rectangle.Contains);
    this.activeTaskContainer.add(activeTaskBackground);

    // Title for active tasks
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
      if (pointer.x >= gameWidth - panelWidth - padding && pointer.x <= gameWidth - padding && pointer.y >= padding + 100 && pointer.y <= padding + 100 + panelHeight) {
        this.activeTaskScroll.y += deltaY * 0.5;
        // Clamp the scroll position
        const maxScroll = Math.max(0, this.activeTasks.length * 50 - 550);
        this.activeTaskScroll.y = Phaser.Math.Clamp(this.activeTaskScroll.y, -maxScroll, 0);
      }
    });

    // Ensure activeTaskContainer is above other elements
    this.activeTaskContainer.setDepth(10);
  }

  addBacklogTask(task) {
    console.log(`Adding task to backlog: ${task.description}`);
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
      console.log(`Committing task: ${task.description}`);
      this.scene.commitTask(task);
    });
  }

  commitTask(task) {
    console.log(`Committing task: ${task.description}`);
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
      console.log(`Gathering resources for task: ${task.description}`);
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
      console.log(`Finalizing task: ${task.description}`);
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
      console.log(`Task finalized: ${task.description}, Reward: ${task.reward}`);
    } else {
      // Handle incomplete task finalization
      console.log(`Attempted to finalize incomplete task: ${task.description}`);
      // Optionally, emit an event or handle penalties elsewhere
    }
  }

  removeActiveTask(task) {
    this.activeTasks = this.activeTasks.filter(t => t !== task);
    this.refreshActiveTasks();
    console.log(`Removed active task: ${task.description}`);
  }

  updateScore(scoreData) {
    this.score += scoreData.amount;
    this.scoreText.setText(`Score: ${this.score}`);
    console.log(`Score updated: ${this.score}`);
  }

  updateStakeholderScores(stakeholderData) {
    const { key, name, score } = stakeholderData;
    if (this.stakeholderScores[key]) {
      this.stakeholderScores[key].setText(`${name}: ${score}`);
      console.log(`Stakeholder score updated: ${name} - ${score}`);
    }
  }
}
