// scripts/ui.js
import { completeStep, finalizeTask, selectTask, openTaskSelectionModal } from './tasks.js'; // Ensure no circular imports
import { gameState } from './state.js';

/** Show Toast Notification **/
export function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return; // Prevent errors if toast-container is missing

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/** Update Backlog UI **/
export function updateBacklogUI(tasks) {
    const tasksTableBody = document.querySelector('#tasks-table tbody');
    if (!tasksTableBody) return; // Prevent errors if tasks-table is missing
    tasksTableBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');

        // Description Cell
        const descCell = document.createElement('td');
        descCell.textContent = task.description;
        row.appendChild(descCell);

        // Steps Cell
        const stepsCell = document.createElement('td');
        stepsCell.textContent = `${task.steps.length} steps`;
        row.appendChild(stepsCell);

        // Risk Cell
        const riskCell = document.createElement('td');
        riskCell.textContent = task.risk;
        row.appendChild(riskCell);

        // Price Cell
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${task.price}`;
        row.appendChild(priceCell);

        // View Button Cell
        const viewButtonCell = document.createElement('td');
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Details';
        viewButton.classList.add('view-button');
        viewButton.dataset.taskId = task.id;
        viewButton.addEventListener('click', () => {
            openTaskDetailsModal(task.id);
        });
        viewButtonCell.appendChild(viewButton);
        row.appendChild(viewButtonCell);

        // Commit Button Cell
        const commitButtonCell = document.createElement('td');
        const commitButton = document.createElement('button');
        commitButton.textContent = 'Commit';
        commitButton.classList.add('commit-button');
        commitButton.dataset.taskId = task.id;

        // Disable Commit Button if a task is already active
        if (gameState.activeTask) {
            commitButton.disabled = true;
        }

        commitButton.addEventListener('click', () => {
            commitToTask(task.id);
        });
        commitButtonCell.appendChild(commitButton);
        row.appendChild(commitButtonCell);

        tasksTableBody.appendChild(row);
    });

    // Enable or disable the Commit Task button based on activeTask
    const commitTaskButton = document.getElementById('commit-button');
    if (commitTaskButton) {
        if (gameState.activeTask || tasks.length === 0) {
            commitTaskButton.disabled = true;
        } else {
            commitTaskButton.disabled = false;
        }
    }
}

/** Open Task Details Modal **/
export function openTaskDetailsModal(taskId) {
    const task = gameState.tasks.find(t => t.id === taskId) || gameState.activeTask;
    if (!task) {
        showToast('Task not found.');
        return;
    }

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return; // Prevent errors if modal structure is missing

    modalBody.innerHTML = `
        <div id="task-details-content">
            <h3>Task Details</h3>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Task Giver:</strong> ${task.taskGiver}</p>
            <p><strong>Risk:</strong> ${task.risk}</p>
            <p><strong>Price:</strong> $${task.price}</p>
            <p><strong>Steps:</strong></p>
            <ol>
                ${task.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <div class="buttons">
                <button id="close-details-button">Close</button>
            </div>
        </div>
    `;
    modal.style.display = 'block';

    // Add event listener to close the modal
    const closeDetailsButton = document.getElementById('close-details-button');
    if (closeDetailsButton) {
        closeDetailsButton.addEventListener('click', () => {
            closeModalFunction();
        });
    }
}

/** Commit to a Task **/
export function commitToTask(taskId) {
    if (gameState.activeTask) {
        showToast('You already have an active task. Complete it before committing to another.');
        return;
    }

    const task = gameState.tasks.find(t => t.id === taskId);
    if (!task) {
        showToast('Task not found.');
        return;
    }

    // Confirm Commit Action
    if (!confirm(`Do you want to commit to the task: "${task.description}"?`)) {
        return;
    }

    // Commit to Task
    selectTask(taskId); // Sets the task as activeTask and updates UI

    showToast(`Committed to task: "${task.description}"`);

    // Update Backlog UI to reflect the committed task
    updateBacklogUI(gameState.tasks.slice(0, 10));

    // Close Modal if open
    closeModalFunction();
}

/** Update Active Task UI **/
export function updateActiveTaskUI(activeTask) {
    const activeTaskPanel = document.getElementById('active-task-panel');
    if (!activeTaskPanel) return;

    if (activeTask) {
        activeTaskPanel.innerHTML = `
            <h4>Active Task:</h4>
            <p><strong>Description:</strong> ${activeTask.description}</p>
            <p><strong>Giver:</strong> ${activeTask.taskGiver}</p>
            <p><strong>Risk:</strong> ${activeTask.risk}</p>
            <p><strong>Price:</strong> $${activeTask.price}</p>
            <p><strong>Progress:</strong> ${activeTask.currentStepIndex}/${activeTask.steps.length} steps completed</p>
            <p><strong>Steps:</strong></p>
            <ol>
                ${activeTask.steps.map((step, index) => {
                    if (index < activeTask.currentStepIndex) {
                        return `<li style="text-decoration: line-through;">${step}</li>`;
                    } else {
                        return `<li>${step}</li>`;
                    }
                }).join('')}
            </ol>
            <div class="buttons">
                <button id="complete-step-button">Complete Step</button>
                <button id="finalize-task-button">Finalize Task</button>
            </div>
        `;

        // Add event listeners for completing steps and finalizing task
        const completeStepButton = document.getElementById('complete-step-button');
        if (completeStepButton) {
            completeStepButton.addEventListener('click', () => {
                completeStep();
            });
        }

        const finalizeTaskButton = document.getElementById('finalize-task-button');
        if (finalizeTaskButton) {
            finalizeTaskButton.addEventListener('click', () => {
                finalizeTask();
            });
        }
    } else {
        activeTaskPanel.innerHTML = `
            <h4>Active Task:</h4>
            <p>No active task.</p>
            <div class="buttons">
                <button id="commit-button" disabled>Commit Task</button>
            </div>
        `;

        // Reassign event listener for commit button if needed
        const commitButton = document.getElementById('commit-button');
        if (commitButton) {
            commitButton.addEventListener('click', () => {
                openTaskSelectionModal();
            });
        }
    }

    // Update Backlog UI to enable/disable commit buttons
    updateBacklogUI(gameState.tasks.slice(0, 10));
}

/** Close Modal Function **/
export function closeModalFunction() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.style.display = 'none';
}

/** Open Task Selection Modal **/
export function openTaskSelectionModal() {
    if (gameState.activeTask) {
        showToast('You already have an active task. Complete it before committing to another.');
        return;
    }

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return; // Prevent errors if modal structure is missing

    let taskOptions = '';

    if (gameState.tasks.length === 0) {
        taskOptions = '<p>No tasks available.</p>';
    } else {
        taskOptions = '<h3>Select a Task to Commit</h3><ul>';
        gameState.tasks.slice(0, 10).forEach(task => {
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
            commitToTask(taskId);
            modal.style.display = 'none';
        });
    });
}
