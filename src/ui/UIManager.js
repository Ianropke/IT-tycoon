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
    this.createScoreboard();
    this.createStakeholderScores();
    this.createBacklogPanel();
    this.createActiveTaskPanel();
    this.scene.events.on('newTask', this.addBacklogTask, this);
  }

  // ------------------------------
  // 1. Scoreboard and Stakeholders
  // ------------------------------
  createScoreboard() {
    this.scoreText = this.scene.add.text(20, 20, 'Score: 0', {
      font: '24px Arial',
      fill: '#ffffff'
    }).setDepth(20);
  }

  createStakeholderScores() {
    const stakeholders = this.scene.stakeholders;
    let xOffset = 200;
    for (let key in stakeholders) {
      const stakeholder = stakeholders[key];
      this.stakeholderScores[key] = this.scene.add.text(xOffset, 20, `${stakeholder.name}: ${stakeholder.score}`, {
        font: '24px Arial',
        fill: '#ffffff'
      }).setDepth(20);
      xOffset += 200;
    }
  }

  // ------------------------------
  // 2. Backlog Panel (Left)
  // ------------------------------
  createBacklogPanel() {
    const panelWidth = 300;
    const panelHeight = this.scene.sys.game.config.height - 200;
    const padding = 50;

    // Create a container for the backlog panel
    this.backlogContainer = this.scene.add.container(padding, 100).setDepth(10);

    // Panel background with border
    const backlogBackground = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x2c3e50).setOrigin(0);
    backlogBackground.setStrokeStyle(2, 0xffffff);
    backlogBackground.setInteractive();
    this.backlogContainer.add(backlogBackground);

    // Panel title
    const backlogTitle = this.scene.add.text(panelWidth / 2, 20, 'Backlog', {
      font: '24px Arial',
      fill: '#ecf0f1'
    }).setOrigin(0.5).setDepth(11);
    this.backlogContainer.add(backlogTitle);

    // Scrollable area
    this.backlogScroll = this.scene.add.container(10, 60).setDepth(11);
    this.backlogContainer.add(this.backlogScroll);

    // Enable scrolling with the mouse wheel
    this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (
        pointer.x >= padding &&
        pointer.x <= padding + panelWidth &&
        pointer.y >= 100 &&
        pointer.y <= 100 + panelHeight
      ) {
        this.backlogScroll.y += deltaY * 0.5;
        // Clamp the scroll position
        const maxScroll = Math.max(0, this.backlogTasks.length * 60 - (panelHeight - 80));
        this.backlogScroll.y = Phaser.Math.Clamp(this.backlogScroll.y, -maxScroll, 0);
      }
    });
  }

  // ------------------------------
  // 3. Active Tasks Panel (Right)
  // ------------------------------
  createActiveTaskPanel() {
    const panelWidth = 300;
    const panelHeight = this.scene.sys.game.config.height - 200;
    const padding = 50;
    const gameWidth = this.scene.sys.game.config.width;

    // Create a container for the active tasks panel
    this.activeTaskContainer = this.scene.add.container(gameWidth - panelWidth - padding, 100).setDepth(10);

    // Panel background with border
    const activeTaskBackground = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x2c3e50).setOrigin(0);
    activeTaskBackground.setStrokeStyle(2, 0xffffff);
    activeTaskBackground.setInteractive();
    this.activeTaskContainer.add(activeTaskBackground);

    // Panel title
    const activeTaskTitle = this.scene.add.text(panelWidth / 2, 20, 'Active Tasks', {
      font: '24px Arial',
      fill: '#ecf0f1'
    }).setOrigin(0.5).setDepth(11);
    this.activeTaskContainer.add(activeTaskTitle);

    // Scrollable area
    this.activeTaskScroll = this.scene.add.container(10, 60).setDepth(11);
    this.activeTaskContainer.add(this.activeTaskScroll);

    // Enable scrolling with the mouse wheel
    this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (
        pointer.x >= (gameWidth - panelWidth - padding) &&
        pointer.x <= (gameWidth - padding) &&
        pointer.y >= 100 &&
        pointer.y <= 100 + panelHeight
      ) {
        this.activeTaskScroll.y += deltaY * 0.5;
        // Clamp the scroll position
        const maxScroll = Math.max(0, this.activeTasks.length * 100 - (panelHeight - 80));
        this.activeTaskScroll.y = Phaser.Math.Clamp(this.activeTaskScroll.y, -maxScroll, 0);
      }
    });
  }

  // ------------------------------
  // 4. Adding Tasks to Backlog
  // ------------------------------
  addBacklogTask(task) {
    this.backlogTasks.push(task);
    this.renderBacklog();
  }

  renderBacklog() {
    this.backlogScroll.removeAll(true);
    this.backlogTasks.forEach((task, index) => {
      const taskItem = this.createBacklogTaskItem(task);
      taskItem.y = index * 60;
      this.backlogScroll.add(taskItem);
    });
  }

  createBacklogTaskItem(task) {
    const container = this.scene.add.container(0, 0).setDepth(11);
    container.isExpanded = false;

    // Background for task item
    const bg = this.scene.add.rectangle(0, 0, 280, 50, 0x34495e).setOrigin(0);
    bg.setInteractive();
    container.add(bg);

    // Task Description
    const description = this.scene.add.text(10, -10, task.description, {
      font: '16px Arial',
      fill: '#ecf0f1',
      wordWrap: { width: 260 }
    }).setOrigin(0).setDepth(12);
    container.add(description);

    // Commit Button
    const commitButton = this.createButton(240, 0, 'Commit', '#2980b9', () => {
      this.handleCommitTask(task);
    });
    container.add(commitButton);

    // Hover Effects
    bg.on('pointerover', () => {
      bg.setFillStyle(0x1abc9c);
    });
    bg.on('pointerout', () => {
      bg.setFillStyle(0x34495e);
    });

    // Toggle expand/collapse on click
    bg.on('pointerdown', () => {
      container.isExpanded = !container.isExpanded;
      if (container.isExpanded) {
        this.expandBacklogTask(container, task);
      } else {
        this.collapseBacklogTask(container);
      }
    });

    // Log task position
    console.log(`Backlog Task Position Y: ${container.y}`);

    return container;
  }

  expandBacklogTask(container, task) {
    // Increase background height
    container.getAt(0).setSize(280, 100);

    // Add detailed information
    const stepsText = this.scene.add.text(10, 15, `Steps: ${task.steps}`, {
      font: '14px Arial',
      fill: '#bdc3c7'
    }).setOrigin(0).setDepth(12);
    container.add(stepsText);

    const riskText = this.scene.add.text(10, 35, `Risk: ${task.riskLevel}`, {
      font: '14px Arial',
      fill: '#bdc3c7'
    }).setOrigin(0).setDepth(12);
    container.add(riskText);
  }

  collapseBacklogTask(container) {
    // Reset background height
    container.getAt(0).setSize(280, 50);

    // Remove detailed information
    container.list = container.list.filter(child => {
      return !(child.text && (child.text.includes('Steps') || child.text.includes('Risk')));
    });

    // No need to call container.refresh()
  }

  // ------------------------------
  // 5. Adding Tasks to Active Tasks
  // ------------------------------
  addActiveTask(task) {
    this.activeTasks.push(task);
    this.renderActiveTasks();
  }

  renderActiveTasks() {
    this.activeTaskScroll.removeAll(true);
    this.activeTasks.forEach((task, index) => {
      const taskItem = this.createActiveTaskItem(task);
      taskItem.y = index * 100;
      this.activeTaskScroll.add(taskItem);
    });
  }

  createActiveTaskItem(task) {
    const container = this.scene.add.container(0, 0).setDepth(11);
    container.isExpanded = false;

    // Background for task item
    const bg = this.scene.add.rectangle(0, 0, 280, 90, 0x34495e).setOrigin(0);
    bg.setInteractive();
    container.add(bg);

    // Task Description
    const description = this.scene.add.text(10, -25, task.description, {
      font: '16px Arial',
      fill: '#ecf0f1',
      wordWrap: { width: 260 }
    }).setOrigin(0).setDepth(12);
    container.add(description);

    // Steps Remaining
    const stepsText = this.scene.add.text(10, 0, `Steps: ${task.steps}`, {
      font: '14px Arial',
      fill: '#bdc3c7'
    }).setOrigin(0).setDepth(12);
    container.add(stepsText);

    // Risk Level
    const riskText = this.scene.add.text(150, 0, `Risk: ${task.riskLevel}`, {
      font: '14px Arial',
      fill: '#bdc3c7'
    }).setOrigin(0).setDepth(12);
    container.add(riskText);

    // Gather Button
    const gatherButton = this.createButton(240, -10, 'Gather', '#27ae60', () => {
      this.handleGather(task);
    });
    container.add(gatherButton);

    // Finalize Button
    const finalizeButton = this.createButton(240, 20, 'Finalize', '#c0392b', () => {
      this.handleFinalize(task);
    });
    container.add(finalizeButton);

    // Hover Effects
    bg.on('pointerover', () => {
      bg.setFillStyle(0x1abc9c);
    });
    bg.on('pointerout', () => {
      bg.setFillStyle(0x34495e);
    });

    // Toggle expand/collapse on click (Optional)
    bg.on('pointerdown', () => {
      container.isExpanded = !container.isExpanded;
      if (container.isExpanded) {
        this.expandActiveTask(container, task);
      } else {
        this.collapseActiveTask(container);
      }
    });

    // Log task position
    console.log(`Active Task Position Y: ${container.y}`);

    return container;
  }

  expandActiveTask(container, task) {
    // Increase background height
    container.getAt(0).setSize(280, 140);

    // Add additional details or actions if needed
    // For simplicity, we're keeping it minimal
  }

  collapseActiveTask(container) {
    // Reset background height
    container.getAt(0).setSize(280, 90);

    // Remove expanded details
    container.list = container.list.filter(child => {
      return !(child.text && (child.text.includes('Steps') || child.text.includes('Risk')));
    });

    // No need to call container.refresh()
  }

  // ------------------------------
  // 6. Creating Buttons
  // ------------------------------
  createButton(x, y, text, color, callback) {
    const button = this.scene.add.text(x, y, text, {
      font: '14px Arial',
      fill: '#ffffff',
      backgroundColor: color,
      padding: { x: 5, y: 5 },
      align: 'center'
    })
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(12);

    button.on('pointerdown', () => {
      callback();
    });

    button.on('pointerover', () => {
      button.setStyle({ fill: '#f1c40f' });
    });

    button.on('pointerout', () => {
      button.setStyle({ fill: '#ffffff' });
    });

    return button;
  }

  // ------------------------------
  // 7. Handling Task Commit
  // ------------------------------
  handleCommitTask(task) {
    // Move task from backlog to active tasks
    this.backlogTasks = this.backlogTasks.filter(t => t !== task);
    this.scene.commitTask(task); // Update task status
    this.addActiveTask(task);
    this.renderBacklog();
  }

  // ------------------------------
  // 8. Handling Gather Action
  // ------------------------------
  handleGather(task) {
    if (task.steps > 0) {
      task.progress();
      console.log(`Gathering resources for task: ${task.description}, Steps left: ${task.steps}`);
      if (task.steps === 0) {
        this.finalizeTask(task);
      } else {
        this.renderActiveTasks();
      }
    }
  }

  // ------------------------------
  // 9. Handling Finalize Action
  // ------------------------------
  handleFinalize(task) {
    if (task.isCompleted()) {
      this.finalizeTask(task);
    } else {
      console.log(`Cannot finalize task: ${task.description}. Steps remaining.`);
      // Optionally, display a notification to the player
    }
  }

  // ------------------------------
  // 10. Finalizing Task
  // ------------------------------
  finalizeTask(task) {
    this.score += task.reward;
    this.scoreText.setText(`Score: ${this.score}`);
    this.scene.stakeholders[task.stakeholder.key].increaseScore(task.reward);
    this.stakeholderScores[task.stakeholder.key].setText(`${task.stakeholder.name}: ${this.scene.stakeholders[task.stakeholder.key].score}`);

    // Remove task from active tasks
    this.activeTasks = this.activeTasks.filter(t => t !== task);
    this.renderActiveTasks();

    console.log(`Task finalized: ${task.description}, Reward: ${task.reward}`);
    // Optionally, display a notification to the player
  }

  // ------------------------------
  // 11. Remove Active Task (for task failures)
  // ------------------------------
  removeActiveTask(task) {
    this.activeTasks = this.activeTasks.filter(t => t !== task);
    this.renderActiveTasks();
  }

  // ------------------------------
  // 12. Update Score (for task failures)
  // ------------------------------
  updateScore(scoreData) {
    this.score += scoreData.amount;
    this.scoreText.setText(`Score: ${this.score}`);
    // Log the score update
    console.log(`Score updated: ${this.score}`);
  }
}
