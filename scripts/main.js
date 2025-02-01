/************************************************************
 * main.js – Dansk Læringsudgave
 * 
 * Al tekst i UI og pop-ups er oversat til dansk.
 * Variabler og funktioner er på engelsk for at undgå fejl.
 * 
 * Opdateringer:
 * - Brug af globale konstanter for tids-, penge- og risikoværdier.
 * - Rydning af interval ved spilslut.
 * - Feedback ved forkert lokationsvalg samt opdatering af docSkipCount.
 * - Robusthedstjek for DOM-elementer.
 * - Forsøg på at bruge structuredClone ved kopiering af task-objekter.
 ************************************************************/

/* Globale konstanter */
const TIME_COST_INVESTIGATE = 1;
const MONEY_COST_INVESTIGATE = 20;
const RISK_REDUCTION_INVESTIGATE = 0.05;
const TIME_COST_STEP = 2;

/* Hjælpefunktion til DOM-hentning med tjek */
function getElementByIdSafe(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.error(`Element med id "${id}" blev ikke fundet i DOM.`);
  }
  return el;
}

/* Global variabel til interval */
let taskInterval;

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

  lastFinishedTask: null
};

// Tekstpool til scenario-småsnak
const scenarioFlavorPool = [
  "Personalet klager over ustabil drift…",
  "En intern revisor snuser rundt efter dokumentationshuller…",
  "En ny leverandør vil sælge dig en hurtig men usikker løsning…",
  "Ledelsen ønsker hurtige resultater, men CAB er skeptisk…"
];

// HTML-referencer
const securityValueEl    = getElementByIdSafe('security-value');
const stabilityValueEl   = getElementByIdSafe('stability-value');
const developmentValueEl = getElementByIdSafe('development-value');
const timeLeftEl         = getElementByIdSafe('time-left');
const moneyLeftEl        = getElementByIdSafe('money-left');
const tasksCompletedEl   = getElementByIdSafe('tasks-completed');
const hospitalSatEl      = getElementByIdSafe('hospital-satisfaction');

// Scenario-modal
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

// CAB
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

// Intro
getElementByIdSafe('intro-ok-btn').addEventListener('click', () => {
  getElementByIdSafe('intro-modal').style.display = 'none';
  openTutorialModal();
});

// Tutorial
const tutorialModal    = getElementByIdSafe('tutorial-modal');
const tutorialTitleEl  = getElementByIdSafe('tutorial-title');
const tutorialTextEl   = getElementByIdSafe('tutorial-text');
const tutorialNextBtn  = getElementByIdSafe('tutorial-next-btn');
let tutorialSteps = [
  {
    title:"Din rolle som LIMS-IT-ansvarlig",
    text:"Du forvalter LIMS i et stort hospital. Du har tid og penge at styre efter. Hver beslutning koster tid/penge, og CAB kigger med."
  },
  {
    title:"CAB & Dokumentation",
    text:"CAB (Change Advisory Board) godkender ændringer. Springer du dok. over, stiger risiko. Udforsk ‘Grav Dybere’-knapper for forklaringer!"
  },
  {
    title:"Undersøg opgaver",
    text:"Du kan ‘Undersøge’ en opgave for at nedbringe risiko, men det koster tid/penge. Ofte investeringen værd."
  },
  {
    title:"Grav Dybere for læring",
    text:"Ser du ‘Mere Info’-knapper eller historietekst, klik endelig. Som nyansat kan du lære en masse detaljer. Held og lykke!"
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
    initGame();
    return;
  }
  tutorialTitleEl.textContent = tutorialSteps[tutorialIdx].title;
  tutorialTextEl.textContent  = tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click', () => {
  tutorialIdx++;
  showTutorialContent();
});

// Tids-slut
const endModal       = getElementByIdSafe('end-modal');
const endGameSummary = getElementByIdSafe('end-game-summary');
const endOkBtn       = getElementByIdSafe('end-ok-btn');
endOkBtn.addEventListener('click', () => {
  endModal.style.display = "none";
});

// Opgave-sammenfatning
const taskSummaryModal = getElementByIdSafe('task-summary-modal');
const taskSummaryText  = getElementByIdSafe('task-summary-text');
getElementByIdSafe('task-summary-ok-btn').addEventListener('click', () => {
  taskSummaryModal.style.display = "none";
  renderTasks(); // vis mulige opgaver igen
});

// Referencer til task-lister
const tasksList          = getElementByIdSafe('tasks-list');
const activeTaskHeadline = getElementByIdSafe('active-task-headline');
const activeTaskDesc     = getElementByIdSafe('active-task-description');
const stepsList          = getElementByIdSafe('steps-list');

// Location-referencer
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

// initGame
function initGame(){
  updateScoreboard();
  // Sæt backlog fra de globale task-filer (cybersikkerhedTasks, hospitalTasks, infrastrukturTasks osv.)
  window.backlog = [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  // Generér nogle startopgaver
  for(let i = 0; i < 3; i++){
    generateTask();
  }
  // Spawn opgaver over tid – gem interval-id’et for at rydde op senere
  taskInterval = setInterval(() => {
    if(gameState.availableTasks.length < 10){
      generateTask();
    }
  }, 10000);
}

function generateTask(){
  if(gameState.availableTasks.length >= 10) return;
  let notUsed = window.backlog.filter(t => !gameState.usedTasks.has(t.title));
  if(!notUsed.length) return;
  let chosen = notUsed[Math.floor(Math.random() * notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  // Lav en dyb kopi af task-objektet.
  let newTask;
  if (typeof structuredClone === 'function') {
    newTask = structuredClone(chosen);
  } else {
    newTask = JSON.parse(JSON.stringify(chosen));
  }
  
  newTask.currentStep = 0;
  newTask.preRiskReduction = 0; // akkumuleret ved "Undersøg"
  gameState.availableTasks.push(newTask);
  renderTasks();
}

// Scoreboard
function updateScoreboard(){
  calcHospitalSatisfaction();
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  tasksCompletedEl.textContent = gameState.tasksCompleted;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent = gameState.development;
  hospitalSatEl.textContent     = Math.round(gameState.hospitalSatisfaction);
}

// HospitalsTilfredshed
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

    // Undersøg-knap
    let invBtn = document.createElement('button');
    invBtn.textContent = "Undersøg";
    invBtn.classList.add('commit-button');
    invBtn.style.marginRight = "6px";
    invBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      investigateTask(t);
    });

    // Forpligt-knap
    let comBtn = document.createElement('button');
    comBtn.textContent = "Forpligt";
    comBtn.classList.add('commit-button');
    comBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      assignTask(t.title);
    });

    li.appendChild(invBtn);
    li.appendChild(comBtn);
    tasksList.appendChild(li);
  });
}

function investigateTask(taskObj){
  if(gameState.time < TIME_COST_INVESTIGATE){
    showPopup("Du har ikke nok tid til at undersøge!", "error");
    return;
  }
  if(gameState.money < MONEY_COST_INVESTIGATE){
    showPopup("Du har ikke nok penge til at undersøge!", "error");
    return;
  }
  applyTimeCost(TIME_COST_INVESTIGATE);
  applyMoneyCost(MONEY_COST_INVESTIGATE);
  taskObj.preRiskReduction += RISK_REDUCTION_INVESTIGATE;
  showPopup(`Undersøgelse: -${TIME_COST_INVESTIGATE} tid, -${MONEY_COST_INVESTIGATE} kr, risiko -${(RISK_REDUCTION_INVESTIGATE * 100)}%`, "info", 4000);
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

// Lokationsklik – med feedback ved forkert valg og håndtering af docSkipCount
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

  // Narrative-intro
  if(t.narrativeIntro){
    scenarioNarrativeDiv.style.display = "block";
    scenarioNarrativeDiv.innerHTML = t.narrativeIntro;
  } else {
    scenarioNarrativeDiv.style.display = "none";
  }

  scenarioTitle.textContent = `Trin ${stepIndex + 1}: ${st.location}`;
  scenarioFlavorText.textContent = scenarioFlavorPool[Math.floor(Math.random() * scenarioFlavorPool.length)];
  scenarioDescription.innerHTML = st.stepDescription || "Standard scenarie...";

  // Grav Dybere-knapper
  digDeeperLinksDiv.innerHTML = "";
  if(t.digDeeperLinks && t.digDeeperLinks.length){
    digDeeperLinksDiv.style.display = "block";
    t.digDeeperLinks.forEach(linkObj => {
      let btn = document.createElement('button');
      btn.classList.add('commit-button');
      btn.textContent = "Mere info: " + linkObj.label;
      btn.onclick = () => window.open(linkObj.url, "_blank");
      digDeeperLinksDiv.appendChild(btn);
    });
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
    // fx synergyEffect:{lackInfra:true} – gem evt. i gameState for senere brug
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
  applyTimeCost(TIME_COST_STEP); // tid for at udføre et trin
  updateStepsList();

  if(t.currentStep >= t.steps.length){
    // Anvend forundersøgelses-effekten
    if(t.preRiskReduction > 0){
      gameState.riskyTotal = Math.max(gameState.riskyTotal - t.preRiskReduction, 0);
      showPopup(`Din undersøgelse gav -${(t.preRiskReduction * 100).toFixed(0)}% risiko!`, "info", 4000);
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
    Du har sprunget dokumentation over: ${gameState.docSkipCount} gange => +${(gameState.docSkipCount * 5)}%<br/>
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
  // Tjek om der stadig er en aktiv opgave – hvis opgaven allerede er afsluttet, så returner
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
  // Gem den netop afsluttede opgave, så vi kan vise en vidensopsummering
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

  taskSummaryText.innerHTML = `
    <strong>Opgave fuldført!</strong><br/>
    Aktuelle værdier:<br/>
    Sikkerhed=${s}, Stabilitet=${st}, Udvikling=${d}, 
    Hospitalstilfredshed=${h}%, Penge=${money}
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

// Slut spil
function endGame(){
  showPopup("Tiden er brugt op!", "info", 3000);
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";

  // Stop opgavegenererings-intervallet
  clearInterval(taskInterval);

  endModal.style.display = "flex";
  let sumText = `
    <strong>Slutresultat:</strong><br/>
    Resterende penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilfredshed: ${gameState.hospitalSatisfaction}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML = sumText;
}

// showPopup
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

// Flyvende tekst
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
