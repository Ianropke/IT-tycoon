// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Basic instructions
    this.add.text(10, 10,
      'Arrow keys = move.\nVisit the orange "Backlog" square to view tasks.\nPick a task from backlog.\nCommit to solving it.\nComplete steps in order.\nFinal step: Gather Everyone.\nThen finalize the task.',
      { fontSize: '15px', fill: '#000' }
    );

    // We'll store references to text objects
    this.taskTexts = [];
    this.activeTaskId = null;

    // UI panel for the active task
    this.createActiveTaskPanel();

    // Refresh tasks every second
    this.time.addEvent({
      delay: 1000,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });

    // Score text if using penalties
    this.scoreText = this.add.text(10, 180, `Score: ${window.playerScore}`, {
      fontSize: '16px', fill: '#f00'
    });
  }

  createActiveTaskPanel() {
    this.activePanel = this.add.container(100, 230);

    // A bigger background
    const bg = this.add.rectangle(0, 0, 500, 370, 0xcccccc);
    bg.setOrigin(0, 0);

    this.panelTitle = this.add.text(10, 10, 'Active Task:', {
      fontSize: '16px', fill: '#000'
    });

    this.stepText = this.add.text(10, 40, '', {
      fontSize: '14px', fill: '#333', wordWrap: { width: 480 }
    });

    this.statusText = this.add.text(10, 70, '', { fontSize: '14px', fill: '#333' });
    this.priorityText = this.add.text(10, 90, '', { fontSize: '14px', fill: '#333' });

    // "Commit" button so the user explicitly picks it to solve
    this.commitBtn = this.add.text(10, 120, '[ Commit to Task ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#0000ff', padding: { x: 4, y: 2 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.commitActiveTask());

    // Show full steps only if in backlog
    this.allStepsLabel = this.add.text(10, 150, '', {
      fontSize: '14px', fill: '#000', underline: true
    });
    this.allStepsText = this.add.text(10, 170, '', {
      fontSize: '14px', fill: '#333', wordWrap: { width: 480 }
    });

    // "Gather Everyone" button
    this.gatherBtn = this.add.text(10, 300, '[ Gather Everyone ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#ff0000', padding: { x: 4, y: 2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.gatherEveryone());

    // "Finalize Task"
    const finalizeBtn = this.add.text(10, 330, '[ Finalize Task ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#00ff00', padding: { x: 4, y: 2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.finalizeActiveTask());

    // Priority Buttons
    const lowBtn = this.add.text(170, 330, '[ Priority: Low ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x:4, y:2 }
    }).setInteractive();
    lowBtn.on('pointerdown', () => this.setActiveTaskPriority('Low'));

    const highBtn = this.add.text(310, 330, '[ Priority: High ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x:4, y:2 }
    }).setInteractive();
    highBtn.on('pointerdown', () => this.setActiveTaskPriority('High'));

    this.activePanel.add([
      bg, this.panelTitle, this.stepText, this.statusText, this.priorityText,
      this.commitBtn, this.allStepsLabel, this.allStepsText, 
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

    const stepDesc = task.steps[task.currentStep] || '';
    if (stepDesc.includes('evening upgrade')) {
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
    let stepInfo = '';
    if (cur >= total) {
      stepInfo = 'All steps completed. Ready to finalize.';
    } else {
      stepInfo = `Step ${cur + 1} of ${total}: ${task.steps[cur]}`;
    }
    this.stepText.setText(stepInfo);

    this.statusText.setText(`Status: ${task.status}`);
    this.priorityText.setText(`Priority: ${task.priority}`);

    // Show "Commit to Task" if not yet committed
    if (task.committed) {
      this.commitBtn.setVisible(false);
    } else {
      this.commitBtn.setVisible(true);
    }

    // If user is in backlog zone, show full steps + educational text
    if (window.canViewBacklog) {
      this.allStepsLabel.setText('All Steps + Why:');
      // Build a multiline text that includes the step plus the explanation
      let fullText = '';
      for (let i = 0; i < task.steps.length; i++) {
        fullText += `${i+1}) ${task.steps[i]}\n   - ${task.educationalExplanations[i]}\n\n`;
      }
      this.allStepsText.setText(fullText);
    } else {
      // Hide the full steps if not in backlog
      this.allStepsLabel.setText('');
      this.allStepsText.setText('');
    }

    // Show/hide "Gather Everyone"
    if (cur < total && task.steps[cur].includes('evening upgrade')) {
      this.gatherBtn.setVisible(true);
    } else {
      this.gatherBtn.setVisible(false);
    }
  }

  refreshTaskList() {
    // Update score
    this.scoreText.setText(`Score: ${window.playerScore}`);

    // Clear old lines
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    if (!window.canViewBacklog) {
      // If not in backlog, show a message
      const msg = this.add.text(10, 210,
        'Stand on the orange "Backlog" square to view and pick tasks.',
        { fontSize: '14px', fill: '#f00' }
      );
      this.taskTexts.push(msg);
      this.updateActiveTaskPanel();
      return;
    }

    // Show tasks if in backlog
    const startY = 210;
    const lineHeight = 20;

    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;

      // For the text: show "Committed" or not
      let cStr = task.committed ? ' (Committed)' : '';
      let stepStr = `${task.currentStep}/${task.steps.length}`;
      const textStr = `[${task.status}] ${task.description}${cStr} (Step ${stepStr})`;

      const txt = this.add.text(10, yPos, textStr, {
        fontSize: '14px', fill: '#000'
      });
      txt.setInteractive({ useHandCursor: true });
      txt.on('pointerdown', () => this.pickActiveTask(task.id));

      this.taskTexts.push(txt);
    });

    // Update the panel
    this.updateActiveTaskPanel();
  }
}
