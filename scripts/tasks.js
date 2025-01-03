// js/tasks.js

import { getRandomInt, generateUniqueId, shuffleArray } from './utils.js';
import { updateBacklogUI, updateActiveTaskUI, updateScoresUI, displayPerformanceReview, showToast, updateBudgetBar, updateEmployeeListUI, updateResourceListUI } from './ui.js';

export let backlog = [];
export let activeTask = null;
export let currentPage = 1;
export const tasksPerPage = 10;

// Initialize completed tasks history
export let completedTasksHistory = [];
export let completedTasksCount = 0;

// Initialize player budget
export let currentMoney = 50000;

// Initialize resources
export let resources = {
  servers: { quantity: 5, cost: 10000, maintenance: 500 },
  softwareLicenses: { quantity: 20, cost: 2000, maintenance: 200 },
  officeSpace: { size: 'Medium', cost: 5000, maintenance: 300 }
};

// Initialize employees
export let employees = [
  {
    id: 'emp-1',
    name: 'Alice',
    department: 'Development',
    skillLevel: 5,
    efficiency: 1.0,
    salary: 3000,
    isAvailable: true
  },
  {
    id: 'emp-2',
    name: 'Bob',
    department: 'Cybersecurity',
    skillLevel: 4,
    efficiency: 0.9,
    salary: 3500,
    isAvailable: true
  }
  // Add more employees as needed
];

// Define stakeholders
const stakeholders = ['Hospital', 'Infrastructure', 'Cybersecurity', 'InfoSec'];

// Define missions
const missions = [
  {
    id: 'mission-1',
    title: 'Secure the Network',
    description: 'Complete 5 cybersecurity tasks to secure the network.',
    criteria: (completedTasks) => completedTasks.filter(task => task.giver === 'Cybersecurity').length >= 5,
    isCompleted: false
  },
  {
    id: 'mission-2',
    title: 'Budget Optimization',
    description: 'Maintain a budget above 40,000 kr after 15 tasks.',
    criteria: (completedTasks) => completedTasksCount >= 15 && currentMoney > 40000,
    isCompleted: false
  }
  // Add more missions as needed
];

// Define achievements
const achievements = [
  {
    id: 'achv-1',
    name: 'Task Novice',
    description: 'Complete 10 tasks.',
    isUnlocked: false
  },
  {
    id: 'achv-2',
    name: 'Budget Master',
    description: 'Maintain a budget above 30,000 kr after 20 tasks.',
    isUnlocked: false
  }
  // Add more achievements as needed
];

// Define possible events
const events = [
  {
    id: 'event-1',
    name: 'Security Breach',
    description: 'A security breach has occurred. Pay 5000 kr for immediate response.',
    trigger: () => {
      currentMoney -= 5000;
      showToast('Security Breach! Paid 5000 kr for response.');
      updateScoresUI({ currentMoney });
      updateBudgetBar(currentMoney);
      updateResourceListUI(resources);
    },
    probability: 0.1 // 10% chance
  },
  {
    id: 'event-2',
    name: 'System Upgrade Bonus',
    description: 'System upgrades were successful. Gain 3000 kr.',
    trigger: () => {
      currentMoney += 3000;
      showToast('System Upgrade Successful! Gained 3000 kr.');
      updateScoresUI({ currentMoney });
      updateBudgetBar(currentMoney);
      updateResourceListUI(resources);
    },
    probability: 0.05 // 5% chance
  }
  // Add more events as needed
];

// Initialize game
export function initializeTasks() {
  for (let i = 0; i < 15; i++) { // Start with 15 tasks
    backlog.push(generateRandomTask());
  }
  shuffleArray(backlog);
  updateBacklogUI(backlog, currentPage, tasksPerPage);
  updateEmployeeListUI(employees);
  updateResourceListUI(resources);
  updateScoresUI({ 
    totalScore: getTotalScore(), 
    currentMoney, 
    stakeholderScores: getStakeholderScores() 
  });
  updateBudgetBar(currentMoney);
  showTutorial(); // Show tutorial on game start
  scheduleEvents();
}

// Generate a random task
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
  
  // Calculate cost based on risk and priority
  const baseCost = 1000;
  const riskFactor = risk * 100; // Each risk point adds 100 kr
  const priorityMultiplier = priority === 'High' ? 500 : priority === 'Medium' ? 300 : 0;
  const cost = baseCost + riskFactor + priorityMultiplier;

  return {
    id: generateUniqueId(),
    description: `${description} (Cost: ${cost} kr)`,
    stepsCompleted: 0,
    totalSteps,
    risk,
    priority,
    giver: stakeholder,
    cost
  };
}

// Commit a task
export function commitTask() {
  if (backlog.length === 0) {
    alert('No tasks available to commit.');
    return;
  }

  if (activeTask !== null) {
    alert('You already have an active task. Complete it before committing to a new one.');
    return;
  }

  const task = backlog[0]; // Peek at the first task
  if (currentMoney < task.cost) {
    alert(`Insufficient funds to commit to this task. Required: ${task.cost} kr, Available: ${currentMoney} kr.`);
    return;
  }

  // Deduct the task cost
  currentMoney -= task.cost;

  // Commit the task
  activeTask = backlog.shift();
  updateBacklogUI(backlog, currentPage, tasksPerPage);
  updateActiveTaskUI(activeTask);

  // Enable Gather and Finalize buttons
  document.getElementById('gather-button').disabled = false;
  document.getElementById('finalize-button').disabled = false;

  // Show toast notification
  showToast(`Task committed: ${activeTask.description} (Cost: ${activeTask.cost} kr)`);

  // Update scores based on commitment
  updateScoresUI({ 
    totalScore: getTotalScore(), 
    currentMoney, 
    stakeholderScores: getStakeholderScores() 
  });
  updateBudgetBar(currentMoney);
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
    showToast(`Task is ready to finalize: ${activeTask.description}`);
  }

  updateActiveTaskUI(activeTask);
  updateScoresUI({ 
    totalScore: getTotalScore(), 
    currentMoney, 
    stakeholderScores: getStakeholderScores() 
  });
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

  // Add to completed tasks history
  completedTasksHistory.push({ ...activeTask, pointsAwarded: Math.round(basePoints) });
  completedTasksCount += 1;

  // Reset active task
  activeTask = null;
  updateActiveTaskUI(null);

  // Disable Gather and Finalize buttons
  document.getElementById('gather-button').disabled = true;
  document.getElementById('finalize-button').disabled = true;

  // Optionally, generate a new task if backlog is below threshold
  if (backlog.length < 15) {
    backlog.push(generateRandomTask());
    shuffleArray(backlog);
    updateBacklogUI(backlog, currentPage, tasksPerPage);
  }

  // Show toast notification
  showToast(`Task finalized: ${activeTask.description}. Points awarded: ${Math.round(basePoints)}`);

  updateScoresUI({ 
    totalScore: getTotalScore(), 
    currentMoney, 
    stakeholderScores: getStakeholderScores() 
  });
  updateBudgetBar(currentMoney);
  updateBudgetBreakdown();

  // Check and unlock achievements
  checkAchievements();

  // Check and complete missions
  checkMissions();

  // Check if it's time for Inspect and Adapt
  if (completedTasksCount % 10 === 0) {
    performInspectAndAdapt();
  }
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
 * Retrieves the total score.
 * @returns {number}
 */
function getTotalScore() {
  const totalScoreElement = document.getElementById('total-score');
  return parseInt(totalScoreElement.innerText) || 0;
}

/**
 * Retrieves the stakeholder scores.
 * @returns {Object}
 */
function getStakeholderScores() {
  const stakeholders = ['hospital', 'infrastructure', 'cybersecurity', 'infosec'];
  const scores = {};
  stakeholders.forEach(stakeholder => {
    const scoreElement = document.getElementById(`${stakeholder}-score`);
    scores[stakeholder] = parseInt(scoreElement.innerText) || 0;
  });
  return scores;
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
    newTask.giver = capitalizeFirstLetter(options.giver);
  }
  backlog.push(newTask);
  shuffleArray(backlog);
  updateBacklogUI(backlog, currentPage, tasksPerPage);
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str 
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Retrieves the current active task.
 * @returns {Object|null}
 */
export function getActiveTask() {
  return activeTask;
}

/**
 * Performs the Inspect and Adapt process after 10 completed tasks.
 */
function performInspectAndAdapt() {
  // Analyze completed tasks
  const reviewData = analyzePerformance();

  // Calculate performance score
  const performanceScore = calculatePerformanceScore(reviewData);

  // Display performance review to the player
  displayPerformanceReview(reviewData, performanceScore);
}

/**
 * Analyzes the player's performance based on completed tasks.
 * @returns {Object}
 */
function analyzePerformance() {
  const totalTasks = completedTasksHistory.length;
  const lastTenTasks = completedTasksHistory.slice(-10);
  const taskGiversCount = {};
  let highRiskTasksCompletedEarly = 0;
  let totalRisk = 0;
  let totalSteps = 0;
  let totalAmountSpent = 0;

  lastTenTasks.forEach((task, index) => {
    // Count tasks per giver
    if (taskGiversCount[task.giver]) {
      taskGiversCount[task.giver] += 1;
    } else {
      taskGiversCount[task.giver] = 1;
    }

    // Check if high-risk tasks are completed early
    if (task.risk >= 10 && index < Math.ceil(lastTenTasks.length / 2)) { // Early is first half
      highRiskTasksCompletedEarly += 1;
    }

    totalRisk += task.risk;
    totalSteps += task.stepsCompleted;
    totalAmountSpent += task.cost;
  });

  // Calculate balance across task givers (standard deviation)
  const givers = Object.keys(taskGiversCount);
  const counts = givers.map(giver => taskGiversCount[giver]);
  const average = counts.reduce((a, b) => a + b, 0) / givers.length;
  const variance = counts.reduce((a, b) => a + Math.pow(b - average, 2), 0) / givers.length;
  const stdDeviation = Math.sqrt(variance);

  // Higher stdDeviation means less balance
  const balanceScore = Math.max(0, 100 - (stdDeviation * 20)); // Scale to 0-100

  return {
    totalTasks,
    taskGiversCount,
    highRiskTasksCompletedEarly,
    balanceScore,
    averageRisk: (totalRisk / lastTenTasks.length).toFixed(2),
    averageSteps: (totalSteps / lastTenTasks.length).toFixed(2),
    totalAmountSpent
  };
}

/**
 * Calculates the performance score based on review data.
 * @param {Object} reviewData 
 * @returns {number}
 */
function calculatePerformanceScore(reviewData) {
  let score = 0;

  // Balance Across Task Givers
  score += reviewData.balanceScore; // 0-100

  // Prioritizing High-Risk Tasks
  const highRiskScore = Math.min(reviewData.highRiskTasksCompletedEarly / 5 * 100, 100); // Assuming maximum 5 high-risk early tasks
  score += highRiskScore; // 0-100

  // Minimizing Effort
  const effortScore = Math.max(0, 100 - (reviewData.averageSteps * 10)); // Assuming 1-5 steps, scale to 90-50
  score += effortScore; // 50-100

  // Spending Efficiency: Lower spending yields higher score
  const spendingScore = Math.max(0, 100 - (reviewData.totalAmountSpent / 5000 * 100)); // Assuming spending up to 50,000 yields 0, adjust as needed
  score += spendingScore; // 0-100

  // Cap the total score at 400 (since there are four criteria each up to 100)
  score = Math.min(score, 400);

  // Normalize to 100
  const normalizedScore = (score / 400) * 100;

  return normalizedScore.toFixed(2);
}

/**
 * Analyzes and checks for achievements.
 */
function checkAchievements() {
  achievements.forEach(achievement => {
    if (!achievement.isUnlocked) {
      if (achievement.name === 'Task Novice' && completedTasksCount >= 10) {
        achievement.isUnlocked = true;
        showToast(`Achievement Unlocked: ${achievement.name} - ${achievement.description}`);
      }
      if (achievement.name === 'Budget Master' && completedTasksCount >= 20 && currentMoney > 30000) {
        achievement.isUnlocked = true;
        showToast(`Achievement Unlocked: ${achievement.name} - ${achievement.description}`);
      }
      // Add more achievement conditions as needed
    }
  });
}

/**
 * Checks and completes missions based on criteria.
 */
function checkMissions() {
  missions.forEach(mission => {
    if (!mission.isCompleted && mission.criteria(completedTasksHistory)) {
      mission.isCompleted = true;
      showToast(`Mission Accomplished: ${mission.title} - ${mission.description}`);
      // Grant additional rewards
      currentMoney += 5000; // Example reward
      updateScoresUI({ currentMoney, totalScore: getTotalScore(), stakeholderScores: getStakeholderScores() });
      updateBudgetBar(currentMoney);
      updateResourceListUI(resources);
    }
  });
}

/**
 * Schedules random events to occur at intervals.
 */
function scheduleEvents() {
  setInterval(triggerRandomEvents, 60000); // Every 60,000 ms = 1 minute
}

/**
 * Triggers random events based on their probability.
 */
function triggerRandomEvents() {
  events.forEach(event => {
    if (Math.random() < event.probability) {
      event.trigger();
    }
  });
}

/**
 * Updates the budget breakdown UI.
 */
export function updateBudgetBreakdown() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';
  
  // Get the last 10 completed tasks
  const lastTenTasks = completedTasksHistory.slice(-10);
  
  lastTenTasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerText = `${task.description}: ${task.cost} kr`;
    expenseList.appendChild(listItem);
  });
}

/**
 * Purchases a resource by name and amount.
 * @param {string} resourceName 
 * @param {number} amount 
 */
export function purchaseResource(resourceName, amount) {
  const resource = resources[resourceName];
  if (resource) {
    const totalCost = resource.cost * amount;
    if (currentMoney >= totalCost) {
      currentMoney -= totalCost;
      resource.quantity += amount;
      showToast(`Purchased ${amount} ${resourceName}. Total Cost: ${totalCost} kr`);
      updateScoresUI({ currentMoney });
      updateBudgetBar(currentMoney);
      updateResourceListUI(resources);
    } else {
      alert('Insufficient funds to purchase this resource.');
    }
  }
}

/**
 * Hires a new employee.
 * @param {Object} employee 
 */
export function hireEmployee(employee) {
  employees.push(employee);
  showToast(`New employee hired: ${employee.name} (${employee.department})`);
  updateEmployeeListUI(employees);
}

/**
 * Submits feedback from the feedback form.
 */
export function submitFeedback() {
  const feedback = document.getElementById('feedback-text').value.trim();
  if (feedback !== '') {
    // For demonstration, we'll just show a toast. Implement server-side storage if needed.
    showToast('Thank you for your feedback!');
    document.getElementById('feedback-text').value = '';
  } else {
    alert('Please enter your feedback before submitting.');
  }
}

/**
 * Toggles the game theme between light and dark.
 */
export function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
  
  // Save theme preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

/**
 * Loads the saved game state from localStorage.
 */
export function loadGame() {
  const savedState = JSON.parse(localStorage.getItem('itManagerTycoonSave'));
  if (savedState) {
    currentMoney = savedState.currentMoney;
    backlog = savedState.backlog;
    activeTask = savedState.activeTask;
    completedTasksHistory = savedState.completedTasksHistory;
    completedTasksCount = savedState.completedTasksCount;
    employees = savedState.employees;
    resources = savedState.resources;
    
    // Update UI accordingly
    updateBacklogUI(backlog, currentPage, tasksPerPage);
    updateActiveTaskUI(activeTask);
    updateEmployeeListUI(employees);
    updateResourceListUI(resources);
    updateScoresUI({ 
      totalScore: getTotalScore(), 
      currentMoney, 
      stakeholderScores: getStakeholderScores() 
    });
    updateBudgetBar(currentMoney);
    showToast('Game loaded successfully!');
  } else {
    alert('No saved game found.');
  }
}

/**
 * Saves the current game state to localStorage.
 */
export function saveGame() {
  const gameState = {
    currentMoney,
    backlog,
    activeTask,
    completedTasksHistory,
    completedTasksCount,
    employees,
    resources,
    stakeholderScores: getStakeholderScores()
  };
  localStorage.setItem('itManagerTycoonSave', JSON.stringify(gameState));
  showToast('Game saved successfully!');
}

/**
 * Initializes the game theme based on saved preference.
 */
export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(`${savedTheme}-theme`);
}

// Helper to get stakeholder scores
function getStakeholderScores() {
  const stakeholders = ['hospital', 'infrastructure', 'cybersecurity', 'infosec'];
  const scores = {};
  stakeholders.forEach(stakeholder => {
    const scoreElement = document.getElementById(`${stakeholder}-score`);
    scores[stakeholder] = parseInt(scoreElement.innerText) || 0;
  });
  return scores;
}
