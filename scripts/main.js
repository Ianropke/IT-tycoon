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

import { BootScene, MenuScene, GameScene } from './gameScenes.js';

import { openTaskSelectionModal, closeModalFunction } from './ui.js'; // Import updated functions

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
    },
    audio: {
        disableWebAudio: false
    }
};

// Initialize Phaser Game
const phaserGame = new Phaser.Game(config);

// Assign Phaser game instance to a global variable
window.phaserGame = phaserGame;

// Listen to Phaser Events
listenToPhaserEvents(phaserGame);

// Handle redirection to Legal Zone when compliance issues are found
phaserGame.events.on('redirectToLegal', () => {
    phaserGame.scene.getScene('GameScene').enterZone('legal');
});

// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', () => {
    initializeTasks();

    // Periodically assign tasks every 30 seconds
    setInterval(() => {
        assignTask();
    }, 30000); // 30,000 ms = 30 seconds

    // Close Modal when 'x' is clicked
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeModalFunction();
        });
    }

    // Close Modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            closeModalFunction();
        }
    });

    // Add event listeners to additional management buttons
    document.getElementById('hire-employee')?.addEventListener('click', () => {
        // Implement hire employee functionality
        showToast('Hire Employee feature not implemented yet.');
    });

    document.getElementById('purchase-resources')?.addEventListener('click', () => {
        // Implement purchase resources functionality
        showToast('Purchase Resources feature not implemented yet.');
    });

    document.getElementById('check-compliance')?.addEventListener('click', () => {
        checkCompliance();
    });

    document.getElementById('manage-contracts')?.addEventListener('click', () => {
        manageContracts();
    });

    document.getElementById('toggle-theme')?.addEventListener('click', () => {
        toggleTheme();
    });

    document.getElementById('save-button')?.addEventListener('click', () => {
        saveGame();
    });

    document.getElementById('load-button')?.addEventListener('click', () => {
        loadGame();
    });

    document.getElementById('submit-feedback')?.addEventListener('click', () => {
        submitFeedback();
    });

    document.getElementById('allocate-budget')?.addEventListener('click', () => {
        // Implement allocate budget functionality
        showToast('Allocate Budget feature not implemented yet.');
    });

    document.getElementById('view-reports')?.addEventListener('click', () => {
        // Implement view reports functionality
        showToast('View Reports feature not implemented yet.');
    });
});
