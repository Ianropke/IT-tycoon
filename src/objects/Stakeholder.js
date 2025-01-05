// src/objects/Stakeholder.js
export default class Stakeholder {
  constructor(key, name, score) {
    this.key = key;
    this.name = name;
    this.score = score;
  }

  increaseScore(amount) {
    this.score += amount;
    console.log(`${this.name} score increased by ${amount}. Total score: ${this.score}`);
  }

  decreaseScore(amount) {
    this.score -= amount;
    console.log(`${this.name} score decreased by ${amount}. Total score: ${this.score}`);
  }
}
