// scripts/tasks.js
import { 
    updateBacklogUI, 
    updateScoreboardUI, 
    updateActiveTaskUI, 
    showToast 
} from './ui.js';

import { shuffleArray, generateRandomTask } from './utils.js';
import { gameState } from './state.js';

export function initializeTasks() {
    gameState.tasks = [];
    gameState.scores = {
        totalScore: 0,
        currentMoney: 50000,
        stakeholderScores: {
            hospital: 0,
            infrastructure: 0,
            cybersecurity: 0,
            infosec: 0
        }
    };
    updateBacklogUI([]);
    updateScoreboardUI(gameState.scores);
}

export function assignTask(zoneKey) {
    if (['hospital', 'infrastructure', 'cybersecurity', 'infosec'].includes(zoneKey)) {
        const newTask = generateRandomTask();
        newTask.giver = getGiverByZone(zoneKey);
        gameState.activeTask = newTask;
        updateActiveTaskUI(gameState.activeTask);
        showToast(`New task assigned by ${newTask.giver}: ${newTask.description}`);
    } else {
        showToast(`No tasks assigned by ${zoneKey} zone.`);
    }
}

function getGiverByZone(zoneKey) {
    const zoneGivers = {
        hospital: 'Hospital',
        infrastructure: 'Infrastructure',
        cybersecurity: 'Cybersecurity',
        infosec: 'InfoSec'
    };
    return zoneGivers[zoneKey] || 'Unknown';
}

export function commitTask() {
    if (!gameState.activeTask) {
        showToast('No active task to commit.');
        return;
    }
    showToast('Task already active.');
}

export function finalizeTask() {
    if (gameState.activeTask && gameState.activeTask.stepsCompleted >= gameState.activeTask.steps) {
        const pointsEarned = gameState.activeTask.risk * 10;
        gameState.scores.totalScore += pointsEarned;
        gameState.scores.currentMoney += pointsEarned;
        const giverKey = gameState.activeTask.giver.toLowerCase();
        if (gameState.scores.stakeholderScores.hasOwnProperty(giverKey)) {
            gameState.scores.stakeholderScores[giverKey] += pointsEarned;
        }
        gameState.activeTask = null;
        updateActiveTaskUI(null);
        updateScoreboardUI(gameState.scores);
        showToast(`Task finalized! Earned ${pointsEarned} points.`);
    } else {
        showToast('Active task is not ready to finalize.');
    }
}

export function hireEmployee(employee) {
    gameState.employees.push(employee);
    showToast(`Hired employee: ${employee.name}`);
}

export function purchaseResource(resourceName, amount) {
    const cost = calculateCost(resourceName, amount);
    if (gameState.scores.currentMoney >= cost) {
        gameState.resources[resourceName] += amount;
        gameState.scores.currentMoney -= cost;
        updateScoreboardUI(gameState.scores);
        showToast(`Purchased ${amount} ${resourceName}.`);
    } else {
        showToast('Insufficient funds for this purchase.');
    }
}

export function submitFeedback() {
    const feedbackText = document.getElementById('feedback-text') ? document.getElementById('feedback-text').value.trim() : '';
    if (feedbackText) {
        showToast('Feedback submitted. Thank you!');
        if (document.getElementById('feedback-text')) {
            document.getElementById('feedback-text').value = '';
        }
    } else {
        showToast('Please enter your feedback before submitting.');
    }
}

export function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    showToast('Theme toggled.');
}

export function saveGame() {
    localStorage.setItem('itManagerTycoonGameState', JSON.stringify(gameState));
    showToast('Game saved successfully!');
}

export function loadGame() {
    const savedState = localStorage.getItem('itManagerTycoonGameState');
    if (savedState) {
        Object.assign(gameState, JSON.parse(savedState));
        updateBacklogUI(gameState.tasks.slice(0, 5));
        updateActiveTaskUI(gameState.activeTask);
        updateScoreboardUI(gameState.scores);
        showToast('Game loaded successfully!');
    } else {
        showToast('No saved game found.');
    }
}

export function listenToPhaserEvents(phaserGame) {
    phaserGame.events.on('taskAssigned', (zoneKey) => {
        assignTask(zoneKey);
    });

    phaserGame.events.on('taskCompleted', () => {
        const earned = 100;
        gameState.scores.totalScore += earned;
        gameState.scores.currentMoney += earned;
        gameState.scores.stakeholderScores['hospital'] += earned;
        updateScoreboardUI(gameState.scores);
        showToast(`Phaser Task Completed! Earned ${earned} points.`);
    });

    phaserGame.events.on('legalZoneVisited', () => {
        showToast('Welcome to the Legal Zone. Manage your contracts and compliance here.');
    });

    phaserGame.events.on('vendorZoneVisited', () => {
        showToast('Welcome to the Vendor Zone. Manage your vendors and purchases here.');
    });

    phaserGame.events.on('budgetZoneVisited', () => {
        showToast('Welcome to the Budget Zone. Allocate your funds and view reports here.');
    });
}

function calculateCost(resourceName, amount) {
    const prices = {
        servers: 10000,
        softwareLicenses: 500,
        officeSpace: 20000
    };
    return prices[resourceName] * amount;
}
