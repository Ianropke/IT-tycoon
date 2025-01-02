// tasks.js

// Keep the globalTasks array
window.globalTasks = window.globalTasks || [];

// Helper to pick a random element from an array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Creates a random new task with a step-based workflow:
 * Steps:
 * 1) vendor -> gather info
 * 2) hospital -> check timing
 * 3) infra -> secure resources
 * 4) cab -> get final approval
 * 5) evening -> do the actual upgrade
 */
function createRandomTask() {
  return {
    id: Date.now(),
    description: pickRandom([
      'EHR system upgrade needed',
      'Critical LIMS patch rollout',
      'Security fix for hospital network',
      'Infrastructure maintenance request'
    ]),
    status: 'New',
    currentStep: 0,  // Which step we’re on
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
 * Marks a task as “Done.” We only do this if we completed all steps.
 */
function completeTask(taskId) {
  const task = getTaskById(taskId);
  if (task && task.currentStep >= task.steps.length) {
    task.status = 'Done';
  }
}

/**
 * Moves the task to its next step, if any remain.
 */
function advanceTaskStep(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;
  
  // Only advance if we haven't completed all steps
  if (task.currentStep < task.steps.length) {
    task.currentStep++;
    // If we've finished all steps, we can set it to "CanComplete"
    if (task.currentStep >= task.steps.length) {
      // All steps done
      task.status = 'Ready to finalize';
    }
  }
}

/**
 * Retrieve a task by ID
 */
function getTaskById(taskId) {
  return window.globalTasks.find(t => t.id === taskId);
}

/**
 * Update the priority for a given task.
 */
function updateTaskPriority(taskId, newPriority) {
  const task = getTaskById(taskId);
  if (task) {
    task.priority = newPriority;
  }
}
