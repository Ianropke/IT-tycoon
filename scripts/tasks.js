/***************************************************************
 * tasks.js
 * 
 * Contains logic for generating and managing tasks, such as
 * escalated incidents, vendor proposals, or hospital requests.
 ***************************************************************/

function createRandomTask() {
  const dummyTasks = [
    'LIMS not syncing lab results (CRITICAL)',
    'Vendor proposes EHR upgrade — CAB approval needed',
    'Hospital requests urgent troubleshooting for lab server',
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

/**
 * Example function for updating tasks, e.g. marking them complete
 */
function completeTask(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'Done';
  }
}
