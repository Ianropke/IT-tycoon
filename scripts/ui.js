class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Setup background for UI sections
    this.cameras.main.setViewport(900, 0, 540, 900);
    this.cameras.main.setBackgroundColor('rgba(255, 255, 255, 1)');

    // Scoreboard at the top
    this.scoreTitle = this.add.text(20, 10, 'Score: 0', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#007aff',
    }).setOrigin(0, 0);

    this.scoreboard = this.add.text(300, 10, 'Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#333',
    }).setOrigin(0, 0);

    // Tasks Backlog title
    this.backlogTitle = this.add.text(910, 50, 'Tasks (Backlog)', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#333',
    });

    // Columns for the backlog table
    this.add.text(910, 80, 'Desc', { fontSize: '14px', color: '#666' });
    this.add.text(1100, 80, 'Steps', { fontSize: '14px', color: '#666' });
    this.add.text(1160, 80, 'Risk', { fontSize: '14px', color: '#666' });
    this.add.text(1210, 80, 'Giver', { fontSize: '14px', color: '#666' });

    // Task rows for backlog
    this.taskRows = [];

    // Active Task section
    this.activeTaskTitle = this.add.text(910, 420, 'Active Task:', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#333',
    });

    this.activeTaskDetails = [];
    for (let i = 0; i < 6; i++) {
      this.activeTaskDetails.push(this.add.text(910, 450 + i * 20, '', {
        fontSize: '14px',
        color: '#333',
      }));
    }

    // Buttons for Commit, Gather, and Finalize
    this.commitButton = this.add.text(910, 600, '[ Commit ]', {
      fontSize: '16px',
      backgroundColor: '#007aff',
      color: '#fff',
      padding: { x: 10, y: 5 },
    }).setInteractive().on('pointerdown', () => this.handleCommit());

    this.gatherButton = this.add.text(1010, 600, '[ Gather ]', {
      fontSize: '16px',
      backgroundColor: '#34c759',
      color: '#fff',
      padding: { x: 10, y: 5 },
    }).setInteractive().on('pointerdown', () => this.handleGather());

    this.finalizeButton = this.add.text(1110, 600, '[ Finalize ]', {
      fontSize: '16px',
      backgroundColor: '#ff9500',
      color: '#fff',
      padding: { x: 10, y: 5 },
    }).setInteractive().on('pointerdown', () => this.handleFinalize());

    // Hide buttons initially
    this.commitButton.setVisible(false);
    this.gatherButton.setVisible(false);
    this.finalizeButton.setVisible(false);

    // Periodically refresh the UI
    this.time.addEvent({
      delay: 1000,
      callback: () => this.updateUI(),
      loop: true,
    });

    // Store active task ID
    this.activeTaskId = null;
    this.documented = false;
  }

  updateUI() {
    // Update score and scoreboard
    this.scoreTitle.setText(`Score: ${window.playerScore}`);
    this.scoreboard.setText(
      `Hospital: ${window.giverScoreboard.hospital} | Infrastructure: ${window.giverScoreboard.infrastructure} | ` +
      `InfoSec: ${window.giverScoreboard.infoSec} | CyberSec: ${window.giverScoreboard.cyberSec}`
    );

    // Update tasks in backlog
    this.updateBacklog();

    // Update active task
    this.updateActiveTask();
  }

  updateBacklog() {
    this.taskRows.forEach(row => row.forEach(cell => cell.destroy()));
    this.taskRows = [];

    if (!window.canViewBacklog || window.globalTasks.length === 0) {
      const noTasksText = this.add.text(910, 100, 'Stand on orange backlog to see tasks.', {
        fontSize: '14px',
        color: '#999',
        wordWrap: { width: 500 },
      });
      this.taskRows.push([noTasksText]);
      return;
    }

    let y = 100;
    for (let i = 0; i < window.globalTasks.length; i++) {
      const task = window.globalTasks[i];
      const rowDesc = `[${task.status}] ${task.description}`;
      const textDesc = this.add.text(910, y, rowDesc, { fontSize: '14px', color: '#333' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.selectActiveTask(task.id));

      const textSteps = this.add.text(1100, y, `${task.currentStep}/${task.steps.length}`, { fontSize: '14px', color: '#333' });
      const textRisk = this.add.text(1160, y, `${task.risk}`, { fontSize: '14px', color: '#333' });
      const textGiver = this.add.text(1210, y, `${task.giver}`, { fontSize: '14px', color: '#333' });

      this.taskRows.push([textDesc, textSteps, textRisk, textGiver]);
      y += 20;

      if (y > 400) {
        const moreTasksText = this.add.text(910, y, '...more tasks hidden...', { fontSize: '14px', color: '#999' });
        this.taskRows.push([moreTasksText]);
        break;
      }
    }
  }

  updateActiveTask() {
    for (let line of this.activeTaskDetails) {
      line.setText('');
    }

    if (!this.activeTaskId) {
      this.activeTaskDetails[0].setText('(No active task)');
      this.commitButton.setVisible(false);
      this.gatherButton.setVisible(false);
      this.finalizeButton.setVisible(false);
      return;
    }

    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    this.activeTaskDetails[0].setText(`Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep]}`);
    this.activeTaskDetails[1].setText(`Status: ${task.status}`);
    this.activeTaskDetails[2].setText(`Priority: ${task.priority}`);
    this.activeTaskDetails[3].setText(`Risk: ${task.risk}`);
    this.activeTaskDetails[4].setText(`Giver: ${task.giver}`);

    // Display appropriate buttons
    this.commitButton.setVisible(!task.committed);
    this.gatherButton.setVisible(task.steps[task.currentStep].toLowerCase().includes('gather'));
    this.finalizeButton.setVisible(task.status === 'Ready to finalize');
  }

  selectActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false;
    this.updateActiveTask();
  }

  handleCommit() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
  }

  handleGather() {
    console.log('Gather logic (handled by GameScene)');
  }

  handleFinalize() {
    if (!this.activeTaskId) return;
    if (!this.documented) {
      console.log('Document the task before finalizing!');
      return;
    }
    completeTask(this.activeTaskId);
    this.activeTaskId = null;
    this.updateActiveTask();
  }
}
