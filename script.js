/************************************************************
 * script.js
 * IT Tycoon: LIMS Forvaltning – Endelig samlet version med:
 * - Levende og kontekstuelle scenarier for hver lokation
 * - Opgaver med 3-7 unikke lokationsbesøg, hvorefter "dokumentation"
 *   altid tilføjes som det sidste trin (opgaven starter aldrig med dokumentation)
 * - Større og mere læsbar scoreboard
 * - Ensartet brug af lokationsnavne (fx "it-jura", "leverandor" osv.)
 ************************************************************/

/* Elementreferencer */
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction')
};

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

/* Spiltilstand */
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

/* Opgavenavne */
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

/* Tilladte lokationer – vi bruger de id’er, der matcher index.html */
const allowedLocationsForTask = {
  security: ["cybersikkerhed", "informationssikkerhed", "it-jura"],
  development: ["hospital", "leverandor", "medicinsk-udstyr", "it-jura"],
  stability: ["hospital", "infrastruktur", "leverandor", "dokumentation"]
};

/* Opgavebeskrivelser */
function getTaskDescription(category) {
  if (category === "stability") return "(Stabilitetsopgave) For at sikre pålidelig drift i LIMS.";
  else if (category === "development") return "(Udviklingsopgave) Nye funktioner til specialerne.";
  else return "(Sikkerhedsopgave) Luk huller og beskyt data.";
}

/* Detaljerede scenarier – 5 eksempler pr. lokation (kan udvides) */
const detailedScenarios = {
  "hospital": [
    {
      description: "Personalet klager over en langsom LIMS-ydelse, som påvirker patientbehandling.",
      A: { label: "Basal Opgradering", text: "2 tid, 50 kr; små forbedringer i workflow og stabilitet.", time: 2, money: 50, effects: { stability: 1, hospitalSatisfaction: 1 }, failBonus: 0 },
      B: { label: "Avanceret Opgradering", text: "5 tid, 150 kr; større modernisering med bedre patienttilfredshed.", time: 5, money: 150, effects: { hospitalSatisfaction: 3, development: 2 }, failBonus: 0.05 }
    },
    {
      description: "Ineffektive processer og forældet interface skaber frustration.",
      A: { label: "Optimering af Brugerflade", text: "2 tid, 50 kr; let forbedring af interfacet.", time: 2, money: 50, effects: { stability: 1, hospitalSatisfaction: 1 }, failBonus: 0 },
      B: { label: "Fuld Re-design", text: "5 tid, 150 kr; komplet modernisering af brugeroplevelsen.", time: 5, money: 150, effects: { hospitalSatisfaction: 3, development: 2 }, failBonus: 0.05 }
    },
    {
      description: "Afdelingsledelsen kræver bedre data integration og rapportering.",
      A: { label: "Standard Integration", text: "2 tid, 50 kr; mindre forbedring af dataflow.", time: 2, money: 50, effects: { stability: 1, hospitalSatisfaction: 1 }, failBonus: 0 },
      B: { label: "Avanceret Integration", text: "5 tid, 150 kr; fuld automatisering og interaktiv rapportering.", time: 5, money: 150, effects: { hospitalSatisfaction: 3, development: 2 }, failBonus: 0.05 }
    },
    {
      description: "Manuelle processer fører til fejlbehæftede indtastninger.",
      A: { label: "Automatiseret Procesoptimering", text: "2 tid, 50 kr; basale automatiseringer.", time: 2, money: 50, effects: { stability: 1, hospitalSatisfaction: 1 }, failBonus: 0 },
      B: { label: "Full Scale Automatisering", text: "5 tid, 150 kr; omfattende automatisering med AI.", time: 5, money: 150, effects: { hospitalSatisfaction: 3, development: 2 }, failBonus: 0.05 }
    },
    {
      description: "Sikkerhedsproblemer i datahåndtering skaber usikkerhed.",
      A: { label: "Forbedret Datastyring", text: "2 tid, 50 kr; mindsker risikoen.", time: 2, money: 50, effects: { stability: 1, hospitalSatisfaction: 1 }, failBonus: 0 },
      B: { label: "Omfattende Datasikring", text: "5 tid, 150 kr; avanceret datasikring og overvågning.", time: 5, money: 150, effects: { hospitalSatisfaction: 3, development: 2 }, failBonus: 0.05 }
    }
  ],
  "it-jura": [
    {
      description: "Leverandørkontrakterne virker uoverskuelige og risikable.",
      A: { label: "Grundig Kontraktrevision", text: "4 tid, 150 kr; gennemgang med juridisk ekspertise.", time: 4, money: 150, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Hurtig Revision", text: "1 tid, 0 kr; standard skabelon med lav indsats.", time: 1, money: 0, effects: { development: 1 }, failBonus: 0.10 }
    },
    {
      description: "Uklarheder skaber usikkerhed om betalingsbetingelser.",
      A: { label: "Detaljeret Analyse", text: "4 tid, 150 kr; sikrer kontraktens klarhed.", time: 4, money: 150, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Standard Revision", text: "1 tid, 0 kr; hurtig gennemgang med risiko.", time: 1, money: 0, effects: { development: 1 }, failBonus: 0.10 }
    },
    {
      description: "EU-krav skaber kompleksitet i kontrakterne.",
      A: { label: "EU-Revisionspakke", text: "4 tid, 150 kr; sikrer fuld overensstemmelse.", time: 4, money: 150, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Minimal Revision", text: "1 tid, 0 kr; standard løsning med risiko.", time: 1, money: 0, effects: { development: 1 }, failBonus: 0.10 }
    },
    {
      description: "Tidligere tvister skaber bekymring.",
      A: { label: "Kontraktanalyse", text: "4 tid, 150 kr; detaljeret gennemgang.", time: 4, money: 150, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Hurtig Standardrevision", text: "1 tid, 0 kr; hurtig gennemgang med risiko.", time: 1, money: 0, effects: { development: 1 }, failBonus: 0.10 }
    },
    {
      description: "Manglende ansvarsfordeling og exit-strategi.",
      A: { label: "Omfattende Ansvarsrevision", text: "4 tid, 150 kr; etablerer klare klausuler.", time: 4, money: 150, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Minimal Revision", text: "1 tid, 0 kr; hurtig standardløsning.", time: 1, money: 0, effects: { development: 1 }, failBonus: 0.10 }
    }
  ],
  "leverandor": [
    {
      description: "Kritik af leverandøren fører til usikkerhed.",
      A: { label: "Omfattende Kvalitetstjek", text: "6 tid, 200 kr; dybdegående inspektion.", time: 6, money: 200, effects: { stability: 2, security: 1 }, failBonus: 0 },
      B: { label: "Hurtig Leverance", text: "2 tid, 50 kr; accepterer den nuværende standard.", time: 2, money: 50, effects: { stability: 1 }, failBonus: 0.10 }
    },
    {
      description: "Modulopbygning skaber potentielle fejl.",
      A: { label: "Grundig Systemtest", text: "6 tid, 200 kr; omfattende test.", time: 6, money: 200, effects: { stability: 2, security: 1 }, failBonus: 0 },
      B: { label: "Hurtig Accept", text: "2 tid, 50 kr; minimal testning.", time: 2, money: 50, effects: { stability: 1 }, failBonus: 0.10 }
    },
    {
      description: "Kritik fra tidligere kunder skaber bekymring.",
      A: { label: "Kvalitetsrevision", text: "6 tid, 200 kr; detaljeret gennemgang.", time: 6, money: 200, effects: { stability: 2, security: 1 }, failBonus: 0 },
      B: { label: "Hurtig Leverance", text: "2 tid, 50 kr; standard accept med høj risiko.", time: 2, money: 50, effects: { stability: 1 }, failBonus: 0.10 }
    },
    {
      description: "Mangel på support skaber problemer.",
      A: { label: "Udvidet Supportrevision", text: "6 tid, 200 kr; forhandling af bedre SLA’er.", time: 6, money: 200, effects: { stability: 2, security: 1 }, failBonus: 0 },
      B: { label: "Hurtig Accept", text: "2 tid, 50 kr; accepterer standard supportvilkår.", time: 2, money: 50, effects: { stability: 1 }, failBonus: 0.10 }
    },
    {
      description: "Tilpasning til specifikke krav er nødvendig.",
      A: { label: "Skræddersyet Revision", text: "6 tid, 200 kr; ekspertinvolvering og tilpasning.", time: 6, money: 200, effects: { stability: 2, security: 1 }, failBonus: 0 },
      B: { label: "Standard Leverance", text: "2 tid, 50 kr; generel accept med risiko.", time: 2, money: 50, effects: { stability: 1 }, failBonus: 0.10 }
    }
  ],
  "infrastruktur": [
    {
      description: "Forældet serverpark forårsager nedbrud.",
      A: { label: "Fuld Modernisering", text: "5 tid, 200 kr; udskiftning og optimering af hardware.", time: 5, money: 200, effects: { stability: 2, development: 2 }, failBonus: 0 },
      B: { label: "Midlertidig Patch", text: "1 tid, 50 kr; hurtig reparation.", time: 1, money: 50, effects: { stability: 1 }, failBonus: 0.05 }
    },
    {
      description: "Hyppige nedbrud forstyrrer driften.",
      A: { label: "Kapacitetsudvidelse", text: "5 tid, 200 kr; opgradering af datacentret.", time: 5, money: 200, effects: { stability: 2, development: 2 }, failBonus: 0 },
      B: { label: "Hurtig Genopsætning", text: "1 tid, 50 kr; midlertidig løsning.", time: 1, money: 50, effects: { stability: 1 }, failBonus: 0.05 }
    },
    {
      description: "Netværkslatens forsinker dataoverførsel.",
      A: { label: "Opgradering af Netværk", text: "5 tid, 200 kr; installation af moderne udstyr.", time: 5, money: 200, effects: { stability: 2, development: 2 }, failBonus: 0 },
      B: { label: "Quick Fix Netværk", text: "1 tid, 50 kr; hurtig justering.", time: 1, money: 50, effects: { stability: 1 }, failBonus: 0.05 }
    },
    {
      description: "Forældet hardware truer driften.",
      A: { label: "Modernisering af Hardware", text: "5 tid, 200 kr; fuld udskiftning.", time: 5, money: 200, effects: { stability: 2, development: 2 }, failBonus: 0 },
      B: { label: "Midlertidig Reparation", text: "1 tid, 50 kr; hurtig reparation.", time: 1, money: 50, effects: { stability: 1 }, failBonus: 0.05 }
    },
    {
      description: "Overbelastning medfører periodisk nedetid.",
      A: { label: "Udvidelse af Kapacitet", text: "5 tid, 200 kr; udbygning af serverparken.", time: 5, money: 200, effects: { stability: 2, development: 2 }, failBonus: 0 },
      B: { label: "Midlertidig Optimering", text: "1 tid, 50 kr; hurtig løsning med risiko.", time: 1, money: 50, effects: { stability: 1 }, failBonus: 0.05 }
    }
  ],
  "informationssikkerhed": [
    {
      description: "Alvorlige sikkerhedshuller ved dataoverførsel.",
      A: { label: "Avanceret Kryptering", text: "4 tid, 60 kr; implementerer end-to-end kryptering.", time: 4, money: 60, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Standard Sikkerhed", text: "2 tid, 0 kr; basal kryptering.", time: 2, money: 0, effects: { security: 1 }, failBonus: 0.10 }
    },
    {
      description: "Uautoriseret adgang skaber risiko.",
      A: { label: "IDS/IPS Implementering", text: "4 tid, 60 kr; avanceret netværksovervågning.", time: 4, money: 60, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Hurtig Adgangsrevision", text: "2 tid, 0 kr; basal adgangskontrol.", time: 2, money: 0, effects: { security: 1 }, failBonus: 0.10 }
    },
    {
      description: "Forældede firewall-regler kompromitterer sikkerheden.",
      A: { label: "Opdaterede Firewall-regler", text: "4 tid, 60 kr; implementerer moderne protokoller.", time: 4, money: 60, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Standard Firewall Patch", text: "2 tid, 0 kr; basal opdatering.", time: 2, money: 0, effects: { security: 1 }, failBonus: 0.10 }
    },
    {
      description: "GDPR-krav medfører opgradering af datasikkerheden.",
      A: { label: "Omfattende Datasikring", text: "4 tid, 60 kr; komplet datasikkerhedsstrategi.", time: 4, money: 60, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Mindre Opgradering", text: "2 tid, 0 kr; basal opgradering.", time: 2, money: 0, effects: { security: 1 }, failBonus: 0.10 }
    },
    {
      description: "Mistænkelig trafik registreres løbende.",
      A: { label: "Avanceret Overvågning", text: "4 tid, 60 kr; realtidslogning og alarm.", time: 4, money: 60, effects: { security: 2, stability: 1 }, failBonus: 0 },
      B: { label: "Hurtig Manuel Gennemgang", text: "2 tid, 0 kr; hurtig manuel kontrol.", time: 2, money: 0, effects: { security: 1 }, failBonus: 0.10 }
    }
  ],
  "dokumentation": [
    {
      description: "Detaljeret dokumentation af systemændringer sikrer audit-overholdelse.",
      A: { label: "Dokumentation Udført", text: "Brug 3 tid og 10 kr; reducerer CAB-mistillid.", time: 3, money: 10, effects: {}, failBonus: 0 }
    }
  ]
};

/* Hjælpefunktioner */
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
    li.textContent = `Trin ${i + 1}: ${locName}`;
    if (i < current) {
      li.style.textDecoration = "line-through";
      li.style.color = "#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

/* Når en lokation klikkes */
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
    for (const stat in sc.A.effects) { applyStatChange(stat, sc.A.effects[stat]); }
    gameState.riskyTotal += sc.A.failBonus || 0;
    scenarioModal.style.display = "none";
    finalizeStep();
  };
  scenarioBLabel.textContent = sc.B.label;
  scenarioBText.textContent = sc.B.text;
  scenarioBButton.onclick = () => {
    applyTimeCost(sc.B.time);
    applyMoneyCost(sc.B.money);
    for (const stat in sc.B.effects) { applyStatChange(stat, sc.B.effects[stat]); }
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
  if (t.taskType === "security") { applyStatChange("security", plus); }
  else if (t.taskType === "development") { applyStatChange("development", plus); }
  else { applyStatChange("stability", plus); }
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
  if (stat === "security") { div.style.color = "#ff4444"; }
  else if (stat === "stability") { div.style.color = "#44ff44"; }
  else if (stat === "development") { div.style.color = "#4444ff"; }
  else if (stat === "hospitalSatisfaction") { div.style.color = "#ffc107"; }
  else { div.style.color = "#ffffff"; }
  div.textContent = txt;
  c.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}

/* Opgavegenerering */
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
  steps.push("dokumentation");
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
    commitBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener("click", () => {
      li.querySelectorAll(".task-description").forEach(d => {
        d.style.display = (d.style.display === "none" ? "block" : "none");
      });
    });
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

/* Opgaveforpligtelse */
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

/* Event listeners til lokationer: Brug elementets id for konsistens */
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
  for (let i = 0; i < 2; i++) {
    generateTask();
  }
  setInterval(() => {
    if (gameState.time > 0 && gameState.availableTasks.length < 10) {
      generateTask();
    }
  }, 10000);
}

initGame();
