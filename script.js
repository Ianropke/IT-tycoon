/************************************************************
 * script.js
 * - Ingen "..." placeholder – rigtige arrays for stabilityTasks, devTasks, secTasks
 * - Intro-knap virker (fjernet fejl)
 * - Opgave-trin: mere tydelig med 'progress' text, så spilleren forstår, at alle trin løser opgaven samlet
 * - Ingen stop ved tid/penge<0 => man kan gå i minus
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

// scenario modal
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

// tasks
const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

// end/time modal
const endModal       = document.getElementById('end-modal');
const endGameSummary = document.getElementById('end-game-summary');
const endOkBtn       = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', ()=>{ 
  endModal.style.display="none"; 
});

// CAB
const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', ()=> {
  cabModal.style.display="none";
  finalizeCABResult();
});

const cabResultModal = document.getElementById('cab-result-modal');
const cabResultTitle = document.getElementById('cab-result-title');
const cabResultText  = document.getElementById('cab-result-text');
const cabResultOkBtn = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', ()=> {
  cabResultModal.style.display="none";
});

// Intro
document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
  // Spil er i gang
});

// game state
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

// Opgave-navne (ingen “...” placeholder!)
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
  "Fuld Kryptering af Datapunkter",
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

// Hvilke lokationer en bestemt type opgave kræver
const allowedLocationsForTask = {
  security: ["cybersikkerhed","informationssikkerhed","it-jura"],
  development: ["hospital","leverandor","it-jura"],
  stability: ["hospital","infrastruktur","leverandor","dokumentation"]
};

function getTaskDescription(category){
  if(category==="stability") return "(Stabilitetsopgave) For at sikre stabil drift.";
  else if(category==="development") return "(Udviklingsopgave) Nye LIMS-funktioner.";
  else return "(Sikkerhedsopgave) Luk huller og beskyt data.";
}

// Eksempel-scenarier
const detailedScenarios = {
  "hospital": [
    {
      description: "Hospitalets LIMS skal opgraderes for at fungere i nye moduler.",
      A: { label:"Mindre Udvidelse", text:"2 tid, 50 kr; +1 stabilitet, +1 hospitalstilfredshed",
           time:2, money:50, effects:{stability:1,hospitalSatisfaction:1}, failBonus:0 },
      B: { label:"Stor Modernisering", text:"5 tid, 150 kr; +3 hospitalstilf., +2 udvikling, 5% fejlrisiko",
           time:5, money:150, effects:{hospitalSatisfaction:3, development:2}, failBonus:0.05 }
    }
  ],
  "it-jura": [
    {
      description: "Leverandørkontrakter virker uoverskuelige.",
      A: { label:"Grundig Revision", text:"4 tid, 150 kr; +2 sikkerhed, +1 stabilitet",
           time:4, money:150, effects:{security:2, stability:1}, failBonus:0 },
      B: { label:"Hurtig Revision", text:"1 tid, 0 kr; +1 udvikling, 10% fejlrisiko",
           time:1, money:0, effects:{development:1}, failBonus:0.1 }
    }
  ],
  "leverandor": [
    {
      description:"Leverandørens kvalitet er tvivlsom.",
      A:{ label:"Omfattende Kvalitetstjek", text:"6 tid, 200 kr; +2 stabilitet, +1 sikkerhed",
           time:6, money:200, effects:{stability:2,security:1}, failBonus:0 },
      B:{ label:"Hurtig Leverance", text:"2 tid, 50 kr; +1 stabilitet, 10% fejlrisiko",
           time:2, money:50, effects:{stability:1}, failBonus:0.1 }
    }
  ],
  "infrastruktur": [
    {
      description:"Serverparken er forældet og forårsager nedbrud.",
      A:{ label:"Stor Modernisering", text:"5 tid, 200 kr; +2 stabilitet, +2 udvikling",
           time:5, money:200, effects:{stability:2, development:2}, failBonus:0 },
      B:{ label:"Minimal Patch", text:"1 tid, 50 kr; +1 stabilitet, 5% fejlrisiko",
           time:1, money:50, effects:{stability:1}, failBonus:0.05 }
    }
  ],
  "informationssikkerhed": [
    {
      description:"Sikkerhedshuller ved dataoverførsel.",
      A:{ label:"Fuld Kryptering", text:"4 tid, 60 kr; +2 sikkerhed, +1 stabilitet",
           time:4, money:60, effects:{security:2, stability:1}, failBonus:0 },
      B:{ label:"Basal Sikkerhed", text:"2 tid, 0 kr; +1 sikkerhed, 10% fejlrisiko",
           time:2, money:0, effects:{security:1}, failBonus:0.1 }
    }
  ],
  "dokumentation": [
    {
      description:"Dokumentation for dine ændringer.",
      A:{ label:"Udfør Dokumentation", text:"3 tid, 10 kr; ingen extra fejl i CAB",
           time:3, money:10, effects:{}, failBonus:0 },
      B:{ label:"Minimal Dokumentation", text:"1 tid, 0 kr; +5% fejl ved CAB",
           time:1, money:0, effects:{}, failBonus:0.05 }
    }
  ]
};

/* Scoreboard update */
function updateScoreboard(){
  timeLeftEl.textContent = gameState.time;
  moneyLeftEl.textContent= gameState.money;
  scoreboard.tasksCompleted.textContent= gameState.tasksCompleted;
  scoreboard.totalRewards.textContent   = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent= gameState.hospitalSatisfaction;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const current = gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li = document.createElement("li");
    li.textContent=`Trin ${i+1}: ${locName}`;
    if(i<current){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
  // Skriv en “progress” - for at gøre det tydeligt for spilleren
  const progressInfo = document.createElement("li");
  progressInfo.style.color="#d0d0d0";
  progressInfo.textContent = `Du er på trin ${current+1} ud af ${gameState.activeTask.steps.length} i denne opgave.`;
  stepsList.appendChild(progressInfo);
}

// Lokation klikkes
function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!","error");
    return;
  }
  const idx=gameState.activeTask.currentStep;
  if(idx>=gameState.activeTask.steps.length) return;
  const needed= gameState.activeTask.steps[idx];
  
  if(needed.toLowerCase()==="dokumentation"){
    skipDocumentationPopup();
    return;
  }
  
  if(locName.toLowerCase()!==needed.toLowerCase()) return;
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[idx])return;
  gameState.activeTask.decisionMadeForStep[idx]=true;
  
  showScenarioModal(locName);
}

// Dokumentation-scenario m. skip
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";
  
  scenarioTitle.textContent="Dokumentationstrin";
  scenarioDescription.textContent="Du kan vælge at dokumentere helt, delvist – eller skippe helt.";
  
  scenarioALabel.textContent = "Fuldt Dok";
  scenarioAText.textContent  = "3 tid, 10 kr; ingen extra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  scenarioBLabel.textContent = "Minimal Dok";
  scenarioBText.textContent  = "1 tid, 0 kr; +5% fejl i CAB";
  scenarioBButton.onclick=()=>{
    gameState.riskyTotal+=0.05;
    applyTimeCost(1);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  docSkipBtn.onclick=()=>{
    // skip doc => +15%
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
    scenarioTitle.textContent=locName;
    scenarioDescription.textContent="(Standard)";
    scenarioALabel.textContent="Mulighed A (standard)";
    scenarioAText.textContent="2 tid, -50 kr, +2 stabilitet";
    scenarioAButton.onclick=()=>{
      applyTimeCost(2);
      applyMoneyCost(50);
      applyStatChange("stability",2);
      scenarioModal.style.display="none";
      finalizeStep();
    };
    scenarioBLabel.textContent="Mulighed B (hurtig)";
    scenarioBText.textContent="1 tid, 0 kr, +10% fejlrisiko";
    scenarioBButton.onclick=()=>{
      gameState.riskyTotal+=0.1;
      scenarioModal.style.display="none";
      finalizeStep();
    };
    return;
  }
  
  // pick random scenario
  const sc= scenarios[Math.floor(Math.random()*scenarios.length)];
  scenarioTitle.textContent=`${locName} – ${sc.description}`;
  scenarioDescription.textContent="";
  scenarioALabel.textContent=sc.A.label;
  scenarioAText.textContent=sc.A.text;
  scenarioAButton.onclick=()=>{
    applyTimeCost(sc.A.time);
    applyMoneyCost(sc.A.money);
    for(const stat in sc.A.effects){
      applyStatChange(stat, sc.A.effects[stat]);
    }
    gameState.riskyTotal+=(sc.A.failBonus||0);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  scenarioBLabel.textContent=sc.B.label;
  scenarioBText.textContent=sc.B.text;
  scenarioBButton.onclick=()=>{
    applyTimeCost(sc.B.time);
    applyMoneyCost(sc.B.money);
    for(const stat in sc.B.effects){
      applyStatChange(stat, sc.B.effects[stat]);
    }
    gameState.riskyTotal+=(sc.B.failBonus||0);
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
  fail=Math.max(0,Math.min(fail,1));
  gameState.finalFailChance=fail;
  
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Hurtige valg/fejlsats: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Skip dokumentation: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  const r = Math.random();
  if(r< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent="CAB: Godkendt!";
    let skipdoc = (gameState.docSkipCount>0)? " - trods mangelfuld dokumentation":"";
    cabResultText.textContent=`CAB accepterer. Opgaven løses${skipdoc}!`;
    completeTaskCAB();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    let reason="";
    if(gameState.docSkipCount>0) reason="CAB stoler ikke på dine mangelfulde dokumentationer.";
    else if(gameState.riskyTotal>0.2) reason="CAB vurderer en alt for høj fejlrisiko.";
    else reason="CAB finder for stor usikkerhed i projektet.";
    cabResultText.textContent= "Opgaven fejler: " + reason;
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
  let plus = 5 + t.riskLevel*2;
  if(t.taskType==="security") applyStatChange("security", plus);
  else if(t.taskType==="development") applyStatChange("development", plus);
  else applyStatChange("stability", plus);
  
  gameState.totalRewards += t.baseReward;
  showPopup(`Opgave fuldført: +${plus} til ${t.taskType}, +${t.baseReward} kr belønning`,"success",4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/* Man kan altid gå i minus i tid og penge => ingen stop */
function applyTimeCost(t){
  gameState.time -= t;
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money -= m;
  updateScoreboard();
}
function applyStatChange(stat, delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta, 0),150);
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

// Opgave-liste
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement("li");
    if(t.riskLevel===3){ li.style.borderColor="red"; li.style.borderWidth="2px"; }
    else if(t.riskLevel===2){ li.style.borderColor="orange"; }
    else { li.style.borderColor="green"; }
    let priorityLabel = t.isHighPriority? " (HØJPRIORITET)" : "";
    let potentialGain = `+${5 + t.riskLevel*2} til ${t.taskType}`;
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

// Forplig en opgave
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!","error");
    return;
  }
  const idx= gameState.availableTasks.findIndex(t=>t.id===taskId);
  if(idx===-1)return;
  const task= gameState.availableTasks[idx];
  // ingen “høj risiko” popup => bare finalize
  finalizeAssign(taskId, idx);
}

function finalizeAssign(taskId, idx){
  gameState.activeTask= gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent= gameState.activeTask.headline;
  activeTaskDesc.textContent   = gameState.activeTask.description + 
    " Du skal gennemføre alle trin for at løse opgaven!";
  updateStepsList();
  renderTasks();
}

// Slutspil-knap
function endGame(){
  // Summér resultater
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
  
  // ryd aktiv opgave
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

// Overordnet init
function initGame(){
  updateScoreboard();
  for(let i=0;i<2;i++){
    generateTask();
  }
  setInterval(()=>{
    // generer nye opgaver løbende
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

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

Object.values(locationElements).forEach(el=>{
  el.addEventListener('click',()=>{ handleLocationClick(el.id); });
});

initGame();
