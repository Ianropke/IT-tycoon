// js/ui.js

import { getTasksForCurrentPage } from './tasks.js';

/**
 * Updates the backlog table with current tasks.
 * @param {Array} backlog 
 * @param {number} currentPage 
 * @param {number} tasksPerPage 
 */
export function updateBacklogUI(backlog, currentPage, tasksPerPage) {
  const backlogTasks = getTasksForCurrentPage(backlog, currentPage, tasksPerPage);
  const tbody = document.querySelector('#backlog-tasks tbody');
  tbody.innerHTML = ''; // Clear existing tasks

  backlogTasks.forEach(task => {
    const row = document.createElement('tr');
    row.id = `task-${task.id}`;
    row.classList.add('task-item', `priority-${task.priority.toLowerCase()}`);
    row.innerHTML = `
      <td>${task.description}</td>
      <td>${task.stepsCompleted}/${task.totalSteps}</td>
      <td>${task.risk}</td>
      <td>${task.giver}</td>
    `;
    tbody.appendChild(row);
  });

  // Update pagination buttons
  const totalTasks = backlog.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  document.getElementById('current-page').innerText = currentPage;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;
}

/**
 * Updates the active task panel with current task details.
 * @param {Object|null} activeTask 
 */
export function updateActiveTaskUI(activeTask) {
  document.getElementById('active-description').innerText = activeTask ? activeTask.description : 'None';
  document.getElementById('active-steps').innerText = activeTask ? `${activeTask.stepsCompleted}/${activeTask.totalSteps}` : '0/0';
  document.getElementById('active-priority').innerText = activeTask ? activeTask.priority : 'Low';
  document.getElementById('active-risk').innerText = activeTask ? activeTask.risk : '0';
  document.getElementById('active-giver').innerText = activeTask ? activeTask.giver : 'None';
}

/**
 * Updates the scores in the UI.
 * @param {Object} scores - Contains totalScore, currentMoney, and stakeholderScores
 */
export function updateScoresUI(scores) {
  if (scores.totalScore !== undefined) {
    document.getElementById('total-score').innerText = scores.totalScore;
  }
  if (scores.currentMoney !== undefined) {
    document.getElementById('current-money').innerText = scores.currentMoney;
  }
  if (scores.stakeholderScores !== undefined) {
    for (let stakeholder in scores.stakeholderScores) {
      const scoreElement = document.getElementById(`${stakeholder}-score`);
      if (scoreElement) {
        scoreElement.innerText = scores.stakeholderScores[stakeholder];
      }
    }
  }
}

/**
 * Updates the budget bar based on currentMoney.
 */
export function updateBudgetBar(currentMoney, initialMoney = 50000) {
  const budgetBar = document.getElementById('budget-bar');
  const percentage = (currentMoney / initialMoney) * 100;
  budgetBar.style.width = `${percentage}%`;

  if (percentage > 50) {
    budgetBar.style.backgroundColor = 'green';
  } else if (percentage > 20) {
    budgetBar.style.backgroundColor = 'yellow';
  } else {
    budgetBar.style.backgroundColor = 'red';
  }
}

/**
 * Updates the employee list in the UI.
 * @param {Array} employees 
 */
export function updateEmployeeListUI(employees) {
  const employeeList = document.getElementById('employee-list');
  employeeList.innerHTML = '';

  employees.forEach(emp => {
    const empElement = document.createElement('div');
    empElement.innerText = `${emp.name} - ${emp.department} (${emp.isAvailable ? 'Available' : 'Busy'})`;
    employeeList.appendChild(empElement);
  });
}

/**
 * Updates the resource list in the UI.
 * @param {Object} resources 
 */
export function updateResourceListUI(resources) {
  const resourceList = document.getElementById('resource-list');
  resourceList.innerHTML = '';

  for (let [name, details] of Object.entries(resources)) {
    const resourceElement = document.createElement('div');
    resourceElement.innerText = `${name}: ${details.quantity} units (Maintenance: ${details.maintenance} kr/month)`;
    resourceList.appendChild(resourceElement);
  }
}

/**
 * Displays the performance review modal after 10 tasks.
 * @param {Object} reviewData 
 * @param {number} performanceScore 
 */
export function displayPerformanceReview(reviewData, performanceScore) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.getElementById('close-modal');

  // Clear previous content
  modalBody.innerHTML = '';

  // Create Performance Review Content
  const header = document.createElement('h2');
  header.innerText = 'Inspect and Adapt - Performance Review';
  modalBody.appendChild(header);

  // Balance Across Task Givers
  const balanceSection = document.createElement('div');
  balanceSection.innerHTML = `
    <h3>1. Balance Across Task Givers</h3>
    <p>Your balance score: <strong>${reviewData.balanceScore.toFixed(2)} / 100</strong></p>
    <ul>
      ${Object.keys(reviewData.taskGiversCount).map(giver => `<li>${giver}: ${reviewData.taskGiversCount[giver]} tasks</li>`).join('')}
    </ul>
  `;
  modalBody.appendChild(balanceSection);

  // Prioritizing High-Risk Tasks
  const riskSection = document.createElement('div');
  riskSection.innerHTML = `
    <h3>2. Prioritizing High-Risk Tasks</h3>
    <p>High-risk tasks completed early: <strong>${reviewData.highRiskTasksCompletedEarly} / 5</strong></p>
    <p>Risk score: <strong>${(reviewData.highRiskTasksCompletedEarly / 5 * 100).toFixed(2)} / 100</strong></p>
  `;
  modalBody.appendChild(riskSection);

  // Minimizing Effort
  const effortSection = document.createElement('div');
  effortSection.innerHTML = `
    <h3>3. Minimizing Effort</h3>
    <p>Average steps per task: <strong>${reviewData.averageSteps}</strong></p>
    <p>Effort score: <strong>${(100 - (reviewData.averageSteps * 10)).toFixed(2)} / 100</strong></p>
  `;
  modalBody.appendChild(effortSection);

  // Spending Efficiency
  const spendingSection = document.createElement('div');
  spendingSection.innerHTML = `
    <h3>4. Spending Efficiency</h3>
    <p>Total amount spent on last 10 tasks: <strong>${reviewData.totalAmountSpent} kr</strong></p>
    <p>Spending score: <strong>${(100 - (reviewData.totalAmountSpent / 5000 * 100)).toFixed(2)} / 100</strong></p>
  `;
  modalBody.appendChild(spendingSection);

  // Overall Performance Score
  const overallSection = document.createElement('div');
  overallSection.innerHTML = `
    <h3>Overall Performance Score</h3>
    <p>Your performance score: <strong>${performanceScore} / 100</strong></p>
  `;
  modalBody.appendChild(overallSection);

  // Feedback Section
  const feedbackSection = document.createElement('div');
  feedbackSection.innerHTML = `<h3>Feedback</h3>`;

  if (reviewData.balanceScore < 70) {
    feedbackSection.innerHTML += `<p>Try to balance your task assignments across all departments to maximize efficiency.</p>`;
  } else {
    feedbackSection.innerHTML += `<p>Great job maintaining a balanced task distribution!</p>`;
  }

  if (reviewData.highRiskTasksCompletedEarly < 3) {
    feedbackSection.innerHTML += `<p>Focus on tackling high-risk tasks earlier to minimize potential issues.</p>`;
  } else {
    feedbackSection.innerHTML += `<p>Excellent prioritization of high-risk tasks!</p>`;
  }

  if (reviewData.averageSteps > 3) {
    feedbackSection.innerHTML += `<p>Consider optimizing your workflow to reduce the average number of steps per task.</p>`;
  } else {
    feedbackSection.innerHTML += `<p>Well done on minimizing the effort required for tasks!</p>`;
  }

  if (reviewData.totalAmountSpent > 40000) {
    feedbackSection.innerHTML += `<p>Manage your budget more effectively to ensure sustainability.</p>`;
  } else {
    feedbackSection.innerHTML += `<p>Great job managing your finances!</p>`;
  }

  modalBody.appendChild(feedbackSection);

  // Show the modal
  modal.style.display = 'block';

  // Close Modal Event
  closeModal.onclick = () => {
    modal.style.display = 'none';
  };

  // Close modal when clicking outside the content
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

/**
 * Shows a toast notification with the given message.
 * @param {string} message 
 */
export function showToast(message) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = message;
  toastContainer.appendChild(toast);

  // Show the toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove the toast from DOM after transition
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500);
  }, 3000);
}

/**
 * Opens a modal with the given content.
 * @param {string} content 
 */
export function openModal(content) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  // Set the content
  modalBody.innerHTML = content;

  // Show the modal
  modal.style.display = 'block';
}

/**
 * Closes the modal.
 */
export function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}
