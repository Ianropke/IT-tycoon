// tasks.js

// Global array of tasks
window.globalTasks = window.globalTasks || [];

// A global player score (start at 10, for example)
window.playerScore = 10;

/**
 * Creates a random new task with step-based workflow:
 *   0) Visit Vendor
 *   1) Visit Hospital
 *   2) Visit Infrastructure
 *   3) Go to CAB
 *   4) Gather everyone for evening upgrade (final step in UI)
 */
function createRandomTask() {
  const descriptions = [
    'EHR system upgrade needed',
    'Critical LIMS patch rollout',
    'Security fix for hospital network',
    'Infrastructure maintenance request'
  ];
  const index = Phaser.Math.Between(0, descriptions.length - 1);

  return {
    id: Date.now(),        // used for age-check
    description: descriptions[index],
    status: 'New',
    currentStep: 0,
    steps: [
      'Visit Vendor for info',
      'Visit Hospital to confirm timing',
      'Visit Infrastructure dept to secure resources',
      'Go to CAB meeting for approval',
      'Gather everyone for evening upgrade'
    ],
    priority: 'Unassigned'
  };
}

/**
 * Marks a task as done (only if all steps are finished).
 */
function completeTask(taskId) {
  const task = getTaskById(taskId);
  if (task && task.currentStep >= task.steps.length) {
    task.status = 'Done';
  }
}

/**
 * Advances the current step by 1.
 */
function advanceTaskStep(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;

  if (task.currentStep < task.steps.length) {
    task.currentStep++;
    if (task.currentStep >= task.steps.length) {
      // All steps done
      task.status = 'Ready to finalize';
    }
  }
}

/**
 * Retrieve a task by ID.
 */
function getTaskById(taskId) {
  return window.globalTasks.find(t => t.id === taskId);
}

/**
 * Update the priority of a task.
 */
function updateTaskPriority(taskId, newPriority) {
  const task = getTaskById(taskId);
  if (task) {
    task.priority = newPriority;
  }
}
