// scripts/tasks.js
import { 
    updateBacklogUI, 
    updateScoreboardUI, 
    updateActiveTaskUI, 
    showToast 
} from './ui.js';
import { shuffleArray, generateUniqueId } from './utils.js';
import { gameState } from './state.js';

// Sample task givers and locations for steps
const taskGivers = ['Hospital', 'Infrastructure', 'Cybersecurity', 'InfoSec'];
const stepLocations = ['Vendor Zone', 'Budget Zone', 'Legal Zone', 'Infrastructure Zone', 'Cybersecurity Zone'];

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

export function generateRandomTask() {
    const descriptions = [
        'Upgrade Network Infrastructure',
        'Implement New Security Protocols',
        'Develop Internal Tools',
        'Conduct Employee Training',
        'Optimize Database Performance'
    ];
    const priorities = ['Low', 'Medium', 'High'];

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

export function assignTask() {
    const newTask = generateRandomTask();
    gameState.tasks.push(newTask);
    updateBacklogUI(gameState.tasks.slice(0, 5)); // Show top 5 tasks
    showToast(`New task added by ${newTask.taskGiver}: "${newTask.description}"`);
}

export function selectTask(taskId) {
    const task = gameState.tasks.find(t => t.id === taskId);
    if (task) {
        gameState.activeTask = task;
        updateActiveTaskUI(gameState.activeTask);
        showToast(`Selected Task: "${task.description}"`);
    }
}

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

    // Remove task from backlog if present
    gameState.tasks = gameState.tasks.filter(t => t.id !== gameState.activeTask.id);

    showToast(`Task "${gameState.activeTask.description}" finalized! Earned ${pointsEarned} points and $${moneyEarned}.`);

    gameState.activeTask = null;
    updateActiveTaskUI(null);
    updateBacklogUI(gameState.tasks.slice(0, 5));
    updateScoreboardUI(gameState.scores);
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

export function checkCompliance() {
    // 50% chance to find a compliance issue
    const isNonCompliant = Math.random() < 0.5;
    if (isNonCompliant) {
        showToast('Compliance Check Failed! Issues found.');
        // Redirect player to Legal Zone
        gameState.currentZone = 'Legal Zone';
        // Emit event to handle redirection in Phaser
        const phaserGame = Phaser.Game.getGame('default');
        if (phaserGame) {
            phaserGame.events.emit('redirectToLegal');
        }
    } else {
        showToast('Compliance Check Passed! All systems are compliant.');
    }
}

export function manageContracts() {
    // Open the contracts management modal
    openContractsModal();
}

function openContractsModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div id="manage-contracts-content">
            <h3>Manage Contracts</h3>
            <input type="text" id="contract-name" placeholder="Contract Name" />
            <input type="number" id="contract-value" placeholder="Contract Value" />
            <button id="create-contract-button">Create Contract</button>
            <h4>Existing Contracts:</h4>
            <ul id="contracts-list">
                ${gameState.contracts.map(contract => `<li>${contract.name}: $${contract.value}</li>`).join('')}
            </ul>
        </div>
    `;
    modal.style.display = 'block';

    // Add event listener to the "Create Contract" button
    const createContractButton = document.getElementById('create-contract-button');
    if (createContractButton) {
        createContractButton.addEventListener('click', () => {
            const contractName = document.getElementById('contract-name').value.trim();
            const contractValue = parseInt(document.getElementById('contract-value').value.trim(), 10);

            if (contractName && !isNaN(contractValue)) {
                createContract(contractName, contractValue);
                document.getElementById('contract-name').value = '';
                document.getElementById('contract-value').value = '';
            } else {
                showToast('Please enter valid contract details.');
            }
        });
    }
}

function createContract(name, value) {
    gameState.contracts.push({ name, value });
    showToast(`Contract "${name}" created successfully!`);
    // Update the contracts list in the modal if it's open
    const contractsList = document.getElementById('contracts-list');
    if (contractsList) {
        contractsList.innerHTML += `<li>${name}: $${value}</li>`;
    }
}

// Ensure that selectTask is exported
// (Already handled by directly exporting the function above)

function calculateCost(resourceName, amount) {
    const prices = {
        servers: 10000,
        softwareLicenses: 500,
        officeSpace: 20000
    };
    return prices[resourceName] * amount;
}
