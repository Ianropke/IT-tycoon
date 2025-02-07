/************************************************************
 * main.js – IT‑Tycoon (Endelig udgave med tidseffekt på grundige valg)
 * Funktioner:
 * - Tid som beslutningsfaktor (timeCost) – nu med ekstra omkostning for grundige (recommended) valg.
 * - Unikke lokationer per opgave (validateTask)
 * - Trade‑off mekanisme (statChange vs. tradeOff)
 * - Opgaveafslutning med Task Summary (viser sikkerhed, udvikling og tid)
 * - "Mere info (trin)" og "dig deeper" funktionalitet
 * - Arkitekthjælp med konkrete anbefalinger
 ************************************************************/

// Sørg for, at dine task-filer (hospitalTasks.js, infrastrukturTasks.js, cybersikkerhedTasks.js) er indlæst
window.hospitalTasks = window.hospitalTasks || [];
window.infrastrukturTasks = window.infrastrukturTasks || [];
window.cybersikkerhedTasks = window.cybersikkerhedTasks || [];

// Global gameState – med tid, sikkerhed og udvikling
let gameState = {
  security: 20,
  development: 20,
  time: 100,            // Spilleren starter med 100 tidspoint
  tasksCompleted: 0,
  activeTask: null,
  availableTasks: [],
  usedTasks: new Set(),
  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,
  lastFinishedTask: null
};

const scenarioFlavorPool = [
  "Personalet bemærker udfordringer…",
  "Der opstår tekniske problemer, der kræver gennemgang…",
  "En ekstern konsulent peger på forbedringsmuligheder…",
  "Ledelsen ønsker at se, hvordan vi kan optimere systemet…"
];

/* --- HTML References --- */
const dashboardCanvas = document.getElementById('dashboard-canvas');
const introModal       = document.getElementById('intro-modal');
const tutorialModal    = document.getElementById('tutorial-modal');
const scenarioIntroModal = document.getElementById('scenario-intro-modal');
const scenarioModal    = document.getElementById('scenario-modal');
const architectModal   = document.getElementById('architect-modal');
const cabModal         = document.getElementById('cab-modal');
const cabResultModal   = document.getElementById('cab-result-modal');
const taskSummaryModal = document.getElementById('task-summary-modal');
const moreInfoModal    = document.getElementById('more-info-modal');

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
const taskSummaryText  = document.getElementById('task-summary-text');
const architectContent = document.getElementById('architect-content');
const moreInfoContent  = document.getElementById('more-info-content');

/* --- Event Listeners --- */
document.getElementById('intro-start-btn').addEventListener('click', () => {
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

// Når Task Summary lukkes, nulstilles den aktive opgave, så nye opgaver kan vælges.
document.getElementById('task-summary-ok-btn').addEventListener('click', () => {
  taskSummaryModal.style.display = 'none';
  endActiveTask();
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
    text: "Velkommen til IT‑Tycoon! Som IT‑forvalter skal du balancere sikkerhed, udvikling og tid. Dine beslutninger påvirker driftssikkerheden, og du skal træffe strategiske valg for at optimere systemet."
  },
  { 
    title: "Læringskomponenter", 
    text: "Brug de indbyggede 'Mere info'-knapper for at få uddybende forklaringer på hvert trin. Arkitekthjælpen viser dig, hvilke valg der er særligt kritiske."
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
  updateDashboard();
  window.backlog = [
    ...(window.hospitalTasks || []),
    ...(window.infrastrukturTasks || []),
    ...(window.cybersikkerhedTasks || [])
  ];
  // Generér 5 opgaver som start
  for (let i = 0; i < 5; i++){
    generateTask();
  }
  updateDashboard();
}

/* --- Dashboard (Chart.js) --- */
let dashboardChart;
function initDashboard() {
  const ctx = dashboardCanvas.getContext('2d');
  dashboardChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Tid', 'Sikkerhed', 'Udvikling'],
      datasets: [
        {
          label: 'Nuværende Status',
          data: [
            gameState.time,
            gameState.security,
            gameState.development
          ],
          backgroundColor: ['#f39c12', '#27ae60', '#8e44ad']
        },
        {
          label: 'Målsætning',
          data: [null, 22, 22],
          type: 'line',
          borderColor: '#f1c40f',
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
          tension: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 30,
          ticks: { stepSize: 2 }
        }
      }
    }
  });
}
function updateDashboard() {
  if (!dashboardChart) return;
  dashboardChart.data.datasets[0].data = [
    gameState.time,
    gameState.security,
    gameState.development
  ];
  dashboardChart.update();
  animateDashboardUpdate();
}
function animateDashboardUpdate() {
  dashboardCanvas.classList.add('kpi-update');
  setTimeout(() => dashboardCanvas.classList.remove('kpi-update'), 1000);
}

/* --- Scoreboard --- */
function updateScoreboard(){
  updateDashboard();
}

/* --- Task Generation --- */
function validateTask(task) {
  let locations = new Set();
  for (let step of task.steps) {
    if (locations.has(step.location)) {
      console.error(`Task "${task.title}" har duplikeret lokation: ${step.location}`);
      return false;
    }
    locations.add(step.location);
  }
  return true;
}
function generateTask(){
  if (gameState.availableTasks.length >= 10) return;
  let notUsed = window.backlog.filter(t => !gameState.usedTasks.has(t.title));
  if (!notUsed.length) return;
  let chosen = notUsed[Math.floor(Math.random() * notUsed.length)];
  if (!validateTask(chosen)) {
    console.error(`Task "${chosen.title}" er ugyldig pga. duplikerede lokationer. Skipper opgaven.`);
    return;
  }
  if (!chosen.riskProfile) {
    chosen.riskProfile = 1.0;
  }
  gameState.usedTasks.add(chosen.title);
  let newTask = JSON.parse(JSON.stringify(chosen));
  newTask.currentStep = 0;
  newTask.preRiskReduction = 0;
  newTask.architectUsed = false;
  newTask.riskProfile = chosen.riskProfile;
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
  
  // Vis narrativ hvis defineret
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
  
  // DigDeeperLinks (hvis defineret)
  digDeeperLinksDiv.innerHTML = "";
  if (t.digDeeperLinks && t.digDeeperLinks.length) {
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
  
  // Opsætning af valg – nu med ekstra tid for grundige (recommended) valg
  scenarioALabel.textContent = st.choiceA.label;
  scenarioAText.innerHTML = st.choiceA.text + (st.choiceA.recommended ? " <span class='recommended'>(Anbefalet)</span>" : "");
  scenarioBLabel.textContent = st.choiceB.label;
  scenarioBText.innerHTML = st.choiceB.text + (st.choiceB.recommended ? " <span class='recommended'>(Anbefalet)</span>" : "");
  
  scenarioAButton.onclick = () => {
    // Klon effekten, og hvis choiceA er recommended, læg ekstra tid til
    let effect = Object.assign({}, st.choiceA.applyEffect);
    if (st.choiceA.recommended) {
      effect.timeCost = (effect.timeCost || 0) + 2;
    }
    applyChoiceEffect(effect);
    finalizeStep(stepIndex);
    scenarioModal.style.display = "none";
  };
  scenarioBButton.onclick = () => {
    let effect = Object.assign({}, st.choiceB.applyEffect);
    if (st.choiceB.recommended) {
      effect.timeCost = (effect.timeCost || 0) + 2;
    }
    applyChoiceEffect(effect);
    finalizeStep(stepIndex);
    scenarioModal.style.display = "none";
  };
}

/* --- Valg-effekter med tid, statChange og tradeOff --- */
function applyChoiceEffect(eff){
  if (!eff) return;
  // Anvend timeCost, hvis defineret
  if (eff.timeCost) {
    applyTimeCost(eff.timeCost);
  }
  // Positive effekter
  if (eff.statChange){
    for (let [stat, delta] of Object.entries(eff.statChange)){
      let adjustedDelta = delta * (gameState.activeTask.riskProfile || 1);
      applyStatChange(stat, adjustedDelta);
    }
  }
  // Negative effekter (tradeOff)
  if (eff.tradeOff){
    for (let [stat, delta] of Object.entries(eff.tradeOff)){
      applyStatChange(stat, delta);
    }
  }
  // Ekstra risikoeffekt, hvis defineret
  if (eff.riskyPlus) {
    gameState.riskyTotal += eff.riskyPlus * (gameState.activeTask.riskProfile || 1);
  }
}

/* --- Tidshåndtering --- */
function applyTimeCost(t) {
  if (gameState.time < t) {
    showPopup("Ikke nok tid!", "error");
    endGame();
    return;
  }
  gameState.time -= t;
  updateScoreboard();
  showFloatingText(`-${t} tid`, "time");
}

/* --- Statændringer --- */
function applyStatChange(stat, delta){
  if (stat === "security" || stat === "development") {
    gameState[stat] = Math.min(Math.max(gameState[stat] + delta, 0), 30);
  }
  updateScoreboard();
  showFloatingText((delta >= 0 ? `+${delta}` : `${delta}`) + " " + stat, stat);
}

/* --- Når et trin er færdigt --- */
function finalizeStep(stepIndex) {
  let t = gameState.activeTask;
  if (!t) return;
  t.currentStep++;
  updateStepsList();
  // Hvis alle trin er fuldførte, vis Task Summary-modal
  if (t.currentStep >= t.steps.length) {
    gameState.lastFinishedTask = t;
    showTaskSummaryModal();
  }
}

/* --- Task Summary Modal --- */
function showTaskSummaryModal(){
  let s = gameState.security,
      d = gameState.development,
      timeRemaining = gameState.time;
  let summary = `
    <strong>Opgave fuldført!</strong><br/>
    Status:<br/>
    Sikkerhed: ${s}, Udvikling: ${d}, Tid tilbage: ${timeRemaining}<br/><br/>
    Tips: Vurder dine valg nøje for at optimere både sikkerhed og udvikling, mens du forvalter din tid.
  `;
  let lastT = gameState.lastFinishedTask;
  if (lastT && lastT.knowledgeRecap) {
    summary += `<hr/><strong>Vidensopsummering:</strong><br/>${lastT.knowledgeRecap}`;
  }
  if (lastT && lastT.learningInfo) {
    summary += `<hr/><strong>Ekstra læring:</strong><br/>${lastT.learningInfo}`;
  }
  taskSummaryText.innerHTML = summary;
  taskSummaryModal.style.display = "flex";
}

/* --- Afslut aktiv opgave --- */
function endActiveTask(){
  if (!gameState.activeTask) return;
  gameState.activeTask = null;
  document.getElementById('active-task-headline').textContent = "Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent = "";
  document.getElementById('steps-list').innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
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
  else if (stat === "development") div.style.color = "#4444ff";
  else if (stat === "time") div.style.color = "#f39c12";
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
  let analysis = `<strong>Arkitekthjælp:</strong><br/>
  <em>${t.title}</em><br/><br/>
  <p>
    Efter at have gennemgået opgaven anbefales det særligt at fokusere på de trin, hvor der er markeret anbefalede valg:
  </p>`;
  let recommendations = "";
  t.steps.forEach((step, i) => {
    if (step.choiceA.recommended || step.choiceB.recommended) {
      recommendations += `<br/>Trin ${i+1}: `;
      if (step.choiceA.recommended) recommendations += `Vælg "${step.choiceA.label}" `;
      if (step.choiceB.recommended) recommendations += `eller "${step.choiceB.label}" `;
    }
  });
  analysis += (recommendations ? recommendations : "Ingen specifikke anbefalinger fundet.");
  architectContent.innerHTML = analysis;
  architectModal.style.display = "flex";
  t.architectUsed = true;
}

/* --- Intro-funktionalitet --- */
function startIntro(){
  const introModal = document.getElementById('intro-modal');
  introModal.style.display = 'flex';
  setTimeout(() => {
    const startBtn = document.getElementById('intro-start-btn');
    startBtn.style.display = 'block';
  }, 5000);
}

window.addEventListener('load', () => {
  startIntro();
  initDashboard();
});
