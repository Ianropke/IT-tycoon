// scripts/tasks.js
import { 
    updateBacklogUI, 
    updateScoreboardUI, 
    updateActiveTaskUI, 
    showToast, 
    openTaskDetailsModal, 
    commitToTask 
} from './ui.js'; // Avoid importing UI functions if possible
import { shuffleArray, generateUniqueId } from './utils.js';
import { gameState } from './state.js';

/** Task Givers and Step Locations **/
const taskGivers = ['Hospital', 'Infrastructure', 'Cybersecurity', 'InfoSec'];
const stepLocations = ['Vendor Zone', 'Budget Zone', 'Legal Zone', 'Infrastructure Zone', 'Cybersecurity Zone'];

/** Initialize Tasks **/
export function initializeTasks() {
    gameState.tasks = [];
    gameState.activeTask = null;
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
    gameState.contracts = []; // Initialize contracts
    updateBacklogUI([]);
    updateScoreboardUI(gameState.scores);
}

/** Generate a Random Task **/
export function generateRandomTask() {
    const descriptions = [
        'Upgrade Network Infrastructure',
        'Implement New Security Protocols',
        'Develop Internal Tools',
        'Conduct Employee Training',
        'Optimize Database Performance'
    ];

    const stepsCount = Math.floor(Math.random() * 3) + 2; // 2-4 steps
    const shuffledSteps = shuffleArray([...stepLocations]).slice(0, stepsCount);

    return {
        id: generateUniqueId(),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        taskGiver: taskGivers[Math.floor(Math.random() * taskGivers.length)],
        risk: Math.floor(Math.random() * 5) + 1, // 1-5
        price: Math.floor(Math.random() * 5000) + 1000, // $1,000 - $6,000
        steps: shuffledSteps, // Ordered list of steps
        currentStepIndex: 0, // Tracks progress
        isCompleted: false
    };
}

/** Assign a New Task **/
export function assignTask() {
    // Limit to 10 tasks in backlog
    if (gameState.tasks.length >= 10) {
        console.log('Backlog is full. Cannot assign more tasks.');
        showToast('Backlog is full. Complete existing tasks to assign new ones.');
        return;
    }

    const newTask = generateRandomTask();
    console.log('Assigning Task:', newTask);
    gameState.tasks.push(newTask);
    updateBacklogUI(gameState.tasks.slice(0, 10)); // Show top 10 tasks
    showToast(`New task added by ${newTask.taskGiver}: "${newTask.description}"`);
}

/** Select a Task **/
export function selectTask(taskId) {
    if (gameState.activeTask) {
        showToast('You already have an active task. Complete it before committing to another.');
        return;
    }

    const task = gameState.tasks.find(t => t.id === taskId);
    if (task) {
        gameState.activeTask = task;
        updateActiveTaskUI(gameState.activeTask);
        showToast(`Selected Task: "${task.description}"`);

        // Remove task from backlog
        gameState.tasks = gameState.tasks.filter(t => t.id !== taskId);
        updateBacklogUI(gameState.tasks.slice(0, 10));
    }
}

/** Complete a Step **/
export function completeStep() {
    if (!gameState.activeTask) {
        showToast('No active task selected.');
        return;
    }

    if (gameState.activeTask.currentStepIndex < gameState.activeTask.steps.length) {
        const currentStep = gameState.activeTask.steps[gameState.activeTask.currentStepIndex];
        gameState.activeTask.currentStepIndex += 1;
        showToast(`Completed step: Visit "${currentStep}"`);
        updateActiveTaskUI(gameState.activeTask);

        // Check if all steps are completed
        if (gameState.activeTask.currentStepIndex >= gameState.activeTask.steps.length) {
            showToast('All steps completed! Ready to finalize the task.');
        }
    } else {
        showToast('All steps already completed.');
    }
}

/** Finalize a Task **/
export function finalizeTask() {
    if (!gameState.activeTask) {
        showToast('No active task to finalize.');
        return;
    }

    if (gameState.activeTask.currentStepIndex < gameState.activeTask.steps.length) {
        showToast('Complete all steps before finalizing the task.');
        return;
    }

    const pointsEarned = gameState.activeTask.risk * 10;
    const moneyEarned = gameState.activeTask.price;
    gameState.scores.totalScore += pointsEarned;
    gameState.scores.currentMoney += moneyEarned;

    const giverKey = gameState.activeTask.taskGiver.toLowerCase();
    if (gameState.scores.stakeholderScores.hasOwnProperty(giverKey)) {
        gameState.scores.stakeholderScores[giverKey] += pointsEarned;
    }

    showToast(`Task "${gameState.activeTask.description}" finalized! Earned ${pointsEarned} points and $${moneyEarned}.`);

    gameState.activeTask = null;
    updateActiveTaskUI(null);
    updateScoreboardUI(gameState.scores);
}

/** Hire an Employee **/
export function hireEmployee(employee) {
    gameState.employees.push(employee);
    showToast(`Hired employee: ${employee.name}`);
}

/** Purchase a Resource **/
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

/** Submit Feedback **/
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

/** Toggle Theme **/
export function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    showToast('Theme toggled.');
}

/** Save Game State **/
export function saveGame() {
    localStorage.setItem('itManagerTycoonGameState', JSON.stringify(gameState));
    showToast('Game saved successfully!');
}

/** Load Game State **/
export function loadGame() {
    const savedState = localStorage.getItem('itManagerTycoonGameState');
    if (savedState) {
        Object.assign(gameState, JSON.parse(savedState));
        updateBacklogUI(gameState.tasks.slice(0, 10));
        updateActiveTaskUI(gameState.activeTask);
        updateScoreboardUI(gameState.scores);
        showToast('Game loaded successfully!');
    } else {
        showToast('No saved game found.');
    }
}

/** Check Compliance **/
export function checkCompliance() {
    // 50% chance to find a compliance issue
    const isNonCompliant = Math.random() < 0.5;
    if (isNonCompliant) {
        showToast('Compliance Check Failed! Issues found.');
        // Redirect player to Legal Zone
        gameState.currentZone = 'Legal Zone';
        // Emit event to handle redirection in Phaser
        if (window.phaserGame) {
            window.phaserGame.events.emit('redirectToLegal');
        }
    } else {
        showToast('Compliance Check Passed! All systems are compliant.');
    }
}

/** Manage Contracts **/
export function manageContracts() {
    // Open the contracts management modal
    openContractsModal();
}

/** Listen to Phaser Events **/
export function listenToPhaserEvents(phaserGame) {
    phaserGame.events.on('taskAssigned', () => {
        console.log('Received taskAssigned event');
        assignTask();
    });

    phaserGame.events.on('taskZoneVisited', (zoneKey) => {
        console.log(`Received taskZoneVisited event for zone: ${zoneKey}`);
        if (gameState.activeTask) {
            // Check if the visited zone matches the current step
            const currentStep = gameState.activeTask.steps[gameState.activeTask.currentStepIndex];
            const requiredZone = currentStep.toLowerCase().replace(' zone', '');

            if (zoneKey === requiredZone) {
                completeStep();
            } else {
                showToast(`Incorrect zone. Please visit "${currentStep}" to complete the step.`);
            }
        }
    });

    phaserGame.events.on('legalZoneVisited', () => {
        console.log('Received legalZoneVisited event');
        showToast('Welcome to the Legal Zone. Manage your contracts and compliance here.');
    });

    phaserGame.events.on('vendorZoneVisited', () => {
        console.log('Received vendorZoneVisited event');
        showToast('Welcome to the Vendor Zone. Manage your vendors and purchases here.');
    });

    phaserGame.events.on('budgetZoneVisited', () => {
        console.log('Received budgetZoneVisited event');
        showToast('Welcome to the Budget Zone. Allocate your funds and view reports here.');
    });
}

/** Helper Functions **/

function calculateCost(resourceName, amount) {
    const prices = {
        servers: 10000,
        softwareLicenses: 500,
        officeSpace: 20000
    };
    return prices[resourceName] * amount;
}
