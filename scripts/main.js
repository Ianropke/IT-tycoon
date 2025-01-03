// Main logic for handling tasks

window.globalTasks = [];
window.activeTaskId = null;
window.playerScore = 0;
window.giverScoreboard = {
  hospital: 0,
  infrastructure: 0,
  informationSecurity: 0,
  cybersecurity: 0,
};

// Example Task Functions
function commitToTask(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (!task) return;
  task.committed = true;
}

function gatherForTask(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (!task) return;
  task.currentStep++;
  if (task.currentStep >= task.steps.length) task.status = 'Ready to finalize';
}

function finalizeTask(taskId) {
  const task = window.globalTasks.find(t => t.id === taskId);
  if (!task) return;
  window.playerScore += task.risk;
  window.giverScoreboard[task.giver]++;

  // Remove task from backlog
  window.globalTasks = window.globalTasks.filter(t => t.id !== taskId);
  window.activeTaskId = null;
}

// Generate example tasks
function createExampleTasks() {
  window.globalTasks.push({
    id: '1',
    description: 'Critical fix required [Maint]',
    steps: ['Visit infrastructure', 'Verify fix', 'Document'],
    currentStep: 0,
    risk: 15,
    giver: 'infrastructure',
    status: 'New',
    priority: 'High',
    committed: false,
  });

  window.globalTasks.push({
    id: '2',
    description: 'EU compliance update [InfoSec]',
    steps: ['Review regulation', 'Approve compliance', 'Document'],
    currentStep: 0,
    risk: 20,
    giver: 'informationSecurity',
    status: 'New',
    priority: 'Medium',
    committed: false,
  });
}

// Call this once during the game start
createExampleTasks();
