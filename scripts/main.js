// js/main.js

import { initializeTasks, commitTask, gatherTask, finalizeTask, hireEmployee, purchaseResource, submitFeedback, toggleTheme, saveGame, loadGame, initializeTheme } from './tasks.js';
import { changePage } from './tasks.js';

// Initialize the game
initializeTasks();

// Event Listeners for Commit, Gather, and Finalize buttons
document.getElementById('commit-button').addEventListener('click', commitTask);
document.getElementById('gather-button').addEventListener('click', gatherTask);
document.getElementById('finalize-button').addEventListener('click', finalizeTask);

// Event Listeners for Pagination
document.getElementById('prev-page').addEventListener('click', () => changePage(-1));
document.getElementById('next-page').addEventListener('click', () => changePage(1));

// Event Listener for Hiring Employees
document.getElementById('hire-employee').addEventListener('click', () => {
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

// Event Listener for Feedback Submission
document.getElementById('submit-feedback').addEventListener('click', submitFeedback);

// Event Listener for Theme Toggle
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

// Event Listeners for Save and Load Buttons
document.getElementById('save-button').addEventListener('click', saveGame);
document.getElementById('load-button').addEventListener('click', loadGame);

// Initialize Theme
initializeTheme();
