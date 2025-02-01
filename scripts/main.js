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
  hospitalSatEl.textContent 
