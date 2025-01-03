// scripts/ui.js

/** Update Scoreboard UI **/
export function updateScoreboardUI(scores) {
    const scoreboard = document.getElementById('scoreboard');
    if (!scoreboard) return;

    scoreboard.innerHTML = `
        <span id="score">Score: ${scores.totalScore}</span>
        <span id="hospital-score">Hospital: ${scores.stakeholderScores.hospital}</span>
        <span id="infrastructure-score">Infra: ${scores.stakeholderScores.infrastructure}</span>
        <span id="infosec-score">InfoSec: ${scores.stakeholderScores.infosec}</span>
        <span id="money">Money: $${scores.currentMoney}</span>
    `;
}

/** Update Backlog UI **/
export function updateBacklogUI(tasks) {
    const tasksTableBody = document.querySelector('#tasks-table tbody');
    if (!tasksTableBody) return;

    tasksTableBody.innerHTML = '';

    tasks.forEach((task) => {
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

        // Commit Button Cell
        const commitButtonCell = document.createElement('td');
        const commitButton = document.createElement('button');
        commitButton.textContent = 'Commit';
        commitButton.dataset.taskId = task.id;
        commitButton.disabled = !!window.gameState.activeTask;

        commitButton.addEventListener('click', () => {
            if (!window.gameState.activeTask) {
                window.commitToTask(task.id);
            } else {
                showToast('You already have an active task. Complete it before committing to another.');
            }
        });

        commitButtonCell.appendChild(commitButton);
        row.appendChild(commitButtonCell);

        tasksTableBody.appendChild(row);
    });
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
                window.completeStep();
            });
        }

        const finalizeTaskButton = document.getElementById('finalize-task-button');
        if (finalizeTaskButton) {
            finalizeTaskButton.addEventListener('click', () => {
                window.finalizeTask();
            });
        }
    } else {
        activeTaskPanel.innerHTML = `
            <h4>Active Task:</h4>
            <p>No active task.</p>
        `;
    }
}

/** Show Toast Notifications **/
export function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/** Open Task Details Modal **/
export function openTaskDetailsModal(taskId) {
    const task = window.gameState.tasks.find((t) => t.id === taskId) || window.gameState.activeTask;
    if (!task) {
        showToast('Task not found.');
        return;
    }

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>Task Details</h3>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Task Giver:</strong> ${task.taskGiver}</p>
        <p><strong>Risk:</strong> ${task.risk}</p>
        <p><strong>Price:</strong> $${task.price}</p>
        <p><strong>Steps:</strong></p>
        <ol>
            ${task.steps.map((step) => `<li>${step}</li>`).join('')}
        </ol>
        <button id="close-details-button">Close</button>
    `;
    modal.style.display = 'block';

    const closeDetailsButton = document.getElementById('close-details-button');
    if (closeDetailsButton) {
        closeDetailsButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}
