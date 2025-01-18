/************************************************************
 * script.js
 * Version med 20 scenarier, skip doc, større scoreboard, 
 * og ingen stop ved tid/penge<0.
 ************************************************************/

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

const scenarioModal       = document.getElementById('scenario-modal');
const scenarioTitle       = document.getElementById('scenario-title');
const scenarioDescription = document.getElementById('scenario-description');
const scenarioALabel      = document.getElementById('scenario-a-label');
const scenarioAText       = document.getElementById('scenario-a-text');
const scenarioAButton     = document.getElementById('scenario-a-btn');
const scenarioBLabel      = document.getElementById('scenario-b-label');
const scenarioBText       = document.getElementById('scenario-b-text');
const scenarioBButton     = document.getElementById('scenario-b-btn');

const docSkipOption       = document.getElementById('doc-skip-option');
const docSkipBtn          = document.getElementById('doc-skip-btn');

const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

const endModal       = document.getElementById('end-modal');
const endGameSummary = document.getElementById('end-game-summary');
const endOkBtn       = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', ()=>{ 
  endModal.style.display="none";
});

const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', ()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

const cabResultModal = document.getElementById('cab-result-modal');
const cabResultTitle = document.getElementById('cab-result-title');
const cabResultText  = document.getElementById('cab-result-text');
const cabResultOkBtn = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', ()=>{
  cabResultModal.style.display="none";
});

document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// Spiltilstand
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

  docSkipCount: 0,     // Tæller “Skip doc”
  riskyTotal: 0,       // Samlet risici
  finalFailChance: 0,

  usedTasks: new Set()
};

/* Vi har 3 typer opgaver: stability, development, security 
   Lister med "tasknavne" -> genereres i generateTask. 
   7 stability + 7 dev + 6 security = 20 i alt. 
*/
const stabilityTasks = [
  "Server-Cluster Tilpasning",
  "Datacenter Genstart",
  "PatientArks Stabiliseringsprojekt",
  "High-Availability Udbygning",
  "Cache-Optimering for LIMS",
  "Mikrobiologi Failsafe-Opdatering",
  "Konfig-Backup Gennemgang"
];
const devTasks = [
  "Biokemi Nyt Fungeassay-Modul",
  "Patologi Billedanalyse-Plugin",
  "Immunologi Auto-rapportgenerator",
  "Klinisk Genetik Variant-Database",
  "Leverandørudvikling: GenomISK",
  "PathoScan AI Integration",
  "BioTek VævsprøveTracking"
];
const secTasks = [
  "Fuld Kryptering af Datapunkter",
  "Brugerstyring for LIMS-adgang",
  "Penetrationstest (ZetaSec)",
  "Eksponeret Webserver Fix",
  "Fysisk Security-Audit",
  "Sårbarhedsscanning i GenomServer"
];

/* Lokationslogik */
const allowedLocationsForTask = {
  security: ["cybersikkerhed","informationssikkerhed","it-jura"],
  development: ["hospital","leverandor","it-jura"],
  stability: ["hospital","infrastruktur","leverandor","dokumentation"]
};

/* Tekst til opgavebeskr. */
function getTaskDescription(category){
  if(category==="stability") return "(Stabilitetsopgave) For robust LIMS-drift.";
  else if(category==="development") return "(Udviklingsopgave) Nye LIMS-funktioner.";
  else return "(Sikkerhedsopgave) Luk huller og beskyt data.";
}

/* 20 scenarier i alt -> Fordelt på hospital, it-jura, leverandor, infrastruktur, informationssikkerhed, dokumentation. */
const detailedScenarios = {
  /* 5 styk til hospital */
  "hospital":[
    {
      description:"Hospitalet (Biokemi) klager over langsomt LIMS. (Hospital prioriterer drift og personaletilfredshed)",
      A:{ label:"Mindre Udvidelse", text:"2 tid, 50 kr; +1 stabilitet, +1 hospital", 
          time:2, money:50, effects:{stability:1,hospitalSatisfaction:1}, failBonus:0 },
      B:{ label:"Stor Modernisering", text:"5 tid, 150 kr; +3 hospital, +2 udvikling, +5% fejl", 
          time:5,money:150,effects:{hospitalSatisfaction:3,development:2}, failBonus:0.05 }
    },
    {
      description:"Forældet UI i patologi. (Hospital vil have bedre workflow)",
      A:{ label:"UI-Forbedring", text:"2 tid, 40 kr; +1 stabilitet, +1 hospitalstilf.", 
          time:2, money:40, effects:{stability:1,hospitalSatisfaction:1}, failBonus:0 },
      B:{ label:"Total UI-Ombygning", text:"4 tid, 120 kr; +2 hospital, +1 udvikling, +5% fejl", 
          time:4, money:120, effects:{hospitalSatisfaction:2, development:1}, failBonus:0.05 }
    },
    {
      description:"Hurtigere rapportering i mikrobiologi. (Hospital vil have data i realtid)",
      A:{ label:"Basal Rapportmodul", text:"3 tid, 80 kr; +1 stabilitet, +1 hospital",
          time:3, money:80, effects:{stability:1,hospitalSatisfaction:1}, failBonus:0 },
      B:{ label:"Avanceret Realtime", text:"6 tid, 180 kr; +3 hospital, +2 udvikling, 8% fejl",
          time:6, money:180, effects:{hospitalSatisfaction:3, development:2}, failBonus:0.08 }
    },
    {
      description:"Kræftafdelingen efterlyser AI-analyser. (Hospital vil hæve kvaliteten)",
      A:{ label:"Mindre AI-Plugin", text:"3 tid, 60 kr; +1 hospital, +1 udvikling",
          time:3, money:60, effects:{hospitalSatisfaction:1, development:1}, failBonus:0 },
      B:{ label:"Fuldt AI-Modul", text:"5 tid, 150 kr; +2 hospital, +2 udvikling, +6% fejl",
          time:5, money:150, effects:{hospitalSatisfaction:2, development:2}, failBonus:0.06 }
    },
    {
      description:"Ustabil dataintegration mellem afdelinger. (Hospital vil have stabil drift)",
      A:{ label:"Patch Integration", text:"2 tid, 50 kr; +1 stabilitet, +1 hospital",
          time:2, money:50, effects:{stability:1, hospitalSatisfaction:1}, failBonus:0 },
      B:{ label:"Total Integration", text:"5 tid, 150 kr; +3 hospital, +2 udvikling, +5% fejl",
          time:5, money:150, effects:{hospitalSatisfaction:3,development:2}, failBonus:0.05 }
    }
  ],

  /* 3 styk til it-jura */
  "it-jura":[
    {
      description:"Leverandørkontrakter (IT Jura prioriterer sikkerhed og stabilitet)",
      A:{ label:"Grundig Revision", text:"4 tid, 150 kr; +2 sikkerhed, +1 stabilitet", 
          time:4,money:150,effects:{security:2, stability:1}, failBonus:0 },
      B:{ label:"Hurtig Revision", text:"1 tid, 0 kr; +1 udvikling, 10% fejl", 
          time:1,money:0,effects:{development:1}, failBonus:0.1 }
    },
    {
      description:"EU-krav i kontrakten (IT Jura vil undgå sanktioner)",
      A:{ label:"Omfattende Gennemgang", text:"4 tid, 120 kr; +2 sikkerhed, +1 stabilitet",
          time:4, money:120, effects:{security:2, stability:1}, failBonus:0 },
      B:{ label:"Minimal Løsning", text:"1 tid, 0 kr; +1 udvikling, 10% fejl",
          time:1, money:0, effects:{development:1}, failBonus:0.1 }
    },
    {
      description:"Tvister om betalingsbetingelser (IT Jura prioriterer tydelighed)",
      A:{ label:"Detaljeret Analyse", text:"3 tid, 100 kr; +2 sikkerhed, +1 stabilitet",
          time:3, money:100, effects:{security:2, stability:1}, failBonus:0 },
      B:{ label:"Standardvilkår", text:"1 tid, 0 kr; +1 udvikling, 8% fejl",
          time:1, money:0, effects:{development:1}, failBonus:0.08 }
    }
  ],

  /* 3 styk til leverandor */
  "leverandor":[
    {
      description:"Leverandøren (Teknova) har anset drift for uinteressant (Fokus = stabilitet/sikkerhed).",
      A:{ label:"Omfattende Kvalitetstjek", text:"6 tid, 200 kr; +2 stabilitet, +1 sikkerhed", 
          time:6, money:200, effects:{stability:2, security:1}, failBonus:0 },
      B:{ label:"Hurtig Leverance", text:"2 tid, 50 kr; +1 stabilitet, 10% fejl", 
          time:2,money:50,effects:{stability:1}, failBonus:0.1 }
    },
    {
      description:"Mangler SLA og support-aftale. (Leverandør prioriterer at levere hurtigt).",
      A:{ label:"Udvidet Support", text:"4 tid, 120 kr; +2 stabilitet, +1 sikkerhed",
          time:4,money:120,effects:{stability:2, security:1}, failBonus:0 },
      B:{ label:"Klassisk Minimal Aftale", text:"1 tid, 20 kr; +1 stabilitet, 8% fejl",
          time:1,money:20,effects:{stability:1}, failBonus:0.08 }
    },
    {
      description:"Leverandøren kræver forudbetaling. (Leverandør prioriterer lette leverancer).",
      A:{ label:"Forhandling m. Garantier", text:"5 tid, 150 kr; +2 sikkerhed, +1 stabilitet",
          time:5,money:150,effects:{security:2, stability:1}, failBonus:0 },
      B:{ label:"Accepter Forudbetaling", text:"2 tid, 50 kr; +1 stabilitet, 10% fejl",
          time:2,money:50,effects:{stability:1}, failBonus:0.1 }
    }
  ],

  /* 3 styk til infrastruktur */
  "infrastruktur":[
    {
      description:"Serverparken (IT prioriterer +stabilitet, +udvikling).",
      A:{ label:"Fuld Modernisering", text:"5 tid, 200 kr; +2 stabilitet, +2 udvikling",
          time:5, money:200, effects:{stability:2, development:2}, failBonus:0 },
      B:{ label:"Minimal Patch", text:"1 tid, 50 kr; +1 stabilitet, 5% fejl",
          time:1, money:50, effects:{stability:1}, failBonus:0.05 }
    },
    {
      description:"Netværkets latens forstyrrer LIMS. (Infrastruktur vil reducere nedbrud).",
      A:{ label:"Stor Net-Opgradering", text:"4 tid, 150 kr; +2 stabilitet, +1 udvikling",
          time:4,money:150,effects:{stability:2,development:1}, failBonus:0 },
      B:{ label:"Mindre Net-Patch", text:"2 tid, 30 kr; +1 stabilitet, 5% fejl",
          time:2,money:30,effects:{stability:1}, failBonus:0.05 }
    },
    {
      description:"Ældre hardware i patologi. (Infrastruktur vil have robusthed).",
      A:{ label:"Udrul Nye Servere", text:"5 tid, 180 kr; +2 stabilitet, +1 udvikling",
          time:5,money:180,effects:{stability:2,development:1},failBonus:0 },
      B:{ label:"Midlertidig Reparation", text:"1 tid, 50 kr; +1 stabilitet, 6% fejl",
          time:1,money:50,effects:{stability:1},failBonus:0.06 }
    }
  ],

  /* 3 styk til informationssikkerhed */
  "informationssikkerhed":[
    {
      description:"Sikkerhedshuller i dataoverførsel. (Sikkerhed prioriterer +security, +stability).",
      A:{ label:"Avanceret Kryptering", text:"4 tid, 60 kr; +2 sikkerhed, +1 stabilitet",
          time:4,money:60,effects:{security:2,stability:1},failBonus:0 },
      B:{ label:"Basal Sikkerhed", text:"2 tid, 0 kr; +1 sikkerhed, 10% fejl",
          time:2,money:0,effects:{security:1},failBonus:0.1 }
    },
    {
      description:"GDPR-krav for LIMS. (Infosikkerhed = undgå brud).",
      A:{ label:"Komplet Overholdelse", text:"4 tid, 80 kr; +2 sikkerhed, +1 stabilitet",
          time:4,money:80,effects:{security:2,stability:1},failBonus:0 },
      B:{ label:"Minimal Overholdelse", text:"1 tid, 0 kr; +1 sikkerhed, 8% fejl",
          time:1,money:0,effects:{security:1},failBonus:0.08 }
    },
    {
      description:"Flere forsøg på uautoriseret logins i LIMS. (Infosikkerhed = luk huller).",
      A:{ label:"IDS+ToFactor", text:"5 tid, 120 kr; +2 sikkerhed, +1 stabilitet",
          time:5,money:120,effects:{security:2,stability:1},failBonus:0 },
      B:{ label:"Standard Adgangsstyring", text:"2 tid, 20 kr; +1 sikkerhed, 9% fejl",
          time:2,money:20,effects:{security:1},failBonus:0.09 }
    }
  ],

  /* 3 styk til dokumentation */
  "dokumentation":[
    {
      description:"Dokumentation for drift-changes. (CAB prioriterer papirer).",
      A:{ label:"Fuldt Dok", text:"3 tid, 10 kr; ingen extra fejl", 
          time:3,money:10,effects:{},failBonus:0 },
      B:{ label:"Minimal Dok", text:"1 tid, 0 kr; +5% fejl", 
          time:1,money:0,effects:{},failBonus:0.05 }
    },
    {
      description:"CAB vil se revisionshistorik. (CAB = vil have dok!).",
      A:{ label:"Komplet Revision", text:"4 tid, 20 kr; 0% extra fejl", 
          time:4, money:20, effects:{}, failBonus:0 },
      B:{ label:"Overfladisk Dok", text:"2 tid, 0 kr; +8% fejl",
          time:2, money:0, effects:{}, failBonus:0.08 }
    },
    {
      description:"ITIL-proces kræver logging. (CAB-check).",
      A:{ label:"Omhyggelig Log", text:"3 tid, 30 kr; ingen extra fejl",
          time:3,money:30,effects:{},failBonus:0 },
      B:{ label:"Minimal Log", text:"1 tid, 0 kr; +5% fejl",
          time:1,money:0,effects:{},failBonus:0.05 }
    }
  ]
};

// scoreboard
function updateScoreboard(){
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent   = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
}

/* Opgavevisning */
function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const current= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li=document.createElement("li");
    li.textContent=`Trin ${i+1}: ${locName}`;
    if(i<current){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
  // Giv en lille progress-linje
  const progressInfo=document.createElement("li");
  progressInfo.style.color="#d0d0d0";
  progressInfo.textContent = `Du er på trin ${current+1} ud af ${gameState.activeTask.steps.length} for at løse denne opgave.`;
  stepsList.appendChild(progressInfo);
}

// Lokation klikkes
function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  const idx=gameState.activeTask.currentStep;
  if(idx>=gameState.activeTask.steps.length)return;
  
  const needed= gameState.activeTask.steps[idx];
  
  // Tjek om vi er i doc
  if(needed.toLowerCase()==="dokumentation"){
    skipDocumentationPopup();
    return;
  }
  
  if(locName.toLowerCase()!== needed.toLowerCase())return;
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[idx])return;
  gameState.activeTask.decisionMadeForStep[idx]=true;
  
  showScenarioModal(locName);
}

// Dokumentation => 3 valg
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";
  
  scenarioTitle.textContent="Dokumentation";
  scenarioDescription.textContent="CAB vil se papirerne. Du kan vælge Fuldt, Minimal eller skip...";
  
  scenarioALabel.textContent="Fuldt Dok";
  scenarioAText.textContent="3 tid, 10 kr, ingen ekstra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  scenarioBLabel.textContent="Minimal Dok";
  scenarioBText.textContent="1 tid, 0 kr, +5% fejl";
  scenarioBButton.onclick=()=>{
    applyTimeCost(1);
    gameState.riskyTotal+=0.05;
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  docSkipBtn.onclick=()=>{
    gameState.docSkipCount++;
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// Standard scenario
function showScenarioModal(locName){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";
  
  const scenarios = detailedScenarios[locName.toLowerCase()];
  if(!scenarios||scenarios.length===0){
    // fallback
    scenarioTitle.textContent= locName;
    scenarioDescription.textContent="(Standard scenario, ex. +2 stabilitet, -50 kr, +10% fejl)";
    scenarioALabel.textContent="A: Kvalitetsløsning";
    scenarioAText.textContent="2 tid, 50 kr, +2 stabilitet";
    scenarioAButton.onclick=()=>{
      applyTimeCost(2);
      applyMoneyCost(50);
      applyStatChange("stability",2);
      scenarioModal.style.display="none";
      finalizeStep();
    };
    scenarioBLabel.textContent="B: Hurtig fix";
    scenarioBText.textContent="1 tid, 0 kr, +10% fejl";
    scenarioBButton.onclick=()=>{
      gameState.riskyTotal+=0.1;
      scenarioModal.style.display="none";
      finalizeStep();
    };
    return;
  }
  
  // pick random scenario
  const sc= scenarios[Math.floor(Math.random()*scenarios.length)];
  scenarioTitle.textContent= locName+" – "+ sc.description;
  scenarioDescription.textContent= "";
  
  scenarioALabel.textContent= sc.A.label;
  scenarioAText.textContent= sc.A.text;
  scenarioAButton.onclick=()=>{
    applyTimeCost(sc.A.time);
    applyMoneyCost(sc.A.money);
    for(const stat in sc.A.effects){
      applyStatChange(stat, sc.A.effects[stat]);
    }
    gameState.riskyTotal += (sc.A.failBonus||0);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  scenarioBLabel.textContent= sc.B.label;
  scenarioBText.textContent= sc.B.text;
  scenarioBButton.onclick=()=>{
    applyTimeCost(sc.B.time);
    applyMoneyCost(sc.B.money);
    for(const stat in sc.B.effects){
      applyStatChange(stat, sc.B.effects[stat]);
    }
    gameState.riskyTotal += (sc.B.failBonus||0);
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// finalize step
function finalizeStep(){
  if(!gameState.activeTask)return;
  applyTimeCost(5); 
  gameState.activeTask.currentStep++;
  
  if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

// CAB
function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.15);
  fail= Math.max(0, Math.min(fail,1));
  gameState.finalFailChance= fail;
  
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Risikoprocent (hurtige valg etc.): ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Dokumentation skip: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  const r= Math.random();
  if(r< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent= "CAB: Godkendt!";
    let skipdoc= (gameState.docSkipCount>0) ? "– trods dårlig dokumentation" : "";
    cabResultText.textContent= "Opgaven accepteres af CAB. "+skipdoc;
    completeTaskCAB();
  } else {
    cabResultTitle.textContent= "CAB: Afvist!";
    let reason= "";
    if(gameState.docSkipCount>0) reason="CAB ser kritisk på den mangelfulde dokumentation.";
    else if(gameState.riskyTotal>0.2) reason="CAB vurderer den samlede risiko for høj.";
    else reason="CAB finder for store uklarheder.";
    cabResultText.textContent= reason;
    failTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;
  const t=gameState.activeTask;
  let plus= 5 + t.riskLevel*2;
  if(t.taskType==="security") applyStatChange("security", plus);
  else if(t.taskType==="development") applyStatChange("development", plus);
  else applyStatChange("stability", plus);
  
  gameState.totalRewards += t.baseReward;
  showPopup(`Opgave fuldført: +${plus} til ${t.taskType}, +${t.baseReward} kr i belønning`,"success",4000);
  
  // ryd op
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/* Man kan gå i minus i tid/penge */
function applyTimeCost(t){
  gameState.time-= t;
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money-= m;
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat] = Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

function showFloatingText(txt, stat){
  const c=document.getElementById('floating-text-container');
  const div=document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
  div.style.top="50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent=txt;
  c.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}

// Tilgængelige opgaver
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement("li");
    if(t.riskLevel===3){li.style.borderColor="red";li.style.borderWidth="2px";}
    else if(t.riskLevel===2){li.style.borderColor="orange";}
    else {li.style.borderColor="green";}
    let priorityLabel= t.isHighPriority? " (HØJPRIORITET)" : "";
    let potentialGain= `+${5 + t.riskLevel*2} til ${t.taskType}`;
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn=document.createElement("button");
    commitBtn.classList.add("commit-button");
    commitBtn.textContent="Forpligt";
    commitBtn.addEventListener("click",(e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener("click",()=>{
      li.querySelectorAll(".task-description").forEach(d=>{
        d.style.display=(d.style.display==="none"?"block":"none");
      });
    });
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

// Forpligt en opgave
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!","error");
    return;
  }
  const idx= gameState.availableTasks.findIndex(t=>t.id===taskId);
  if(idx===-1)return;
  const task= gameState.availableTasks[idx];
  // Gå direkte til finalize
  finalizeAssign(taskId, idx);
}

function finalizeAssign(taskId, idx){
  gameState.activeTask= gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent= gameState.activeTask.headline;
  activeTaskDesc.textContent= gameState.activeTask.description + 
    " Du skal gennemføre alle trin for at løse opgaven!";
  updateStepsList();
  renderTasks();
}

// Stop spil
function endGame(){
  const sumText=`
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilfredshed: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    Samlet belønning: ${gameState.totalRewards}
  `;
  endGameSummary.innerHTML=sumText;
  endModal.style.display="flex";

  // ryd aktiv
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

// Opgavegenerering
function generateTask(){
  // ingen stop hvis tid/penge < 0 => man kan fortsætte
  if(gameState.availableTasks.length>=10)return;
  
  const categories=["stability","development","security"];
  const category= categories[Math.floor(Math.random()*categories.length)];
  const allowed= allowedLocationsForTask[category];
  
  // Ingen doc => doc til sidst
  const nonDocAllowed= allowed.filter(loc=> loc.toLowerCase()!=="dokumentation");
  
  const stepsCountChoices=[3,4,5,6,7];
  const weights=[0.1,0.1,0.4,0.3,0.1];
  let r=Math.random(), total=0, numSteps=3;
  for(let i=0;i<stepsCountChoices.length;i++){
    total+=weights[i];
    if(r< total){
      numSteps= stepsCountChoices[i];
      break;
    }
  }
  numSteps= Math.min(numSteps, nonDocAllowed.length);
  
  let steps=[];
  let copy=nonDocAllowed.slice();
  for(let i=0;i<numSteps;i++){
    let idx=Math.floor(Math.random()*copy.length);
    steps.push(copy.splice(idx,1)[0]);
  }
  // doc som sidst
  steps.push("dokumentation");
  
  let taskName="";
  if(category==="stability") taskName= pickUniqueName(stabilityTasks);
  else if(category==="development") taskName= pickUniqueName(devTasks);
  else taskName= pickUniqueName(secTasks);
  if(!taskName)return;
  
  const riskLevel= Math.floor(Math.random()*3)+1;
  const baseReward= riskLevel*80;
  
  const newTask={
    id: Date.now()+ Math.floor(Math.random()*1000),
    taskType: category,
    headline: taskName,
    description: getTaskDescription(category),
    steps: steps,
    currentStep: 0,
    riskLevel,
    baseReward,
    isHighPriority:(riskLevel===3),
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function pickUniqueName(taskArray){
  const available= taskArray.filter(n=> !gameState.usedTasks.has(n));
  if(!available.length)return null;
  const name= available[Math.floor(Math.random()* available.length)];
  gameState.usedTasks.add(name);
  return name;
}

function initGame(){
  updateScoreboard();
  // Generer 2 opgaver fra start
  for(let i=0;i<2;i++){
    generateTask();
  }
  // Generer nye opgaver over tid
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

// Lokation-lister
const locationElements={
  "Infrastruktur": document.getElementById('infrastruktur'),
  "Informationssikkerhed": document.getElementById('informationssikkerhed'),
  "Hospital": document.getElementById('hospital'),
  "Leverandør": document.getElementById('leverandor'),
  "Medicinsk Udstyr": document.getElementById('medicinsk-udstyr'),
  "IT Jura": document.getElementById('it-jura'),
  "Cybersikkerhed": document.getElementById('cybersikkerhed'),
  "Dokumentation": document.getElementById('dokumentation')
};
Object.values(locationElements).forEach(el=>{
  el.addEventListener('click', ()=>{ handleLocationClick(el.id); });
});

initGame();
