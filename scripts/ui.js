// scripts/ui.js
export function updateBacklogUI(tasks) {
    const tasksTableBody = document.querySelector('#tasks-table tbody');
    tasksTableBody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');

        const descCell = document.createElement('td');
        descCell.textContent = task.description;
        row.appendChild(descCell);

        const stepsCell = document.createElement('td');
        stepsCell.textContent = `${task.steps.length} steps`;
        row.appendChild(stepsCell);

        const riskCell = document.createElement('td');
        riskCell.textContent = task.risk;
        row.appendChild(riskCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${task.price}`;
        row.appendChild(priceCell);

        tasksTableBody.appendChild(row);
    });
}

export function updateScoreboardUI(scores) {
    document.getElementById('score').textContent = `Score: ${scores.totalScore}`;
    document.getElementById('hospital-score').textContent = `Hospital: ${scores.stakeholderScores.hospital}`;
    document.getElementById('infrastructure-score').textContent = `Infra: ${scores.stakeholderScores.infrastructure}`;
    document.getElementById('infosec-score').textContent = `InfoSec: ${scores.stakeholderScores.infosec}`;
    document.getElementById('money').textContent = `Money: $${scores.currentMoney}`;
}

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
                <button id="commit-button">Commit Task</button>
            </div>
        `;

        // Reassign event listener for commit button
        const commitButton = document.getElementById('commit-button');
        if (commitButton) {
            commitButton.addEventListener('click', () => {
                // Open task selection modal
                openTaskSelectionModal();
            });
        }
    }
}

export function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Function to open task selection modal (needed in UI)
export function openTaskSelectionModal() {
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
