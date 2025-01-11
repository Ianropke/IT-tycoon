/*******************************************************
 * script.js
 * Implements:
 * - No repeated popups for the same step
 * - Location-specific scenario dialogs
 * - Per-step finalization (not entire task)
 * - Clear risk–reward
 * - High-priority tasks with penalty if ignored
 *******************************************************/

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

  // For skipping high-priority tasks
  securityNeglect: 0,
  developmentNeglect: 0,
  stabilityNeglect: 0,
};

// Locations
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
  Leverandør: document.getElementById('leverandor'),
  'IT Jura': document.getElementById('it-jura'),
};

// Scoreboard
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

const securityBar = document.getElementById('security-bar');
const stabilityBar = document.getElementById('stability-bar');
const developmentBar = document.getElementById('development-bar');

// Active/Available tasks
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription= document.getElementById('active-task-description');
const activeTaskDetails= document.getElementById('active-task-details');
const stepsList= document.getElementById('steps-list');
const tasksList= document.getElementById('tasks-list');

// Intro modal
const introModal = document.getElementById('intro-modal');
const introOkBtn = document.getElementById('intro-ok-btn');
introOkBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
  gameState.introModalOpen = false;
});

// Location-specific scenario dialogs
const locationScenarios = {
  "Hospital": {
    question: "Hospitalet kræver ekstra tests. Håndterer du dem?",
    choices: [
      {
        label: "Udfør ekstra test (Bedre stabilitet)",
        effect: () => {
          gameState.stability = Math.min(gameState.stability+2,150);
        }
      },
      {
        label: "Spring test over (hurtigere, men risikabelt)",
        effect: () => {
          gameState.stability = Math.max(gameState.stability-2,0);
        }
      }
    ]
  },
  "IT Jura": {
    question: "IT Jura: Vil du indføre strenge kontraktkrav?",
    choices: [
      {
        label: "Ja, strengere (+2 Security, −1 Satisfaction)",
        effect: ()=>{
          gameState.security = Math.min(gameState.security+2,150);
          gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-1,0);
        }
      },
      {
        label: "Nej, standard",
        effect: ()=>{/* minimal effect */}
      }
    ]
  },
  "Leverandør": {
    question: "Leverandøren vil have forhåndsbetaling. Håndtere du det?",
    choices: [
      {
        label: "Betal (+1 Development, −1 Rewards)",
        effect: ()=>{
          gameState.development=Math.min(gameState.development+1,150);
          gameState.totalRewards=Math.max(gameState.totalRewards-1,0);
        }
      },
      {
        label: "Afslå (risiko for forsinkelser)",
        effect: ()=>{
          gameState.stability=Math.max(gameState.stability-1,0);
        }
      }
    ]
  },
  "Infrastruktur": {
    question: "Skal du opgradere netværkets kerne eller patche server?",
    choices: [
      {
        label: "Kerneopgradering (+2 Stability)",
        effect: ()=>{
          gameState.stability=Math.min(gameState.stability+2,150);
        }
      },
      {
        label: "Kun patch (mindre effekt)",
        effect: ()=>{
          gameState.stability=Math.min(gameState.stability+1,150);
        }
      }
    ]
  },
  "Informationssikkerhed": {
    question: "Tilføj ekstra logs? Eller hold baseline?",
    choices: [
      {
        label: "Mere logging (+2 Security)",
        effect: ()=>{
          gameState.security=Math.min(gameState.security+2,150);
        }
      },
      {
        label: "Baseline (ingen ændring)",
        effect: ()=>{}
      }
    ]
  },
  "Medicinsk Udstyr": {
    question: "Udstyret skal vedligeholdes. Gør du det grundigt?",
    choices: [
      {
        label: "Ja (øger stabilitet, −1 dev)",
        effect: ()=>{
          gameState.stability=Math.min(gameState.stability+2,150);
          gameState.development=Math.max(gameState.development-1,0);
        }
      },
      {
        label: "Nej (hurtigt fix, −2 stability)",
        effect: ()=>{
          gameState.stability=Math.max(gameState.stability-2,0);
        }
      }
    ]
  },
  "Cybersikkerhed": {
    question: "Skal du gennemføre en dyb scanning af netværket?",
    choices: [
      {
        label: "Ja, dyb scanning (+2 Security, −1 Rewards)",
        effect: ()=>{
          gameState.security=Math.min(gameState.security+2,150);
          gameState.totalRewards=Math.max(gameState.totalRewards-1,0);
        }
      },
      {
        label: "Nej, overfladisk scanning (−2 Security)",
        effect: ()=>{
          gameState.security=Math.max(gameState.security-2,0);
        }
      }
    ]
  }
};

// Steps pool
const stepsPool = {
  stability: [
    ["Hospital", "Infrastruktur"],
    ["Hospital", "Leverandør", "Infrastruktur"]
  ],
  development: [
    ["Hospital", "Leverandør", "IT Jura"],
    ["Hospital", "Informationssikkerhed"]
  ],
  security: [
    ["Cybersikkerhed", "IT Jura"],
    ["Informationssikkerhed", "Cybersikkerhed", "Hospital"]
  ]
};

// Some headlines & descriptions
const headlines = ["Netværkstjek", "Systemoptimering", "Sikkerhedspatch", "Brugerstyring", "Stort Udviklingsprojekt"];
const descs = {
  stability: "(Stabilitetsopgave) Holder systemet kørende.",
  development: "(Udviklingsopgave) Forbedr systemet.",
  security: "(Sikkerhedsopgave) Håndtér trusler."
};

// Track if we have shown scenario for step
function showStepDialog(locationName, stepIndex) {
  // ensure we only show once
  if(!gameState.activeTask.decisionMadeForStep) {
    gameState.activeTask.decisionMadeForStep = {};
  }
  if(gameState.activeTask.decisionMadeForStep[stepIndex]) return;
  gameState.activeTask.decisionMadeForStep[stepIndex] = true;

  const scenario = locationScenarios[locationName];
  if(!scenario) {
    // fallback generic
    genericDialog(locationName, stepIndex);
    return;
  }
  // build a popup
  const popup = document.createElement('div');
  popup.classList.add('popup', 'info');
  popup.style.animation = "none"; // so it won't auto-fade

  let html = `<strong>${locationName}</strong><br/>${scenario.question}<br/><br/>`;
  scenario.choices.forEach((c, idxC) => {
    html += `<button id="choice-${idxC}" style="margin-right:6px;">${c.label}</button>`;
  });
  popup.innerHTML = html;
  document.getElementById('popup-container').appendChild(popup);

  // add events
  scenario.choices.forEach((c, idxC) => {
    const btn = document.getElementById(`choice-${idxC}`);
    btn.addEventListener('click', () => {
      // apply effect
      c.effect();
      popup.remove();
      finalizeStep(stepIndex);
    });
  });
}

// fallback generic
function genericDialog(locationName, stepIndex){
  const popup=document.createElement('div');
  popup.classList.add('popup','info');
  popup.style.animation="none";
  popup.innerHTML=`
    <strong>${locationName}</strong><br/>
    Standard valg:
    <button id="genA">Grundigt</button>
    <button id="genB">Hurtigt</button>
  `;
  document.getElementById('popup-container').appendChild(popup);

  document.getElementById('genA').addEventListener('click',()=>{
    // small bonus
    gameState.stability=Math.min(gameState.stability+1,150);
    popup.remove();
    finalizeStep(stepIndex);
  });
  document.getElementById('genB').addEventListener('click',()=>{
    // small penalty
    gameState.stability=Math.max(gameState.stability-1,0);
    popup.remove();
    finalizeStep(stepIndex);
  });
}

function finalizeStep(stepIndex) {
  if(!gameState.activeTask)return;
  gameState.activeTask.currentStep++;
  if (gameState.activeTask.currentStep>=gameState.activeTask.steps.length) {
    completeTask();
  } else {
    updateStepsList();
  }
}

// Collisions
function checkCollisions(){
  Object.entries(locations).forEach(([locName, locEl])=>{
    if(isColliding(player.element, locEl)){
      handleLocationVisit(locName);
    }
  });
  requestAnimationFrame(checkCollisions);
}
function handleMovement(e){
  if(gameState.introModalOpen) return;
  switch(e.key.toLowerCase()){
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
  player.element.style.top=player.position.top+"%";
  player.element.style.left=player.position.left+"%";
}

// Risk + high priority
function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  const r=Math.random();
  let type='stability';
  if(r<0.33) type='stability'; else if(r<0.66) type='development'; else type='security';

  const stepArr=stepsPool[type][Math.floor(Math.random()*stepsPool[type].length)];
  const riskLevel=Math.floor(Math.random()*3)+1; //1..3
  const baseReward=riskLevel*80;
  const head=headlines[Math.floor(Math.random()*headlines.length)];

  const newTask={
    id:Date.now()+Math.floor(Math.random()*1000),
    taskType:type,
    headline:head,
    description: descs[type],
    steps: stepArr,
    currentStep:0,
    riskLevel: riskLevel,
    baseReward: baseReward,
    isHighPriority:(riskLevel===3),
    decisionMadeForStep:{} // track per-step dialog
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement('li');

    // color code border by risk
    if(t.riskLevel===3){
      li.style.borderColor="red"; 
      li.style.borderWidth="2px";
    } else if(t.riskLevel===2){
      li.style.borderColor="orange";
    } else {
      li.style.borderColor="green";
    }

    const priorityLabel=t.isHighPriority?" (HØJPRIORITET)":"";
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} - Belønning: ~${t.baseReward}
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn=document.createElement('button');
    commitBtn.classList.add('commit-button');
    commitBtn.textContent="Forpligt";
    commitBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener('click',()=>{
      li.querySelectorAll('.task-description').forEach(d=>{
        if(d.style.display==="none") d.style.display="block"; else d.style.display="none";
      });
    });
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

function skipHighPriority(task){
  if(!task.isHighPriority)return;
  if(task.taskType==="security"){
    gameState.securityNeglect++;
  } else if(task.taskType==="development"){
    gameState.developmentNeglect++;
  } else {
    gameState.stabilityNeglect++;
  }
  checkNeglectPenalties();
}
function checkNeglectPenalties(){
  if(gameState.securityNeglect>=3){
    showPopup("Du har ignoreret for mange Sikkerhedsopgaver! -5 Security", "error");
    gameState.security=Math.max(gameState.security-5,0);
    gameState.securityNeglect=0;
    updateScoreboard();
  }
  if(gameState.developmentNeglect>=3){
    showPopup("Du har ignoreret for mange Udviklingsopgaver! -5 Udvikling", "error");
    gameState.development=Math.max(gameState.development-5,0);
    gameState.developmentNeglect=0;
    updateScoreboard();
  }
  if(gameState.stabilityNeglect>=3){
    showPopup("Du har ignoreret for mange Stabilitetsopgaver! -5 Stabilitet", "error");
    gameState.stability=Math.max(gameState.stability-5,0);
    gameState.stabilityNeglect=0;
    updateScoreboard();
  }
}

function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  const idx=gameState.availableTasks.findIndex(x=>x.id===taskId);
  if(idx===-1)return;
  const task=gameState.availableTasks[idx];

  if(task.riskLevel===3){
    // show a confirm popup
    const confirmDiv=document.createElement('div');
    confirmDiv.classList.add('popup','info');
    confirmDiv.style.animation="none";
    confirmDiv.innerHTML=`
      <strong>Høj Risiko!</strong><br/>
      Stor gevinst men stor straf ved fejl.<br/>
      <button id="confirmYes">Fortsæt</button>
      <button id="confirmNo">Fortryd</button>
    `;
    document.getElementById('popup-container').appendChild(confirmDiv);

    document.getElementById('confirmYes').addEventListener('click',()=>{
      confirmDiv.remove();
      finalizeAssign(taskId, idx);
    });
    document.getElementById('confirmNo').addEventListener('click',()=>{
      confirmDiv.remove();
      // skip => mark as ignoring high-priority
      gameState.availableTasks.splice(idx,1);
      skipHighPriority(task);
      renderTasks();
    });
  } else {
    finalizeAssign(taskId, idx);
  }
}
function finalizeAssign(taskId, idx){
  gameState.activeTask=gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent=gameState.activeTask.headline;
  activeTaskDescription.textContent=gameState.activeTask.description;
  activeTaskDetails.textContent="";
  updateStepsList();
  renderTasks();
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  gameState.activeTask.steps.forEach((locName, i)=>{
    const li=document.createElement("li");
    let short=(locationScenarios[locName] && locationScenarios[locName].question) 
       ? locationScenarios[locName].question 
       : "Generisk trin.";
    if(i<gameState.activeTask.currentStep){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    li.textContent=`Trin ${i+1}: [${locName}] ${short}`;
    stepsList.appendChild(li);
  });
}

/** finish => apply bigger reward, or if we had fail chance => penalty. For simplicity, auto success. */
function completeTask(){
  showPopup("Opgave fuldført!", "success");
  gameState.tasksCompleted++;

  const t=gameState.activeTask;
  // e.g. baseReward plus a small bonus
  let reward=t.baseReward;
  if(t.taskType==="security"){
    gameState.security=Math.min(gameState.security + 5 + t.riskLevel*2,150);
    showPopup(`+${5+t.riskLevel*2} Security, +${reward} belønning`, "info",4000);
  } else if(t.taskType==="development"){
    gameState.development=Math.min(gameState.development + 5 + t.riskLevel*2,150);
    showPopup(`+${5+t.riskLevel*2} Udvikling, +${reward} belønning`, "info",4000);
  } else {
    gameState.stability=Math.min(gameState.stability + 5 + t.riskLevel*2,150);
    showPopup(`+${5+t.riskLevel*2} Stabilitet, +${reward} belønning`, "info",4000);
  }
  gameState.totalRewards+=reward;

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/** scoreboard & bars */
function updateScoreboard(){
  scoreboard.tasksCompleted.textContent=gameState.tasksCompleted;
  scoreboard.totalRewards.textContent=gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent=gameState.hospitalSatisfaction+"%";
  updateBars();
}
function updateBars(){
  const sec=Math.max(0,Math.min(gameState.security,150));
  const stab=Math.max(0,Math.min(gameState.stability,150));
  const dev=Math.max(0,Math.min(gameState.development,150));
  const maxW=80;
  securityBar.style.width=(sec/150)*maxW+"px";
  stabilityBar.style.width=(stab/150)*maxW+"px";
  developmentBar.style.width=(dev/150)*maxW+"px";
}

/** popups */
function showPopup(msg,type="success",duration=3000){
  const el=document.createElement("div");
  el.classList.add("popup");
  if(type==="error") el.classList.add("error");
  else if(type==="info") el.classList.add("info");
  el.style.animation="none"; // no auto fade if you want
  el.textContent=msg;
  document.getElementById("popup-container").appendChild(el);

  setTimeout(()=>el.remove(),duration);
}

/** initGame */
function initGame(){
  updateScoreboard();
  for(let i=0;i<2;i++){
    generateTask();
  }
  renderTasks();
  setupListeners();

  // tasks every 10s
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

initGame();
