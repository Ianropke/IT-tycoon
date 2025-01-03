// js/utils.js

/**
 * Generates a unique identifier.
 * @returns {string}
 */
export function generateUniqueId() {
  return 'id-' + Math.random().toString(36).substr(2, 16);
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array 
 */
export function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}
