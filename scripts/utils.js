// scripts/utils.js
export function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function generateRandomTask() {
    const descriptions = [
        'Upgrade Network Infrastructure',
        'Implement New Security Protocols',
        'Develop Internal Tools',
        'Conduct Employee Training',
        'Optimize Database Performance'
    ];
    const givers = ['Hospital', 'Infrastructure', 'Cybersecurity', 'InfoSec'];
    const priorities = ['Low', 'Medium', 'High'];

    return {
        id: generateUniqueId(),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        steps: Math.floor(Math.random() * 5) + 1,
        stepsCompleted: 0,
        risk: Math.floor(Math.random() * 5) + 1,
        giver: givers[Math.floor(Math.random() * givers.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)]
    };
}
