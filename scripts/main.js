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

import { openTaskSelectionModal } from './ui.js'; // Import from ui.js

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

    // Commit Task Button (handled in ui.js)
    // Other buttons handled via ui.js event listeners

    // Close Modal when 'x' is clicked
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeModalFunction();
        });
    }
});

// Function to close modal (can be imported from ui.js)
function closeModalFunction() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
