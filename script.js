/*************************************************
 * IT Tycoon (Another Revised Edition)
 *************************************************/

// Spiller
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null,
};

// Overordnet spilstate
const gameState = {
  tasksCompleted: 0,
  totalRewards: 0,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,
  activeTask: null,
  availableTasks: [],
  introModalOpen: true,

  // first-time popups
  shownFirstTaskPopup: false,
  shownFirstActivePopup: false,
};

// Lokationer
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
};

// UI
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

// Intro modal
const introModal = document.getElementById('intro-modal');
const introOkBtn = document.getElementById('intro-ok-btn');
introOkBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
  gameState.introModalOpen = false;
});

function initGame() {
  updateScoreboard();
  // generate 2 tasks initially
  for (let i = 0; i < 2; i++) {
    generateTask();
  }
  renderTasks();
  setupListeners();
  startTaskGenerator();
  startUrgencyEscalation();
}

// (2) faster tasks so no downtime
function startTaskGenerator() {
  setInterval(() => {
    if (gameState.availableTasks.length < 10) {
      generateTask();
      renderTasks();
      if (!gameState.shownFirstTaskPopup) {
        showPopup("Nye opgaver er kommet! Klik for at se detaljer og 'Forpligt' for at tage en.", "info", 5000);
        gameState.shownFirstTaskPopup = true;
      }
    }
  }, 10000); // every 10s for faster flow
}

function generateTask() {
  if (gameState.availableTasks.length >= 10) return;

  // random type: stability, development or security
  const r = Math.random();
  let type;
  if (r < 0.33) type = 'stability';
  else if (r < 0.66) type = 'development';
  else type = 'security';

  const risk = Math.floor(Math.random() * 3) + 1;
  const reward = risk * 100;

  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    taskType: type,
    headline: type === 'stability'
      ? 'Stabilitetsopgave'
      : type === 'development'
        ? 'Udviklingsopgave'
        : 'Sikkerhedsopgave',
    description: type === 'stability'
      ? 'Fokuser på vedligehold og drift.'
      : type === 'development'
        ? 'Tilføj nye funktioner eller optimer systemet.'
        : 'Hæv sikkerhedsniveauet, håndter trusler.',
    steps: getRandomSteps(),
    currentStep: 0,
    urgency: getRandomUrgency(),
    riskLevel: risk,
    reward: reward,
  };

  gameState.availableTasks.push(newTask);
}

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
  if (r < 0.7) return 'medium';
  return 'low';
}

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
      <strong>${t.headline}</strong><br/>
      Belønning: ${t.reward} kr - Risiko: ${t.riskLevel}
    `;
    const desc = document.createElement('p');
    desc.classList.add('task-description');
    desc.textContent = t.description;
    desc.style.display = 'none';
    
    const btn = document.createElement('button');
    btn.classList.add('commit-button');
    btn.textContent = 'Forpligt';
    btn.addEventListener('click', e => {
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

function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup("Du har allerede en aktiv opgave!", "error");
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

  // (4) if we are already standing on the correct location => count it as visited
  checkImmediateStep();

  if (!gameState.shownFirstActivePopup) {
    showPopup("Du har nu en aktiv opgave. Følg trin-listen for at fuldføre den!", "info", 5000);
    gameState.shownFirstActivePopup = true;
  }
}

function checkImmediateStep() {
  // if the player is already on the correct location for the first step, 
  // treat it as visited
  if (!gameState.activeTask) return;
  const stepIndex = gameState.activeTask.currentStep;
  if (stepIndex >= gameState.activeTask.steps.length) return;
  const neededLoc = gameState.activeTask.steps[stepIndex];
  // let's see if the player is physically colliding
  const locEl = locations[neededLoc];
  if (locEl && isColliding(player.element, locEl)) {
    // it's correct
    gameState.activeTask.currentStep++;
    showPopup(`Du var allerede på ${neededLoc}. Trin fuldført!`, "info");
    if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
      completeTask();
    } else {
      updateStepsList();
    }
  }
}

function updateStepsList() {
  stepsList.innerHTML = '';
  if (!gameState.activeTask) {
    stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
    return;
  }
  gameState.activeTask.steps.forEach((locName, i) => {
    const li = document.createElement('li');
    li.textContent = `Trin ${i+1}: Gå til ${locName}`;
    if (i < gameState.activeTask.currentStep) {
      li.style.textDecoration = 'line-through';
      li.style.color = '#95a5a6';
    }
    stepsList.appendChild(li);
  });
}

function setupListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions);
}

function handleMovement(e) {
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

function checkCollisions() {
  Object.entries(locations).forEach(([locName, locEl]) => {
    if (isColliding(player.element, locEl)) {
      handleLocVisit(locName);
    }
  });
  requestAnimationFrame(checkCollisions);
}

// fix so standing on correct location won't immediate fail if it's the right step
function handleLocVisit(locName) {
  if (player.isVisiting === locName) return;
  player.isVisiting = locName;

  const el = locations[locName];
  el.classList.add('visited');
  setTimeout(() => el.classList.remove('visited'), 500);

  if (gameState.activeTask) {
    const stepIndex = gameState.activeTask.currentStep;
    if (stepIndex < gameState.activeTask.steps.length) {
      const needed = gameState.activeTask.steps[stepIndex];
      if (locName === needed) {
        gameState.activeTask.currentStep++;
        showPopup(`Rigtigt trin: ${locName}`, "info");
        if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
          completeTask();
        } else {
          updateStepsList();
        }
      } else {
        // skip the fail if it's the same loc as a previous step
        // we check if it's truly a different loc from the last correct step
        const lastCorrect = (stepIndex > 0) 
          ? gameState.activeTask.steps[stepIndex - 1] 
          : null;
        if (locName !== lastCorrect) {
          showPopup("Forkert lokation! Opgaven mislykkedes.", "error");
          failTask();
        }
      }
    }
  }
  setTimeout(() => {
    player.isVisiting = null;
  }, 1000);
}

// Fuldført opgave
function completeTask() {
  showPopup("Opgave fuldført!", "success");
  gameState.tasksCompleted++;
  gameState.totalRewards += gameState.activeTask.reward;

  // apply effect based on type
  applyEffects(gameState.activeTask);

  gameState.activeTask = null;
  activeTaskDetails.textContent = '';
  activeTaskHeadline.textContent = 'Ingen aktiv opgave';
  activeTaskDescription.textContent = '';
  stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
  updateScoreboard();
}

// Fejlet opgave
function failTask() {
  showPopup("Opgave fejlede! Ingen belønning.", "error");
  if (gameState.activeTask) {
    // small penalty
    gameState.security = Math.max(gameState.security - 2, 0);
    gameState.stability = Math.max(gameState.stability - 2, 0);
    gameState.hospitalSatisfaction = Math.max(gameState.hospitalSatisfaction - 5, 0);
    // remove active
  }
  gameState.activeTask = null;
  activeTaskDetails.textContent = "";
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDescription.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function applyEffects(task) {
  switch(task.taskType) {
    case 'stability':
      gameState.stability = Math.min(gameState.stability + 5, 150);
      // dev might stagnate
      gameState.development = Math.max(gameState.development - 2, 0);
      // security not impacted
      break;
    case 'development':
      gameState.development = Math.min(gameState.development + 5, 150);
      // might reduce stability
      gameState.stability = Math.max(gameState.stability - 2, 0);
      break;
    case 'security':
      gameState.security = Math.min(gameState.security + 5, 150);
      // might reduce dev/stability slightly
      gameState.stability = Math.max(gameState.stability - 1, 0);
      gameState.development = Math.max(gameState.development - 1, 0);
      break;
  }
  // if any category < 50 => hospital satisfaction -5
  if (gameState.security < 50 || gameState.stability < 50 || gameState.development < 50) {
    gameState.hospitalSatisfaction = Math.max(gameState.hospitalSatisfaction - 5, 0);
  } else {
    // if all are fairly high => hospital is happier
    gameState.hospitalSatisfaction = Math.min(gameState.hospitalSatisfaction + 3, 100);
  }
}

// scoreboard
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.security.textContent = gameState.security;
  scoreboard.stability.textContent = gameState.stability;
  scoreboard.development.textContent = gameState.development;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction + "%";
}

function showPopup(message, type = "success", duration = 3000) {
  const popupEl = document.createElement("div");
  popupEl.classList.add("popup");
  if (type === "error") popupEl.classList.add("error");
  else if (type === "info") popupEl.classList.add("info");
  popupEl.textContent = message;
  document.getElementById("popup-container").appendChild(popupEl);

  setTimeout(() => {
    popupEl.remove();
  }, duration);
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

function startUrgencyEscalation() {
  setInterval(() => {
    gameState.availableTasks.forEach(t => {
      if (t.urgency === 'low') t.urgency = 'medium';
      else if (t.urgency === 'medium') t.urgency = 'high';
    });
    renderTasks();
  }, 30000); // 30s
}

initGame();
