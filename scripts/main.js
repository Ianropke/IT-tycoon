// scripts/main.js
import { 
    initializeTasks, 
    commitTask, 
    finalizeTask, 
    hireEmployee, 
    purchaseResource, 
    submitFeedback, 
    toggleTheme, 
    saveGame, 
    loadGame,
    listenToPhaserEvents
} from './tasks.js';

import { generateUniqueId } from './utils.js';

import { BootScene, MenuScene, GameScene } from './gameScenes.js';

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

const phaserGame = new Phaser.Game(config);

listenToPhaserEvents(phaserGame);

window.addEventListener('resize', () => {
    // Not required as Game Area is fixed
});

document.addEventListener('DOMContentLoaded', () => {
    initializeTasks();
    
    const commitButton = document.getElementById('commit-button');
    if (commitButton) {
        commitButton.addEventListener('click', () => {
            commitTask();
        });
    }

    const finalizeButton = document.getElementById('finalize-button');
    if (finalizeButton) {
        finalizeButton.addEventListener('click', () => {
            finalizeTask();
        });
    }

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

    const manageContractsButton = document.getElementById('manage-contracts');
    if (manageContractsButton) {
        manageContractsButton.addEventListener('click', () => {
            showToast('Manage Contracts clicked.');
        });
    }

    const checkComplianceButton = document.getElementById('check-compliance');
    if (checkComplianceButton) {
        checkComplianceButton.addEventListener('click', () => {
            showToast('Check Compliance clicked.');
        });
    }

    const purchaseResourcesButton = document.getElementById('purchase-resources');
    if (purchaseResourcesButton) {
        purchaseResourcesButton.addEventListener('click', () => {
            purchaseResource('servers', 1);
        });
    }

    const upgradeServicesButton = document.getElementById('upgrade-services');
    if (upgradeServicesButton) {
        upgradeServicesButton.addEventListener('click', () => {
            purchaseResource('softwareLicenses', 5);
        });
    }

    const allocateBudgetButton = document.getElementById('allocate-budget');
    if (allocateBudgetButton) {
        allocateBudgetButton.addEventListener('click', () => {
            purchaseResource('officeSpace', 1);
        });
    }

    const viewReportsButton = document.getElementById('view-reports');
    if (viewReportsButton) {
        viewReportsButton.addEventListener('click', () => {
            showToast('View Reports clicked.');
        });
    }

    const submitFeedbackButton = document.getElementById('submit-feedback');
    if (submitFeedbackButton) {
        submitFeedbackButton.addEventListener('click', () => {
            submitFeedback();
        });
    }

    const toggleThemeButton = document.getElementById('toggle-theme');
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', () => {
            toggleTheme();
        });
    }

    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            saveGame();
        });
    }

    const loadButton = document.getElementById('load-button');
    if (loadButton) {
        loadButton.addEventListener('click', () => {
            loadGame();
        });
    }
});
