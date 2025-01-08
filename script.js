// JavaScript for IT Tycoon Game Logic

// Player Object
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 }, // Percentage
  moveSpeed: 2, // Percentage per key press
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

// Locations
const locations = {
  Dispatch: document.getElementById('dispatch'),
  Infrastructure: document.getElementById('infrastructure'),
  'Legal Department': document.getElementById('legal'),
  Vendors: document.getElementById('vendors'),
  Labs: document.getElementById('labs'), // Expanded Location
  Diagnostics: document.getElementById('diagnostics'), // Expanded Location
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
const tasksList = document.getElementById('tasks-list');
const popupContainer = document.getElementById('popup-container');

// Initialize Game
function initGame() {
  updateScoreboard();
  generateAvailableTasks();
  renderAvailableTasks();
  setupEventListeners();
  startTaskUrgencyEscalation();
  startSystemUptimeDecay();
}

// Update Scoreboard UI
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.itSecurity.textContent = gameState.departmentRewards['IT Security'];
  scoreboard.hrDepartment.textContent = gameState.departmentRewards['HR Department'];
  scoreboard.systemUptime.textContent = `${gameState.systemUptime}%`;
  scoreboard.stakeholderSatisfaction.textContent = `${gameState.stakeholderSatisfaction}%`;
  scoreboard.compliance.textContent = `${gameState.compliance}%`;
}

// Generate Random Tasks with Urgency
function generateAvailableTasks() {
  // Example: Generate 3 random tasks
  for (let i = 0; i < 3; i++) {
    const riskLevel = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const reward = riskLevel * 100; // Example reward calculation
    const departments = Object.keys(gameState.departmentRewards);
    const department = departments[Math.floor(Math.random() * departments.length)];
    const steps = getRandomTaskSteps();
    const urgency = getRandomUrgency(); // Assign initial urgency

    const task = {
      id: Date.now() + i,
      department,
      riskLevel,
      reward,
      steps,
      currentStep: 0,
      urgency, // Added urgency
    };

    gameState.availableTasks.push(task);
  }
}

// Get Random Task Steps (Sequence of Locations)
function getRandomTaskSteps() {
  const locationKeys = Object.keys(locations).filter(loc => loc !== 'Dispatch');
  const stepsCount = Math.floor(Math.random() * 3) + 2; // 2 to 4 steps
  const steps = [];

  while (steps.length < stepsCount) {
    const loc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
    if (!steps.includes(loc)) {
      steps.push(loc);
    }
  }

  return steps;
}

// Get Random Urgency Level
function getRandomUrgency() {
  const rand = Math.random();
  if (rand < 0.3) return 'high';
  if (rand < 0.7) return 'medium';
  return 'low';
}

// Render Available Tasks in UI
function renderAvailableTasks() {
  tasksList.innerHTML = '';
  if (gameState.availableTasks.length === 0) {
    tasksList.innerHTML = '<li>No available tasks.</li>';
    return;
  }

  gameState.availableTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `Task ${task.id}: ${task.department} - Reward: $${task.reward} - Risk: ${task.riskLevel}`;
    li.classList.add(task.urgency); // Add urgency class for color-coding
    li.addEventListener('click', () => assignTask(task.id));
    tasksList.appendChild(li);
  });
}

// Assign Task to Active Task
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup('You already have an active task.', 'error');
    return;
  }

  const taskIndex = gameState.availableTasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return;

  gameState.activeTask = gameState.availableTasks.splice(taskIndex, 1)[0];
  activeTaskDetails.textContent = formatActiveTask(gameState.activeTask);
  renderAvailableTasks();
  showPopup(`Assigned Task ${gameState.activeTask.id}`, 'success');
}

// Format Active Task Details
function formatActiveTask(task) {
  return `Task ${task.id} (${task.department}) - Reward: $${task.reward}\nSteps: ${task.steps.join(' -> ')}`;
}

// Setup Keyboard and Location Event Listeners
function setupEventListeners() {
  document.addEventListener('keydown', handleMovement);

  Object.values(locations).forEach(location => {
    location.addEventListener('click', () => handleLocationVisit(location.dataset.name));
  });
}

// Handle Player Movement via Arrow Keys
function handleMovement(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      player.position.top = Math.max(player.position.top - player.moveSpeed, 0);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      player.position.top = Math.min(player.position.top + player.moveSpeed, 100);
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      player.position.left = Math.max(player.position.left - player.moveSpeed, 0);
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      player.position.left = Math.min(player.position.left + player.moveSpeed, 100);
      break;
    default:
      return;
  }
  updatePlayerPosition();
  checkDispatchStanding();
}

// Update Player's Position in the UI
function updatePlayerPosition() {
  player.element.style.top = `${player.position.top}%`;
  player.element.style.left = `${player.position.left}%`;
}

// Check if Player is Standing on Dispatch to Assign Tasks
let dispatchTimer = null;
function checkDispatchStanding() {
  const dispatch = locations['Dispatch'];
  const playerRect = player.element.getBoundingClientRect();
  const dispatchRect = dispatch.getBoundingClientRect();

  if (
    playerRect.left < dispatchRect.right &&
    playerRect.right > dispatchRect.left &&
    playerRect.top < dispatchRect.bottom &&
    playerRect.bottom > dispatchRect.top
  ) {
    if (!dispatchTimer) {
      dispatchTimer = setTimeout(() => {
        generateAvailableTasks();
        renderAvailableTasks();
        showPopup('New tasks available at Dispatch.', 'success');
        dispatchTimer = null;
      }, 3000); // 3 seconds
    }
  } else {
    if (dispatchTimer) {
      clearTimeout(dispatchTimer);
      dispatchTimer = null;
    }
  }
}

// Handle Visiting a Location
function handleLocationVisit(locationName) {
  // Visual Feedback
  const location = locations[locationName];
  location.classList.add('visited');
  setTimeout(() => location.classList.remove('visited'), 500);

  // If there's an active task, check the next step
  if (gameState.activeTask) {
    const currentStep = gameState.activeTask.steps[gameState.activeTask.currentStep];
    if (locationName === currentStep) {
      gameState.activeTask.currentStep += 1;
      showPopup(`Visited ${locationName}.`, 'success');
      if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
        completeTask();
      } else {
        activeTaskDetails.textContent = formatActiveTask(gameState.activeTask);
      }
    } else {
      showPopup('Wrong location! Task failed.', 'error');
      failTask();
    }
  }
}

// Complete the Active Task
function completeTask() {
  showPopup('Task Completed!', 'success');
  gameState.tasksCompleted += 1;
  gameState.totalRewards += gameState.activeTask.reward;
  gameState.departmentRewards[gameState.activeTask.department] += gameState.activeTask.reward;

  // Update new metrics
  gameState.systemUptime = Math.min(gameState.systemUptime + 1, 100); // Increment uptime
  gameState.stakeholderSatisfaction = Math.min(gameState.stakeholderSatisfaction + 2, 100); // Increment satisfaction
  gameState.compliance = Math.min(gameState.compliance + 1, 100); // Increment compliance

  gameState.activeTask = null;
  activeTaskDetails.textContent = 'No active task.';
  updateScoreboard();
}

// Fail the Active Task
function failTask() {
  gameState.activeTask = null;
  activeTaskDetails.textContent = 'No active task.';
  updateScoreboard();

  // Decrease metrics due to failure
  gameState.systemUptime = Math.max(gameState.systemUptime - 5, 0);
  gameState.stakeholderSatisfaction = Math.max(gameState.stakeholderSatisfaction - 10, 0);
  gameState.compliance = Math.max(gameState.compliance - 2, 0);
  updateScoreboard();
}

// Start Periodic Task Urgency Escalation
function startTaskUrgencyEscalation() {
  setInterval(() => {
    gameState.availableTasks.forEach(task => {
      if (task.urgency === 'low') {
        task.urgency = 'medium';
      } else if (task.urgency === 'medium') {
        task.urgency = 'high';
      }
      // High urgency remains high
    });
    renderAvailableTasks();
  }, 10000); // Every 10 seconds
}

// Start System Uptime Decay Over Time
function startSystemUptimeDecay() {
  setInterval(() => {
    gameState.systemUptime = Math.max(gameState.systemUptime - 0.1, 0);
    updateScoreboard();
    if (gameState.systemUptime <= 0) {
      showPopup('System Uptime Critical!', 'error');
    }
  }, 60000); // Every 60 seconds
}

// Function to show popup notifications
function showPopup(message, type = 'success') {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  if (type === 'error') {
    popup.classList.add('error');
  }
  popup.textContent = message;
  popupContainer.appendChild(popup);

  // Remove popup after animation
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Start the Game
initGame();
