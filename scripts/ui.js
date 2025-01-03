class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Set up the viewport for the UI
    this.cameras.main.setViewport(900, 0, 540, 900);
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)');

    // ---------- SCOREBOARD BAR (y=0..60, x=900..1440) ----------
    this.scorebarBg = this.add.rectangle(0, 0, 540, 60, 0xf4f4f4).setOrigin(0, 0);

    this.scoreTitle = this.add.text(20, 15, 'Score: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '24px',
      color: '#007aff',
    });

    this.giverScores = this.add.text(200, 15, 'Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      color: '#333333',
    });

    // ---------- BACKLOG AREA (y=60..480, x=900..1440) ----------
    this.backlogTitle = this.add.text(20, 70, 'Tasks (Backlog)', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333',
    });

    this.add.text(20, 100, 'Desc', { fontSize: '14px', color: '#666666' });
    this.add.text(260, 100, 'Steps', { fontSize: '14px', color: '#666666' });
    this.add.text(320, 100, 'Risk', { fontSize: '14px', color: '#666666' });
    this.add.text(380, 100, 'Giver', { fontSize: '14px', color: '#666666' });

    this.taskRowTexts = []; // For dynamic backlog rows

    // ---------- ACTIVE TASK AREA (y=480..900, x=900..1440) ----------
    this.activeTaskBg = this.add.rectangle(0, 480, 540, 420, 0xf0f0f2).setOrigin(0, 0);

    this.activeTaskTitle = this.add.text(20, 490, 'Active Task', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333',
    });

    this.activeTaskLines = [];
    for (let i = 0; i < 7; i++) {
      const line = this.add.text(20, 520 + i * 20, '', {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
        color: '#333333',
      });
      this.activeTaskLines.push(line);
    }

    // Buttons: Commit, Gather, Finalize
    this.commitButton = this.createButton(20, 680, '[ Commit ]', '#007aff', () => this.handleCommit());
    this.gatherButton = this.createButton(140, 680, '[ Gather ]', '#34c759', () => this.handleGather());
    this.finalizeButton = this.createButton(260, 680, '[ Finalize ]', '#ff9500', () => this.handleFinalize());

    // Initialize active task state
    this.activeTaskId = null;
    this.documented = false;

    // Periodic UI refresh
    this.time.addEvent({
      delay: 1000,
      callback: () => this.refreshUI(),
      loop: true,
    });
  }

  createButton(x, y, text, bgColor, onClick) {
    const button = this.add.text(x, y, text, {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      backgroundColor: bgColor,
      color: '#ffffff',
      padding: { x: 8, y: 4 },
    });
    button.setInteractive({ useHandCursor: true }).on('pointerdown', onClick);
    button.setVisible(false); // Hidden by default
    return button;
  }

  refreshUI() {
    // Update score and giver scores
    this.scoreTitle.setText(`Score: ${window.playerScore}`);
    this.giverScores.setText(
      `Hospital: ${window.giverScoreboard.hospital} | Infrastructure: ${window.giverScoreboard.infrastructure} | InfoSec: ${window.giverScoreboard.informationSecurity} | CyberSec: ${window.giverScoreboard.cybersecurity}`
    );

    // Clear and refresh task rows in the backlog
    this.taskRowTexts.forEach(row => row.forEach(text => text.destroy()));
    this.taskRowTexts = [];

    if (!window.canViewBacklog) {
      const noTasks = this.add.text(20, 120, 'Stand on orange backlog to see tasks.', {
        fontSize: '14px',
        color: '#999999',
        wordWrap: { width: 500 },
      });
      this.taskRowTexts.push([noTasks]);
      return;
    }

    let y = 120;
    for (let i = 0; i < window.globalTasks.length; i++) {
      const task = window.globalTasks[i];
      const row = [
        this.createBacklogRowText(20, y, `[${task.status}] ${task.description} ${(task.isFeature ? '[Feature]' : '[Maint]')}`, () => this.selectActiveTask(task.id)),
        this.createBacklogRowText(260, y, `${task.currentStep}/${task.steps.length}`),
        this.createBacklogRowText(320, y, `${task.risk}`),
        this.createBacklogRowText(380, y, `${task.giver}`),
      ];
      this.taskRowTexts.push(row);
      y += 30;
      if (y > 450) {
        const moreMsg = this.add.text(20, y, '...more tasks hidden...', { fontSize: '14px', color: '#888888' });
        this.taskRowTexts.push([moreMsg]);
        break;
      }
    }

    // Update active task box
    this.updateActiveTaskBox();
  }

  createBacklogRowText(x, y, text, onClick = null) {
    const rowText = this.add.text(x, y, text, { fontSize: '14px', color: '#333333' });
    if (onClick) rowText.setInteractive({ useHandCursor: true }).on('pointerdown', onClick);
    return rowText;
  }

  selectActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false;
    this.updateActiveTaskBox();
  }

  updateActiveTaskBox() {
    // Clear active task lines
    this.activeTaskLines.forEach(line => line.setText(''));

    // Hide buttons by default
    this.commitButton.setVisible(false);
    this.gatherButton.setVisible(false);
    this.finalizeButton.setVisible(false);

    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    // Display active task details
    const stepDescription = task.currentStep >= task.steps.length ? 'All steps done. Document before finalize.' : `Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep]}`;
    this.activeTaskLines[0].setText(stepDescription);
    this.activeTaskLines[1].setText(`Status: ${task.status}`);
    this.activeTaskLines[2].setText(`Priority: ${task.priority}`);
    this.activeTaskLines[3].setText(`Risk: ${task.risk}`);
    this.activeTaskLines[4].setText(task.isFeature ? 'Feature Task' : 'Maintenance Task');
    this.activeTaskLines[5].setText(`Giver: ${task.giver}`);

    // Button visibility logic
    if (!task.committed) this.commitButton.setVisible(true);
    if (task.currentStep < task.steps.length && task.steps[task.currentStep].toLowerCase().includes('gather')) this.gatherButton.setVisible(true);
    if (task.status === 'Ready to finalize') this.finalizeButton.setVisible(true);
  }

  handleCommit() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
  }

  handleGather() {
    console.log('Gathering step in progress...');
  }

  handleFinalize() {
    if (!this.activeTaskId) return;
    if (!this.documented) {
      console.log('You must document before finalizing!');
      return;
    }
    const task = getTaskById(this.activeTaskId);
    if (task && task.status === 'Ready to finalize') {
      completeTask(task.id);
      this.activeTaskId = null;
    }
  }
}
