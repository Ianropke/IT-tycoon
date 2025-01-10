/**********************************************
 * script.js (Example) with checkCollisions fix
 **********************************************/

// Basic Player & Game State
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 }, 
  moveSpeed: 2,
  isVisiting: null,
};

// Example Game State
let gameState = {
  tasksCompleted: 0,
  totalRewards: 0,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,
  activeTask: null,
  availableTasks: [],
  introModalOpen: true,
  shownFirstTaskPopup: false,
  shownFirstActivePopup: false,
};

// Location References
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
};

// Scoreboard References
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

// Bars for Security/Stability/Development
const securityBar = document.getElementById('security-bar');
const stabilityBar = document.getElementById('stability-bar');
const developmentBar = document.getElementById('development-bar');

// Active/Available Panel References
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription = document.getElementById('active-task-description');
const activeTaskDetails = document.getElementById('active-task-details');
const stepsList = document.getElementById('steps-list');
const tasksList = document.getElementById('tasks-list');

// Modal
const introModal = document.getElementById('intro-modal');
const introOkBtn = document.getElementById('intro-ok-btn');
introOkBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
  gameState.introModalOpen = false;
});

/******************************************************
 * 1) Define checkCollisions() BEFORE setupListeners()
 ******************************************************/
function checkCollisions() {
  // Loop through all known locations 
  for (const [locName, locElement] of Object.entries(locations)) {
    if (isColliding(player.element, locElement)) {
      handleLocationVisit(locName);
    }
  }
  requestAnimationFrame(checkCollisions); 
}

/******************************************************
 * 2) The function that sets up listeners 
 *    (calls checkCollisions in requestAnimationFrame)
 ******************************************************/
function setupListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions); 
}

/******************************************************
 * Additional helper functions (isColliding, etc.)
 ******************************************************/
function isColliding(aEl, bEl) {
  const aRect = aEl.getBoundingClientRect();
  const bRect = bEl.getBoundingClientRect();
  return !(
    aRect.top    > bRect.bottom ||
    aRect.bottom < bRect.top    ||
    aRect.left   > bRect.right  ||
    aRect.right  < bRect.left
  );
}

function handleLocationVisit(locName) {
  // Example: mark location visited, handle step logic, etc.
  if (player.isVisiting === locName) return;
  player.isVisiting = locName;

  const locEl = locations[locName];
  locEl.classList.add('visited');
  setTimeout(() => locEl.classList.remove('visited'), 500);

  // If there's an active task, check next step
  if (gameState.activeTask) {
    const idx = gameState.activeTask.currentStep;
    if (idx < gameState.activeTask.steps.length) {
      const needed = gameState.activeTask.steps[idx];
      if (locName === needed) {
        gameState.activeTask.currentStep++;
        showPopup(`Rigtigt trin: ${locName}`, 'info');
        if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
          completeTask();
        } else {
          updateStepsList();
        }
      }
    }
  }
  setTimeout(() => { player.isVisiting = null; }, 1000);
}

/******************************************************
 * Example scoreboard update
 ******************************************************/
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction + '%';
  updateBars();
}

// Horizontal bar fill
function updateBars() {
  const sec = Math.max(0, Math.min(gameState.security, 150));
  const stab = Math.max(0, Math.min(gameState.stability, 150));
  const dev = Math.max(0, Math.min(gameState.development, 150));

  const maxW = 80; 
  securityBar.style.width   = (sec  / 150) * maxW + 'px';
  stabilityBar.style.width  = (stab / 150) * maxW + 'px';
  developmentBar.style.width= (dev  / 150) * maxW + 'px';
}

/******************************************************
 * Example: Generating tasks, rendering tasks, steps 
 ******************************************************/
function generateTask() {
  // e.g. pick stability/development/security
  // push to gameState.availableTasks
}

function renderTasks() {
  // fill tasksList
}

function updateStepsList() {
  // fill stepsList for activeTask
}

function completeTask() {
  // e.g. show "completed" popup, increment tasksCompleted
  updateScoreboard();
}

function failTask() {
  // e.g. show "fail" popup, remove activeTask
  updateScoreboard();
}

/******************************************************
 * Movement 
 ******************************************************/
function handleMovement(e) {
  if (gameState.introModalOpen) return;
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
  }
  player.element.style.top  = player.position.top + '%';
  player.element.style.left = player.position.left + '%';
}

/******************************************************
 * Popup 
 ******************************************************/
function showPopup(message, type='success', duration=3000) {
  const el = document.createElement('div');
  el.classList.add('popup');
  if (type === 'error') el.classList.add('error');
  else if (type === 'info') el.classList.add('info');
  el.textContent = message;
  document.getElementById('popup-container').appendChild(el);
  setTimeout(() => el.remove(), duration);
}

/******************************************************
 * initGame
 ******************************************************/
function initGame() {
  updateScoreboard();
  // Possibly create some tasks
  // generateTask(); ...
  // set up intervals, etc.
  setupListeners();
}

initGame();
