// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // UI Layout
    this.cameras.main.setViewport(0, 0, 1440, 900);
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

    // ---------- SCOREBOARD BAR ----------
    this.scorebarBg = this.add.rectangle(0, 0, 1440, 60, 0xf4f4f4).setOrigin(0, 0);
    this.scoreTitle = this.add.text(20, 15, 'Score: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '24px',
      color: '#007aff',
    });
    this.scoreboardLines = this.add.text(700, 15, '', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      color: '#333333',
    });

    // ---------- RIGHT PANEL BACKGROUND ----------
    this.rightBg = this.add.rectangle(900, 60, 540, 840, 0xffffff).setOrigin(0, 0);

    // ---------- BACKLOG SECTION ----------
    this.backlogTitle = this.add.text(910, 70, 'Tasks (Backlog)', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333',
    });
    this.add.text(910, 100, 'Desc', { fontSize: '14px', color: '#666666' });
    this.add.text(1060, 100, 'Steps', { fontSize: '14px', color: '#666666' });
    this.add.text(1120, 100, 'Risk', { fontSize: '14px', color: '#666666' });
    this.add.text(1160, 100, 'Giver', { fontSize: '14px', color: '#666666' });

    this.taskRowTexts = [];

    // ---------- ACTIVE TASK SECTION ----------
    this.activeBg = this.add.rectangle(900, 480, 540, 420, 0xf0f0f2).setOrigin(0, 0);
    this.activeTitle = this.add.text(910, 490, 'Active Task', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333',
    });

    this.activeLines = [];
    for (let i = 0; i < 7; i++) {
      const line = this.add.text(910, 520 + i * 20, '', {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
        color: '#333333',
      });
      this.activeLines.push(line);
    }

    this.commitBtn = this.add.text(910, 700, '[ Commit ]', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      backgroundColor: '#007aff',
      color: '#fff',
      padding: { x: 8, y: 4 },
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleCommit());

    this.gatherBtn = this.add.text(1010, 700, '[ Gather ]', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      backgroundColor: '#34c759',
      color: '#fff',
      padding: { x: 8, y: 4 },
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleGather());

    this.finalizeBtn = this.add.text(1110, 700, '[ Finalize ]', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      backgroundColor: '#ff9500',
      color: '#fff',
      padding: { x: 8, y: 4 },
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleFinalize());

    this.activeTaskId = null;
    this.documented = false;

    // Refresh every second
    this.time.addEvent({
      delay: 1000,
      callback: () => this.refreshUI(),
      loop: true,
    });
  }

  refreshUI() {
    // Update score
    this.scoreTitle.setText(`Score: ${window.playerScore}`);
    this.scoreboardLines.setText(
      `Hospital: ${window.giverScoreboard.hospital}  |  ` +
        `Infrastructure: ${window.giverScoreboard.infrastructure}  |  ` +
        `InfoSec: ${window.giverScoreboard.informationSecurity}  |  ` +
        `CyberSec: ${window.giverScoreboard.cybersecurity}`
    );

    // Refresh backlog tasks
    this.taskRowTexts.forEach(row => row.forEach(t => t.destroy()));
    this.taskRowTexts = [];
    let y = 120;

    if (!window.canViewBacklog) {
      const noTasks = this.add.text(910, y, 'Stand on orange backlog to see tasks.', {
        fontSize: '14px',
        color: '#999999',
        wordWrap: { width: 520 },
      });
      this.taskRowTexts.push([noTasks]);
      return;
    }

    for (let i = 0; i < window.globalTasks.length; i++) {
      const t = window.globalTasks[i];
      const steps = `${t.currentStep}/${t.steps.length}`;
      const rowDesc = `[${t.status}] ${t.description} ${t.isFeature ? '[Feature]' : '[Maint]'}`;
      const risk = `${t.risk}`;
      const giv = `${t.giver}`;
      const textDesc = this.add.text(910, y, rowDesc, { fontSize: '14px', color: '#333333' })
        .setInteractive({ useHandCursor: true });
      textDesc.on('pointerdown', () => this.selectActiveTask(t.id));

      const textSteps = this.add.text(1060, y, steps, { fontSize: '14px', color: '#333333' });
      const textRisk = this.add.text(1120, y, risk, { fontSize: '14px', color: '#333333' });
      const textGiver = this.add.text(1160, y, giv, { fontSize: '14px', color: '#333333' });

      this.taskRowTexts.push([textDesc, textSteps, textRisk, textGiver]);
      y += 30;

      if (y > 460) {
        const moreMsg = this.add.text(910, y, '...more tasks hidden...', {
          fontSize: '14px',
          color: '#888888',
        });
        this.taskRowTexts.push([moreMsg]);
        break;
      }
    }

    this.updateActiveBox();
  }

  selectActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false;
    this.updateActiveBox();
  }

  updateActiveBox() {
    for (let i = 0; i < this.activeLines.length; i++) {
      this.activeLines[i].setText('');
    }

    this.commitBtn.setVisible(false);
    this.gatherBtn.setVisible(false);
    this.finalizeBtn.setVisible(false);

    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    const stepDescriptions = task.steps
      .map((step, index) => `${index + 1}. ${step} ${index === task.currentStep ? '(Current Step)' : ''}`)
      .join('\n');
    this.activeLines[0].setText(stepDescriptions);

    this.activeLines[1].setText(`Status: ${task.status}`);
    this.activeLines[2].setText(`Priority: ${task.priority}`);
    this.activeLines[3].setText(`Risk: ${task.risk}`);
    this.activeLines[4].setText(task.isFeature ? 'Feature Task' : 'Maintenance Task');
    this.activeLines[5].setText(`Giver: ${task.giver}`);

    if (!task.committed) this.commitBtn.setVisible(true);
    if (task.currentStep < task.steps.length && task.steps[task.currentStep].toLowerCase().includes('gather')) {
      this.gatherBtn.setVisible(true);
    }
    if (task.status === 'Ready to finalize') this.finalizeBtn.setVisible(true);
  }

  handleCommit() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
  }

  handleGather() {
    console.log('User pressed Gather—this can be expanded if needed.');
  }

  handleFinalize() {
    if (!this.activeTaskId) return;
    if (!this.documented) {
      console.log('Document first!');
      return;
    }
    const task = getTaskById(this.activeTaskId);
    if (!task) return;
    if (task.status === 'Ready to finalize') {
      completeTask(task.id);
      task.status = 'Done';
      this.activeTaskId = null;
    }
  }
}
