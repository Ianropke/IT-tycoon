/************************************************************
 * main.js – Dansk læringsudgave
 * 
 * Ændringer:
 * 1. Udvidet tutorial med mission briefing (missionmål).
 * 2. Evaluering af missionmål i slutrapporten.
 * 3. Flere læringselementer med "Mere Info"-knap og tooltips.
 * 4. Forbedret arkitekthjælp: Modal med en liste over anbefalede valg (recommended: true).
 * 5. Dynamiske events, der påvirker gameState med popups.
 ************************************************************/

/* Globale konstanter */
const TIME_COST_HELP = 2;
const MONEY_COST_HELP = 50;
const RISK_REDUCTION_HELP = 0.10;
const TIME_COST_STEP = 2;

/* Hjælpefunktion til DOM-hentning med tjek */
function getElementByIdSafe(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.error(`Element med id "${id}" blev ikke fundet i DOM.`);
  }
  return el;
}

/* Enkel fadeIn-animation for modaler (CSS skal indeholde .fadeIn) */
function animateModal(modal) {
  modal.classList.add('fadeIn');
}

/* Dynamiske events */
const randomEvents = [
  {
    message: "En uventet systemfejl reducerer stabiliteten med 5.",
    effect: () => { applyStatChange("stability", -5); }
  },
  {
    message: "Et positivt initiativ øger sikkerheden med 3.",
    effect: () => { applyStatChange("security", 3); }
  },
  {
    message: "Eksterne konsulenter bidrager med nye idéer og øger udviklingen med 2.",
    effect: () => { applyStatChange("development", 2); }
  },
  {
    message: "Budgetnedskæringer reducerer pengene med 100.",
    effect: () => { applyMoneyCost(100); }
  }
];

let eventInterval;  // til dynamiske events
let taskInterval;   // til opgavegenerering

/* Game state inklusiv missionmål */
let gameState = {
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,
  money: 2000,
  time: 100,
  tasksCompleted: 0,
  activeTask: null,
  availableTasks: [],
  usedTasks: new Set(),
  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,
  lastFinishedTask: null,
  missionGoals: {
    security: 110,
    development: 115
  }
};

// Tekstpool til scenario-småsnak
const scenarioFlavorPool = [
  "Personalet klager over ustabil drift…",
  "En intern revisor snuser rundt efter dokumentationshuller…",
  "En ny leverandør vil sælge dig en hurtig men usikker løsning…",
  "Ledelsen ønsker hurtige resultater, men CAB er skeptisk…"
];

/* HTML-referencer */
const securityValueEl    = getElementByIdSafe('security-value');
const stabilityValueEl   = getElementByIdSafe('stability-value');
const developmentValueEl = getElementByIdSafe('development-value');
const timeLeftEl         = getElementByIdSafe('time-left');
const moneyLeftEl        = getElementByIdSafe('money-left');
const tasksCompletedEl   = getElementByIdSafe('tasks-completed');
const hospitalSatEl      = getElementByIdSafe('hospital-satisfaction');

const scenarioModal        = getElementByIdSafe('scenario-modal');
const scenarioTitle        = getElementByIdSafe('scenario-title');
const scenarioFlavorText   = getElementByIdSafe('scenario-flavor-text');
const scenarioDescription  = getElementByIdSafe('scenario-description');
const scenarioAButton      = getElementByIdSafe('scenario-a-btn');
const scenarioBButton      = getElementByIdSafe('scenario-b-btn');
const scenarioALabel       = getElementByIdSafe('scenario-a-label');
const scenarioAText        = getElementByIdSafe('scenario-a-text');
const scenarioBLabel       = getElementByIdSafe('scenario-b-label');
const scenarioBText        = getElementByIdSafe('scenario-b-text');

const scenarioNarrativeDiv = getElementByIdSafe('scenario-narrative');
const digDeeperLinksDiv    = getElementByIdSafe('dig-deeper-links');

const cabModal     = getElementByIdSafe('cab-modal');
const cabSummary   = getElementByIdSafe('cab-summary');
const cabOkBtn     = getElementByIdSafe('cab-ok-btn');
cabOkBtn.addEventListener('click', () => {
  cabModal.style.display = "none";
  finalizeCABResult();
});

const cabResultModal  = getElementByIdSafe('cab-result-modal');
const cabResultTitle  = getElementByIdSafe('cab-result-title');
const cabResultText   = getElementByIdSafe('cab-result-text');
const cabResultOkBtn  = getElementByIdSafe('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', () => {
  cabResultModal.style.display = "none";
  postCABTechnicalCheck();
});

/* Intro modal */
getElementByIdSafe('intro-ok-btn').addEventListener('click', () => {
  getElementByIdSafe('intro-modal').style.display = 'none';
  openTutorialModal();
});

/* Tutorial modal */
const tutorialModal = getElementByIdSafe('tutorial-modal');
const tutorialTitleEl = getElementByIdSafe('tutorial-title');
const tutorialTextEl = getElementByIdSafe('tutorial-text');
const tutorialNextBtn = getElementByIdSafe('tutorial-next-btn');
let tutorialSteps = [
  {
    title:"Din rolle som LIMS-IT-ansvarlig",
    text:"Du forvalter LIMS i et stort hospital. Hver beslutning koster tid og penge, og CAB holder øje med dig."
  },
  {
    title:"CAB & dokumentation",
    text:"CAB godkender ændringer. Ignorerer du dokumentationen, stiger risikoen. Brug 'Mere Info' for uddybende forklaringer."
  },
  {
    title:"Få arkitekthjælp",
    text:"Få hjælp fra en IT-arkitekt, som tydeliggør de bedste valg for hvert trin og reducerer risikoen."
  },
  {
    title:"Mission briefing",
    text:"Hospitalet har sat mål: Opnå mindst 110 i sikkerhed og 115 i udvikling. Prøv at nå disse mål for ekstra bonus."
  }
];
let tutorialIdx = 0;
function openTutorialModal(){
  tutorialModal.style.display = "flex";
  showTutorialContent();
}
function showTutorialContent(){
  if(tutorialIdx >= tutorialSteps.length){
    tutorialModal.style.display = "none";
    showMissionBriefing();
    return;
  }
  tutorialTitleEl.textContent = tutorialSteps[tutorialIdx].title;
  tutorialTextEl.textContent  = tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click', () => {
  tutorialIdx++;
  showTutorialContent();
});

/* Mission briefing modal (oprettes dynamisk) */
function showMissionBriefing() {
  let missionModal = document.createElement('div');
  missionModal.classList.add('modal');
  missionModal.style.display = "flex";
  missionModal.innerHTML = `
    <div class="modal-content">
      <h2>Mission briefing</h2>
      <p>Hospitalet har sat følgende mål for denne periode:</p>
      <ul>
        <li>Sikkerhed: mindst ${gameState.missionGoals.security}</li>
        <li>Udvikling: mindst ${gameState.missionGoals.development}</li>
      </ul>
      <p>Prøv at opnå eller overgå disse mål for ekstra bonus!</p>
      <button class="commit-button" id="mission-close-btn">Luk</button>
    </div>
  `;
  document.body.appendChild(missionModal);
  animateModal(missionModal);
  getElementByIdSafe('mission-close-btn').addEventListener('click', () => {
    missionModal.remove();
    initGame();
  });
}

/* Dynamiske events */
function triggerRandomEvent() {
  let event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
  event.effect();
  showPopup(event.message, "info", 4000);
}

/* End-of-game modal */
const endModal = getElementByIdSafe('end-modal');
const endGameSummary = getElementByIdSafe('end-game-summary');
const endOkBtn = getElementByIdSafe('end-ok-btn');
endOkBtn.addEventListener('click', () => {
  endModal.style.display = "none";
});

/* Task summary modal */
const taskSummaryModal = getElementByIdSafe('task-summary-modal');
const taskSummaryText = getElementByIdSafe('task-summary-text');
getElementByIdSafe('task-summary-ok-btn').addEventListener('click', () => {
  taskSummaryModal.style.display = "none";
  renderTasks();
});

/* Task list referencer */
const tasksList = getElementByIdSafe('tasks-list');
const activeTaskHeadline = getElementByIdSafe('active-task-headline');
const activeTaskDesc = getElementByIdSafe('active-task-description');
const stepsList = getElementByIdSafe('steps-list');

/* Location referencer */
const locMap = {
  hospital: getElementByIdSafe('hospital'),
  infrastruktur: getElementByIdSafe('infrastruktur'),
  cybersikkerhed: getElementByIdSafe('cybersikkerhed'),
  informationssikkerhed: getElementByIdSafe('informationssikkerhed'),
  "it-jura": getElementByIdSafe('it-jura'),
  leverandor: getElementByIdSafe('leverandor'),
  "medicinsk-udstyr": getElementByIdSafe('medicinsk-udstyr'),
  dokumentation: getElementByIdSafe('dokumentation')
};
Object.entries(locMap).forEach(([key, el]) => {
  el.addEventListener('click', () => {
    handleLocationClick(key);
  });
});

/* initGame */
function initGame(){
  updateScoreboard();
  window.backlog = [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  console.log("Backlog length:", window.backlog.length);
  
  // Generér 3 opgaver som start
  for(let i = 0; i < 3; i++){
    generateTask();
  }
  taskInterval = setInterval(() => {
    if(gameState.availableTasks.length < 10){
      generateTask();
    }
  }, 10000);
  eventInterval = setInterval(triggerRandomEvent, 15000);
}

function generateTask(){
  if(gameState.availableTasks.length >= 10) return;
  let notUsed = window.backlog.filter(t => !gameState.usedTasks.has(t.title));
  if(!notUsed.length) {
    console.log("Ingen nye opgaver at tilføje");
    return;
  }
  let chosen = notUsed[Math.floor(Math.random() * notUsed.length)];
  gameState.usedTasks.add(chosen.title);
  
  let newTask;
  if (typeof structuredClone === 'function') {
    newTask = structuredClone(chosen);
  } else {
    newTask = JSON.parse(JSON.stringify(chosen));
  }
  
  if (newTask.steps.length < 3) {
    console.warn(`Opgaven "${newTask.title}" har mindre end 3 trin.`);
  } else if(newTask.steps.length > 6) {
    console.warn(`Opgaven "${newTask.title}" har flere end 6 trin. Kun de første 6 anvendes.`);
    newTask.steps = newTask.steps.slice(0, 6);
  }
  
  newTask.currentStep = 0;
  newTask.preRiskReduction = 0;
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function updateScoreboard(){
  calcHospitalSatisfaction();
  timeLeftEl.textContent = gameState.time;
  moneyLeftEl.textContent = gameState.money;
  tasksCompletedEl.textContent = gameState.tasksCompleted;
  securityValueEl.textContent = gameState.security;
  stabilityValueEl.textContent = gameState.stability;
  developmentValueEl.textContent = gameState.development;
  hospitalSatEl.textContent = Math.round(gameState.hospitalSatisfaction);
}

function calcHospitalSatisfaction(){
  let avg = (gameState.security + gameState.stability + gameState.development) / 3;
  let penalty = 0;
  if(gameState.money < 0){
    penalty = Math.floor(Math.abs(gameState.money) / 100) * 2;
  }
  let newVal = avg - penalty;
  gameState.hospitalSatisfaction = Math.max(0, Math.min(newVal, 150));
}

function renderTasks(){
  tasksList.innerHTML = "";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML = "<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t => {
    let li = document.createElement('li');
    li.innerHTML = `<strong>${t.title}</strong><br/>${t.shortDesc || "Ingen beskrivelse"}`;
    
    let helpBtn = document.createElement('button');
    helpBtn.textContent = "Få arkitekthjælp";
    helpBtn.classList.add('commit-button');
    helpBtn.style.marginRight = "6px";
    helpBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      getArchitectHelp(t);
    });
    
    let comBtn = document.createElement('button');
    comBtn.textContent = "Forpligt";
    comBtn.classList.add('commit-button');
    comBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      assignTask(t.title);
    });
    
    li.appendChild(helpBtn);
    li.appendChild(comBtn);
    tasksList.appendChild(li);
  });
}

/* Arkitekthjælp: Vis modal med anbefalede valg */
function getArchitectHelp(taskObj) {
  if(gameState.time < TIME_COST_HELP) {
    showPopup("Du har ikke nok tid til at få arkitekthjælp!", "error");
    return;
  }
  if(gameState.money < MONEY_COST_HELP) {
    showPopup("Du har ikke nok penge til arkitekthjælp!", "error");
    return;
  }
  applyTimeCost(TIME_COST_HELP);
  applyMoneyCost(MONEY_COST_HELP);
  taskObj.preRiskReduction += RISK_REDUCTION_HELP;
  
  let recFeedback = "<ul>";
  taskObj.steps.forEach((step, index) => {
    let recChoice = "";
    if (step.choiceA.recommended) {
      recChoice = step.choiceA.label;
    } else if (step.choiceB.recommended) {
      recChoice = step.choiceB.label;
    }
    if (recChoice) {
      recFeedback += `<li>Trin ${index + 1}: ${recChoice}</li>`;
    }
  });
  recFeedback += "</ul>";
  
  let architectModal = document.createElement('div');
  architectModal.classList.add('modal');
  architectModal.style.display = "flex";
  architectModal.innerHTML = `
    <div class="modal-content architect-modal">
      <h2>Arkitekthjælp – Anbefalede valg</h2>
      <p>Vores IT-arkitekt anbefaler følgende løsninger for at minimere risikoen:</p>
      ${recFeedback}
      <p>Denne gennemgang reducerer den samlede risiko med ${(RISK_REDUCTION_HELP * 100).toFixed(0)}%.</p>
      <button class="commit-button" id="architect-close-btn">Luk</button>
    </div>
  `;
  document.body.appendChild(architectModal);
  animateModal(architectModal);
  getElementByIdSafe('architect-close-btn').addEventListener('click', () => {
    architectModal.remove();
  });
}

function assignTask(taskTitle){
  if(gameState.activeTask){
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.time <= 0){
    endGame();
    return;
  }
  let idx = gameState.availableTasks.findIndex(x => x.title === taskTitle);
  if(idx === -1) return;
  let chosen = gameState.availableTasks.splice(idx, 1)[0];
  gameState.activeTask = chosen;
  activeTaskHeadline.textContent = chosen.title;
  activeTaskDesc.textContent = chosen.logicLong || chosen.shortDesc;
  updateStepsList();
  renderTasks();
}

function updateStepsList(){
  stepsList.innerHTML = "";
  if(!gameState.activeTask){
    stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
    return;
  }
  let c = gameState.activeTask.currentStep || 0;
  gameState.activeTask.steps.forEach((st, i) => {
    let li = document.createElement('li');
    li.textContent = `Trin ${i + 1}: ${st.location}`;
    if(i < c){
      li.style.textDecoration = "line-through";
      li.style.color = "#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  if(gameState.time <= 0){
    endGame();
    return;
  }
  let i = gameState.activeTask.currentStep;
  if(i >= gameState.activeTask.steps.length) return;
  let needed = gameState.activeTask.steps[i].location;
  if(locName !== needed){
    if(needed === "dokumentation"){
      gameState.docSkipCount++;
      showPopup("Du sprang dokumentationen over – risikoen stiger!", "error");
    } else {
      showPopup("Forkert lokation – prøv igen!", "info");
    }
    return;
  }
  showScenarioModal(i);
}

function showScenarioModal(stepIndex){
  scenarioModal.style.display = "flex";
  let t = gameState.activeTask;
  let st = t.steps[stepIndex];
  
  if(t.narrativeIntro){
    scenarioNarrativeDiv.style.display = "block";
    scenarioNarrativeDiv.innerHTML = t.narrativeIntro;
  } else {
    scenarioNarrativeDiv.style.display = "none";
  }
  
  scenarioTitle.textContent = `Trin ${stepIndex + 1}: ${st.location}`;
  scenarioFlavorText.textContent = scenarioFlavorPool[Math.floor(Math.random() * scenarioFlavorPool.length)];
  scenarioDescription.innerHTML = st.stepDescription || "Standard scenarie...";
  
  digDeeperLinksDiv.innerHTML = "";
  if(t.learningInfo) {
    digDeeperLinksDiv.style.display = "block";
    let moreInfoBtn = document.createElement('button');
    moreInfoBtn.textContent = "Mere Info";
    moreInfoBtn.classList.add('commit-button');
    moreInfoBtn.style.marginTop = "10px";
    moreInfoBtn.onclick = () => {
      showLearningInfo(t.learningInfo);
    };
    digDeeperLinksDiv.appendChild(moreInfoBtn);
  } else {
    digDeeperLinksDiv.style.display = "none";
  }
  
  scenarioALabel.textContent = st.choiceA.label;
  scenarioAText.innerHTML = st.choiceA.text;
  scenarioAButton.onclick = () => {
    applyChoiceEffect(st.choiceA.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display = "none";
  };
  scenarioBLabel.textContent = st.choiceB.label;
  scenarioBText.innerHTML = st.choiceB.text;
  scenarioBButton.onclick = () => {
    applyChoiceEffect(st.choiceB.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display = "none";
  };
}

function showLearningInfo(infoText) {
  let infoModal = document.createElement('div');
  infoModal.classList.add('modal');
  infoModal.style.display = "flex";
  infoModal.innerHTML = `
    <div class="modal-content">
      <h2>Læringsinformation</h2>
      <p>${infoText || "Ingen ekstra information tilgængelig."}</p>
      <button class="commit-button" id="learning-info-close">Luk</button>
    </div>
  `;
  document.body.appendChild(infoModal);
  animateModal(infoModal);
  getElementByIdSafe('learning-info-close').addEventListener('click', () => {
    infoModal.remove();
  });
}

function applyChoiceEffect(eff){
  if(!eff) return;
  if(eff.timeCost)  applyTimeCost(eff.timeCost);
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost);
  if(eff.riskyPlus) gameState.riskyTotal += eff.riskyPlus;
  if(eff.statChange){
    for(let [stat, delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
  if(eff.synergyEffect){
    // Eventuel håndtering af synergyEffect
  }
}

function applyTimeCost(t){
  gameState.time = Math.max(gameState.time - t, 0);
  updateScoreboard();
  if(gameState.time <= 0){
    endGame();
  }
}

function applyMoneyCost(m){
  gameState.money = Math.max(gameState.money - m, -99999);
  updateScoreboard();
}

function applyStatChange(stat, delta){
  gameState[stat] = Math.min(Math.max(gameState[stat] + delta, 0), 150);
  updateScoreboard();
  showFloatingText((delta >= 0 ? `+${delta}` : `${delta}`) + " " + stat, stat);
}

function finalizeStep(stepIndex){
  let t = gameState.activeTask;
  if(!t) return;
  t.currentStep++;
  applyTimeCost(TIME_COST_STEP);
  updateStepsList();
  
  if(t.currentStep >= t.steps.length){
    if(t.preRiskReduction > 0){
      gameState.riskyTotal = Math.max(gameState.riskyTotal - t.preRiskReduction, 0);
      showPopup(`Arkitekthjælpen reducerede risikoen med ${(t.preRiskReduction * 100).toFixed(0)}%!`, "info", 4000);
    }
    showCABModal();
  }
}

function showCABModal(){
  let fail = gameState.riskyTotal + (gameState.docSkipCount * 0.05);
  if(fail > 1) fail = 1;
  gameState.finalFailChance = fail;
  cabModal.style.display = "flex";
  cabSummary.innerHTML = `
    <strong>CAB-gennemgang</strong><br/>
    Risiko pga. hurtige/billige valg: ${(gameState.riskyTotal * 100).toFixed(0)}%<br/>
    Du har sprunget dokumentationen over: ${gameState.docSkipCount} gange => +${(gameState.docSkipCount * 5)}%<br/>
    Samlet fejlchance: ${(fail * 100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display = "none";
  let r = Math.random();
  if(r < gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display = "flex";
  if(isSuccess){
    cabResultTitle.textContent = "CAB: Godkendt!";
    cabResultText.textContent = "CAB mener, at ændringerne kan gennemføres.";
  } else {
    cabResultTitle.textContent = "CAB: Afvist!";
    cabResultText.textContent = "For stor risiko eller for lidt dokumentation. Opgaven mislykkes.";
    failTaskCAB();
  }
}

function postCABTechnicalCheck(){
  if(!gameState.activeTask) return;
  cabResultModal.style.display = "none";
  let driftFail = gameState.riskyTotal * 0.3;
  if(Math.random() < driftFail){
    showPopup("Implementeringen fejlede i praksis!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability", -5);
    endActiveTask();
  } else {
    showPopup("Drifts-tjek lykkedes!", "success");
    completeTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction", -10);
  endActiveTask();
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  gameState.lastFinishedTask = gameState.activeTask;
  endActiveTask();
}

function endActiveTask(){
  if(!gameState.activeTask) return;
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
  showTaskSummaryModal();
}

function showTaskSummaryModal(){
  let s = gameState.security;
  let st = gameState.stability;
  let d = gameState.development;
  let h = Math.round(gameState.hospitalSatisfaction);
  let money = gameState.money;
  
  let goalFeedback = "";
  if(gameState.security >= gameState.missionGoals.security) {
    goalFeedback += "Sikkerheden er opnået! ";
  } else {
    goalFeedback += `Sikkerheden er under målet (${gameState.security} vs. ${gameState.missionGoals.security}). `;
  }
  if(gameState.development >= gameState.missionGoals.development) {
    goalFeedback += "Udviklingen er opnået!";
  } else {
    goalFeedback += `Udviklingen er under målet (${gameState.development} vs. ${gameState.missionGoals.development}).`;
  }
  
  taskSummaryText.innerHTML = `
    <strong>Opgave fuldført!</strong><br/>
    Aktuelle værdier:<br/>
    Sikkerhed = ${s}, Stabilitet = ${st}, Udvikling = ${d}, 
    Hospitalstilfredshed = ${h}%, Penge = ${money}<br/><br/>
    <strong>Mission Feedback:</strong><br/>${goalFeedback}
  `;
  
  let lastT = gameState.lastFinishedTask;
  if(lastT && lastT.knowledgeRecap){
    let recapDiv = document.createElement('div');
    recapDiv.style.marginTop = "8px";
    recapDiv.innerHTML = `
      <hr/>
      <strong>Vidensopsummering:</strong><br/>
      ${lastT.knowledgeRecap}
    `;
    taskSummaryText.appendChild(recapDiv);
  }
  taskSummaryModal.style.display = "flex";
}

function endGame(){
  showPopup("Tiden er brugt op!", "info", 3000);
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  clearInterval(taskInterval);
  clearInterval(eventInterval);
  
  let sumText = `
    <strong>Slutresultat:</strong><br/>
    Resterende penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilfredshed: ${gameState.hospitalSatisfaction}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/><br/>
    <strong>Mission Feedback:</strong><br/>
  `;
  if(gameState.security >= gameState.missionGoals.security) {
    sumText += "Sikkerheden er opnået!<br/>";
  } else {
    sumText += `Sikkerheden er under målet (${gameState.security} vs. ${gameState.missionGoals.security}).<br/>`;
  }
  if(gameState.development >= gameState.missionGoals.development) {
    sumText += "Udviklingen er opnået!";
  } else {
    sumText += `Udviklingen er under målet (${gameState.development} vs. ${gameState.missionGoals.development}).`;
  }
  
  endModal.style.display = "flex";
  endGameSummary.innerHTML = sumText;
}

function showPopup(msg, type="success", duration=3000){
  const c = getElementByIdSafe('popup-container');
  let div = document.createElement('div');
  div.classList.add('popup');
  if(type === "error") div.classList.add('error');
  else if(type === "info") div.classList.add('info');
  div.style.animation = "none";
  div.textContent = msg;
  c.appendChild(div);
  setTimeout(() => div.remove(), duration);
}

function showFloatingText(txt, stat){
  const fc = getElementByIdSafe('floating-text-container');
  let div = document.createElement('div');
  div.classList.add('floating-text');
  div.style.left = "50%";
  div.style.top = "50%";
  if(stat === "security") div.style.color = "#ff4444";
  else if(stat === "stability") div.style.color = "#44ff44";
  else if(stat === "development") div.style.color = "#4444ff";
  else if(stat === "hospitalSatisfaction") div.style.color = "#ffc107";
  else div.style.color = "#ffffff";
  div.textContent = txt;
  fc.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}
