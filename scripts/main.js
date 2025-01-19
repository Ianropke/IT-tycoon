// scripts/main.js

let gameState = {
  security:100,
  stability:100,
  development:100,
  hospitalSatisfaction:100,

  money:1000,
  piTime:30,
  currentPI:1,
  maxPI:2, // kører 2 iterationer

  tasksCompleted:0,
  activeTask:null,
  availableTasks:[],
  usedTasks:new Set(),

  docSkipCount:0,
  riskyTotal:0,
  finalFailChance:0,

  // Bare for at vise eksempelt med 2 iterationer
  introModalOpen:true,
  tutorialStep:0,
  tutorialActive:false
};

function updateScoreboard(){
  document.getElementById('time-left').textContent=gameState.piTime;
  document.getElementById('money-left').textContent=gameState.money;
  document.getElementById('tasks-completed').textContent=gameState.tasksCompleted;
  document.getElementById('security-value').textContent=gameState.security;
  document.getElementById('stability-value').textContent=gameState.stability;
  document.getElementById('development-value').textContent=gameState.development;
  document.getElementById('hospital-satisfaction').textContent=gameState.hospitalSatisfaction;
}

/************************************************************
 * INTRO
 ************************************************************/
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display="none";
  openTutorialModal();
});

/************************************************************
 * TUTORIAL – mere engagerende
 ************************************************************/
const tutorialModal= document.getElementById('tutorial-modal');
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl= document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');

let tutorialSteps=[
  {
    title:"Din Hverdag som IT-Forvalter",
    text:"Velkommen til en travl hverdag i regionens centrale IT-organisation! Du balancerer drift, sikkerhed og udvikling for LIMS – laboratoriernes hjerte."
  },
  {
    title:"Opgaver under Pres",
    text:"Hospitalet kræver nye funktioner, Jura vil have kontrakter i orden, cybersikkerhed er bange for hackere. Du har 30 tid pr. iteration – hold øje med ressourcerne!"
  },
  {
    title:"CAB og Driftfejl",
    text:"Hver opgave har 4 trin. Til slut vurderer CAB risiko. Derefter kan driftfejl stadig opstå. Vælg dine løsninger med omhu!"
  },
  {
    title:"Klar?",
    text:"Tag opgaver fra listen i ‘Mulige Opgaver,’ klik lokationer i den rigtige rækkefølge, og se om du kan tilfredsstille alle. God fornøjelse!"
  }
];
function openTutorialModal(){
  tutorialModal.style.display="flex";
  showTutorialContent();
}
let tutorialIdx=0;
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
 * INIT GAME
 ************************************************************/
function initGame(){
  updateScoreboard();

  // Saml tasks: 
  window.backlog = [
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  startPI();
}

function startPI(){
  // Nulstil tid
  gameState.piTime=30;
  updateScoreboard();

  // generer 3 opgaver
  for(let i=0; i<3; i++){
    generateTask();
  }
  // Løbende generering
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  let notUsed= window.backlog.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length)return;

  let chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  // Lav en ny “kopi”
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
    li.addEventListener('click',()=>{
      // expand shortDesc if you want
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
  return loc.split("-").map(s=> s.charAt(0).toUpperCase()+s.slice(1)).join("-");
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
    endPI();
    return;
  }
  let i= gameState.activeTask.currentStep||0;
  let st= gameState.activeTask.steps[i];
  if(!st)return;
  if(locName!== st.location)return;

  showScenarioModal(i);
}

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
  if(eff.riskyPlus) gameState.riskyTotal+= eff.riskyPlus;
  if(eff.statChange){
    for(let [stat,delta] of Object.entries(eff.statChange)){
      applyStatChange(stat,delta);
    }
  }
}

function finalizeStep(stepIndex){
  if(!gameState.activeTask)return;
  gameState.activeTask.currentStep= (gameState.activeTask.currentStep||0)+1;
  applyTimeCost(2);
  updateStepsList();

  // hvis 4 trin er gennemført => CAB
  if(gameState.activeTask.currentStep>= gameState.activeTask.steps.length){
    showCABModal();
  }
}

/************************************************************
 * TIME cost => check end
 ************************************************************/
function applyTimeCost(t){
  gameState.piTime= Math.max(gameState.piTime-t,0);
  updateScoreboard();
  if(gameState.piTime<=0){
    endPI();
  }
}
function applyMoneyCost(m){
  gameState.money= Math.max(gameState.money-m,0);
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

/************************************************************
 * CAB + DRIFT => task summary popup
 ************************************************************/
const cabModal= document.getElementById('cab-modal');
const cabSummary= document.getElementById('cab-summary');
document.getElementById('cab-ok-btn').addEventListener('click', finalizeCABResult);

function showCABModal(){
  let fail= gameState.riskyTotal;
  if(fail>1) fail=1; 
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerText=`CAB ser på risiko: ${(fail*100).toFixed(0)}%`;
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

const cabResultModal= document.getElementById('cab-result-modal');
const cabResultTitle= document.getElementById('cab-result-title');
const cabResultText= document.getElementById('cab-result-text');
document.getElementById('cab-result-ok-btn').addEventListener('click', ()=>{
  cabResultModal.style.display="none";
  // drift
  postCABTechnicalCheck();
});

function showCABResult(ok){
  cabResultModal.style.display="flex";
  if(ok){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="Godkendt, men driftfejl kan opstå...";
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko eller for lidt dokumentation! Opgaven fejler.";
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
  if(Math.random()< driftFail){
    showPopup("Teknisk driftfejl – implementering mislykkedes!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    endActiveTask();
  } else {
    showPopup("Implementering er i drift!", "success");
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

  // => vis opgaveopsummering
  showTaskSummaryModal();
}

// “task-summary-modal” => “Opgave Fuldført”
const taskSummaryModal= document.getElementById('task-summary-modal');
const taskSummaryText= document.getElementById('task-summary-text');
const taskSummaryOkBtn= document.getElementById('task-summary-ok-btn');

taskSummaryOkBtn.addEventListener('click',()=>{
  taskSummaryModal.style.display="none";
});

function showTaskSummaryModal(){
  let s= gameState.security;
  let st= gameState.stability;
  let dev= gameState.development;
  let hosp= gameState.hospitalSatisfaction;
  taskSummaryText.innerHTML=`
    <strong>Opgaven er afsluttet</strong><br/>
    Sikkerhed: ${s}<br/>
    Stabilitet: ${st}<br/>
    Udvikling: ${dev}<br/>
    Hospital: ${hosp}
  `;
  taskSummaryModal.style.display="flex";
}

/************************************************************
 * END-OF-PI => PI Slut
 ************************************************************/
const endModal=document.getElementById('end-modal');
const endGameSummary=document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click',()=>{
  endModal.style.display="none";
  nextPI();
});

function endPI(){
  // hvis der er en opgave => nulstil
  if(gameState.activeTask){
    gameState.activeTask=null;
    document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
    document.getElementById('active-task-description').textContent="";
    stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  }
  endModal.style.display="flex";
  let sum=`
    <strong>PI #${gameState.currentPI} er slut!</strong><br/>
    Sikkerhed=${gameState.security}, Stabilitet=${gameState.stability}, 
    Dev=${gameState.development}, Hospital=${gameState.hospitalSatisfaction}<br/>
    Du har gennemført ${gameState.tasksCompleted} opgaver.<br/>
  `;
  endGameSummary.innerHTML= sum;
}

function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    // end of game
    showPopup("Alle PI'er gennemført!", "info");
  } else {
    // ny runde
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
  setTimeout(()=> div.remove(), duration);
}

function showFloatingText(txt, stat){
  let fc=document.getElementById('floating-text-container');
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
