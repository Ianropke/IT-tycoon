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
        stepsCell.textContent = `${task.stepsCompleted || 0}/${task.steps}`;
        row.appendChild(stepsCell);

        const riskCell = document.createElement('td');
        riskCell.textContent = task.risk;
        row.appendChild(riskCell);

        tasksTableBody.appendChild(row);
    });
}

export function updateScoreboardUI(scores) {
    document.getElementById('score').textContent = `Score: ${scores.totalScore}`;
    document.getElementById('hospital-score').textContent = `Hospital: ${scores.stakeholderScores.hospital}`;
    document.getElementById('infrastructure-score').textContent = `Infra: ${scores.stakeholderScores.infrastructure}`;
    document.getElementById('infosec-score').textContent = `InfoSec: ${scores.stakeholderScores.infosec}`;
}

export function updateActiveTaskUI(activeTask) {
    if (activeTask) {
        document.querySelector('#active-task-panel p:nth-child(1)').textContent = `Step ${activeTask.stepsCompleted || 0} of ${activeTask.steps}: Gather`;
        document.querySelector('#active-task-panel p:nth-child(2)').textContent = `Priority: ${activeTask.priority}`;
        document.querySelector('#active-task-panel p:nth-child(3)').textContent = `Risk: ${activeTask.risk}`;
        document.querySelector('#active-task-panel p:nth-child(4)').textContent = `Giver: ${activeTask.giver}`;
    } else {
        document.querySelector('#active-task-panel p:nth-child(1)').textContent = `Step 0 of 0: Gather`;
        document.querySelector('#active-task-panel p:nth-child(2)').textContent = `Priority: Low`;
        document.querySelector('#active-task-panel p:nth-child(3)').textContent = `Risk: 0`;
        document.querySelector('#active-task-panel p:nth-child(4)').textContent = `Giver: None`;
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
