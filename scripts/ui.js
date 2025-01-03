// scripts/ui.js

// Function to update the backlog UI
export function updateBacklogUI(backlog, currentPage, tasksPerPage) {
    console.log('Updating backlog UI...');
    // Your UI update logic here
    // Example:
    // Render tasks on the current page
    // Clear existing tasks
    const backlogTasksBody = document.querySelector('#backlog-tasks tbody');
    backlogTasksBody.innerHTML = '';

    // Calculate start and end indices
    const start = (currentPage - 1) * tasksPerPage;
    const end = start + tasksPerPage;
    const paginatedTasks = backlog.slice(start, end);

    // Populate table with tasks
    paginatedTasks.forEach(task => {
        const row = document.createElement('tr');

        const descCell = document.createElement('td');
        descCell.textContent = task.description;
        row.appendChild(descCell);

        const stepsCell = document.createElement('td');
        stepsCell.textContent = `${task.stepsCompleted}/${task.steps}`;
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

// Function to update the active task UI
export function updateActiveTaskUI(activeTask) {
    console.log('Updating active task UI...');
    // Your UI update logic here
    // Example:
    // Display active task details
    document.getElementById('active-description').textContent = activeTask.description;
    document.getElementById('active-steps').textContent = `${activeTask.stepsCompleted}/${activeTask.steps}`;
    document.getElementById('active-priority').textContent = activeTask.priority;
    document.getElementById('active-risk').textContent = activeTask.risk;
    document.getElementById('active-giver').textContent = activeTask.giver;

    // Enable or disable buttons based on task status
    const gatherButton = document.getElementById('gather-button');
    const finalizeButton = document.getElementById('finalize-button');

    if (activeTask.stepsCompleted < activeTask.steps) {
        gatherButton.disabled = false;
        finalizeButton.disabled = true;
    } else {
        gatherButton.disabled = true;
        finalizeButton.disabled = false;
    }
}

// Function to update stakeholder scores
export function updateStakeholderScore(giver, points) {
    console.log(`Updating score for ${giver} by ${points} points.`);
    // Your score update logic here
    // Example:
    const stakeholderScoreElement = document.getElementById(`${giver.toLowerCase()}-score`);
    if (stakeholderScoreElement) {
        const currentScore = parseInt(stakeholderScoreElement.textContent, 10);
        stakeholderScoreElement.textContent = currentScore + points;
    }
}

// Function to update the total score
export function updateTotalScore(points) {
    console.log(`Updating total score by ${points} points.`);
    // Your total score update logic here
    // Example:
    const totalScoreElement = document.getElementById('total-score');
    if (totalScoreElement) {
        const currentScore = parseInt(totalScoreElement.textContent, 10);
        totalScoreElement.textContent = currentScore + points;
    }
}

// Function to update the scores UI
export function updateScoresUI({ totalScore, currentMoney, stakeholderScores }) {
    console.log('Updating scores UI...');
    // Your scores UI update logic here
    // Example:
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('current-money').textContent = currentMoney;

    for (const [stakeholder, score] of Object.entries(stakeholderScores)) {
        const scoreElement = document.getElementById(`${stakeholder.toLowerCase()}-score`);
        if (scoreElement) {
            scoreElement.textContent = score;
        }
    }
}

// Function to update the budget bar
export function updateBudgetBar(currentMoney) {
    console.log(`Updating budget bar with ${currentMoney} kr.`);
    // Your budget bar update logic here
    // Example:
    const budgetBar = document.getElementById('budget-bar');
    if (budgetBar) {
        const maxBudget = 100000; // Example maximum budget
        const percentage = Math.min((currentMoney / maxBudget) * 100, 100);
        budgetBar.style.width = `${percentage}%`;
    }
}

// Function to update the budget breakdown
export function updateBudgetBreakdown() {
    console.log('Updating budget breakdown...');
    // Your budget breakdown update logic here
    // Example:
    // List the last 10 expenses
    const expenseList = document.getElementById('expense-list');
    if (expenseList) {
        expenseList.innerHTML = ''; // Clear existing expenses

        // Example: Fetch last 10 expenses from storage or state
        const lastExpenses = getLastTenExpenses(); // Implement this function

        lastExpenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = `${expense.description}: ${expense.amount} kr`;
            expenseList.appendChild(listItem);
        });
    }
}

// Function to show a toast notification
export function showToast(message) {
    console.log(`Showing toast: ${message}`);
    // Your toast notification logic here
    // Example:
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

// Function to check and unlock achievements
export function checkAchievements() {
    console.log('Checking achievements...');
    // Your achievement logic here
    // Example:
    // if (totalScore >= 1000) {
    //     unlockAchievement('Score 1000');
    // }
}

// Function to check and complete missions
export function checkMissions() {
    console.log('Checking missions...');
    // Your mission logic here
    // Example:
    // if (purchaseCount['servers'] >= 5) {
    //     completeMission('Buy 5 Servers');
    // }
}

// Function to perform Inspect and Adapt
export function performInspectAndAdapt() {
    console.log('Performing Inspect and Adapt...');
    // Your Inspect and Adapt logic here
    // Example:
    // Analyze recent game performance and suggest improvements
}

// Example function to get last 10 expenses
function getLastTenExpenses() {
    // Implement logic to retrieve last 10 expenses
    // Placeholder example:
    return [
        { description: 'Buy Server', amount: 10000 },
        { description: 'Hire Employee', amount: 2500 },
        // Add more expenses as needed
    ];
}

// Export other UI functions as needed
