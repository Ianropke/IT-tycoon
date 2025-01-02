// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.add.text(10, 10,
      'Arrow keys = move.\nStand on the orange "Backlog" square to see tasks.\nPick & commit to tasks.\nHigher risk tasks = more bonus.\nComplete steps. Final step: gather.\nThen finalize the task.\nMax 10 tasks total.\n',
      { fontSize: '15px', fill: '#000' }
    );

    this.taskTexts = [];
    this.activeTaskId = null;

    this.createActiveTaskPanel();

    this.time.addEvent({
      delay: 1000,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });

    this.scoreText = this.add.text(10, 220, `Score: ${window.playerScore}`, {
      fontSize: '16px', fill: '#f00'
    });
  }

  createActiveTaskPanel() {
    // Move to right side for a 1280-wide game
    this.activePanel = this.add.container(900, 100);

    // bigger background if you want
    const bg = this.add.rectangle(0, 0, 360, 500, 0xcccccc);
    bg.setOrigin(0, 0);

    this.panelTitle = this.add.text(10, 10, 'Active Task:', {
      fontSize: '16px', fill: '#000'
    });

    this.stepText = this.add.text(10, 40, '', {
      fontSize: '14px', fill: '#333', wordWrap: { width: 340 }
    });

    this.statusText = this.add.text(10, 70, '', { fontSize: '14px', fill: '#333' });
    this.priorityText = this.add.text(10, 90, '', { fontSize: '14px', fill: '#333' });
    
    // Show risk rating
    this.riskText = this.add.text(10, 110, '', { fontSize: '14px', fill: '#ff0000' });

    // "Commit to Task"
    this.commitBtn = this.add.text(10, 140, '[ Commit to Task ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#0000ff', padding: { x: 4, y: 2 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.commitActiveTask());

    // Label + text area for full steps if in backlog
    this.allStepsLabel = this.add.text(10, 170, '', { fontSize: '14px', fill: '#000', underline: true });
    this.allStepsText = this.add.text(10, 190, '', {
      fontSize: '14px', fill: '#333', wordWrap: { width: 340 }
    });

    this.gatherBtn = this.add.text(10, 380, '[ Gather Everyone ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#ff0000', padding: { x: 4, y: 2 }
    }).setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.gatherEveryone());

    const finalizeBtn = this.add.text(10, 410, '[ Finalize Task ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#00ff00', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.finalizeActiveTask());

    const lowBtn = this.add.text(130, 410, '[ Priority: Low ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x:4, y:2 }
    }).setInteractive();
    lowBtn.on('pointerdown', () => this.setActiveTaskPriority('Low'));

    const highBtn = this.add.text(270, 410, '[ Priority: High ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x:4, y:2 }
    }).setInteractive();
    highBtn.on('pointerdown', () => this.setActiveTaskPriority('High'));

    this.activePanel.add([
      bg, this.panelTitle, this.stepText, this.statusText, this.priorityText,
      this.riskText, this.commitBtn, this.allStepsLabel, this.allStepsText,
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
    const desc = task.steps[task.currentStep] || '';
    if (desc.includes('gather') || desc.includes('Gather everyone')) {
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

    // Basic info
    const cur = task.currentStep;
    const total = task.steps.length;
    let stepInfo = (cur >= total)
      ? 'All steps completed. Ready to finalize.'
      : `Step ${cur + 1} of ${total}: ${task.steps[cur]}`;
    this.stepText.setText(stepInfo);
    this.statusText.setText(`Status: ${task.status}`);
    this.priorityText.setText(`Priority: ${task.priority}`);
    this.riskText.setText(`Risk: L=${task.likelihood} x C=${task.consequence} = ${task.risk}`);

    // Show/hide commit button
    if (task.committed) {
      this.commitBtn.setVisible(false);
    } else {
      this.commitBtn.setVisible(true);
    }

    // If in backlog zone, show all steps + explanations
    if (window.canViewBacklog) {
      this.allStepsLabel.setText('All Steps + Why:');
      let fullText = '';
      for (let i=0; i<task.steps.length; i++) {
        fullText += `${i+1}) ${task.steps[i]}\n   - ${task.educationalExplanations[i]}\n\n`;
      }
      this.allStepsText.setText(fullText);
    } else {
      // Hide the full steps if not in backlog
      this.allStepsLabel.setText('');
      this.allStepsText.setText('');
    }

    // Show gather button if last step
    if (cur < total && task.steps[cur].toLowerCase().includes('gather')) {
      this.gatherBtn.setVisible(true);
    } else {
      this.gatherBtn.setVisible(false);
    }
  }

  refreshTaskList() {
    this.scoreText.setText(`Score: ${window.playerScore}`);

    // Clear old lines
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    if (!window.canViewBacklog) {
      const msg = this.add.text(10, 240,
        'Stand on the orange "Backlog" square to see/pick tasks. (Max 10 tasks)',
        { fontSize: '14px', fill: '#f00' }
      );
      this.taskTexts.push(msg);
      this.updateActiveTaskPanel();
      return;
    }

    const startY = 240;
    const lineHeight = 20;
    let yPos = startY;

    window.globalTasks.forEach((task, index) => {
      // Show: [Status] Description (Committed?), Risk=??, Steps=??/??
      let cStr = task.committed ? ' (Committed)' : '';
      let stepStr = `${task.currentStep}/${task.steps.length}`;
      const textStr = `[${task.status}] ${task.description}${cStr} (Risk=${task.risk}, Steps ${stepStr})`;

      const txt = this.add.text(10, yPos, textStr, {
        fontSize: '14px', fill: '#000'
      });
      txt.setInteractive({ useHandCursor: true });
      txt.on('pointerdown', () => this.pickActiveTask(task.id));

      this.taskTexts.push(txt);
      yPos += lineHeight;
    });

    this.updateActiveTaskPanel();
  }
}
