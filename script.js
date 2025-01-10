// JavaScript for IT Tycoon in Danish

// Spiller-objekt
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 }, // Procentbaseret position
  moveSpeed: 2, 
  isVisiting: null,
};

// Opgavebeskrivelser (forenklet / eksempel)
const taskDescriptions = {
  Hospital: [
    'Håndter patientdata sikkert.',
    'Opdatér systemer til hospitalsudstyr.',
    'Tjek lager for medicinsk udstyr.'
  ],
  Infrastruktur: [
    'Opgradér serverinfrastruktur.',
    'Udfør rutinetjek af netværk.',
    'Installer nye sikkerhedskopier.'
  ],
  Cybersikkerhed: [
    'Implementér firewall-opdateringer.',
    'Foretag sikkerhedsgennemgang.',
    'Håndter phishing-hændelse.'
  ],
};

// Opgave-overskrifter (forenklet / eksempel)
const taskHeadlines = {
  Hospital: [
    'Patientdatabeskyttelse',
    'Udstyrsopdatering',
    'Medicinsk Beholdningstjek',
  ],
  Infrastruktur: [
    'Serveropgradering',
    'Netværkstjek',
    'Backup-installation',
  ],
  Cybersikkerhed: [
    'Firewall Implementation',
    'Sikkerhedsgennemgang',
    'Phishing Reaktion',
  ],
};

// Ny og forenklet scoringsmodel
// "Point" = Samlet belønning. "Fuldførte opgaver" = total tasks completed.

const gameState = {
  tasksCompleted: 0,
  totalRewards: 0, 
  departmentRewards: {
    'IT-sikkerhed': 0,
    'HR-afdeling': 0,
  },
  activeTask: null,
  availableTasks: [],
  systemUptime: 99.9,
  stakeholderSatisfaction: 100.0,
  compliance: 100.0,
};

// Lokationer (ny navngivning)
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
};

// UI-elementer
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

// Initialiser spillet
function initGame() {
  updateScoreboard();
  generateStartingTasks();
  renderAvailableTasks();
  setupEventListeners();
  startTaskGeneration();
  startTaskUrgencyEscalation();
  startSystemUptimeDecay();
}

// Opdater scoreboard
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  // Evt. kan IT-sikkerhed og HR-afdeling udelades hvis du ikke bruger dem i den nye model
  scoreboard.itSecurity.textContent = gameState.departmentRewards['IT-sikkerhed'];
  scoreboard.hrDepartment.textContent = gameState.departmentRewards['HR-afdeling'];
  scoreboard.systemUptime.textContent = `${gameState.systemUptime.toFixed(1)}%`;
  scoreboard.stakeholderSatisfaction.textContent = `${gameState.stakeholderSatisfaction.toFixed(1)}%`;
  scoreboard.compliance.textContent = `${gameState.compliance.toFixed(1)}%`;
}

// Generér startopgaver
function generateStartingTasks() {
  for (let i = 0; i < 3; i++) {
    generateTask();
  }
}

// Generér én opgave
function generateTask() {
  // Nogle mulige opgavegivere: Hospital, Infrastruktur, Cybersikkerhed
  const givers = ['Hospital', 'Infrastruktur', 'Cybersikkerhed'];
  const giver = givers[Math.floor(Math.random() * givers.length)];

  const riskLevel = Math.floor(Math.random() * 3) + 1; 
  const reward = riskLevel * 100; 
  const steps = getRandomStepsFromGiver(giver);
  const urgency = getRandomUrgency();
  const headline = getRandomHeadline(giver);
  const description = getRandomDescription(giver);

  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    giver, 
    riskLevel,
    reward,
    steps,
    currentStep: 0,
    urgency,
    headline,
    description
  };

  gameState.availableTasks.push(newTask);
}

// Hjælpefunktioner for opgave-generation
function getRandomStepsFromGiver(giver) {
  // Fx hver giver har en standard-lokation
  const locationKeys = Object.keys(locations);
  const stepsCount = Math.floor(Math.random() * 3) + 2;
  const steps = [];
  while (steps.length < stepsCount) {
    const loc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
    if (!steps.includes(loc)) steps.push(loc);
  }
  return steps;
}

function getRandomUrgency() {
  const rand = Math.random();
  if (rand < 0.3) return 'high';
  if (rand < 0.7) return 'medium';
  return 'low';
}

function getRandomHeadline(giver) {
  const list = taskHeadlines[giver] || ['Generel Opgave'];
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomDescription(giver) {
  const list = taskDescriptions[giver] || ['Udfør den nødvendige opgave.'];
  return list[Math.floor(Math.random() * list.length)];
}

// Render liste over ledige opgaver
function renderAvailableTasks() {
  tasksList.innerHTML = '';
  if (!gameState.availableTasks.length) {
    tasksList.innerHTML = '<li>Ingen opgaver tilgængelige</li>';
    return;
  }

  gameState.availableTasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add(task.urgency);
    li.innerHTML = `
      <strong>${task.headline}</strong><br />
      Belønning: ${task.reward} kr - Risiko: ${task.riskLevel}
    `;

    // Beskrivelse
    const desc = document.createElement('p');
    desc.textContent = task.description;
    desc.classList.add('task-description');
    desc.style.display = 'none';

    // Commit-knap
    const commitButton = document.createElement('button');
    commitButton.textContent = 'Forpligt';
    commitButton.classList.add('commit-button');
    commitButton.addEventListener('click', (e) => {
      e.stopPropagation();
      assignTask(task.id);
    });

    // Klik for at vise/skjule beskrivelse
    li.addEventListener('click', () => {
      document.querySelectorAll('.task-description').forEach(el => {
        if (el !== desc) el.style.display = 'none';
      });
      desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
    });

    li.appendChild(desc);
    li.appendChild(commitButton);
    tasksList.appendChild(li);
  });
}

// Tildel opgave til aktiv
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup('Der er allerede en aktiv opgave!', 'error');
    return;
  }

  const idx = gameState.availableTasks.findIndex(t => t.id === taskId);
  if (idx === -1) return;

  gameState.activeTask = gameState.availableTasks.splice(idx, 1)[0];
  activeTaskDetails.textContent = `Opgave fra ${gameState.activeTask.giver} - Belønning: ${gameState.activeTask.reward} kr`;
  activeTaskHeadline.textContent = gameState.activeTask.headline;
  activeTaskDescription.textContent = gameState.activeTask.description;
  renderAvailableTasks();
  updateStepsList();

  showPopup(`Ny opgave fra ${gameState.activeTask.giver}`, 'success');
}

// Opdatér trin-listen
function updateStepsList() {
  stepsList.innerHTML = '';
  if (!gameState.activeTask) {
    stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
    return;
  }
  gameState.activeTask.steps.forEach((step, i) => {
    const li = document.createElement('li');
    li.textContent = `Trin ${i + 1}: Gå til ${step}`;
    if (i < gameState.activeTask.currentStep) {
      li.style.textDecoration = 'line-through';
      li.style.color = '#95a5a6';
    }
    stepsList.appendChild(li);
  });
}

// Lyt efter bevægelser og kollisioner
function setupEventListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions);
}

// Håndtér bevægelse
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
  }
  updatePlayerPosition();
}

// Opdatér spillerens position
function updatePlayerPosition() {
  player.element.style.top = `${player.position.top}%`;
  player.element.style.left = `${player.position.left}%`;
}

// Kollisionstjek
function checkCollisions() {
  for (const [name, locEl] of Object.entries(locations)) {
    if (isColliding(player.element, locEl)) {
      handleLocationVisit(name);
    }
  }
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

// Håndter lokationsbesøg
function handleLocationVisit(locName) {
  if (player.isVisiting === locName) return;
  player.isVisiting = locName;

  const locEl = locations[locName];
  locEl.classList.add('visited');
  setTimeout(() => locEl.classList.remove('visited'), 500);

  if (gameState.activeTask) {
    const currentStepName = gameState.activeTask.steps[gameState.activeTask.currentStep];
    if (locName === currentStepName) {
      gameState.activeTask.currentStep++;
      showPopup(`Besøgte ${locName}`, 'success');
      if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
        completeTask();
      } else {
        updateStepsList();
        activeTaskDetails.textContent = `Opgave fra ${gameState.activeTask.giver} - Belønning: ${gameState.activeTask.reward} kr`;
      }
    } else {
      showPopup('Forkert lokation! Opgaven fejlede.', 'error');
      failTask();
    }
  }

  setTimeout(() => {
    player.isVisiting = null;
  }, 1000);
}

// Fuldfør opgave
function completeTask() {
  showPopup('Opgave fuldført!', 'success');
  gameState.tasksCompleted++;
  gameState.totalRewards += gameState.activeTask.reward;

  // Forenklet scoring – alt i "Point" (totalRewards)
  // Lidt effekt på system og tilfredshed
  gameState.systemUptime = Math.min(gameState.systemUptime + 0.5, 100);
  gameState.stakeholderSatisfaction = Math.min(gameState.stakeholderSatisfaction + 1, 100);
  gameState.compliance = Math.min(gameState.compliance + 0.5, 100);

  gameState.activeTask = null;
  activeTaskDetails.textContent = '';
  activeTaskHeadline.textContent = 'Ingen aktiv opgave';
  activeTaskDescription.textContent = '';
  stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
  updateScoreboard();
}

// Fejl ved opgave
function failTask() {
  gameState.activeTask = null;
  activeTaskDetails.textContent = '';
  activeTaskHeadline.textContent = 'Ingen aktiv opgave';
  activeTaskDescription.textContent = '';
  stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';

  // Straf for fejlet opgave
  gameState.systemUptime = Math.max(gameState.systemUptime - 2, 0);
  gameState.stakeholderSatisfaction = Math.max(gameState.stakeholderSatisfaction - 5, 0);
  gameState.compliance = Math.max(gameState.compliance - 1, 0);
  showPopup('Opgave mislykkedes!', 'error');

  updateScoreboard();
}

// Start generering af opgaver
function startTaskGeneration() {
  setInterval(() => {
    generateTask();
    renderAvailableTasks();
    if (gameState.availableTasks.length > 0) {
      showPopup('Nye opgaver er tilgængelige!', 'success');
    }
  }, 10000);
}

// Eskalér risiko over tid
function startTaskUrgencyEscalation() {
  setInterval(() => {
    gameState.availableTasks.forEach(task => {
      if (task.urgency === 'low') {
        task.urgency = 'medium';
      } else if (task.urgency === 'medium') {
        task.urgency = 'high';
      }
    });
    renderAvailableTasks();
  }, 20000);
}

// Systemoppetid falder løbende
function startSystemUptimeDecay() {
  setInterval(() => {
    gameState.systemUptime = Math.max(gameState.systemUptime - 0.1, 0);
    updateScoreboard();
    if (gameState.systemUptime <= 0) {
      showPopup('Systemoppetid kritisk!', 'error');
    }
  }, 60000);
}

// Popup-beskeder
function showPopup(message, type = 'success') {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  if (type === 'error') popup.classList.add('error');
  popup.textContent = message;
  popupContainer.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Start spillet
initGame();
