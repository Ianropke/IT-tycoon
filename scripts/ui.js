// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.cameras.main.setViewport(0, 0, 1440, 900);
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

    // ---------- SCOREBOARD BAR ----------
    this.scorebarBg = this.add.rectangle(0, 0, 1440, 50, 0xf4f4f4).setOrigin(0, 0);
    this.scoreText = this.add.text(20, 15, 'Score: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '20px',
      color: '#007aff',
    });

    this.taskgiverScores = this.add.text(300, 15, 'Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      color: '#333333',
    });

    // ---------- BACKLOG SECTION ----------
    this.backlogBg = this.add.rectangle(900, 50, 540, 450, 0xffffff).setOrigin(0, 0);
    this.add.text(910, 60, 'Tasks (Backlog)', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333',
    });

    this.add.text(910, 90, 'Desc', { fontSize: '14px', color: '#666666' });
    this.add.text(1060, 90, 'Steps', { fontSize: '14px', color: '#666666' });
    this.add.text(1120, 90, 'Risk', { fontSize: '14px', color: '#666666' });
    this.add.text(1180, 90, 'Giver', { fontSize: '14px', color: '#666666' });

    this.backlogTaskRows = [];

    // ---------- ACTIVE TASK SECTION ----------
    this.activeBg = this.add.rectangle(900, 500, 540, 400, 0xf8f8f8).setOrigin(0, 0);
    this.add.text(910, 510, 'Active Task', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333',
    });

    this.activeTaskDetails = [];
    for (let i = 0; i < 7; i++) {
      this.activeTaskDetails.push(this.add.text(910, 540 + i * 20, '', { fontSize: '14px', color: '#333333' }));
    }

    this.commitButton = this.add.text(910, 680, '[ Commit ]', {
      fontSize: '16px',
      backgroundColor: '#007aff',
      color: '#fff',
      padding: { x: 8, y: 4 },
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleCommit());

    this.gatherButton = this.add.text(1010, 680, '[ Gather ]', {
      fontSize: '16px',
      backgroundColor: '#34c759',
      color: '#fff',
      padding: { x: 8, y: 4 },
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleGather());

    this.finalizeButton = this.add.text(1110, 680, '[ Finalize ]', {
      fontSize: '16px',
      backgroundColor: '#ff9500',
      color: '#fff',
      padding: { x: 8, y: 4 },
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleFinalize());

    this.activeTaskId = null;
    this.documented = false;

    this.time.addEvent({
      delay: 1000,
      callback: () => this.refreshUI(),
      loop: true,
    });
  }

  refreshUI() {
    this.scoreText.setText(`Score: ${window.playerScore}`);
    this.taskgiverScores.setText(
      `Hospital: ${window.giverScoreboard.hospital} | Infrastructure: ${window.giverScoreboard.infrastructure} | InfoSec: ${window.giverScoreboard.informationSecurity} | CyberSec: ${window.giverScoreboard.cybersecurity}`
    );

    this.updateBacklog();
    this.updateActiveTask();
  }

  updateBacklog() {
    this.backlogTaskRows.forEach((row) => row.forEach((cell) => cell.destroy()));
    this.backlogTaskRows = [];

    if (!window.canViewBacklog) {
      const noTasks = this.add.text(910, 120, 'Stand on orange backlog to view tasks.', {
        fontSize: '14px',
        color: '#999999',
      });
      this.backlogTaskRows.push([noTasks]);
      return;
    }

    let y = 120;
    window.globalTasks.forEach((task) => {
      const desc = `[${task.status}] ${task.description}`;
      const steps = `${task.currentStep}/${task.steps.length}`;
      const risk = `${task.risk}`;
      const giver = `${task.giver}`;

      const descText = this.add.text(910, y, desc, { fontSize: '14px', color: '#333333' }).setInteractive();
      const stepsText = this.add.text(1060, y, steps, { fontSize: '14px', color: '#333333' });
      const riskText = this.add.text(1120, y, risk, { fontSize: '14px', color: '#333333' });
      const giverText = this.add.text(1180, y, giver, { fontSize: '14px', color: '#333333' });

      descText.on('pointerdown', () => this.selectTask(task.id));

      this.backlogTaskRows.push([descText, stepsText, riskText, giverText]);
      y += 30;
    });
  }

  updateActiveTask() {
    const task = window.globalTasks.find((t) => t.id === this.activeTaskId);

    this.activeTaskDetails.forEach((line) => line.setText(''));

    if (task) {
      const details = [
        `Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep]}`,
        `Status: ${task.status}`,
        `Priority: ${task.priority}`,
        `Risk: ${task.risk}`,
        task.isFeature ? 'Feature Task' : 'Maintenance Task',
        `Giver: ${task.giver}`,
      ];
      details.forEach((detail, i) => this.activeTaskDetails[i].setText(detail));

      this.commitButton.setVisible(!task.committed);
      this.gatherButton.setVisible(task.steps[task.currentStep]?.includes('gather'));
      this.finalizeButton.setVisible(task.status === 'Ready to finalize');
    } else {
      this.commitButton.setVisible(false);
      this.gatherButton.setVisible(false);
      this.finalizeButton.setVisible(false);
    }
  }

  selectTask(taskId) {
    this.activeTaskId = taskId;
    this.updateActiveTask();
  }

  handleCommit() {
    if (this.activeTaskId) commitToTask(this.activeTaskId);
  }

  handleGather() {
    console.log('Gather action performed.');
  }

  handleFinalize() {
    if (this.activeTaskId) finalizeTask(this.activeTaskId);
  }
}

