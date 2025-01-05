// src/ui/UIManager.js

export default class UIManager {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.stakeholderScores = {};
    this.backlogTasks = [];
    this.activeTasks = {};

    // Reference to HTML elements
    this.backlogContainer = document.getElementById('backlog-tasks');
    this.activeTasksContainer = document.getElementById('active-tasks');
  }

  createUI() {
    this.createScoreboard();
    this.createStakeholderScores();
    this.setupEventListeners();
  }

  // ------------------------------
  // 1. Scoreboard and Stakeholders
  // ------------------------------
  createScoreboard() {
    // Create a scoreboard element or integrate with existing Phaser text
    // For simplicity, using Phaser's text for scoreboard
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
  // 2. Event Listeners
  // ------------------------------
  setupEventListeners() {
    this.scene.events.on('newTask', this.addBacklogTask.bind(this));
  }

  // ------------------------------
  // 3. Adding Tasks to Backlog
  // ------------------------------
  addBacklogTask(task) {
    this.backlogTasks.push(task);
    this.renderBacklog();
  }

  renderBacklog() {
    this.backlogContainer.innerHTML = ''; // Clear existing tasks
    this.backlogTasks.forEach((task, index) => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task-item');
      taskDiv.innerHTML = `<strong>${task.description}</strong>`;
      taskDiv.addEventListener('click', () => {
        this.commitTask(task);
      });
      this.backlogContainer.appendChild(taskDiv);
    });
  }

  // ------------------------------
  // 4. Committing Task
  // ------------------------------
  commitTask(task) {
    // Move task from backlog to active tasks
    this.backlogTasks = this.backlogTasks.filter(t => t !== task);
    this.renderBacklog();

    // Add to active tasks
    this.activeTasks[task.id] = task; // Assuming each task has a unique id
    this.renderActiveTasks();
    this.scene.commitTask(task); // Update task status
  }

  // ------------------------------
  // 5. Rendering Active Tasks
  // ------------------------------
  renderActiveTasks() {
    this.activeTasksContainer.innerHTML = ''; // Clear existing tasks
    for (let key in this.activeTasks) {
      const task = this.activeTasks[key];
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task-item');
      taskDiv.innerHTML = `<strong>${task.description}</strong><br>Steps: ${task.steps}<br>Risk: ${task.riskLevel}`;

      // Action Buttons
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('task-actions');

      const gatherBtn = document.createElement('button');
      gatherBtn.classList.add('gather-btn');
      gatherBtn.textContent = 'Gather';
      gatherBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering task collapse
        this.handleGather(task.id);
      });

      const finalizeBtn = document.createElement('button');
      finalizeBtn.classList.add('finalize-btn');
      finalizeBtn.textContent = 'Finalize';
      finalizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleFinalize(task.id);
      });

      actionsDiv.appendChild(gatherBtn);
      actionsDiv.appendChild(finalizeBtn);
      taskDiv.appendChild(actionsDiv);

      // Toggle Expand/Collapse
      taskDiv.addEventListener('click', () => {
        taskDiv.classList.toggle('expanded');
      });

      this.activeTasksContainer.appendChild(taskDiv);
    }
  }

  // ------------------------------
  // 6. Handling Gather Action
  // ------------------------------
  handleGather(taskId) {
    const task = this.activeTasks[taskId];
    if (task.steps > 0) {
      task.progress();
      console.log(`Gathering resources for task: ${task.description}, Steps left: ${task.steps}`);
      if (task.steps === 0) {
        this.finalizeTask(taskId);
      } else {
        this.renderActiveTasks();
      }
    }
  }

  // ------------------------------
  // 7. Handling Finalize Action
  // ------------------------------
  handleFinalize(taskId) {
    const task = this.activeTasks[taskId];
    if (task.isCompleted()) {
      this.finalizeTask(taskId);
    } else {
      console.log(`Cannot finalize task: ${task.description}. Steps remaining.`);
      // Optionally, display a notification to the player
    }
  }

  // ------------------------------
  // 8. Finalizing Task
  // ------------------------------
  finalizeTask(taskId) {
    const task = this.activeTasks[taskId];
    this.score += task.reward;
    this.scoreText.setText(`Score: ${this.score}`);
    this.scene.stakeholders[task.stakeholder.key].increaseScore(task.reward);
    this.scene.stakeholders[task.stakeholder.key].score = this.scene.stakeholders[task.stakeholder.key].score;
    // Update stakeholder scores if needed

    // Remove task from active tasks
    delete this.activeTasks[taskId];
    this.renderActiveTasks();

    console.log(`Task finalized: ${task.description}, Reward: ${task.reward}`);
    // Optionally, display a notification to the player
  }

  // ------------------------------
  // 9. Updating Stakeholder Scores
  // ------------------------------
  updateStakeholderScores(stakeholderData) {
    const { key, name, score } = stakeholderData;
    if (this.stakeholderScores[key]) {
      this.stakeholderScores[key].setText(`${name}: ${score}`);
      console.log(`Stakeholder score updated: ${name} - ${score}`);
    }
  }

  // ------------------------------
  // 10. Updating Score
  // ------------------------------
  updateScore(scoreData) {
    this.score += scoreData.amount;
    this.scoreText.setText(`Score: ${this.score}`);
    console.log(`Score updated: ${this.score}`);
  }
}
