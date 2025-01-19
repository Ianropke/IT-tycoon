/************************************************************
 * main.js 
 * 1) PI Start => commit Sikkerhed, Stabilitet, Udvikling
 * 2) Hospitalstilfredshed => (avg of security,stability,dev) - penalty if money <0
 * 3) PI = 90 tid
 * 4) Inspect & Adapt viser difference vs. commits
 ************************************************************/
let gameState = {
  security:100,
  stability:100,
  development:100,
  hospitalSatisfaction:100,

  money:1000,
  piTime:90,       // 1) 90 tid i stedet for 30
  currentPI:1,
  maxPI:2,

  tasksCompleted:0,
  activeTask:null,
  availableTasks:[],
  usedTasks:new Set(),

  docSkipCount:0,
  riskyTotal:0,
  finalFailChance:0,

  // commit-values & diffs
  commitGoals:{ security:0, stability:0, development:0 },

  introModalOpen:true,
  tutorialStep:0,
  tutorialActive:false
};

// scoreboard
function updateScoreboard(){
  // 2) Beregn hospitalSatisfaction:
  calcHospitalSatisfaction();

  document.getElementById('time-left').textContent= gameState.piTime;
  document.getElementById('money-left').textContent= gameState.money;
  document.getElementById('tasks-completed').textContent= gameState.tasksCompleted;
  document.getElementById('security-value').textContent= gameState.security;
  document.getElementById('stability-value').textContent= gameState.stability;
  document.getElementById('development-value').textContent= gameState.development;
  document.getElementById('hospital-satisfaction').textContent= Math.round(gameState.hospitalSatisfaction);
}

// Hospital-tilfredshed = average(security,stability,development) - penalty if money<0
function calcHospitalSatisfaction(){
  let avg= (gameState.security+gameState.stability+gameState.development)/3;
  let penalty=0;
  if(gameState.money<0){
    // for hver 100 kr i minus => -2
    penalty= Math.floor(Math.abs(gameState.money)/100)*2;
  }
  let newVal= avg - penalty;
  gameState.hospitalSatisfaction= Math.max(0, Math.min(150, newVal));
}

/************************************************************
 * INTRO 
 ************************************************************/
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display="none";
  openTutorialModal();
});

/************************************************************
 * TUTORIAL 
 ************************************************************/
const tutorialModal= document.getElementById('tutorial-modal');
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl= document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');

let tutorialSteps=[
  {
    title:"Din rolle",
    text:"Du forvalter LIMS-IT i en travl region. Sikkerhed, stabilitet og udvikling - alt skal balanceres, og hospitalet forlanger resultater!"
  },
  {
    title:"Commit",
    text:"Ved start af hver PI, angiv hvor meget du vil løfte Sikkerhed, Stabilitet og Udvikling. Til sidst bedømmes du på, om du når dine commits."
  },
  {
    title:"CAB & driftfejl",
    text:"Hver opgave slutter med CAB-tjek for risiko, og du kan stadig faile i drift. Vær forsigtig med hurtige valg!"
  },
  {
    title:"PI = 90 tid",
    text:"Din iteration varer 90 tid. Løs opgaverne, se 'Mulige Opgaver.' Held og lykke!"
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

/************************************************************
 * INIT GAME 
 ************************************************************/
function initGame(){
  updateScoreboard();
  // Saml tasks
  window.backlog=[
    ...window.cybersikkerhedTasks,
    ...window.hospitalTasks,
    ...window.infrastrukturTasks
  ];
  startPI();
}

/************************************************************
 * startPI => 1) Pi Start modal (commit)
 ************************************************************/
function startPI(){
  gameState.piTime=90; // 3) 90 tid
  updateScoreboard();

  // vis piStart-modal
  document.getElementById('pi-intro-text').textContent=
    `PI #${gameState.currentPI}: Hvor meget vil du løfte Sikkerhed, Stabilitet og Udvikling 
     i løbet af denne iteration? Du har 90 tidsenheder.`;
  document.getElementById('pi-start-modal').style.display="flex";
}

document.getElementById('pi-start-ok-btn').addEventListener('click', ()=>{
  let cSec = parseInt(document.getElementById('commit-security').value,10)||0;
  let cStab= parseInt(document.getElementById('commit-stability').value,10)||0;
  let cDev = parseInt(document.getElementById('commit-development').value,10)||0;
  gameState.commitGoals={
    security:cSec, 
    stability:cStab, 
    development:cDev
  };
  document.getElementById('pi-start-modal').style.display="none";
  // generer 3 opgaver
  for(let i=0; i<3; i++){
    generateTask();
  }
  // løbende generation
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
  let notUsed= window.backlog.filter(o=> !gameState.usedTasks.has(o.title));
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
    li.innerHTML=`
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
 * assignTask => aktiv 
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
 * location-click => scenario
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
    Object.entries(eff.statChange).forEach(([stat,delta])=>{
      applyStatChange(stat,delta);
    });
  }
}

/************************************************************
 * finalizeStep => CAB 
 ************************************************************/
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
 * TIME => maybe endOfPI
 ************************************************************/
function applyTimeCost(t){
  gameState.piTime=Math.max(gameState.piTime-t,0);
  updateScoreboard();
  if(gameState.piTime<=0){
    endPI();
  }
}
function applyMoneyCost(m){
  gameState.money=Math.max(gameState.money-m, -999999); // man kan gå ret langt i minus
  updateScoreboard();
}
function applyStatChange(stat, delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

/************************************************************
 * CAB + drift => opgave summary
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
    cabResultText.textContent="Implementeringen kan rulles ud. Men vær obs på driftfejl!";
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko. Opgaven fejler.";
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
  if(r<driftFail){
    showPopup("Teknisk driftfejl i implementering!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    endActiveTask();
  } else {
    showPopup("Drift-check bestået, opgaven er en succes!", "success");
    completeTaskCAB();
  }
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  endActiveTask();
}

// after finishing an opgave => opgave summary popup
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
  let hosp= Math.round(gameState.hospitalSatisfaction);
  taskSummaryText.innerHTML=`
    <strong>Opgaven er afsluttet!</strong><br/>
    Sikkerhed: ${s}<br/>
    Stabilitet: ${st}<br/>
    Udvikling: ${d}<br/>
    Hospital: ${hosp}
  `;
  taskSummaryModal.style.display="flex";
}

/************************************************************
 * End-of-PI => Inspect & Adapt => se commit vs. actual
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

  // difference vs. commit
  let c= gameState.commitGoals;
  let secDiff= gameState.security - (100);
  let stabDiff= gameState.stability - (100);
  let devDiff= gameState.development - (100);

  // hvad var committet? 
  // cSec => 110 => dvs du vil +10 fra 100
  let cSecDiff= secDiff - (c.security-100);
  let cStabDiff= stabDiff - (c.stability-100);
  let cDevDiff= devDiff - (c.development-100);

  let sum=`
    <strong>PI #${gameState.currentPI} Inspect & Adapt</strong><br/>
    Du har brugt ${90 - gameState.piTime} tid.<br/>
    Opgaver fuldført: ${gameState.tasksCompleted}<br/><br/>

    <em>Dine commits var:</em><br/>
    - Sikkerhed: +${c.security-100} (fra 100 til ${c.security})<br/>
    - Stabilitet: +${c.stability-100}<br/>
    - Udvikling: +${c.development-100}<br/><br/>

    <em>Faktisk nået:</em><br/>
    - Sikkerhed: ${gameState.security} (difference: ${cSecDiff>=0?"+":""}${cSecDiff.toFixed(0)} fra commit)<br/>
    - Stabilitet: ${gameState.stability} (diff: ${cStabDiff>=0?"+":""}${cStabDiff.toFixed(0)})<br/>
    - Udvikling: ${gameState.development} (diff: ${cDevDiff>=0?"+":""}${cDevDiff.toFixed(0)})<br/>
    - Hospital: ${Math.round(gameState.hospitalSatisfaction)}<br/>
  `;
  endGameSummary.innerHTML=sum;
}

function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    showPopup("Alle PI'er gennemført!", "info");
  } else {
    // Nulstil
    gameState.riskyTotal=0;
    gameState.docSkipCount=0;
    gameState.availableTasks=[];
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
  div.textContent=txt;
  fc.appendChild(div);
  setTimeout(()=> div.remove(),2000);
}
