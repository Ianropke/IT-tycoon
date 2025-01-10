// JavaScript for IT Tycoon Game Logic

// Player Object
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 }, // percentage-based
  moveSpeed: 2, // movement increment
  isVisiting: null, // to prevent repeated collision checks
};

// Task Descriptions Pool (Sample)
const taskDescriptions = {
  'IT Security': [
    'Implement a new firewall to enhance network security.',
    'Conduct a security audit to identify vulnerabilities.',
    'Respond to a phishing attack targeting employees.',
  ],
  'HR Department': [
    'Upgrade the employee management system for better performance.',
    'Resolve access issues in the HR database.',
    'Integrate new recruitment tools into existing systems.',
  ],
  'Infrastructure': [
    'Upgrade the server infrastructure to support increased load.',
    'Perform routine maintenance on network switches.',
    'Install new backup solutions for critical data.',
  ],
  'Legal Department': [
    'Ensure all software licenses are up to date.',
    'Implement GDPR compliance measures across systems.',
    'Review and update data retention policies.',
  ],
  'Vendors': [
    'Approve the latest software patch from the vendor.',
    'Negotiate better SLA terms with the current vendor.',
    'Integrate the vendor’s new API into existing applications.',
  ],
  'Labs': [
    'Set up a new LIMS for the lab.',
    'Troubleshoot connectivity issues in diagnostic equipment.',
    'Deploy updates to lab data analysis tools.',
  ],
  'Diagnostics': [
    'Enhance diagnostic system speed.',
    'Fix EHR-diagnostic tool integration.',
    'Implement new diagnostic software updates.',
  ],
};

// Task Headlines Pool (Sample)
const taskHeadlines = {
  'IT Security': [
    'Firewall Implementation',
    'Security Audit',
    'Phishing Attack Response',
  ],
  'HR Department': [
    'Employee Management Upgrade',
    'HR Database Access Issue',
    'Recruitment Tools Integration',
  ],
  'Infrastructure': [
    'Server Infrastructure Upgrade',
    'Network Switch Maintenance',
    'Backup Solutions Installation',
  ],
  'Legal Department': [
    'Software License Compliance',
    'GDPR Compliance Implementation',
    'Data Retention Policy Review',
  ],
  'Vendors': [
    'Software Patch Approval',
    'SLA Negotiation',
    'API Integration with Vendor',
  ],
  'Labs': [
    'LIMS Setup',
    'Diagnostic Equipment Connectivity',
    'Lab Data Analysis Tools Update',
  ],
  'Diagnostics': [
    'Diagnostic System Speed Enhancement',
    'EHR-Diagnostic Tools Integration Fix',
    'Diagnostic Software Updates',
  ],
};

// Game State
const gameState = {
  tasksCompleted: 0,
  totalRewards: 0,
  departmentRewards: {
    'IT Security': 0,
    'HR Department': 0,
  },
  activeTask: null,
  availableTasks: [],
  systemUptime: 100,
  stakeholderSatisfaction: 100,
  compliance: 100,
};

// Location Elements
const locations = {
  Infrastructure: document.getElementById('infrastructure'),
  'Legal Department': document.getElementById('legal'),
  Vendors: document.getElementById('vendors'),
  Labs: document.getElementById('labs'),
  Diagnostics: document.getElementById('diagnostics'),
};

// UI Elements
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  itSecurity: document.getElementById('it-security'),
  hrDepartment: document.getElementById('hr-department'),
  systemUptime: document.getElementById('system-uptime'),
  stakeholderSatisfaction: document.getElementById('stakeholder-satisfaction'),
  compliance: document.getElementById('compliance'),
};

const activeTaskDetails = document.getElementById('active-task-details');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription = document.getElementById('active-task-description');
const stepsList = document.getElementById('steps-list');
const tasksList = document.getElementById('tasks-list');
const popupContainer = document.getElementById('popup-container');

// Initialize Game
function initGame() {
  updateScoreboard();
  generateAvailableTasks(); // initial tasks
  renderAvailableTasks();
  setupEventListeners();
  startTaskGenerator();
  startTaskUrgencyEscalation();
  startSystemUptimeDecay();
}

// Update Scoreboard
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.itSecurity.textContent = gameState.departmentRewards['IT Security'];
  scoreboard.hrDepartment.textContent = gameState.departmentRewards['HR Department'];
  scoreboard.systemUptime.textContent = `${gameState.systemUptime.toFixed(1)}%`;
  scoreboard.stakeholderSatisfaction.textContent = `${gameState.stakeholderSatisfaction.toFixed(1)}%`;
  scoreboard.compliance.textContent = `${gameState.compliance.toFixed(1)}%`;
}

// Generate Random Tasks
function generateAvailableTasks() {
  if (gameState.availableTasks.length >= 10) return; // max 10 tasks
  const riskLevel = Math.floor(Math.random() * 3) + 1; // 1-3
  const reward = riskLevel * 100;
  const departmentNames = Object.keys(gameState.departmentRewards);
  const department = departmentNames[Math.floor(Math.random() * departmentNames.length)];
  const steps = getRandomTaskSteps();
  const urgency = getRandomUrgency();
  const headline = getRandomHeadline(department);
  const description = getRandomDescription(department);

  const task = {
    id: Date.now(),
    department,
    riskLevel,
    reward,
    steps,
    currentStep: 0,
    urgency,
    headline,
    description,
  };

  gameState.availableTasks.push(task);
}

// Task Steps
function getRandomTaskSteps() {
  const locationKeys = Object.keys(locations);
  const stepsCount = Math.floor(Math.random() * 3) + 2; // 2-4 steps
  const steps = [];

  while (steps.length < stepsCount) {
    const loc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
    if (!steps.includes(loc)) {
      steps.push(loc);
    }
  }
  return steps;
}

function getRandomUrgency() {
  const rand = Math.random();
  if (rand < 0.3) return 'high';
  if (rand < 0.7) return 'medium';
  return 'low';
}

function getRandomHeadline(department) {
  const list = taskHeadlines[department] || ['General Task', 'Routine Maintenance'];
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomDescription(department) {
  const list = taskDescriptions[department] || ['Complete assigned task efficiently.', 'Ensure all requirements are met.'];
  return list[Math.floor(Math.random() * list.length)];
}

// Render Available Tasks
function renderAvailableTasks() {
  tasksList.innerHTML = '';
  if (gameState.availableTasks.length === 0) {
    tasksList.innerHTML = '<li>No available tasks.</li>';
    return;
  }

  gameState.availableTasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add(task.urgency);
    li.innerHTML = `<strong>${task.headline}</strong><br>Reward: $${task.reward} - Risk: ${task.riskLevel}`;

    // Description
    const desc = document.createElement('p');
    desc.textContent = task.description;
    desc.classList.add('task-description');
    desc.style.display = 'none';

    // Commit Button
    const commitButton = document.createElement('button');
    commitButton.classList.add('commit-button');
    commitButton.textContent = 'Commit';
    commitButton.addEventListener('click', (e) => {
      e.stopPropagation();
      assignTask(task.id);
    });

    // Toggle description on click (excluding commit button)
    li.addEventListener('click', () => {
      // Hide other descriptions
      document.querySelectorAll('.task-description').forEach((el) => {
        if (el !== desc) {
          el.style.display = 'none';
        }
      });
      // Toggle this description
      desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
    });

    li.appendChild(desc);
    li.appendChild(commitButton);
    tasksList.appendChild(li);
  });
}

// Assign Task
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup('You already have an active task.', 'error');
    return;
  }

  const idx = gameState.availableTasks.findIndex((t) => t.id === taskId);
  if (idx === -1) return;

  const task = gameState.availableTasks.splice(idx, 1)[0];
  gameState.activeTask = task;
  activeTaskDetails.textContent = `Task (${task.department}) - Reward: $${task.reward}`;
  activeTaskHeadline.textContent = `${task.headline}`;
  activeTaskDescription.textContent = task.description;
  renderAvailableTasks();
  updateStepsList();

  showPopup(`Assigned Task: ${task.headline}`, 'success');
}

// Update Steps List
function updateStepsList() {
  stepsList.innerHTML = '';
  if (!gameState.activeTask) {
    stepsList.innerHTML = '<li>No active task.</li>';
    return;
  }
  gameState.activeTask.steps.forEach((step, idx) => {
    const li = document.createElement('li');
    li.textContent = `Step ${idx + 1}: Visit ${step}`;
    if (idx < gameState.activeTask.currentStep) {
      li.style.textDecoration = 'line-through';
      li.style.color = '#95a5a6';
    }
    stepsList.appendChild(li);
  });
}

// Setup Events
function setupEventListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions);
}

// Movement Handling
function handleMovement(e) {
  switch (e.key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      player.position.top = Math.max(player.position.top - player.moveSpeed, 0);
      break;
    case 'arrowdown':
    case 's':
      player.position.top = Math.min(player.position.top + player.moveSpeed, 100);
      break;
    case 'arrowleft':
    case 'a':
      player.position.left = Math.max(player.position.left - player.moveSpeed, 0);
      break;
    case 'arrowright':
    case 'd':
      player.position.left = Math.min(player.position.left + player.moveSpeed, 100);
      break;
    default:
      return;
  }
  updatePlayerPosition();
}

function updatePlayerPosition() {
  player.element.style.top = `${player.position.top}%`;
  player.element.style.left = `${player.position.left}%`;
}

// Collision Detection
function checkCollisions() {
  Object.entries(locations).forEach(([name, elem]) => {
    if (isColliding(player.element, elem)) {
      handleLocationVisit(name);
    }
  });
  requestAnimationFrame(checkCollisions);
}

function isColliding(playerEl, locationEl) {
  const pRect = playerEl.getBoundingClientRect();
  const lRect = locationEl.getBoundingClientRect();
  return !(
    pRect.top > lRect.bottom ||
    pRect.bottom < lRect.top ||
    pRect.left > lRect.right ||
    pRect.right < lRect.left
  );
}

// Location Visit
function handleLocationVisit(locationName) {
  if (player.isVisiting === locationName) return;
  player.isVisiting = locationName;

  const location = locations[locationName];
  location.classList.add('visited');
  setTimeout(() => location.classList.remove('visited'), 500);

  if (gameState.activeTask) {
    const currStep = gameState.activeTask.steps[gameState.activeTask.currentStep];
    if (locationName === currStep) {
      gameState.activeTask.currentStep++;
      showPopup(`Visited ${locationName}.`, 'success');
      if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
        completeTask();
      } else {
        activeTaskDetails.textContent = `Task (${gameState.activeTask.department}) - Reward: $${gameState.activeTask.reward}`;
        updateStepsList();
      }
    } else {
      showPopup('Wrong location! Task failed.', 'error');
      failTask();
    }
  }

  setTimeout(() => {
    player.isVisiting = null;
  }, 1000);
}

// Complete Task
function completeTask() {
  showPopup('Task Completed!', 'success');
  gameState.tasksCompleted++;
  gameState.totalRewards += gameState.activeTask.reward;
  gameState.departmentRewards[gameState.activeTask.department] += gameState.activeTask.reward;

  // Update scoreboard metrics
  gameState.systemUptime = Math.min(gameState.systemUptime + 1, 100);
  gameState.stakeholderSatisfaction = Math.min(gameState.stakeholderSatisfaction + 2, 100);
  gameState.compliance = Math.min(gameState.compliance + 1, 100);

  gameState.activeTask = null;
  activeTaskDetails.textContent = '';
  activeTaskHeadline.textContent = 'No active task.';
  activeTaskDescription.textContent = '';
  stepsList.innerHTML = '<li>No active task.</li>';
  updateScoreboard();
}

// Fail Task
function failTask() {
  gameState.activeTask = null;
  activeTaskDetails.textContent = '';
  activeTaskHeadline.textContent = 'No active task.';
  activeTaskDescription.textContent = '';
  stepsList.innerHTML = '<li>No active task.</li>';
  updateScoreboard();

  // Decrease metrics
  gameState.systemUptime = Math.max(gameState.systemUptime - 5, 0);
  gameState.stakeholderSatisfaction = Math.max(gameState.stakeholderSatisfaction - 10, 0);
  gameState.compliance = Math.max(gameState.compliance - 2, 0);
  showPopup('Task Failed!', 'error');
}

// Task Generator
function startTaskGenerator() {
  setInterval(() => {
    generateAvailableTasks();
    renderAvailableTasks();
    if (gameState.availableTasks.length > 0) {
      showPopup('New tasks available.', 'success');
    }
  }, 10000);
}

// Urgency Escalation
function startTaskUrgencyEscalation() {
  setInterval(() => {
    gameState.availableTasks.forEach((task) => {
      if (task.urgency === 'low') {
        task.urgency = 'medium';
      } else if (task.urgency === 'medium') {
        task.urgency = 'high';
      }
    });
    renderAvailableTasks();
  }, 20000);
}

// System Uptime Decay
function startSystemUptimeDecay() {
  setInterval(() => {
    gameState.systemUptime = Math.max(gameState.systemUptime - 0.1, 0);
    updateScoreboard();
    if (gameState.systemUptime <= 0) {
      showPopup('System Uptime Critical!', 'error');
    }
  }, 60000);
}

// Show Popup
function showPopup(message, type = 'success') {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  if (type === 'error') popup.classList.add('error');
  popup.textContent = message;
  popupContainer.appendChild(popup);

  setTimeout(() => popup.remove(), 3000);
}

// Start
initGame();
