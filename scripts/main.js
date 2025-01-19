/************************************************************
 * main.js
 * 
 * 1) Hospitalets Forventning: hospitalExpectations 
 * 2) Spillerens Commit: commitGoals
 * 3) 90 tid
 * 4) Større moneyCost i tasks
 * 5) I slut => Se difference vs. hospitalExpectations og commit
 ************************************************************/

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

  hospitalExpectations:{}, // e.g. {security:110, stability:108, development:115}
  commitGoals:{},

  introModalOpen:true,
  tutorialStep:0
};

function updateScoreboard(){
  calcHospitalSatisfaction(); // dynamic
  document.getElementById('time-left').textContent= gameState.piTime;
  document.getElementById('money-left').textContent= gameState.money;
  document.getElementById('tasks-completed').textContent= gameState.tasksCompleted;
  document.getElementById('security-value').textContent= gameState.security;
  document.getElementById('stability-value').textContent= gameState.stability;
  document.getElementById('development-value').textContent= gameState.development;
  document.getElementById('hospital-satisfaction').textContent= Math.round(gameState.hospitalSatisfaction);
}

function calcHospitalSatisfaction(){
  let avg= (gameState.security+ gameState.stability+ gameState.development)/3;
  let penalty=0;
  if(gameState.money<0){
    penalty= Math.floor(Math.abs(gameState.money)/100)*2;
  }
  let newVal= avg - penalty;
  gameState.hospitalSatisfaction= Math.max(0, Math.min(newVal,150));
}

/************************************************************
 * Intro
 ************************************************************/
document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display="none";
  openTutorialModal();
});

/************************************************************
 * Tutorial
 ************************************************************/
const tutorialModal= document.getElementById('tutorial-modal');
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl= document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');

let tutorialSteps=[
  {
    title:"Din rolle",
    text:"Du forvalter kritiske LIMS-løsninger. Hospitalet har sine forventninger, du har dit eget commit!"
  },
  {
    title:"Hospitalets Forventning",
    text:"Ved hver PI-start ser du, hvad hospitalet ønsker at øge (Security, Stability, Dev)."
  },
  {
    title:"Dit Commit",
    text:"Du angiver, hvor meget du TROR, du kan løfte disse stats. Senere sammenligner vi."
  },
  {
    title:"Opgaver & Penge",
    text:"Opgaver kan koste store beløb. Går du i minus, falder Hospitalets tilfredshed!"
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

/************************************************************
 * initGame
 ************************************************************/
function initGame(){
  updateScoreboard();
  // backlog
  window.backlog= [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  startPI();
}

/************************************************************
 * startPI => hospitalExpectations => player commits
 ************************************************************/
function startPI(){
  gameState.piTime=90;
  updateScoreboard();

  // generer hospitalExpectations
  // fx 105..115
  gameState.hospitalExpectations={
    security: 100 + Math.floor(Math.random()*10+5),
    stability:100 + Math.floor(Math.random()*10+5),
    development:100+ Math.floor(Math.random()*10+5)
  };

  // vis i pi-start-modal
  const he= gameState.hospitalExpectations;
  document.getElementById('hospital-expectations-text').textContent=
    `Hospitalet forventer, at du mindst når:
     Sikkerhed = ${he.security}, 
     Stabilitet = ${he.stability}, 
     Udvikling = ${he.development}`;

  document.getElementById('pi-start-modal').style.display="flex";
}

document.getElementById('pi-start-ok-btn').addEventListener('click', ()=>{
  let cSec= parseInt(document.getElementById('commit-security').value,10)||0;
  let cStab=parseInt(document.getElementById('commit-stability').value,10)||0;
  let cDev= parseInt(document.getElementById('commit-development').value,10)||0;
  gameState.commitGoals={ security:cSec, stability:cStab, development:cDev };

  document.getElementById('pi-start-modal').style.display="none";

  // generer 3 opgaver
  for(let i=0; i<3; i++){
    generateTask();
  }
  // løbende generering
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
});

/************************************************************
 * generateTask => “Mulige Opgaver”
 ************************************************************/
function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  let notUsed= backlog.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length)return;

  let chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let newTask= JSON.parse(JSON.stringify(chosen));
  newTask.currentStep=0;
  newTask.decisionMadeForStep={};
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
    li.style.border="1px solid #444";
    li.innerHTML= `
      <strong>${t.title}</strong><br/>
      ${t.shortDesc||""}
    `;
    let btn=document.createElement('button');
    btn.classList.add('commit-button');
    btn.textContent="Forpligt";
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      assignTask(t.title);
    });
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
}

/************************************************************
 * assignTask => activeTask
 ************************************************************/
function assignTask(taskTitle){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.piTime<=0){
    endPI();
    return;
  }
  let idx= gameState.availableTasks.findIndex(x=> x.title===taskTitle);
  if(idx===-1)return;
  let chosen= gameState.availableTasks.splice(idx,1)[0];
  gameState.activeTask= chosen;

  document.getElementById('active-task-headline').textContent= chosen.title;
  document.getElementById('active-task-description').textContent= chosen.shortDesc||"";
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
  return loc.split("-").map(s=> s.charAt(0).toUpperCase()+s.slice(1)).join("-");
}

/************************************************************
 * location click => scenario
 ************************************************************/
const locationMap={
  "hospital":document.getElementById('hospital'),
  "infrastruktur":document.getElementById('infrastruktur'),
  "cybersikkerhed":document.getElementById('cybersikkerhed'),
  "informationssikkerhed":document.getElementById('informationssikkerhed'),
  "it-jura":document.getElementById('it-jura'),
  "leverandør":document.getElementById('leverandor'),
  "medicinsk-udstyr":document.getElementById('medicinsk-udstyr'),
  "dokumentation":document.getElementById('dokumentation')
};
Object.keys(locationMap).forEach(locKey=>{
  let el= locationMap[locKey];
  if(el){
    el.addEventListener('click',()=>{
      handleLocationClick(locKey);
    });
  }
});

function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  if(gameState.piTime<=0){
    endPI();
    return;
  }
  let i= gameState.activeTask.currentStep||0;
  let st= gameState.activeTask.steps[i];
  if(!st)return;
  if(locName!== st.location)return;

  showScenarioModal(i);
}

/************************************************************
 * scenario
 ************************************************************/
const scenarioModal= document.getElementById('scenario-modal');
const scenarioTitle= document.getElementById('scenario-title');
const scenarioDescription= document.getElementById('scenario-description');
const scenarioALabel= document.getElementById('scenario-a-label');
const scenarioAText= document.getElementById('scenario-a-text');
const scenarioAButton= document.getElementById('scenario-a-btn');
const scenarioBLabel= document.getElementById('scenario-b-label');
const scenarioBText= document.getElementById('scenario-b-text');
const scenarioBButton= document.getElementById('scenario-b-btn');

function showScenarioModal(stepIndex){
  scenarioModal.style.display="flex";
  let st= gameState.activeTask.steps[stepIndex];
  scenarioTitle.textContent= `Trin ${stepIndex+1}: ${capitalizeLocation(st.location)}`;
  scenarioDescription.textContent= st.stepDescription||"";

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
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost);
  if(eff.riskyPlus) gameState.riskyTotal+= eff.riskyPlus;
  if(eff.statChange){
    for(let [stat, delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
}
function finalizeStep(stepIndex){
  if(!gameState.activeTask)return;
  let t= gameState.activeTask;
  t.currentStep= (t.currentStep||0)+1;
  applyTimeCost(2);
  updateStepsList();
  if(t.currentStep>= t.steps.length){
    showCABModal();
  }
}

/************************************************************
 * time => endPI
 ************************************************************/
function applyTimeCost(t){
  gameState.piTime= Math.max(gameState.piTime-t,0);
  updateScoreboard();
  if(gameState.piTime<=0){
    endPI();
  }
}
function applyMoneyCost(m){
  gameState.money= Math.max(gameState.money-m, -999999); 
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

/************************************************************
 * CAB => drift => task summary
 ************************************************************/
const cabModal= document.getElementById('cab-modal');
const cabSummary= document.getElementById('cab-summary');
document.getElementById('cab-ok-btn').addEventListener('click', finalizeCABResult);

function showCABModal(){
  let fail= gameState.riskyTotal;
  if(fail>1) fail=1;
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.textContent= `CAB ser en risiko på ${(fail*100).toFixed(0)}%`;
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
    cabResultText.textContent="Godkendt – men driftfejl kan stadig ske.";
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko – Opgaven fejler.";
    failTaskCAB();
  }
}
function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  endActiveTask();
}
function postCABTechnicalCheck(){
  let driftFail= gameState.riskyTotal*0.5;
  let r=Math.random();
  if(r< driftFail){
    showPopup("Teknisk driftfejl!", "error");
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

// after finishing => summary
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
const taskSummaryOkBtn= document.getElementById('task-summary-ok-btn');
taskSummaryOkBtn.addEventListener('click',()=>{
  taskSummaryModal.style.display="none";
});
function showTaskSummaryModal(){
  let s= gameState.security;
  let st= gameState.stability;
  let d= gameState.development;
  let h= Math.round(gameState.hospitalSatisfaction);
  let m= gameState.money;
  taskSummaryText.innerHTML=`
    <strong>Opgave slut!</strong><br/>
    Sikkerhed: ${s}<br/>
    Stabilitet: ${st}<br/>
    Udvikling: ${d}<br/>
    Hospital: ${h}%<br/>
    Penge: ${m}
  `;
  taskSummaryModal.style.display="flex";
}

/************************************************************
 * endPI => Inspect & Adapt => Se difference ift. hospitalExpectations og commit
 ************************************************************/
const endModal= document.getElementById('end-modal');
const endGameSummary= document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click',()=>{
  endModal.style.display="none";
  nextPI();
});

function endPI(){
  if(gameState.activeTask){
    gameState.activeTask=null;
    document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
    document.getElementById('active-task-description').textContent="";
    stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  }
  endModal.style.display="flex";
  let he= gameState.hospitalExpectations;
  let c= gameState.commitGoals;
  let sec= gameState.security;
  let stab= gameState.stability;
  let dev= gameState.development;

  // difference vs. hospital
  let hSecDiff= sec - he.security;
  let hStabDiff= stab- he.stability;
  let hDevDiff= dev - he.development;

  // difference vs. commit
  let cSecDiff= sec - c.security;
  let cStabDiff= stab- c.stability;
  let cDevDiff= dev - c.development;

  let sum=`
    <strong>PI #${gameState.currentPI} er slut!</strong><br/>
    Hospitalet forventede: 
      S=${he.security}, St=${he.stability}, Dev=${he.development}<br/>
    Du commit: 
      S=${c.security}, St=${c.stability}, Dev=${c.development}<br/>
    Faktisk:
      S=${sec}, St=${stab}, Dev=${dev}, Hosp=${Math.round(gameState.hospitalSatisfaction)}<br/><br/>

    <em>Forskel ift. Hospitalets forventning:</em><br/>
    - Sikkerhed: ${hSecDiff>=0?"+":""}${hSecDiff}<br/>
    - Stabilitet: ${hStabDiff>=0?"+":""}${hStabDiff}<br/>
    - Udvikling: ${hDevDiff>=0?"+":""}${hDevDiff}<br/><br/>

    <em>Forskel ift. dit Commit:</em><br/>
    - Sikkerhed: ${cSecDiff>=0?"+":""}${cSecDiff}<br/>
    - Stabilitet: ${cStabDiff>=0?"+":""}${cStabDiff}<br/>
    - Udvikling: ${cDevDiff>=0?"+":""}${cDevDiff}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sum;
}

/************************************************************
 * nextPI => 2. iteration or end
 ************************************************************/
function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    showPopup("Alle PI'er er gennemført!", "info");
  } else {
    gameState.availableTasks=[];
    gameState.riskyTotal=0;
    gameState.docSkipCount=0;
    startPI();
  }
}

/************************************************************
 * UTILS
 ************************************************************/
function showPopup(msg,type="success",duration=3000){
  let c= document.getElementById('popup-container');
  let div=document.createElement('div');
  div.classList.add('popup');
  if(type==="error") div.classList.add('error');
  else if(type==="info") div.classList.add('info');
  div.style.animation="none";
  div.textContent= msg;
  c.appendChild(div);
  setTimeout(()=> div.remove(),duration);
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
  div.textContent= txt;
  fc.appendChild(div);
  setTimeout(()=> div.remove(),2000);
}
