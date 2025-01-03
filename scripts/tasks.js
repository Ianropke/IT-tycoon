// js/tasks.js

import { getRandomInt, generateUniqueId, shuffleArray } from './utils.js';
import { updateBacklogUI, updateActiveTaskUI, updateScoresUI } from './ui.js';

let backlog = [];
let activeTask = null;
let currentPage = 1;
const tasksPerPage = 10;

const stakeholders = ['Hospital', 'Infrastructure', 'Cybersecurity', 'InfoSec'];

/**
 * Initializes the backlog with initial tasks.
 */
export function initializeTasks() {
  for (let i = 0; i < 15; i++) { // Start with 15 tasks
    backlog.push(generateRandomTask());
  }
  shuffleArray(backlog);
  updateBacklogUI(backlog, currentPage, tasksPerPage);
}

/**
 * Generates a random task with varying properties.
 * @returns {Object}
 */
function generateRandomTask() {
  const descriptions = [
    'Update EHR system',
    'Server infrastructure upgrade',
    'Analyze security logs',
    'GDPR compliance review',
    'Vendor approval process',
    'Implement firewall rules',
    'Database optimization',
    'Incident response planning',
    'System configuration management',
    'Backup and recovery setup'
  ];

  const priorityLevels = ['Low', 'Medium', 'High'];

  const stakeholder = stakeholders[getRandomInt(0, stakeholders.length - 1)];
  const description = descriptions[getRandomInt(0, descriptions.length - 1)];
  const totalSteps = getRandomInt(1, 5);
  const risk = getRandomInt(1, 15);
  const priority = priorityLevels[getRandomInt(0, priorityLevels.length - 1)];

  return {
    id: generateUniqueId(),
    description,
    stepsCompleted: 0,
    totalSteps,
    risk,
    priority,
    giver: stakeholder
  };
}

/**
 * Commits a task from the backlog to become the active task.
 */
export function commitTask() {
  if (backlog.length === 0 || activeTask !== null) return;

  activeTask = backlog.shift();
  updateBacklogUI(backlog, currentPage, tasksPerPage);
  updateActiveTaskUI(activeTask);

  // Enable Gather and Finalize buttons
  document.getElementById('gather-button').disabled = false;
  document.getElementById('finalize-button').disabled = false;

  // Update scores based on commitment
  updateScoresUI();
}

/**
 * Gathers progress for the active task.
 */
export function gatherTask() {
  if (!activeTask) return;

  activeTask.stepsCompleted += 1;

  if (activeTask.stepsCompleted >= activeTask.totalSteps) {
    // All steps completed
    document.getElementById('gather-button').disabled = true;
  }

  updateActiveTaskUI(activeTask);
  updateScoresUI();
}

/**
 * Finalizes the active task, awarding points and resetting the active task.
 */
export function finalizeTask() {
  if (!activeTask) return;

  // Calculate points based on risk and priority
  let basePoints = activeTask.risk * 10;
  if (activeTask.priority === 'High') basePoints *= 1.5;
  else if (activeTask.priority === 'Medium') basePoints *= 1.2;

  // Update stakeholder score
  updateStakeholderScore(activeTask.giver, basePoints);

  // Update total score
  updateTotalScore(basePoints);

  // Reset active task
  activeTask = null;
  updateActiveTaskUI(null);

  // Disable Gather and Finalize buttons
  document.getElementById('gather-button').disabled = true;
  document.getElementById('finalize-button').disabled = true;

  // Optionally, generate a new task
  if (backlog.length < 15) {
    backlog.push(generateRandomTask());
    shuffleArray(backlog);
    updateBacklogUI(backlog, currentPage, tasksPerPage);
  }

  updateScoresUI();
}

/**
 * Updates the score for a specific stakeholder.
 * @param {string} stakeholder 
 * @param {number} points 
 */
function updateStakeholderScore(stakeholder, points) {
  const scoreElement = document.getElementById(`${stakeholder.toLowerCase()}-score`);
  let currentScore = parseInt(scoreElement.innerText) || 0;
  currentScore += Math.round(points);
  scoreElement.innerText = currentScore;
}

/**
 * Updates the total score.
 * @param {number} points 
 */
function updateTotalScore(points) {
  const totalScoreElement = document.getElementById('total-score');
  let currentTotal = parseInt(totalScoreElement.innerText) || 0;
  currentTotal += Math.round(points);
  totalScoreElement.innerText = currentTotal;
}

/**
 * Handles pagination for the backlog.
 * @param {number} direction -1 for previous, 1 for next
 */
export function changePage(direction) {
  const totalPages = Math.ceil(backlog.length / tasksPerPage);

  currentPage += direction;
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  updateBacklogUI(backlog, currentPage, tasksPerPage);

  // Update button states
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;

  document.getElementById('current-page').innerText = currentPage;
}

/**
 * Creates a random task and adds it to the backlog.
 * @param {Object} options 
 */
export function createRandomTask(options = {}) {
  const newTask = generateRandomTask();
  if (options.giver) {
    newTask.giver = options.giver;
  }
  backlog.push(newTask);
  shuffleArray(backlog);
  updateBacklogUI(backlog, currentPage, tasksPerPage);
}
