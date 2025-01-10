// Spiller-objekt
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null,
};

// gameState with new stability vs. development
const gameState = {
  tasksCompleted: 0,
  totalRewards: 0, 
  activeTask: null,
  availableTasks: [],
  systemUptime: 99.9,
  stakeholderSatisfaction: 100.0,
  compliance: 100.0,

  // Ny: to track the player's approach
  stability: 100,       // If you pick mostly stability tasks, it stays high, dev might drop
  development: 100,     // If you pick mostly dev tasks, it stays high, stability might drop

  // used to keep track of whether we've shown popups yet
  shownIntro: false,
  shownFirstTaskPopup: false,
  shownFirstActivePopup: false,
};

// (8) No more references to "IT-sikkerhed" or "HR-afdeling" in scoreboard

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
  systemUptime: document.getElementById('system-uptime'),
  stakeholderSatisfaction: document.getElementById('stakeholder-satisfaction'),
  compliance: document.getElementById('compliance'),
  stability: document.getElementById('stability'),
  development: document.getElementById('development'),
};

const activeTaskDetails = document.getElementById('active-task-details');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription = document.getElementById('active-task-description');
const stepsList = document.getElementById('steps-list');
const tasksList = document.getElementById('tasks-list');
const popupContainer = document.getElementById('popup-container');

// (3) Show intro pop-up on load
window.addEventListener('load', () => {
  if (!gameState.shownIntro) {
    showPopup("Velkommen til IT Tycoon! Tag dig god tid – opgaverne handler om at holde systemet stabilt eller udvikle nye funktioner. Men pas på ubalance!", "info", 5000);
    gameState.shownIntro = true;
  }
});

// Start
function initGame() {
  updateScoreboard();
  // Generate some starting tasks
  for (let i = 0; i < 2; i++) {
    generateTask();
  }
  renderAvailableTasks();
  setupEventListeners();
  startTaskGenerator();
  startUrgencyEscalation();
  startSystemUptimeDecay();
}

// (2) Slow down intervals (longer) + (6) limit tasks to 10
function startTaskGenerator() {
  setInterval(() => {
    if (gameState.availableTasks.length < 10) {
      generateTask();
      renderAvailableTasks();
      // (4) If we haven't shown first task popup, show it
      if (!gameState.shownFirstTaskPopup) {
        showPopup("Nye opgaver er dukket op! Klik for at læse og 'Forpligt' for at påtage dig opgaven.", "info");
        gameState.shownFirstTaskPopup = true;
      }
    }
  }, 30000); // 30 seconds
}

function generateTask() {
  // half tasks are "stability", half are "development"
  // This is a simplistic approach
  const rand = Math.random();
  const type = rand < 0.5 ? "stability" : "development";
  
  // typical risk 1-3, reward = risk * 100
  const riskLevel = Math.floor(Math.random() * 3) + 1;
  const reward = riskLevel * 100;
  
  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    headline: type === "stability" ? "Stabilitetsopgave" : "Udviklingsopgave",
    description: type === "stability" 
      ? "Hjælp med at vedligeholde og stabilisere systemet." 
      : "Tilføj eller forbedr nye funktioner i systemet.",
    steps: getRandomSteps(),
    currentStep: 0,
    urgency: getRandomUrgency(),
    riskLevel,
    reward,
    taskType: type, // "stability" / "development"
  };
  
  gameState.availableTasks.push(newTask);
}

// (7) If only do stability tasks, dev drops & hospital unsatisfied. If only dev tasks, system unstable
function applyTaskTypeEffects(taskType) {
  if (taskType === "stability") {
    // do stability approach
    gameState.stability = Math.min(gameState.stability + 5, 150);
    // but development might stagnate
    gameState.development = Math.max(gameState.development - 3, 0);
    // eventually hospital is unsatisfied if dev < 50?
    if (gameState.development < 50) {
      // stakeholder satisfaction goes down
      gameState.stakeholderSatisfaction = Math.max(gameState.stakeholderSatisfaction - 2, 0);
      showPopup("Hospitalet ønsker nye funktioner – udviklingen halter!", "info");
    }
  } else {
    // dev approach
    gameState.development = Math.min(gameState.development + 5, 150);
    // but stability might drop
    gameState.stability = Math.max(gameState.stability - 3, 0);
    // if stability < 50, system is less stable and more expensive
    if (gameState.stability < 50) {
      // system uptime goes down
      gameState.systemUptime = Math.max(gameState.systemUptime - 1, 0);
      showPopup("Systemet mangler stabilitet, det bliver dyrere at vedligeholde!", "info");
    }
  }
}

// Random steps from the 5 locations
function getRandomSteps() {
  const locKeys = Object.keys(locations);
  const stepsCount = Math.floor(Math.random() * 3) + 2;
  const steps = [];
  while (steps.length < stepsCount) {
    const candidate = locKeys[Math.floor(Math.random() * locKeys.length)];
    if (!steps.includes(candidate)) {
      steps.push(candidate);
    }
  }
  return steps;
}

function getRandomUrgency() {
  const r = Math.random();
  if (r < 0.3) return "high";
  else if (r < 0.7) return "medium";
  else return "low";
}

// Render tasks
function renderAvailableTasks() {
  tasksList.innerHTML = "";
  if (!gameState.availableTasks.length) {
    tasksList.innerHTML = '<li>Ingen opgaver tilgængelige</li>';
    return;
  }
  gameState.availableTasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add(task.urgency);
    li.innerHTML = `
      <strong>${task.headline}</strong><br/>
      Belønning: ${task.reward} kr - Risiko: ${task.riskLevel}
    `;
    const desc = document.createElement("p");
    desc.textContent = task.description;
    desc.classList.add("task-description");
    desc.style.display = "none";
    
    const commitBtn = document.createElement("button");
    commitBtn.classList.add("commit-button");
    commitBtn.textContent = "Forpligt";
    commitBtn.addEventListener("click", e => {
      e.stopPropagation();
      assignTask(task.id);
    });
    li.addEventListener("click", () => {
      document.querySelectorAll(".task-description").forEach(d => {
        if (d !== desc) d.style.display = "none";
      });
      desc.style.display = desc.style.display === "none" ? "block" : "none";
    });
    li.appendChild(desc);
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

// Tildel opgave
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  const idx = gameState.availableTasks.findIndex(t => t.id === taskId);
  if (idx === -1) return;
  gameState.activeTask = gameState.availableTasks.splice(idx, 1)[0];
  
  activeTaskDetails.textContent = `Belønning: ${gameState.activeTask.reward} kr - Risiko: ${gameState.activeTask.riskLevel}`;
  activeTaskHeadline.textContent = gameState.activeTask.headline;
  activeTaskDescription.textContent = gameState.activeTask.description;
  renderAvailableTasks();
  updateStepsList();
  
  // (5) Pop up first time active
  if (!gameState.shownFirstActivePopup) {
    showPopup("Du har nu en aktiv opgave – følg trinlisten for at fuldføre den!", "info", 5000);
    gameState.shownFirstActivePopup = true;
  }
}

// Opdater trin
function updateStepsList() {
  stepsList.innerHTML = "";
  if (!gameState.activeTask) {
    stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
    return;
  }
  gameState.activeTask.steps.forEach((step, i) => {
    const li = document.createElement("li");
    li.textContent = `Trin ${i + 1}: Gå til ${step}`;
    if (i < gameState.activeTask.currentStep) {
      li.style.textDecoration = "line-through";
      li.style.color = "#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

// Bevægelse / kollision
function setupEventListeners() {
  document.addEventListener("keydown", handleMovement);
  requestAnimationFrame(checkCollisions);
}

function handleMovement(e) {
  switch(e.key.toLowerCase()) {
    case "arrowup":
    case "w":
      player.position.top = Math.max(player.position.top - player.moveSpeed, 0);
      break;
    case "arrowdown":
    case "s":
      player.position.top = Math.min(player.position.top + player.moveSpeed, 100);
      break;
    case "arrowleft":
    case "a":
      player.position.left = Math.max(player.position.left - player.moveSpeed, 0);
      break;
    case "arrowright":
    case "d":
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
  for (const [locName, locEl] of Object.entries(locations)) {
    if (isColliding(player.element, locEl)) {
      handleLocationVisit(locName);
    }
  }
  requestAnimationFrame(checkCollisions);
}

function isColliding(el1, el2) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.left > r2.right ||
    r1.right < r2.left
  );
}

// Lokationsbesøg
function handleLocationVisit(locName) {
  if (player.isVisiting === locName) return;
  player.isVisiting = locName;
  const locElement = locations[locName];
  locElement.classList.add("visited");
  setTimeout(() => locElement.classList.remove("visited"), 500);

  if (gameState.activeTask) {
    const currentStepIndex = gameState.activeTask.currentStep;
    const neededLoc = gameState.activeTask.steps[currentStepIndex];
    if (locName === neededLoc) {
      gameState.activeTask.currentStep++;
      showPopup(`Besøgte ${locName}`, "info");
      if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
        completeTask();
      } else {
        updateStepsList();
      }
    } else {
      showPopup("Forkert lokation! Opgaven mislykkedes.", "error");
      failTask();
    }
  }

  setTimeout(() => {
    player.isVisiting = null;
  }, 1000);
}

// Færdiggør opgave
function completeTask() {
  showPopup("Opgave fuldført!", "success");
  gameState.tasksCompleted++;
  gameState.totalRewards += gameState.activeTask.reward;

  // (7) Stability vs. Development logic:
  applyStabilityDevEffect(gameState.activeTask.taskType);

  gameState.activeTask = null;
  activeTaskDetails.textContent = "";
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDescription.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function failTask() {
  // If fails, also apply partial effect with penalty
  if (gameState.activeTask) {
    showPopup("Opgave fejlede. Ingen belønning!", "error");
    // do partial negative effect
    if (gameState.activeTask.taskType) {
      applyStabilityDevEffect(gameState.activeTask.taskType, true); // pass a second arg to indicate fail
    }
  }
  gameState.activeTask = null;
  activeTaskDetails.textContent = "";
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDescription.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

// apply effect for stability dev approach
function applyStabilityDevEffect(taskType, failed = false) {
  if (taskType === "stability") {
    if (!failed) {
      // user chose stability -> stability up, dev down
      gameState.stability = Math.min(gameState.stability + 5, 150);
      gameState.development = Math.max(gameState.development - 3, 0);
    } else {
      // a failed stability approach
      gameState.stability = Math.max(gameState.stability - 2, 0);
    }
    // if dev is too low -> stakeholders want new features
    if (gameState.development < 50) {
      gameState.stakeholderSatisfaction = Math.max(gameState.stakeholderSatisfaction - 2, 0);
    }
  } else {
    // development
    if (!failed) {
      gameState.development = Math.min(gameState.development + 5, 150);
      gameState.stability = Math.max(gameState.stability - 3, 0);
    } else {
      // a failed dev approach
      gameState.development = Math.max(gameState.development - 2, 0);
    }
    if (gameState.stability < 50) {
      gameState.systemUptime = Math.max(gameState.systemUptime - 1, 0);
    }
  }
}

// Eskaler opgavernes haster
function startUrgencyEscalation() {
  setInterval(() => {
    gameState.availableTasks.forEach(task => {
      if (task.urgency === "low") {
        task.urgency = "medium";
      } else if (task.urgency === "medium") {
        task.urgency = "high";
      }
    });
    renderAvailableTasks();
  }, 60000); // slowed to 1 minute
}

// System-oppetid falder gradvist
function startSystemUptimeDecay() {
  setInterval(() => {
    gameState.systemUptime = Math.max(gameState.systemUptime - 0.05, 0);
    updateScoreboard();
    if (gameState.systemUptime <= 0) {
      showPopup("Systemoppetid kritisk! Spillet slutter snart?", "error");
    }
  }, 45000); // every 45s for demonstration
}

// Simpel pop-up
function showPopup(message, type = "success", duration = 3000) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  if (type === "error") popup.classList.add("error");
  else if (type === "info") popup.classList.add("info");
  popup.textContent = message;
  popupContainer.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, duration);
}

function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.systemUptime.textContent = `${gameState.systemUptime.toFixed(1)}%`;
  scoreboard.stakeholderSatisfaction.textContent = `${gameState.stakeholderSatisfaction.toFixed(1)}%`;
  scoreboard.compliance.textContent = `${gameState.compliance.toFixed(1)}%`;
  scoreboard.stability.textContent = gameState.stability;
  scoreboard.development.textContent = gameState.development;
}

initGame();
