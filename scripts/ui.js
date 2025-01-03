// Updated UI Code (ui.js)

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // 1. Layout Adjustments for Score and Task Giver Tally
    this.cameras.main.setViewport(0, 0, 1440, 900);
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

    // Score and Task Giver Tally Bar
    this.scorebarBg = this.add.rectangle(0, 0, 1440, 40, 0xf4f4f4).setOrigin(0, 0);
    this.scoreTitle = this.add.text(20, 10, 'Score: 0 | Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#007aff'
    });

    // Right UI Background for Backlog and Active Task Details
    this.rightBg = this.add.rectangle(900, 40, 540, 860, 0xffffff).setOrigin(0, 0);

    // Backlog Table Title and Headers
    this.backlogTitle = this.add.text(910, 50, 'Tasks (Backlog)', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      color: '#333333'
    });
    this.add.text(910, 80, 'Desc', { fontSize: '14px', color: '#666666' });
    this.add.text(1080, 80, 'Steps', { fontSize: '14px', color: '#666666' });
    this.add.text(1140, 80, 'Risk', { fontSize: '14px', color: '#666666' });
    this.add.text(1200, 80, 'Giver', { fontSize: '14px', color: '#666666' });

    // Placeholder for Backlog Rows
    this.taskRowTexts = [];

    // Active Task Details Box
    this.activeBg = this.add.rectangle(900, 480, 540, 380, 0xf0f0f2).setOrigin(0, 0);
    this.activeTitle = this.add.text(910, 490, 'Active Task', {
      fontFamily: 'Helvetica',
      fontSize: '16px',
      color: '#333333'
    });
    this.activeLines = [];
    for (let i = 0; i < 6; i++) {
      this.activeLines.push(this.add.text(910, 520 + i * 20, '', {
        fontFamily: 'Helvetica',
        fontSize: '14px',
        color: '#333333'
      }));
    }

    // Task Action Buttons
    this.commitBtn = this.createButton(910, 680, '[ Commit ]', '#007aff', this.handleCommit.bind(this));
    this.gatherBtn = this.createButton(1010, 680, '[ Gather ]', '#34c759', this.handleGather.bind(this));
    this.finalizeBtn = this.createButton(1110, 680, '[ Finalize ]', '#ff9500', this.handleFinalize.bind(this));

    // State Variables
    this.activeTaskId = null;
    this.documented = false;

    // Refresh UI Every Second
    this.time.addEvent({ delay: 1000, callback: this.refreshUI, callbackScope: this, loop: true });
  }

  createButton(x, y, text, bgColor, callback) {
    return this.add.text(x, y, text, {
      fontFamily: 'Helvetica',
      fontSize: '14px',
      backgroundColor: bgColor,
      color: '#fff',
      padding: { x: 8, y: 4 }
    }).setInteractive({ useHandCursor: true }).on('pointerdown', callback);
  }

  refreshUI() {
    // Update Score and Task Giver Tally
    const scoreText = `Score: ${window.playerScore} | Hospital: ${window.giverScoreboard.hospital} | Infrastructure: ${window.giverScoreboard.infrastructure} | InfoSec: ${window.giverScoreboard.informationSecurity} | CyberSec: ${window.giverScoreboard.cybersecurity}`;
    this.scoreTitle.setText(scoreText);

    // Update Backlog Table
    this.taskRowTexts.forEach(row => row.forEach(cell => cell.destroy()));
    this.taskRowTexts = [];

    if (!window.canViewBacklog) {
      this.taskRowTexts.push([this.add.text(910, 110, 'Stand on the backlog to view tasks.', {
        fontSize: '14px',
        color: '#999999'
      })]);
      return;
    }

    let y = 110;
    for (let task of window.globalTasks) {
      if (y > 460) break;
      const desc = `[${task.status}] ${task.description}`;
      const steps = `${task.currentStep}/${task.steps.length}`;
      const risk = `${task.risk}`;
      const giver = `${task.giver}`;

      const descText = this.add.text(910, y, desc, { fontSize: '14px', color: '#333333' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.selectActiveTask(task.id));
      const stepsText = this.add.text(1080, y, steps, { fontSize: '14px', color: '#333333' });
      const riskText = this.add.text(1140, y, risk, { fontSize: '14px', color: '#333333' });
      const giverText = this.add.text(1200, y, giver, { fontSize: '14px', color: '#333333' });

      this.taskRowTexts.push([descText, stepsText, riskText, giverText]);
      y += 30;
    }

    // Update Active Task Box
    this.updateActiveBox();
  }

  selectActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false;
    this.updateActiveBox();
  }

  updateActiveBox() {
    for (let line of this.activeLines) line.setText('');
    this.commitBtn.setVisible(false);
    this.gatherBtn.setVisible(false);
    this.finalizeBtn.setVisible(false);

    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    this.activeLines[0].setText(`Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep] || 'All steps done.'}`);
    this.activeLines[1].setText(`Status: ${task.status}`);
    this.activeLines[2].setText(`Priority: ${task.priority}`);
    this.activeLines[3].setText(`Risk: ${task.risk}`);
    this.activeLines[4].setText(task.isFeature ? 'Feature Task' : 'Maintenance Task');
    this.activeLines[5].setText(`Giver: ${task.giver}`);

    if (!task.committed) this.commitBtn.setVisible(true);
    if (task.currentStep < task.steps.length && task.steps[task.currentStep].includes('gather')) this.gatherBtn.setVisible(true);
    if (task.status === 'Ready to finalize') this.finalizeBtn.setVisible(true);
  }

  handleCommit() {
    if (this.activeTaskId) commitToTask(this.activeTaskId);
  }

  handleGather() {
    console.log('Gather button clicked. Ensure appropriate logic.');
  }

  handleFinalize() {
    if (!this.documented) {
      console.log('Please document the task first!');
      return;
    }
    const task = getTaskById(this.activeTaskId);
    if (task && task.status === 'Ready to finalize') {
      completeTask(task.id);
      task.status = 'Done';
      this.activeTaskId = null;
    }
  }
}
