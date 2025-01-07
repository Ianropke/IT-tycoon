export default class Task {
  constructor(description, risk, priority, steps, budget, deadline) {
    this.description = description;
    this.risk = risk;
    this.priority = priority;
    this.steps = steps;
    this.progress = 0;
    this.budget = budget;
    this.deadline = deadline;
    this.status = 'dispatch';
  }

  commit() {
    if (this.status === 'dispatch') {
      this.status = 'active';
    }
  }

  progressTask() {
    if (this.progress < this.steps) {
      this.progress++;
    }

    if (this.progress === this.steps) {
      this.status = 'completed';
    }
  }
}
