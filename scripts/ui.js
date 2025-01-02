// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Instructions
    this.add.text(10, 10,
      'Arrow keys = move.\nPick a task.\nFollow each step in order by visiting the correct location.\n',
      { fontSize: '15px', fill: '#000' }
    );

    // Where we list tasks
    this.taskTexts = [];
    // No active task initially
    this.activeTaskId = null;

    // Panel to display active task details
    this.createActiveTaskPanel();

    // Refresh tasks every second
    this.time.addEvent({
      delay: 1000,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });
  }

  createActiveTaskPanel() {
    // A container for showing the active task’s step
    this.activePanel = this.add.container(400, 50);

    // Background
    const bg = this.add.rectangle(0, 0, 380, 150, 0xcccccc);
    bg.setOrigin(0, 0);

    this.panelTitle = this.add.text(10, 10, 'Active Task:', { fontSize: '16px', fill: '#000' });
    this.stepText = this.add.text(10, 40, '', { fontSize: '14px', fill: '#333' });
    this.statusText = this.add.text(10, 60, '', { fontSize: '14px', fill: '#333' });
    this.priorityText = this.add.text(10, 80, '', { fontSize: '14px', fill: '#333' });

    // Button to finalize if all steps are done
    const finalizeBtn = this.add.text(10, 110, '[ Finalize Task ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#00ff00', padding: { x: 4, y: 2 }
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.finalizeActiveTask());

    // Priority buttons
    const lowBtn = this.add.text(150, 110, '[ Priority: Low ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    }).setInteractive();
    lowBtn.on('pointerdown', () => this.setActiveTaskPriority('Low'));

    const highBtn = this.add.text(290, 110, '[ Priority: High ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    }).setInteractive();
    highBtn.on('pointerdown', () => this.setActiveTaskPriority('High'));

    this.activePanel.add([ bg, this.panelTitle, this.stepText, this.statusText, this.priorityText, finalizeBtn, lowBtn, highBtn ]);

    // Initially hide (if no active task)
    this.activePanel.setVisible(false);
  }

  finalizeActiveTask() {
    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    if (task.status === 'Ready to finalize') {
      completeTask(task.id);
      task.status = 'Done'; // Mark it done
      this.activeTaskId = null;
      this.activePanel.setVisible(false);
    }
  }

  setActiveTaskPriority(newPriority) {
    if (!this.activeTaskId) return;
    updateTaskPriority(this.activeTaskId, newPriority);
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

    this.stepText.setText(`Step ${task.currentStep + 1} of ${task.steps.length}: ${task.steps[task.currentStep] || 'All steps done'}`);
    this.statusText.setText(`Status: ${task.status}`);
    this.priorityText.setText(`Priority: ${task.priority}`);
  }

  refreshTaskList() {
    // Clear old texts
    this.taskTexts.forEach(txt => txt.destroy());
    this.taskTexts = [];

    const startY = 100;
    const lineHeight = 20;

    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;
      const txt = this.add.text(
        10,
        yPos,
        `[${task.status}] ${task.description} (Step ${task.currentStep}/${task.steps.length})`,
        { fontSize: '14px', fill: '#000' }
      );

      // Click to pick as active
      txt.setInteractive({ useHandCursor: true });
      txt.on('pointerdown', () => this.pickActiveTask(task.id));

      this.taskTexts.push(txt);
    });

    // Update panel for active task
    this.updateActiveTaskPanel();
  }
}
