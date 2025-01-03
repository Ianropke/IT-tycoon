// scripts/main.js

// Import necessary functions from tasks.js and utils.js
import { 
    initializeTasks, 
    commitTask, 
    gatherTask, 
    finalizeTask, 
    hireEmployee, 
    purchaseResource, 
    submitFeedback, 
    toggleTheme, 
    saveGame, 
    loadGame, 
    initializeTheme, 
    changePage 
} from './tasks.js';

import { generateUniqueId } from './utils.js';

// Wait until the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game logic and UI
    initializeTasks();
    
    // ============================
    // Event Listeners for Buttons
    // ============================
    
    // Commit Task Button
    const commitButton = document.getElementById('commit-button');
    if (commitButton) {
        commitButton.addEventListener('click', () => {
            commitTask();
        });
    }

    // Gather Progress Button
    const gatherButton = document.getElementById('gather-button');
    if (gatherButton) {
        gatherButton.addEventListener('click', () => {
            gatherTask();
        });
    }

    // Finalize Task Button
    const finalizeButton = document.getElementById('finalize-button');
    if (finalizeButton) {
        finalizeButton.addEventListener('click', () => {
            finalizeTask();
        });
    }

    // Previous Page Button for Backlog Pagination
    const prevPageButton = document.getElementById('prev-page');
    if (prevPageButton) {
        prevPageButton.addEventListener('click', () => {
            changePage(-1);
        });
    }

    // Next Page Button for Backlog Pagination
    const nextPageButton = document.getElementById('next-page');
    if (nextPageButton) {
        nextPageButton.addEventListener('click', () => {
            changePage(1);
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

    // ============================
    // Event Listeners for Purchase Buttons
    // ============================

    // Buy Server Button
    const buyServerButton = document.getElementById('buy-server');
    if (buyServerButton) {
        buyServerButton.addEventListener('click', () => {
            purchaseResource('servers', 1);
        });
    }

    // Buy Software Licenses Button
    const buySoftwareLicensesButton = document.getElementById('buy-softwareLicenses');
    if (buySoftwareLicensesButton) {
        buySoftwareLicensesButton.addEventListener('click', () => {
            purchaseResource('softwareLicenses', 5);
        });
    }

    // Buy Office Space Button
    const buyOfficeSpaceButton = document.getElementById('buy-officeSpace');
    if (buyOfficeSpaceButton) {
        buyOfficeSpaceButton.addEventListener('click', () => {
            purchaseResource('officeSpace', 1);
        });
    }

    // ============================
    // Initialize Theme
    // ============================
    initializeTheme();
});
