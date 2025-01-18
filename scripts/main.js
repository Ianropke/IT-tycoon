/************************************************************
 * main.js – 
 * Samme "levende tutorial" + opgavelogik 
 * Alle tasks-filer har nu statChange + mere narrativ
 ************************************************************/

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

/************************************************************
 * INTRO
 ************************************************************/
document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
  openTutorialModal();
});

/************************************************************
 * TUTORIAL: lidt levende
 ************************************************************/
const tutorialModal   = document.getElementById('tutorial-modal');
const tutorialTitleEl = document.getElementById('tutorial-title');
const tutorialTextEl  = document.getElementById('tutorial-text');
const tutorialNextBtn = document.getElementById('tutorial-next-btn');

let tutorialSteps = [
  {
    title:"Velkommen, IT-ansvarlig!",
    text:"Du har netop overtaget forvaltningen af LIMS. Serverrummene brummer, hospitalet råber på nye features, og cybersikkerhed advarer om hackere!"
  },
  {
    title:"Lokationer",
    text:"Infrastruktur, Informationssikkerhed, Hospital, Leverandør, IT Jura, Cybersikkerhed, Medicinsk Udstyr og Dokumentation. Klik på dem i opgavens rækkefølge!"
  },
  {
    title:"Parametre",
    text:"Security, Stability, Development, Hospital. Dine valg kan øge eller sænke dem. Hvis du løber tør for tid eller penge, bliver det svært!"
  },
  {
    title:"CAB Gennemgang",
    text:"Efter 4 trin i en opgave tjekker CAB risiko. Er den for høj, afvises opgaven. Hvis godkendt, er der stadig en driftfejl-chance!"
  },
  {
    title:"Dokumentation",
    text:"Sidste trin er ofte Dokumentation. Du kan skippe for at spare tid, men får +15% CAB-skepsis!"
  },
  {
    title:"Klar?",
    text:"Vælg en opgave i 'Mulige Opgaver', følg trinnene og pas på risici! Held og lykke!"
  }
];

function openTutorialModal(){
  gameState.tutorialActive = true;
  gameState.tutorialStep = 0;
  tutorialModal.style.display="flex";
  showTutorialContent();
}

function showTutorialContent(){
  if(gameState.tutorialStep >= tutorialSteps.length){
    tutorialModal.style.display="none";
    gameState.tutorialActive = false;
    initGame();
    return;
  }
  const st= tutorialSteps[gameState.tutorialStep];
  tutorialTitleEl.textContent= st.title;
  tutorialTextEl.textContent= st.text;
}
tutorialNextBtn.addEventListener('click', ()=>{
  gameState.tutorialStep++;
  showTutorialContent();
});

/************************************************************
 * START GAME
 ************************************************************/
function initGame(){
  updateScoreboard();
  // Saml tasks
  window.bigTasksData = [
    ...window.cybersikkerhedTasks,
    ...window.infrastrukturTasks,
    ...window.hospitalTasks
  ];
  // Generer 3 opgaver
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

const tasksList= document.getElementById('tasks-list');
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li= document.createElement('li');
    if(t.riskLevel===3){
      li.style.borderColor="red"; li.style.borderWidth="2px";
    }
    else if(t.riskLevel===2){
      li.style.borderColor="orange";
    }
    else {
      li.style.borderColor="green";
    }
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

/************************************************************
 * ASSIGN + STEPS
 ************************************************************/
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  const idx= gameState.availableTasks.findIndex(t=> t.id===taskId);
  if(idx===-1)return;
  const chosen= gameState.availableTasks.splice(idx,1)[0];

  gameState.activeTask= chosen;
  document.getElementById('active-task-headline').textContent= chosen.title+" – "+chosen.shortDesc;
  // mere "levende" logicLong:
  document.getElementById('active-task-description').textContent= chosen.logicLong || "";
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
  const c= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((st,i)=>{
    const li= document.createElement('li');
    li.textContent= `Trin ${i+1}: ${capitalizeLocation(st.location)}`;
    if(i< c){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsListEl.appendChild(li);
  });
  const last= document.createElement('li');
  last.style.color="#aaa";
  last.textContent=`Trin ${c+1} / ${gameState.activeTask.steps.length}`;
  stepsListEl.appendChild(last);
}

function capitalizeLocation(loc){
  if(!loc)return loc;
  return loc.split("-").map(x=> x.charAt(0).toUpperCase()+x.slice(1)).join("-");
}

/************************************************************
 * SCENARIO
 ************************************************************/
const scenarioModal= document.getElementById('scenario-modal');
function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  const idx= gameState.activeTask.currentStep;
  if(idx>= gameState.activeTask.steps.length)return;

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

const scenarioTitle= document.getElementById('scenario-title');
const scenarioDescription= document.getElementById('scenario-description');
const scenarioALabel= document.getElementById('scenario-a-label');
const scenarioAText= document.getElementById('scenario-a-text');
const scenarioAButton= document.getElementById('scenario-a-btn');
const scenarioBLabel= document.getElementById('scenario-b-label');
const scenarioBText= document.getElementById('scenario-b-text');
const scenarioBButton= document.getElementById('scenario-b-btn');
const docSkipOption= document.getElementById('doc-skip-option');

function showStepScenario(i){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";

  const st= gameState.activeTask.steps[i];
  scenarioTitle.textContent= `Trin ${i+1}: ${capitalizeLocation(st.location)}`;
  scenarioDescription.textContent= st.stepDescription || "";

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

function applyChoiceEffect(e){
  if(!e)return;
  if(e.timeCost) applyTimeCost(e.timeCost);
  if(e.moneyCost) applyMoneyCost(e.moneyCost);
  if(e.riskyPlus) gameState.riskyTotal+= e.riskyPlus;
  if(e.statChange){
    Object.entries(e.statChange).forEach(([stat,delta])=>{
      applyStatChange(stat,delta);
    });
  }
}

/************************************************************
 * finalizeStep => CAB => drift => feedback
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
 * DOC skip
 ************************************************************/
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";

  scenarioTitle.textContent="Dokumentation";
  scenarioDescription.textContent="CAB vil se dok, men du kan skippe den...";

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
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.15);
  fail= Math.max(0, Math.min(fail,1));
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
  const r= Math.random();
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
    cabResultText.textContent="Men hold øje med den tekniske drift!";
    postCABTechnicalCheck();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko eller manglende dok. Opgaven fejler.";
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

/************************************************************
 * DRIFT CHECK 
 ************************************************************/
function postCABTechnicalCheck(){
  cabResultModal.style.display="none";
  let driftFail= gameState.riskyTotal*0.5;
  const r= Math.random();
  if(r<driftFail){
    showPopup("Teknisk implementering fejlede i drift!", "error",4000);
    driftFailTask();
  } else {
    showPopup("Teknisk drift-check bestået!", "success",3000);
    completeTaskCAB();
    showPostCABFeedback();
  }
}

function driftFailTask(){
  gameState.tasksCompleted++;
  applyStatChange("stability",-5);
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;
  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/************************************************************
 * FEEDBACK
 ************************************************************/
function showPostCABFeedback(){
  const h= gameState.hospitalSatisfaction;
  const s= gameState.stability;
  const sec= gameState.security;

  let msgH = (h>120)?"Hospitalet jubler: Perfekt!"
           :(h>90) ?"Hospitalet er godt tilfredse."
           :(h>60) ?"Hospitalet er nogenlunde tilfredse."
                   :"Hospitalet er ret utilfredse...";

  let msgS = (s>120)?"Infrastruktur stråler af stabilitet!"
           :(s>90) ?"Infrastruktur kører ret stabilt."
           :(s>60) ?"Infrastruktur har nogle små bump."
                   :"Infrastruktur er svækket – pas på!";

  let msgC = (sec>120)?"Cybersikkerhed: Tæt på uigennemtrængeligt!"
           :(sec>90) ?"Cybersikkerhed: Acceptabelt niveau."
           :(sec>60) ?"Cybersikkerhed: Flere huller anes."
                   :"Cybersikkerhed: Kritisk lav beskyttelse!";

  const fbModal= document.createElement('div');
  fbModal.classList.add('modal');
  fbModal.style.display="flex";
  fbModal.innerHTML=`
    <div class="modal-content">
      <h2>Slutfeedback</h2>
      <p>${msgH}</p>
      <p>${msgS}</p>
      <p>${msgC}</p>
      <button id="fb-ok" style="background-color:#2ecc71;">OK</button>
    </div>
  `;
  document.body.appendChild(fbModal);
  fbModal.querySelector('#fb-ok').addEventListener('click', ()=>{
    fbModal.remove();
  });
}

/************************************************************
 * UTILS
 ************************************************************/
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
function applyTimeCost(t){
  gameState.time-= t;
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money-= m;
  updateScoreboard();
}
function applyStatChange(stat, delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}
function showFloatingText(txt, stat){
  const c= document.getElementById('floating-text-container');
  const div= document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
  div.style.top="50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent= txt;
  c.appendChild(div);
  setTimeout(()=> div.remove(),2000);
}

const endModal= document.getElementById('end-modal');
const endGameSummary= document.getElementById('end-game-summary');
document.getElementById('end-ok-btn').addEventListener('click', ()=>{
  endModal.style.display="none";
});
function endGame(){
  let sum=`
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sum;
  endModal.style.display="flex";

  gameState.activeTask=null;
  document.getElementById('active-task-headline').textContent="Ingen aktiv opgave";
  document.getElementById('active-task-description').textContent="";
  stepsListEl.innerHTML="<li>Ingen aktiv opgave</li>";
}

// Location-binding
const locationElements={
  "infrastruktur":document.getElementById('infrastruktur'),
  "informationssikkerhed":document.getElementById('informationssikkerhed'),
  "hospital":document.getElementById('hospital'),
  "leverandør":document.getElementById('leverandor'),
  "medicinsk-udstyr":document.getElementById('medicinsk-udstyr'),
  "it-jura":document.getElementById('it-jura'),
  "cybersikkerhed":document.getElementById('cybersikkerhed'),
  "dokumentation":document.getElementById('dokumentation')
};
Object.keys(locationElements).forEach(locKey=>{
  const el= locationElements[locKey];
  if(el){
    el.addEventListener('click',()=>{
      handleLocationClick(locKey);
    });
  }
});
