/************************************************************
 * main.js – IT-Tycoon, med:
 *  - Forpligt/fjern tasks
 *  - Scoreboard
 *  - Arkitekthjælp
 *  - Scenario-løsning
 *  - showMoreInfo (til ordbog)
 ************************************************************/

// Arrays til tasks
window.hospitalTasks = window.hospitalTasks || [];
window.infrastrukturTasks = window.infrastrukturTasks || [];
window.cybersikkerhedTasks = window.cybersikkerhedTasks || [];

const missionGoals = {
  security: 110,
  development: 115
};

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

  lastFinishedTask: null
};

const scenarioFlavorPool = [
  "Personalet klager over ustabil drift…",
  "En intern revisor snuser rundt efter dokumentationshuller…",
  "En ny leverandør vil sælge dig en hurtig men usikker løsning…",
  "Ledelsen ønsker hurtige resultater, men CAB er skeptisk…"
];

// HTML Refs
const securityValueEl  = document.getElementById('security-value');
const stabilityValueEl = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl       = document.getElementById('time-left');
const moneyLeftEl      = document.getElementById('money-left');
const tasksCompletedEl = document.getElementById('tasks-completed');
const hospitalSatEl    = document.getElementById('hospital-satisfaction');

const introModal       = document.getElementById('intro-modal');
const tutorialModal    = document.getElementById('tutorial-modal');
const scenarioModal    = document.getElementById('scenario-modal');
const cabModal         = document.getElementById('cab-modal');
const cabResultModal   = document.getElementById('cab-result-modal');
const endModal         = document.getElementById('end-modal');
const taskSummaryModal = document.getElementById('task-summary-modal');
const architectModal   = document.getElementById('architect-modal');
const moreInfoModal    = document.getElementById('more-info-modal');

const scenarioTitle       = document.getElementById('scenario-title');
const scenarioFlavorText  = document.getElementById('scenario-flavor-text');
const scenarioDescription = document.getElementById('scenario-description');
const scenarioAButton     = document.getElementById('scenario-a-btn');
const scenarioBButton     = document.getElementById('scenario-b-btn');
const scenarioALabel      = document.getElementById('scenario-a-label');
const scenarioAText       = document.getElementById('scenario-a-text');
const scenarioBLabel      = document.getElementById('scenario-b-label');
const scenarioBText       = document.getElementById('scenario-b-text');
const scenarioNarrativeDiv= document.getElementById('scenario-narrative');
const digDeeperLinksDiv   = document.getElementById('dig-deeper-links');

const cabSummary       = document.getElementById('cab-summary');
const cabResultTitle   = document.getElementById('cab-result-title');
const cabResultText    = document.getElementById('cab-result-text');
const endGameSummary   = document.getElementById('end-game-summary');
const taskSummaryText  = document.getElementById('task-summary-text');
const architectContent = document.getElementById('architect-content');
const moreInfoContent  = document.getElementById('more-info-content');

// Knapper
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  introModal.style.display="none";
  openTutorialModal();
});
document.getElementById('end-ok-btn').addEventListener('click',()=>{
  endModal.style.display="none";
});
document.getElementById('cab-ok-btn').addEventListener('click',()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});
document.getElementById('cab-result-ok-btn').addEventListener('click',()=>{
  cabResultModal.style.display="none";
  postCABTechnicalCheck();
});
document.getElementById('task-summary-ok-btn').addEventListener('click',()=>{
  taskSummaryModal.style.display="none";
  renderTasks();
});
document.getElementById('more-info-close-btn').addEventListener('click',()=>{
  moreInfoModal.style.display="none";
});
document.getElementById('architect-help-btn').addEventListener('click',()=>{
  if(!gameState.activeTask){
    showPopup("Ingen aktiv opgave!", "error");
    return;
  }
  if(gameState.activeTask.architectUsed){
    showPopup("Arkitekthjælp allerede brugt på denne opgave!", "error");
    return;
  }
  showArchitectModal();
});

// Tutorial
const tutorialTitleEl= document.getElementById('tutorial-title');
const tutorialTextEl = document.getElementById('tutorial-text');
const tutorialNextBtn= document.getElementById('tutorial-next-btn');
let tutorialSteps = [
  {
    title: "Din rolle",
    text: "Du forvalter LIMS på et stort hospital. Tid, penge, dokumentation osv. styrer du."
  },
  {
    title: "CAB & Dokumentation",
    text: "CAB kan afvise dine ændringer, hvis risikoen er for høj, eller dokumentation mangler."
  },
  {
    title: "Missionmål",
    text: `Du skal opnå mindst ${missionGoals.security} i sikkerhed og ${missionGoals.development} i udvikling. Held og lykke!`
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
  tutorialTitleEl.textContent = tutorialSteps[tutorialIdx].title;
  tutorialTextEl.textContent  = tutorialSteps[tutorialIdx].text;
}
tutorialNextBtn.addEventListener('click',()=>{
  tutorialIdx++;
  showTutorialContent();
});

// Lokationer
const locMap= {
  hospital:       document.getElementById('hospital'),
  dokumentation:  document.getElementById('dokumentation'),
  leverandor:     document.getElementById('leverandor'),
  infrastruktur:  document.getElementById('infrastruktur'),
  "it-jura":      document.getElementById('it-jura'),
  cybersikkerhed: document.getElementById('cybersikkerhed')
};
Object.entries(locMap).forEach(([key, el])=>{
  el.addEventListener('click', ()=> handleLocationClick(key));
});

// initGame
function initGame(){
  updateScoreboard();
  window.backlog = [
    ...(window.hospitalTasks||[]),
    ...(window.infrastrukturTasks||[]),
    ...(window.cybersikkerhedTasks||[])
  ];
  // Generér fx 3 startopgaver
  for(let i=0; i<3; i++){
    generateTask();
  }

  // spawn løbende
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

function updateScoreboard(){
  calcHospitalSatisfaction();
  timeLeftEl.textContent        = gameState.time;
  moneyLeftEl.textContent       = gameState.money;
  tasksCompletedEl.textContent  = gameState.tasksCompleted;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
  hospitalSatEl.textContent     = Math.round(gameState.hospitalSatisfaction);
}

function calcHospitalSatisfaction(){
  let avg = (gameState.security + gameState.stability + gameState.development)/3;
  let penalty = (gameState.money < 0) ? Math.floor(Math.abs(gameState.money)/100)*2 : 0;
  let newVal = avg - penalty;
  gameState.hospitalSatisfaction = Math.max(0, Math.min(newVal, 150));
}

function generateTask(){
  if(gameState.availableTasks.length>=10) return;
  let notUsed = window.backlog.filter(t=> !gameState.usedTasks.has(t.title));
  if(!notUsed.length) return;

  let chosen= notUsed[Math.floor(Math.random()*notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let newTask= JSON.parse(JSON.stringify(chosen));
  newTask.currentStep=0;
  newTask.preRiskReduction=0;
  newTask.architectUsed=false;

  gameState.availableTasks.push(newTask);
  renderTasks();
}

function renderTasks(){
  let tasksList= document.getElementById('tasks-list');
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML= "<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    let li= document.createElement('li');
    li.innerHTML= `<strong>${t.title}</strong><br/>${t.shortDesc||"Ingen beskrivelse"}`;

    let comBtn= document.createElement('button');
    comBtn.textContent= "Forpligt";
    comBtn.classList.add('commit-button');
    comBtn.addEventListener('click',(e)=>{
      e.stopPropagation();
      assignTask(t.title);
    });
    li.appendChild(comBtn);
    tasksList.appendChild(li);
  });
}

function assignTask(taskTitle){
  if(gameState.activeTask){
    showPopup("Du har allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.time<=0){
    endGame();
    return;
  }
  let idx= gameState.availableTasks.findIndex(x=> x.title===taskTitle);
  if(idx===-1) return;

  let chosen= gameState.availableTasks.splice(idx,1)[0];
  gameState.activeTask= chosen;

  // Viser scenariointro i ephemeral popup eller modal
  if(chosen.narrativeIntro){
    // Evt. stor modal i stedet for ephemeral
    showPopup(chosen.narrativeIntro,"info",6000);
  }

  document.getElementById('active-task-headline').textContent= chosen.title;
  document.getElementById('active-task-description').textContent= chosen.shortDesc||"";
  updateStepsList();
  renderTasks();
}

function updateStepsList(){
  let stepsList= document.getElementById('steps-list');
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML= "<li>Ingen aktiv opgave</li>";
    return;
  }
  let c= gameState.activeTask.currentStep ||0;
  gameState.activeTask.steps.forEach((st,i)=>{
    let li= document.createElement('li');
    let loc= st.location||"ukendt lokation";
    li.textContent= `Trin ${i+1}: ${loc}`;
    if(i<c){
      li.style.textDecoration= "line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  if(gameState.time<=0){
    endGame();
    return;
  }
  let i= gameState.activeTask.currentStep;
  if(i>= gameState.activeTask.steps.length) return;

  let needed= gameState.activeTask.steps[i].location||"ukendt lokation";
  if(locName!== needed) return;
  showScenarioModal(i);
}

function showScenarioModal(stepIndex){
  scenarioModal.style.display="flex";

  let t= gameState.activeTask;
  let st= t.steps[stepIndex];
  let loc= st.location||"ukendt";

  if(t.narrativeIntro){
    scenarioNarrativeDiv.style.display="block";
    scenarioNarrativeDiv.innerHTML= t.narrativeIntro;
  } else {
    scenarioNarrativeDiv.style.display="none";
  }

  scenarioTitle.textContent= `Trin ${stepIndex+1}: ${loc}`;
  scenarioFlavorText.textContent= scenarioFlavorPool[Math.floor(Math.random()* scenarioFlavorPool.length)];
  scenarioDescription.innerHTML= `<p style="font-size:1.15rem; line-height:1.4;">
    ${st.stepDescription||"Standard scenarie..."}
  </p>`;

  digDeeperLinksDiv.innerHTML="";
  if(t.digDeeperLinks && t.digDeeperLinks.length){
    digDeeperLinksDiv.style.display="block";
    t.digDeeperLinks.forEach(linkObj=>{
      let btn= document.createElement('button');
      btn.classList.add('commit-button');
      btn.textContent= "Mere info: " + linkObj.label;
      btn.onclick=()=> showMoreInfo(linkObj.text);
      digDeeperLinksDiv.appendChild(btn);
    });
  } else {
    digDeeperLinksDiv.style.display="none";
  }

  scenarioALabel.textContent= st.choiceA.label;
  scenarioAText.innerHTML= st.choiceA.text + (st.choiceA.recommended? " <span class='recommended'>(Anbefalet)</span>":"");
  scenarioBLabel.textContent= st.choiceB.label;
  scenarioBText.innerHTML= st.choiceB.text + (st.choiceB.recommended? " <span class='recommended'>(Anbefalet)</span>":"");

  scenarioAButton.onclick= ()=>{
    applyChoiceEffect(st.choiceA.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display="none";
  };
  scenarioBButton.onclick= ()=>{
    applyChoiceEffect(st.choiceB.applyEffect);
    finalizeStep(stepIndex);
    scenarioModal.style.display="none";
  };
}

function applyChoiceEffect(eff){
  if(!eff) return;
  if(eff.timeCost)  applyTimeCost(eff.timeCost);
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost);
  if(eff.riskyPlus) gameState.riskyTotal += eff.riskyPlus;
  if(eff.statChange){
    for(let [stat,delta] of Object.entries(eff.statChange)){
      applyStatChange(stat, delta);
    }
  }
}

function applyTimeCost(t){
  gameState.time= Math.max(gameState.time - t,0);
  updateScoreboard();
  if(gameState.time<=0){
    endGame();
  }
}
function applyMoneyCost(m){
  gameState.money= Math.max(gameState.money - m, -99999);
  updateScoreboard();
}
function applyStatChange(stat, delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0? `+${delta}`:`${delta}`)+" "+stat, stat);
}

function finalizeStep(stepIndex){
  let t= gameState.activeTask;
  if(!t) return;
  t.currentStep++;
  applyTimeCost(2); 
  updateStepsList();

  if(t.currentStep>= t.steps.length){
    if(t.preRiskReduction>0){
      gameState.riskyTotal= Math.max(gameState.riskyTotal - t.preRiskReduction, 0);
      showPopup(`Din arkitekthjælp/undersøgelse gav -${(t.preRiskReduction*100).toFixed(0)}% risiko!`,"info",4000);
    }
    showCABModal();
  }
}

// CAB
function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.05);
  if(fail>1) fail=1;
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerHTML= `
    <strong>CAB-gennemgang</strong><br/>
    Risiko pga. hurtige/billige valg: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Du har sprunget dokumentation over: ${gameState.docSkipCount} gange => +${(gameState.docSkipCount*5)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
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
    cabResultTitle.textContent= "CAB: Godkendt!";
    cabResultText.textContent= "CAB mener, at ændringerne kan gennemføres.";
  } else {
    cabResultTitle.textContent= "CAB: Afvist!";
    cabResultText.textContent= "For stor risiko eller for lidt dokumentation. Opgaven mislykkes.";
    failTaskCAB();
  }
}
function postCABTechnicalCheck(){
  cabResultModal.style.display="none";
  let driftFail= gameState.riskyTotal*0.3;
  if(Math.random()< driftFail){
    showPopup("Implementeringen fejlede i praksis!", "error");
    gameState.tasksCompleted++;
    applyStatChange("stability",-5);
    endActiveTask();
  } else {
    showPopup("Drifts-tjek lykkedes!", "success");
    completeTaskCAB();
  }
}
function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  endActiveTask();
}
function completeTaskCAB(){
  gameState.tasksCompleted++;
  gameState.lastFinishedTask= gameState.activeTask;
  endActiveTask();
}
function endActiveTask(){
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  document.getElementById('steps-list').innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
  showTaskSummaryModal();
}

function showTaskSummaryModal(){
  let s= gameState.security,
      st= gameState.stability,
      d= gameState.development,
      h= Math.round(gameState.hospitalSatisfaction),
      money= gameState.money;

  let summary= `
    <strong>Opgave fuldført!</strong><br/>
    Aktuelle værdier: 
    Sikkerhed=${s}, Stabilitet=${st}, Udvikling=${d}, 
    Hospitalstilfredshed=${h}%, Penge=${money}<br/><br/>
    <strong>Mission Evaluering:</strong><br/>
    Sikkerhed: ${s>=missionGoals.security ? "Opfyldt":"Ikke opfyldt"} (mål: ${missionGoals.security})<br/>
    Udvikling: ${d>=missionGoals.development ? "Opfyldt":"Ikke opfyldt"} (mål: ${missionGoals.development})<br/><br/>
  `;

  let lastT= gameState.lastFinishedTask;
  if(lastT && lastT.knowledgeRecap){
    summary+= `<hr/><strong>Vidensopsummering:</strong><br/>${lastT.knowledgeRecap}`;
  }
  if(lastT && lastT.learningInfo){
    summary+= `<hr/><strong>Ekstra læring:</strong><br/>${lastT.learningInfo}`;
  }
  taskSummaryText.innerHTML= summary;
  taskSummaryModal.style.display="flex";
}

function endGame(){
  showPopup("Tiden er brugt op!", "info", 3000);
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  document.getElementById('steps-list').innerHTML="<li>Ingen aktiv opgave</li>";

  endModal.style.display="flex";
  let s= gameState.security,
      st= gameState.stability,
      d= gameState.development,
      h= gameState.hospitalSatisfaction,
      money= gameState.money;

  let sumText= `
    <strong>Slutresultat:</strong><br/>
    Resterende penge: ${money}<br/>
    Sikkerhed: ${s}<br/>
    Stabilitet: ${st}<br/>
    Udvikling: ${d}<br/>
    Hospitalstilfredshed: ${h}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/><br/>
    <strong>Mission Evaluering:</strong><br/>
    Sikkerhed: ${s>=missionGoals.security ? "Opfyldt":"Ikke opfyldt"} (mål: ${missionGoals.security})<br/>
    Udvikling: ${d>=missionGoals.development ? "Opfyldt":"Ikke opfyldt"} (mål: ${missionGoals.development})
  `;
  endGameSummary.innerHTML= sumText;
}

// Vis ephemeral popup i top-right
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

// Flydende tekst i center
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
  else div.style.color="#fff";
  div.textContent= txt;
  fc.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}

// Viser en “Mere info” modal
function showMoreInfo(infoText){
  moreInfoContent.innerHTML= infoText;
  moreInfoModal.style.display="flex";
}

// Arkitekthjælp
function showArchitectModal(){
  let t= gameState.activeTask;
  if(!t)return;

  let analysis= `<strong>Arkitektens Opgaveanalyse:</strong><br/>
  <em>${t.title}</em><br/><br/>
  <p>
    Som arkitekt ser jeg på sammenhængen mellem trin og mulige tekniske faldgruber. 
    Husk at for meget risiko eller for lidt dokumentation kan give CAB-afvisning.
  </p>
  `;

  let recCount=0, recInfo="";
  if(t.steps && t.steps.length){
    t.steps.forEach((step,i)=>{
      let loc= step.location||"ukendt";
      analysis += `<br/><strong>Trin ${i+1}:</strong> ${loc}`;
      if(step.choiceA.recommended || step.choiceB.recommended){
        recCount++;
        recInfo += `<br/><strong>Trin ${i+1}:</strong> `;
        if(step.choiceA.recommended) recInfo += `A: ${step.choiceA.label}. `;
        if(step.choiceB.recommended) recInfo += `B: ${step.choiceB.label}. `;
      }
    });
  }
  if(recCount>0){
    analysis += `<hr/><strong>Kritiske valg</strong>: ${recInfo}`;
  } else {
    analysis += "<hr/>Ingen trin er markeret som anbefalet.";
  }
  architectContent.innerHTML= analysis;
  architectModal.style.display="flex";
  t.architectUsed= true;
}
