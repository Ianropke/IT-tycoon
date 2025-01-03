window.globalTasks = [];
window.completedTasks = {
  hospital: 0,
  infrastructure: 0,
  informationSecurity: 0,
  cybersecurity: 0,
};
window.playerScore = 0;

function commitToTask(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (task) {
    task.committed = true;
    task.status = "In Progress";
  }
}

function advanceTaskStep(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (task && task.currentStep < task.steps.length) {
    task.currentStep += 1;
    if (task.currentStep === task.steps.length) {
      task.status = "Ready to Finalize";
    }
  }
}

function completeTask(taskId) {
  const taskIndex = window.globalTasks.findIndex(t => t.id === taskId);
  if (taskIndex >= 0) {
    const task = window.globalTasks[taskIndex];
    window.completedTasks[task.giver] += 1;
    window.playerScore += task.risk;
    window.globalTasks.splice(taskIndex, 1);
  }
}
