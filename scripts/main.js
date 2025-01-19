/************************************************************
 * main.js med PI-løsning (3 iterationer a 30 tid)
 ************************************************************/

let gameState = {
  // Stats
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,

  // Ressourcer
  money: 1000,
  piTime: 30,     // hver PI => 30
  currentPI: 1,
  maxPI: 3,

  // Opgaver
  tasksCompleted: 0,
  activeTask: null,
  availableTasks: [],
  usedTasks: new Set(),

  // Risikoparametre
  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,

  // Modals / tutorial
  introModalOpen: true,
  tutorialActive: false,
  tutorialStep: 0,

  // Samlet "score" over flere PI
  totalScore: 0
};

/************************************************************
 * Scoreboard
 ************************************************************/
function updateScoreboard(){
  document.getElementById('time-left').textContent   = gameState.piTime;
  document.getElementById('money-left').textContent  = gameState.money;
  document.getElementById('tasks-completed').textContent= gameState.tasksCompleted;
  document.getElementById('security-value').textContent   = gameState.security;
  document.getElementById('stability-value').textContent  = gameState.stability;
  document.getElementById('development-value').textContent= gameState.development;
  document.getElementById('hospital-satisfaction').textContent= gameState.hospitalSatisfaction;
}

/************************************************************
 * Intro
 ************************************************************/
document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display="none";
  gameState.introModalOpen=false;
  openTutorialModal();
});

/************************************************************
 * Tutorial
 ************************************************************/
const tutorialModal   = document.getElementById('tutorial-modal');
const tutorialTitleEl = document.getElementById('tutorial-title');
const tutorialTextEl  = document.getElementById('tutorial-text');
const tutorialNextBtn = document.getElementById('tutorial-next-btn');

let tutorialSteps = [
  {
    title:"Velkommen til LIMS-Forvaltning",
    text:"Du har 3 iterationer (PI) af 30 tid hver. Vælg opgaver klogt!"
  },
  {
    title:"Lokationer",
    text:"Klik på fx Infrastruktur, Hospital m.fl. i rækkefølge opgaven kræver."
  },
  {
    title:"CAB & Driftfejl",
    text:"Efter 4 trin i en opgave tjekker CAB risiko. Ved succes ruller du drift. Ved fail = -10 hospital."
  },
  {
    title:"God fornøjelse",
    text:"Se om du kan få en høj Samlet Score over 3 PI'er!"
  }
];

function openTutorialModal(){
  tutorialModal.style.display="flex";
  showTutorialContent();
}
function showTutorialContent(){
  if(gameState.tutorialStep>= tutorialSteps.length){
    tutorialModal.style.display="none";
    startPI(); // Start 1. PI
    return;
  }
  let st= tutorialSteps[gameState.tutorialStep];
  tutorialTitleEl.textContent= st.title;
  tutorialTextEl.textContent= st.text;
}
tutorialNextBtn.addEventListener('click', ()=>{
  gameState.tutorialStep++;
  showTutorialContent();
});

/************************************************************
 * Start PI
 ************************************************************/
function startPI(){
  gameState.piTime = 30;
  updateScoreboard();

  // generer 3 tasks
  for(let i=0;i<3;i++){
    generateTask();
  }
  // Løbende generering
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

/************************************************************
 * generateTask
 ************************************************************/
function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  if(!window.bigTasksData)return;

  let notUsed= window.bigTasksData.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length)return;

  let chosen= notUsed[Math.floor(Math.random()*notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let riskLevel= Math.floor(Math.random()*3)+1;
  let newTask={
    id: Date.now()+Math.floor(Math.random()*1000),
    title: chosen.title,
    shortDesc: chosen.shortDesc,
    logicLong: chosen.logicLong,
    steps: chosen.steps,
    riskLevel,
    currentStep:0,
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

/************************************************************
 * render tasks
 ************************************************************/
const tasksList= document.getElementById('tasks-list');
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    let li=document.createElement('li');
    if(t.riskLevel===3){
      li.style.borderColor="red"; li.style.borderWidth="2px";
    } else if(t.riskLevel===2){
      li.style.borderColor="orange";
    } else {
      li.style.borderColor="green";
    }
    let label=(t.riskLevel===3)?" (HØJPRIORITET)":"";
    li.innerHTML=`
      <strong>${t.title}${label}</strong><br/>
      Risiko: ${t.riskLevel}
      <p class="task-description" style="display:none;">${t.shortDesc}</p>
    `;
    let btn= document.createElement('button');
    btn.classList.add('commit-button');
    btn.textContent="Forpligt";
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener('click',()=>{
      li.querySelectorAll('.task-description').forEach(d=>{
        d.style.display=(d.style.display==="none"?"block":"none");
      });
    });
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
}

/************************************************************
 * assignTask
 ************************************************************/
let activeTaskHeadline= document.getElementById('active-task-headline');
let activeTaskDesc= document.getElementById('active-task-description');
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.piTime<=0){
    endOfPI();
    return;
  }
  let idx= gameState.availableTasks.findIndex(x=> x.id===taskId);
  if(idx===-1)return;
  let chosen= gameState.availableTasks.splice(idx,1)[0];

  gameState.activeTask= chosen;
  activeTaskHeadline.textContent= chosen.title;
  activeTaskDesc.textContent= chosen.logicLong||"";
  updateStepsList();
  renderTasks();
}

let stepsListEl= document.getElementById('steps-list');
function updateStepsList(){
  stepsListEl.innerHTML="";
  if(!gameState.activeTask){
    stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  let c= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((st,i)=>{
    let li= document.createElement('li');
    li.textContent=`Trin ${i+1}: ${capitalizeLocation(st.location)}`;
    if(i<c){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsListEl.appendChild(li);
  });
  let info= document.createElement('li');
  info.style.color="#aaa";
  info.textContent=`Trin ${c+1}/${gameState.activeTask.steps.length}`;
  stepsListEl.appendChild(info);
}

function capitalizeLocation(loc){
  if(!loc)return loc;
  return loc.split("-").map(x=> x.charAt(0).toUpperCase()+x.slice(1)).join("-");
}

/************************************************************
 * location-click => scenario
 ************************************************************/
function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  if(gameState.piTime<=0){
    endOfPI();
    return;
  }
  let i= gameState.activeTask.currentStep;
  if(i>= gameState.activeTask.steps.length)return;

  let st= gameState.activeTask.steps[i];
  if(!st)return;
  if(gameState.activeTask.decisionMadeForStep[i])return;
  if(locName!==st.location){
    if(st.location==="dokumentation"){
      skipDocumentationPopup();
    }
    return;
  }
  showScenarioModal(i);
}

/************************************************************
 * scenarioModal
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
const docSkipOption= document.getElementById('doc-skip-option');

function showScenarioModal(i){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";

  let st= gameState.activeTask.steps[i];
  scenarioTitle.textContent=`Trin ${i+1}: ${capitalizeLocation(st.location)}`;
  scenarioDescription.textContent= st.stepDescription||"";

  scenarioALabel.textContent= st.choiceA.label;
  scenarioAText.textContent= st.choiceA.text;
  scenarioAButton.onclick=()=>{
    applyChoiceEffect(st.choiceA.applyEffect);
    finalizeStep(i);
    scenarioModal.style.display="none";
  };
  scenarioBLabel.textContent= st.choiceB.label;
  scenarioBText.textContent= st.choiceB.text;
  scenarioBButton.onclick=()=>{
    applyChoiceEffect(st.choiceB.applyEffect);
    finalizeStep(i);
    scenarioModal.style.display="none";
  };
}

function applyChoiceEffect(eff){
  if(!eff)return;
  if(eff.timeCost) applyTimeCost(eff.timeCost);
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost);
  if(eff.riskyPlus) gameState.riskyTotal+= eff.riskyPlus;
  if(eff.statChange){
    Object.entries(eff.statChange).forEach(([stat,delta])=>{
      applyStatChange(stat,delta);
    });
  }
}

/************************************************************
 * finalizeStep => CAB
 ************************************************************/
function finalizeStep(i){
  if(!gameState.activeTask)return;
  gameState.activeTask.decisionMadeForStep[i]=true;

  // baseline +2 tid
  applyTimeCost(2);
  gameState.activeTask.currentStep++;
  if(gameState.activeTask.currentStep>= gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

/************************************************************
 * doc skip
 ************************************************************/
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";

  scenarioTitle.textContent="Dokumentation";
  scenarioDescription.textContent="CAB vil se dok. Du kan skippe men +15% fejl.";

  scenarioALabel.textContent="Fuld dok";
  scenarioAText.textContent="3 tid, 10 kr, ingen ekstra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };

  scenarioBLabel.textContent="Minimal dok";
  scenarioBText.textContent="1 tid, +5% fejl";
  scenarioBButton.onclick=()=>{
    applyTimeCost(1);
    gameState.riskyTotal+=0.05;
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };

  document.getElementById('doc-skip-btn').onclick=()=>{
    gameState.docSkipCount++;
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };
}

/************************************************************
 * CAB
 ************************************************************/
const cabModalEl= document.getElementById('cab-modal');
const cabSummary= document.getElementById('cab-summary');
document.getElementById('cab-ok-btn').addEventListener('click', finalizeCABResult);

function showCABModal(){
  let fail= gameState.riskyTotal + gameState.docSkipCount*0.15;
  fail= Math.max(0,Math.min(fail,1));
  gameState.finalFailChance= fail;
  cabModalEl.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Risikoprocent: ${(fail*100).toFixed(0)}%<br/>
    SkippetDok: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModalEl.style.display="none";
  let r= Math.random();
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
    cabResultText.textContent="For stor risiko! Opgaven fejler.";
    failTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/************************************************************
 * postCAB => drift
 ************************************************************/
function postCABTechnicalCheck(){
  cabResultModal.style.display="none";
  let driftFail= gameState.riskyTotal*0.5;
  let r= Math.random();
  if(r<driftFail){
    showPopup("Teknisk implementering fejlede i drift!", "error",4000);
    driftFailTask();
  } else {
    showPopup("Teknisk drift-check bestået!", "success",3000);
    completeTaskCAB();
    // feedback (valgfrit)
  }
}

function driftFailTask(){
  gameState.tasksCompleted++;
  applyStatChange("stability",-5);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/************************************************************
 * applyTimeCost => endOfPI
 ************************************************************/
function applyTimeCost(t){
  gameState.piTime = Math.max(gameState.piTime - t,0);
  updateScoreboard();
  if(gameState.piTime<=0){
    endOfPI();
  }
}
function applyMoneyCost(m){
  gameState.money= Math.max(gameState.money - m,0);
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

/************************************************************
 * PI Inspect & Adapt
 ************************************************************/
const iaModal= document.getElementById('ia-modal');
const iaSummary= document.getElementById('ia-summary');
const iaOkBtn= document.getElementById('ia-ok-btn');
iaOkBtn.addEventListener('click', ()=>{
  iaModal.style.display="none";
  nextPI();
});

function endOfPI(){
  // Stop opgave
  if(gameState.activeTask){
    gameState.activeTask=null;
    activeTaskHeadline.textContent="Ingen aktiv opgave";
    activeTaskDesc.textContent="";
    stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  }
  showInspectAndAdaptModal();
}

function showInspectAndAdaptModal(){
  let piScore= calcPIScore();
  gameState.totalScore += piScore;

  iaModal.style.display="flex";
  iaSummary.innerHTML=`
    <strong>PI #${gameState.currentPI} er slut!</strong><br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    PI Score: ${piScore.toFixed(1)}<br/>
    Samlet Score: ${gameState.totalScore.toFixed(1)}
  `;
}

function calcPIScore(){
  // Ex: (average of stats) + tasksCompleted/2
  let s= gameState.security;
  let st= gameState.stability;
  let d= gameState.development;
  let h= gameState.hospitalSatisfaction;
  let base= (s+st+d+h)/4;
  let scaled= base + (gameState.tasksCompleted/2);
  return scaled;
}

function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    // slutspil
    endGame();
  } else {
    // Nulstil risky, doc skip?
    gameState.riskyTotal=0; 
    gameState.docSkipCount=0;
    // Start ny PI
    startPI();
  }
}

/************************************************************
 * endGame
 ************************************************************/
const endModal= document.getElementById('end-modal');
const endGameSummary= document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click',()=>{
  endModal.style.display="none";
});
function endGame(){
  let sum=`
    <strong>Alle ${gameState.maxPI} PI'er gennemført!</strong><br/>
    Tid: ${gameState.piTime}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    Slutscore: ${gameState.totalScore.toFixed(1)}
  `;
  endGameSummary.innerHTML= sum;
  endModal.style.display="flex";
}

/************************************************************
 * showFloatingText + showPopup
 ************************************************************/
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

/************************************************************
 * Load tasks i index.html, done. 
 * Her i main.js skal vi bare have dem i bigTasksData. 
 ************************************************************/
