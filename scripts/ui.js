// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // 1) Create top bar (score + scoreboard + minimal instructions)
    this.createTopBar();

    // 2) Create left panel for tasks
    this.createLeftPanel();

    // 3) Create right panel for active task
    this.createRightPanel();

    // Periodic refresh
    this.time.addEvent({
      delay: 1000,
      callback: this.refreshAll,
      callbackScope: this,
      loop: true
    });
  }

  createTopBar() {
    // Top bar background
    const topBg = this.add.rectangle(0, 0, 1440, 100, 0x222222)
      .setOrigin(0,0);

    // Score text
    this.scoreText = this.add.text(20, 10, 'Score: 0', {
      fontSize: '20px', fill: '#ff0000'
    });

    // Giver scoreboard text
    this.giverScoreText = this.add.text(20, 40, 'Completed tasks:\n - hospital: 0\n - infra: 0\n - infoSec: 0', {
      fontSize: '14px', fill: '#ffffff'
    });

    // Minimal instructions
    this.instructionsText = this.add.text(400, 10,
      'Arrow keys to move. Stand on the orange backlog to see tasks. Max 10 tasks.\nSome tasks have "gather," others do not. Must document tasks before finalizing.\nInformation Security can also give tasks now. Score is at left.',
      { fontSize: '14px', fill: '#ffffff' }
    );
  }

  createLeftPanel() {
    // Left panel for backlog
    // x=0, y=100, width ~400, height ~800
    const leftBg = this.add.rectangle(0, 100, 400, 800, 0x333333)
      .setOrigin(0,0);

    this.leftPanelTitle = this.add.text(10, 110, 'Tasks (Backlog)', {
      fontSize: '18px', fill: '#ffffff'
    });
    // We'll show tasks starting at y=140 or so
    this.taskTexts = [];
  }

  createRightPanel() {
    // Right panel for active task
    // x=400, y=100, width=1440-400=1040, height=800
    const rightBg = this.add.rectangle(400, 100, 1040, 800, 0xcccccc)
      .setOrigin(0,0);

    this.activeTaskContainer = this.add.container(410, 110); 
    // We'll place everything inside this container.

    // Title
    this.panelTitle = this.add.text(0, 0, 'Active Task:', { fontSize: '20px', fill: '#000' });
    // Step info
    this.stepText = this.add.text(0, 30, '', { fontSize: '16px', fill: '#333', wordWrap: { width: 1000 } });
    this.statusText = this.add.text(0, 60, '', { fontSize: '16px', fill: '#333' });
    this.priorityText = this.add.text(0, 90, '', { fontSize: '16px', fill: '#333' });
    this.riskText = this.add.text(0, 120, '', { fontSize: '16px', fill: '#f00' });
    this.taskTypeText = this.add.text(0, 150, '', { fontSize: '16px', fill: '#008000' });
    this.giverText = this.add.text(0, 180, '', { fontSize: '16px', fill: '#008080' });

    // Document + Commit + Gather + Finalize
    this.documented = false; // track if user has documented this task
    this.documentBtn = this.add.text(0, 220, '[ Document Task ]', {
      fontSize: '16px', fill: '#fff', backgroundColor: '#4444ff', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleDocument());

    this.commitBtn = this.add.text(160, 220, '[ Commit to Task ]', {
      fontSize: '16px', fill: '#fff', backgroundColor: '#0000ff', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.commitActiveTask());

    this.gatherBtn = this.add.text(0, 260, '[ Gather Everyone ]', {
      fontSize: '16px', fill: '#fff', backgroundColor: '#ff0000', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleGather());

    this.finalizeBtn = this.add.text(200, 260, '[ Finalize Task ]', {
      fontSize: '16px', fill: '#000', backgroundColor: '#00ff00', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleFinalize());

    // We'll show the "all steps" text if you're in backlog or if you want
    this.allStepsLabel = this.add.text(0, 300, '', { fontSize: '16px', fill: '#000', underline: true });
    this.allStepsText = this.add.text(0, 330, '', { fontSize: '14px', fill: '#333', wordWrap: { width: 1000 } });

    this.activeTaskContainer.add([
      this.panelTitle, this.stepText, this.statusText, this.priorityText,
      this.riskText, this.taskTypeText, this.giverText,
      this.documentBtn, this.commitBtn, this.gatherBtn, this.finalizeBtn,
      this.allStepsLabel, this.allStepsText
    ]);
    this.activeTaskContainer.setVisible(false);
  }

  handleDocument() {
    // Mark the current active task as documented
    // We'll store a local flag "documented"
    // If we want to store it in the task itself, we can do so too
    this.documented = true;
  }

  commitActiveTask() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
    this.updateActiveTaskPanel();
  }

  handleGather() {
    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;
    const currentStepText = (task.steps[task.currentStep] || '').toLowerCase();
    if (currentStepText.includes('gather')) {
      advanceTaskStep(task.id);
      this.updateActiveTaskPanel();
    }
  }

  handleFinalize() {
    // Only finalize if documented
    if (!this.activeTaskId) return;
    if (!this.documented) {
      // Possibly show a message telling the user "You must document first"
      console.log('You must document this task first!');
      return;
    }
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    if (task.status === 'Ready to finalize') {
      completeTask(task.id);
      task.status = 'Done';
      // Clear active ID
      this.activeTaskId = null;
      this.activeTaskContainer.setVisible(false);
      this.documented = false; // reset for next task
    }
  }

  pickActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.activeTaskContainer.setVisible(true);
    this.documented = false; // reset doc for new active
    this.updateActiveTaskPanel();
  }

  updateActiveTaskPanel() {
    if (!this.activeTaskId) {
      this.activeTaskContainer.setVisible(false);
      return;
    }
    const task = getTaskById(this.activeTaskId);
    if (!task) {
      this.activeTaskContainer.setVisible(false);
      return;
    }

    // Basic info
    const cur = task.currentStep;
    const total = task.steps.length;
    let stepInfo = (cur >= total)
      ? 'All steps done. Must document before finalizing.'
      : `Step ${cur+1} of ${total}: ${task.steps[cur]}`;

    this.stepText.setText(stepInfo);
    this.statusText.setText(`Status: ${task.status}`);
    this.priorityText.setText(`Priority: ${task.priority}`);
    this.riskText.setText(`Risk: ${task.risk}`);
    this.taskTypeText.setText(task.isFeature ? 'Feature Task' : 'Maintenance Task');
    this.giverText.setText(`Giver: ${task.giver}`);

    // Show commit button if not committed
    this.commitBtn.setVisible(!task.committed);

    // Show gather button only if the current step is "gather"
    if (cur < total && task.steps[cur].toLowerCase().includes('gather')) {
      this.gatherBtn.setVisible(true);
    } else {
      this.gatherBtn.setVisible(false);
    }

    // Show all steps if in backlog or always? 
    // We'll show it always for clarity, or only if "window.canViewBacklog" if you prefer:
    // if (window.canViewBacklog) ...
    this.allStepsLabel.setText('All Steps:');
    let lines = '';
    for (let i=0; i<task.steps.length; i++) {
      lines += `${i+1}) ${task.steps[i]}\n   - ${task.educationalExplanations[i]}\n\n`;
    }
    this.allStepsText.setText(lines);
  }

  refreshAll() {
    this.refreshTopBar();
    this.refreshLeftPanel();
    this.updateActiveTaskPanel();
  }

  refreshTopBar() {
    // Score
    this.scoreText.setText(`Score: ${window.playerScore}`);

    // Giver scoreboard
    const boardStr = 
      `Completed tasks:\n` +
      ` - hospital: ${window.giverScoreboard.hospital}\n` +
      ` - infrastructure: ${window.giverScoreboard.infrastructure}\n` +
      ` - informationSecurity: ${window.giverScoreboard.informationSecurity}\n`;
    this.giverScoreText.setText(boardStr);
  }

  refreshLeftPanel() {
    // Clear old text objects
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    // If user not in backlog, display message
    if (!window.canViewBacklog) {
      const msg = this.add.text(10, 140, 'Stand on the orange backlog to see tasks', {
        fontSize: '14px', fill: '#ffffff'
      });
      this.taskTexts.push(msg);
      return;
    }

    // Otherwise, list tasks
    let y = 140;
    const lineHeight = 20;
    window.globalTasks.forEach((task) => {
      const cStr = task.committed ? ' (Committed)' : '';
      const stepStr = `${task.currentStep}/${task.steps.length}`;
      const tType = task.isFeature ? '[Feature]' : '[Maint]';
      const label = `[${task.status}] ${task.description} ${tType}${cStr} (Risk=${task.risk}, Steps=${stepStr}, Giver=${task.giver})`;

      const txt = this.add.text(10, y, label, { fontSize: '14px', fill: '#ffffff', wordWrap: { width: 380 }});
      txt.setInteractive({ useHandCursor: true });
      txt.on('pointerdown', () => this.pickActiveTask(task.id));

      this.taskTexts.push(txt);
      y += lineHeight;
    });
  }
}
