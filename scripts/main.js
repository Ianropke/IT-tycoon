// scripts/main.js
import { 
    initializeTasks, 
    assignTask, 
    selectTask, 
    completeStep, 
    finalizeTask, 
    hireEmployee, 
    purchaseResource, 
    submitFeedback, 
    toggleTheme, 
    saveGame, 
    loadGame,
    checkCompliance,
    manageContracts,
    listenToPhaserEvents
} from './tasks.js';

import { generateUniqueId } from './utils.js';

import { BootScene, MenuScene, GameScene } from './gameScenes.js';

// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 900,
    parent: 'game-area',
    scene: [BootScene, MenuScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// Initialize Phaser Game
const phaserGame = new Phaser.Game(config);

// Listen to Phaser Events
listenToPhaserEvents(phaserGame);

// Handle redirection to Legal Zone when compliance issues are found
phaserGame.events.on('redirectToLegal', () => {
    phaserGame.scene.getScene('GameScene').enterZone('legal');
});

// Ensure only one instance of Phaser Game exists
if (!Phaser.Game.getGame('default')) {
    window.phaserGame = phaserGame;
}

// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', () => {
    initializeTasks();

    // Periodically assign tasks every 30 seconds
    setInterval(() => {
        assignTask();
    }, 30000); // 30,000 ms = 30 seconds

    // Commit Task Button
    const commitButton = document.getElementById('commit-button');
    if (commitButton) {
        commitButton.addEventListener('click', () => {
            if (gameState.activeTask) {
                showToast('Task already active. Complete it before committing a new one.');
            } else if (gameState.tasks.length > 0) {
                // Show task selection modal
                openTaskSelectionModal();
            } else {
                showToast('No tasks available to commit.');
            }
        });
    }

    // Finalize Task Button
    const finalizeButton = document.getElementById('finalize-task-button');
    if (finalizeButton) {
        finalizeButton.addEventListener('click', () => {
            finalizeTask();
        });
    }

    // Hire Employee Button
    const hireEmployeeButton = document.getElementById('hire-employee');
    if (hireEmployeeButton) {
        hireEmployeeButton.addEventListener('click', () => {
            const newEmployee = {
                id: generateUniqueId(),
                name: 'Charlie',
                department: 'Support',
                skillLevel: 3,
                efficiency: 0.8,
                salary: 2500,
                isAvailable: true
            };
            hireEmployee(newEmployee);
        });
    }

    // Manage Contracts Button
    const manageContractsButton = document.getElementById('manage-contracts');
    if (manageContractsButton) {
        manageContractsButton.addEventListener('click', () => {
            manageContracts();
        });
    }

    // Check Compliance Button
    const checkComplianceButton = document.getElementById('check-compliance');
    if (checkComplianceButton) {
        checkComplianceButton.addEventListener('click', () => {
            checkCompliance();
        });
    }

    // Purchase Resources Button
    const purchaseResourcesButton = document.getElementById('purchase-resources');
    if (purchaseResourcesButton) {
        purchaseResourcesButton.addEventListener('click', () => {
            purchaseResource('servers', 1);
        });
    }

    // Upgrade Services Button
    const upgradeServicesButton = document.getElementById('upgrade-services');
    if (upgradeServicesButton) {
        upgradeServicesButton.addEventListener('click', () => {
            purchaseResource('softwareLicenses', 5);
        });
    }

    // Allocate Budget Button
    const allocateBudgetButton = document.getElementById('allocate-budget');
    if (allocateBudgetButton) {
        allocateBudgetButton.addEventListener('click', () => {
            purchaseResource('officeSpace', 1);
        });
    }

    // View Reports Button
    const viewReportsButton = document.getElementById('view-reports');
    if (viewReportsButton) {
        viewReportsButton.addEventListener('click', () => {
            showToast('View Reports clicked.');
            // Implement report viewing functionality here
        });
    }

    // Submit Feedback Button
    const submitFeedbackButton = document.getElementById('submit-feedback');
    if (submitFeedbackButton) {
        submitFeedbackButton.addEventListener('click', () => {
            submitFeedback();
        });
    }

    // Toggle Theme Button
    const toggleThemeButton = document.getElementById('toggle-theme');
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', () => {
            toggleTheme();
        });
    }

    // Save Game Button
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            saveGame();
        });
    }

    // Load Game Button
    const loadButton = document.getElementById('load-button');
    if (loadButton) {
        loadButton.addEventListener('click', () => {
            loadGame();
        });
    }

    // Close Modal when 'x' is clicked
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeModalFunction();
        });
    }
});

// Function to open task selection modal
function openTaskSelectionModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    let taskOptions = '';

    if (gameState.tasks.length === 0) {
        taskOptions = '<p>No tasks available.</p>';
    } else {
        taskOptions = '<h3>Select a Task to Commit</h3><ul>';
        gameState.tasks.slice(0, 5).forEach(task => {
            taskOptions += `
                <li>
                    <strong>${task.description}</strong><br>
                    Giver: ${task.taskGiver} | Risk: ${task.risk} | Price: $${task.price}
                    <button data-task-id="${task.id}">Select</button>
                </li>
            `;
        });
        taskOptions += '</ul>';
    }

    modalBody.innerHTML = taskOptions;
    modal.style.display = 'block';

    // Add event listeners to task selection buttons
    const selectButtons = modalBody.querySelectorAll('button[data-task-id]');
    selectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('data-task-id');
            selectTask(taskId);
            modal.style.display = 'none';
        });
    });
}

// Function to close modal
function closeModalFunction() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Initialize contracts in gameState if not already present
import { gameState } from './state.js';
if (!gameState.contracts) {
    gameState.contracts = [];
}
