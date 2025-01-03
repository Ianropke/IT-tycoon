// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // The camera for this scene: x=1000..1440, y=0..900, width=440, height=900
    this.cameras.main.setViewport(1000, 0, 440, 900);
    this.cameras.main.setBackgroundColor('#222222'); // dark UI background

    // Score text
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '20px', fill: '#ff0000'
    });
    // Giver scoreboard
    this.giverScoreText = this.add.text(10, 40, '', {
      fontSize: '16px', fill: '#ffffff'
    });

    // Minimal instructions
    this.instructionsText = this.add.text(10, 80,
      'Tasks & Score (Right UI)\n' +
      'Document tasks before finalize.\n' +
      'Some tasks have "gather." Givers:\n' +
      'hospital, infra, infoSec, cyberSec.\n' +
      'Press arrow keys in the GameScene.\n',
      { fontSize: '14px', fill: '#ffffff' }
    );

    // Title for task list
    this.add.text(10, 180, 'Tasks (Backlog)', {
      fontSize: '16px', fill: '#ffffff'
    });
    // We'll place the backlog tasks from y=210 downward
    this.taskTexts = [];

    // A "box" for the active task details near the bottom
    this.taskDescriptionBg = this.add.rectangle(10, 500, 420, 380, 0x444444)
      .setOrigin(0, 0)
      .setAlpha(0.8);

    // Title text for active task
    this.taskDescriptionTitle = this.add.text(20, 510, 'Active Task:', {
      fontSize: '18px', fill: '#ffffff'
    });

    // Up to 10 lines for the active task details
    this.taskDescriptionLines = [];
    for (let i = 0; i < 10; i++) {
      const line = this.add.text(20, 540 + i * 20, '', {
        fontSize: '14px',
        fill: '#eeeeee',
        wordWrap: { width: 400 }
      });
      this.taskDescriptionLines.push(line);
    }

    // Track which task is selected
    this.activeTaskId = null;
    // Whether we've "documented" it
    this.documented = false;

    // Refresh the UI every second
    this.time.addEvent({
      delay: 1000,
      callback: () => this.refreshUI(),
      loop: true
    });
  }

  // Called every second by the timer
  refreshUI() {
    // Score
    this.scoreText.setText(`Score: ${window.playerScore}`);

    // Giver scoreboard
    let boardStr =
      `Completed tasks:\n` +
      ` - hospital: ${window.giverScoreboard.hospital}\n` +
      ` - infrastructure: ${window.giverScoreboard.infrastructure}\n` +
      ` - informationSecurity: ${window.giverScoreboard.informationSecurity}\n` +
      ` - cybersecurity: ${window.giverScoreboard.cybersecurity}\n`;
    this.giverScoreText.setText(boardStr);

    // Clear old tasks
    this.taskTexts.forEach(txt => txt.destroy());
    this.taskTexts = [];

    let yPos = 210;
    if (!window.canViewBacklog) {
      // Not standing on backlog
      const msg = this.add.text(10, yPos, 'Stand on the orange backlog to see tasks.', {
        fontSize: '14px', fill: '#ffffff', wordWrap: { width: 420 }
      });
      this.taskTexts.push(msg);
      return;
    }

    // Otherwise, list tasks
    for (let i = 0; i < window.globalTasks.length; i++) {
      const t = window.globalTasks[i];
      const cStr = t.committed ? ' (Committed)' : '';
      const stepStr = `${t.currentStep}/${t.steps.length}`;
      const tType = t.isFeature ? '[Feature]' : '[Maint]';
      const label = `[${t.status}] ${t.description} ${tType}${cStr} (Risk=${t.risk}, Steps=${stepStr}, Giver=${t.giver})`;

      const line = this.add.text(10, yPos, label, {
        fontSize: '14px', fill: '#ffffff', wordWrap: { width: 420 }
      });
      line.setInteractive({ useHandCursor: true });
      line.on('pointerdown', () => this.selectActiveTask(t.id));

      this.taskTexts.push(line);
      yPos += 20;
    }

    // Update the active task box
    this.updateTaskDescription();
  }

  selectActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false; // reset doc
    this.updateTaskDescription();
  }

  updateTaskDescription() {
    // Clear lines
    for (let i = 0; i < this.taskDescriptionLines.length; i++) {
      this.taskDescriptionLines[i].setText('');
    }
    if (!this.activeTaskId) return;

    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    // line0: step info
    let line0;
    if (task.currentStep >= task.steps.length) {
      line0 = 'All steps done. Must document before finalizing.';
    } else {
      line0 = `Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep]}`;
    }
    this.taskDescriptionLines[0].setText(line0);

    // line1: status
    this.taskDescriptionLines[1].setText(`Status: ${task.status}`);

    // line2: priority
    this.taskDescriptionLines[2].setText(`Priority: ${task.priority}`);

    // line3: risk
    this.taskDescriptionLines[3].setText(`Risk: ${task.risk}`);

    // line4: type
    this.taskDescriptionLines[4].setText(task.isFeature ? 'Feature Task' : 'Maintenance Task');

    // line5: giver
    this.taskDescriptionLines[5].setText(`Giver: ${task.giver}`);

    // line6: instructions
    let line6 = '';
    if (!task.committed) {
      line6 += '[Need to commit]\n';
    }
    if (task.currentStep < task.steps.length && task.steps[task.currentStep].toLowerCase().includes('gather')) {
      line6 += '(Move to gather location)\n';
    }
    if (task.status === 'Ready to finalize') {
      line6 += '(Document, then finalize)\n';
    }
    this.taskDescriptionLines[6].setText(line6.trim());
  }

  // If you want actual "document" or "commit" or "finalize" *buttons* in the UI,
  // you can define them similarly to how we do "selectActiveTask" above.

  documentTask() {
    this.documented = true;
  }

  commitTask() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
  }

  finalizeTask() {
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
