// scripts/main.js

// Random small flavor texts for scenario
const scenarioFlavorPool = [
  "Du hører rygter om personalet klager over IT-stabilitet...",
  "En travl sygeplejerske spørger, hvor data gemmes?",
  "Ledelsen vil gerne se hurtige resultater!",
  "En ekstern konsulent giver rådet at fokusere på jura...",
  "Audit-teamet står klar om 2 uger - tidspres stiger!"
];

// random mini-event: triggers once in a while
function maybeTriggerSmallEvent(){
  const chance = Math.random();
  if(chance<0.15){ // 15% chance every time we call this
    let eventRoll = Math.random();
    if(eventRoll<0.5){
      showPopup("Event: Hospital klager over sene opdateringer! Tid -2", "info");
      applyTimeCost(2);
    } else {
      showPopup("Event: Ekstern sponsor giver en donation! +100 kr", "info");
      applyMoneyCost(-100); // negative cost => you gain
    }
  }
}

// The global game state
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
  overworkUsed:false, // track if the player used overwork this PI

  hospitalExpectations:{}, 
  commitGoals:{},

  introModalOpen:true,
  tutorialStep:0
};

// UI references
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
  let newVal= avg - penalty;
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

let tutorialSteps = [
  {
    title:"Din rolle",
    text:"Du forvalter LIMS for hospitalet. Hver PI har 90 tid, og du sætter commits. Hospitalet har også sine forventninger."
  },
  {
    title:"Commits & Forventninger",
    text:"Når PI starter, ser du hospitalets forventninger (Sikkerhed, Stabilitet, Udvikling) samt indtaster egne commits."
  },
  {
    title:"Opgaver",
    text:"Opgaver genereres i 'Mulige Opgaver.' Vælg en -> se trin -> klik lokation for scenario -> vælg A/B. Tid og penge bruges."
  },
  {
    title:"CAB & Driftfejl",
    text:"Hver opgave slutter med en CAB-risiko + en driftfejl-check. Dokumentation skip øger risiko! Vær forsigtig."
  },
  {
    title:"Overwork",
    text:"Hvis du løber tør for tid, kan du betale 50 kr for +5 tid, men kun én gang pr PI (og kun hvis du har råd)."
  },
  {
    title:"Held og Lykke",
    text:"Se om du kan opfylde både hospitalets forventninger og dine commits, uden at løbe tør for penge!"
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
tutorialNextBtn.addEventListener('click',()=>{
  tutorialIdx++;
  showTutorialContent();
});

// init
function initGame(){
  updateScoreboard();
  // backlog
  window.backlog = [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  startPI();
}

// start a PI => show hospital expectations, let user commit
function startPI(){
  gameState.piTime=90;
  gameState.overworkUsed=false;
  updateScoreboard();

  // generate hospital expectations
  gameState.hospitalExpectations = {
    security:100 + Math.floor(Math.random()*11+5),  // 105..115
    stability:100 + Math.floor(Math.random()*11+5),
    development:100 + Math.floor(Math.random()*11+5)
  };

  let he= gameState.hospitalExpectations;
  document.getElementById('hospital-expectations-text').textContent=
    `Hospitalet forventer mindst: 
     Sikkerhed = ${he.security}, 
     Stabilitet = ${he.stability}, 
     Udvikling = ${he.development}`;

  document.getElementById('pi-start-modal').style.display="flex";
}

document.getElementById('pi-start-ok-btn').addEventListener('click', ()=>{
  let cSec= parseInt(document.getElementById('commit-security').value,10)||0;
  let cStab=parseInt(document.getElementById('commit-stability').value,10)||0;
  let cDev= parseInt(document.getElementById('commit-development').value,10)||0;
  gameState.commitGoals = { security:cSec, stability:cStab, development:cDev };

  document.getElementById('pi-start-modal').style.display="none";

  // generate 3 tasks
  for(let i=0;i<3;i++){
    generateTask();
  }
  // plus random event check
  maybeTriggerSmallEvent();

  // tasks appear over time
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },12000);
});

function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  let notUsed= window.backlog.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length)return;

  let chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let newTask= JSON.parse(JSON.stringify(chosen));
  newTask.currentStep=0;
  newTask.decisionMadeForStep={};
  gameState.availableTasks.push(newTask);
  renderTasks();
  maybeTriggerSmallEvent();
}

const tasksList=document.getElementById('tasks-list');
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    let li=document.createElement('li');
    li.style.border="1px solid #444";
    li.innerHTML= `<strong>${t.title}</strong><br/>${t.shortDesc||""}`;
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

function assignTask(taskTitle){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave i gang!", "error");
    return;
  }
  if(gameState.piTime<=0){
    checkOverworkOrEndPI();
    return;
  }
  let idx=gameState.availableTasks.findIndex(x=> x.title=== taskTitle);
  if(idx===-1)return;
  let chosen= gameState.availableTasks.splice(idx,1)[0];
  gameState.activeTask= chosen;
  document.getElementById('active-task-headline').textContent= chosen.title;
  document.getElementById('active-task-description').textContent= chosen.logicLong||chosen.shortDesc||"";
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
    li.textContent= `Trin ${i+1}: ${capitalizeLocation(st.location)}`;
    if(i<c){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsListEl.appendChild(li);
  });
}

function capitalizeLocation(loc){
  if(!loc)return loc;
  return loc.split("-").map(x=> x.charAt(0).toUpperCase()+x.slice(1)).join("-");
}

function checkOverworkOrEndPI(){
  // if you haven't used overwork, and money >=50, ask user
  if(!gameState.overworkUsed && gameState.money>=50){
    let yes= confirm("Tiden er brugt op! Vil du betale 50 kr for +5 tid? (Kun én gang)");
    if(yes){
      applyMoneyCost(50);
      gameState.piTime+=5;
      updateScoreboard();
      gameState.overworkUsed=true;
      showPopup("Du brugte overarbejde: -50 kr, +5 tid!", "info");
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
const scenarioALabel= document.getElementById('scenario-a-label');
const scenarioAText= document.getElementById('scenario-a-text');
const scenarioAButton= document.getElementById('scenario-a-btn');
const scenarioBLabel= document.getElementById('scenario-b-label');
const scenarioBText= document.getElementById('scenario-b-text');
const scenarioBButton= document.getElementById('scenario-b-btn');

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
  if(locName!==st.location)return;

  showScenarioModal(i);
}

const locationEls = {
  hospital: document.querySelector('.location.hospital'),
  infrastruktur: document.querySelector('.location.infrastruktur'),
  cybersikkerhed: document.querySelector('.location.cybersikkerhed'),
  informationssikkerhed: document.querySelector('.location.informationssikkerhed'),
  "it-jura": document.querySelector('.location.it-jura'),
  leverandør: document.querySelector('.location.leverandor'),
  "medicinsk-udstyr": document.querySelector('.location.medicinsk-udstyr'),
  dokumentation: document.querySelector('.location.dokumentation')
};

Object.entries(locationEls).forEach(([locKey, el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(locKey);
  });
});

function showScenarioModal(stepIndex){
  scenarioModal.style.display="flex";
  let st= gameState.activeTask.steps[stepIndex];

  scenarioTitle.textContent = `Trin ${stepIndex+1}: ${capitalizeLocation(st.location)}`;
  scenarioFlavorText.textContent = scenarioFlavorPool[Math.floor(Math.random()*scenarioFlavorPool.length)];
  scenarioDescription.textContent = st.stepDescription || "Standard scenarie";
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
  if(eff.riskyPlus) gameState.riskyTotal += eff.riskyPlus;
  if(eff.statChange){
    for(let [stat,delta] of Object.entries(eff.statChange)){
      applyStatChange(stat,delta);
    }
  }
}

function applyTimeCost(t){
  gameState.piTime=Math.max(gameState.piTime - t, 0);
  updateScoreboard();
  if(gameState.piTime<=0){
    checkOverworkOrEndPI();
  }
}
function applyMoneyCost(m){
  gameState.money=Math.max(gameState.money - m, -99999);
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]=Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`: `${delta}`)+" "+stat, stat);
  if(stat==="development" && delta>3){
    maybeTriggerSmallEvent();
  }
}

function finalizeStep(stepIndex){
  let t= gameState.activeTask;
  if(!t)return;
  t.currentStep= (t.currentStep||0)+1;
  applyTimeCost(2);
  updateStepsList();
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
  cabSummary.innerText=
    `CAB ser på din dokumentation og dine valg.
    Du har sprunget dokumentation over ${docSkips} gange.
    Samlet risiko: ${(fail*100).toFixed(0)}%`;
}

const cabResultModal= document.getElementById('cab-result-modal');
const cabResultTitle= document.getElementById('cab-result-title');
const cabResultText= document.getElementById('cab-result-text');
document.getElementById('cab-result-ok-btn').addEventListener('click', ()=>{
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
    cabResultText.textContent="CAB accepterer dit oplæg... men driftfejl kan stadig opstå!";
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="CAB finder for stor risiko eller for lidt dok. Opgaven fejler.";
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
  let driftFail= gameState.riskyTotal*0.3; // smaller drift factor
  if(Math.random()<driftFail){
    showPopup("Driftfejl! Implementeringen mislykkes!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    endActiveTask();
  } else {
    showPopup("Drift-check bestået, opgaven lykkes!", "success");
    completeTaskCAB();
  }
}

// after success
function completeTaskCAB(){
  gameState.tasksCompleted++;
  endActiveTask();
}

// end active task => show summary
function endActiveTask(){
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
  showTaskSummaryModal();
}

// task summary
const taskSummaryModal= document.getElementById('task-summary-modal');
const taskSummaryText= document.getElementById('task-summary-text');
const taskSummaryOkBtn= document.getElementById('task-summary-ok-btn');
taskSummaryOkBtn.addEventListener('click', ()=>{
  taskSummaryModal.style.display="none";
});
function showTaskSummaryModal(){
  let s= gameState.security;
  let st= gameState.stability;
  let d= gameState.development;
  let h= Math.round(gameState.hospitalSatisfaction);
  let m= gameState.money;
  taskSummaryText.innerHTML=`
    <strong>Opgaven er afsluttet!</strong><br/>
    Sikkerhed: ${s}, Stabilitet: ${st}, Udvikling: ${d}, Hospital: ${h}%, Penge: ${m}
  `;
  taskSummaryModal.style.display="flex";
}

// endOfPI => Inspect & Adapt
const endModal=document.getElementById('end-modal');
const endGameSummary=document.getElementById('end-game-summary');
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

  let hSecDiff= sec - he.security;
  let hStabDiff= stab - he.stability;
  let hDevDiff= dev - he.development;

  let cSecDiff= sec - c.security;
  let cStabDiff= stab - c.stability;
  let cDevDiff= dev - c.development;

  let sum=`
    <strong>PI #${gameState.currentPI} er slut!</strong><br/>
    Hospitalet forventede mindst 
      S=${he.security}, St=${he.stability}, Dev=${he.development}<br/>
    Du commit:
      S=${c.security}, St=${c.stability}, Dev=${c.development}<br/>
    Faktisk:
      S=${sec}, St=${stab}, Dev=${dev}, 
      Hospital=${Math.round(gameState.hospitalSatisfaction)}, 
      Penge=${gameState.money}<br/><br/>

    Forskel ift. Hospitalets forventning:
    S: ${hSecDiff>=0?"+":""}${hSecDiff}, 
    St: ${hStabDiff>=0?"+":""}${hStabDiff}, 
    Dev: ${hDevDiff>=0?"+":""}${hDevDiff}<br/>
    Forskel ift. dit Commit:
    S: ${cSecDiff>=0?"+":""}${cSecDiff}, 
    St: ${cStabDiff>=0?"+":""}${cStabDiff}, 
    Dev: ${cDevDiff>=0?"+":""}${cDevDiff}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sum;
}

function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    showPopup("Alle PI'er er gennemført!", "info");
    // optional: final end screen
  } else {
    gameState.availableTasks=[];
    gameState.riskyTotal=0;
    gameState.docSkipCount=0;
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
  div.textContent=txt;
  fc.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}
