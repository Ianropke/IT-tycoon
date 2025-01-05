// src/objects/Stakeholder.js

export default class Stakeholder {
  constructor(scene, name, initialScore) {
    this.scene = scene;
    this.key = name.toLowerCase();
    this.name = name;
    this.score = initialScore;
  }

  increaseScore(amount) {
    this.score += amount;
    this.scene.events.emit('updateStakeholderScores', this.getScoreData());
    console.log(`Stakeholder ${this.name} score increased by ${amount}. New score: ${this.score}`);
  }

  decreaseScore(amount) {
    this.score -= amount;
    if (this.score < 0) this.score = 0;
    this.scene.events.emit('updateStakeholderScores', this.getScoreData());
    console.log(`Stakeholder ${this.name} score decreased by ${amount}. New score: ${this.score}`);
  }

  getScoreData() {
    return {
      key: this.key,
      name: this.name,
      score: this.score
    };
  }
}
