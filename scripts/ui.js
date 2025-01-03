// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.add.text(10, 10,
      'Arrow keys = move. Orange "Backlog" to see tasks (max 10).\nNo tasks from Vendor (giver) anymore. "Information Security" can give tasks.\nShort/medium/long tasks, optional "Legal" step for features.\nSome tasks might require InfoSec or hospital or infrastructure.\nFinalize steps, gather, then finalize the task.\nScore + scoreboard below.\n',
      { fontSize: '15px', fill: '#000' }
    );

    this.taskTexts = [];
    this.activeTaskId = null;

    this.createActiveTaskPanel();

    // Periodic refresh
    this.time.addEvent({
      delay: 1000,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });

    this.scoreText = this.add.text(10, 240, `Score: ${window.playerScore}`, {
      fontSize: '16px', fill: '#f00'
    });

    // Show how many tasks completed per giver
    this.giverScoreText = this.add.text(10, 270, '', {
      fontSize: '14px', fill: '#000'
    });
  }

  createActiveTaskPanel() {
    this.activePanel = this.add.container(1300, 100);

    const bg = this.add.rectangle(0, 0, 290, 550, 0xcccccc);
    bg.setOrigin(0, 0);

    this.panelTitle = this.add.text(10, 10, 'Active Task:', { fontSize: '16px', fill: '#000' });
    this.stepText = this.add.text(10, 40, '', { fontSize: '14px', fill: '#333', wordWrap: { width: 270 } });
    this.statusText = this.add.text(10, 70, '', { fontSize: '14px', fill: '#333' });
    this.priorityText = this.add.text(10, 90, '', { fontSize: '14px', fill: '#333' });
    this.riskText = this.add.text(10, 110, '', { fontSize: '14px', fill: '#f00' });
    this.taskTypeText = this.add.text(10, 130, '', { fontSize: '14px', fill: '#008000' });
    this.giverText = this.add.text(10, 150, '', { fontSize: '14px', fill: '#008080' });

    this.commitBtn = this.add.text(10, 180, '[ Commit to Task ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#0000ff', padding: { x:4, y:2 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.commitActiveTask());

    this.allStepsLabel = this.add.text(10, 210, '', { 
      fontSize: '14px', fill: '#000', underline: true 
    });
    this.allStepsText = this.add.text(10, 230, '', {
      fontSize: '14px', fill: '#333', wordWrap: { width: 270 }
    });

    this.gatherBtn = this.add.text(10, 430, '[ Gather Everyone ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#ff0000', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.gatherEveryone());

    const finalizeBtn = this.add.text(10, 460, '[ Finalize Task ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#00ff00', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.finalizeActiveTask());

    const lowBtn = this.add.text(100, 460, '[ Priority: Low ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x:4, y:2 }
    }).setInteractive();
    lowBtn.on('pointerdown', () => this.setActiveTaskPriority('Low'));

    const highBtn = this.add.text(200, 460, '[ Priority: High ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x:4, y:2 }
    }).setInteractive();
    highBtn.on('pointerdown', () => this.setActiveTaskPriority('High'));

    this.activePanel.add([
      bg, this.panelTitle, this.stepText, this.statusText, this.priorityText, this.riskText,
      this.taskTypeText, this.giverText, this.commitBtn,
      this.allStepsLabel, this.allStepsText,
      this.gatherBtn, finalizeBtn, lowBtn, highBtn
    ]);
    this.activePanel.setVisible(false);
  }

  commitActiveTask() {
    if (!this.activeTaskId) return;
    commitToTask(this.activeTaskId);
    this.updateActiveTaskPanel();
  }

  gatherEveryone() {
    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;
    const stepTxt = (task.steps[task.currentStep] || '').toLowerCase();
    if (stepTxt.includes('gather')) {
      advanceTaskStep(task.id);
      this.updateActiveTaskPanel();
    }
  }

  finalizeActiveTask() {
    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    if (task.status === 'Ready to finalize') {
      completeTask(task.id);
      task.status = 'Done';
      this.activeTaskId = null;
      this.activePanel.setVisible(false);
    }
  }

  setActiveTaskPriority(newPriority) {
    if (!this.activeTaskId) return;
    updateTaskPriority(this.activeTaskId, newPriority);
    this.updateActiveTaskPanel();
  }

  pickActiveTask(taskId) {
    this.activeTaskId = taskId;
    this.activePanel.setVisible(true);
    this.updateActiveTaskPanel();
  }

  updateActiveTaskPanel() {
    if (!this.activeTaskId) {
      this.activePanel.setVisible(false);
      return;
    }
    const task = getTaskById(this.activeTaskId);
    if (!task) {
      this.activePanel.setVisible(false);
      return;
    }

    const cur = task.currentStep;
    const total = task.steps.length;
    const stepInfo = (cur >= total)
      ? 'All steps done. Ready to finalize.'
      : `Step ${cur + 1} of ${total}: ${task.steps[cur]}`;

    this.stepText.setText(stepInfo);
    this.statusText.setText(`Status: ${task.status}`);
    this.priorityText.setText(`Priority: ${task.priority}`);
    this.riskText.setText(`Risk: ${task.risk} (L=${task.likelihood}, C=${task.consequence}${task.isFeature ? ', +5 for feature' : ''})`);
    this.taskTypeText.setText(task.isFeature ? 'Feature Task' : 'Maintenance Task');
    this.giverText.setText(`Giver: ${task.giver}`);

    this.commitBtn.setVisible(!task.committed);

    // If in backlog => show all steps
    if (window.canViewBacklog) {
      this.allStepsLabel.setText('All Steps:');
      let block = '';
      for (let i = 0; i < total; i++) {
        block += `${i+1}) ${task.steps[i]}\n   - ${task.educationalExplanations[i]}\n\n`;
      }
      this.allStepsText.setText(block);
    } else {
      this.allStepsLabel.setText('');
      this.allStepsText.setText('');
    }

    if (cur < total && task.steps[cur].toLowerCase().includes('gather')) {
      this.gatherBtn.setVisible(true);
    } else {
      this.gatherBtn.setVisible(false);
    }
  }

  refreshTaskList() {
    // Update main score
    this.scoreText.setText(`Score: ${window.playerScore}`);

    // Scoreboard per giver
    let bStr =
      `Completed Tasks:\n` +
      `- Hospital: ${window.giverScoreboard.hospital}\n` +
      `- Infrastructure: ${window.giverScoreboard.infrastructure}\n` +
      `- InformationSec: ${window.giverScoreboard.informationSecurity}\n`;
    this.giverScoreText.setText(bStr);

    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    if (!window.canViewBacklog) {
      const msg = this.add.text(10, 310,
        'Stand on the orange "Backlog" to see/pick tasks. (Max 10).',
        { fontSize: '14px', fill: '#f00' }
      );
      this.taskTexts.push(msg);
      this.updateActiveTaskPanel();
      return;
    }

    let yPos = 310;
    const lineHeight = 20;
    window.globalTasks.forEach(task => {
      let cStr = task.committed ? ' (Committed)' : '';
      let stepStr = `${task.currentStep}/${task.steps.length}`;
      let typeStr = task.isFeature ? '[Feature]' : '[Maint]';
      const label = `[${task.status}] ${task.description} ${typeStr}${cStr} (Risk=${task.risk}, Steps=${stepStr}, Giver=${task.giver})`;

      const txt = this.add.text(10, yPos, label, { fontSize: '14px', fill: '#000' });
      txt.setInteractive({ useHandCursor: true });
      txt.on('pointerdown', () => this.pickActiveTask(task.id));

      this.taskTexts.push(txt);
      yPos += lineHeight;
    });

    this.updateActiveTaskPanel();
  }
}
