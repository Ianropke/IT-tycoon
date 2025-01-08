export let tasks = [
  { name: 'System Audit', giver: 'IT Security', risk: 3, reward: 50, steps: ['Legal Dept', 'Infrastructure'] },
  { name: 'Employee Portal', giver: 'HR Department', risk: 2, reward: 30, steps: ['Infrastructure'] },
];

export let scores = { itSecurity: 0, hr: 0, total: 0 };
export let activeTask = null;

export function showTasks(availableTasksContainer, commitCallback) {
  availableTasksContainer.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskEl = document.createElement('div');
    taskEl.innerHTML = `
      <strong>${task.name}</strong><br>
      Giver: ${task.giver}<br>
      Risk: ${task.risk}, Reward: ${task.reward}<br>
      Steps: ${task.steps.join(' → ')}<br>
      <button onclick="commitCallback(${index})">Commit</button>
    `;
    availableTasksContainer.appendChild(taskEl);
  });
}

export function commitTask(index, activeTaskDetails) {
  activeTask = tasks.splice(index, 1)[0];
  activeTaskDetails.innerHTML = `
    <strong>${activeTask.name}</strong><br>
    Giver: ${activeTask.giver}<br>
    Risk: ${activeTask.risk}, Reward: ${activeTask.reward}<br>
    Steps: ${activeTask.steps.join(' → ')}
  `;
}

export function completeTask(activeTaskDetails, scoreboard) {
  if (!activeTask) {
    alert('No active task to complete!');
    return;
  }

  if (activeTask.giver === 'IT Security') scores.itSecurity += activeTask.reward;
  if (activeTask.giver === 'HR Department') scores.hr += activeTask.reward;
  scores.total += activeTask.reward;

  scoreboard.itSecurity.textContent = scores.itSecurity;
  scoreboard.hr.textContent = scores.hr;
  scoreboard.total.textContent = scores.total;

  activeTask = null;
  activeTaskDetails.textContent = 'No active tasks.';
}
