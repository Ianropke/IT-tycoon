// scripts/utils.js

// Function to generate a unique ID
export function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to shuffle an array
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to generate a random task
export function generateRandomTask() {
    // Your logic to generate a random task
    return {
        description: 'Sample Task',
        steps: 5,
        risk: 3,
        giver: 'Alice',
        priority: 'Medium'
    };
}

// Export other utility functions as needed
