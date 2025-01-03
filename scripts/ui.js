class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.add.text(20, 10, 'Score: 0', { fontSize: '20px', color: '#007aff' });
    this.scoreboard = this.add.text(400, 10, 'Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
      fontSize: '14px',
      color: '#333',
    });

    this.backlogTitle = this.add.text(900, 50, 'Tasks (Backlog)', { fontSize: '18px', color: '#000' });
    this.activeTaskTitle = this.add.text(900, 400, 'Active Task:', { fontSize: '18px', color: '#000' });

    this.activeTaskDetails = this.add.text(900, 430, '(No active task)', { fontSize: '14px', color: '#333' });
    this.commitButton = this.add.text(900, 500, '[ Commit ]', { fontSize: '16px', backgroundColor: '#007aff' })
      .setInteractive()
      .on('pointerdown', () => this.commitTask());
  }

  updateUI() {
    this.refreshBacklog();
    this.refreshActiveTask();
  }

  refreshBacklog() {
    // Display backlog tasks
    if (!window.canViewBacklog || window.globalTasks.length === 0) {
      this.backlogTitle.setText('Stand on orange backlog to see tasks.');
      return;
    }
    // Render tasks in backlog
  }

  refreshActiveTask() {
    // Update the active task display
  }

  commitTask() {
    // Commit the active task
  }
}
