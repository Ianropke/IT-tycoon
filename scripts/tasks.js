// scripts/ui.js

// Update the backlog UI with pagination
export function updateBacklogUI(tasks, currentPage, tasksPerPage) {
    const backlogTasksBody = document.querySelector('#backlog-tasks tbody');
    backlogTasksBody.innerHTML = '';

    const start = (currentPage - 1) * tasksPerPage;
    const end = start + tasksPerPage;
    const paginatedTasks = tasks.slice(start, end);

    paginatedTasks.forEach(task => {
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

        const giverCell = document.createElement('td');
        giverCell.textContent = task.giver;
        row.appendChild(giverCell);

        backlogTasksBody.appendChild(row);
    });

    // Update current page display
    const currentPageSpan = document.getElementById('current-page');
    if (currentPageSpan) {
        currentPageSpan.textContent = currentPage;
    }
}

// Update the active task UI
export function updateActiveTaskUI(activeTask) {
    document.getElementById('active-description').textContent = activeTask ? activeTask.description : 'None';
    document.getElementById('active-steps').textContent = activeTask ? `${activeTask.stepsCompleted}/${activeTask.steps}` : '0/0';
    document.getElementById('active-priority').textContent = activeTask ? activeTask.priority : 'Low';
    document.getElementById('active-risk').textContent = activeTask ? activeTask.risk : '0';
    document.getElementById('active-giver').textContent = activeTask ? activeTask.giver : 'None';

    // Enable or disable buttons based on task status
    const gatherButton = document.getElementById('gather-button');
    const finalizeButton = document.getElementById('finalize-button');

    if (activeTask) {
        gatherButton.disabled = (activeTask.stepsCompleted >= activeTask.steps);
        finalizeButton.disabled = (activeTask.stepsCompleted < activeTask.steps);
    } else {
        gatherButton.disabled = true;
        finalizeButton.disabled = true;
    }
}

// Update the scores UI
export function updateScoresUI(scores) {
    document.getElementById('total-score').textContent = scores.totalScore;
    document.getElementById('current-money').textContent = scores.currentMoney;

    for (const [stakeholder, score] of Object.entries(scores.stakeholderScores)) {
        const scoreElement = document.getElementById(`${stakeholder}-score`);
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
}

// Update the budget bar based on current money
export function updateBudgetBar(currentMoney) {
    const budgetBar = document.getElementById('budget-bar');
    if (budgetBar) {
        const maxBudget = 100000; // Example maximum budget
        const percentage = Math.min((currentMoney / maxBudget) * 100, 100);
        budgetBar.style.width = `${percentage}%`;
    }
}

// Update the budget breakdown (last 10 tasks)
export function updateBudgetBreakdown() {
    const expenseList = document.getElementById('expense-list');
    if (expenseList) {
        expenseList.innerHTML = ''; // Clear existing expenses

        // Example: Fetch last 10 expenses from storage or state
        const lastExpenses = getLastTenExpenses(); // Implement this function as needed

        lastExpenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.description}: ${expense.amount} kr`;
            expenseList.appendChild(listItem);
        });
    }
}

// Show a toast notification
export function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Placeholder function to get last 10 expenses
function getLastTenExpenses() {
    // Implement your logic to retrieve the last 10 expenses
    // For demonstration, returning sample data
    return [
        { description: 'Buy Server', amount: 10000 },
        { description: 'Hire Employee', amount: 2500 },
        { description: 'Buy Software Licenses', amount: 500 },
        // Add more expenses as needed
    ];
}
