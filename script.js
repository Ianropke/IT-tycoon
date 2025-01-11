/************************************************************
 * script.js
 * IT Tycoon: LIMS Forvaltning – Endelig samlet version med:
 * - Detaljerede scenarier (10 pr. lokation, undtagen Dokumentation)
 * - Opgaver med 3-7 unikke lokationsbesøg, hvorefter "dokumentation"
 *   altid tilføjes som det sidste trin (opgaven starter aldrig med det)
 * - Konsistent brug af lokationsnavne (fx "it-jura", "leverandor", etc.)
 ************************************************************/

/* Elementreferencer fra index.html */
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

/* Modal-elementer */
const scenarioModal        = document.getElementById('scenario-modal');
const scenarioTitle        = document.getElementById('scenario-title');
const scenarioDescription  = document.getElementById('scenario-description');
const scenarioALabel       = document.getElementById('scenario-a-label');
const scenarioAText        = document.getElementById('scenario-a-text');
const scenarioAButton      = document.getElementById('scenario-a-btn');
const scenarioBLabel       = document.getElementById('scenario-b-label');
const scenarioBText        = document.getElementById('scenario-b-text');
const scenarioBButton      = document.getElementById('scenario-b-btn');

const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

const endModal        = document.getElementById('end-modal');
const endGameSummary  = document.getElementById('end-game-summary');
const endOkBtn        = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', () => { endModal.style.display = "none"; });

const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', () => { cabModal.style.display = "none"; finalizeCABResult(); });

const cabResultModal  = document.getElementById('cab-result-modal');
const cabResultTitle  = document.getElementById('cab-result-title');
const cabResultText   = document.getElementById('cab-result-text');
const cabResultOkBtn  = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', () => { cabResultModal.style.display = "none"; });

document.getElementById('intro-ok-btn').addEventListener('click', () => {
  document.getElementById('intro-modal').style.display = 'none';
  gameState.introModalOpen = false;
});

/* Globale spiltilstandsvariabler */
let gameState = {
  time: 100,
  money: 1000,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,
  tasksCompleted: 0,
  totalRewards: 0,
  activeTask: null,
  availableTasks: [],
  introModalOpen: true,
  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,
  usedTasks: new Set()
};

/* Opgavenavne for hver kategori */
const stabilityTasks = [
  "Server-Cluster Tilpasning",
  "Datacenter Genstart",
  "PatientArks Stabiliseringsprojekt",
  "Cache-Optimering for LIMS",
  "High-Availability Udbygning",
  "In-House NetværksPatch",
  "LoadBalancer Revision",
  "Biokemi LIMS Stabilitetstjek",
  "Mikrobiologi Failsafe-Opdatering",
  "Konfig-Backup Gennemgang"
];
const devTasks = [
  "Biokemi Nyt Fungeassay-Modul",
  "Patologi Billedanalyse-Plugin",
  "Immunologi Auto-rapportgenerator",
  "Klinisk Genetik Variant-Database",
  "Leverandørudvikling: GenomISK",
  "MikroLab Webportal Tilføjelse",
  "PathoScan AI Integration",
  "Genomisk Medicin BigData Integration",
  "BioTek VævsprøveTracking",
  "Udvidet HL7-interface"
];
const secTasks = [
  "Kryptering af Datapunkter",
  "Sårbarhedsscanning i GenomServer",
  "Brugerstyring for LIMS-adgang",
  "Privilegietjek mod leverandørløsning",
  "Penetrationstest (ZetaSec)",
  "Cybersikkerhed: NetværksScanMicro",
  "Kompromitteret MedicinData Alarmering",
  "TwoFactor-Logon Implementering",
  "Eksponeret Webserver Fix",
  "Fysisk Security-Audit i PatologiAfdeling"
];

/* Tilladte lokationer – OBS! Vi bruger nu "leverandor" (uden ø) */
const allowedLocationsForTask = {
  security: ["cybersikkerhed", "informationssikkerhed", "it-jura"],
  development: ["hospital", "leverandor", "medicinsk-udstyr", "it-jura"],
  stability: ["hospital", "infrastruktur", "leverandor", "dokumentation"]
};

/* Returner kort opgavebeskrivelse */
function getTaskDescription(category) {
  if (category === "stability") {
    return "(Stabilitetsopgave) For at sikre pålidelig drift i LIMS.";
  } else if (category === "development") {
    return "(Udviklingsopgave) Nye funktioner til specialerne.";
  } else {
    return "(Sikkerhedsopgave) Luk huller og beskyt data.";
  }
}

/* --------------------------------------------- */
/* Detaljerede scenarier (10 pr. lokation)         */
/* --------------------------------------------- */
const detailedScenarios = {
  "hospital": [
    {
      description: "Personalet oplever, at LIMS-modulet til patologi er langsomt.",
      A: { label: "Konservativ Udvidelse", text: "2 tid, 50 kr; +1 stabilitet, +1 hospitalstilfredshed.", time: 2, money: 50, effects: { stability: 1, hospitalSatisfaction: 1 }, failBonus: 0 },
      B: { label: "Stor Modernisering", text: "5 tid, 150 kr; +3 hospitalstilfredshed, +2 udvikling, 5% fejlrisiko.", time: 5, money: 150, effects: { hospitalSatisfaction: 3, development: 2 }, failBonus: 0.05 }
    }
    // Du kan tilføje flere scenarier for "hospital" her...
  ],
  "it-jura": [
    {
      description: "Leverandørkontrakter med ScanCare er komplekse.",
      A: { label: "Grundig Kontraktrevision", text: "4 tid, 150 kr; +2 sikkerhed, +1 stabilitet.", time: 4, money: 150, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Minimal Revision", text: "1 tid, 0 kr; ingen bonus, 10% fejlrisiko.", time: 1, money: 0, effects: {}, failBonus: 0.10 }
    }
    // Flere scenarier for "it-jura" kan tilføjes...
  ],
  "leverandor": [
    {
      description: "Systemløsningen fra Teknova Solutions vurderes.",
      A: { label: "Omfattende Kvalitetssikring", text: "6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.", time: 6, money: 200, effects: { stability: 2, security: 1 }, failBonus: 0 },
      B: { label: "Hurtig Leverance", text: "2 tid, 50 kr; +1 stabilitet, 10% fejlrisiko.", time: 2, money: 50, effects: { stability: 1 }, failBonus: 0.10 }
    }
    // Flere scenarier for "leverandor" kan tilføjes...
  ],
  "infrastruktur": [
    {
      description: "Serverparken er aldrende og forårsager nedbrud.",
      A: { label: "Stor Modernisering", text: "5 tid, 200 kr; +2 stabilitet og +2 udvikling.", time: 5, money: 200, effects: { stability: 2, development: 2 }, failBonus: 0 },
      B: { label: "Minimal Patch", text: "1 tid, 50 kr; +1 stabilitet, 5% fejlrisiko.", time: 1, money: 50, effects: { stability: 1 }, failBonus: 0.05 }
    }
    // Flere scenarier for "infrastruktur" kan tilføjes...
  ],
  "informationssikkerhed": [
    {
      description: "Systemet udviser alvorlige sikkerhedshuller ved dataoverførsler.",
      A: { label: "Fuld Kryptering og Overvågning", text: "4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.", time: 4, money: 60, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Basal Sikkerhedsløsning", text: "2 tid, 0 kr; +1 sikkerhed, 10% fejlrisiko.", time: 2, money: 0, effects: { security: 1 }, failBonus: 0.10 }
    }
    // Flere scenarier for "informationssikkerhed" kan tilføjes...
  ],
  "dokumentation": [
    {
      description: "Dokumentér alle systemændringer for audit.",
      A: { label: "Dokumentation Udført", text: "Brug 3 tid og 10 kr – mindsker CAB-mistillid.", time: 3, money: 10, effects: {}, failBonus: 0 }
    }
  ]
};

/* --------------------------------------------- */
/* Hjælpefunktioner                             */
/* --------------------------------------------- */
function updateScoreboard() {
  timeLeftEl.textContent = gameState.time;
  moneyLeftEl.textContent = gameState.money;
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent = gameState.security;
  stabilityValueEl.textContent = gameState.stability;
  developmentValueEl.textContent = gameState.development;
}

function updateStepsList() {
  stepsList.innerHTML = "";
  if (!gameState.activeTask) {
    stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
    return;
  }
  const current = gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName, i) => {
    const li = document.createElement("li");
    li.textContent = `Trin ${i + 1}: [${locName}]`;
    if (i < current) {
      li.style.textDecoration = "line-through";
      li.style.color = "#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

/* Hovedfunktion: Håndter klik på en lokation */
function handleLocationClick(locName) {
  if (!gameState.activeTask) {
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  if (gameState.time <= 0) return;
  const idx = gameState.activeTask.currentStep;
  if (idx >= gameState.activeTask.steps.length) return;
  const needed = gameState.activeTask.steps[idx];
  if (needed.toLowerCase() === "dokumentation") {
    skipDocumentation();
    return;
  }
  if (locName.toLowerCase() !== needed.toLowerCase()) return;
  if (!gameState.activeTask.decisionMadeForStep) {
    gameState.activeTask.decisionMadeForStep = {};
  }
  if (gameState.activeTask.decisionMadeForStep[idx]) return;
  gameState.activeTask.decisionMadeForStep[idx] = true;
  showScenarioModal(locName);
}

function skipDocumentation() {
  gameState.docSkipCount++;
  finalizeStep();
}

function showScenarioModal(locName) {
  scenarioModal.style.display = "flex";
  const scenarios = detailedScenarios[locName.toLowerCase()];
  if (!scenarios || scenarios.length === 0) {
    scenarioTitle.textContent = locName;
    scenarioDescription.textContent = "(Standard scenarie)";
    scenarioALabel.textContent = "Mulighed A (standard)";
    scenarioAText.textContent = "Giver +2 stabilitet, -50 kr";
    scenarioAButton.onclick = () => {
      applyTimeCost(2);
      applyMoneyCost(50);
      applyStatChange("stability", 2);
      scenarioModal.style.display = "none";
      finalizeStep();
    };
    scenarioBLabel.textContent = "Mulighed B (hurtig)";
    scenarioBText.textContent = "Billigere, men 10% fejlrisiko";
    scenarioBButton.onclick = () => {
      gameState.riskyTotal += 0.10;
      scenarioModal.style.display = "none";
      finalizeStep();
    };
    return;
  }
  const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
  scenarioTitle.textContent = `${locName} – ${sc.description}`;
  scenarioDescription.textContent = "";
  scenarioALabel.textContent = sc.A.label;
  scenarioAText.textContent = sc.A.text;
  scenarioAButton.onclick = () => {
    applyTimeCost(sc.A.time);
    applyMoneyCost(sc.A.money);
    for (const stat in sc.A.effects) {
      applyStatChange(stat, sc.A.effects[stat]);
    }
    gameState.riskyTotal += sc.A.failBonus || 0;
    scenarioModal.style.display = "none";
    finalizeStep();
  };
  scenarioBLabel.textContent = sc.B.label;
  scenarioBText.textContent = sc.B.text;
  scenarioBButton.onclick = () => {
    applyTimeCost(sc.B.time);
    applyMoneyCost(sc.B.money);
    for (const stat in sc.B.effects) {
      applyStatChange(stat, sc.B.effects[stat]);
    }
    gameState.riskyTotal += sc.B.failBonus || 0;
    scenarioModal.style.display = "none";
    finalizeStep();
  };
}

function finalizeStep() {
  if (!gameState.activeTask) return;
  applyTimeCost(5);
  gameState.activeTask.currentStep++;
  if (gameState.time <= 0) {
    endGame();
    return;
  }
  if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
    showCABModal();
  } else {
    updateStepsList();
  }
}

function showCABModal() {
  let fail = gameState.riskyTotal + (gameState.docSkipCount * 0.15);
  fail = Math.max(0, Math.min(fail, 1));
  gameState.finalFailChance = fail;
  cabModal.style.display = "flex";
  cabSummary.innerHTML = `
    <strong>CAB Gennemgang</strong><br/>
    Hurtige valg: ${(gameState.riskyTotal * 100).toFixed(0)}%<br/>
    Skip af dokumentation: ${gameState.docSkipCount} gang(e) => +${(gameState.docSkipCount * 15)}%<br/>
    Samlet fejlchance: ${(fail * 100).toFixed(0)}%
  `;
}

function finalizeCABResult() {
  cabModal.style.display = "none";
  if (Math.random() < gameState.finalFailChance) {
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess) {
  cabResultModal.style.display = "flex";
  if (isSuccess) {
    cabResultTitle.textContent = "CAB: Godkendt!";
    cabResultText.textContent = "CAB accepterer ændringerne. Opgaven er en succes.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent = "CAB: Afvist!";
    cabResultText.textContent = "CAB finder for stor risiko eller manglende dokumentation. Opgaven mislykkes.";
    failTaskCAB();
  }
}

function failTaskCAB() {
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction", -10);
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB() {
  gameState.tasksCompleted++;
  if (!gameState.activeTask) return;
  const t = gameState.activeTask;
  let plus = 5 + t.riskLevel * 2;
  if (t.taskType === "security") {
    applyStatChange("security", plus);
  } else if (t.taskType === "development") {
    applyStatChange("development", plus);
  } else {
    applyStatChange("stability", plus);
  }
  gameState.totalRewards += t.baseReward;
  showPopup(`Opgave fuldført: +${plus} til relevant stat, +${t.baseReward} belønning`, "success", 4000);
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function showPopup(msg, type = "success", duration = 3000) {
  const el = document.createElement('div');
  el.classList.add('popup');
  if (type === "error") el.classList.add('error');
  else if (type === "info") el.classList.add('info');
  el.style.animation = "none";
  el.textContent = msg;
  document.getElementById("popup-container").appendChild(el);
  setTimeout(() => el.remove(), duration);
}

function applyTimeCost(t) {
  gameState.time = Math.max(gameState.time - t, 0);
  updateScoreboard();
}

function applyMoneyCost(m) {
  gameState.money = Math.max(gameState.money - m, 0);
  updateScoreboard();
}

function applyStatChange(stat, delta) {
  gameState[stat] = Math.min(Math.max(gameState[stat] + delta, 0), 150);
  updateScoreboard();
  showFloatingText((delta >= 0 ? `+${delta}` : `${delta}`) + " " + stat, stat);
}

function showFloatingText(txt, stat) {
  const c = document.getElementById('floating-text-container');
  const div = document.createElement('div');
  div.classList.add('floating-text');
  div.style.left = "50%";
  div.style.top = "50%";
  if (stat === "security") div.style.color = "#ff4444";
  else if (stat === "stability") div.style.color = "#44ff44";
  else if (stat === "development") div.style.color = "#4444ff";
  else if (stat === "hospitalSatisfaction") div.style.color = "#ffc107";
  else div.style.color = "#ffffff";
  div.textContent = txt;
  c.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}

/* ------------------------------------------------- */
/* Opgavegenerering                                  */
/* En opgave skal have en bestemt type og kræver 3-7 unikke lokationsbesøg,
   hvorefter "dokumentation" altid tilføjes som det sidste trin –
   således at opgaven aldrig starter med dokumentation. */
/* ------------------------------------------------- */
function generateTask() {
  if (gameState.time <= 0) return;
  if (gameState.availableTasks.length >= 10) return;
  const categories = ["stability", "development", "security"];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const allowed = allowedLocationsForTask[category];
  const nonDocAllowed = allowed.filter(loc => loc.toLowerCase() !== "dokumentation");
  const choices = [3, 4, 5, 6, 7];
  const weights = [0.1, 0.1, 0.4, 0.3, 0.1];
  let r = Math.random(), total = 0, numSteps = 3;
  for (let i = 0; i < choices.length; i++) {
    total += weights[i];
    if (r < total) { numSteps = choices[i]; break; }
  }
  numSteps = Math.min(numSteps, nonDocAllowed.length);
  let steps = [];
  let copy = nonDocAllowed.slice();
  for (let i = 0; i < numSteps; i++) {
    let idx = Math.floor(Math.random() * copy.length);
    steps.push(copy.splice(idx, 1)[0]);
  }
  steps.push("dokumentation"); // Altid sidste trin
  let taskName = "";
  if (category === "stability") { taskName = pickUniqueName(stabilityTasks); }
  else if (category === "development") { taskName = pickUniqueName(devTasks); }
  else { taskName = pickUniqueName(secTasks); }
  if (!taskName) return;
  const riskLevel = Math.floor(Math.random() * 3) + 1;
  const baseReward = riskLevel * 80;
  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    taskType: category,
    headline: taskName,
    description: getTaskDescription(category),
    steps: steps,
    currentStep: 0,
    riskLevel: riskLevel,
    baseReward: baseReward,
    isHighPriority: (riskLevel === 3),
    decisionMadeForStep: {}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function pickUniqueName(taskArray) {
  const available = taskArray.filter(n => !gameState.usedTasks.has(n));
  if (!available.length) return null;
  const name = available[Math.floor(Math.random() * available.length)];
  gameState.usedTasks.add(name);
  return name;
}

function renderTasks() {
  tasksList.innerHTML = "";
  if (!gameState.availableTasks.length) {
    tasksList.innerHTML = "<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t => {
    const li = document.createElement("li");
    if (t.riskLevel === 3) { li.style.borderColor = "red"; li.style.borderWidth = "2px"; }
    else if (t.riskLevel === 2) { li.style.borderColor = "orange"; }
    else { li.style.borderColor = "green"; }
    let priorityLabel = t.isHighPriority ? " (HØJPRIORITET)" : "";
    let potentialGain = `+${5 + t.riskLevel * 2} til ${t.taskType}`;
    li.innerHTML = `
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn = document.createElement('button');
    commitBtn.classList.add('commit-button');
    commitBtn.textContent = "Forpligt";
    commitBtn.addEventListener("click", (e) => { e.stopPropagation(); assignTask(t.id); });
    li.addEventListener("click", () => {
      li.querySelectorAll(".task-description").forEach(d => {
        d.style.display = (d.style.display === "none" ? "block" : "none");
      });
    });
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

function assignTask(taskId) {
  if (gameState.activeTask) { showPopup("Allerede en aktiv opgave!", "error"); return; }
  if (gameState.time <= 0) { endGame(); return; }
  const idx = gameState.availableTasks.findIndex(t => t.id === taskId);
  if (idx === -1) return;
  const task = gameState.availableTasks[idx];
  if (task.riskLevel === 3) {
    const pop = document.createElement('div');
    pop.classList.add('popup', 'info');
    pop.style.animation = "none";
    pop.innerHTML = `
      <strong>Høj Risiko</strong><br/>
      Udviklerne advarer om stor risiko for fejl. Vil du fortsætte?
      <br/><button id="hrYes">Fortsæt</button>
      <button id="hrNo">Fortryd</button>
    `;
    document.getElementById('popup-container').appendChild(pop);
    document.getElementById('hrYes').addEventListener('click', () => { pop.remove(); finalizeAssign(taskId, idx); });
    document.getElementById('hrNo').addEventListener('click', () => { pop.remove(); gameState.availableTasks.splice(idx, 1); renderTasks(); });
  } else {
    finalizeAssign(taskId, idx);
  }
}

function finalizeAssign(taskId, idx) {
  gameState.activeTask = gameState.availableTasks.splice(idx, 1)[0];
  activeTaskHeadline.textContent = gameState.activeTask.headline;
  activeTaskDesc.textContent = gameState.activeTask.description;
  updateStepsList();
  renderTasks();
}

/* Event listener til lokationer – nu bruger vi elementets id for konsistens */
const locationElements = {
  "Infrastruktur": document.getElementById('infrastruktur'),
  "Informationssikkerhed": document.getElementById('informationssikkerhed'),
  "Hospital": document.getElementById('hospital'),
  "Leverandør": document.getElementById('leverandor'),
  "Medicinsk Udstyr": document.getElementById('medicinsk-udstyr'),
  "IT Jura": document.getElementById('it-jura'),
  "Cybersikkerhed": document.getElementById('cybersikkerhed'),
  "Dokumentation": document.getElementById('dokumentation')
};
Object.values(locationElements).forEach(el => {
  el.addEventListener('click', () => { handleLocationClick(el.id); });
});

/* Initiering af spillet */
function initGame() {
  updateScoreboard();
  // Generer initialt 2 opgaver
  for (let i = 0; i < 2; i++) {
    generateTask();
  }
  // Nye opgaver genereres med jævne mellemrum
  setInterval(() => {
    if (gameState.time > 0 && gameState.availableTasks.length < 10) {
      generateTask();
    }
  }, 10000);
}

initGame();
