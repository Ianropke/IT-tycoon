// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Basic instructions
    this.add.text(10, 10,
      'Arrow keys = move.\nVisit Backlog location to view tasks.\nComplete each step.\nFinal step: Gather Everyone.\nThen finalize the task.',
      { fontSize: '15px', fill: '#000' }
    );

    // We'll store references to on-screen text
    this.taskTexts = [];
    this.activeTaskId = null;

    // UI panel for active task
    this.createActiveTaskPanel();

    // We refresh tasks every second
    this.time.addEvent({
      delay: 1000,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });

    // A text to show player's score
    this.scoreText = this.add.text(10, 110, 'Score: ' + window.playerScore, { 
      fontSize: '16px', fill: '#ff0000' 
    });
  }

  createActiveTaskPanel() {
    // Shift the panel left, narrower width so it fits 1024px wide
    this.activePanel = this.add.container(250, 160);

    const bg = this.add.rectangle(0, 0, 340, 200, 0xcccccc);
    bg.setOrigin(0, 0);

    this.panelTitle = this.add.text(10, 10, 'Active Task:', { fontSize: '16px', fill: '#000' });
    this.stepText = this.add.text(10, 40, '', { fontSize: '14px', fill: '#333' });
    this.statusText = this.add.text(10, 60, '', { fontSize: '14px', fill: '#333' });
    this.priorityText = this.add.text(10, 80, '', { fontSize: '14px', fill: '#333' });

    // "Gather Everyone" button
    this.gatherBtn = this.add.text(10, 110, '[ Gather Everyone ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#ff0000', padding: { x: 4, y: 2 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.gatherEveryone());

    // "Finalize Task" button
    const finalizeBtn = this.add.text(10, 150, '[ Finalize Task ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#00ff00', padding: { x: 4, y: 2 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.finalizeActiveTask());

    // Priority buttons
    const lowBtn = this.add.text(130, 150, '[ Priority: Low ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    }).setInteractive();
    lowBtn.on('pointerdown', () => this.setActiveTaskPriority('Low'));

    const highBtn = this.add.text(250, 150, '[ Priority: High ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    }).setInteractive();
    highBtn.on('pointerdown', () => this.setActiveTaskPriority('High'));

    this.activePanel.add([ bg, this.panelTitle, this.stepText, this.statusText,
      this.priorityText, this.gatherBtn, finalizeBtn, lowBtn, highBtn ]);

    // Hide if no active task
    this.activePanel.setVisible(false);
  }

  gatherEveryone() {
    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    // Only gather if it's the final step
    const currentStepText = task.steps[task.currentStep] || '';
    if (currentStepText.includes('evening upgrade')) {
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
    const stepIndex = task.currentStep;
    const total = task.steps.length;

    let stepText = '';
    if (stepIndex >= total) {
      stepText = 'All steps completed. Ready to finalize.';
    } else {
      stepText = `Step ${stepIndex + 1} of ${total}: ${task.steps[stepIndex]}`;
    }

    this.stepText.setText(stepText);
    this.statusText.setText(`Status: ${task.status}`);
    this.priorityText.setText(`Priority: ${task.priority}`);

    // Show or hide the "Gather Everyone" button
    if (stepIndex < total && task.steps[stepIndex].includes('evening upgrade')) {
      this.gatherBtn.setVisible(true);
    } else {
      this.gatherBtn.setVisible(false);
    }
  }

  refreshTaskList() {
    // Update Score
    this.scoreText.setText('Score: ' + window.playerScore);

    // Clear old text
    this.taskTexts.forEach(txt => txt.destroy());
    this.taskTexts = [];

    // If user is NOT in backlog zone, show a message instead of the tasks
    if (!window.canViewBacklog) {
      const msg = this.add.text(10, 140, 
        'You must be at the Backlog location to view tasks.', 
        { fontSize: '14px', fill: '#f00' }
      );
      this.taskTexts.push(msg);
      this.updateActiveTaskPanel();
      return;
    }

    // Otherwise, display tasks
    const startY = 140;
    const lineHeight = 20;
    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;
      const sIndex = `${task.currentStep}/${task.steps.length}`;
      const txt = this.add.text(
        10,
        yPos,
        `[${task.status}] ${task.description} (Step ${sIndex})`,
        { fontSize: '14px', fill: '#000' }
      );
      txt.setInteractive({ useHandCursor: true });
      txt.on('pointerdown', () => this.pickActiveTask(task.id));
      this.taskTexts.push(txt);
    });

    this.updateActiveTaskPanel();
  }
}
