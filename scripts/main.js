/************************************************************
 * main.js – Udvidet version med Arkitekthjælp, “Mere Info” og tooltips
 ************************************************************/

// Sørg for, at de nødvendige task-variabler er defineret som arrays
window.cybersikkerhedTasks = window.cybersikkerhedTasks || [];
window.hospitalTasks = window.hospitalTasks || [];
window.infrastrukturTasks = window.infrastrukturTasks || [];

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

const missionGoals = {
  security: 110,
  development: 115
};

const scenarioFlavorPool = [
  "Personalet klager over ustabil drift…",
  "En intern revisor snuser rundt efter dokumentationshuller…",
  "En ny leverandør vil sælge dig en hurtig men usikker løsning…",
  "Ledelsen ønsker hurtige resultater, men CAB er skeptisk…"
];

// HTML-referencer
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');
const tasksCompletedEl   = document.getElementById('tasks-completed');
const hospitalSatEl      = document.getElementById('hospital-satisfaction');

// Modal-referencer
const introModal      = document.getElementById('intro-modal');
const tutorialModal   = document.getElementById('tutorial-modal');
const scenarioModal   = document.getElementById('scenario-modal');
const cabModal        = document.getElementById('cab-modal');
const cabResultModal  = document.getElementById('cab-result-modal');
const endModal        = document.getElementById('end-modal');
const taskSummaryModal = document.getElementById('task-summary-modal');
const architectModal  = document.getElementById('architect-modal'); // Arkitekthjælp-modal
const moreInfoModal   = document.getElementById('more-info-modal');   // "Mere Info"-modal

// Modal-indholdselementer
const scenarioTitle        = document.getElementById('scenario-title');
const scenarioFlavorText   = document.getElementById('scenario-flavor-text');
const scenarioDescription  = document.getElementById('scenario-description');
const scenarioAButton      = document.getElementById('scenario-a-btn');
const scenarioBButton      = document.getElementById('scenario-b-btn');
const scenarioALabel       = document.getElementById('scenario-a-label');
const scenarioAText        = document.getElementById('scenario-a-text');
const scenarioBLabel       = document.getElementById('scenario-b-label');
const scenarioBText        = document.getElementById('scenario-b-text');
const scenarioNarrativeDiv = document.getElementById('scenario-narrative');
const digDeeperLinksDiv    = document.getElementById('dig-deeper-links');
const cabSummary           = document.getElementById('cab-summary');
const cabResultTitle       = document.getElementById('cab-result-title');
const cabResultText        = document.getElementById('cab-result-text');
const endGameSummary       = document.getElementById('end-game-summary');
const taskSummaryText      = document.getElementById('task-summary-text');
const architectContent     = document.getElementById('architect-content');
const moreInfoContent      = document.getElementById('more-info-content');

// Knap-referencer
const tutorialTitleEl = document.getElementById('tutorial-title');
const tutorialTextEl  = document.getElementById('tutorial-text');
const tutorialNextBtn = document.getElementById('tutorial-next-btn');
const architectHelpBtn = document.getElementById('architect-help-btn');
const scenarioAMoreInfoBtn = document.getElementById('scenario-a-more-info');
const scenarioBMoreInfoBtn = document.getElementById('scenario-b-more-info');
const moreInfoCloseBtn = document.getElementById('more-info-close-btn');

// Tutorial-steps
let tutorialSteps = [
  {
    title: "Din rolle som LIMS-IT-ansvarlig",
    text: "Du forvalter <span class='hoverTooltip' data-tooltip='Laboratory Information Management System'>LIMS</span> på et stort hospital. Du styrer tid og penge, og hver beslutning har konsekvenser."
  },
  {
    title: "CAB & Dokumentation",
    text: "CAB (Change Advisory Board) godkender ændringer. Springer du dokumentation over, stiger risikoen. Udforsk ‘Grav Dybere’-knapper for forklaringer!"
  },
  {
    title: "Mission briefing",
    text: `Dine missioner er: opnå mindst ${missionGoals.security} i sikkerhed og ${missionGoals.development} i udvikling.`
  }
];
let tutorialIdx = 0;
function openTutorialModal(){
  tutorialModal.style.display = "flex";
  tutorialModal.classList.add("fadeIn");
  showTutorialContent();
}
function showTutorialContent(){
  if (tutorialIdx >= tutorialSteps.length) {
    tutorialModal.style.display = "none";
    initGame();
    return;
  }
  tutorialTitleEl.innerHTML = tutorialSteps[tutorialIdx].title;
  tutorialTextEl.innerHTML  = tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click', () => {
  tutorialIdx++;
  showTutorialContent();
});

// Intro-modal knap
document.getElementById('intro-ok-btn').addEventListener('click', () => {
  introModal.style.display = "none";
  openTutorialModal();
});

// CAB-modaler
document.getElementById('cab-ok-btn').addEventListener('click', () => {
  cabModal.style.display = "none";
  finalizeCABResult();
});
document.getElementById('cab-result-ok-btn').addEventListener('click', () => {
  cabResultModal.style.display = "none";
  postCABTechnicalCheck();
});

// End-modal knap
document.getElementById('end-ok-btn').addEventListener('click', () => {
  endModal.style.display = "none";
});

// Task-sammenfatningsmodal
document.getElementById('task-summary-ok-btn').addEventListener('click', () => {
  taskSummaryModal.style.display = "none";
  renderTasks();
});

// Arkitekthjælp-knap
architectHelpBtn.addEventListener('click', () => {
  if (!gameState.activeTask) {
    showPopup("Ingen aktiv opgave!", "error");
    return;
  }
  if (gameState.activeTask.architectUsed) {
    showPopup("Du har allerede brugt arkitekthjælp for denne opgave!", "error");
    return;
  }
  showArchitectModal();
});

// Luk "Mere Info"-modal
moreInfoCloseBtn.addEventListener('click', () => {
  moreInfoModal.style.display = "none";
});

// Lokationsreferencer
const locMap = {
  hospital: document.getElementById('hospital'),
  infrastruktur: document.getElementById('infrastruktur'),
  cybersikkerhed: document.getElementById('cybersikkerhed'),
  informationssikkerhed: document.getElementById('informationssikkerhed'),
  "it-jura": document.getElementById('it-jura'),
  leverandor: document.getElementById('leverandor'),
  "medicinsk-udstyr": document.getElementById('medicinsk-udstyr'),
  dokumentation: document.getElementById('dokumentation')
};
Object.entries(locMap).forEach(([key, el]) => {
  el.addEventListener('click', () => {
    handleLocationClick(key);
  });
});

// InitGame – sørg for at bruge fallback for task-arrays
function initGame(){
  window.backlog = [
    ...(window.cybersikkerhedTasks || []),
    ...(window.hospitalTasks || []),
    ...(window.infrastrukturTasks || [])
  ];
  updateScoreboard();
  for (let i = 0; i < 3; i++){
    generateTask();
  }
  setInterval(() => {
    if (gameState.availableTasks.length < 10) {
      generateTask();
    }
  }, 10000);
  setInterval(triggerRandomEvent, 20000);
}

// Generate task
function generateTask(){
  if (gameState.availableTasks.length >= 10) return;
  let notUsed = window.backlog.filter(t => !gameState.usedTasks.has(t.title));
  if (!notUsed.length) return;
  let chosen = notUsed[Math.floor(Math.random() * notUsed.length)];
  gameState.usedTasks.add(chosen.title);
  let newTask = JSON.parse(JSON.stringify(chosen));
  newTask.currentStep = 0;
  newTask.preRiskReduction = 0;
  newTask.architectUsed = false;
  gameState.availableTasks.push(newTask);
  renderTasks();
}

// Update scoreboard og hospitalstilfredshed
function updateScoreboard(){
  calcHospitalSatisfaction();
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  tasksCompletedEl.textContent = gameState.tasksCompleted;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
  hospitalSatEl.textContent     = Math.round(gameState.hospitalSatisfaction);
}
function calcHospitalSatisfaction(){
  let avg = (gameState.security + gameState.stability + gameState.development) / 3;
  let penalty = gameState.money < 0 ? Math.floor(Math.abs(gameState.money)/100)*2 : 0;
  let newVal = avg - penalty;
  gameState.hospitalSatisfaction = Math.max(0, Math.min(newVal, 150));
}

// Render tasks i opgavelisten
function renderTasks(){
  const tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = "";
  if (!gameState.availableTasks.length){
    tasksList.innerHTML = "<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t => {
    let li = document.createElement('li');
    li.innerHTML = `<strong>${t.title}</strong><br/>${t.shortDesc || "Ingen beskrivelse"}`;
    let comBtn = document.createElement('button');
    comBtn.textContent = "Forpligt";
    comBtn.classList.add('commit-button');
    comBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      assignTask(t.title);
    });
    li.appendChild(comBtn);
    tasksList.appendChild(li);
  });
}

// Tildel opgave
function assignTask(taskTitle){
  if (gameState.activeTask){
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  if (gameState.time <= 0){
    endGame();
    return;
  }
  let idx = gameState.availableTasks.findIndex(x => x.title === taskTitle);
  if (idx === -1) return;
  let chosen = gameState.availableTasks.splice(idx, 1)[0];
  gameState.activeTask = chosen;
  document.getElementById('active-task-headline').textContent = chosen.title;
  document.getElementById('active-task-description').textContent = chosen.logicLong || chosen.shortDesc;
  updateStepsList();
  renderTasks();
}

// Update trin i opgaven
function updateStepsList(){
  const stepsList = document.getElementById('steps-list');
  stepsList.innerHTML = "";
  if (!gameState.activeTask){
    stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
    return;
  }
  let c = gameState.activeTask.currentStep || 0;
  gameState.activeTask.steps.forEach((st, i) => {
    let li = document.createElement('li');
    li.textContent = `Trin ${i+1}: ${st.location}`;
    if (i < c){
      li.style.textDecoration = "line-through";
      li.style.color = "#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

// Håndter klik på lokationer
function handleLocationClick(locName){
  if (!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  if (gameState.time <= 0){
    endGame();
    return;
  }
  let i = gameState.activeTask.currentStep;
  if (i >= gameState.activeTask.steps.length) return;
  let needed = gameState.activeTask.steps[i].location;
  if (locName !== needed) return;
  showScenarioModal(i);
}

// Vis scenario-modal for det aktuelle trin
function showScenarioModal(stepIndex){
  scenarioModal.style.display = "flex";
  scenarioModal.classList.add("fadeIn");
  let t = gameState.activeTask;
  let st = t.steps[stepIndex];
  if (t.narrativeIntro){
    scenarioNarrativeDiv.style.display = "block";
    scenarioNarrativeDiv.innerHTML = t.narrativeIntro;
  } else {
    scenarioNarrativeDiv.style.display = "none";
  }
  scenarioTitle.textContent = `Trin ${stepIndex+1}: ${st.location}`;
  scenarioFlavorText.textContent = scenarioFlavorPool[Math.floor(Math.random()*scenarioFlavorPool.length)];
  scenarioDescription.innerHTML = st.stepDescription || "Standard scenarie...";
  digDeeperLinksDiv.innerHTML = "";
  if (t.digDeeperLinks && t.digDeeperLinks.length){
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
  scenarioAText.innerHTML = st.choiceA.text + (st.choiceA.recommended ? " <span class='recommended'>(Anbefalet)</span>" : "");
  scenarioBLabel.textContent = st.choiceB.label;
  scenarioBText.innerHTML = st.choiceB.text + (st.choiceB.recommended ? " <span class='recommended'>(Anbefalet)</span>" : "");
  scenarioAButton.onclick = () => {
    applyChoiceEffect(st.choiceA.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display = "none";
  };
  scenarioBButton.onclick = () => {
    applyChoiceEffect(st.choiceB.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display = "none";
  };
  scenarioAMoreInfoBtn.onclick = () => {
    if (st.choiceA.moreInfo) {
      showMoreInfo(st.choiceA.moreInfo);
    }
  };
  scenarioBMoreInfoBtn.onclick = () => {
    if (st.choiceB.moreInfo) {
      showMoreInfo(st.choiceB.moreInfo);
    }
  };
}

// Anvend effekter for et valgt trin
function applyChoiceEffect(eff){
  if (!eff) return;
  if (eff.timeCost)  applyTimeCost(eff.timeCost);
  if (eff.moneyCost) applyMoneyCost(eff.moneyCost);
  if (eff.riskyPlus) gameState.riskyTotal += eff.riskyPlus;
  if (eff.statChange){
    for (let [stat, delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
  if (eff.synergyEffect){
    // Yderligere effekter hvis nødvendigt
  }
}
function applyTimeCost(t){
  gameState.time = Math.max(gameState.time - t, 0);
  updateScoreboard();
  if (gameState.time <= 0){
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
  showFloatingText((delta>=0 ? `+${delta}` : `${delta}`) + " " + stat, stat);
}

// Når et trin er færdigt
function finalizeStep(stepIndex){
  let t = gameState.activeTask;
  if (!t) return;
  t.currentStep++;
  applyTimeCost(2); // Tid for at udføre et trin
  updateStepsList();
  if (t.currentStep >= t.steps.length){
    if (t.preRiskReduction > 0){
      gameState.riskyTotal = Math.max(gameState.riskyTotal - t.preRiskReduction, 0);
      showPopup(`Din arkitekthjælp/undersøgelse gav -${(t.preRiskReduction*100).toFixed(0)}% risiko!`, "info", 4000);
    }
    showCABModal();
  }
}

// CAB-gennemgang
function showCABModal(){
  let fail = gameState.riskyTotal + (gameState.docSkipCount * 0.05);
  if (fail > 1) fail = 1;
  gameState.finalFailChance = fail;
  cabModal.style.display = "flex";
  cabModal.classList.add("fadeIn");
  cabSummary.innerHTML = `<strong>CAB-gennemgang</strong><br/>
Risiko pga. hurtige/billige valg: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
Du har sprunget dokumentation over: ${gameState.docSkipCount} gange => +${(gameState.docSkipCount*5)}%<br/>
Samlet fejlchance: ${(fail*100).toFixed(0)}%`;
}
function finalizeCABResult(){
  cabModal.style.display = "none";
  let r = Math.random();
  if (r < gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}
function showCABResult(isSuccess){
  cabResultModal.style.display = "flex";
  cabResultModal.classList.add("fadeIn");
  if (isSuccess){
    cabResultTitle.textContent = "CAB: Godkendt!";
    cabResultText.textContent = "CAB mener, at ændringerne kan gennemføres.";
  } else {
    cabResultTitle.textContent = "CAB: Afvist!";
    cabResultText.textContent = "For stor risiko eller for lidt dokumentation. Opgaven mislykkes.";
    failTaskCAB();
  }
}
function postCABTechnicalCheck(){
  cabResultModal.style.display = "none";
  let driftFail = gameState.riskyTotal * 0.3;
  if (Math.random() < driftFail){
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
  if (!gameState.activeTask) return;
  gameState.activeTask = null;
  document.getElementById('active-task-headline').textContent = "Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent = "";
  document.getElementById('steps-list').innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
  showTaskSummaryModal();
}
function showTaskSummaryModal(){
  let s = gameState.security,
      st = gameState.stability,
      d = gameState.development,
      h = Math.round(gameState.hospitalSatisfaction),
      money = gameState.money;
  let summaryHTML = `<strong>Opgave fuldført!</strong><br/>
Aktuelle værdier:<br/>
Sikkerhed: ${s}, Stabilitet: ${st}, Udvikling: ${d}, 
Hospitalstilfredshed: ${h}%, Penge: ${money}<br/><br/>`;
  summaryHTML += `<strong>Mission Evaluering:</strong><br/>
Sikkerhed: ${s >= missionGoals.security ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.security})<br/>
Udvikling: ${d >= missionGoals.development ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.development})<br/><br/>`;
  let lastT = gameState.lastFinishedTask;
  if (lastT && lastT.knowledgeRecap) {
    summaryHTML += `<hr/><strong>Vidensopsummering:</strong><br/>${lastT.knowledgeRecap}`;
  }
  if (lastT && lastT.learningInfo) {
    summaryHTML += `<hr/><strong>Ekstra læring:</strong><br/>${lastT.learningInfo}`;
  }
  taskSummaryText.innerHTML = summaryHTML;
  taskSummaryModal.style.display = "flex";
  taskSummaryModal.classList.add("fadeIn");
}
function endGame(){
  showPopup("Tiden er brugt op!", "info", 3000);
  gameState.activeTask = null;
  document.getElementById('active-task-headline').textContent = "Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent = "";
  document.getElementById('steps-list').innerHTML = "<li>Ingen aktiv opgave</li>";
  endModal.style.display = "flex";
  endModal.classList.add("fadeIn");
  let s = gameState.security,
      st = gameState.stability,
      d = gameState.development,
      h = gameState.hospitalSatisfaction,
      money = gameState.money;
  let sumText = `<strong>Slutresultat:</strong><br/>
Resterende penge: ${money}<br/>
Sikkerhed: ${s}<br/>
Stabilitet: ${st}<br/>
Udvikling: ${d}<br/>
Hospitalstilfredshed: ${h}%<br/>
Fuldførte opgaver: ${gameState.tasksCompleted}<br/><br/>
<strong>Mission Evaluering:</strong><br/>
Sikkerhed: ${s >= missionGoals.security ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.security})<br/>
Udvikling: ${d >= missionGoals.development ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.development})`;
  endGameSummary.innerHTML = sumText;
}
function showPopup(msg, type = "success", duration = 3000){
  let c = document.getElementById('popup-container');
  let div = document.createElement('div');
  div.classList.add('popup');
  if (type === "error") div.classList.add('error');
  else if (type === "info") div.classList.add('info');
  div.style.animation = "none";
  div.textContent = msg;
  c.appendChild(div);
  setTimeout(() => div.remove(), duration);
}
function showFloatingText(txt, stat){
  let fc = document.getElementById('floating-text-container');
  let div = document.createElement('div');
  div.classList.add('floating-text');
  div.style.left = "50%";
  div.style.top = "50%";
  if (stat === "security") div.style.color = "#ff4444";
  else if (stat === "stability") div.style.color = "#44ff44";
  else if (stat === "development") div.style.color = "#4444ff";
  else if (stat === "hospitalSatisfaction") div.style.color = "#ffc107";
  else div.style.color = "#ffffff";
  div.textContent = txt;
  fc.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}
function triggerRandomEvent(){
  const events = [
    { type: "stabilityDown", delta: -5, msg: "Et uventet teknisk problem reducerer stabiliteten med 5!" },
    { type: "securityUp", delta: +5, msg: "Et opdaget sikkerhedsproblem blev hurtigt løst – sikkerheden stiger med 5!" },
    { type: "developmentUp", delta: +5, msg: "Et positivt udviklingsspræng gør, at udviklingen stiger med 5!" },
    { type: "moneyCut", delta: -100, msg: "Budgettet skæres ned uventet – du mister 100 kr!" }
  ];
  let event = events[Math.floor(Math.random()*events.length)];
  switch(event.type){
    case "stabilityDown":
      applyStatChange("stability", event.delta);
      break;
    case "securityUp":
      applyStatChange("security", event.delta);
      break;
    case "developmentUp":
      applyStatChange("development", event.delta);
      break;
    case "moneyCut":
      applyMoneyCost(-event.delta);
      break;
  }
  showPopup(event.msg, "info", 4000);
}
function showArchitectModal(){
  let currentStep = gameState.activeTask.currentStep;
  let step = gameState.activeTask.steps[currentStep];
  let analysisText = "";
  if (step) {
    analysisText = `<strong>Arkitektens analyse:</strong><br/>
    "Dette projekt har flere vigtige trin, men det kritiske er <em>${step.location}</em>. 
    En grundig analyse af fx DNS og Active Directory er nødvendig for at undgå driftsforstyrrelser."<br/><br/>
    <strong>Anbefalede valg:</strong><br/>`;
    if (step.choiceA && step.choiceA.recommended) {
      analysisText += `A: ${step.choiceA.label} <span class="recommended">(Anbefalet)</span><br/>`;
    }
    if (step.choiceB && step.choiceB.recommended) {
      analysisText += `B: ${step.choiceB.label} <span class="recommended">(Anbefalet)</span><br/>`;
    }
    analysisText += `<br/><em>Hvis du ignorerer disse råd, kan hospitalets drift blive alvorligt påvirket.</em>`;
  } else {
    analysisText = "Ingen analyse tilgængelig.";
  }
  architectContent.innerHTML = analysisText;
  architectModal.style.display = "flex";
  architectModal.classList.add("fadeIn");
}
function chooseArchitect(choice){
  let step = gameState.activeTask.steps[gameState.activeTask.currentStep];
  let chosenEffect = (choice === "A") ? step.choiceA.applyEffect : step.choiceB.applyEffect;
  gameState.riskyTotal = Math.max(gameState.riskyTotal - 0.05, 0);
  applyChoiceEffect(chosenEffect);
  gameState.activeTask.architectUsed = true;
  architectModal.style.display = "none";
  finalizeStep(gameState.activeTask.currentStep);
}
function showMoreInfo(infoText) {
  moreInfoContent.innerHTML = infoText;
  moreInfoModal.style.display = "flex";
  moreInfoModal.classList.add("fadeIn");
}
