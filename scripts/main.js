// scripts/main.js

let gameState = {
  security:100,
  stability:100,
  development:100,
  hospitalSatisfaction:100,

  money:1000,
  piTime:30,
  currentPI:1,
  maxPI:2, // 2 iterationer

  tasksCompleted:0,
  activeTask:null,
  availableTasks:[],
  usedTasks:new Set(),

  docSkipCount:0,
  riskyTotal:0,
  finalFailChance:0,

  // Store player's commits & business goals pr. PI
  businessGoals:{}, 
  commitGoals:{},

  introModalOpen:true,
  tutorialActive:false,
  tutorialStep:0,

  totalScore:0
};

function updateScoreboard(){
  document.getElementById('time-left').textContent= gameState.piTime;
  document.getElementById('money-left').textContent= gameState.money;
  document.getElementById('tasks-completed').textContent= gameState.tasksCompleted;
  document.getElementById('security-value').textContent= gameState.security;
  document.getElementById('stability-value').textContent= gameState.stability;
  document.getElementById('development-value').textContent= gameState.development;
  document.getElementById('hospital-satisfaction').textContent= gameState.hospitalSatisfaction;
}

// Intro
document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display="none";
  openTutorialModal();
});

// Tutorial
const tutorialModal= document.getElementById('tutorial-modal');
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl= document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');

let tutorialSteps=[
  {title:"Velkommen", text:"Vi kører 2 PI'er, hver 30 tid. Du får business-mål, laver commit, vælger opgaver."},
  {title:"CAB", text:"Hver opgave har 4 trin. Slut => CAB tjek + driftfejl."},
  {title:"I&A", text:"Ved tid=0 => Inspect & Adapt, se difference: Mål vs. Commit vs. Faktisk."},
  {title:"God fornøjelse", text:"Se om du kan opfylde ambitionerne!"}
];
let tutorialIndex=0;

function openTutorialModal(){
  tutorialModal.style.display="flex";
  showTutorialContent();
}
function showTutorialContent(){
  if(tutorialIndex>= tutorialSteps.length){
    tutorialModal.style.display="none";
    initGame();
    return;
  }
  tutorialTitleEl.textContent= tutorialSteps[tutorialIndex].title;
  tutorialTextEl.textContent= tutorialSteps[tutorialIndex].text;
}
tutorialNextBtn.addEventListener('click', ()=>{
  tutorialIndex++;
  showTutorialContent();
});

// initGame => load tasks => startPI
function initGame(){
  updateScoreboard();
  // Saml tasks i backlog-liste:
  window.fullBacklog = [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  startPI();
}

// Start PI => generer business goals => vis piStartModal
function startPI(){
  // nulstil tid + arrangement
  gameState.piTime=30;
  updateScoreboard();

  // generer business goals
  // eksempeltal:
  gameState.businessGoals={
    security: 100 + Math.floor(Math.random()*10+5), // ex 105-115
    stability:100 + Math.floor(Math.random()*10+5),
    development:100+ Math.floor(Math.random()*10+5),
    hospital:100+ Math.floor(Math.random()*10+5)
  };

  // vis modal
  document.getElementById('pi-business-goals-text').innerText=`
  PI #${gameState.currentPI} Mål: 
  Security=${gameState.businessGoals.security}, 
  Stability=${gameState.businessGoals.stability}, 
  Development=${gameState.businessGoals.development}, 
  Hospital=${gameState.businessGoals.hospital}
  `;
  document.getElementById('pi-start-modal').style.display="flex";
}

document.getElementById('pi-start-ok-btn').addEventListener('click', ()=>{
  // Læs commit-values
  let cSec= parseInt(document.getElementById('commit-security').value,10);
  let cStab=parseInt(document.getElementById('commit-stability').value,10);
  let cDev= parseInt(document.getElementById('commit-development').value,10);
  let cHosp=parseInt(document.getElementById('commit-hospital').value,10);

  gameState.commitGoals={
    security:cSec,
    stability:cStab,
    development:cDev,
    hospital:cHosp
  };
  document.getElementById('pi-start-modal').style.display="none";
  openPIPlanModal();
});

// PI Plan => vælg op til 5 opgaver
const backlogListEl= document.getElementById('backlog-list');
const piPlanModal= document.getElementById('pi-plan-modal');
document.getElementById('pi-plan-ok-btn').addEventListener('click', startPIExecution);

function openPIPlanModal(){
  piPlanModal.style.display="flex";
  backlogListEl.innerHTML="";
  window.fullBacklog.forEach((taskObj,idx)=>{
    // skip if used
    if(gameState.usedTasks.has(taskObj.title))return; 

    let li= document.createElement('li');
    li.innerHTML=`<strong>${taskObj.title}</strong><br/>
    ${taskObj.shortDesc||""}`;
    li.dataset.taskIndex= idx;
    li.addEventListener('click', ()=>{
      li.classList.toggle('selected');
    });
    backlogListEl.appendChild(li);
  });
}

function startPIExecution(){
  // find selected tasks
  let selected= backlogListEl.querySelectorAll('.selected');
  let chosenTitles=[];
  selected.forEach(li=>{
    if(chosenTitles.length<5){
      let idx=parseInt(li.dataset.taskIndex,10);
      chosenTitles.push(window.fullBacklog[idx].title);
    }
  });
  // op til 5
  // mark them for available
  chosenTitles.forEach(tit=>{
    // find in backlog
    let tObj= window.fullBacklog.find(o=> o.title=== tit);
    if(tObj) gameState.availableTasks.push(structuredClone(tObj));
    // structuredClone => for at genbruge
    gameState.usedTasks.add(tObj.title); // men du beholder
  });

  piPlanModal.style.display="none";
  renderTasks();
}

// render tasks => i #tasks-list
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
    let txt= `<strong>${t.title}</strong><br/>
    ${t.shortDesc||""}`;
    li.innerHTML= txt;
    let btn= document.createElement('button');
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
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.piTime<=0){
    endOfPI();
    return;
  }
  let idx= gameState.availableTasks.findIndex(x=> x.title===taskTitle);
  if(idx===-1) return;

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
    if(i< c){
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

// location click => scenario
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
    endOfPI();
    return;
  }
  let i= gameState.activeTask.currentStep||0;
  if(i>= gameState.activeTask.steps.length) return;
  let st= gameState.activeTask.steps[i];
  if(!st)return;
  if(locName!== st.location) return;

  showScenarioModal(i);
}

// scenario
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
  scenarioTitle.textContent=`Trin ${stepIndex+1}: ${capitalizeLocation(st.location)}`;
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
  if(eff.riskyPlus) gameState.riskyTotal += eff.riskyPlus;
  if(eff.statChange){
    for(let [stat, delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
}

function finalizeStep(stepIndex){
  let t= gameState.activeTask;
  if(!t)return;
  t.currentStep= (t.currentStep||0)+1;
  applyTimeCost(2); // baseline
  updateStepsList();
  if(t.currentStep>= t.steps.length){
    // => CAB
    showCABModal();
  }
}

function applyTimeCost(t){
  gameState.piTime= Math.max(gameState.piTime-t,0);
  updateScoreboard();
  if(gameState.piTime<=0){
    endOfPI();
  }
}
function applyMoneyCost(m){
  gameState.money= Math.max(gameState.money-m,0);
  updateScoreboard();
}
function applyStatChange(stat, delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

// CAB
const cabModal= document.getElementById('cab-modal');
const cabSummary= document.getElementById('cab-summary');
document.getElementById('cab-ok-btn').addEventListener('click', finalizeCABResult);

function showCABModal(){
  let fail= gameState.riskyTotal;
  fail= Math.min(fail, 1);
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.textContent= `
  Samlet risiko: ${(fail*100).toFixed(0)}%
  `.trim();
}

function finalizeCABResult(){
  cabModal.style.display="none";
  let r=Math.random();
  if(r< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

const cabResultModal= document.getElementById('cab-result-modal');
const cabResultTitle= document.getElementById('cab-result-title');
const cabResultText= document.getElementById('cab-result-text');
document.getElementById('cab-result-ok-btn').addEventListener('click', ()=>{
  cabResultModal.style.display="none";
});

function showCABResult(ok){
  cabResultModal.style.display="flex";
  if(ok){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="Implementering i drift...";
    postCABTechnicalCheck();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko – Opgaven fejler.";
    failTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function postCABTechnicalCheck(){
  cabResultModal.style.display="none";
  let driftFail= gameState.riskyTotal*0.5;
  if(Math.random()< driftFail){
    showPopup("Driftfejl! Implementering mislykkes.", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    gameState.activeTask=null;
  } else {
    showPopup("Drift-check bestået!", "success");
    completeTaskCAB();
  }
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  gameState.activeTask= null;
  updateScoreboard();
}

// End-of-PI => Inspect & Adapt
function endOfPI(){
  if(gameState.activeTask){
    gameState.activeTask= null;
    document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
    document.getElementById('active-task-description').textContent="";
    stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  }
  showInspectAndAdapt();
}

const iaModal= document.getElementById('ia-modal');
const iaSummary= document.getElementById('ia-summary');
document.getElementById('ia-ok-btn').addEventListener('click', nextPI);

function showInspectAndAdapt(){
  iaModal.style.display="flex";
  // tjek difference
  let b= gameState.businessGoals;
  let c= gameState.commitGoals;
  let actual={
    security:gameState.security,
    stability:gameState.stability,
    development:gameState.development,
    hospital:gameState.hospitalSatisfaction
  };
  let text=`
  <strong>PI #${gameState.currentPI} er slut!</strong><br/>
  <em>Business Mål</em>: S=${b.security}, St=${b.stability}, Dev=${b.development}, Hosp=${b.hospital}<br/>
  <em>Du commit</em>: S=${c.security}, St=${c.stability}, Dev=${c.development}, Hosp=${c.hospital}<br/>
  <em>Faktisk</em>: S=${actual.security}, St=${actual.stability}, Dev=${actual.development}, Hosp=${actual.hospital}<br/>
  Fuldførte Opgaver: ${gameState.tasksCompleted}<br/>
  `;
  iaSummary.innerHTML= text;
}

function nextPI(){
  iaModal.style.display="none";
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    endGame();
  } else {
    // tøm available tasks
    gameState.availableTasks=[];
    gameState.riskyTotal=0;
    gameState.docSkipCount=0;
    startPI();
  }
}

const endModal=document.getElementById('end-modal');
const endGameSummary=document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click',()=>{
  endModal.style.display="none";
});

function endGame(){
  endModal.style.display="flex";
  let sum=`
  <strong>Alle ${gameState.maxPI} PI'er gennemført</strong><br/>
  Sikkerhed=${gameState.security}, Stabilitet=${gameState.stability}, 
  Udvikling=${gameState.development}, Hospital=${gameState.hospitalSatisfaction}<br/>
  Fuldførte opgaver=${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sum;
}

function showPopup(msg, type="success", duration=3000){
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
  div.textContent= txt;
  fc.appendChild(div);
  setTimeout(()=> div.remove(), 2000);
}
