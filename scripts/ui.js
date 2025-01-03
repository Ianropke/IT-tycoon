class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Background and layout
    this.cameras.main.setBackgroundColor('#f4f4f4');
    this.createScoreboard();
    this.createBacklog();
    this.createActiveTaskBox();
  }

  createScoreboard() {
    // Top scoreboard
    this.scoreTitle = this.add.text(10, 10, 'Score: 0', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#007aff',
    });

    this.taskGiverScores = this.add.text(150, 10, 'Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#333',
    });
  }

  createBacklog() {
    // Backlog title
    this.add.text(900, 70, 'Tasks (Backlog)', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#333',
    });

    // Column headers
    this.add.text(900, 100, 'Desc', { fontSize: '14px', color: '#666' });
    this.add.text(1100, 100, 'Steps', { fontSize: '14px', color: '#666' });
    this.add.text(1170, 100, 'Risk', { fontSize: '14px', color: '#666' });
    this.add.text(1240, 100, 'Giver', { fontSize: '14px', color: '#666' });

    this.taskRowTexts = [];
  }

  createActiveTaskBox() {
    // Active Task section
    this.add.rectangle(900, 480, 540, 400, 0xf0f0f2).setOrigin(0, 0);
    this.add.text(910, 490, 'Active Task', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#333',
    });

    this.activeLines = [];
    for (let i = 0; i < 6; i++) {
      const line = this.add.text(910, 520 + i * 20, '', {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#333',
      });
      this.activeLines.push(line);
    }

    this.commitBtn = this.createButton(910, 640, '[ Commit ]', '#007aff', this.handleCommit);
    this.gatherBtn = this.createButton(1020, 640, '[ Gather ]', '#34c759', this.handleGather);
    this.finalizeBtn = this.createButton(1130, 640, '[ Finalize ]', '#ff9500', this.handleFinalize);
  }

  createButton(x, y, text, bgColor, callback) {
    return this.add.text(x, y, text, {
      fontFamily: 'Arial',
      fontSize: '16px',
      backgroundColor: bgColor,
      color: '#fff',
      padding: { x: 8, y: 4 },
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', callback.bind(this))
      .setVisible(false); // Hidden by default
  }

  refreshUI() {
    // Update score
    this.scoreTitle.setText(`Score: ${window.playerScore}`);
    this.taskGiverScores.setText(
      `Hospital: ${window.giverScoreboard.hospital} | Infrastructure: ${window.giverScoreboard.infrastructure} | InfoSec: ${window.giverScoreboard.informationSecurity} | CyberSec: ${window.giverScoreboard.cybersecurity}`
    );

    // Update backlog
    this.taskRowTexts.forEach(row => row.forEach(text => text.destroy()));
    this.taskRowTexts = [];
    let y = 120;
    for (const task of window.globalTasks) {
      const desc = this.add.text(900, y, task.description, { fontSize: '14px', color: '#333' });
      const steps = this.add.text(1100, y, `${task.currentStep}/${task.steps.length}`, { fontSize: '14px', color: '#333' });
      const risk = this.add.text(1170, y, task.risk.toString(), { fontSize: '14px', color: '#333' });
      const giver = this.add.text(1240, y, task.giver, { fontSize: '14px', color: '#333' });

      desc.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.selectActiveTask(task.id));

      this.taskRowTexts.push([desc, steps, risk, giver]);
      y += 40;
    }

    // Update active task
    this.updateActiveTaskBox();
  }

  updateActiveTaskBox() {
    const task = window.globalTasks.find(t => t.id === window.activeTaskId);
    if (!task) return;

    this.activeLines[0].setText(`Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep]}`);
    this.activeLines[1].setText(`Status: ${task.status}`);
    this.activeLines[2].setText(`Priority: ${task.priority}`);
    this.activeLines[3].setText(`Risk: ${task.risk}`);
    this.activeLines[4].setText(`Giver: ${task.giver}`);

    this.commitBtn.setVisible(!task.committed);
    this.gatherBtn.setVisible(task.steps[task.currentStep]?.includes('Gather'));
    this.finalizeBtn.setVisible(task.status === 'Ready to finalize');
  }

  handleCommit() {
    commitToTask(window.activeTaskId);
  }

  handleGather() {
    gatherForTask(window.activeTaskId);
  }

  handleFinalize() {
    finalizeTask(window.activeTaskId);
  }
}
