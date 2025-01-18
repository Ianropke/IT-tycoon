// scripts/main.js

let gameState = {
  time: 100,
  money: 1000,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,

  tasksCompleted: 0,
  activeTask: null,
  availableTasks: [],
  introModalOpen: true,

  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,

  usedTasks: new Set(),

  tutorialStep: 0,
  tutorialActive: false
};

function updateScoreboard(){
  document.getElementById('time-left').textContent   = gameState.time;
  document.getElementById('money-left').textContent  = gameState.money;
  document.getElementById('tasks-completed').textContent= gameState.tasksCompleted;
  document.getElementById('hospital-satisfaction').textContent= gameState.hospitalSatisfaction;
  document.getElementById('security-value').textContent   = gameState.security;
  document.getElementById('stability-value').textContent  = gameState.stability;
  document.getElementById('development-value').textContent= gameState.development;
}

// TUTORIAL
function startGameTutorial(){
  gameState.tutorialActive= true;
  gameState.tutorialStep= 0;
  showTutorialStep();
}
function showTutorialStep(){
  if(!gameState.tutorialActive) return;
  const tutorialSteps = [
    {
      title:"Lokationer",
      text:"Du har 8 bokse: Infrastruktur, Informationssikkerhed, Hospital, Leverandør, Medicinsk Udstyr, IT Jura, Cybersikkerhed, Dokumentation. Klik i rækkefølgen, opgaven kræver."
    },
    {
      title:"Hospital",
      text:"Fokus på personalet og nye funktioner."
    },
    {
      title:"Infrastruktur",
      text:"Fokus på drift, hardware, netværk."
    },
    {
      title:"Cybersikkerhed",
      text:"Beskytter mod sårbarheder og hackerangreb."
    },
    {
      title:"IT Jura",
      text:"Kontrakter, licensaftaler, compliance."
    },
    {
      title:"Dokumentation",
      text:"Sidste trin – du kan vælge fuld, minimal eller skip. Skip => stor CAB-skepsis."
    },
    {
      title:"Klar?",
      text:"Vælg en opgave, se 'Aktiv opgave', følg trinene! Held og lykke."
    }
  ];
  if(gameState.tutorialStep>= tutorialSteps.length){
    gameState.tutorialActive=false;
    showPopup("Tutorial færdig!", "info", 4000);
    return;
  }
  const step= tutorialSteps[gameState.tutorialStep];
  showPopup(`[Tutorial] ${step.title}: ${step.text}`, "info", 7500);
  gameState.tutorialStep++;
  if(gameState.tutorialStep>= tutorialSteps.length){
    setTimeout(()=>{ 
      gameState.tutorialActive=false; 
    },500);
  }
}

// Simple popup
function showPopup(msg, type="success", duration=3000){
  const c= document.getElementById('popup-container');
  const div= document.createElement('div');
  div.classList.add('popup');
  if(type==="error") div.classList.add('error');
  else if(type==="info") div.classList.add('info');
  div.style.animation="none";
  div.textContent= msg;
  c.appendChild(div);
  setTimeout(()=> div.remove(), duration);
}

// LOC references
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
const docSkipBtn= document.getElementById('doc-skip-btn');

const tasksList= document.getElementById('tasks-list');
const stepsList= document.getElementById('steps-list');
const activeTaskHeadline= document.getElementById('active-task-headline');
const activeTaskDesc= document.getElementById('active-task-description');

const endModal= document.getElementById('end-modal');
const endGameSummary= document.getElementById('end-game-summary');
const endOkBtn= document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', ()=>{
  endModal.style.display="none";
});

const cabModal= document.getElementById('cab-modal');
const cabSummary= document.getElementById('cab-summary');
const cabOkBtn= document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', ()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

const cabResultModal= document.getElementById('cab-result-modal');
const cabResultTitle= document.getElementById('cab-result-title');
const cabResultText= document.getElementById('cab-result-text');
const cabResultOkBtn= document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', ()=>{
  cabResultModal.style.display="none";
});

// GAME LOGIC
function initGame(){
  updateScoreboard();
  // Saml tasks fra de 3 filer
  window.bigTasksData= [
    ...window.cybersikkerhedTasks,
    ...window.infrastrukturTasks,
    ...window.hospitalTasks
  ];
  // Generer 3 opgaver ved start
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

function generateTask(){
  if(gameState.availableTasks.length>=10)return;

  let notUsed= window.bigTasksData.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length)return;

  let chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let riskLevel= Math.floor(Math.random()*3)+1;
  const newTask={
    id: Date.now()+Math.floor(Math.random()*1000),
    title: chosen.title,
    shortDesc: chosen.shortDesc,
    logicLong: chosen.logicLong,
    steps: chosen.steps,
    riskLevel,
    currentStep: 0,
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement('li');
    if(t.riskLevel===3){ li.style.borderColor="red"; li.style.borderWidth="2px"; }
    else if(t.riskLevel===2){ li.style.borderColor="orange"; }
    else { li.style.borderColor="green"; }
    let label= (t.riskLevel===3)?" (HØJPRIORITET)":"";
    li.innerHTML=`
      <strong>${t.title}${label}</strong><br/>
      Risiko: ${t.riskLevel}
      <p class="task-description" style="display:none;">${t.shortDesc}</p>
    `;
    const btn= document.createElement('button');
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

function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  const idx= gameState.availableTasks.findIndex(t=> t.id===taskId);
  if(idx===-1)return;
  const chosen= gameState.availableTasks.splice(idx,1)[0];
  
  gameState.activeTask= chosen;
  activeTaskHeadline.textContent= chosen.title+" – "+chosen.shortDesc;
  activeTaskDesc.textContent= chosen.logicLong||"";
  updateStepsList();
  renderTasks();
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const cur= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((st,i)=>{
    const li=document.createElement("li");
    li.textContent=`Trin ${i+1}: ${capitalizeLocation(st.location)}`;
    if(i<cur){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
  const prog=document.createElement("li");
  prog.style.color="#aaa";
  prog.textContent= `Trin ${cur+1} / ${gameState.activeTask.steps.length}`;
  stepsList.appendChild(prog);
}

function capitalizeLocation(loc){ 
  if(!loc) return loc;
  return loc.split("-").map(s=> s.charAt(0).toUpperCase()+ s.slice(1)).join("-");
}

function handleLocationClick(locName){
  if(!gameState.activeTask) return showPopup("Vælg en opgave først!", "error");
  const idx= gameState.activeTask.currentStep;
  if(idx>= gameState.activeTask.steps.length) return;

  const st= gameState.activeTask.steps[idx];
  if(!st)return;
  if(gameState.activeTask.decisionMadeForStep[idx])return;

  if(locName!== st.location){
    if(st.location==="dokumentation"){
      skipDocumentationPopup();
    }
    return;
  }
  showStepScenario(idx);
}

function showStepScenario(stepIndex){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";

  const st= gameState.activeTask.steps[stepIndex];
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
  if(!eff) return;
  if(eff.timeCost) applyTimeCost(eff.timeCost);
  if(eff.moneyCost) applyMoneyCost(eff.moneyCost);
  if(eff.riskyPlus) gameState.riskyTotal+= eff.riskyPlus;
  if(eff.statChange){
    // fx { hospitalSatisfaction: -5 }
    Object.entries(eff.statChange).forEach(([stat,delta])=>{
      gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
      updateScoreboard();
      showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
    });
  }
}

function finalizeStep(stepIndex){
  if(!gameState.activeTask)return;
  gameState.activeTask.decisionMadeForStep[stepIndex]=true;

  // baseline +2 tid
  applyTimeCost(2);

  gameState.activeTask.currentStep++;
  if(gameState.activeTask.currentStep>= gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

function showCABModal(){
  let fail= gameState.riskyTotal + gameState.docSkipCount*0.15;
  fail= Math.max(0,Math.min(fail,1));
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Risikoprocent: ${(fail*100).toFixed(0)}%<br/>
    SkipDok: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  const r= Math.random();
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
    cabResultText.textContent="Implementér i drift – men kan stadig fejle teknisk.";
    postCABTechnicalCheck();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko/manglende dok. Opgaven fejler.";
    failTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function postCABTechnicalCheck(){
  cabResultModal.style.display="none";
  // driftFejlChance = 0.5 * riskyTotal
  const driftFail= gameState.riskyTotal*0.5;
  const r= Math.random();
  if(r<driftFail){
    showPopup("Teknisk implementering fejlede i drift!", "error", 4000);
    driftFailTask();
  } else {
    showPopup("Teknisk drift-check bestået!", "success", 3000);
    completeTaskCAB();
    showPostCABFeedback();
  }
}

function driftFailTask(){
  gameState.tasksCompleted++;
  applyStatChange("stability",-5);
  gameState.activeTask= null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function showPostCABFeedback(){
  const h= gameState.hospitalSatisfaction;
  const s= gameState.stability;
  const sec= gameState.security;

  let msgH="";
  if(h>120) msgH="Hospital: Fantastisk! Personalet jubler!";
  else if(h>90) msgH="Hospital: Vi er glade for ændringen.";
  else if(h>60) msgH="Hospital: Acceptabelt, men kunne være bedre.";
  else msgH="Hospital: Vi er ret utilfredse...";

  let msgS="";
  if(s>120) msgS="Infrastruktur: Systemet kører super stabilt!";
  else if(s>90) msgS="Infrastruktur: Ganske stabil drift.";
  else if(s>60) msgS="Infrastruktur: Små bump undervejs.";
  else msgS="Infrastruktur: Ret ustabilt – stort problem!";

  let msgC="";
  if(sec>120) msgC="Cybersikkerhed: Tæt på perfekt sikring!";
  else if(sec>90) msgC="Cybersikkerhed: Acceptabelt sikkerhedsniveau.";
  else if(sec>60) msgC="Cybersikkerhed: Nogle bekymringer, men stabilt nok.";
  else msgC="Cybersikkerhed: Meget kritisk lav beskyttelse!";

  const fbModal=document.createElement('div');
  fbModal.classList.add('modal');
  fbModal.style.display="flex";
  fbModal.innerHTML=`
    <div class="modal-content">
      <h2>Slutfeedback fra interessenter</h2>
      <p>${msgH}</p>
      <p>${msgS}</p>
      <p>${msgC}</p>
      <button id="feedbackOkBtn" style="background-color:#2ecc71;">OK</button>
    </div>
  `;
  document.body.appendChild(fbModal);
  fbModal.querySelector('#feedbackOkBtn').addEventListener('click',()=>{
    fbModal.remove();
  });
}

// doc skip
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";

  scenarioTitle.textContent="Dokumentation";
  scenarioDescription.textContent="CAB vil se dokumentation, men du kan skippe den…";

  scenarioALabel.textContent="Fuldt dok";
  scenarioAText.textContent="3 tid, 10 kr, ingen ekstra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };

  scenarioBLabel.textContent="Minimal dok";
  scenarioBText.textContent="1 tid, 0 kr, +5% fejl";
  scenarioBButton.onclick=()=>{
    applyTimeCost(1);
    gameState.riskyTotal+=0.05;
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };

  docSkipBtn.onclick=()=>{
    // skip => +15% fejl
    gameState.docSkipCount++;
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };
}

// basic apply
function applyTimeCost(t){
  gameState.time-=t;
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money-=m;
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}
function showFloatingText(txt, stat){
  const c= document.getElementById('floating-text-container');
  const div= document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
  div.style.top= "50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent= txt;
  c.appendChild(div);
  setTimeout(()=> div.remove(),2000);
}

// end of game
function endGame(){
  let sumText=`
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sumText;
  endModal.style.display="flex";

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

// BIND location clicks
const locationElements={
  "infrastruktur": document.getElementById('infrastruktur'),
  "informationssikkerhed": document.getElementById('informationssikkerhed'),
  "hospital": document.getElementById('hospital'),
  "leverandør": document.getElementById('leverandor'),
  "medicinsk-udstyr": document.getElementById('medicinsk-udstyr'),
  "it-jura": document.getElementById('it-jura'),
  "cybersikkerhed": document.getElementById('cybersikkerhed'),
  "dokumentation": document.getElementById('dokumentation')
};
Object.keys(locationElements).forEach(locKey=>{
  const el= locationElements[locKey];
  if(el) el.addEventListener('click',()=>{
    handleLocationClick(locKey);
  });
});

// Start
initGame();
