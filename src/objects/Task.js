export default class Task {
  constructor(
    description,
    risk,
    priority,
    steps,
    reward,
    penalty,
    requiredLocations = []
  ) {
    this.description = description;
    this.risk = risk;
    this.priority = priority;
    this.steps = steps;
    this.reward = reward;
    this.penalty = penalty;
    this.requiredLocations = [...requiredLocations]; // Sequence of locations
    this.status = 'dispatch'; // dispatch, active, completed
    this.progress = 0; // Track progress
  }

  commit() {
    this.status = 'active';
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
