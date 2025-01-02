// tasks.js

window.globalTasks = window.globalTasks || [];
window.playerScore = 10; // or your preferred starting score

/**
 * Creates a random new task with step-based workflow:
 *   Step array plus an "educationalExplanations" array
 */
function createRandomTask() {
  const descriptions = [
    'EHR system upgrade needed',
    'Critical LIMS patch rollout',
    'Security fix for hospital network',
    'Infrastructure maintenance request'
  ];
  const idx = Phaser.Math.Between(0, descriptions.length - 1);

  return {
    id: Date.now(),
    description: descriptions[idx],
    status: 'New',
    currentStep: 0,
    steps: [
      'Visit Vendor for info',
      'Visit Hospital to confirm timing',
      'Visit Infrastructure dept to secure resources',
      'Go to CAB meeting for approval',
      'Gather everyone for evening upgrade'
    ],
    // Explanation for each step: "why" it’s important
    educationalExplanations: [
      'Why vendor? Because they provide the patch or upgrade code and must confirm feasibility.',
      'Why hospital? Because you need to ensure hospital staff is prepared for downtime or changes.',
      'Why infrastructure? Because you require server resources, network changes, or extra hardware.',
      'Why CAB? Because changes must be formally approved to comply with governance.',
      'Why gather everyone? Because the final deployment must happen collectively in a planned downtime.'
    ],
    priority: 'Unassigned',
    committed: false // Indicates if the player has "committed" to solving this task
  };
}

function completeTask(taskId) {
  const task = getTaskById(taskId);
  if (task && task.currentStep >= task.steps.length) {
    task.status = 'Done';
  }
}

function advanceTaskStep(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;

  if (task.currentStep < task.steps.length) {
    task.currentStep++;
    if (task.currentStep >= task.steps.length) {
      task.status = 'Ready to finalize';
    }
  }
}

function getTaskById(taskId) {
  return window.globalTasks.find(t => t.id === taskId);
}

function updateTaskPriority(taskId, newPriority) {
  const task = getTaskById(taskId);
  if (task) {
    task.priority = newPriority;
  }
}

/**
 * Allows the player to "commit" to this task, marking it for solving.
 */
function commitToTask(taskId) {
  const task = getTaskById(taskId);
  if (task) {
    task.committed = true;
    task.status = (task.status === 'New') ? 'In Progress' : task.status;
  }
}
