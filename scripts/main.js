/************************************************************
 * main.js – IT-Tycoon (med forbedret grafisk/UX og SAFe dashboard)
 ************************************************************/

// Arrays til tasks – skal være indlæst via dine task-filer.
window.hospitalTasks = window.hospitalTasks || [];
window.infrastrukturTasks = window.infrastrukturTasks || [];
window.cybersikkerhedTasks = window.cybersikkerhedTasks || [];

// Missionmål
const missionGoals = {
  security: 110,
  development: 115
};

// Global gameState
let gameState = {
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,
  
  money: 2000,
  time: 100,
  tasksCompleted: 0,
  
  activeTask: null,      // Opgave du har forpligtet dig til
  availableTasks: [],
  usedTasks: new Set(),
  
  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,
  
  lastFinishedTask: null,
  
  // Eksempel: Sprint- og SAFe-data
  currentSprint: 1,
  sprintGoals: {
    tasksCompleted: 5,
    security: 115,
    development: 120
  }
};

const scenarioFlavorPool = [
  "Personalet klager over ustabil drift…",
  "En intern revisor snuser rundt efter dokumentationshuller…",
  "En ny leverandør vil sælge dig en hurtig men usikker løsning…",
  "Ledelsen ønsker hurtige resultater, men CAB er skeptisk…"
];

/* --- HTML References --- */
// Scoreboard
const securityValueEl  = document.getElementById('security-value');
const stabilityValueEl = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl       = document.getElementById('time-left');
const moneyLeftEl      = document.getElementById('money-left');
const tasksCompletedEl = document.getElementById('tasks-completed');
const hospitalSatEl    = document.getElementById('hospital-satisfaction');

// Modaler
const introModal       = document.getElementById('intro-modal');
const tutorialModal    = document.getElementById('tutorial-modal');
const scenarioIntroModal = document.getElementById('scenario-intro-modal');
const scenarioModal    = document.getElementById('scenario-modal');
const architectModal   = document.getElementById('architect-modal');
const cabModal         = document.getElementById('cab-modal');
const cabResultModal   = document.getElementById('cab-result-modal');
const taskSummaryModal = document.getElementById('task-summary-modal');
const moreInfoModal    = document.getElementById('more-info-modal');

// Dashboard (SAFe & Sprint KPI’er)
const dashboardCanvas = document.getElementById('dashboard-canvas');

// Indhold i modaler
const tutorialTitleEl = document.getElementById('tutorial-title');
const tutorialTextEl  = document.getElementById('tutorial-text');
const scenarioIntroTitleEl = document.getElementById('scenario-intro-title');
const scenarioIntroTextEl  = document.getElementById('scenario-intro-text');
const scenarioIntroCloseBtn = document.getElementById('scenario-intro-close-btn');

const scenarioTitle       = document.getElementById('scenario-title');
const scenarioFlavorText  = document.getElementById('scenario-flavor-text');
const scenarioDescription = document.getElementById('scenario-description');
const scenarioAButton     = document.getElementById('scenario-a-btn');
const scenarioBButton     = document.getElementById('scenario-b-btn');
const scenarioALabel      = document.getElementById('scenario-a-label');
const scenarioAText       = document.getElementById('scenario-a-text');
const scenarioBLabel      = document.getElementById('scenario-b-label');
const scenarioBText       = document.getElementById('scenario-b-text');
const scenarioNarrativeDiv = document.getElementById('scenario-narrative');
const digDeeperLinksDiv   = document.getElementById('dig-deeper-links');

const cabSummary       = document.getElementById('cab-summary');
const cabResultTitle   = document.getElementById('cab-result-title');
const cabResultText    = document.getElementById('cab-result-text');
const endGameSummary   = document.getElementById('end-game-summary');
const taskSummaryText  = document.getElementById('task-summary-text');
const architectContent = document.getElementById('architect-content');
const moreInfoContent  = document.getElementById('more-info-content');

/* --- Knappe Event Listeners --- */
document.getElementById('intro-start-btn').addEventListener('click', () => {
  // Luk intro-modalen med en slide-out effekt og start tutorialen
  introModal.classList.add('modal-slide-out');
  setTimeout(() => {
    introModal.style.display = 'none';
    openTutorialModal();
  }, 500);
});

document.getElementById('scenario-intro-close-btn').addEventListener('click', () => {
  scenarioIntroModal.style.display = 'none';
});

document.getElementById('architect-help-btn').addEventListener('click', () => {
  if (!gameState.activeTask) {
    showPopup("Ingen aktiv opgave!", "error");
    return;
  }
  if (gameState.activeTask.architectUsed) {
    showPopup("Arkitekthjælp allerede brugt!", "error");
    return;
  }
  showArchitectModal();
});

document.getElementById('cab-ok-btn').addEventListener('click', () => {
  cabModal.style.display = 'none';
  finalizeCABResult();
});
document.getElementById('cab-result-ok-btn').addEventListener('click', () => {
  cabResultModal.style.display = 'none';
  postCABTechnicalCheck();
});
document.getElementById('task-summary-ok-btn').addEventListener('click', () => {
  taskSummaryModal.style.display = 'none';
  renderTasks();
});
document.getElementById('more-info-close-btn').addEventListener('click', () => {
  moreInfoModal.style.display = 'none';
});

/* --- Tutorial --- */
const tutorialNextBtn = document.getElementById('tutorial-next-btn');
let tutorialSteps = [
  { 
    title: "Din Rolle", 
    text: "Som IT-arkitekt og strateg står du i spidsen for en digital revolution på hospitalet. Du skal forvandle forældede systemer til en banebrydende LIMS-løsning, hvor tid, penge, dokumentation og cybersikkerhed bliver dine vigtigste våben. Din beslutningskraft kan redde liv og sætte nye standarder for fremtidens sundhedsvæsen." 
  },
  { 
    title: "CAB & Dokumentation", 
    text: "CAB er din skarpeste modstander – de kræver præcis dokumentation og lav risiko. Hver beslutning tæller, og manglende dokumentation kan koste dig dyrt. Tænk strategisk og undgå hurtige løsninger, der kan lede til katastrofale fejl." 
  },
  { 
    title: "Målsætning", 
    text: `Dit ultimative mål: Opnå mindst ${missionGoals.security} i sikkerhed og ${missionGoals.development} i udvikling, før tiden løber ud.`
  }
];
let tutorialIdx = 0;
function openTutorialModal(){
  tutorialModal.style.display = "flex";
  showTutorialContent();
}
function showTutorialContent(){
  if (tutorialIdx >= tutorialSteps.length) {
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

/* --- Lokationsklik --- */
const locMap = {
  hospital: document.getElementById('hospital'),
  dokumentation: document.getElementById('dokumentation'),
  leverandor: document.getElementById('leverandor'),
  infrastruktur: document.getElementById('infrastruktur'),
  "it-jura": document.getElementById('it-jura'),
  cybersikkerhed: document.getElementById('cybersikkerhed')
};
Object.entries(locMap).forEach(([k, el]) => {
  el.addEventListener('click', () => handleLocationClick(k));
});

/* --- initGame --- */
function initGame(){
  updateScoreboard();
  // Saml tasks fra de eksterne filer
  window.backlog = [
    ...(window.hospitalTasks || []),
    ...(window.infrastrukturTasks || []),
    ...(window.cybersikkerhedTasks || [])
  ];
  // Generér fx 5 startopgaver (hvis der er nok i backlog)
  for (let i = 0; i < 5; i++){
    generateTask();
  }
  // Opdater dashboard (Sprint-status og SAFe KPI’er)
  updateDashboard();
}

/* --- Dashboard (med Chart.js) --- */
let dashboardChart;
function initDashboard() {
  const ctx = dashboardCanvas.getContext('2d');
  dashboardChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Sprint', 'Sikkerhed', 'Udvikling', 'Opgaver'],
      datasets: [{
        label: 'Nuværende Status',
        data: [gameState.currentSprint, gameState.security, gameState.development, gameState.tasksCompleted],
        backgroundColor: ['#2980b9', '#27ae60', '#8e44ad', '#f39c12']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
function updateDashboard() {
  if (!dashboardChart) return;
  dashboardChart.data.datasets[0].data = [
    gameState.currentSprint,
    gameState.security,
    gameState.development,
    gameState.tasksCompleted
  ];
  dashboardChart.update();
}

/* --- Scoreboard --- */
function updateScoreboard(){
  calcHospitalSatisfaction();
  document.getElementById('time-left').textContent = gameState.time;
  document.getElementById('money-left').textContent = gameState.money;
  document.getElementById('tasks-completed').textContent = gameState.tasksCompleted;
  document.getElementById('security-value').textContent = gameState.security;
  document.getElementById('stability-value').textContent = gameState.stability;
  document.getElementById('development-value').textContent = gameState.development;
  document.getElementById('hospital-satisfaction').textContent = Math.round(gameState.hospitalSatisfaction);
  updateDashboard();
}
function calcHospitalSatisfaction(){
  let avg = (gameState.security + gameState.stability + gameState.development) / 3;
  let penalty = (gameState.money < 0) ? Math.floor(Math.abs(gameState.money) / 100) * 2 : 0;
  let newVal = avg - penalty;
  gameState.hospitalSatisfaction = Math.max(0, Math.min(newVal, 150));
}

/* --- Task Generation --- */
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
function renderTasks(){
  let tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = "";
  if (!gameState.availableTasks.length){
    tasksList.innerHTML = "<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t => {
    let li = document.createElement('li');
    li.innerHTML = `<strong>${t.title}</strong><br/>${t.shortDesc || "Ingen beskrivelse"}`;
    li.addEventListener('click', () => {
      gameState.selectedTask = t;
      showPopup(`Valgt opgave: ${t.title}`, "info", 2000);
    });
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

/* --- Forpligt Opgave --- */
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
  if (chosen.narrativeIntro){
    showScenarioIntroModal("Scenarie", chosen.narrativeIntro);
  }
  document.getElementById('active-task-headline').textContent = chosen.title;
  document.getElementById('active-task-description').textContent = chosen.shortDesc || "";
  updateStepsList();
  renderTasks();
}

/* --- Scenario Intro Modal --- */
function showScenarioIntroModal(title, text){
  scenarioIntroTitleEl.textContent = title;
  scenarioIntroTextEl.textContent = text;
  scenarioIntroModal.style.display = "flex";
}

/* --- Steps-listen --- */
function updateStepsList(){
  let stepsList = document.getElementById('steps-list');
  stepsList.innerHTML = "";
  if (!gameState.activeTask){
    stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
    return;
  }
  let c = gameState.activeTask.currentStep || 0;
  gameState.activeTask.steps.forEach((st, i) => {
    let li = document.createElement('li');
    let loc = st.location || "ukendt lokation";
    li.textContent = `Trin ${i+1}: ${loc}`;
    if (i < c){
      li.style.textDecoration = "line-through";
      li.style.color = "#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

/* --- Lokationsklik --- */
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
  let needed = gameState.activeTask.steps[i].location || "ukendt lokation";
  if (locName !== needed) return;
  showScenarioModal(i);
}

/* --- Scenario Modal --- */
function showScenarioModal(stepIndex){
  scenarioModal.style.display = "flex";
  let t = gameState.activeTask;
  let st = t.steps[stepIndex];
  let loc = st.location || "ukendt";
  
  if (t.narrativeIntro){
    scenarioNarrativeDiv.style.display = "block";
    scenarioNarrativeDiv.innerHTML = t.narrativeIntro;
  } else {
    scenarioNarrativeDiv.style.display = "none";
  }
  
  scenarioTitle.textContent = `Trin ${stepIndex+1}: ${loc}`;
  scenarioFlavorText.textContent = scenarioFlavorPool[Math.floor(Math.random() * scenarioFlavorPool.length)];
  scenarioDescription.innerHTML = `<p style="font-size:1.15rem; line-height:1.4;">
    ${st.stepDescription || "Standard scenarie..."}
  </p>`;
  
  // DigDeeperLinks
  digDeeperLinksDiv.innerHTML = "";
  if (t.digDeeperLinks && t.digDeeperLinks.length){
    digDeeperLinksDiv.style.display = "block";
    t.digDeeperLinks.forEach(linkObj => {
      let btn = document.createElement('button');
      btn.classList.add('commit-button');
      btn.textContent = "Mere info: " + linkObj.label;
      btn.onclick = () => showMoreInfo(linkObj.text);
      digDeeperLinksDiv.appendChild(btn);
    });
  } else {
    digDeeperLinksDiv.style.display = "none";
  }
  
  // "Mere info (trin)" knap, hvis stepContext findes
  let modalContent = scenarioModal.querySelector('.modal-content');
  let oldContextDiv = modalContent.querySelector('#step-context-div');
  if (oldContextDiv) oldContextDiv.remove();
  if (st.stepContext) {
    let stepContextDiv = document.createElement('div');
    stepContextDiv.id = "step-context-div";
    stepContextDiv.style.marginTop = "8px";
    let contextBtn = document.createElement('button');
    contextBtn.classList.add('commit-button');
    contextBtn.textContent = "Mere info (trin)";
    contextBtn.onclick = () => showMoreInfo(st.stepContext);
    stepContextDiv.appendChild(contextBtn);
    modalContent.appendChild(stepContextDiv);
  }
  
  // Valg A/B
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
}

/* --- Valg-effekter --- */
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
}
function applyTimeCost(t){
  gameState.time = Math.max(gameState.time - t, 0);
  updateScoreboard();
  if (gameState.time <= 0) endGame();
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

/* --- Når et trin er færdigt --- */
function finalizeStep(stepIndex){
  let t = gameState.activeTask;
  if (!t) return;
  t.currentStep++;
  applyTimeCost(2);
  updateStepsList();
  if (t.currentStep >= t.steps.length){
    if (t.preRiskReduction > 0){
      gameState.riskyTotal = Math.max(gameState.riskyTotal - t.preRiskReduction, 0);
      showPopup(`Din arkitekthjælp gav -${(t.preRiskReduction * 100).toFixed(0)}% risiko!`, "info", 4000);
    }
    showCABModal();
  }
}

/* --- CAB-gennemgang --- */
function showCABModal(){
  let fail = gameState.riskyTotal + (gameState.docSkipCount * 0.05);
  if (fail > 1) fail = 1;
  gameState.finalFailChance = fail;
  cabModal.style.display = "flex";
  cabSummary.innerHTML = `
    <strong>CAB-gennemgang</strong><br/>
    Risiko pga. hurtige valg: ${(gameState.riskyTotal * 100).toFixed(0)}%<br/>
    Dokumentationsspring: ${gameState.docSkipCount} => +${(gameState.docSkipCount * 5)}%<br/>
    Samlet fejlchance: ${(fail * 100).toFixed(0)}%
  `;
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

/* --- Task Summary --- */
function showTaskSummaryModal(){
  let s = gameState.security,
      st = gameState.stability,
      d = gameState.development,
      h = Math.round(gameState.hospitalSatisfaction),
      money = gameState.money;
  let summary = `
    <strong>Opgave fuldført!</strong><br/>
    Aktuelle værdier:<br/>
    Sikkerhed=${s}, Stabilitet=${st}, Udvikling=${d}, Hospitalstilfredshed=${h}%, Penge=${money}<br/><br/>
    <strong>Mission Evaluering:</strong><br/>
    Sikkerhed: ${s >= missionGoals.security ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.security})<br/>
    Udvikling: ${d >= missionGoals.development ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.development})<br/><br/>
  `;
  let lastT = gameState.lastFinishedTask;
  if (lastT && lastT.knowledgeRecap){
    summary += `<hr/><strong>Vidensopsummering:</strong><br/>${lastT.knowledgeRecap}`;
  }
  if (lastT && lastT.learningInfo){
    summary += `<hr/><strong>Ekstra læring:</strong><br/>${lastT.learningInfo}`;
  }
  taskSummaryText.innerHTML = summary;
  taskSummaryModal.style.display = "flex";
}

/* --- End-of-Time --- */
function endGame(){
  showPopup("Tiden er brugt op!", "info", 3000);
  gameState.activeTask = null;
  document.getElementById('active-task-headline').textContent = "Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent = "";
  document.getElementById('steps-list').innerHTML = "<li>Ingen aktiv opgave</li>";
  endModal.style.display = "flex";
  let s = gameState.security,
      st = gameState.stability,
      d = gameState.development,
      h = gameState.hospitalSatisfaction,
      money = gameState.money;
  let sumText = `
    <strong>Slutresultat:</strong><br/>
    Resterende penge: ${money}<br/>
    Sikkerhed: ${s}<br/>
    Stabilitet: ${st}<br/>
    Udvikling: ${d}<br/>
    Hospitalstilfredshed: ${h}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/><br/>
    <strong>Mission Evaluering:</strong><br/>
    Sikkerhed: ${s >= missionGoals.security ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.security})<br/>
    Udvikling: ${d >= missionGoals.development ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.development})
  `;
  endGameSummary.innerHTML = sumText;
}

/* --- Ephemeral Popups --- */
function showPopup(msg, type="success", duration=3000){
  let container = document.getElementById('popup-container');
  let div = document.createElement('div');
  div.classList.add('popup');
  if (type === "error") div.classList.add('error');
  else if (type === "info") div.classList.add('info');
  div.textContent = msg;
  container.appendChild(div);
  setTimeout(() => div.remove(), duration);
}

/* --- Flydende Tekst --- */
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

/* --- "Mere Info" Modal --- */
function showMoreInfo(infoText){
  moreInfoContent.innerHTML = infoText;
  moreInfoModal.style.display = "flex";
}

/* --- Arkitekthjælp --- */
function showArchitectModal(){
  let t = gameState.activeTask;
  if (!t) return;
  let analysis = `<strong>Arkitektens Opgaveanalyse:</strong><br/>
  <em>${t.title}</em><br/><br/>
  <p>
    Som arkitekt og strateg ser jeg på sammenhængen mellem dine beslutninger og de tekniske faldgruber, der kan true hospitalets drift. Hver beslutning er en investering – og dine valg skal balancere innovation med sikkerhed.
  </p>`;
  if (!t.steps || !t.steps.length){
    analysis += "Ingen trin i opgaven?!";
  } else {
    let recCount = 0;
    let recInfo = "";
    t.steps.forEach((step, i) => {
      let loc = step.location || "ukendt";
      analysis += `<br/><strong>Trin ${i+1}:</strong> ${loc}`;
      if (step.choiceA.recommended || step.choiceB.recommended){
        recCount++;
        recInfo += `<br/>Trin ${i+1}: `;
        if (step.choiceA.recommended) recInfo += `A: ${step.choiceA.label}. `;
        if (step.choiceB.recommended) recInfo += `B: ${step.choiceB.label}. `;
      }
    });
    if (recCount > 0){
      analysis += `<hr/><strong>Kritiske valg:</strong> ${recInfo}`;
    } else {
      analysis += "<hr/>Ingen trin er markeret som anbefalet.";
    }
  }
  architectContent.innerHTML = analysis;
  architectModal.style.display = "flex";
  t.architectUsed = true;
}

/* --- Intro-funktionalitet --- */
function startIntro() {
  const introModal = document.getElementById('intro-modal');
  introModal.style.display = 'flex';
  // Efter 5 sekunder vises "Start dit eventyr" knappen
  setTimeout(() => {
    const startBtn = document.getElementById('intro-start-btn');
    startBtn.style.display = 'block';
  }, 5000);
}

// Start intro ved load
window.addEventListener('load', () => {
  startIntro();
  initDashboard(); // Initialiser dashboard efter load
});
