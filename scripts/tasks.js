// tasks.js

// Keep a global array of tasks
window.globalTasks = window.globalTasks || [];

// Helper to pick a random element from an array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Creates a random new task object with extra fields:
 * - cost (number)
 * - benefit (string)
 * - securityRisk (string)
 * - priority (string)
 */
function createRandomTask() {
  const benefits = [ 'High', 'Medium', 'Low' ];
  const securityRisks = [ 'High', 'Medium', 'Low' ];

  return {
    id: Date.now(),
    description: pickRandom([
      'LIMS not syncing lab results',
      'EHR upgrade pending CAB approval',
      'Urgent hospital request for lab server fix',
      'SLA patch rollout check',
      'Escalated frontline ticket (critical)'
    ]),
    status: 'New',
    cost: Phaser.Math.Between(1000, 10000), // Random cost between 1k and 10k
    benefit: pickRandom(benefits),         // High/Medium/Low
    securityRisk: pickRandom(securityRisks), // High/Medium/Low
    priority: 'Unassigned' // The player can set this
  };
}

/**
 * Marks a specific task as done by ID.
 */
function completeTask(taskId) {
  const task = getTaskById(taskId);
  if (task) {
    task.status = 'Done';
  }
}

/**
 * Retrieves a task by ID.
 */
function getTaskById(taskId) {
  return window.globalTasks.find(t => t.id === taskId);
}

/**
 * Sets a new priority on a task (e.g., "Low", "Medium", "High").
 */
function updateTaskPriority(taskId, newPriority) {
  const task = getTaskById(taskId);
  if (task) {
    task.priority = newPriority;
  }
}
