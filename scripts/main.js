// scripts/main.js

// If you want all tasks to cost less globally, set a costScale < 1
const costScale = 0.5; // e.g. all money costs halved

const scenarioFlavorPool = [
  "Personalet klager over tunge systemer...",
  "Ledelsen vil se forbedringer NU!",
  "Sporadiske net-fejl giver frustration.",
  "Ekstern revisor dukker op om lidt...",
  "Snak om større compliance-krav fylder i kantinen!"
];

// random mini-event
function maybeTriggerSmallEvent(){
  const chance = Math.random();
  if(chance<0.12){ // 12% chance each invocation
    const eventRoll = Math.random();
    if(eventRoll<0.4){
      showPopup("Event: Hospital klager over for sen info! Tid -2", "info");
      applyTimeCost(2);
    } else {
      showPopup("Event: Region tildeler en lille bonus! +50 kr", "info");
      applyMoneyCost(-50);
    }
  }
}

let gameState = {
  security:100,
  stability:100,
  development:100,
  hospitalSatisfaction:100,

  money:1000,
  piTime:90,
  currentPI:1,
  maxPI:2,

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

  introModalOpen:true,
  tutorialStep:0
};

function updateScoreboard(){
  calcHospitalSatisfaction();
  document.getElementById('time-left').textContent= gameState.piTime;
  document.getElementById('money-left').textContent= gameState.money;
  document.getElementById('tasks-completed').textContent= gameState.tasksCompleted;
  document.getElementById('security-value').textContent= gameState.security;
  document.getElementById('stability-value').textContent= gameState.stability;
  document.getElementById('development-value').textContent= gameState.development;
  document.getElementById('hospital-satisfaction').textContent= Math.round(gameState.hospitalSatisfaction);
}

function calcHospitalSatisfaction(){
  const avg= (gameState.security+ gameState.stability+ gameState.development)/3;
  let penalty=0;
  if(gameState.money<0){
    penalty= Math.floor(Math.abs(gameState.money)/100)*2;
  }
  const newVal= avg-penalty;
  gameState.hospitalSatisfaction= Math.max(0, Math.min(newVal,150));
}

document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display="none";
  openTutorialModal();
});

// TUTORIAL
const tutorialModal= document.getElementById('tutorial-modal');
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl= document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');

let tutorialSteps=[
  {
    title:"Din Rolle",
    text:"Du er IT-forvalter. Du skal balancere drift, sikkerhed, udvikling og tilfredshed. Klar?"
  },
  {
    title:"PI Start",
    text:"Hver PI: 90 tid, hospitalet har krav, du har commit. Vælg kløgtigt!"
  },
  {
    title:"Opgaver",
    text:"Se 'Mulige Opgaver'. Vælg en, følg trin (3–6). Klik lokation -> scenario modal -> valg A/B."
  },
  {
    title:"CAB & Driftfejl",
    text:"Til slut i opgaven: CAB risikovurdering + drift-check. Dokumentation skip = mere risiko!"
  },
  {
    title:"Overwork",
    text:"Hvis tid=0, du kan betale 50 kr for +5 tid, men kun én gang per PI hvis penge≥50."
  },
  {
    title:"Held & Lykke",
    text:"Forsøg at møde hospitalets forventninger og dine commits. God fornøjelse!"
  }
];
let tutorialIdx=0;
function openTutorialModal(){
  tutorialModal.style.display="flex";
  showTutorialContent();
}
function showTutorialContent(){
  if(tutorialIdx>=tutorialSteps.length){
    tutorialModal.style.display="none";
    initGame();
    return;
  }
  tutorialTitleEl.textContent= tutorialSteps[tutorialIdx].title;
  tutorialTextEl.textContent= tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click',()=>{
  tutorialIdx++;
  showTutorialContent();
});

// init
function initGame(){
  updateScoreboard();
  window.backlog=[
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  startPI();
}

function startPI(){
  gameState.piTime=90;
  gameState.overworkUsed=false;
  updateScoreboard();

  gameState.hospitalExpectations={
    security:100+ Math.floor(Math.random()*11+5),
    stability:100+ Math.floor(Math.random()*11+5),
    development:100+ Math.floor(Math.random()*11+5)
  };
  const he= gameState.hospitalExpectations;
  document.getElementById('hospital-expectations-text').textContent=
    `Hospitalet kræver: 
     Sikkerhed ≥ ${he.security},
     Stabilitet ≥ ${he.stability},
     Udvikling ≥ ${he.development}
     (på denne PI)`;

  document.getElementById('pi-start-modal').style.display="flex";
}

document.getElementById('pi-start-ok-btn').addEventListener('click',()=>{
  let cSec = parseInt(document.getElementById('commit-security').value,10)||0;
  let cStab= parseInt(document.getElementById('commit-stability').value,10)||0;
  let cDev = parseInt(document.getElementById('commit-development').value,10)||0;
  gameState.commitGoals={ security:cSec, stability:cStab, development:cDev };

  document.getElementById('pi-start-modal').style.display="none";

  // generate initial tasks
  for(let i=0;i<3;i++){
    generateTask();
  }
  maybeTriggerSmallEvent();

  // tasks appear every 12s
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },12000);
});

function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  const notUsed= window.backlog.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length)return;

  const chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  const newTask= JSON.parse(JSON.stringify(chosen));
  newTask.currentStep=0;
  newTask.decisionMadeForStep={};
  gameState.availableTasks.push(newTask);
  renderTasks();
  maybeTriggerSmallEvent();
}

const tasksList= document.getElementById('tasks-list');
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement('li');
    li.innerHTML=`
      <strong>${t.title}</strong><br/>
      ${t.shortDesc||"Ingen beskrivelse"}
    `;
    const btn=document.createElement('button');
    btn.classList.add('commit-button');
    btn.textContent="Tag Opgave";
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      assignTask(t.title);
    });
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
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
  const idx= gameState.availableTasks.findIndex(x=> x.title===taskTitle);
  if(idx===-1)return;
  const chosen= gameState.availableTasks.splice(idx,1)[0];
  gameState.activeTask= chosen;

  document.getElementById('active-task-headline').textContent= chosen.title;
  document.getElementById('active-task-description').textContent= chosen.logicLong || chosen.shortDesc;
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
  const c= gameState.activeTask.currentStep||0;
  gameState.activeTask.steps.forEach((st,i)=>{
    const li=document.createElement('li');
    li.textContent=`Trin ${i+1}: ${capitalizeLocation(st.location)}`;
    if(i<c){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsListEl.appendChild(li);
  });
}

function capitalizeLocation(loc){
  if(!loc)return loc;
  return loc.split("-").map(s=> s.charAt(0).toUpperCase()+ s.slice(1)).join("-");
}

function checkOverworkOrEndPI(){
  if(!gameState.overworkUsed && gameState.money>=50){
    const yes= confirm("Tiden er op! Vil du bruge 50 kr på overarbejde +5 tid? (En gang per PI)");
    if(yes){
      applyMoneyCost(50);
      gameState.piTime+=5;
      updateScoreboard();
      gameState.overworkUsed=true;
      showPopup("Du købte overarbejde: -50 kr, +5 tid!", "info");
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
  const i= gameState.activeTask.currentStep||0;
  const st= gameState.activeTask.steps[i];
  if(!st)return; 
  if(locName!== st.location)return;

  showScenarioModal(i);
}

function showScenarioModal(stepIndex){
  scenarioModal.style.display="flex";
  const st= gameState.activeTask.steps[stepIndex];
  scenarioTitle.textContent= `Trin ${stepIndex+1}: ${capitalizeLocation(st.location)}`;
  scenarioFlavorText.textContent= scenarioFlavorPool[Math.floor(Math.random()* scenarioFlavorPool.length)];
  scenarioDescription.textContent= st.stepDescription || "En generisk situation.";
  scenarioALabel.textContent= st.choiceA.label;
  scenarioAText.textContent= st.choiceA.text;
  scenarioAButton.onclick=()=>{
    applyChoiceEffect(st.choiceA.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display="none";
  };
  scenarioBLabel.textContent= st.choiceB.label;
  scenarioBText.textContent= st.choiceB.text;
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
    for(const [stat,delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
}

function applyTimeCost(t){
  gameState.piTime= Math.max(gameState.piTime - t, 0);
  updateScoreboard();
  if(gameState.piTime<=0){
    checkOverworkOrEndPI();
  }
}
function applyMoneyCost(m){
  gameState.money= Math.max(gameState.money - m, -999999);
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta, 0),150);
  updateScoreboard();
  showFloatingText((delta>=0? `+${delta}`:`${delta}`)+" "+stat, stat);
}

function finalizeStep(stepIndex){
  const t= gameState.activeTask;
  if(!t)return;
  t.currentStep= (t.currentStep||0)+1;
  applyTimeCost(2); 
  updateStepsList();

  // if we've done all steps for that task
  if(t.currentStep>= t.steps.length){
    showCABModal();
  }
}

// CAB
const cabModal= document.getElementById('cab-modal');
const cabSummary= document.getElementById('cab-summary');
document.getElementById('cab-ok-btn').addEventListener('click', finalizeCABResult);

function showCABModal(){
  let docSkips= gameState.docSkipCount;
  let fail= gameState.riskyTotal + docSkips*0.05;
  if(fail>1) fail=1;
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerText=`
    CAB ser på din dokumentation og dine valg.
    Antal gange du sprang dok: ${docSkips}.
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
  let r=Math.random();
  if(r< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(ok){
  cabResultModal.style.display="flex";
  if(ok){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="CAB er tryg ved din opgave – men driftfejl kan stadig ske!";
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko eller for lidt dokumentation. Opgaven kasseres.";
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
  const driftFactor=0.3;
  const driftFail= gameState.riskyTotal* driftFactor;
  if(Math.random()< driftFail){
    showPopup("Driftfejl: Implementeringen fejlede alligevel!", "error");
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

function endActiveTask(){
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
  showTaskSummaryModal();
}

// Task summary
const taskSummaryModal= document.getElementById('task-summary-modal');
const taskSummaryText= document.getElementById('task-summary-text');
const taskSummaryOkBtn= document.getElementById('task-summary-ok-btn');
taskSummaryOkBtn.addEventListener('click', ()=>{
  taskSummaryModal.style.display="none";
});

function showTaskSummaryModal(){
  const s= gameState.security;
  const st= gameState.stability;
  const d= gameState.development;
  const h= Math.round(gameState.hospitalSatisfaction);
  const m= gameState.money;

  taskSummaryText.innerHTML=`
    <strong>Opgaven er afsluttet!</strong><br/>
    <em>Stats nu:</em><br/>
    Sikkerhed=${s}, Stabilitet=${st}, Udvikling=${d}, 
    Hospital=${h}%, Penge=${m}
    <br/>
    Godt gået – fortsæt med at løse opgaver eller start en ny.
  `;
  taskSummaryModal.style.display="flex";
}

// End-of-PI => Inspect & Adapt
const endModal= document.getElementById('end-modal');
const endGameSummary= document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click', ()=>{
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

  let hSecDiff= sec - he.security;
  let hStabDiff= stab - he.stability;
  let hDevDiff= dev - he.development;

  let cSecDiff= sec - c.security;
  let cStabDiff= stab - c.stability;
  let cDevDiff= dev - c.development;

  let partialMessage="";
  if(hSecDiff>=0 && hStabDiff>=0 && hDevDiff>=0){
    partialMessage="Du har klaret hospitalets forventninger med bravur!";
  } else {
    partialMessage="Hospitalet havde lidt højere forventninger nogle steder...";
  }
  let commitMessage="";
  if(cSecDiff>=0 && cStabDiff>=0 && cDevDiff>=0){
    commitMessage="Du overgår endda dine egne commits. Fremragende!";
  } else {
    commitMessage="Dine commits lå lidt højere end hvad du nåede.";
  }

  let sum=`
    <strong>PI #${gameState.currentPI} slut!</strong><br/>
    <em>${partialMessage}</em><br/>
    <em>${commitMessage}</em><br/><br/>

    Hospitalets krav: 
      S≥${he.security}, St≥${he.stability}, Dev≥${he.development}<br/>
    Dine commits: 
      S=${c.security}, St=${c.stability}, Dev=${c.development}<br/>
    <strong>Faktisk:</strong> 
      S=${sec}, St=${stab}, Dev=${dev}, 
      Hospital=${h}%, Penge=${money}<br/>

    Du løftede S med ${hSecDiff>=0?"+"+hSecDiff:hSecDiff} ift. hospitalets krav,
    St med ${hStabDiff>=0?"+"+hStabDiff:hStabDiff},
    Dev med ${hDevDiff>=0?"+"+hDevDiff:hDevDiff}.<br/>

    ift. dine commits: 
    S: ${cSecDiff>=0?"+"+cSecDiff:cSecDiff}, 
    St: ${cStabDiff>=0?"+"+cStabDiff:cStabDiff}, 
    Dev: ${cDevDiff>=0?"+"+cDevDiff:cDevDiff}.<br/>
    Fuldførte opgaver i denne PI: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sum;
}

function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    showPopup("Alle PI'er gennemført! Godt klaret!", "info");
  } else {
    gameState.availableTasks=[];
    gameState.riskyTotal=0;
    gameState.docSkipCount=0;
    startPI();
  }
}

// UTILS
function showPopup(msg,type="success",duration=3000){
  const c= document.getElementById('popup-container');
  const div=document.createElement('div');
  div.classList.add('popup');
  if(type==="error") div.classList.add('error');
  else if(type==="info") div.classList.add('info');
  div.style.animation="none";
  div.textContent= msg;
  c.appendChild(div);
  setTimeout(()=> div.remove(), duration);
}

function showFloatingText(txt, stat){
  const fc= document.getElementById('floating-text-container');
  const div=document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
  div.style.top="50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent= txt;
  fc.appendChild(div);
  setTimeout(()=> div.remove(),2000);
}
