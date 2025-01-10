/*************************************************
 * IT Tycoon with Horizontal Bars & Meaningful Steps
 *************************************************/

const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null,
};

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

// UI references
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

// Bar references
const securityBar = document.getElementById('security-bar');
const stabilityBar = document.getElementById('stability-bar');
const developmentBar = document.getElementById('development-bar');

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

// Pools of steps that “make sense” for each type (3)
const stepsPool = {
  // e.g. stability tasks might revolve around “Hospital,” “Infrastruktur,” “Medicinsk Udstyr”
  stability: [
    ["Hospital", "Infrastruktur"], 
    ["Infrastruktur", "Hospital", "Medicinsk Udstyr"],
    ["Hospital", "Infrastruktur", "Hospital"], 
  ],
  // dev tasks might revolve around “Medicinsk Udstyr,” “Hospital,” “Informationssikkerhed”
  development: [
    ["Hospital", "Medicinsk Udstyr"], 
    ["Hospital", "Informationssikkerhed"],
    ["Hospital", "Medicinsk Udstyr", "Hospital"]
  ],
  // security tasks revolve around “Cybersikkerhed,” “Informationssikkerhed”
  security: [
    ["Cybersikkerhed", "Hospital"], 
    ["Informationssikkerhed", "Hospital", "Cybersikkerhed"],
    ["Cybersikkerhed", "Informationssikkerhed"]
  ]
};

const headlines = [
  "Opdater LIMS-systemet",
  "Firewall-implementering",
  "Migrér databaser til ny server",
  "Tilføj EHR-modul",
  "Netværkstjek",
  "Brugerstyring optimering",
  "Sikkerhedspatch"
];

const descs = {
  stability: "(Stabilitetsopgave) Vedligehold drift, minimer nedetid.",
  development: "(Udviklingsopgave) Tilføj nye features, optimer systemet.",
  security: "(Sikkerhedsopgave) Håndtér trusler, opdater beskyttelse."
};

function initGame() {
  updateScoreboard();
  // create some tasks initially
  for (let i=0; i<2; i++) {
    generateTask();
  }
  renderTasks();
  setupListeners();
  // you can add intervals or random events if desired
}

// Generate tasks but with meaningful steps
function generateTask() {
  if (gameState.availableTasks.length>=10) return;
  const r=Math.random();
  let type='stability';
  if(r<0.33) type='stability';
  else if(r<0.66) type='development';
  else type='security';

  const stepsArr = stepsPool[type][Math.floor(Math.random()*stepsPool[type].length)];
  const risk = Math.floor(Math.random()*3)+1;
  const reward = risk*100;
  const head = headlines[Math.floor(Math.random()*headlines.length)];
  const newTask = {
    id:Date.now()+Math.floor(Math.random()*1000),
    taskType:type,
    headline: head,
    description: descs[type],
    steps: stepsArr, // from the pool
    currentStep:0,
    urgency: getRandomUrgency(),
    riskLevel: risk,
    reward: reward,
  };
  gameState.availableTasks.push(newTask);
}

function getRandomUrgency() {
  const r=Math.random();
  if(r<0.3) return 'high';
  if(r<0.7) return 'medium';
  return 'low';
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
    desc.textContent=t.description;

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
      desc.style.display= desc.style.display==='none' ? 'block' : 'none';
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

  checkImmediateStep();

  if(!gameState.shownFirstActivePopup) {
    showPopup("Du har nu en aktiv opgave! Følg trinnene for at fuldføre den.", "info", 4000);
    gameState.shownFirstActivePopup=true;
  }
}

function checkImmediateStep() {
  if(!gameState.activeTask) return;
  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length) return;
  const needed=gameState.activeTask.steps[i];
  const locEl=locations[needed];
  if(locEl && isColliding(player.element, locEl)) {
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
  gameState.totalRewards += gameState.activeTask.reward;
  applyEffects(gameState.activeTask);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function applyEffects(task) {
  switch(task.taskType) {
    case 'stability':
      gameState.stability=Math.min(gameState.stability+5,150);
      gameState.development=Math.max(gameState.development-2,0);
      break;
    case 'development':
      gameState.development=Math.min(gameState.development+5,150);
      gameState.stability=Math.max(gameState.stability-2,0);
      break;
    case 'security':
      gameState.security=Math.min(gameState.security+5,150);
      gameState.stability=Math.max(gameState.stability-1,0);
      gameState.development=Math.max(gameState.development-1,0);
      break;
  }
  // if any < 50 => hospital -5
  if(gameState.security<50||gameState.stability<50||gameState.development<50) {
    gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-5,0);
  } else {
    gameState.hospitalSatisfaction=Math.min(gameState.hospitalSatisfaction+3,100);
  }
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
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

// scoreboard
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent=gameState.tasksCompleted;
  scoreboard.totalRewards.textContent=gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent=gameState.hospitalSatisfaction+"%";
  updateBars();
}

function updateBars() {
  // clamp at 0..150
  const sec=Math.max(0,Math.min(gameState.security,150));
  const stab=Math.max(0,Math.min(gameState.stability,150));
  const dev=Math.max(0,Math.min(gameState.development,150));

  // bar is 80px wide
  // e.g. securityBar.style.width = (sec/150)*80 + "px";
  const maxW=80; 
  securityBar.style.width=(sec/150)*maxW+"px";
  stabilityBar.style.width=(stab/150)*maxW+"px";
  developmentBar.style.width=(dev/150)*maxW+"px";
}

function setupListeners() {
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
  player.element.style.top=`${player.position.top}%`;
  player.element.style.left=`${player.position.left}%`;
}

function checkCollisions() {
  for(const [locName,locEl] of Object.entries(locations)) {
    if(isColliding(player.element,locEl)) {
      handleLocationVisit(locName);
    }
  }
  requestAnimationFrame(checkCollisions);
}

// do nothing if not the next step
function handleLocationVisit(locName) {
  if(player.isVisiting===locName) return;
  player.isVisiting=locName;

  locEl=locations[locName];
  locEl.classList.add('visited');
  setTimeout(()=>locEl.classList.remove('visited'),500);

  if(gameState.activeTask) {
    const stepIndex=gameState.activeTask.currentStep;
    if(stepIndex<gameState.activeTask.steps.length) {
      const needed=gameState.activeTask.steps[stepIndex];
      if(locName===needed) {
        gameState.activeTask.currentStep++;
        showPopup(`Rigtigt trin: ${locName}`, "info");
        if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length) {
          completeTask();
        } else {
          updateStepsList();
        }
      } 
      // else do nothing
    }
  }
  setTimeout(()=>player.isVisiting=null,1000);
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
  const pop=document.createElement('div');
  pop.classList.add('popup');
  if(type==="error") pop.classList.add('error');
  else if(type==="info") pop.classList.add('info');
  pop.textContent=message;
  document.getElementById('popup-container').appendChild(pop);
  setTimeout(()=>pop.remove(),duration);
}

initGame();
