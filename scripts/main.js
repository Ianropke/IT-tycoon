/************************************************************
 * main.js – “Synergy Edition”
 * - synergyFlags: baggrund for kædeeffekter
 * - Forundersøg-knap ved opgave
 * - criticalPriority/optionalTask
 * - 3–6 steps pr opgave
 ************************************************************/
const synergyFlags = {}; // ex: synergyFlags['lackInfra'] = true => +5% risk etc.

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
  commitGoals:{}
};

// Eksempel: For at mindske cost => costScale=0.5
const costScale=0.8; // 80% cost

// scenario flavor
const scenarioFlavorPool = [
  "Personalet klager over systemets driftsstop.",
  "Der er snak om nye compliance-krav.",
  "Sikkerhedschefen er bekymret for data.",
  "Leverandøren vil have ekstra licensgebyr.",
  "CAB efterspørger bedre dokumentation."
];

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
  let avg= (gameState.security + gameState.stability + gameState.development)/3;
  let penalty=0;
  if(gameState.money<0){
    penalty= Math.floor(Math.abs(gameState.money)/100)*2;
  }
  gameState.hospitalSatisfaction = Math.max(0, Math.min(avg - penalty, 150));
}

// Intro / tutorial
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display="none";
  openTutorialModal();
});

const tutorialModal= document.getElementById('tutorial-modal');
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl= document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');

let tutorialSteps=[
  {title:"Din rolle", text:"Du forvalter LIMS. Hospitalet kræver stats, du sætter commits."},
  {title:"Opgaver", text:"Vælg opgaver i 'Mulige Opgaver'. Du kan først forundersøge dem."},
  {title:"CAB + synergy", text:"CAB ser på risiko, synergyFlags kan øge risiko, doc skip øger risk. Pas på!"},
  {title:"Held og lykke", text:"Få plus i stats, undgå minus i penge. Overhold dine commits og hospitalets krav."}
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
  tutorialTitleEl.textContent = tutorialSteps[tutorialIdx].title;
  tutorialTextEl.textContent = tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click',()=>{
  tutorialIdx++;
  showTutorialContent();
});

function initGame(){
  synergyFlags["lackInfra"]= false; // ex synergy
  synergyFlags["rushedJura"]= false;
  updateScoreboard();

  // backlog
  window.backlog = [
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

  // generate hospital expectation
  gameState.hospitalExpectations={
    security:100+ Math.floor(Math.random()*10+5),
    stability:100+ Math.floor(Math.random()*10+5),
    development:100+ Math.floor(Math.random()*10+5)
  };
  const he= gameState.hospitalExpectations;
  document.getElementById('hospital-expectations-text').textContent=
   `Hospitalet kræver:
    S≥${he.security}, St≥${he.stability}, Dev≥${he.development}`;

  document.getElementById('pi-start-modal').style.display="flex";
}

document.getElementById('pi-start-ok-btn').addEventListener('click',()=>{
  let cSec = parseInt(document.getElementById('commit-security').value,10)||0;
  let cStab= parseInt(document.getElementById('commit-stability').value,10)||0;
  let cDev = parseInt(document.getElementById('commit-development').value,10)||0;
  gameState.commitGoals={ security:cSec, stability:cStab, development:cDev };
  document.getElementById('pi-start-modal').style.display="none";

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
  newTask.decisionMadeForStep={};
  // synergy: e.g. if synergyFlags["lackInfra"], man kan evt. + cost
  if(synergyFlags["lackInfra"] && newTask.title.includes("Infrastruktur")){
    // man kan auto + 0.05 risk ...
  }
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function renderTasks(){
  const tasksList= document.getElementById('tasks-list');
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li = document.createElement('li');
    // critical/optional label
    let flagLabel="";
    if(t.criticalPriority) {
      flagLabel = `<span style='color:red;'>(Kritisk)</span>`;
    } else if(t.optionalTask) {
      flagLabel = `<span style='color:green;'>(Valgfri)</span>`;
    }

    li.innerHTML=`
      <strong>${t.title}</strong> ${flagLabel}<br/>
      ${t.shortDesc||"Ingen beskrivelse"}
    `;

    // Forundersøg-knap
    const investigateBtn = document.createElement('button');
    investigateBtn.textContent="Forundersøg";
    investigateBtn.classList.add('commit-button');
    investigateBtn.style.marginRight="6px";
    investigateBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      showInvestigation(t);
    });

    // Forpligt-knap
    const commitBtn = document.createElement('button');
    commitBtn.textContent="Forpligt";
    commitBtn.classList.add('commit-button');
    commitBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      assignTask(t.title);
    });

    li.appendChild(investigateBtn);
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

function showInvestigation(taskObj){
  const moreInfo = taskObj.infoText || "Du får kun sparsom info, men lidt mere end ingenting...";
  showPopup("Forundersøg: "+moreInfo, "info",5000);
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
  let c= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((st,i)=>{
    const li=document.createElement('li');
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
    const yes= confirm("Din tid er op! Vil du betale 50 kr for +5 tid? (kun én gang)");
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
Object.entries(locMap).forEach(([key,el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(key);
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
  scenarioDescription.textContent= st.stepDescription || "Generisk situation.";
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
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost* costScale);
  if(eff.riskyPlus) gameState.riskyTotal += eff.riskyPlus;
  if(eff.statChange){
    for(let [stat, delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
  // synergy effect => ex: synergyEffect: {lackInfra:true}
  if(eff.synergyEffect){
    for(let [flag, val] of Object.entries(eff.synergyEffect)){
      synergyFlags[flag]= val;
      showPopup(`Synergy Effekt: ${flag} = ${val}`, "info", 4000);
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
  gameState.money= Math.max(gameState.money - m, -99999);
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`: `${delta}`)+" "+stat, stat);
}

function finalizeStep(stepIndex){
  let t= gameState.activeTask;
  if(!t)return;
  t.currentStep++;
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
  let synergyPenalty=0;
  if(synergyFlags["lackInfra"]) synergyPenalty+=0.05;
  if(synergyFlags["rushedJura"]) synergyPenalty+=0.05;
  let fail= gameState.riskyTotal + docSkips*0.05 + synergyPenalty;
  if(fail>1) fail=1;
  gameState.finalFailChance= fail;
  let synergyMsg= synergyPenalty>0 
   ? `\nCAB har opdaget synergy-issues. +${(synergyPenalty*100).toFixed(0)}% risk.`
   : "";
  cabModal.style.display="flex";
  cabSummary.textContent=`
    CAB ser på dokumentation og valg.
    Du sprang doc: ${docSkips} gange.
    synergyPenalty= ${Math.round(synergyPenalty*100)}%
    Samlet risiko: ${(fail*100).toFixed(1)}%
    ${synergyMsg}
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
  if(Math.random()< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(ok){
  cabResultModal.style.display="flex";
  if(ok){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="CAB mener din opgave kan rulles ud. Pas på driftfejl!";
  } else {
    let reasonText="CAB: For stor risiko, dok for ringe. Opgaven fejler!";
    if(gameState.docSkipCount>2){
      reasonText="CAB: Du sprang dokumentation alt for ofte over! Afvist!";
    }
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent= reasonText;
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
    showPopup("Driftfejl: Implementeringen fejlede alligevel!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    endActiveTask();
  } else {
    showPopup("Drift-check bestået, opgaven lykkes!", "success");
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
taskSummaryOkBtn.addEventListener('click',()=> taskSummaryModal.style.display="none");

function showTaskSummaryModal(){
  let s= gameState.security;
  let st= gameState.stability;
  let d= gameState.development;
  let h= Math.round(gameState.hospitalSatisfaction);
  let money= gameState.money;
  taskSummaryText.innerHTML=`
    <strong>Opgave fuldført!</strong><br/>
    Sikkerhed=${s}, Stabilitet=${st}, Udvikling=${d}, Hospital=${h}%, Penge=${money}
  `;
  taskSummaryModal.style.display="flex";
}

// End-of-PI => Inspect & Adapt
const endModal= document.getElementById('end-modal');
const endGameSummary= document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click',()=>{
  endModal.style.display="none";
  nextPI();
});

function endPI(){
  if(gameState.activeTask) endActiveTask();
  endModal.style.display="flex";
  let he= gameState.hospitalExpectations;
  let c= gameState.commitGoals;
  let sec= gameState.security;
  let stab= gameState.stability;
  let dev= gameState.development;
  let hosp= Math.round(gameState.hospitalSatisfaction);
  let money= gameState.money;

  let hSecDiff= sec - he.security;
  let hStabDiff= stab- he.stability;
  let hDevDiff= dev - he.development;

  let cSecDiff= sec - c.security;
  let cStabDiff= stab- c.stability;
  let cDevDiff= dev - c.development;

  let partial="";
  if(hSecDiff>=0 && hStabDiff>=0 && hDevDiff>=0){
    partial="Du har mødt hospitalets krav. Bravo!";
  } else {
    partial="Hospitalet havde højere forventninger end du nåede i alt...";
  }
  let commitTxt="";
  if(cSecDiff>=0 && cStabDiff>=0 && cDevDiff>=0){
    commitTxt="Du slog endda dine egne commits. Fantastisk!";
  } else {
    commitTxt="Dine commits var en smule højere end din faktiske score.";
  }

  let sum=`
    <strong>PI #${gameState.currentPI} Slut!</strong><br/>
    ${partial}<br/>
    ${commitTxt}<br/><br/>

    <em>Krav:</em> S≥${he.security}, St≥${he.stability}, Dev≥${he.development}<br/>
    <em>Commit:</em> S=${c.security}, St=${c.stability}, Dev=${c.development}<br/>
    <em>Faktisk:</em> S=${sec}, St=${stab}, Dev=${dev}, 
    Hospital=${hosp}%, Penge=${money}<br/>
    Forskel ift. krav: S:${hSecDiff>=0?`+${hSecDiff}`:hSecDiff}, 
      St:${hStabDiff>=0?`+${hStabDiff}`:hStabDiff}, 
      Dev:${hDevDiff>=0?`+${hDevDiff}`:hDevDiff}<br/>
    Forskel ift. commit: S:${cSecDiff>=0?`+${cSecDiff}`:cSecDiff}, 
      St:${cStabDiff>=0?`+${cStabDiff}`:cStabDiff}, 
      Dev:${cDevDiff>=0?`+${cDevDiff}`:cDevDiff}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sum;
}

function nextPI(){
  gameState.currentPI++;
  if(gameState.currentPI> gameState.maxPI){
    showPopup("Alle PI'er gennemført!", "info");
  } else {
    gameState.availableTasks=[];
    gameState.riskyTotal=0;
    gameState.docSkipCount=0;
    synergyFlags["lackInfra"]=false; // valgfrit, man kan lade synergy gå videre
    synergyFlags["rushedJura"]=false;
    startPI();
  }
}

// UTILS
function showPopup(msg, type="success", duration=3000){
  const c=document.getElementById('popup-container');
  const div=document.createElement('div');
  div.classList.add('popup');
  if(type==="error") div.classList.add('error');
  else if(type==="info") div.classList.add('info');
  div.style.animation="none";
  div.textContent= msg;
  c.appendChild(div);
  setTimeout(()=> div.remove(), duration);
}
function showFloatingText(txt,stat){
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
