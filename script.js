/******************************************
 * IT Tycoon (Re‑Revised)
 ******************************************/

// Spiller
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null, // track collisions
};

// Overordnet spilstate
const gameState = {
  tasksCompleted: 0,
  totalRewards: 0,
  // Kattegorier: Sikkerhed, Stabilitet, Udvikling
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100, // 3: only one stakeholder -> hospital

  activeTask: null,
  availableTasks: [],
  // first-time popups
  shownFirstTaskPopup: false,
  shownFirstActivePopup: false,
  // modal
  introModalOpen: true,
};

// Lokationer
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
};

// UI references
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  security: document.getElementById('security'),
  stability: document.getElementById('stability'),
  development: document.getElementById('development'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

const activeTaskDetails = document.getElementById('active-task-details');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription = document.getElementById('active-task-description');
const stepsList = document.getElementById('steps-list');
const tasksList = document.getElementById('tasks-list');

// Modal references
const introModal = document.getElementById('intro-modal');
const introOkBtn = document.getElementById('intro-ok-btn');

// Luk modal på "OK" (2)
introOkBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
  gameState.introModalOpen = false;
});

// Start spil
function initGame() {
  updateScoreboard();
  // generate a few tasks
  for (let i = 0; i < 2; i++) {
    generateTask();
  }
  renderTasks();
  setupListeners();
}

// (6) Limit tasks to max 10
function generateTask() {
  if (gameState.availableTasks.length >= 10) return;

  // random type: "stability" vs. "development" vs. "security"
  const r = Math.random();
  let type;
  if (r < 0.33) type = 'stability';
  else if (r < 0.66) type = 'development';
  else type = 'security';

  const riskLevel = Math.floor(Math.random() * 3) + 1;
  const reward = riskLevel * 100;

  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 100),
    taskType: type,
    headline: type === 'stability' 
      ? 'Stabilitetsopgave' 
      : (type === 'development' ? 'Udviklingsopgave' : 'Sikkerhedsopgave'),
    description: type === 'stability'
      ? 'Vedligehold systemet for at forblive stabilt.'
      : (type === 'development' 
        ? 'Tilføj nye funktioner og forbedr systemet.' 
        : 'Øg sikkerhedsniveauet og håndtér trusler.'),
    steps: getRandomSteps(),
    currentStep: 0,
    urgency: getRandomUrgency(),
    riskLevel,
    reward,
  };

  gameState.availableTasks.push(newTask);
}

// pseudo random steps from the 5 locations
function getRandomSteps() {
  const locKeys = Object.keys(locations);
  const stepCount = Math.floor(Math.random() * 3) + 2;
  const steps = [];
  while (steps.length < stepCount) {
    const c = locKeys[Math.floor(Math.random() * locKeys.length)];
    if (!steps.includes(c)) steps.push(c);
  }
  return steps;
}

function getRandomUrgency() {
  const r = Math.random();
  if (r < 0.3) return 'high';
  else if (r < 0.7) return 'medium';
  else return 'low';
}

// Render tasks
function renderTasks() {
  tasksList.innerHTML = '';
  if (!gameState.availableTasks.length) {
    tasksList.innerHTML = '<li>Ingen opgaver tilgængelige</li>';
    return;
  }
  gameState.availableTasks.forEach(t => {
    const li = document.createElement('li');
    li.classList.add(t.urgency);
    li.innerHTML = `
      <strong>${t.headline}</strong><br />
      Belønning: ${t.reward} kr - Risiko: ${t.riskLevel}
    `;
    const desc = document.createElement('p');
    desc.classList.add('task-description');
    desc.textContent = t.description;
    desc.style.display = 'none';

    const btn = document.createElement('button');
    btn.textContent = 'Forpligt';
    btn.classList.add('commit-button');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener('click', () => {
      document.querySelectorAll('.task-description').forEach(d => {
        if (d !== desc) d.style.display = 'none';
      });
      desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
    });
    li.appendChild(desc);
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
}

// Tildel opgave
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup('Du har allerede en aktiv opgave!', 'error');
    return;
  }
  const idx = gameState.availableTasks.findIndex(x => x.id === taskId);
  if (idx === -1) return;

  gameState.activeTask = gameState.availableTasks.splice(idx, 1)[0];
  activeTaskDetails.textContent = `Belønning: ${gameState.activeTask.reward} kr - Risiko: ${gameState.activeTask.riskLevel}`;
  activeTaskHeadline.textContent = gameState.activeTask.headline;
  activeTaskDescription.textContent = gameState.activeTask.description;
  updateStepsList();
  renderTasks();

  // (5) first time we have an active task
  if (!gameState.shownFirstActivePopup) {
    showPopup('Nu har du en aktiv opgave! Følg trin-listen for at fuldføre den.', 'info', 5000);
    gameState.shownFirstActivePopup = true;
  }
}

// Trin-liste
function updateStepsList() {
  stepsList.innerHTML = '';
  if (!gameState.activeTask) {
    stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
    return;
  }
  gameState.activeTask.steps.forEach((locName, i) => {
    const li = document.createElement('li');
    li.textContent = `Trin ${i + 1}: Gå til ${locName}`;
    if (i < gameState.activeTask.currentStep) {
      li.style.textDecoration = 'line-through';
      li.style.color = '#95a5a6';
    }
    stepsList.appendChild(li);
  });
}

// Lyt efter bevægelse og kollision
function setupListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions);

  // (4) pop up first time tasks appear (when we generate new tasks)
  // We'll do it in startTaskGenerator when tasks are generated
}

// Bevægelse
function handleMovement(e) {
  // if intro modal open, ignore movement
  if (gameState.introModalOpen) return;

  switch(e.key.toLowerCase()) {
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
  updatePlayerPosition();
}

function updatePlayerPosition() {
  player.element.style.top = `${player.position.top}%`;
  player.element.style.left = `${player.position.left}%`;
}

// Kollision
function checkCollisions() {
  Object.entries(locations).forEach(([name, el]) => {
    if (isColliding(player.element, el)) {
      handleLocationVisit(name);
    }
  });
  requestAnimationFrame(checkCollisions);
}

function isColliding(pEl, lEl) {
  const pRect = pEl.getBoundingClientRect();
  const lRect = lEl.getBoundingClientRect();
  return !(
    pRect.top > lRect.bottom ||
    pRect.bottom < lRect.top ||
    pRect.left > lRect.right ||
    pRect.right < lRect.left
  );
}

// (1) Problem: if user stands in correct loc, remains or returns => "wrong step"?
// We'll only handle step progression if we haven't advanced the step for that location yet.
function handleLocationVisit(locName) {
  if (player.isVisiting === locName) return;
  player.isVisiting = locName;

  const locEl = locations[locName];
  locEl.classList.add('visited');
  setTimeout(() => locEl.classList.remove('visited'), 500);

  if (gameState.activeTask) {
    // needed location for current step
    const neededLoc = gameState.activeTask.steps[gameState.activeTask.currentStep];
    if (locName === neededLoc) {
      gameState.activeTask.currentStep++;
      showPopup(`Rigtigt trin: ${locName}`, 'info');
      // next step or complete
      if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
        completeTask();
      } else {
        updateStepsList();
      }
    } 
    else {
      // If user tries same location again (and it’s not the needed step),
      // we just ignore. We won't fail automatically unless it's truly a different location.
      // => If locName != neededLoc and also not "the same as the last correct location"
      const lastCorrectLoc = 
        gameState.activeTask.currentStep > 0 
          ? gameState.activeTask.steps[gameState.activeTask.currentStep - 1] 
          : null;
      if (locName !== lastCorrectLoc) {
        // Then it’s truly the wrong step
        showPopup('Forkert lokation! Opgaven mislykkedes.', 'error');
        failTask();
      }
    }
  }

  setTimeout(() => {
    player.isVisiting = null;
  }, 1000);
}

// Fuldfør
function completeTask() {
  showPopup('Opgave fuldført!', 'success');
  gameState.tasksCompleted++;
  // For simplicity, risk => chance of losing security
  // reward => we add to totalRewards
  const t = gameState.activeTask;
  gameState.totalRewards += t.reward;
  // apply effect based on type
  applyTaskEffect(t);

  gameState.activeTask = null;
  activeTaskDetails.textContent = '';
  activeTaskHeadline.textContent = 'Ingen aktiv opgave';
  activeTaskDescription.textContent = '';
  stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
  updateScoreboard();
}

function failTask() {
  // losing some security/stability/hospital satisfaction?
  showPopup('Opgave fejlede! Ingen belønning.', 'error');
  if (gameState.activeTask) {
    // small negative effect
    gameState.security = Math.max(gameState.security - 2, 0);
    gameState.stability = Math.max(gameState.stability - 2, 0);
    gameState.hospitalSatisfaction = Math.max(gameState.hospitalSatisfaction - 3, 0);
  }
  gameState.activeTask = null;
  activeTaskDetails.textContent = '';
  activeTaskHeadline.textContent = 'Ingen aktiv opgave';
  activeTaskDescription.textContent = '';
  stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
  updateScoreboard();
}

// (7) simpler logic for balancing. We only have 3 stats: security, stability, development
// + hospitalSatisfaction
function applyTaskEffect(task) {
  // e.g. if "stability" => stability + ...
  if (task.taskType === 'stability') {
    gameState.stability = Math.min(gameState.stability + 5, 150);
    // but dev might stagnate => -2
    gameState.development = Math.max(gameState.development - 2, 0);
  }
  else if (task.taskType === 'development') {
    gameState.development = Math.min(gameState.development + 5, 150);
    // system might get less stable => -2
    gameState.stability = Math.max(gameState.stability - 2, 0);
  }
  else {
    // security tasks
    gameState.security = Math.min(gameState.security + 5, 150);
    // a small negative effect on stability or dev => your choice
    gameState.stability = Math.max(gameState.stability - 1, 0);
    gameState.development = Math.max(gameState.development - 1, 0);
  }

  // If any stat is too low => hospital satisfaction goes down
  if (gameState.security < 50 || gameState.stability < 50 || gameState.development < 50) {
    gameState.hospitalSatisfaction = Math.max(gameState.hospitalSatisfaction - 5, 0);
  } else {
    // if everything is balanced => hospital is happier
    gameState.hospitalSatisfaction = Math.min(gameState.hospitalSatisfaction + 2, 100);
  }
}

// opdater scoreboard
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.security.textContent = gameState.security;
  scoreboard.stability.textContent = gameState.stability;
  scoreboard.development.textContent = gameState.development;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction + '%';
}

// Simple intervals
function startTaskGenerator() {
  setInterval(() => {
    if (gameState.availableTasks.length < 10) {
      generateTask();
      renderTasks();
      if (!gameState.shownFirstTaskPopup) {
        showPopup('Nye opgaver er kommet! Klik for at se detaljer og "Forpligt" for at tage en.', 'info', 6000);
        gameState.shownFirstTaskPopup = true;
      }
    }
  }, 30000); // slowed to 30s
}

function startUrgencyEscalation() {
  setInterval(() => {
    gameState.availableTasks.forEach(t => {
      if (t.urgency === 'low') t.urgency = 'medium';
      else if (t.urgency === 'medium') t.urgency = 'high';
    });
    renderTasks();
  }, 60000); // 1 min
}

function startSystemUptimeDecay() {
  // optional if you want to degrade e.g. security/stability over time
  // or skip if not needed
}

// Show popup with or w/o fade
function showPopup(message, type = 'success', duration = 3000) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  if (type === 'error') popup.classList.add('error');
  else if (type === 'info') popup.classList.add('info');
  popup.textContent = message;
  document.getElementById('popup-container').appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, duration);
}

initGame();
