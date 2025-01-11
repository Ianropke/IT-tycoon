/************************************************
 * script.js implementing:
 * 1) Risk–Reward 
 * 2) Mini Dialog at each step 
 * 7) Penalties for ignoring High-Priority tasks
 ************************************************/

/** Player **/
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null,
};

/** Game State **/
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

  // (7) "neglect" counters for ignoring high-priority tasks
  securityNeglect: 0,
  developmentNeglect: 0,
  stabilityNeglect: 0,
};

/** Locations **/
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
  Leverandør: document.getElementById('leverandor'),
  'IT Jura': document.getElementById('it-jura'),
};

/** Scoreboard & Bars **/
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

const securityBar = document.getElementById('security-bar');
const stabilityBar = document.getElementById('stability-bar');
const developmentBar = document.getElementById('development-bar');

/** UI References for Active/Available tasks **/
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription = document.getElementById('active-task-description');
const activeTaskDetails = document.getElementById('active-task-details');
const stepsList = document.getElementById('steps-list');
const tasksList = document.getElementById('tasks-list');

/** Intro Modal **/
const introModal = document.getElementById('intro-modal');
const introOkBtn = document.getElementById('intro-ok-btn');
introOkBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
  gameState.introModalOpen = false;
});

/** Step Explanations **/
const stepExplanations = {
  Infrastruktur: "Du opgraderer serverinfrastrukturen.",
  Informationssikkerhed: "Du installerer en patch for bedre sikkerhed.",
  Hospital: "Du koordinerer ændringer med hospitalet.",
  'Medicinsk Udstyr': "Du vedligeholder udstyrets software.",
  Cybersikkerhed: "Du håndterer trusler i netværket.",
  Leverandør: "Du bestiller udvikling hos leverandøren.",
  'IT Jura': "Du tjekker kontrakter og juridiske krav.",
};

/**
 * (1) Risk–Reward: riskLevel 1–3 => bigger payoff, bigger penalty if fail
 * (7) High Priority: if risk >= 3 or a special property => skipping => neglect
 */

// Example step pools
const stepsPool = {
  stability: [
    ["Hospital", "Infrastruktur"],
    ["Hospital", "Leverandør", "Infrastruktur"],
  ],
  development: [
    ["Hospital", "Leverandør", "IT Jura"],
    ["Hospital", "Informationssikkerhed"],
  ],
  security: [
    ["Cybersikkerhed", "IT Jura"],
    ["Informationssikkerhed", "Cybersikkerhed", "Hospital"],
  ]
};

// Sample headlines + descriptions
const headlines = ["Netværkstjek", "Systemoptimering", "Sikkerhedspatch", "Brugerstyring", "Stort Udviklingsprojekt"];
const descs = {
  stability: "(Stabilitetsopgave) Minimer nedetid.",
  development: "(Udviklingsopgave) Tilføj/forbedr systemet.",
  security: "(Sikkerhedsopgave) Håndtér trusler.",
};

/** Collisions & Listeners **/
function checkCollisions() {
  for (const [locName, locEl] of Object.entries(locations)) {
    if (isColliding(player.element, locEl)) {
      handleLocationVisit(locName);
    }
  }
  requestAnimationFrame(checkCollisions);
}
function setupListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions);
}

/** isColliding + location visit logic (2) mini decisions at each location **/
function isColliding(aEl, bEl){
  const r1=aEl.getBoundingClientRect();
  const r2=bEl.getBoundingClientRect();
  return !(
    r1.top>r2.bottom ||
    r1.bottom<r2.top ||
    r1.left>r2.right ||
    r1.right<r2.left
  );
}
function handleLocationVisit(locName) {
  if (player.isVisiting === locName) return;
  player.isVisiting = locName;

  const locEl = locations[locName];
  locEl.classList.add('visited');
  setTimeout(()=> locEl.classList.remove('visited'), 500);

  if (gameState.activeTask) {
    const idx = gameState.activeTask.currentStep;
    if (idx < gameState.activeTask.steps.length) {
      const needed = gameState.activeTask.steps[idx];
      if (locName === needed) {
        // Step is correct => but show a small "mini decision" dialogue
        showStepDialog(locName);
      }
    }
  }
  setTimeout(() => { player.isVisiting = null; }, 1000);
}

/** showStepDialog => mini popup with a choice. If choice is “bad”, might cause partial fail, etc. **/
function showStepDialog(locName) {
  // Example: a 2-choice mini dialog for each location
  const popup = document.createElement('div');
  popup.classList.add('popup', 'info');
  popup.style.animation = "none"; // so it doesn't fade out automatically

  // Each location might have different minor decisions
  // We'll define a simple approach:
  let question = `Ved ${locName}, vil du være grundig eller hurtig?`;
  let optionA = "Grundig (bedre chance for success)";
  let optionB = "Hurtig (risiker delvis fejl)";

  // If you want more location-specific text:
  if (locName==="IT Jura") {
    question = "IT Jura: Vil du kræve strengere kontrakt?";
    optionA = "Ja, streng (bedre stabilitet men risk leverandør relation)";
    optionB = "Nej, lempelig (mindre immediate risk men...)";
  }

  popup.innerHTML = `
    <strong>${locName}</strong><br />
    ${question}<br /><br />
    <button id="choiceA">A: ${optionA}</button>
    <button id="choiceB">B: ${optionB}</button>
  `;
  document.getElementById('popup-container').appendChild(popup);

  // If choose A => success. If choose B => partial penalty
  document.getElementById('choiceA').addEventListener('click', () => {
    popup.remove();
    finalizeStep(locName, "A");
  });
  document.getElementById('choiceB').addEventListener('click', () => {
    popup.remove();
    finalizeStep(locName, "B");
  });
}

/** finalizeStep => complete this step or partially fail */
function finalizeStep(locName, choice) {
  if (!gameState.activeTask) return;
  gameState.activeTask.currentStep++;

  if (choice==="B") {
    // partial penalty for choosing "fast & sloppy" approach
    showPopup("Valgte hurtig løsning => risiko for fejl", "info");
    // e.g. minus 1 stability or dev?
    gameState.stability = Math.max(gameState.stability-1, 0);
  }

  if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
    // finish
    completeTask();
  } else {
    updateStepsList();
  }
}

/** Movement **/
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
  player.element.style.top=player.position.top+"%";
  player.element.style.left=player.position.left+"%";
}

/** Generating tasks with (1) Risk–Reward, plus (7) High Priority if risk=3 => skipping => penalty */
function generateTask() {
  if (gameState.availableTasks.length>=10) return;
  const r = Math.random();
  let type='stability';
  if(r<0.33) type='stability';
  else if(r<0.66) type='development';
  else type='security';

  const stepArr = stepsPool[type][Math.floor(Math.random()*stepsPool[type].length)];
  const riskLevel = Math.floor(Math.random()*3)+1; // 1-3
  // bigger reward if risk=3
  const baseReward = riskLevel*80; // for instance
  const head = headlines[Math.floor(Math.random()*headlines.length)];

  const newTask = {
    id: Date.now()+Math.floor(Math.random()*1000),
    taskType: type,
    headline: head,
    description: descs[type],
    steps: stepArr,
    currentStep: 0,
    riskLevel: riskLevel,
    baseReward: baseReward,
    isHighPriority: (riskLevel===3), // (7) if risk=3 => high priority
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

/** Render tasks => show risk color code + “High Priority” label if isHighPriority */
function renderTasks() {
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(task => {
    const li = document.createElement('li');

    // color code risk: low=green, med=orange, high=red
    if (task.riskLevel===3) { 
      li.style.borderColor="red"; 
      li.style.borderWidth="2px";
    } else if (task.riskLevel===2) {
      li.style.borderColor="orange"; 
    } else {
      li.style.borderColor="green";
    }

    // Show “HIGH PRIORITY” if risk=3
    const pLabel = task.isHighPriority? " (HØJPRIORITET)" : "";
    li.innerHTML=`<strong>${task.headline}${pLabel}</strong><br/>
      Risiko: ${task.riskLevel} - Belønning: ~${task.baseReward} 
      <p class="task-description" style="display:none;">${task.description}</p>
    `;

    const commitBtn = document.createElement('button');
    commitBtn.classList.add('commit-button');
    commitBtn.textContent="Forpligt";
    commitBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      assignTask(task.id);
    });

    // show/hide description
    li.addEventListener("click", ()=>{
      li.querySelectorAll(".task-description").forEach(d=>{
        if(d.style.display==="none") d.style.display="block"; else d.style.display="none";
      });
    });

    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

/** (7) If we skip or never pick a high priority task => penalty => track “neglect” */
function skipHighPriority(task) {
  if(!task.isHighPriority) return;
  // increment neglect in that category
  if(task.taskType==="security"){
    gameState.securityNeglect++;
  } else if(task.taskType==="development"){
    gameState.developmentNeglect++;
  } else {
    gameState.stabilityNeglect++;
  }
  checkNeglectPenalties();
}

/** if neglect counters get too high => random penalty or event */
function checkNeglectPenalties() {
  if(gameState.securityNeglect>=3){
    showPopup("Du har ignoreret for mange Sikkerhedsopgaver! Systemet er sårbart!", "error");
    gameState.security=Math.max(gameState.security-5,0);
    gameState.securityNeglect=0; // reset or reduce
    updateScoreboard();
  }
  if(gameState.developmentNeglect>=3){
    showPopup("Du har ignoreret for mange Udviklingsopgaver! Systemet bliver forældet!", "error");
    gameState.development=Math.max(gameState.development-5,0);
    gameState.developmentNeglect=0;
    updateScoreboard();
  }
  if(gameState.stabilityNeglect>=3){
    showPopup("Du har ignoreret for mange Stabilitetsopgaver! Oppetid truet!", "error");
    gameState.stability=Math.max(gameState.stability-5,0);
    gameState.stabilityNeglect=0;
    updateScoreboard();
  }
}

/** Assign Task => check risk => if risk=3 => confirm? (1) bigger reward bigger penalty if fail */
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  const idx=gameState.availableTasks.findIndex(t=>t.id===taskId);
  if(idx===-1)return;
  const task=gameState.availableTasks[idx];

  // if risk=3 => show a quick "are you sure?" popup
  if(task.riskLevel===3){
    const confirmDiv=document.createElement('div');
    confirmDiv.classList.add('popup', 'info');
    confirmDiv.style.animation="none";
    confirmDiv.innerHTML=`
      <strong>Høj Risiko!</strong><br/>
      Denne opgave kan give stor gevinst men stor straf ved fejl.<br/>
      <button id="confirmYes">Fortsæt</button>
      <button id="confirmNo">Fortryd</button>
    `;
    document.getElementById('popup-container').appendChild(confirmDiv);

    document.getElementById('confirmYes').addEventListener('click', ()=>{
      confirmDiv.remove();
      finalizeAssign(taskId, idx);
    });
    document.getElementById('confirmNo').addEventListener('click', ()=>{
      confirmDiv.remove();
      // skip => treat as user ignoring
      gameState.availableTasks.splice(idx,1);
      skipHighPriority(task);
      renderTasks();
    });
  } else {
    // normal risk => just proceed
    finalizeAssign(taskId, idx);
  }
}
function finalizeAssign(taskId, idx) {
  gameState.activeTask=gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent=gameState.activeTask.headline;
  activeTaskDescription.textContent=gameState.activeTask.description;
  activeTaskDetails.textContent="";
  updateStepsList();
  renderTasks();
  checkImmediateStep();

  if(!gameState.shownFirstActivePopup){
    showPopup("Aktiv opgave valgt! Tjek trinlisten.", "info", 4000);
    gameState.shownFirstActivePopup=true;
  }
}

/** if user never picks a high priority task => we skip it or remove => skipHighPriority => track */
function checkImmediateStep(){
  if(!gameState.activeTask)return;
  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length)return;
  const needed=gameState.activeTask.steps[i];
  const locEl=locations[needed];
  if(locEl && isColliding(player.element, locEl)){
    showStepDialog(needed);
  }
}
function updateStepsList() {
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li=document.createElement("li");
    const short=stepExplanations[locName]||"Du udfører en handling.";
    if(i<gameState.activeTask.currentStep){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    li.textContent=`Trin ${i+1}: [${locName}] ${short}`;
    stepsList.appendChild(li);
  });
}

/** If complete => apply bigger reward if success, bigger penalty if fail. 
   We'll define "fail chance" based on some logic or skip that for now. 
*/
function completeTask() {
  showPopup("Opgave fuldført!", "success");
  gameState.tasksCompleted++;

  // reward = baseReward + risk-based bonus
  // e.g. if risk=3 => + (some stats)
  const t=gameState.activeTask;
  let finalReward = t.baseReward;
  // let's do e.g. +1 to a relevant stat
  if(t.taskType==="security"){
    gameState.security=Math.min(gameState.security+5+(t.riskLevel*2),150);
  } else if(t.taskType==="development"){
    gameState.development=Math.min(gameState.development+5+(t.riskLevel*2),150);
  } else {
    gameState.stability=Math.min(gameState.stability+5+(t.riskLevel*2),150);
  }
  // add finalReward to total
  gameState.totalRewards += finalReward;

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/** If we wanted random fail chance, we'd define it and do penalty, but let's skip for brevity. */

/** Scoreboard & Bars **/
function updateScoreboard() {
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
  securityBar.style.width   =(sec /150)*maxW+"px";
  stabilityBar.style.width  =(stab/150)*maxW+"px";
  developmentBar.style.width=(dev /150)*maxW+"px";
}

/** showPopup => for messages */
function showPopup(msg, type="success", duration=3000) {
  const el = document.createElement("div");
  el.classList.add("popup");
  if(type==="error") el.classList.add("error");
  else if(type==="info") el.classList.add("info");
  el.textContent=msg;
  document.getElementById("popup-container").appendChild(el);

  setTimeout(()=> {
    if(el) el.remove();
  }, duration);
}

/** initGame */
function initGame() {
  updateScoreboard();
  // generate some start tasks
  for(let i=0; i<2;i++){
    generateTask();
  }
  renderTasks();
  setupListeners();

  // keep generating tasks every 10s if <10 tasks
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

initGame();
