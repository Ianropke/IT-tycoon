// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Basic instructions at top-left
    this.add.text(10, 10,
      'Arrow keys = move.\nVisit Backlog location to view tasks.\n' +
      'Pick a task from backlog.\nComplete steps in order.\nFinal step: Gather Everyone.\nThen finalize the task.',
      { fontSize: '15px', fill: '#000' }
    );

    // Show player score
    this.scoreText = this.add.text(10, 140, 'Score: ' + window.playerScore, { 
      fontSize: '16px', fill: '#f00' 
    });

    // We'll store references to text objects for tasks
    this.taskTexts = [];
    // The currently active task
    this.activeTaskId = null;

    // Create the "active task" panel
    this.createActiveTaskPanel();

    // Refresh displayed tasks every second
    this.time.addEvent({
      delay: 1000,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });
  }

  /**
   * The panel that shows details for the currently active task:
   * - Step info
   * - Status
   * - Priority
   * - "Gather Everyone" button (if final step)
   * - "Finalize Task" button (if ready)
   * - Full list of steps
   */
  createActiveTaskPanel() {
    // Place it so it doesn't overlap the scoreboard
    this.activePanel = this.add.container(250, 150).setDepth(100); 
    // ^ setDepth(100) so it's definitely on top

    // Larger background rectangle for more text
    const bg = this.add.rectangle(0, 0, 450, 250, 0xcccccc);
    bg.setOrigin(0, 0);

    // Title
    this.panelTitle = this.add.text(10, 10, 'Active Task:', {
      fontSize: '16px', fill: '#000'
    });

    // Step & status
    this.stepText = this.add.text(10, 40, '', {
      fontSize: '14px',
      fill: '#333',
      wordWrap: { width: 430 } // wordWrap within 430px
    });
    this.statusText = this.add.text(10, 60, '', {
      fontSize: '14px',
      fill: '#333',
      wordWrap: { width: 430 }
    });
    this.priorityText = this.add.text(10, 80, '', {
      fontSize: '14px',
      fill: '#333',
      wordWrap: { width: 430 }
    });

    // A multiline text showing all steps
    this.allStepsText = this.add.text(10, 110, '', {
      fontSize: '14px',
      fill: '#000',
      wordWrap: { width: 430 }
    });

    // "Gather Everyone" button for final step
    this.gatherBtn = this.add.text(10, 180, '[ Gather Everyone ]', {
      fontSize: '14px', fill: '#fff', backgroundColor: '#ff0000', padding: { x: 4, y: 2 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.gatherEveryone());

    // "Finalize" button
    const finalizeBtn = this.add.text(170, 180, '[ Finalize Task ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#00ff00', padding: { x: 4, y: 2 }
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => this.finalizeActiveTask());

    // Priority buttons
    const lowBtn = this.add.text(310, 180, '[ Priority: Low ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    })
    .setInteractive();
    lowBtn.on('pointerdown', () => this.setActiveTaskPriority('Low'));

    const highBtn = this.add.text(400, 180, '[ Priority: High ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    })
    .setInteractive();
    highBtn.on('pointerdown', () => this.setActiveTaskPriority('High'));

    // Add them all to the container
    this.activePanel.add([
      bg,
      this.panelTitle,
      this.stepText,
      this.statusText,
      this.priorityText,
      this.allStepsText,
      this.gatherBtn,
      finalizeBtn,
      lowBtn,
      highBtn
    ]);

    // Hidden if no task is active
    this.activePanel.setVisible(false);
  }

  gatherEveryone() {
    if (!this.activeTaskId) return;
    const task = getTaskById(this.activeTaskId);
    if (!task) return;

    // Only allow if the current step includes "evening upgrade"
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

  // Update all text fields in the active panel
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
    const totalSteps = task.steps.length;

    // Current step or "All steps done"
    let currentStepText = '';
    if (stepIndex >= totalSteps) {
      currentStepText = 'All steps completed. Ready to finalize.';
    } else {
      currentStepText = `Step ${stepIndex + 1} of ${totalSteps}: ${task.steps[stepIndex]}`;
    }

    this.stepText.setText(currentStepText);
    this.statusText.setText(`Status: ${task.status}`);
    this.priorityText.setText(`Priority: ${task.priority}`);

    // Show entire list of steps
    // e.g. "All steps:\n1) Visit Vendor...\n2) Hospital..."
    const stepsListing = task.steps
      .map((step, i) => `${i + 1}) ${step}`)
      .join('\n');
    this.allStepsText.setText('All Steps:\n' + stepsListing);

    // Show/hide the Gather Everyone button
    if (stepIndex < totalSteps && task.steps[stepIndex].includes('evening upgrade')) {
      this.gatherBtn.setVisible(true);
    } else {
      this.gatherBtn.setVisible(false);
    }
  }

  /**
   * Refresh the backlog list on-screen if the player is in the backlog zone.
   */
  refreshTaskList() {
    // Update score
    this.scoreText.setText('Score: ' + window.playerScore);

    // Destroy old text
    this.taskTexts.forEach(txt => txt.destroy());
    this.taskTexts = [];

    // If user not in backlog zone, just tell them so
    if (!window.canViewBacklog) {
      const msg = this.add.text(10, 170,
        'You must be at the Backlog location (orange square) to view tasks.',
        { fontSize: '14px', fill: '#f00' }
      );
      this.taskTexts.push(msg);
      this.updateActiveTaskPanel(); 
      return;
    }

    // Otherwise, show the tasks
    let startY = 170;
    const lineHeight = 20;
    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;
      const stepCount = `${task.currentStep}/${task.steps.length}`;

      // Example: "[New] EHR system upgrade needed (Step 0/5)"
      const txt = this.add.text(
        10,
        yPos,
        `[${task.status}] ${task.description} (Step ${stepCount})`,
        { fontSize: '14px', fill: '#000' }
      )
      .setDepth(50)  // So it appears above background but below the panel
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.pickActiveTask(task.id));

      this.taskTexts.push(txt);
    });

    this.updateActiveTaskPanel();
  }
}
