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
};

// Locations
const locations = {
  Dispatch: document.getElementById('dispatch'),
  Infrastructure: document.getElementById('infrastructure'),
  'Legal Department': document.getElementById('legal'),
  Vendors: document.getElementById('vendors'),
};

// UI Elements
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  itSecurity: document.getElementById('it-security'),
  hrDepartment: document.getElementById('hr-department'),
};

const activeTaskDetails = document.getElementById('active-task-details');
const tasksList = document.getElementById('tasks-list');

// Initialize Game
function initGame() {
  updateScoreboard();
  generateAvailableTasks();
  renderAvailableTasks();
  setupEventListeners();
}

// Update Scoreboard UI
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.itSecurity.textContent = gameState.departmentRewards['IT Security'];
  scoreboard.hrDepartment.textContent = gameState.departmentRewards['HR Department'];
}

// Generate Random Tasks
function generateAvailableTasks() {
  // Example: Generate 3 random tasks
  for (let i = 0; i < 3; i++) {
    const riskLevel = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const reward = riskLevel * 100; // Example reward calculation
    const departments = Object.keys(gameState.departmentRewards);
    const department = departments[Math.floor(Math.random() * departments.length)];
    const steps = getRandomTaskSteps();

    const task = {
      id: Date.now() + i,
      department,
      riskLevel,
      reward,
      steps,
      currentStep: 0,
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
    li.addEventListener('click', () => assignTask(task.id));
    tasksList.appendChild(li);
  });
}

// Assign Task to Active Task
function assignTask(taskId) {
  if (gameState.activeTask) {
    alert('You already have an active task.');
    return;
  }

  const taskIndex = gameState.availableTasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return;

  gameState.activeTask = gameState.availableTasks.splice(taskIndex, 1)[0];
  activeTaskDetails.textContent = formatActiveTask(gameState.activeTask);
  renderAvailableTasks();
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
      player.position.top = Math.max(player.position.top - player.moveSpeed, 0);
      break;
    case 'ArrowDown':
      player.position.top = Math.min(player.position.top + player.moveSpeed, 100);
      break;
    case 'ArrowLeft':
      player.position.left = Math.max(player.position.left - player.moveSpeed, 0);
      break;
    case 'ArrowRight':
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
      if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
        completeTask();
      } else {
        activeTaskDetails.textContent = formatActiveTask(gameState.activeTask);
      }
    } else {
      alert('Wrong location! Task failed.');
      gameState.activeTask = null;
      activeTaskDetails.textContent = 'No active task.';
    }
  }
}

// Complete the Active Task
function completeTask() {
  alert('Task Completed!');
  gameState.tasksCompleted += 1;
  gameState.totalRewards += gameState.activeTask.reward;
  gameState.departmentRewards[gameState.activeTask.department] += gameState.activeTask.reward;
  gameState.activeTask = null;
  activeTaskDetails.textContent = 'No active task.';
  updateScoreboard();
}

// Start the Game
initGame();
