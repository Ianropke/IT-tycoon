/***************************************************************
 * ui.js
 * 
 * Defines a UI overlay scene that displays global tasks, 
 * enabling the user to click and update them.
 ***************************************************************/

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: false });
  }

  create() {
    // Instructions
    this.instructionsText = this.add.text(10, 10, 
      'Use arrow keys to move. Tasks appear below.\nClick a task to mark as Done.', 
      { fontSize: '16px', fill: '#000' }
    );
    
    // Array to store text objects for tasks
    this.taskTexts = [];

    // Update the task list every half-second
    this.time.addEvent({
      delay: 500,
      callback: this.refreshTaskList,
      callbackScope: this,
      loop: true
    });
  }

  refreshTaskList() {
    // Clear existing text objects
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    const startY = 60;
    const lineHeight = 20;

    // Loop over tasks
    window.globalTasks.forEach((task, index) => {
      const yPos = startY + index * lineHeight;
      const textObj = this.add.text(
        10,
        yPos,
        `[${task.status}] ${task.description}`,
        { 
          fontSize: '14px', 
          fill: '#333', 
          backgroundColor: '#fff', 
          padding: { x: 4, y: 2 }
        }
      );

      textObj.setInteractive({ useHandCursor: true });
      textObj.on('pointerdown', () => {
        // Mark the task as done using tasks.js
        completeTask(task.id);
      });

      this.taskTexts.push(textObj);
    });
  }
}
