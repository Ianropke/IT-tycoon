/************************************************************
 * main.js – IT‑Tycoon (Opdateret: Drift fjernet, Sprint Planning indført)
 ************************************************************/

// Arrays til tasks – skal være indlæst via dine task-filer.
window.hospitalTasks = window.hospitalTasks || [];
window.infrastrukturTasks = window.infrastrukturTasks || [];
window.cybersikkerhedTasks = window.cybersikkerhedTasks || [];

// Missionmål (målet er at opnå 22 i både sikkerhed og udvikling)
const missionGoals = {
  security: 22,
  development: 22
};

// Global gameState med de centrale KPI’er (kun sikkerhed og udvikling)
// Bemærk: Pengesystem og tid er fjernet.
let gameState = {
  security: 20,
  development: 20,
  tasksCompleted: 0,
  
  activeTask: null,    // Den opgave spilleren har forpligtet sig til
  availableTasks: [],
  usedTasks: new Set(),
  
  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,
  
  lastFinishedTask: null,
  
  // Eksempeldata for sprint (currentSprint) og sprint-mål
  currentSprint: 1,
  sprintGoals: {
    tasksCompleted: 5,
    security: 22,
    development: 22
  }
};

const scenarioFlavorPool = [
  "Personalet bemærker udfordringer i systemets drift…",
  "Der opstår tekniske problemer, som kræver en grundig gennemgang…",
  "En ekstern konsulent peger på potentielle forbedringer…",
  "Ledelsen vil gerne se, hvordan vi kan optimere systemet yderligere…"
];

/* --- HTML References --- */
// Dashboard (SAFe & Sprint KPI’er)
const dashboardCanvas = document.getElementById('dashboard-canvas');

// Modaler og øvrige elementer
const introModal       = document.getElementById('intro-modal');
const tutorialModal    = document.getElementById('tutorial-modal');
const scenarioIntroModal = document.getElementById('scenario-intro-modal');
const scenarioModal    = document.getElementById('scenario-modal');
const architectModal   = document.getElementById('architect-modal');
const cabModal         = document.getElementById('cab-modal');
const cabResultModal   = document.getElementById('cab-result-modal');
const sprintPlanningModal = document.getElementById('sprint-planning-modal'); // Ny modal for Sprint Planning
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

/* --- Sprint Planning Modal --- */
function showSprintPlanning() {
  // Opdater modalindholdet med sprintmål (PI-mål) fra hospitalet
  let modal = sprintPlanningModal;
  modal.querySelector('.modal-content').innerHTML = `
    <h2>Sprint Målsætninger</h2>
    <p>
      Hospitalet har fastsat følgende mål for denne sprint:<br/>
      Sikkerhed: ${missionGoals.security}<br/>
      Udvikling: ${missionGoals.development}<br/><br/>
      Er du klar til at starte sprinten?
    </p>
    <button id="sprint-planning-ok-btn" class="commit-button">Start Sprint</button>
  `;
  modal.style.display = "flex";
  document.getElementById('sprint-planning-ok-btn').addEventListener('click', () => {
    modal.style.display = "none";
  });
}

/* --- Tutorial --- */
const tutorialNextBtn = document.getElementById('tutorial-next-btn');
let tutorialSteps = [
  { 
    title: "Din Rolle", 
    text: "Velkommen til IT‑Tycoon! Som IT‑forvalter er det din opgave at sikre, at hospitalets systemer kører både sikkert og effektivt. Du skal balancere sikkerhed og udvikling – det er nøglen til at levere en stabil drift. Lær af dine beslutninger og se, hvordan dine valg løfter systemet."
  },
  { 
    title: "Læringskomponenter", 
    text: "Vores CAB og andre værktøjer er læringsressourcer, der hjælper dig med at dokumentere og evaluere dine beslutninger, så du kan se, hvordan de påvirker systemets ydeevne."
  },
  { 
    title: "Målsætning", 
    text: `Dit sprintmål: Opnå mindst ${missionGoals.security} i sikkerhed og ${missionGoals.development} i udvikling.`
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
    // Efter initGame vises sprint planning, så spilleren får PI-målene
    showSprintPlanning();
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
        data: [
          gameState.currentSprint, 
          gameState.security, 
          gameState.development, 
          Math.min(gameState.tasksCompleted, 30)
        ],
        backgroundColor: ['#2980b9', '#27ae60', '#8e44ad', '#3498db']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 30,
          ticks: {
            stepSize: 2
          }
        }
      }
    }
  });
}
function updateDashboard() {
  if (!dashboardChart) return;
  dashboardChart.data.datasets[0].data = [
    gameState.currentSprint,
    gameState.security,
    gameState.development,
    Math.min(gameState.tasksCompleted, 30)
  ];
  dashboardChart.update();
  animateDashboardUpdate();
}

// Dynamisk animation på dashboardopdatering
function animateDashboardUpdate() {
  dashboardCanvas.classList.add('kpi-update');
  setTimeout(() => dashboardCanvas.classList.remove('kpi-update'), 1000);
}

/* --- Scoreboard --- */
function updateScoreboard(){
  updateDashboard();
}

/* --- Task Generation --- */
function generateTask(){
  if (gameState.availableTasks.length >= 10) return;
  let notUsed = window.backlog.filter(t => !gameState.usedTasks.has(t.title));
  if (!notUsed.length) return;
  let chosen = notUsed[Math.floor(Math.random() * notUsed.length)];
  // Standard risikoprofil (kan justeres pr. opgave)
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
// Ignorer timeCost og moneyCost (de er fjernet). Brug kun statChange og riskyPlus.
function applyChoiceEffect(eff){
  if (!eff) return;
  if (eff.statChange){
    for (let [stat, delta] of Object.entries(eff.statChange)){
      // Juster delta med risikoprofilen for opgaven (standard 1.0)
      let adjustedDelta = delta * (gameState.activeTask.riskProfile || 1);
      applyStatChange(stat, adjustedDelta);
    }
  }
  if (eff.riskyPlus) {
    gameState.riskyTotal += eff.riskyPlus * (gameState.activeTask.riskProfile || 1);
  }
}
function applyStatChange(stat, delta){
  if (stat === "security" || stat === "development") {
    gameState[stat] = Math.min(Math.max(gameState[stat] + delta, 0), 30);
  }
  updateScoreboard();
  showFloatingText((delta >= 0 ? `+${delta}` : `${delta}`) + " " + stat, stat);
}

/* --- Når et trin er færdigt --- */
function finalizeStep(stepIndex){
  let t = gameState.activeTask;
  if (!t) return;
  t.currentStep++;
  updateStepsList();
  if (t.currentStep >= t.steps.length){
    if (t.preRiskReduction > 0){
      gameState.riskyTotal = Math.max(gameState.riskyTotal - t.preRiskReduction, 0);
      showPopup(`Din arkitekthjælp gav -${(t.preRiskReduction * 100).toFixed(0)}% risiko!`, "info", 4000);
    }
    // Efter opgaven er færdig, vis en Sprint Review-modal med feedback
    showSprintReview();
  }
}

/* --- Sprint Review (Feedback-loop) --- */
function showSprintReview(){
  let report = `
    <strong>Sprint Review</strong><br/>
    Sikkerhed: ${gameState.security} (mål: ${missionGoals.security})<br/>
    Udvikling: ${gameState.development} (mål: ${missionGoals.development})<br/><br/>
    Tips: Overvej at vælge mere balancerede løsninger for at øge begge KPI’er.
  `;
  let modal = document.getElementById('sprint-review-modal');
  if (modal) {
    modal.querySelector('.modal-content').innerHTML = report +
      `<br/><button id="sprint-review-close-btn" class="commit-button">Luk</button>`;
    modal.style.display = "flex";
    document.getElementById('sprint-review-close-btn').addEventListener('click', () => {
      modal.style.display = "none";
      completeTaskCAB();
    });
  } else {
    showTaskSummaryModal();
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
    Risiko ved hurtige valg: ${(gameState.riskyTotal * 100).toFixed(0)}%<br/>
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
    // Her påvirkes kun opgavelisten (drift er fjernet)
    endActiveTask();
  } else {
    showPopup("Drifts-tjek lykkedes!", "success");
    completeTaskCAB();
  }
}
function failTaskCAB(){
  gameState.tasksCompleted++;
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
      d = gameState.development;
  let summary = `
    <strong>Opgave fuldført!</strong><br/>
    Nuværende status:<br/>
    Sikkerhed = ${s}, Udvikling = ${d}<br/><br/>
    <strong>Mission Evaluering:</strong><br/>
    Sikkerhed: ${s >= missionGoals.security ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.security})<br/>
    Udvikling: ${d >= missionGoals.development ? "Opfyldt" : "Ikke opfyldt"} (mål: ${missionGoals.development})
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
  showPopup("Tiden er udløbet!", "info", 3000);
  gameState.activeTask = null;
  document.getElementById('active-task-headline').textContent = "Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent = "";
  document.getElementById('steps-list').innerHTML = "<li>Ingen aktiv opgave</li>";
  endModal.style.display = "flex";
  let s = gameState.security,
      d = gameState.development;
  let sumText = `
    <strong>Slutresultat:</strong><br/>
    Sikkerhed: ${s}<br/>
    Udvikling: ${d}<br/>
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
  else if (stat === "development") div.style.color = "#4444ff";
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
    Som IT‑forvalter er det din opgave at sikre, at systemerne kører både sikkert og effektivt. Arkitekthjælpen vejleder dig i de kritiske beslutninger, så du kan balancere sikkerhed og udvikling – og lære af dine valg.
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

// Start intro ved load og initialiser dashboard
window.addEventListener('load', () => {
  startIntro();
  initDashboard();
});
