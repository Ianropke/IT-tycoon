/*************************************************
 * IT Tycoon (Re‑Revised) with Pie Chart
 *************************************************/

const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null,
};

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

// UI references
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

// We'll store references for the pie chart
const statsPie = document.getElementById('stats-pie').getContext('2d');

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

// (2) We'll define a simple function to draw the pie chart for Security/Stability/Development
function drawPieChart(security, stability, development) {
  // Clear canvas
  statsPie.clearRect(0, 0, 130, 130);

  const total = security + stability + development;
  if (total <= 0) return;

  // Angles
  let startAngle = 0;
  // security
  const secAngle = (security / total) * 2 * Math.PI;
  drawSegment("green", startAngle, startAngle + secAngle);
  startAngle += secAngle;
  // stability
  const stabAngle = (stability / total) * 2 * Math.PI;
  drawSegment("blue", startAngle, startAngle + stabAngle);
  startAngle += stabAngle;
  // dev
  const devAngle = (development / total) * 2 * Math.PI;
  drawSegment("orange", startAngle, startAngle + devAngle);

  function drawSegment(color, start, end) {
    statsPie.beginPath();
    statsPie.moveTo(65,65); // center
    statsPie.arc(65,65,65, start, end);
    statsPie.fillStyle = color;
    statsPie.fill();
  }
}

// Start
function initGame() {
  updateScoreboard();
  // generate 2 tasks initially
  for (let i=0; i<2; i++) generateTask();
  renderTasks();
  setupListeners();
  startTaskGenerator(); // faster flow
  startUrgencyEscalation();
  drawPieChart(gameState.security, gameState.stability, gameState.development);
}

// (2) Faster tasks
function startTaskGenerator() {
  setInterval(() => {
    if (gameState.availableTasks.length < 10) {
      generateTask();
      renderTasks();
      if (!gameState.shownFirstTaskPopup) {
        showPopup("Nye opgaver er dukket op! Klik for at se detaljer og 'Forpligt' for at tage en.", "info", 5000);
        gameState.shownFirstTaskPopup = true;
      }
    }
  }, 10000); // every 10s
}

// We remove “Belønning: XX – Risiko: XX” from the user-facing text
const possibleHeadlines = [
  "Opdater LIMS-systemet",
  "Firewall-implementering",
  "Migrér databaser til ny server",
  "Ekstra EHR-modul",
  "Netværkstjek",
  "Brugerstyring optimering",
  "Sikkerhedspatch",
];
const possibleDescriptions = {
  'stability': "Opgavefokus: (Stabilitetsopgave) – styrk drift og forhindr nedetid.",
  'development': "Opgavefokus: (Udviklingsopgave) – tilføj nye features og forbedringer.",
  'security': "Opgavefokus: (Sikkerhedsopgave) – håndtér trusler og styrk beskyttelse.",
};

function generateTask() {
  if (gameState.availableTasks.length >= 10) return;
  const randType = Math.random();
  let type = 'stability';
  if (randType < 0.33) type = 'stability';
  else if (randType < 0.66) type = 'development';
  else type = 'security';

  const risk = Math.floor(Math.random() * 3)+1;
  const reward = risk*100;

  const headline = possibleHeadlines[Math.floor(Math.random()*possibleHeadlines.length)];
  const desc = possibleDescriptions[type];

  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    taskType: type,
    headline,
    description: desc, 
    steps: getRandomSteps(),
    currentStep: 0,
    urgency: getRandomUrgency(),
    riskLevel: risk,
    reward,
  };
  gameState.availableTasks.push(newTask);
}

function getRandomSteps() {
  const locKeys = Object.keys(locations);
  const stepsCount = Math.floor(Math.random() * 3)+2;
  const steps = [];
  while (steps.length < stepsCount) {
    const candidate = locKeys[Math.floor(Math.random() * locKeys.length)];
    if (!steps.includes(candidate)) steps.push(candidate);
  }
  return steps;
}
function getRandomUrgency() {
  const r = Math.random();
  if (r<0.3) return 'high';
  if (r<0.7) return 'medium';
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

    // no more “Belønning: XXX – Risiko: XXX”
    li.innerHTML = `<strong>${t.headline}</strong>`;
    
    const desc = document.createElement('p');
    desc.classList.add('task-description');
    desc.style.display = 'none';
    desc.textContent = t.description;

    const btn = document.createElement('button');
    btn.classList.add('commit-button');
    btn.textContent = "Forpligt";
    btn.addEventListener('click', e => {
      e.stopPropagation();
      assignTask(t.id);
    });

    li.addEventListener('click', ()=>{
      document.querySelectorAll('.task-description').forEach(d=>{
        if (d!==desc) d.style.display='none';
      });
      desc.style.display = desc.style.display==='none'?'block':'none';
    });

    li.appendChild(desc);
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
}

// (1) If standing on some location that’s NOT the first step, do nothing, not fail
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  const idx = gameState.availableTasks.findIndex(x=>x.id===taskId);
  if (idx===-1) return;
  
  gameState.activeTask = gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent = gameState.activeTask.headline;
  activeTaskDescription.textContent = gameState.activeTask.description;
  activeTaskDetails.textContent = ""; 
  updateStepsList();
  renderTasks();

  checkImmediateStep(); // (4) if player stands on correct location now, handle it

  if (!gameState.shownFirstActivePopup) {
    showPopup("Du har nu en aktiv opgave! Følg trinnene for at løse den.", "info", 5000);
    gameState.shownFirstActivePopup = true;
  }
}

function checkImmediateStep() {
  // if the first step is the location we are currently on, just proceed
  if (!gameState.activeTask) return;
  const curIndex = gameState.activeTask.currentStep;
  if (curIndex>=gameState.activeTask.steps.length) return;
  const neededLoc = gameState.activeTask.steps[curIndex];
  const locEl = locations[neededLoc];
  if (locEl && isColliding(player.element, locEl)) {
    // correct step
    gameState.activeTask.currentStep++;
    showPopup(`Du stod allerede på ${neededLoc}, trin fuldført!`, "info");
    if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
      completeTask();
    } else {
      updateStepsList();
    }
  }
}

// steps
function updateStepsList() {
  stepsList.innerHTML = '';
  if(!gameState.activeTask) {
    stepsList.innerHTML = '<li>Ingen aktiv opgave</li>';
    return;
  }
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li = document.createElement('li');
    li.textContent = `Trin ${i+1}: Gå til ${locName}`;
    if (i<gameState.activeTask.currentStep) {
      li.style.textDecoration='line-through';
      li.style.color='#95a5a6';
    }
    stepsList.appendChild(li);
  });
}

function completeTask() {
  showPopup("Opgave fuldført!", "success");
  gameState.tasksCompleted++;
  gameState.totalRewards += gameState.activeTask.reward;
  applyEffects(gameState.activeTask);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function applyEffects(task) {
  if (task.taskType==='stability') {
    gameState.stability = Math.min(gameState.stability+5,150);
    gameState.development = Math.max(gameState.development-2,0);
  } else if (task.taskType==='development') {
    gameState.development=Math.min(gameState.development+5,150);
    gameState.stability=Math.max(gameState.stability-2,0);
  } else {
    // security
    gameState.security=Math.min(gameState.security+5,150);
    gameState.stability=Math.max(gameState.stability-1,0);
    gameState.development=Math.max(gameState.development-1,0);
  }
  // if any < 50 => hospital -5
  if (gameState.security<50 || gameState.stability<50 || gameState.development<50) {
    gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-5,0);
  } else {
    gameState.hospitalSatisfaction=Math.min(gameState.hospitalSatisfaction+3,100);
  }
}

function failTask() {
  showPopup("Opgave mislykkedes! Ingen belønning.", "error");
  if (gameState.activeTask) {
    gameState.security=Math.max(gameState.security-2,0);
    gameState.stability=Math.max(gameState.stability-2,0);
    gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-5,0);
  }
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction + "%";
  drawPieChart(); // (2) update the pie chart visually
}

function drawPieChart() {
  const s = gameState.security;
  const t = gameState.stability;
  const d = gameState.development;
  const total = s+t+d;
  
  // same logic from init
  statsPie.clearRect(0,0,130,130);
  if (total<=0) return;
  
  let startAngle=0;
  
  const secAngle = (s/total)*2*Math.PI;
  drawSegment("green", startAngle, startAngle+secAngle);
  startAngle+=secAngle;
  
  const stabAngle=(t/total)*2*Math.PI;
  drawSegment("blue",startAngle,startAngle+stabAngle);
  startAngle+=stabAngle;
  
  const devAngle=(d/total)*2*Math.PI;
  drawSegment("orange",startAngle,startAngle+devAngle);
  
  function drawSegment(color, start, end) {
    statsPie.beginPath();
    statsPie.moveTo(65,65);
    statsPie.arc(65,65,65,start,end);
    statsPie.fillStyle=color;
    statsPie.fill();
  }
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
      player.position.top=Math.max(player.position.top-player.moveSpeed,0);
      break;
    case 'arrowdown':
    case 's':
      player.position.top=Math.min(player.position.top+player.moveSpeed,100);
      break;
    case 'arrowleft':
    case 'a':
      player.position.left=Math.max(player.position.left-player.moveSpeed,0);
      break;
    case 'arrowright':
    case 'd':
      player.position.left=Math.min(player.position.left+player.moveSpeed,100);
      break;
  }
  updatePlayerPosition();
}

function updatePlayerPosition() {
  player.element.style.top=`${player.
