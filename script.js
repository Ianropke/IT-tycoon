/*************************************************
 * IT Tycoon - With Random Events & Persistent Save
 *************************************************/

// Player
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null,
};

// Game State
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

// Locations
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
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

const statsPieCanvas = document.getElementById('stats-pie');
const statsPie = statsPieCanvas.getContext('2d');

const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription = document.getElementById('active-task-description');
const activeTaskDetails = document.getElementById('active-task-details');
const stepsList = document.getElementById('steps-list');
const tasksList = document.getElementById('tasks-list');

// Intro modal
const introModal = document.getElementById('intro-modal');
const introOkBtn = document.getElementById('intro-ok-btn');
introOkBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
  gameState.introModalOpen = false;
});

// Attempt to load from localStorage
function loadGame() {
  const saved = localStorage.getItem('itTycoonSave');
  if (saved) {
    try {
      const loadedState = JSON.parse(saved);
      // Merge loadedState into gameState
      Object.assign(gameState, loadedState);
      // Ensure references for tasks are still arrays, etc.
    } catch(e) {
      console.log("Fejl ved indlæsning af spil fra localStorage:", e);
    }
  }
}

function saveGame() {
  const copy = { ...gameState };
  // we might want to remove references that can't be serialized easily
  // but this is a simple approach
  localStorage.setItem('itTycoonSave', JSON.stringify(copy));
}

// Initialize
function initGame() {
  loadGame();
  updateScoreboard();
  // if we have no tasks & no tasksCompleted => generate some initial tasks
  if (!gameState.availableTasks.length && !gameState.tasksCompleted) {
    for (let i=0; i<2; i++) {
      generateTask();
    }
  }
  renderTasks();
  setupEventListeners();
  startTaskGenerator();
  startUrgencyEscalation();

  // (2) Random events: "Strømudfald!"
  startRandomEvents();
  // if gameState.introModalOpen===false => hide modal if user had closed previously
  if (!gameState.introModalOpen) {
    introModal.style.display = 'none';
  }
}

function startRandomEvents() {
  // e.g. every 45s we might trigger “Strømudfald!” that drastically lowers stability
  setInterval(() => {
    // 50% chance each interval or so
    const r=Math.random();
    if (r<0.5) {
      // Strømudfald event
      showPopup("Strømudfald! Systemet mister stabilitet drastisk!", "error", 5000);
      gameState.stability = Math.max(gameState.stability - 10, 0);
      // hospital satisfaction goes down a bit
      gameState.hospitalSatisfaction = Math.max(gameState.hospitalSatisfaction - 5, 0);
      updateScoreboard();
      saveGame();
    }
  }, 45000); // every 45 seconds
}

function startTaskGenerator() {
  setInterval(()=>{
    if (gameState.availableTasks.length<10) {
      generateTask();
      renderTasks();
      if (!gameState.shownFirstTaskPopup) {
        showPopup("Nye opgaver er dukket op! Klik for at se detaljer og 'Forpligt' for at tage en.", "info", 5000);
        gameState.shownFirstTaskPopup=true;
      }
      saveGame();
    }
  }, 10000); // every 10s
}

function startUrgencyEscalation() {
  setInterval(()=>{
    gameState.availableTasks.forEach(t=>{
      if (t.urgency==='low') t.urgency='medium';
      else if (t.urgency==='medium') t.urgency='high';
    });
    renderTasks();
    saveGame();
  },30000);
}

// Example task pool
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
  'stability': "(Stabilitetsopgave) Vedligehold driften og minimer nedetid.",
  'development': "(Udviklingsopgave) Tilføj nye features og optimer.",
  'security': "(Sikkerhedsopgave) Håndtér trusler og styrk beskyttelse.",
};

function generateTask() {
  if (gameState.availableTasks.length>=10) return;
  const r=Math.random();
  let type='stability';
  if (r<0.33) type='stability';
  else if (r<0.66) type='development';
  else type='security';

  const risk=Math.floor(Math.random()*3)+1;
  const reward=risk*100;
  const head=possibleHeadlines[Math.floor(Math.random()*possibleHeadlines.length)];
  const desc=possibleDescriptions[type];

  const newTask = {
    id: Date.now()+Math.floor(Math.random()*1000),
    taskType:type,
    headline:head,
    description:desc,
    steps:getRandomSteps(),
    currentStep:0,
    urgency:getRandomUrgency(),
    riskLevel:risk,
    reward:reward,
  };
  gameState.availableTasks.push(newTask);
}

function getRandomSteps() {
  const locKeys=Object.keys(locations);
  const stepCount=Math.floor(Math.random()*3)+2;
  const steps=[];
  while(steps.length<stepCount) {
    const c=locKeys[Math.floor(Math.random()*locKeys.length)];
    if(!steps.includes(c)) steps.push(c);
  }
  return steps;
}
function getRandomUrgency() {
  const r=Math.random();
  if(r<0.3) return 'high';
  else if(r<0.7) return 'medium';
  else return 'low';
}

function renderTasks() {
  tasksList.innerHTML='';
  if(!gameState.availableTasks.length) {
    tasksList.innerHTML='<li>Ingen opgaver tilgængelige</li>';
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement('li');
    li.classList.add(t.urgency);
    li.innerHTML=`<strong>${t.headline}</strong>`;
    const desc=document.createElement('p');
    desc.classList.add('task-description');
    desc.style.display='none';
    desc.textContent=t.description; // no "Belønning" or "Risiko" displayed
    const btn=document.createElement('button');
    btn.classList.add('commit-button');
    btn.textContent='Forpligt';
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener('click', ()=>{
      document.querySelectorAll('.task-description').forEach(d=>{
        if(d!==desc) d.style.display='none';
      });
      desc.style.display=desc.style.display==='none'?'block':'none';
    });
    li.appendChild(desc);
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
}

function assignTask(taskId) {
  if(gameState.activeTask) {
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  const idx=gameState.availableTasks.findIndex(x=>x.id===taskId);
  if(idx===-1) return;
  gameState.activeTask=gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent=gameState.activeTask.headline;
  activeTaskDescription.textContent=gameState.activeTask.description;
  activeTaskDetails.textContent=''; 
  updateStepsList();
  renderTasks();
  // check if standing on correct location
  checkImmediateStep();

  if(!gameState.shownFirstActivePopup) {
    showPopup("Du har nu en aktiv opgave! Følg trinnene for at fuldføre den.", "info", 5000);
    gameState.shownFirstActivePopup=true;
  }
  saveGame();
}

function checkImmediateStep() {
  if(!gameState.activeTask) return;
  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length) return;
  const needed=gameState.activeTask.steps[i];
  const locEl=locations[needed];
  if(locEl && isColliding(player.element,locEl)) {
    gameState.activeTask.currentStep++;
    showPopup(`Du står allerede på ${needed}, trin fuldført!`, "info");
    if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length) {
      completeTask();
    } else {
      updateStepsList();
    }
  }
}

function updateStepsList() {
  stepsList.innerHTML='';
  if(!gameState.activeTask) {
    stepsList.innerHTML='<li>Ingen aktiv opgave</li>';
    return;
  }
  gameState.activeTask.steps.forEach((loc,i)=>{
    const li=document.createElement('li');
    li.textContent=`Trin ${i+1}: Gå til ${loc}`;
    if(i<gameState.activeTask.currentStep) {
      li.style.textDecoration='line-through';
      li.style.color='#95a5a6';
    }
    stepsList.appendChild(li);
  });
}

function completeTask() {
  showPopup("Opgave fuldført!", "success");
  gameState.tasksCompleted++;
  gameState.totalRewards+=gameState.activeTask.reward;
  applyEffects(gameState.activeTask);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML='<li>Ingen aktiv opgave</li>';
  updateScoreboard();
  saveGame();
}

function failTask() {
  showPopup("Opgave mislykkedes! Ingen belønning.", "error");
  if(gameState.activeTask) {
    // small penalty
    gameState.security=Math.max(gameState.security-2,0);
    gameState.stability=Math.max(gameState.stability-2,0);
    gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-5,0);
  }
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML='<li>Ingen aktiv opgave</li>';
  updateScoreboard();
  saveGame();
}

function applyEffects(task) {
  if(task.taskType==='stability') {
    gameState.stability=Math.min(gameState.stability+5,150);
    gameState.development=Math.max(gameState.development-2,0);
  } else if(task.taskType==='development') {
    gameState.development=Math.min(gameState.development+5,150);
    gameState.stability=Math.max(gameState.stability-2,0);
  } else {
    gameState.security=Math.min(gameState.security+5,150);
    gameState.stability=Math.max(gameState.stability-1,0);
    gameState.development=Math.max(gameState.development-1,0);
  }
  // check if any <50 => hospital -5
  if(gameState.security<50||gameState.stability<50||gameState.development<50) {
    gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-5,0);
  } else {
    gameState.hospitalSatisfaction=Math.min(gameState.hospitalSatisfaction+3,100);
  }
}

function updateScoreboard() {
  scoreboard.tasksCompleted.textContent=gameState.tasksCompleted;
  scoreboard.totalRewards.textContent=gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent=gameState.hospitalSatisfaction+"%";
  drawPieChart();
}

// Draw pie for security/stability/dev
function drawPieChart() {
  const s=gameState.security;
  const st=gameState.stability;
  const d=gameState.development;
  const total=s+st+d;
  statsPie.clearRect(0,0,130,130);
  if(total<=0) return;
  let startAngle=0;
  
  const secAngle=(s/total)*2*Math.PI;
  drawSegment("green",startAngle,startAngle+secAngle);
  startAngle+=secAngle;

  const stabAngle=(st/total)*2*Math.PI;
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

function setupEventListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions);
}

function handleMovement(e) {
  if(gameState.introModalOpen) return;
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
  player.element.style.top=`${player.position.top}%`;
  player.element.style.left=`${player.position.left}%`;
}

function checkCollisions() {
  Object.entries(locations).forEach(([locName,el])=>{
    if(isColliding(player.element,el)) {
      handleLocationVisit(locName);
    }
  });
  requestAnimationFrame(checkCollisions);
}

// (1) If not the needed step, do nothing 
function handleLocationVisit(locName) {
  if(player.isVisiting===locName) return;
  player.isVisiting=locName;

  const el=locations[locName];
  el.classList.add('visited');
  setTimeout(()=>el.classList.remove('visited'),500);

  if(gameState.activeTask) {
    const idx=gameState.activeTask.currentStep;
    if(idx<gameState.activeTask.steps.length) {
      const needed=gameState.activeTask.steps[idx];
      if(locName===needed) {
        gameState.activeTask.currentStep++;
        showPopup(`Rigtigt trin: ${locName}`, "info");
        if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length) {
          completeTask();
        } else {
          updateStepsList();
        }
      } else {
        // do nothing if it's not the needed step
        // remove auto-fail
      }
    }
  }

  setTimeout(()=>{player.isVisiting=null;},1000);
}

function isColliding(a,b) {
  const aR=a.getBoundingClientRect();
  const bR=b.getBoundingClientRect();
  return !(
    aR.top>bR.bottom||
    aR.bottom<bR.top||
    aR.left>bR.right||
    aR.right<bR.left
  );
}

function showPopup(message,type="success",duration=3000) {
  const el=document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  else if(type==="info") el.classList.add('info');
  el.textContent=message;
  document.getElementById('popup-container').appendChild(el);
  setTimeout(()=>el.remove(), duration);
}

// Start the game
initGame();
