class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.createScoreboard();
    this.createBacklog();
    this.createActiveTaskSection();

    // Periodically refresh the UI
    this.time.addEvent({ delay: 1000, callback: this.refreshUI, loop: true });
  }

  createScoreboard() {
    // Scoreboard at the top of the screen
    this.add.text(20, 10, 'Score:', { font: '24px Arial', color: '#007aff' });
    this.scoreText = this.add.text(100, 10, '0', { font: '24px Arial', color: '#007aff' });

    // Stakeholder satisfaction
    this.stakeholderText = this.add.text(300, 10, '', {
      font: '16px Arial',
      color: '#333333',
    });
  }

  createBacklog() {
    // Backlog title
    this.add.text(910, 70, 'Tasks (Backlog)', { font: '18px Arial', color: '#333333' });

    // Backlog column headers
    this.add.text(910, 100, 'Desc', { font: '14px Arial', color: '#666666' });
    this.add.text(1060, 100, 'Steps', { font: '14px Arial', color: '#666666' });
    this.add.text(1120, 100, 'Risk', { font: '14px Arial', color: '#666666' });
    this.add.text(1160, 100, 'Giver', { font: '14px Arial', color: '#666666' });

    // Rows for tasks
    this.backlogRows = [];
  }

  createActiveTaskSection() {
    // Active task box
    this.add.text(910, 480, 'Active Task', { font: '18px Arial', color: '#333333' });

    this.activeTaskLines = [];
    for (let i = 0; i < 7; i++) {
      const line = this.add.text(910, 500 + i * 20, '', { font: '14px Arial', color: '#333333' });
      this.activeTaskLines.push(line);
    }

    // Buttons for task management
    this.commitButton = this.add
      .text(910, 680, '[ Commit ]', {
        font: '16px Arial',
        backgroundColor: '#007aff',
        color: '#fff',
        padding: { x: 8, y: 4 },
      })
      .setInteractive()
      .on('pointerdown', () => this.handleCommit());

    this.gatherButton = this.add
      .text(1010, 680, '[ Gather ]', {
        font: '16px Arial',
        backgroundColor: '#34c759',
        color: '#fff',
        padding: { x: 8, y: 4 },
      })
      .setInteractive()
      .on('pointerdown', () => this.handleGather());

    this.finalizeButton = this.add
      .text(1110, 680, '[ Finalize ]', {
        font: '16px Arial',
        backgroundColor: '#ff9500',
        color: '#fff',
        padding: { x: 8, y: 4 },
      })
      .setInteractive()
      .on('pointerdown', () => this.handleFinalize());

    this.activeTaskId = null; // No active task initially
    this.documented = false; // Documentation status
  }

  refreshUI() {
    this.updateScoreboard();
    this.updateBacklog();
    this.updateActiveTask();
  }

  updateScoreboard() {
    // Update score and stakeholder satisfaction
    this.scoreText.setText(`${window.playerScore}`);
    this.stakeholderText.setText(
      `Hospital: ${window.giverScoreboard.hospital} | Infrastructure: ${window.giverScoreboard.infrastructure} | InfoSec: ${window.giverScoreboard.informationSecurity} | CyberSec: ${window.giverScoreboard.cybersecurity} | Legal: ${window.giverScoreboard.legal}`
    );
  }

  updateBacklog() {
    // Clear old rows
    this.backlogRows.forEach((row) => row.forEach((col) => col.destroy()));
    this.backlogRows = [];

    let y = 120;
    window.globalTasks.forEach((task) => {
      const desc = `[${task.status}] ${task.description}`;
      const steps = `${task.currentStep}/${task.steps.length}`;
      const risk = `${task.risk}`;
      const giver = `${task.giver}`;

      const descText = this.add
        .text(910, y, desc, { font: '14px Arial', color: '#333333' })
        .setInteractive()
        .on('pointerdown', () => this.selectTask(task.id));

      const stepsText = this.add.text(1060, y, steps, { font: '14px Arial', color: '#333333' });
      const riskText = this.add.text(1120, y, risk, { font: '14px Arial', color: '#333333' });
      const giverText = this.add.text(1160, y, giver, { font: '14px Arial', color: '#333333' });

      this.backlogRows.push([descText, stepsText, riskText, giverText]);
      y += 30;
    });
  }

  updateActiveTask() {
    const task = getTaskById(this.activeTaskId);

    // Update active task details
    this.activeTaskLines.forEach((line, i) => {
      line.setText(task && task.steps[i] ? task.steps[i] : '');
    });

    // Show buttons dynamically based on task status
    this.commitButton.setVisible(task && !task.committed);
    this.gatherButton.setVisible(task && task.steps[task.currentStep]?.includes('Gather'));
    this.finalizeButton.setVisible(task && task.status === 'Ready to finalize' && this.documented);
  }

  selectTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false; // Reset documentation status
    this.updateActiveTask();
  }

  handleCommit() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
    this.updateActiveTask();
  }

  handleGather() {
    console.log('Gather step triggered.');
  }

  handleFinalize() {
    if (!this.documented) {
      console.log('Document the task first!');
      return;
    }

    if (this.activeTaskId) {
      finalizeTask(this.activeTaskId);
      this.activeTaskId = null;
      this.updateActiveTask();
    }
  }
}
