/************************************************************
 * script.js
 * 1) New location: CAB (final step) for summary/approval
 * 2) New location: Dokumentation (optional, skipping raises fail chance)
 * 3) Time-limited approach (100 time). Each step costs 5 time
 ************************************************************/

const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards:   document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

// end-of-time modal references
const endModal           = document.getElementById('end-modal');
const endGameSummary     = document.getElementById('end-game-summary');
const endOkBtn           = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click',()=>{
  endModal.style.display="none";
  // optionally reload
  // location.reload();
});

// The main state
let gameState={
  time:100,
  security:100,
  stability:100,
  development:100,
  hospitalSatisfaction:100,

  tasksCompleted:0,
  totalRewards:0,

  activeTask:null,
  availableTasks:[],
  introModalOpen:true,

  secNeglect:0,
  devNeglect:0,
  stabNeglect:0,

  docSkipCount:0 // (2) track how many times user skipped Documentation
};

document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// All location references (added CAB, Dokumentation)
const locations={
  Infrastruktur:        document.getElementById('infrastruktur'),
  Informationssikkerhed:document.getElementById('informationssikkerhed'),
  Hospital:            document.getElementById('hospital'),
  Leverandør:          document.getElementById('leverandor'),
  'Medicinsk Udstyr':  document.getElementById('medicinsk-udstyr'),
  'IT Jura':           document.getElementById('it-jura'),
  Cybersikkerhed:      document.getElementById('cybersikkerhed'),
  // new:
  CAB:                 document.getElementById('cab'),
  Dokumentation:       document.getElementById('dokumentation'),
};

// point-and-click
Object.entries(locations).forEach(([locName, el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(locName);
  });
});

// location scenario examples (the rest as before)
const locationScenarios={
  "Hospital":{
    question:"Hospitalets krav: Sikker men dyr, eller hurtig men mindre sikker?",
    safeTxt:"+2 Sikkerhed, -1 Hospitalstilfredshed",
    riskTxt:"+2 Udvikling, -2 Sikkerhed",
    safeFn:()=>{
      applyStatChange("security",+2);
      applyStatChange("hospitalSatisfaction",-1);
    },
    riskFn:()=>{
      applyStatChange("development",+2);
      applyStatChange("security",-2);
    }
  },
  // ...
  "Dokumentation":{
    question:"Vil du dokumentere? (Hvis du springer over, øges fejlchance)",
    safeTxt:"+0 men ingen øget fejlchance (koster tid)",
    riskTxt:"Spring over → +1 skip (større fejlchance)",
    safeFn:()=>{ /* do nothing but cost time*/ },
    riskFn:()=>{
      gameState.docSkipCount++;
    }
  },
  "CAB":{
    // final step
    question:"CAB Approval: Her afgøres om opgaven lykkedes eller fejlede",
    safeTxt:"(Automatisk check) ",
    riskTxt:"",
    safeFn:()=>{/* We'll handle logic in finalizeCAB() */},
    riskFn:()=>{/* not used */}
  }
};

// step pool
// we ensure the last steps always contain "Dokumentation" (optional) and "CAB"
const stepsPool={
  stability:[
    // user might do [Hospital, Infrastruktur, Dokumentation, CAB]
    ["Hospital","Infrastruktur","Dokumentation","CAB"],
    ["Hospital","Leverandør","Infrastruktur","Dokumentation","CAB"]
  ],
  development:[
    ["Hospital","Leverandør","IT Jura","Dokumentation","CAB"],
    ["Hospital","Informationssikkerhed","Dokumentation","CAB"]
  ],
  security:[
    ["Cybersikkerhed","IT Jura","Dokumentation","CAB"],
    ["Informationssikkerhed","Cybersikkerhed","Hospital","Dokumentation","CAB"]
  ]
};

const headlines=["Netværkstjek","Systemoptimering","Sikkerhedspatch","Brugerstyring","Migrering"];
const descs={
  stability:"(Stabilitetsopgave) Mindre nedetid.",
  development:"(Udviklingsopgave) Nye features, men koster ressourcer",
  security:"(Sikkerhedsopgave) Beskyt systemet, men skaber bureaukrati"
};

function handleLocationClick(locName){
  if(!gameState.activeTask) return;
  if(gameState.time<=0) return;

  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length) return;
  const needed=gameState.activeTask.steps[i];

  // (2) If the needed step is "Dokumentation" and user wants to skip:
  // We'll do a special logic if user "skips".
  if(needed==="Dokumentation" && locName==="Dokumentation"){
    // They actually do the doc step (cost time).
    // scenario logic
  }

  if(locName!==needed){
    // If user is on "Dokumentation" step but doesn't want to do it,
    // we can pop a skip confirm
    if(needed==="Dokumentation"){
      skipDocumentation();
    }
    return;
  }
  // else proceed
  if(!gameState.activeTask.decisionMadeForStep) 
    gameState.activeTask.decisionMadeForStep={};
  if(gameState.activeTask.decisionMadeForStep[i]) return;
  gameState.activeTask.decisionMadeForStep[i]=true;

  if(locName==="CAB"){
    // final check
    finalizeCAB();
    return;
  }
  showScenarioPopup(locName);
}

function skipDocumentation(){
  // user chooses to skip doc => docSkipCount++ => finalize step
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <strong>Spring Dokumentation over?</strong><br/>
    Dette vil øge fejlchancen ved CAB!<br/>
    <button id="skipYes">Ja, skip</button>
    <button id="skipNo">Nej, gå alligevel</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('skipYes').addEventListener('click',()=>{
    pop.remove();
    gameState.docSkipCount++;
    finalizeStep(); 
  });
  document.getElementById('skipNo').addEventListener('click',()=>{
    pop.remove();
    // do nothing
  });
}

function finalizeCAB(){
  // user arrived at CAB => check docSkips => fail chance
  // docSkips => each skip adds e.g. +15% fail chance
  let failChance=0;
  if(gameState.docSkipCount>0){
    failChance=gameState.docSkipCount*0.15; // 15% * docSkipCount
  }
  // also factor risk?
  let totalFailChance=failChance;
  // e.g. if risk=3 => + 20% 
  const rlv=gameState.activeTask.riskLevel||1;
  totalFailChance += (rlv===3?0.2:(rlv===2?0.1:0));
  // draw random
  if(Math.random()<totalFailChance){
    // fail
    showPopup("CAB siger NEJ! Pga. manglende Dokumentation / risici!", "error",4000);
    failTaskCAB();
  } else {
    // success
    showPopup("CAB godkender! Opgave fuldført!", "success",4000);
    finalizeStep(); // last step
  }
}

function failTaskCAB(){
  gameState.activeTask=null;
  gameState.tasksCompleted++;
  // reduce e.g. some stats
  applyStatChange("hospitalSatisfaction",-10);
  showPopup("Hospital utilfreds pga. fejlet godkendelse. -10 Hospitalstilfredshed.", "error");

  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function showScenarioPopup(locName){
  const sc=locationScenarios[locName];
  if(!sc){
    fallbackPopup(locName);
    return;
  }
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <strong>${locName}</strong><br/>
    ${sc.question}<br/><br/>
    (A) ${sc.safeTxt}<br/>
    (B) ${sc.riskTxt}
    <br/><br/>
    <button id="btnA">A</button>
    <button id="btnB">B</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('btnA').addEventListener('click',()=>{
    sc.safeFn();
    pop.remove();
    finalizeStep();
  });
  document.getElementById('btnB').addEventListener('click',()=>{
    sc.riskFn();
    pop.remove();
    finalizeStep();
  });
}

function fallbackPopup(locName){
  // generic
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <strong>${locName}</strong><br/>
    (A) +1 Stabilitet, -1 Belønning<br/>
    (B) +2 Udvikling, -2 Sikkerhed
    <br/><br/>
    <button id="fa">A</button>
    <button id="fb">B</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('fa').addEventListener('click',()=>{
    applyStatChange("stability",+1);
    gameState.totalRewards=Math.max(gameState.totalRewards-1,0);
    updateScoreboard();
    pop.remove();
    finalizeStep();
  });
  document.getElementById('fb').addEventListener('click',()=>{
    applyStatChange("development",+2);
    applyStatChange("security",-2);
    pop.remove();
    finalizeStep();
  });
}

function finalizeStep(){
  if(!gameState.activeTask)return;

  // each step costs 5 time
  gameState.time=Math.max(gameState.time-5,0);
  timeLeftEl.textContent=gameState.time;
  if(gameState.time<=0){
    endGame();
    return;
  }

  gameState.activeTask.currentStep++;
  if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
    // done
    completeTask();
  } else {
    updateStepsList();
  }
}

function endGame(){
  showPopup("Tiden er gået!", "info",3000);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  document.getElementById('end-modal').style.display="flex";
  const sumText=`
    <strong>Slutresultat:</strong><br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilfredshed: ${gameState.hospitalSatisfaction}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    Samlet belønning: ${gameState.totalRewards}
  `;
  document.getElementById('end-game-summary').innerHTML=sumText;
}

// apply stat changes
function applyStatChange(stat, delta){
  gameState[stat]=Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

// floating text
function showFloatingText(txt, stat){
  const ctn=document.getElementById('floating-text-container');
  const div=document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
  div.style.top="50%";

  if(stat==="security")          div.style.color="#ff4444";
  else if(stat==="stability")   div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else                          div.style.color="#ffffff";

  div.textContent=txt;
  ctn.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}

// tasks logic
function generateTask(){
  if(gameState.time<=0) return; 
  if(gameState.availableTasks.length>=10)return;

  const r=Math.random();
  let type='stability';
  if(r<0.33)      type='stability';
  else if(r<0.66) type='development';
  else            type='security';

  const stepArr=stepsPool[type][Math.floor(Math.random()*stepsPool[type].length)];
  const riskLevel=Math.floor(Math.random()*3)+1;
  const baseReward=riskLevel*80;
  const head=headlines[Math.floor(Math.random()*headlines.length)];

  const newTask={
    id: Date.now()+Math.floor(Math.random()*1000),
    taskType: type,
    headline: head,
    description: descs[type],
    steps: stepArr,
    currentStep: 0,
    riskLevel,
    baseReward,
    isHighPriority: (riskLevel===3),
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
    const li=document.createElement("li");

    if(t.riskLevel===3){
      li.style.borderColor="red"; 
      li.style.borderWidth="2px";
    } else if(t.riskLevel===2){
      li.style.borderColor="orange";
    } else {
      li.style.borderColor="green";
    }

    let priorityLabel=t.isHighPriority?" (HØJPRIORITET)":"";
    let potentialGain=`+${5 + t.riskLevel*2} til ${t.taskType}`;
    let failTxt=`(Risiko for fiasko ved CAB)`;

    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain} ${failTxt}
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

function skipHighPriority(task){
  if(!task.isHighPriority)return;
  if(task.taskType==="security")       gameState.secNeglect++;
  else if(task.taskType==="development") gameState.devNeglect++;
  else                                 gameState.stabNeglect++;
  checkNeglectPenalties();
}
function checkNeglectPenalties(){
  if(gameState.secNeglect>=3){
    showPopup("Ignorerede for mange Sikkerhedsopgaver! -5 Sikkerhed","error");
    applyStatChange("security",-5);
    gameState.secNeglect=0;
  }
  if(gameState.devNeglect>=3){
    showPopup("Ignorerede for mange Udviklingsopgaver! -5 Udvikling","error");
    applyStatChange("development",-5);
    gameState.devNeglect=0;
  }
  if(gameState.stabNeglect>=3){
    showPopup("Ignorerede for mange Stabilitetsopgaver! -5 Stabilitet","error");
    applyStatChange("stability",-5);
    gameState.stabNeglect=0;
  }
}

function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!","error");
    return;
  }
  if(gameState.time<=0){
    endGame();
    return;
  }
  const idx=gameState.availableTasks.findIndex(x=>x.id===taskId);
  if(idx===-1)return;
  const t=gameState.availableTasks[idx];

  if(t.riskLevel===3){
    const pop=document.createElement('div');
    pop.classList.add('popup','info');
    pop.style.animation="none";
    pop.innerHTML=`
      <strong>Høj Risiko</strong><br/>
      Stor belønning men fejlchance forstørres ved CAB.<br/>
      <button id="hrYes">Fortsæt</button>
      <button id="hrNo">Fortryd</button>
    `;
    document.getElementById('popup-container').appendChild(pop);

    document.getElementById('hrYes').addEventListener('click',()=>{
      pop.remove();
      finalizeAssign(taskId, idx);
    });
    document.getElementById('hrNo').addEventListener('click',()=>{
      pop.remove();
      gameState.availableTasks.splice(idx,1);
      skipHighPriority(t);
      renderTasks();
    });
  } else {
    finalizeAssign(taskId, idx);
  }
}
function finalizeAssign(taskId, idx){
  gameState.activeTask=gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent=gameState.activeTask.headline;
  activeTaskDesc.textContent=gameState.activeTask.description;
  updateStepsList();
  renderTasks();
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li=document.createElement("li");
    const done=(i<gameState.activeTask.currentStep);
    li.textContent=`Trin ${i+1}: [${locName}]`;
    if(done){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function completeTask(){
  showPopup("Alle trin (inkl. CAB) fuldført!", "success",4000);
  gameState.tasksCompleted++;

  const t=gameState.activeTask;
  let plus=(5 + t.riskLevel*2);
  let summary="";
  if(t.taskType==="security"){
    applyStatChange("security",plus);
    summary=`+${plus} Sikkerhed`;
  } else if(t.taskType==="development"){
    applyStatChange("development",plus);
    summary=`+${plus} Udvikling`;
  } else {
    applyStatChange("stability",plus);
    summary=`+${plus} Stabilitet`;
  }

  gameState.totalRewards+=t.baseReward;
  summary+=`, +${t.baseReward} belønning`;

  const sumPop=document.createElement('div');
  sumPop.classList.add('popup');
  sumPop.style.animation="none";
  sumPop.textContent=`Opsummering: ${summary}`;
  document.getElementById('popup-container').appendChild(sumPop);
  setTimeout(()=>sumPop.remove(),4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  updateScoreboard();
}

function updateScoreboard(){
  scoreboard.tasksCompleted.textContent=gameState.tasksCompleted;
  scoreboard.totalRewards.textContent=gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent=gameState.hospitalSatisfaction;

  timeLeftEl.textContent=gameState.time;
  securityValueEl.textContent=gameState.security;
  stabilityValueEl.textContent=gameState.stability;
  developmentValueEl.textContent=gameState.development;
}

function showPopup(msg,type="success",duration=3000){
  const el=document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  else if(type==="info") el.classList.add('info');
  el.style.animation="none";
  el.textContent=msg;
  document.getElementById("popup-container").appendChild(el);
  setTimeout(()=> el.remove(), duration);
}

function initGame(){
  updateScoreboard();
  for(let i=0;i<2;i++){
    generateTask();
  }
  setInterval(()=>{
    if(gameState.time>0 && gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

initGame();
