/************************************************************
 * script.js
 * - Ingen lilla popup (fjernet “info” style).
 * - Større modal-bokse (70% width).
 * - Dokumentation: 3. valgmulighed “skip doc”.
 * - Fejlet opgave forklarer hvorfor
 * - Ingen stop ved tid/penge < 0 => man kan gå i minus
 ************************************************************/

const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction')
};

// scenarie-modal
const scenarioModal       = document.getElementById('scenario-modal');
const scenarioTitle       = document.getElementById('scenario-title');
const scenarioDescription = document.getElementById('scenario-description');
const scenarioALabel      = document.getElementById('scenario-a-label');
const scenarioAText       = document.getElementById('scenario-a-text');
const scenarioAButton     = document.getElementById('scenario-a-btn');
const scenarioBLabel      = document.getElementById('scenario-b-label');
const scenarioBText       = document.getElementById('scenario-b-text');
const scenarioBButton     = document.getElementById('scenario-b-btn');
const docSkipOption       = document.getElementById('doc-skip-option');
const docSkipBtn          = document.getElementById('doc-skip-btn');

// tasks
const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

// end modal
const endModal       = document.getElementById('end-modal');
const endGameSummary = document.getElementById('end-game-summary');
const endOkBtn       = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', ()=>{ endModal.style.display="none"; });

// CAB
const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click',()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

const cabResultModal = document.getElementById('cab-result-modal');
const cabResultTitle = document.getElementById('cab-result-title');
const cabResultText  = document.getElementById('cab-result-text');
const cabResultOkBtn = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', ()=>{
  cabResultModal.style.display="none";
});

document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// Spiltilstand
let gameState={
  time:100,
  money:1000,
  security:100,
  stability:100,
  development:100,
  hospitalSatisfaction:100,

  tasksCompleted:0,
  totalRewards:0,

  activeTask:null,
  availableTasks:[],
  introModalOpen:true,

  docSkipCount:0,
  riskyTotal:0,
  finalFailChance:0,

  usedTasks: new Set()
};

// Opgavenavne (samme som før)
const stabilityTasks=[...];
const devTasks=[...];
const secTasks=[...];

/* Eksempel: fjerner “medicinsk-udstyr” fra dev. Samme som før? 
   Du kan sætte den tilbage, hvis du vil */
const allowedLocationsForTask={
  security:["cybersikkerhed","informationssikkerhed","it-jura"],
  development:["hospital","leverandor","it-jura"],
  stability:["hospital","infrastruktur","leverandor","dokumentation"]
};

function getTaskDescription(category){
  if(category==="stability") return "(Stabilitetsopgave) ...";
  else if(category==="development") return "(Udviklingsopgave) ...";
  else return "(Sikkerhedsopgave) ...";
}

// Scenarier
const detailedScenarios={
  "hospital":[
    {
      description: "Hospitalets LIMS skal opgraderes",
      A:{ label:"Konservativ opgradering", text:"2 tid, 50 kr; +1 stabilitet, +1 hospital.", 
          time:2, money:50, effects:{stability:1,hospitalSatisfaction:1}, failBonus:0 },
      B:{ label:"Stor Modernisering", text:"5 tid, 150 kr; +3 hospital, +2 udvikling, 5% fejl", 
          time:5, money:150, effects:{hospitalSatisfaction:3, development:2}, failBonus:0.05 }
    }
  ],
  "it-jura":[
    {
      description: "Leverandørkontrakter er uoverskuelige",
      A:{ label:"Grundig Revision", text:"4 tid, 150 kr; +2 sikkerhed, +1 stabilitet", 
          time:4,money:150,effects:{security:2, stability:1}, failBonus:0 },
      B:{ label:"Hurtig Revision", text:"1 tid, 0 kr; +1 udvikling, 10% fejl", 
          time:1,money:0,effects:{development:1}, failBonus:0.1 }
    }
  ],
  "leverandor":[
    {
      description:"Leverandøren kritiseres for dårlig kvalitet",
      A:{ label:"Omfattende Kvalitetstjek", text:"6 tid, 200 kr; +2 stabilitet, +1 sikkerhed", 
          time:6, money:200, effects:{stability:2, security:1}, failBonus:0 },
      B:{ label:"Hurtig Leverance", text:"2 tid, 50 kr; +1 stabilitet, 10% fejl", 
          time:2, money:50, effects:{stability:1}, failBonus:0.1 }
    }
  ],
  "infrastruktur":[
    {
      description:"Serverparken forældet, nedbrud sker tit",
      A:{ label:"Stor Modernisering", text:"5 tid, 200 kr; +2 stabilitet, +2 udvikling", 
          time:5, money:200, effects:{stability:2,development:2}, failBonus:0 },
      B:{ label:"Minimal Patch", text:"1 tid, 50 kr; +1 stabilitet, 5% fejl", 
          time:1, money:50, effects:{stability:1}, failBonus:0.05 }
    }
  ],
  "informationssikkerhed":[
    {
      description:"Store sikkerhedshuller",
      A:{ label:"Fuld Kryptering", text:"4 tid, 60 kr; +2 sikkerhed, +1 stabilitet", 
          time:4, money:60, effects:{security:2, stability:1}, failBonus:0 },
      B:{ label:"Basal Sikkerhed", text:"2 tid, 0 kr; +1 sikkerhed, 10% fejl", 
          time:2, money:0, effects:{security:1}, failBonus:0.1 }
    }
  ],
  // Dokumentation => Vi vil gerne have to valgmuligheder, så man decideret 
  // kan skippe. Ellers laver vi en doc-skip-knap
  "dokumentation":[
    {
      description:"Dokumentation for dine ændringer",
      A:{ label:"Udfør Dokumentation", text:"3 tid, 10 kr; CAB sætter ingen ekstra fejl-procent",
          time:3, money:10, effects:{}, failBonus:0 },
      B:{ label:"Halvdelen dokumenteres", text:"1 tid, 0 kr; +5% fejl i CAB", 
          time:1, money:0, effects:{}, failBonus:0.05 }
    }
  ]
};

function updateScoreboard(){
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent   = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const current = gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li=document.createElement("li");
    li.textContent = `Trin ${i+1}: ${locName}`;
    if(i<current){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

// Klik på en lokation
function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!","error");
    return;
  }
  // Her KAN time<=0 => men vi lader det være => man kan gå i minus 
  // if time is negative, we do not forcibly end
  const idx=gameState.activeTask.currentStep;
  if(idx>=gameState.activeTask.steps.length) return;
  const needed=gameState.activeTask.steps[idx];

  // Tjek doc skip
  if(needed.toLowerCase()==="dokumentation"){
    // Vi viser doc-skip i scenario
    skipDocumentationPopup();
    return;
  }
  
  if(locName.toLowerCase()!==needed.toLowerCase())return;
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[idx])return;
  gameState.activeTask.decisionMadeForStep[idx]=true;
  
  showScenarioModal(locName);
}

// Viser doc-skip som scenario
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  
  // Kun A og skip => B bliver “gemt”
  scenarioTitle.textContent="Dokumentation – vil du udføre eller skippe?";
  scenarioDescription.textContent="CAB HADER når du skipper!";
  
  scenarioALabel.textContent="Dokumentation Udført";
  scenarioAText.textContent="3 tid, 10 kr, ingen ekstra fejl i CAB";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  scenarioBLabel.textContent="Mini-dokumentation";
  scenarioBText.textContent="1 tid, 0 kr, +5% fejl ved CAB";
  scenarioBButton.onclick=()=>{
    gameState.riskyTotal+=0.05;
    applyTimeCost(1);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  // Nu viser vi 3. knap => skip doc => +15% fejl
  docSkipOption.style.display="block";
  docSkipBtn.onclick=()=>{
    gameState.docSkipCount++;
    // skip => 0 tid?
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// scenario
function showScenarioModal(locName){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none"; // gem doc-skip for standard scenario
  
  const scenarios = detailedScenarios[locName.toLowerCase()];
  if(!scenarios || scenarios.length===0){
    scenarioTitle.textContent= locName;
    scenarioDescription.textContent="(Standard)";
    scenarioALabel.textContent="Mulighed A (standard)";
    scenarioAText.textContent="Giver +2 stabilitet, -50 kr";
    scenarioAButton.onclick=()=>{
      applyTimeCost(2);
      applyMoneyCost(50);
      applyStatChange("stability",2);
      scenarioModal.style.display="none";
      finalizeStep();
    };
    scenarioBLabel.textContent="Mulighed B (hurtig)";
    scenarioBText.textContent="Billigere, men 10% fejlrisiko";
    scenarioBButton.onclick=()=>{
      gameState.riskyTotal+=0.1;
      scenarioModal.style.display="none";
      finalizeStep();
    };
    return;
  }
  
  const sc= scenarios[Math.floor(Math.random()*scenarios.length)];
  scenarioTitle.textContent=`${locName} – ${sc.description}`;
  scenarioDescription.textContent="";
  
  scenarioALabel.textContent=sc.A.label;
  scenarioAText.textContent=sc.A.text;
  scenarioAButton.onclick=()=>{
    applyTimeCost(sc.A.time);
    applyMoneyCost(sc.A.money);
    for(const stat in sc.A.effects){
      applyStatChange(stat, sc.A.effects[stat]);
    }
    gameState.riskyTotal+=(sc.A.failBonus||0);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  
  scenarioBLabel.textContent=sc.B.label;
  scenarioBText.textContent=sc.B.text;
  scenarioBButton.onclick=()=>{
    applyTimeCost(sc.B.time);
    applyMoneyCost(sc.B.money);
    for(const stat in sc.B.effects){
      applyStatChange(stat, sc.B.effects[stat]);
    }
    gameState.riskyTotal+=(sc.B.failBonus||0);
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// Step
function finalizeStep(){
  if(!gameState.activeTask)return;
  applyTimeCost(5); // baseline
  gameState.activeTask.currentStep++;
  
  if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

// CAB
function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.15);
  fail = Math.max(0, Math.min(fail,1));
  gameState.finalFailChance= fail;
  
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Hurtige valg/fejl: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Skip dokumentation: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
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

function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent= "CAB: Godkendt!";
    // forklaring
    let explanation="";
    if(gameState.docSkipCount>0) explanation="... selv om du sprang noget dokumentation over.";
    cabResultText.textContent= "CAB accepterer. " + explanation;
    completeTaskCAB();
  } else {
    cabResultTitle.textContent= "CAB: Afvist!";
    let reason = "";
    if(gameState.docSkipCount>0) reason="CAB stoler ikke på dine manglende dokumentationer.";
    else if(gameState.riskyTotal>0.2) reason="CAB synes risikoen var alt for høj.";
    else reason="CAB har fundet for store problemer i forslaget.";
    cabResultText.textContent= reason;
    failTaskCAB();
  }
}

// fail
function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

// success
function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;
  const t=gameState.activeTask;
  let plus=5 + t.riskLevel*2;
  
  if(t.taskType==="security") applyStatChange("security", plus);
  else if(t.taskType==="development") applyStatChange("development", plus);
  else applyStatChange("stability", plus);
  
  gameState.totalRewards += t.baseReward;
  showPopup(`Opgave fuldført: +${plus} til ${t.taskType}, +${t.baseReward} kr belønning`,"success",4000);
  
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

// Når man vælger en opgave
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!","error");
    return;
  }
  const idx = gameState.availableTasks.findIndex(t=> t.id===taskId);
  if(idx===-1)return;
  const task= gameState.availableTasks[idx];
  // tid og penge kan være <0, så vi lader det køre
  
  // (Fjernet den “høj risiko popup” – bare forpligt med det samme)
  finalizeAssign(taskId, idx);
}

function finalizeAssign(taskId, idx){
  gameState.activeTask= gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent= gameState.activeTask.headline;
  activeTaskDesc.textContent= gameState.activeTask.description;
  updateStepsList();
  renderTasks();
}

// Render liste
function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement("li");
    if(t.riskLevel===3){li.style.borderColor="red";li.style.borderWidth="2px";}
    else if(t.riskLevel===2){li.style.borderColor="orange";}
    else {li.style.borderColor="green";}
    
    let priorityLabel = t.isHighPriority? " (HØJPRIORITET)" : "";
    let potentialGain = `+${5 + t.riskLevel*2} til ${t.taskType}`;
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn=document.createElement('button');
    commitBtn.classList.add('commit-button');
    commitBtn.textContent="Forpligt";
    commitBtn.addEventListener("click",(e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener("click",()=>{
      li.querySelectorAll(".task-description").forEach(d=>{
        d.style.display=(d.style.display==="none"?"block":"none");
      });
    });
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

// Tids- og pengelogik => Går i minus i stedet for at stoppe
function applyTimeCost(t){
  gameState.time -= t; 
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money -= m; 
  updateScoreboard();
}

// stats
function applyStatChange(stat,delta){
  gameState[stat]+= delta;
  if(gameState[stat]>150) gameState[stat]=150; 
  if(gameState[stat]<0) gameState[stat]=0; 
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

// popup
function showPopup(msg, type="success", duration=3000){
  const el=document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  // no more info style => we skip “info”
  el.style.animation="none";
  el.textContent=msg;
  document.getElementById("popup-container").appendChild(el);
  setTimeout(()=>el.remove(), duration);
}

// Float text
function showFloatingText(txt, stat){
  const c=document.getElementById('floating-text-container');
  const div=document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
  div.style.top="50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent=txt;
  c.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}

// Opgavegenerering
function generateTask(){
  // tid & money kan være negative => men vi genererer stadig opgaver
  if(gameState.availableTasks.length>=10) return;
  
  const categories=["stability","development","security"];
  const category=categories[Math.floor(Math.random()*categories.length)];
  const allowed= allowedLocationsForTask[category];
  
  const nonDocAllowed= allowed.filter(l=> l.toLowerCase()!=="dokumentation");
  const choices=[3,4,5,6,7];
  const weights=[0.1,0.1,0.4,0.3,0.1];
  let r=Math.random(), total=0, numSteps=3;
  for(let i=0;i<choices.length;i++){
    total+=weights[i];
    if(r<total){
      numSteps=choices[i];
      break;
    }
  }
  numSteps=Math.min(numSteps, nonDocAllowed.length);
  
  let steps=[];
  let copy= nonDocAllowed.slice();
  for(let i=0;i<numSteps;i++){
    let idx=Math.floor(Math.random()*copy.length);
    steps.push(copy.splice(idx,1)[0]);
  }
  // doc som sidste
  steps.push("dokumentation");
  
  let taskName="";
  if(category==="stability") taskName= pickUniqueName(stabilityTasks);
  else if(category==="development") taskName= pickUniqueName(devTasks);
  else taskName= pickUniqueName(secTasks);
  if(!taskName) return;
  
  const riskLevel=Math.floor(Math.random()*3)+1;
  const baseReward=riskLevel*80;
  
  const newTask={
    id: Date.now()+ Math.floor(Math.random()*1000),
    taskType: category,
    headline: taskName,
    description: getTaskDescription(category),
    steps: steps,
    currentStep:0,
    riskLevel,
    baseReward,
    isHighPriority: (riskLevel===3),
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function pickUniqueName(taskArray){
  const available=taskArray.filter(n=> !gameState.usedTasks.has(n));
  if(!available.length) return null;
  const name= available[Math.floor(Math.random()*available.length)];
  gameState.usedTasks.add(name);
  return name;
}

// Slut-spil
function endGame(){
  // Summér resultater
  const sumText=`
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilf.: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    Samlet belønning: ${gameState.totalRewards}
  `;
  endGameSummary.innerHTML=sumText;
  endModal.style.display="flex";
  
  // ryd aktiv opgave
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

function initGame(){
  updateScoreboard();
  for(let i=0;i<2;i++){
    generateTask();
  }
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

// Lokations-lister
const locationElements={
  "Infrastruktur": document.getElementById('infrastruktur'),
  "Informationssikkerhed": document.getElementById('informationssikkerhed'),
  "Hospital": document.getElementById('hospital'),
  "Leverandør": document.getElementById('leverandor'),
  "Medicinsk Udstyr": document.getElementById('medicinsk-udstyr'),
  "IT Jura": document.getElementById('it-jura'),
  "Cybersikkerhed": document.getElementById('cybersikkerhed'),
  "Dokumentation": document.getElementById('dokumentation')
};
Object.values(locationElements).forEach(el=>{
  el.addEventListener('click',()=>{ handleLocationClick(el.id); });
});

initGame();
