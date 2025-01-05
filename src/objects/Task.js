// src/objects/Task.js
export default class Task {
  static nextId = 0;

  constructor(scene, stakeholder) {
    this.scene = scene;
    this.id = Task.nextId++;
    this.description = `Task for ${stakeholder.name}`;
    this.steps = Phaser.Math.Between(3, 5);
    this.riskLevel = Phaser.Math.Between(1, 5);
    this.stakeholder = stakeholder;
    this.status = 'backlog'; // Possible statuses: backlog, active, finalized, failed
    this.priority = Phaser.Math.Between(1, 10);
    this.deadline = this.scene.time.now + Phaser.Math.Between(60000, 300000); // 1-5 minutes
    this.reward = this.steps * 1000; // Example reward calculation
  }

  commit() {
    this.status = 'active';
    // Additional logic when committing to a task
    console.log(`Task committed: ${this.description}`);
  }

  isCompleted() {
    // Determine if the task is completed based on steps
    return this.steps <= 0;
  }

  progress() {
    if (this.steps > 0) {
      this.steps -= 1;
      console.log(`Progressing task: ${this.description}, Steps left: ${this.steps}`);
      if (this.isCompleted()) {
        this.status = 'finalized';
        console.log(`Task finalized: ${this.description}`);
      }
    }
  }

  update(time) {
    // Implement any task-specific updates here
    // For example, check if deadline has passed
    if (time > this.deadline && this.status === 'active') {
      this.status = 'failed';
      console.log(`Task failed due to deadline: ${this.description}`);
      this.scene.events.emit('taskFailed', this);
    }
  }
}
