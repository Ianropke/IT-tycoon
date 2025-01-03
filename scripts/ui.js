// js/ui.js

import { backlog, activeTask, tasksPerPage } from './tasks.js';

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
 */
export function updateScoresUI() {
  // Currently, scores are updated directly in tasks.js
  // This function can be expanded if additional score-related UI updates are needed
}

/**
 * Retrieves tasks for the current page.
 * @param {Array} backlog 
 * @param {number} currentPage 
 * @param {number} tasksPerPage 
 * @returns {Array}
 */
function getTasksForCurrentPage(backlog, currentPage, tasksPerPage) {
  const start = (currentPage - 1) * tasksPerPage;
  const end = start + tasksPerPage;
  return backlog.slice(start, end);
}
