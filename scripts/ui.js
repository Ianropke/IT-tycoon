// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // This UI scene uses the right 440px for everything
    this.cameras.main.setViewport(1000, 0, 440, 900);
    // Light background (apple-like minimal design)
    this.cameras.main.setBackgroundColor('#f5f5f7'); 

    // ---------- 1) SCOREBOARD BOX ----------
    // A pastel box at the top (y=0..160)
    this.scoreboardBg = this.add.rectangle(0, 0, 440, 160, 0xdedede)
      .setOrigin(0, 0)
      .setAlpha(0.95);

    // Title for scoreboard
    this.scoreTitle = this.add.text(20, 10, 'Scoreboard', {
      fontFamily: 'sans-serif',
      fontSize: '20px',
      color: '#333333'
    });

    // Score text
    this.scoreText = this.add.text(20, 50, 'Score: 0', {
      fontFamily: 'sans-serif',
      fontSize: '24px',
      color: '#007aff' // a subtle “blue” reminiscent of Apple
    });

    // Giver scoreboard
    this.giverScoreText = this.add.text(20, 85, '', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#333333'
    });

    // ---------- 2) INSTRUCTIONS BOX ----------
    // We place instructions in a box below the scoreboard
    this.instructionsBg = this.add.rectangle(0, 160, 440, 100, 0xffffff)
      .setOrigin(0, 0)
      .setAlpha(0.9);

    this.instructions = this.add.text(20, 170,
      'Tasks & Score on the right.\nDocument tasks before finalize.\nSome tasks may have "gather."\nUse arrow keys in GameScene.',
      {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#333333'
      }
    );

    // ---------- 3) TASK LIST (BACKLOG) BOX ----------
    // from y=260..500
    this.backlogBg = this.add.rectangle(0, 260, 440, 240, 0xeef0f1)
      .setOrigin(0, 0)
      .setAlpha(0.95);

    this.backlogTitle = this.add.text(20, 270, 'Tasks (Backlog)', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#333333'
    });

    this.taskTexts = []; // We'll list tasks here
    // We'll display tasks in the region y=300..(300 + space)

    // ---------- 4) ACTIVE TASK BOX ----------
    // from y=500..900
    this.activeBg = this.add.rectangle(0, 500, 440, 400, 0xffffff)
      .setOrigin(0, 0)
      .setAlpha(0.9);

    this.activeTitle = this.add.text(20, 510, 'Active Task:', {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#333333'
    });

    // We'll store up to 10 lines for the active task details
    this.activeLines = [];
    for (let i = 0; i < 10; i++) {
      const line = this.add.text(20, 540 + i * 20, '', {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#333333',
        wordWrap: { width: 400 }
      });
      this.activeLines.push(line);
    }

    // Track the active task and doc status
    this.activeTaskId = null;
    this.documented = false;

    // Refresh UI every second
    this.time.addEvent({
      delay: 1000,
      callback: () => this.refreshUI(),
      loop: true
    });
  }

  // Called every second
  refreshUI() {
    // 1) Score + scoreboard
    this.scoreText.setText(`Score: ${window.playerScore}`);
    const scoreboardString =
      `Completed:\n` +
      `  - hospital: ${window.giverScoreboard.hospital}\n` +
      `  - infrastructure: ${window.giverScoreboard.infrastructure}\n` +
      `  - informationSec: ${window.giverScoreboard.informationSecurity}\n` +
      `  - cybersecurity: ${window.giverScoreboard.cybersecurity}\n`;
    this.giverScoreText.setText(scoreboardString);

    // 2) Task listing (backlog)
    this.taskTexts.forEach(txt => txt.destroy());
    this.taskTexts = [];
    let yPos = 300;

    if (!window.canViewBacklog) {
      // If the player isn’t on the backlog
      const msg = this.add.text(20, yPos, 'Stand on orange backlog to see tasks.', {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#444444',
        wordWrap: { width: 400 }
      });
      this.taskTexts.push(msg);
      return;
    }

    // Otherwise, show tasks
    for (let i = 0; i < window.globalTasks.length; i++) {
      const t = window.globalTasks[i];
      const stepStr = `${t.currentStep}/${t.steps.length}`;
      const cStr = t.committed ? ' (Committed)' : '';
      const tType = t.isFeature ? '[Feature]' : '[Maint]';
      const label = `[${t.status}] ${t.description} ${tType}${cStr}\n  (Risk=${t.risk}, Steps=${stepStr}, Giver=${t.giver})`;

      const line = this.add.text(20, yPos, label, {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#333333',
        wordWrap: { width: 400 }
      });
      line.setInteractive({ useHandCursor: true });
      line.on('pointerdown', () => this.selectActiveTask(t.id));

      this.taskTexts.push(line);
      yPos += 40; // bigger spacing for Apple-like clarity
      if (yPos > 480) {
        // We only have ~180 px in this box (260..500), so let's not overflow
        const moreMsg = this.add.text(20, yPos, '...more tasks hidden...', {
          fontFamily: 'sans-serif',
          fontSize: '14px',
          color: '#888888'
        });
        this.taskTexts.push(moreMsg);
        break; // stop listing tasks if they exceed the box
      }
    }

    // 3) Update active task
    this.updateActiveBox();
  }

  selectActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.documented = false;
    this.updateActiveBox();
  }

  updateActiveBox() {
    // Clear lines
    for (let i = 0; i < this.activeLines.length; i++) {
      this.activeLines[i].setText('');
    }

    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    // line0: Step info
    let line0 = '';
    if (task.currentStep >= task.steps.length) {
      line0 = 'All steps done. Document before finalize.';
    } else {
      line0 = `Step ${task.currentStep+1} of ${task.steps.length}: ${task.steps[task.currentStep]}`;
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
      line6 += '(Move to gather location)\n';
    }
    if (task.status === 'Ready to finalize') {
      line6 += '(Document, then finalize)\n';
    }
    this.activeLines[6].setText(line6.trim());
  }

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
    if (task && task.status==='Ready to finalize'){
      completeTask(task.id);
      task.status='Done';
      this.activeTaskId=null;
    }
  }
}
