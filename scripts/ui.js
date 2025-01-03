// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // This UI scene occupies x=900..1440, i.e. width=540, height=900
    this.cameras.main.setViewport(900, 0, 540, 900);
    // A light background
    this.cameras.main.setBackgroundColor('#f4f4f6');

    // ---------------- 1) SCOREBOARD (y=0..160) ----------------
    this.scoreboardBg = this.add.rectangle(0, 0, 540, 160, 0xe0e0e0)
      .setOrigin(0, 0);

    this.scoreTitle = this.add.text(20, 10, 'Scoreboard', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '20px',
      color: '#333333'
    });

    // Larger, bright text for score
    this.scoreText = this.add.text(20, 50, 'Score: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '24px',
      color: '#007aff'
    });

    // Giver scoreboard
    this.giverScoreText = this.add.text(20, 90, '', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      color: '#333333'
    });

    // ---------------- 2) TASK LIST (y=160..460) ----------------
    this.taskListBg = this.add.rectangle(0, 160, 540, 300, 0xffffff)
      .setOrigin(0, 0);

    this.taskListTitle = this.add.text(20, 170, 'Tasks (Backlog)', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333'
    });

    this.taskTexts = [];  
    // We'll place tasks from y=200 down to ~460

    // ---------------- 3) ACTIVE TASK BOX (y=460..900) ----------------
    this.activeBg = this.add.rectangle(0, 460, 540, 440, 0xf8f8f9)
      .setOrigin(0, 0);

    this.activeTitle = this.add.text(20, 470, 'Active Task', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333'
    });

    // We store lines for step info, priority, etc.
    this.activeLines = [];
    for (let i = 0; i < 7; i++) {
      const line = this.add.text(20, 500 + i * 20, '', {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
        color: '#333333',
        wordWrap: { width: 500 }
      });
      this.activeLines.push(line);
    }

    // A [Commit] button
    this.commitBtn = this.add.text(20, 640, '[ Commit ]', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      backgroundColor: '#007aff',
      color: '#ffffff',
      padding: { x: 8, y: 4 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.commitActiveTask());

    // We track the active task & doc status
    this.activeTaskId = null;
    this.documented = false;

    // Refresh UI every second
    this.time.addEvent({
      delay: 1000,
      callback: () => this.refreshUI(),
      loop: true
    });
  }

  refreshUI() {
    // 1) Update Score + scoreboard
    this.scoreText.setText(`Score: ${window.playerScore}`);
    const scoreboardString =
      `Completed:\n` +
      `  - hospital: ${window.giverScoreboard.hospital}\n` +
      `  - infrastructure: ${window.giverScoreboard.infrastructure}\n` +
      `  - informationSecurity: ${window.giverScoreboard.informationSecurity}\n` +
      `  - cybersecurity: ${window.giverScoreboard.cybersecurity}\n`;
    this.giverScoreText.setText(scoreboardString);

    // 2) Update Task List
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];
    let yPos = 200;

    if (!window.canViewBacklog) {
      const msg = this.add.text(20, yPos, 'Stand on orange backlog to see tasks.', {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
        color: '#444444',
        wordWrap: { width: 500 }
      });
      this.taskTexts.push(msg);
      return;
    }

    for (let i = 0; i < window.globalTasks.length; i++) {
      const t = window.globalTasks[i];
      const stepStr = `${t.currentStep}/${t.steps.length}`;
      const cStr = t.committed ? ' (Committed)' : '';
      const tType = t.isFeature ? '[Feature]' : '[Maint]';
      const label = `[${t.status}] ${t.description} ${tType}${cStr}\n(Risk=${t.risk}, Steps=${stepStr}, Giver=${t.giver})`;

      const line = this.add.text(20, yPos, label, {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '14px',
        color: '#333333',
        wordWrap: { width: 500 }
      });
      line.setInteractive({ useHandCursor: true });
      line.on('pointerdown', () => this.pickActiveTask(t.id));

      this.taskTexts.push(line);
      yPos += 40; // spaced out for easy reading
      if (yPos > 440) {
        // This box ends at y=460
        const moreMsg = this.add.text(20, yPos, '...more tasks hidden...', {
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '14px',
          color: '#888888'
        });
        this.taskTexts.push(moreMsg);
        break;
      }
    }

    // 3) Update Active Task Box
    this.updateActiveBox();
  }

  pickActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false; // reset doc
    this.updateActiveBox();
  }

  updateActiveBox() {
    // Clear lines
    for (let i=0; i<this.activeLines.length; i++){
      this.activeLines[i].setText('');
    }

    if (!this.activeTaskId) {
      // no active task
      return;
    }
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    // line0: step info
    let line0 = '';
    if (task.currentStep >= task.steps.length) {
      line0 = 'All steps done. Document before finalizing.';
    } else {
      line0 = `Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep]}`;
    }
    this.activeLines[0].setText(line0);

    // line1: status
    this.activeLines[1].setText(`Status: ${task.status}`);
    // line2: priority
    this.activeLines[2].setText(`Priority: ${task.priority}`);
    // line3: risk
    this.activeLines[3].setText(`Risk: ${task.risk}`);
    // line4: type
    this.activeLines[4].setText(task.isFeature ? 'Feature Task' : 'Maintenance Task');
    // line5: giver
    this.activeLines[5].setText(`Giver: ${task.giver}`);

    // line6: instructions
    let line6 = '';
    if (!task.committed) line6 += '[Need to commit]\n';
    if (task.currentStep < task.steps.length && task.steps[task.currentStep].toLowerCase().includes('gather')) {
      line6 += '(Gather step)\n';
    }
    if (task.status === 'Ready to finalize') {
      line6 += '(Document, then finalize)\n';
    }
    this.activeLines[6].setText(line6.trim());
  }

  commitActiveTask() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
    // Now the scoreboard & lines will update on next refresh
  }
}
