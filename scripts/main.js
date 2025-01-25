/************************************************************
 * main.js - Tabel i Inspect & Adapt, mere forklaring af begreber,
 * flere penge, costScale=0.5, fix nextPI.
 ************************************************************/

// synergy flags
const synergyFlags = {};

// Til at forklare begreber: 
const definitions = {
  "CAB": "CAB (Change Advisory Board): En gruppe i hospitalet, der vurderer risici ved ændringer.",
  "PI": "PI (Program Increment): En tidsboks, fx 90 enheder, hvor du løser opgaver."
};

let gameState = {
  security:100,
  stability:100,
  development:100,
  hospitalSatisfaction:100,

  // 3) Start med flere penge, fx 2000:
  money:2000,

  // 2) PI => omdøb i tutorial til "Program Increment (PI)". 
  piTime:90,
  currentPI:1,
  maxPI:3,

  tasksCompleted:0,
  activeTask:null,
  availableTasks:[],
  usedTasks:new Set(),

  docSkipCount:0,
  riskyTotal:0,
  finalFailChance:0,
  overworkUsed:false,

  hospitalExpectations:{}, 
  commitGoals:{},

  // Tekniske synergy
};

// 3) cost halveret => costScale=0.5
const costScale = 0.5;

const scenarioFlavorPool = [
  "Personalet klager over manglende server-kapacitet...",
  "En leverandør spørger om hardware-opgradering...",
  "Ledelsen taler om EPR-integration med LIMS...",
  "IT Jura advarer om nye datalove...",
  "Cybersikkerhedsteamet ser hacking-forsøg stige..."
];

// Ordforklaringsmodal
const infoModal = document.getElementById('info-modal');
const infoModalTitle= document.getElementById('info-modal-title');
const infoModalText= document.getElementById('info-modal-text');
document.getElementById('info-modal-ok-btn').addEventListener('click', ()=>{
  infoModal.style.display="none";
});

// Funktion så du i tasks-scenario kan skrive: “Klik <a onclick='showInfo(\"CAB\")'>her</a> for mere info.”
window.showInfo = function(key){
  infoModal.style.display="flex";
  infoModalTitle.textContent = key;
  infoModalText.textContent = definitions[key] || "Ingen yderligere forklaring.";
};

// TUTORIAL, INTRO => definere fx “CAB” og “PI”
document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display="none";
  openTutorialModal();
});
const tutorialModal= document.getElementById('tutorial-modal');
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl= document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');

let tutorialSteps = [
  {
    title:"Din rolle",
    text:"Velkommen! Du er IT-forvalter for LIMS. Hver Program Increment (PI) har 90 tid, hospitalet kommer med krav, og du sætter dine commits."
  },
  {
    title:"CAB",
    text:"Til sidst i hver opgave skal CAB (Change Advisory Board) vurdere risikoen. For lidt dokumentation øger risikoen."
  },
  {
    title:"Pengene & Opgaver",
    text:"Du starter med 2000 kr. Hver opgave koster tid og penge. Du kan forundersøge for at reducere risiko."
  }
];
let tutorialIdx=0;
function openTutorialModal(){
  tutorialModal.style.display="flex";
  showTutorialContent();
}
function showTutorialContent(){
  if(tutorialIdx>= tutorialSteps.length){
    tutorialModal.style.display="none";
    initGame();
    return;
  }
  tutorialTitleEl.textContent= tutorialSteps[tutorialIdx].title;
  tutorialTextEl.textContent= tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click', ()=>{
  tutorialIdx++;
  showTutorialContent();
});

function initGame(){
  updateScoreboard();
  synergyFlags["lackInfra"]= false;

  // backlog => tasks
  window.backlog= [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  startPI();

  // Spawner opgaver løbende
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

function updateScoreboard(){
  calcHospitalSatisfaction();
  document.getElementById('time-left').textContent  = gameState.piTime;
  document.getElementById('money-left').textContent = gameState.money;
  document.getElementById('tasks-completed').textContent= gameState.tasksCompleted;
  document.getElementById('security-value').textContent= gameState.security;
  document.getElementById('stability-value').textContent= gameState.stability;
  document.getElementById('development-value').textContent= gameState.development;
  document.getElementById('hospital-satisfaction').textContent= Math.round(gameState.hospitalSatisfaction);
}
function calcHospitalSatisfaction(){
  let avg= (gameState.security + gameState.stability + gameState.development)/3;
  let penalty=0;
  if(gameState.money<0){
    penalty= Math.floor(Math.abs(gameState.money)/100)*2;
  }
  gameState.hospitalSatisfaction= Math.max(0, Math.min(avg-penalty,150));
}

function startPI(){
  gameState.piTime=90;
  gameState.overworkUsed=false;
  updateScoreboard();
  // hospitalets krav
  gameState.hospitalExpectations={
    security:100+ Math.floor(Math.random()*10+5),
    stability:100+ Math.floor(Math.random()*10+5),
    development:100+ Math.floor(Math.random()*10+5)
  };
  let he= gameState.hospitalExpectations;
  document.getElementById('pi-start-modal').style.display="flex";
  document.getElementById('hospital-expectations-text').textContent=
   `Hospitalets krav:
    S≥${he.security}, St≥${he.stability}, Dev≥${he.development}`;
}

document.getElementById('pi-start-ok-btn').addEventListener('click', ()=>{
  let cSec = parseInt(document.getElementById('commit-security').value,10)||0;
  let cStab= parseInt(document.getElementById('commit-stability').value,10)||0;
  let cDev = parseInt(document.getElementById('commit-development').value,10)||0;
  gameState.commitGoals= { security:cSec, stability:cStab, development:cDev };
  document.getElementById('pi-start-modal').style.display="none";

  // generer 3 opgaver
  for(let i=0;i<3;i++){
    generateTask();
  }
});

function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  let notUsed= window.backlog.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length)return;
  let chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let newTask= JSON.parse(JSON.stringify(chosen));
  newTask.currentStep=0;
  newTask.preRiskReduction=0;
  gameState.availableTasks.push(newTask);
  renderTasks();
}

const tasksList= document.getElementById('tasks-list');
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    let li=document.createElement('li');
    li.innerHTML=`
      <strong>${t.title}</strong><br/>
      ${t.shortDesc || "Ingen beskrivelse"}
    `;
    // Forundersøg-knap
    let invBtn=document.createElement('button');
    invBtn.textContent="Forundersøg";
    invBtn.classList.add('commit-button');
    invBtn.style.marginRight="4px";
    invBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      investigateTask(t);
    });

    let comBtn=document.createElement('button');
    comBtn.textContent="Forpligt";
    comBtn.classList.add('commit-button');
    comBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      assignTask(t.title);
    });

    li.appendChild(invBtn);
    li.appendChild(comBtn);
    tasksList.appendChild(li);
  });
}

// Forundersøg => -1 tid, -20 kr => -0.05 risk
function investigateTask(taskObj){
  let costTime=1;
  let costMoney=20;
  let reduce=0.05;
  if(gameState.piTime< costTime){
    showPopup("Ikke nok tid til forundersøg!", "error");
    return;
  }
  if(gameState.money< costMoney){
    showPopup("Ikke penge nok til forundersøg!", "error");
    return;
  }
  applyTimeCost(costTime);
  applyMoneyCost(costMoney);
  taskObj.preRiskReduction += reduce;
  showPopup(`Forundersøg: -${costTime} tid, -${costMoney} kr, -${reduce*100}% risk`, "info",4500);
}

function assignTask(taskTitle){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.piTime<=0){
    checkOverworkOrEndPI();
    return;
  }
  let idx= gameState.availableTasks.findIndex(x=> x.title===taskTitle);
  if(idx===-1)return;
  let chosen= gameState.availableTasks.splice(idx,1)[0];
  gameState.activeTask= chosen;
  document.getElementById('active-task-headline').textContent= chosen.title;
  document.getElementById('active-task-description').textContent= chosen.logicLong|| chosen.shortDesc;
  updateStepsList();
  renderTasks();
}

const stepsListEl= document.getElementById('steps-list');
function updateStepsList(){
  stepsListEl.innerHTML="";
  if(!gameState.activeTask){
    stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  let c= gameState.activeTask.currentStep||0;
  gameState.activeTask.steps.forEach((st,i)=>{
    let li=document.createElement('li');
    li.textContent=`Trin ${i+1}: ${st.location}`;
    if(i<c){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsListEl.appendChild(li);
  });
}

function checkOverworkOrEndPI(){
  if(!gameState.overworkUsed && gameState.money>=50){
    let yes= confirm("Tiden er op. Vil du betale 50 kr for +5 tid (én gang)?");
    if(yes){
      applyMoneyCost(50);
      gameState.piTime+=5;
      updateScoreboard();
      gameState.overworkUsed=true;
      showPopup("Overarbejde: -50 kr, +5 tid!", "info");
    } else {
      endPI();
    }
  } else {
    endPI();
  }
}

// scenario
const scenarioModal= document.getElementById('scenario-modal');
const scenarioTitle= document.getElementById('scenario-title');
const scenarioFlavorText= document.getElementById('scenario-flavor-text');
const scenarioDescription= document.getElementById('scenario-description');
const scenarioAButton= document.getElementById('scenario-a-btn');
const scenarioBButton= document.getElementById('scenario-b-btn');
const scenarioALabel= document.getElementById('scenario-a-label');
const scenarioAText= document.getElementById('scenario-a-text');
const scenarioBLabel= document.getElementById('scenario-b-label');
const scenarioBText= document.getElementById('scenario-b-text');

const locMap={
  hospital: document.querySelector('.location.hospital'),
  infrastruktur: document.querySelector('.location.infrastruktur'),
  cybersikkerhed: document.querySelector('.location.cybersikkerhed'),
  informationssikkerhed: document.querySelector('.location.informationssikkerhed'),
  "it-jura": document.querySelector('.location.it-jura'),
  leverandør: document.querySelector('.location.leverandor'),
  "medicinsk-udstyr": document.querySelector('.location.medicinsk-udstyr'),
  dokumentation: document.querySelector('.location.dokumentation')
};
Object.entries(locMap).forEach(([k,el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(k);
  });
});

function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  if(gameState.piTime<=0){
    checkOverworkOrEndPI();
    return;
  }
  let i= gameState.activeTask.currentStep||0;
  let st= gameState.activeTask.steps[i];
  if(!st)return;
  if(locName!== st.location)return;

  showScenarioModal(i);
}

function showScenarioModal(stepIndex){
  scenarioModal.style.display="flex";
  let st= gameState.activeTask.steps[stepIndex];
  scenarioTitle.textContent= `Trin ${stepIndex+1}: ${st.location}`;
  scenarioFlavorText.textContent= scenarioFlavorPool[Math.floor(Math.random()* scenarioFlavorPool.length)];
  scenarioDescription.innerHTML= st.stepDescription||"Generisk situation. <a href='#' onclick='showInfo(\"CAB\")'>Se CAB info</a>.";
  scenarioALabel.textContent= st.choiceA.label;
  scenarioAText.innerHTML= st.choiceA.text;
  scenarioAButton.onclick=()=>{
    applyChoiceEffect(st.choiceA.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display="none";
  };
  scenarioBLabel.textContent= st.choiceB.label;
  scenarioBText.innerHTML= st.choiceB.text;
  scenarioBButton.onclick=()=>{
    applyChoiceEffect(st.choiceB.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display="none";
  };
}

function applyChoiceEffect(eff){
  if(!eff)return;
  if(eff.timeCost) applyTimeCost(eff.timeCost);
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost * costScale);
  if(eff.riskyPlus) gameState.riskyTotal+= eff.riskyPlus;
  if(eff.statChange){
    for(let [stat,delta] of Object.entries(eff.statChange)){
      applyStatChange(stat,delta);
    }
  }
}

// finalize =>CAB
function finalizeStep(stepIndex){
  let t= gameState.activeTask;
  if(!t)return;
  t.currentStep++;
  applyTimeCost(2);
  updateStepsList();

  if(t.currentStep>= t.steps.length){
    // forundersøg-lowering => minus preRiskReduction
    if(t.preRiskReduction){
      gameState.riskyTotal = Math.max(gameState.riskyTotal - t.preRiskReduction,0);
      showPopup(`Forundersøg gav -${(t.preRiskReduction*100).toFixed(0)}% i risiko!`, "info",4000);
    }
    showCABModal();
  }
}

// CAB
const cabModal= document.getElementById('cab-modal');
const cabSummary= document.getElementById('cab-summary');
document.getElementById('cab-ok-btn').addEventListener('click', finalizeCABResult);

function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount *0.05);
  if(fail>1) fail=1;
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.textContent=`
    Dette er en gennemgang fra CAB (Change Advisory Board).
    Du har skip doc: ${gameState.docSkipCount} gange.
    Samlet risikoniveau: ${(fail*100).toFixed(1)}%
  `;
}

const cabResultModal= document.getElementById('cab-result-modal');
const cabResultTitle= document.getElementById('cab-result-title');
const cabResultText= document.getElementById('cab-result-text');
document.getElementById('cab-result-ok-btn').addEventListener('click',()=>{
  cabResultModal.style.display="none";
  postCABTechnicalCheck();
});

function finalizeCABResult(){
  cabModal.style.display="none";
  if(Math.random()<gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}
function showCABResult(ok){
  cabResultModal.style.display="flex";
  if(ok){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="CAB vurderer, at opgaven kan rulles ud. Pas på driftfejl dog!";
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko eller for lidt dokumentation. Opgaven fejler!";
    failTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  endActiveTask();
}

function postCABTechnicalCheck(){
  cabResultModal.style.display="none";
  let driftFail= gameState.riskyTotal*0.3;
  if(Math.random()< driftFail){
    showPopup("Driftfejl: Implementeringen fejlede i praksis!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    endActiveTask();
  } else {
    showPopup("Drift-check bestået!", "success");
    completeTaskCAB();
  }
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  endActiveTask();
}

// after end => show summary => let nextPI run
function endActiveTask(){
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
  showTaskSummaryModal();
}

const taskSummaryModal= document.getElementById('task-summary-modal');
const taskSummaryText= document.getElementById('task-summary-text');
document.getElementById('task-summary-ok-btn').addEventListener('click',()=>{
  taskSummaryModal.style.display="none";
});
function showTaskSummaryModal(){
  let s= gameState.security;
  let st= gameState.stability;
  let d= gameState.development;
  let h= Math.round(gameState.hospitalSatisfaction);
  let money= gameState.money;

  taskSummaryText.innerHTML=`
    <strong>Opgave afsluttet!</strong><br/>
    Stats nu:
    Sikkerhed=${s}, Stabilitet=${st}, Udvikling=${d}, 
    Hospital=${h}%, Penge=${money}
  `;
  taskSummaryModal.style.display="flex";
}

// (1) Tabel i Inspect & Adapt
const endModal= document.getElementById('end-modal');
const endGameSummary= document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click',()=>{
  endModal.style.display="none";
  nextPI();
});

function endPI(){
  if(gameState.activeTask){
    endActiveTask();
  }
  endModal.style.display="flex";
  let he= gameState.hospitalExpectations;
  let c= gameState.commitGoals;
  let sec= gameState.security;
  let stab= gameState.stability;
  let dev= gameState.development;
  let h= Math.round(gameState.hospitalSatisfaction);
  let money= gameState.money;

  let hSecDiff= sec- he.security;
  let hStabDiff= stab- he.stability;
  let hDevDiff= dev- he.development;

  let cSecDiff= sec- c.security;
  let cStabDiff= stab- c.stability;
  let cDevDiff= dev- c.development;

  let partial= (hSecDiff>=0 && hStabDiff>=0 && hDevDiff>=0)
     ? "Du opfyldte hospitalets krav på alle stats! Flot!" 
     : "Du nåede ikke helt hospitalets krav på alle stats...";
  let commitComment= (cSecDiff>=0 && cStabDiff>=0 && cDevDiff>=0)
     ? "Du overgik endda dine egne commits. Imponerende!"
     : "Dine commits var højere end dit faktiske resultat på mindst én stat.";

  // (1) Tabel-lignende layout
  // => Vi bruger <table> for overskuelighed
  let tableHTML=`
  <p>${partial}<br/>${commitComment}</p>
  <table style="width:100%; margin-top:8px;">
    <tr>
      <th style="text-align:left; width:160px;">Hospitalets krav:</th>
      <td>S≥${he.security}, St≥${he.stability}, Dev≥${he.development}</td>
    </tr>
    <tr>
      <th style="text-align:left;">Dine commits:</th>
      <td>S=${c.security}, St=${c.stability}, Dev=${c.development}</td>
    </tr>
    <tr>
      <th style="text-align:left;">Faktisk:</th>
      <td>
        S=${sec}, St=${stab}, Dev=${dev}, 
        Hospital=${h}%, Penge=${money}
      </td>
    </tr>
    <tr>
      <th style="text-align:left;">Fuldførte opgaver:</th>
      <td>${gameState.tasksCompleted}</td>
    </tr>
  </table>
  `;

  endGameSummary.innerHTML= `<strong>PI #${gameState.currentPI} slut!</strong><br/>` + tableHTML;
}

function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    showPopup("Alle PI'er er afsluttet. Godt arbejde!", "info");
  } else {
    gameState.availableTasks=[];
    gameState.riskyTotal=0;
    gameState.docSkipCount=0;
    synergyFlags["lackInfra"]= false; 
    startPI();
  }
}

// UTILS
function showPopup(msg,type="success",duration=3000){
  let c= document.getElementById('popup-container');
  let div=document.createElement('div');
  div.classList.add('popup');
  if(type==="error") div.classList.add('error');
  else if(type==="info") div.classList.add('info');
  div.style.animation="none";
  div.textContent= msg;
  c.appendChild(div);
  setTimeout(()=> div.remove(), duration);
}
function showFloatingText(txt, stat){
  let fc= document.getElementById('floating-text-container');
  let div=document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
  div.style.top="50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent=txt;
  fc.appendChild(div);
  setTimeout(()=> div.remove(),2000);
}
