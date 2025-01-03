class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: "UIScene" });
    this.backlogContainer = null; // Declare as a class property
  }

  create() {
    // Scoreboard
    this.add.rectangle(0, 0, 1440, 60, 0xf4f4f4).setOrigin(0, 0);
    this.scoreText = this.add.text(20, 15, "Score: 0", { fontSize: "24px", color: "#007aff" });
    this.giverScores = this.add.text(300, 15, "Hospital: 0 | Infrastructure: 0 | InfoSec: 0 | CyberSec: 0", {
      fontSize: "16px",
      color: "#333",
    });

    // Backlog (Scrollable)
    this.add.text(910, 70, "Tasks (Backlog)", { fontSize: "18px", color: "#333" });

    // Create backlog container and mask
    this.backlogContainer = this.add.container(910, 120); // Assign to class property
    const scrollMask = this.add.graphics().fillStyle(0xffffff).fillRect(910, 120, 520, 340);
    this.backlogContainer.setMask(new Phaser.Display.Masks.GeometryMask(this, scrollMask));
    this.taskRows = [];

    // Active Task Box
    this.activeTaskBox = this.add.text(910, 480, "Active Task:\n(No active task)", { fontSize: "16px", color: "#333" });

    // Scrolling
    this.input.on("wheel", (pointer, deltaX, deltaY) => {
      if (this.backlogContainer) {
        this.backlogContainer.y = Phaser.Math.Clamp(this.backlogContainer.y - deltaY * 0.2, -300, 120);
      }
    });

    // Refresh UI
    this.time.addEvent({ delay: 1000, callback: this.updateUI, callbackScope: this, loop: true });
  }

  updateUI() {
    this.scoreText.setText(`Score: ${window.playerScore}`);
    this.giverScores.setText(
      `Hospital: ${window.completedTasks.hospital} | Infrastructure: ${window.completedTasks.infrastructure} | InfoSec: ${window.completedTasks.informationSecurity} | CyberSec: ${window.completedTasks.cybersecurity}`
    );

    this.taskRows.forEach(row => row.destroy());
    this.taskRows = [];

    let y = 0;
    window.globalTasks.forEach(task => {
      const descText = `[${task.status}] ${task.description.slice(0, 30)}...`;
      const desc = this.add.text(0, y, descText, { fontSize: "14px", color: "#333" });
      const steps = this.add.text(150, y, `${task.currentStep}/${task.steps.length}`, { fontSize: "14px", color: "#333" });
      const risk = this.add.text(210, y, `${task.risk}`, { fontSize: "14px", color: "#333" });
      const giver = this.add.text(260, y, task.giver, { fontSize: "14px", color: "#333" });
      this.backlogContainer.add([desc, steps, risk, giver]); // Properly scoped
      y += 30;
    });
  }
}
