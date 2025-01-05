// src/ui/UIManager.js

export default class UIManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.stakeholderScores = {};
    this.backlogTasks = [];
    this.activeTasks = [];

    // Define maximum visible tasks before scrolling is needed
    this.maxVisibleBacklogTasks = 10;
    this.maxVisibleActiveTasks = 10;
  }

  createUI() {
    this.createScoreboard();
    this.createStakeholderScores();
    this.createBacklogPanel();
    this.createActiveTaskPanel();
    this.scene.events.on('newTask', this.addBacklogTask, this);
  }

  // ------------------------------
  // 1. Scoreboard and Stakeholder
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

    // Panel background
    const backlogBackground = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x2c3e50).setOrigin(0).setDepth(10);
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

    // Optional: Add a border or other decorative elements
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

    // Panel background
    const activeTaskBackground = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x2c3e50).setOrigin(0).setDepth(10);
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
      const taskItem = this.createTaskItem(task, 'backlog');
      taskItem.y = index * 60;
      this.backlogScroll.add(taskItem);
    });
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
      const taskItem = this.createTaskItem(task, 'active');
      taskItem.y = index * 100;
      this.activeTaskScroll.add(taskItem);
    });
  }

  // ------------------------------
  // 6. Creating Task Items
  // ------------------------------
  createTaskItem(task, type) {
    const container = this.scene.add.container(0, 0).setDepth(11);

    // Background for task item
    const bg = this.scene.add.rectangle(0, 0, 280, 50, 0x34495e).setOrigin(0).setInteractive();
    container.add(bg);

    // Task Description
    const description = this.scene.add.text(10, 10, task.description, {
      font: '16px Arial',
      fill: '#ecf0f1',
      wordWrap: { width: 260 }
    }).setOrigin(0).setDepth(12);
    container.add(description);

    if (type === 'active') {
      // Steps Remaining
      const stepsText = this.scene.add.text(10, 30, `Steps: ${task.steps}`, {
        font: '14px Arial',
        fill: '#bdc3c7'
      }).setOrigin(0).setDepth(12);
      container.add(stepsText);

      // Risk Level
      const riskText = this.scene.add.text(100, 30, `Risk: ${task.riskLevel}`, {
        font: '14px Arial',
        fill: '#bdc3c7'
      }).setOrigin(0).setDepth(12);
      container.add(riskText);

      // Action Buttons
      const gatherButton = this.createButton(180, 30, 'Gather', '#27ae60', () => {
        this.handleGather(task);
      });
      container.add(gatherButton);

      const finalizeButton = this.createButton(240, 30, 'Finalize', '#c0392b', () => {
        this.handleFinalize(task);
      });
      container.add(finalizeButton);
    }

    // Toggle details on click
    bg.on('pointerdown', () => {
      if (type === 'backlog') {
        this.handleCommitTask(task);
      }
    });

    return container;
  }

  // ------------------------------
  // 7. Creating Buttons
  // ------------------------------
  createButton(x, y, text, color, callback) {
    const button = this.scene.add.text(x, y, text, {
      font: '14px Arial',
      fill: '#ffffff',
      backgroundColor: color,
      padding: { x: 5, y: 5 },
      align: 'center'
    }).setOrigin(0.5).setInteractive();

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
  // 8. Handling Task Commit
  // ------------------------------
  handleCommitTask(task) {
    // Move task from backlog to active tasks
    this.backlogTasks = this.backlogTasks.filter(t => t !== task);
    this.addActiveTask(task);
    this.scene.commitTask(task); // Assuming this updates task status
    this.renderBacklog();
  }

  // ------------------------------
  // 9. Handling Gather Action
  // ------------------------------
  handleGather(task) {
    if (task.steps > 0) {
      task.steps -= 1;
      console.log(`Gathering resources for task: ${task.description}, Steps left: ${task.steps}`);
      if (task.steps === 0) {
        this.finalizeTask(task);
      } else {
        this.renderActiveTasks();
      }
    }
  }

  // ------------------------------
  // 10. Handling Finalize Action
  // ------------------------------
  handleFinalize(task) {
    if (task.steps === 0) {
      this.finalizeTask(task);
    } else {
      console.log(`Cannot finalize task: ${task.description}. Steps remaining.`);
      // Optionally, display a notification to the player
    }
  }

  // ------------------------------
  // 11. Finalizing Task
  // ------------------------------
  finalizeTask(task) {
    this.score += task.reward;
    this.scoreText.setText(`Score: ${this.score}`);
    this.scene.stakeholders[task.stakeholder.key].increaseScore(task.reward);
    this.stakeholderScores[task.stakeholder.key].setText(`${task.stakeholder.name}: ${task.stakeholder.score}`);

    // Remove task from active tasks
    this.activeTasks = this.activeTasks.filter(t => t !== task);
    this.renderActiveTasks();

    console.log(`Task finalized: ${task.description}, Reward: ${task.reward}`);
    // Optionally, display a notification to the player
  }

  // ------------------------------
  // 12. Updating Stakeholder Scores
  // ------------------------------
  updateStakeholderScores(stakeholderData) {
    const { key, name, score } = stakeholderData;
    if (this.stakeholderScores[key]) {
      this.stakeholderScores[key].setText(`${name}: ${score}`);
      console.log(`Stakeholder score updated: ${name} - ${score}`);
    }
  }

  // ------------------------------
  // 13. Updating Score
  // ------------------------------
  updateScore(scoreData) {
    this.score += scoreData.amount;
    this.scoreText.setText(`Score: ${this.score}`);
    console.log(`Score updated: ${this.score}`);
  }
}

