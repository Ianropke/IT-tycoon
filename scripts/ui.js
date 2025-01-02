// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Basic instructions
    this.add.text(10, 10,
      'Arrow keys = move\nTasks appear below.\nClick "Details" to see cost/benefit.\nClick "Done" to close tasks.',
      { fontSize: '16px', fill: '#000' }
    );

    // We'll store text objects for the list of tasks
    this.taskTexts = [];

    // (A) Create a detail panel, hidden by default
    this.createDetailPanel();

    // (B) Refresh the task list periodically
    this.time.addEvent({
      delay: 500,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });
  }

  /**
   * Creates a container with text fields to display
   * detailed info about one selected task.
   */
  createDetailPanel() {
    // A container that we can show/hide
    this.detailContainer = this.add.container(300, 100);
    
    // Panel background (simple gray rectangle)
    const panelBg = this.add.rectangle(0, 0, 300, 200, 0x999999);
    panelBg.setOrigin(0, 0);

    // Title
    this.detailTitle = this.add.text(10, 10, 'Task Details', { 
      fontSize: '16px', 
      fill: '#000' 
    });

    // We’ll have multiple lines for cost, benefit, security, priority
    this.detailCost     = this.add.text(10, 40, '', { fontSize: '14px', fill: '#000' });
    this.detailBenefit  = this.add.text(10, 60, '', { fontSize: '14px', fill: '#000' });
    this.detailSecurity = this.add.text(10, 80, '', { fontSize: '14px', fill: '#000' });
    this.detailPriority = this.add.text(10, 100, '', { fontSize: '14px', fill: '#000' });

    // A "Close" button to hide the panel
    const closeText = this.add.text(220, 10, '[ Close ]', {
      fontSize: '14px',
      fill: '#ff0000',
      backgroundColor: '#fff',
      padding: { x: 4, y: 2 }
    }).setInteractive({ useHandCursor: true });
    closeText.on('pointerdown', () => {
      this.detailContainer.setVisible(false);
    });

    // Priority buttons
    const lowPriorityBtn = this.add.text(10, 140, '[ Set Priority: Low ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    }).setInteractive();
    lowPriorityBtn.on('pointerdown', () => this.setTaskPriority('Low'));

    const highPriorityBtn = this.add.text(160, 140, '[ Set Priority: High ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    }).setInteractive();
    highPriorityBtn.on('pointerdown', () => this.setTaskPriority('High'));

    // A "Done" button
    this.doneText = this.add.text(10, 170, '[ Mark Task as Done ]', {
      fontSize: '14px', fill: '#000', backgroundColor: '#ccc', padding: { x: 4, y: 2 }
    }).setInteractive();
    this.doneText.on('pointerdown', () => {
      if (this.currentTaskId) {
        completeTask(this.currentTaskId);
        this.detailContainer.setVisible(false);
      }
    });

    // Add everything to container
    this.detailContainer.add([
      panelBg,
      this.detailTitle,
      this.detailCost,
      this.detailBenefit,
      this.detailSecurity,
      this.detailPriority,
      closeText,
      lowPriorityBtn,
      highPriorityBtn,
      this.doneText
    ]);

    // Hide by default
    this.detailContainer.setVisible(false);
    this.currentTaskId = null; // Track which task is open
  }

  /**
   * Called when user clicks a "Details" button in the task list.
   * Populates the detail panel and shows it.
   */
  showTaskDetails(taskId) {
    const task = getTaskById(taskId);
    if (!task) return;

    this.currentTaskId = taskId;
    this.detailCost.setText(`Cost: ${task.cost} DKK`);
    this.detailBenefit.setText(`Benefit: ${task.benefit}`);
    this.detailSecurity.setText(`Security Risk: ${task.securityRisk}`);
    this.detailPriority.setText(`Priority: ${task.priority}`);
    this.detailContainer.setVisible(true);
  }

  /**
   * Called when user clicks one of the "Set Priority" buttons
   * in the detail panel.
   */
  setTaskPriority(newPriority) {
    if (this.currentTaskId) {
      updateTaskPriority(this.currentTaskId, newPriority);

      // Refresh displayed priority in the detail panel
      const updatedTask = getTaskById(this.currentTaskId);
      if (updatedTask) {
        this.detailPriority.setText(`Priority: ${updatedTask.priority}`);
      }
    }
  }

  /**
   * Refresh the task list on-screen, creating new clickable lines
   * if new tasks have arrived.
   */
  refreshTaskList() {
    // Destroy old text objects first
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    // Start text below the instructions
    const startY = 70;
    const lineHeight = 20;

    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;

      // Basic task info
      // e.g.: "[New] LIMS not syncing lab results"
      const textObj = this.add.text(
        10,
        yPos,
        `[${task.status}] ${task.description}`,
        { fontSize: '14px', fill: '#333', backgroundColor: '#fff', padding: { x: 4, y: 2 } }
      );

      // "Details" button right next to it
      const detailsBtn = this.add.text(
        400,
        yPos,
        '[ Details ]',
        { fontSize: '14px', fill: '#0000ff', backgroundColor: '#ccc', padding: { x: 4, y: 2 } }
      ).setInteractive({ useHandCursor: true });

      // Clicking "Details" opens the detail panel
      detailsBtn.on('pointerdown', () => {
        this.showTaskDetails(task.id);
      });

      this.taskTexts.push(textObj, detailsBtn);
    });
  }
}

