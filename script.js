/************************************************************
 * script.js
 * Final version with:
 * - Livelier text 
 * - 10 different tasks per category
 * - If skip doc => "Du valgte at skippe dokumentationen."
 * - No layout changes
 ************************************************************/

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

// scenario modal references
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

// end/time
const endModal        = document.getElementById('end-modal');
const endGameSummary  = document.getElementById('end-game-summary');
const endOkBtn        = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click',()=>{
  endModal.style.display="none";
});

// CAB
const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click',()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

// CAB result
const cabResultModal  = document.getElementById('cab-result-modal');
const cabResultTitle  = document.getElementById('cab-result-title');
const cabResultText   = document.getElementById('cab-result-text');
const cabResultOkBtn  = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click',()=>{
  cabResultModal.style.display="none";
});

// Intro
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
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
  usedTasks: new Set() // track used tasks, so no duplicates appear
};

// update scoreboard
function updateScoreboard(){
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  scoreboard.tasksCompleted.textContent     = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent       = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent    = gameState.security;
  stabilityValueEl.textContent   = gameState.stability;
  developmentValueEl.textContent = gameState.development;
}

// location references
const locations={
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  Leverandør: document.getElementById('leverandor'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  'IT Jura': document.getElementById('it-jura'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
  Dokumentation: document.getElementById('dokumentation')
};

Object.entries(locations).forEach(([locName, el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(locName);
  });
});

// expanded scenario data
const locationScenarios={
  "Hospital":{
    bigTitle:"Hospital (MediLog Udvidelser)",
    description:"Personalet ønsker nye moduler til LIMS for fx immunologi eller patologi. Skal du investere kraftigt, eller gå en mere konservativ vej?",
    A:{
      label:"Konservativ Udvidelse",
      text:"Brug 2 tid, -50 kr => +1 Stabilitet, +1 Hospitalstilfredshed (små forbedringer).",
      effect:()=>{
        applyTimeCost(2); applyMoneyCost(50);
        applyStatChange("stability", +1);
        applyStatChange("hospitalSatisfaction", +1);
      },
      failBonus:0
    },
    B:{
      label:"Stor Modernisering",
      text:"Brug 5 tid, -150 kr => +3 Hospitalstilfredshed, +2 Udvikling, +5% fejlsandsynlighed (kompleksitet).",
      effect:()=>{
        applyTimeCost(5); applyMoneyCost(150);
        applyStatChange("hospitalSatisfaction", +3);
        applyStatChange("development", +2);
      },
      failBonus:0.05
    }
  },
  "Dokumentation":{
    bigTitle:"Dokumentation af Ændringer",
    description:"Skal du skrive tekniske opdaterings- og governance-dokumenter om LIMS, eller springe over og håbe ingen spørger?",
    A:{
      label:"Udfyld Dokumentation",
      text:"+3 tid, -10 kr => Ingen ekstra CAB-skepsis. (CAB elsker dokumentation!)",
      effect:()=>{
        applyTimeCost(3); applyMoneyCost(10);
      },
      failBonus:0
    },
    B:{
      label:"Spring Dokumentation Over",
      text:"Du valgte at skippe dokumentationen. Tiden spares, men +15% fejlchance i CAB.",
      effect:()=>{
        gameState.docSkipCount++;
      },
      failBonus:0.15
    }
  }
};

// step pools
const stepsPool={
  stability:[
    ["Hospital","Infrastruktur","Dokumentation"],
    ["Infrastruktur","Hospital","Dokumentation"]
  ],
  development:[
    ["Hospital","Informationssikkerhed","Dokumentation"],
    ["Hospital","Leverandør","Dokumentation"]
  ],
  security:[
    ["Cybersikkerhed","Informationssikkerhed","Dokumentation"],
    ["Informationssikkerhed","Cybersikkerhed","Dokumentation"]
  ]
};

// 10 different task names in each category
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

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const current = gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName, i)=>{
    const li=document.createElement("li");
    let done=(i<current);
    li.textContent=`Trin ${i+1}: [${locName}]`;
    if(done){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function handleLocationClick(locName){
  if(!gameState.activeTask) return;
  if(gameState.time<=0) return;

  const idx = gameState.activeTask.currentStep;
  if(idx>=gameState.activeTask.steps.length) return;

  const needed= gameState.activeTask.steps[idx];
  if(locName!==needed){
    if(needed==="Dokumentation"){
      // user skipping doc => finalize anyway
      skipDocumentation();
    }
    return;
  }

  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[idx]) return;
  gameState.activeTask.decisionMadeForStep[idx]=true;

  // show scenario
  showScenarioModal(locName);
}

function skipDocumentation(){
  gameState.docSkipCount++;
  finalizeStep();
}

function showScenarioModal(locName){
  scenarioModal.style.display="flex";

  const sc= locationScenarios[locName];
  if(!sc){
    // fallback scenario
    scenarioTitle.textContent = locName;
    scenarioDescription.textContent= "(Standard scenarie) For eksempel: Mangelfuld encryption eller stor-lille approach.";
    scenarioALabel.textContent= "Mulighed A (standard)";
    scenarioAText.textContent= "Giver +2 Stabilitet, -50 kr";
    scenarioAButton.onclick=()=>{
      applyTimeCost(2); applyMoneyCost(50);
      scenarioModal.style.display="none";
      finalizeStep();
    };

    scenarioBLabel.textContent= "Mulighed B (hurtig)";
    scenarioBText.textContent= "Billigere, men 10% fejlchance";
    scenarioBButton.onclick=()=>{
      gameState.riskyTotal+=0.10;
      scenarioModal.style.display="none";
      finalizeStep();
    };
  } else {
    scenarioTitle.textContent= sc.bigTitle;
    scenarioDescription.textContent= sc.description;
    scenarioALabel.textContent= sc.A.label;
    scenarioAText.textContent= sc.A.text;
    scenarioAButton.onclick=()=>{
      sc.A.effect();
      gameState.riskyTotal+= (sc.A.failBonus||0);
      scenarioModal.style.display="none";
      finalizeStep();
    };

    scenarioBLabel.textContent= sc.B.label;
    scenarioBText.textContent= sc.B.text;
    scenarioBButton.onclick=()=>{
      sc.B.effect();
      gameState.riskyTotal+= (sc.B.failBonus||0);
      scenarioModal.style.display="none";
      finalizeStep();
    };
  }
}

function finalizeStep(){
  if(!gameState.activeTask)return;
  applyTimeCost(5); 
  gameState.activeTask.currentStep++;
  if(gameState.time<=0){
    endGame();
    return;
  }
  if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

function showCABModal(){
  let fail = gameState.riskyTotal + (gameState.docSkipCount*0.15);
  if(fail>1)fail=1; if(fail<0)fail=0;
  gameState.finalFailChance=fail;

  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Hurtige/billige valg: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Du valgte at skippe dokumentationen: ${gameState.docSkipCount} gang(e) => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  let f=gameState.finalFailChance;
  if(Math.random()<f){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="CAB accepterer ændringerne. Opgaven er en succes i specialerne.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="CAB finder for stor risiko eller alt for lidt dokumentation. Opgaven mislykkes.";
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
  let plus=(5 + t.riskLevel*2);
  let summary="";
  if(t.taskType==="security"){
    applyStatChange("security", plus);
    summary=`+${plus} Sikkerhed`;
  } else if(t.taskType==="development"){
    applyStatChange("development", plus);
    summary=`+${plus} Udvikling`;
  } else {
    applyStatChange("stability", plus);
    summary=`+${plus} Stabilitet`;
  }

  gameState.totalRewards += t.baseReward;
  summary+=`, +${t.baseReward} belønning`;

  showPopup(`Opgave fuldført: ${summary}`, "success", 4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  updateScoreboard();
}

function showPopup(msg, type="success", duration=3000){
  const el=document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  else if(type==="info") el.classList.add('info');
  el.style.animation="none";
  el.textContent=msg;
  document.getElementById("popup-container").appendChild(el);
  setTimeout(()=>el.remove(), duration);
}

function applyTimeCost(t){
  gameState.time=Math.max(gameState.time-t,0);
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money=Math.max(gameState.money-m,0);
  updateScoreboard();
}
function applyStatChange(stat, delta){
  gameState[stat]=Math.min(Math.max(gameState[stat]+delta,0),150);
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

// We keep track of used tasks to not repeat them
function generateTask(){
  if(gameState.time<=0) return; 
  if(gameState.availableTasks.length>=10) return;

  // pick random category
  const r=Math.random();
  let category='stability';
  if(r<0.33) category='stability';
  else if(r<0.66) category='development';
  else category='security';

  // pick from steps pool for that category
  const chosenSteps= stepsPool[category][ Math.floor(Math.random()* stepsPool[category].length ) ];

  // pick a unique name from array
  let taskName = "";
  if(category==="stability"){
    taskName = pickUniqueName(stabilityTasks);
  } else if(category==="development"){
    taskName = pickUniqueName(devTasks);
  } else {
    taskName = pickUniqueName(secTasks);
  }
  if(!taskName) return; // no available name left?

  const riskLevel=Math.floor(Math.random()*3)+1; 
  const baseReward=riskLevel*80;

  const newTask={
    id: Date.now()+Math.floor(Math.random()*1000),
    taskType: category,
    headline: taskName,
    description: getTaskDescription(category),
    steps: chosenSteps,
    currentStep:0,
    riskLevel,
    baseReward,
    isHighPriority:(riskLevel===3),
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function pickUniqueName(taskArray){
  // pick random from taskArray but ensure not used
  const available= taskArray.filter(n=> !gameState.usedTasks.has(n));
  if(!available.length) return null;
  const name= available[Math.floor(Math.random()* available.length)];
  gameState.usedTasks.add(name);
  return name;
}

function getTaskDescription(category){
  if(category==="stability"){
    return "(Stabilitetsopgave) For at sikre pålidelig drift i LIMS.";
  } else if(category==="development"){
    return "(Udviklingsopgave) Nye funktioner til specialerne.";
  } else {
    return "(Sikkerhedsopgave) Luk huller, beskyt data og opfyld GDPR/ISO-krav.";
  }
}

function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement("li");
    if(t.riskLevel===3){
      li.style.borderColor="red"; 
      li.style.borderWidth="2px";
    } else if(t.riskLevel===2){
      li.style.borderColor="orange";
    } else {
      li.style.borderColor="green";
    }
    let priorityLabel= t.isHighPriority? " (HØJPRIORITET)":"";
    let potentialGain= `+${5 + t.riskLevel*2} til ${t.taskType}`;
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn=document.createElement('button');
    commitBtn.classList.add('commit-button');
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

function endGame(){
  showPopup("Tiden er gået!", "info",3000);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  endModal.style.display="flex";
  const sumText=`
    <strong>Slutresultat:</strong><br/>
    Resterende Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilfredshed: ${gameState.hospitalSatisfaction}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    Samlet belønning: ${gameState.totalRewards}
  `;
  endGameSummary.innerHTML=sumText;
}

function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.time<=0){
    endGame();
    return;
  }
  const idx=gameState.availableTasks.findIndex(t=> t.id===taskId);
  if(idx===-1)return;
  const task= gameState.availableTasks[idx];
  if(task.riskLevel===3){
    const pop=document.createElement('div');
    pop.classList.add('popup','info');
    pop.style.animation="none";
    pop.innerHTML=`
      <strong>Høj Risiko</strong><br/>
      Udviklerne (f.eks. Genomio Labs eller PathoSoft) siger stor risiko for 
      fejl men stor gevinst. Vil du fortsætte?
      <br/><button id="hrYes">Fortsæt</button>
      <button id="hrNo">Fortryd</button>
    `;
    document.getElementById('popup-container').appendChild(pop);

    document.getElementById('hrYes').addEventListener('click',()=>{
      pop.remove();
      finalizeAssign(taskId, idx);
    });
    document.getElementById('hrNo').addEventListener('click',()=>{
      pop.remove();
      gameState.availableTasks.splice(idx,1);
      renderTasks();
    });
  } else {
    finalizeAssign(taskId, idx);
  }
}

function finalizeAssign(taskId, idx){
  gameState.activeTask = gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent = gameState.activeTask.headline;
  activeTaskDesc.textContent      = gameState.activeTask.description;
  updateStepsList();
  renderTasks();
}

function initGame(){
  updateScoreboard();
  // generate initial tasks
  for(let i=0;i<2;i++){
    generateTask();
  }
  // tasks appear over time
  setInterval(()=>{
    if(gameState.time>0 && gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

initGame();
