// js/utils.js

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generates a unique identifier for tasks.
 * @returns {string}
 */
export function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array 
 * @returns {Array}
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
