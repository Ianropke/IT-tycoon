/************************************************************
 * main.js – Learning Edition
 * 
 * Integrates:
 *  - narrativeIntro (short story snippet)
 *  - digDeeperLinks (array of { label, url })
 *  - knowledgeRecap (shown after finishing a task)
 ************************************************************/

let gameState = {
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,

  money: 2000,
  time: 100,
  tasksCompleted: 0,
  activeTask: null,
  availableTasks: [],
  usedTasks: new Set(),

  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,

  lastFinishedTask: null,

  // Optional: track PI if you want
};

const scenarioFlavorPool = [
  "Staff complains about frequent downtime…",
  "An auditor is lurking around with compliance checklists…",
  "A new vendor is pushing a solution with uncertain security…",
  "Hospital board wants real-time stats on everything…"
];

// references from HTML
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');
const tasksCompletedEl   = document.getElementById('tasks-completed');
const hospitalSatEl      = document.getElementById('hospital-satisfaction');

// scenario modal references
const scenarioModal        = document.getElementById('scenario-modal');
const scenarioTitle        = document.getElementById('scenario-title');
const scenarioFlavorText   = document.getElementById('scenario-flavor-text');
const scenarioDescription  = document.getElementById('scenario-description');
const scenarioAButton      = document.getElementById('scenario-a-btn');
const scenarioBButton      = document.getElementById('scenario-b-btn');
const scenarioALabel       = document.getElementById('scenario-a-label');
const scenarioAText        = document.getElementById('scenario-a-text');
const scenarioBLabel       = document.getElementById('scenario-b-label');
const scenarioBText        = document.getElementById('scenario-b-text');

// for narrative + dig deeper
const scenarioNarrativeDiv = document.getElementById('scenario-narrative');
const digDeeperLinksDiv    = document.getElementById('dig-deeper-links');

//CAB
const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click',()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

const cabResultModal  = document.getElementById('cab-result-modal');
const cabResultTitle  = document.getElementById('cab-result-title');
const cabResultText   = document.getElementById('cab-result-text');
const cabResultOkBtn  = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click',()=>{
  cabResultModal.style.display="none";
  postCABTechnicalCheck();
});

// Intro
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display='none';
  openTutorialModal();
});

// tutorial
const tutorialModal = document.getElementById('tutorial-modal');
const tutorialTitleEl = document.getElementById('tutorial-title');
const tutorialTextEl  = document.getElementById('tutorial-text');
const tutorialNextBtn = document.getElementById('tutorial-next-btn');
let tutorialSteps = [
  {
    title:"Your Role in LIMS-IT",
    text:"You're the caretaker of LIMS. Each iteration has time & money constraints. Make wise decisions, keep the hospital happy."
  },
  {
    title:"CAB & Documentation",
    text:"The Change Advisory Board (CAB) checks every major change. Skipping doc raises risk. Explore 'Dig Deeper' buttons to learn more!"
  },
  {
    title:"Forundersøg (Investigation)",
    text:"You can investigate tasks to reduce risk. It costs time & money, but is often worth it."
  },
  {
    title:"Dig Deeper for Learning",
    text:"Whenever you see 'More Info' or story text, feel free to click it—especially as a new employee. Good luck!"
  }
];
let tutorialIdx=0;
function openTutorialModal(){
  tutorialModal.style.display="flex";
  showTutorialContent();
}
function showTutorialContent(){
  if(tutorialIdx >= tutorialSteps.length){
    tutorialModal.style.display="none";
    initGame();
    return;
  }
  tutorialTitleEl.textContent = tutorialSteps[tutorialIdx].title;
  tutorialTextEl.textContent  = tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click',()=>{
  tutorialIdx++;
  showTutorialContent();
});

// end/time
const endModal       = document.getElementById('end-modal');
const endGameSummary = document.getElementById('end-game-summary');
const endOkBtn       = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click',()=>{
  endModal.style.display="none";
});

// Task summary modal
const taskSummaryModal = document.getElementById('task-summary-modal');
const taskSummaryText  = document.getElementById('task-summary-text');
document.getElementById('task-summary-ok-btn').addEventListener('click', ()=>{
  taskSummaryModal.style.display = "none";
  renderTasks(); // re-render tasks so we can pick another one
});

// references for tasks
const tasksList = document.getElementById('tasks-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');
const stepsList          = document.getElementById('steps-list');

// location references
const locMap={
  hospital: document.getElementById('hospital'),
  infrastruktur: document.getElementById('infrastruktur'),
  cybersikkerhed: document.getElementById('cybersikkerhed'),
  informationssikkerhed: document.getElementById('informationssikkerhed'),
  "it-jura": document.getElementById('it-jura'),
  leverandor: document.getElementById('leverandor'),
  "medicinsk-udstyr": document.getElementById('medicinsk-udstyr'),
  dokumentation: document.getElementById('dokumentation')
};
Object.entries(locMap).forEach(([key, el])=>{
  el.addEventListener('click', ()=>{
    handleLocationClick(key);
  });
});

// game init
function initGame(){
  updateScoreboard();
  // Merge backlog from global tasks
  window.backlog = [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks
  ];
  // generate some initial tasks
  for(let i=0;i<3;i++){
    generateTask();
  }

  // spawn tasks every 10s
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

// generate a random new task
function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  let notUsed = window.backlog.filter(t=> !gameState.usedTasks.has(t.title));
  if(!notUsed.length) return;
  let chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let newTask= JSON.parse(JSON.stringify(chosen));
  newTask.currentStep=0;
  newTask.preRiskReduction=0;
  gameState.availableTasks.push(newTask);
  renderTasks();
}

// scoreboard
function updateScoreboard(){
  calcHospitalSatisfaction();
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  tasksCompletedEl.textContent = gameState.tasksCompleted;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
  hospitalSatEl.textContent     = Math.round(gameState.hospitalSatisfaction);
}

function calcHospitalSatisfaction(){
  let avg= (gameState.security + gameState.stability + gameState.development)/3;
  let penalty= 0;
  if(gameState.money<0){
    penalty = Math.floor(Math.abs(gameState.money)/100)*2;
  }
  let newVal= avg - penalty;
  gameState.hospitalSatisfaction= Math.max(0, Math.min(newVal,150));
}

function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>No tasks available</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    let li= document.createElement('li');
    li.innerHTML= `<strong>${t.title}</strong><br/>${t.shortDesc||"No desc"}`;
    
    // Forundersøg button
    let invBtn= document.createElement('button');
    invBtn.textContent="Investigate";
    invBtn.classList.add('commit-button');
    invBtn.style.marginRight="6px";
    invBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      investigateTask(t);
    });

    // Forpligt button
    let comBtn= document.createElement('button');
    comBtn.textContent="Commit";
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

function investigateTask(taskObj){
  let costT=1, costM=20, reduce=0.05;
  if(gameState.time< costT){
    showPopup("Not enough time to investigate!", "error");
    return;
  }
  if(gameState.money< costM){
    showPopup("Not enough money to investigate!", "error");
    return;
  }
  applyTimeCost(costT);
  applyMoneyCost(costM);
  taskObj.preRiskReduction += reduce;
  showPopup(`Investigation: -${costT} time, -${costM} money, risk -${reduce*100}%`, "info",4000);
}

function assignTask(taskTitle){
  if(gameState.activeTask){
    showPopup("You already have an active task!", "error");
    return;
  }
  if(gameState.time<=0){
    endGame();
    return;
  }
  let idx= gameState.availableTasks.findIndex(x=> x.title===taskTitle);
  if(idx===-1)return;
  let chosen= gameState.availableTasks.splice(idx,1)[0];
  gameState.activeTask= chosen;
  activeTaskHeadline.textContent= chosen.title;
  activeTaskDesc.textContent= chosen.logicLong || chosen.shortDesc;
  updateStepsList();
  renderTasks();
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>No active task</li>";
    return;
  }
  let c= gameState.activeTask.currentStep||0;
  gameState.activeTask.steps.forEach((st,i)=>{
    let li= document.createElement('li');
    li.textContent= `Step ${i+1}: ${st.location}`;
    if(i<c){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

// handle location
function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Pick a task first!", "error");
    return;
  }
  if(gameState.time<=0){
    endGame();
    return;
  }
  let i= gameState.activeTask.currentStep;
  if(i>= gameState.activeTask.steps.length)return;
  let needed= gameState.activeTask.steps[i].location;
  if(locName!== needed){
    // if the needed is "dokumentation" and user is skipping, we might do doc skip?
    // Or just do nothing...
    return;
  }
  showScenarioModal(i);
}

function showScenarioModal(stepIndex){
  scenarioModal.style.display="flex";

  let t= gameState.activeTask;
  let st= t.steps[stepIndex];

  // narrativeIntro
  if(t.narrativeIntro){
    scenarioNarrativeDiv.style.display="block";
    scenarioNarrativeDiv.innerHTML= t.narrativeIntro;
  } else {
    scenarioNarrativeDiv.style.display="none";
  }

  // scenario flavor
  scenarioTitle.textContent= `Step ${stepIndex+1}: ${st.location}`;
  scenarioFlavorText.textContent= scenarioFlavorPool[Math.floor(Math.random()* scenarioFlavorPool.length)];
  scenarioDescription.innerHTML= st.stepDescription || "Generic step details.";
  
  // dig deeper
  digDeeperLinksDiv.innerHTML= "";
  if(t.digDeeperLinks && t.digDeeperLinks.length){
    digDeeperLinksDiv.style.display="block";
    t.digDeeperLinks.forEach(linkObj=>{
      let btn = document.createElement('button');
      btn.classList.add('commit-button');
      btn.textContent= "More: "+ linkObj.label;
      btn.onclick= ()=> window.open(linkObj.url, "_blank");
      digDeeperLinksDiv.appendChild(btn);
    });
  } else {
    digDeeperLinksDiv.style.display="none";
  }

  // scenario choices
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
  if(eff.timeCost)  applyTimeCost(eff.timeCost);
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost);
  if(eff.riskyPlus) gameState.riskyTotal += eff.riskyPlus;
  if(eff.statChange){
    for(let [stat,delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
  if(eff.synergyEffect){
    // e.g. synergyEffect:{lackInfra:true} - no direct code here but used in final fail chance
    // you can track synergy if you want
  }
}

function applyTimeCost(t){
  gameState.time= Math.max(gameState.time - t, 0);
  updateScoreboard();
  if(gameState.time<=0){
    endGame();
  }
}
function applyMoneyCost(m){
  gameState.money= Math.max(gameState.money - m, -99999);
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

function finalizeStep(stepIndex){
  let t= gameState.activeTask;
  if(!t)return;
  t.currentStep++;
  applyTimeCost(2);
  updateStepsList();

  if(t.currentStep>= t.steps.length){
    if(t.preRiskReduction>0){
      gameState.riskyTotal= Math.max(gameState.riskyTotal - t.preRiskReduction,0);
      showPopup(`Investigation gave -${(t.preRiskReduction*100).toFixed(0)}% risk!`, "info",4000);
    }
    showCABModal();
  }
}

function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.05);
  if(fail>1) fail=1;
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Review</strong><br/>
    Risk from quick/cheap decisions: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Skipped docs: ${gameState.docSkipCount} => +${(gameState.docSkipCount*5)}% risk<br/>
    Total fail chance: ${(fail*100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  let r= Math.random();
  if(r< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent="CAB: Approved!";
    cabResultText.textContent="CAB believes the changes can proceed. Implementation next!";
  } else {
    cabResultTitle.textContent="CAB: Rejected!";
    cabResultText.textContent="Too risky or lacking documentation. The change fails.";
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
    showPopup("Drift error: Implementation failed in practice!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    endActiveTask();
  } else {
    showPopup("Drift-check success!", "success");
    completeTaskCAB();
  }
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  // store the current task in lastFinishedTask so we can show knowledgeRecap
  gameState.lastFinishedTask = gameState.activeTask;
  endActiveTask();
}

function endActiveTask(){
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  activeTaskHeadline.textContent="No active task";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>No active task</li>";
  updateScoreboard();
  showTaskSummaryModal();
}

function showTaskSummaryModal(){
  let s= gameState.security;
  let st= gameState.stability;
  let d= gameState.development;
  let h= Math.round(gameState.hospitalSatisfaction);
  let money= gameState.money;

  taskSummaryText.innerHTML=`
    <strong>Task completed!</strong><br/>
    Current stats:
    Security=${s}, Stability=${st}, Development=${d}, 
    Hospital=${h}%, Money=${money}
  `;

  let lastT= gameState.lastFinishedTask;
  if(lastT && lastT.knowledgeRecap){
    let recapDiv= document.createElement('div');
    recapDiv.style.marginTop = "8px";
    recapDiv.innerHTML=`
      <hr/>
      <strong>Knowledge Recap:</strong><br/>
      ${lastT.knowledgeRecap}
    `;
    taskSummaryText.appendChild(recapDiv);
  }

  taskSummaryModal.style.display="flex";
}

// end game
function endGame(){
  showPopup("Time is up!", "info",3000);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="No active task";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>No active task</li>";

  endModal.style.display="flex";
  let sumText=`
    <strong>Final Result:</strong><br/>
    Money left: ${gameState.money}<br/>
    Security: ${gameState.security}<br/>
    Stability: ${gameState.stability}<br/>
    Development: ${gameState.development}<br/>
    Hospital satisfaction: ${gameState.hospitalSatisfaction}%<br/>
    Completed tasks: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML=sumText;
}

// showPopup
function showPopup(msg, type="success", duration=3000){
  let c= document.getElementById('popup-container');
  let div= document.createElement('div');
  div.classList.add('popup');
  if(type==="error") div.classList.add('error');
  else if(type==="info") div.classList.add('info');
  div.style.animation="none";
  div.textContent= msg;
  c.appendChild(div);
  setTimeout(()=> div.remove(), duration);
}

// floating text
function showFloatingText(txt, stat){
  let fc= document.getElementById('floating-text-container');
  let div= document.createElement('div');
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
