// tasks.js

// A global array to store tasks
window.globalTasks = window.globalTasks || [];

// Creates a random new task object
function createRandomTask() {
  const dummyTasks = [
    'LIMS not syncing lab results (CRITICAL)',
    'Vendor proposes EHR upgrade (CAB approval needed)',
    'Hospital requests urgent troubleshooting',
    'Check SLA compliance for patch rollout',
    'Handle escalated frontline ticket'
  ];
  const randomIndex = Math.floor(Math.random() * dummyTasks.length);

  return {
    id: Date.now(),
    description: dummyTasks[randomIndex],
    status: 'New'
  };
}

// Marks a task as done by ID
function completeTask(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'Done';
  }
}
