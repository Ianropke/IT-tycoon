// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Basic instructions at the top
    this.add.text(10, 10, 
      'Use arrow keys to move.\nTasks below.\nClick any task to mark as Done.',
      { fontSize: '16px', fill: '#000' }
    );

    // We'll store text objects here so we can refresh or destroy them
    this.taskTexts = [];

    // Refresh the task list periodically
    this.time.addEvent({
      delay: 500,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });
  }

  refreshTaskList() {
    // Clear existing text objects
    this.taskTexts.forEach(txt => txt.destroy());
    this.taskTexts = [];

    const startY = 70;
    const lineHeight = 20;

    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;
      const textObj = this.add.text(
        10,
        yPos,
        `[${task.status}] ${task.description}`,
        { fontSize: '14px', fill: '#333', backgroundColor: '#fff', padding: { x: 4, y: 2 } }
      );

      // Make each task clickable
      textObj.setInteractive({ useHandCursor: true });
      textObj.on('pointerdown', () => {
        completeTask(task.id);
      });

      this.taskTexts.push(textObj);
    });
  }
}
