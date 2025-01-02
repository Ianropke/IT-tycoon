// tasks.js

window.globalTasks = window.globalTasks || [];
window.playerScore = 10; // example starting score

function createRandomTask() {
  const descriptions = [
    'EHR system upgrade needed',
    'Critical LIMS patch rollout',
    'Security fix for hospital network',
    'Infrastructure maintenance request'
  ];
  const index = Phaser.Math.Between(0, descriptions.length - 1);

  return {
    id: Date.now(),
    description: descriptions[index],
    status: 'New',
    currentStep: 0,
    steps: [
      'Visit Vendor for info',
      'Visit Hospital to confirm timing',
      'Visit Infrastructure dept to secure resources',
      'Go to CAB meeting for approval',
      'Gather everyone for evening upgrade' // final step
    ],
    priority: 'Unassigned'
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
