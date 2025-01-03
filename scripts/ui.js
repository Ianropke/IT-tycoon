class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.add.rectangle(0, 0, 1440, 60, 0xf4f4f4).setOrigin(0, 0);
    this.scoreText = this.add.text(20, 15, 'Score: 0 | Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0', {
      fontSize: '16px',
      color: '#333',
    });

    // Backlog
    this.backlogContainer = this.add.container(920, 100);
    this.backlogText = this.add.text(0, 0, 'Tasks (Backlog):', { fontSize: '14px', color: '#333' });
    this.backlogContainer.add(this.backlogText);

    // Active Task
    this.activeTaskText = this.add.text(920, 500, 'Active Task:\n(No active task)', { fontSize: '14px', color: '#333' });

    // Scrolling feature
    this.scrollIndex = 0;
    this.input.keyboard.on('keydown-UP', () => this.scrollTasks(-1));
    this.input.keyboard.on('keydown-DOWN', () => this.scrollTasks(1));

    this.updateUI();
  }

  updateUI() {
    // Update Score
    const { hospital, infrastructure, informationSecurity, cybersecurity } = window.completedTasks;
    this.scoreText.setText(`Score: ${window.score} | Hospital: ${hospital} | Infrastructure: ${infrastructure} | InfoSec: ${informationSecurity} | CyberSec: ${cybersecurity}`);

    // Backlog tasks
    const tasks = window.globalTasks.slice(this.scrollIndex, this.scrollIndex + 5);
    this.backlogContainer.removeAll(true);
    this.backlogContainer.add(this.backlogText);
    tasks.forEach((task, i) => {
      const taskText = this.add.text(0, 20 + i * 20, `[${task.giver}] ${task.description} (${task.steps.length} steps)`, { fontSize: '12px', color: '#333' });
      this.backlogContainer.add(taskText);
    });

    // Penalty display
    const penalties = window.penalties || [];
    penalties.forEach(penalty => console.log('Penalty:', penalty));
  }

  scrollTasks(direction) {
    const maxScroll = Math.max(0, window.globalTasks.length - 5);
    this.scrollIndex = Math.min(Math.max(this.scrollIndex + direction, 0), maxScroll);
    this.updateUI();
  }
}
