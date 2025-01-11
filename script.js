/************************************************************
 * script.js
 * 1) Icons triple size in CSS (loc-icon)
 * 2) Scenario pop-up is now #scenario-modal (a modal) for consistent UI
 * 3) If skip doc => counts as completed step
 * 4) Reverted Infosec => Informationssikkerhed, CyberScan => Cybersikkerhed
 * 5) Each location has a different color background
 ************************************************************/

// scoreboard
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

// scenario modal references
const scenarioModal        = document.getElementById('scenario-modal');
const scenarioModalContent = document.getElementById('scenario-modal-content');
const scenarioTitle        = document.getElementById('scenario-title');
const scenarioDescription  = document.getElementById('scenario-description');
const scenarioALabel       = document.getElementById('scenario-a-label');
const scenarioAText        = document.getElementById('scenario-a-text');
const scenarioAButton      = document.getElementById('scenario-a-btn');
const scenarioBLabel       = document.getElementById('scenario-b-label');
const scenarioBText        = document.getElementById('scenario-b-text');
const scenarioBButton      = document.getElementById('scenario-b-btn');

const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

// End time
const endModal           = document.getElementById('end-modal');
const endGameSummary     = document.getElementById('end-game-summary');
const endOkBtn           = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click',()=>{
  endModal.style.display="none";
});

// CAB
const cabModal        = document.getElementById('cab-modal');
const cabSummary      = document.getElementById('cab-summary');
const cabOkBtn        = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click',()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

// CAB result
const cabResultModal  = document.getElementById('cab-result-modal');
const cabResultTitle  = document.getElementById('cab-result-title');
const cabResultText   = document.getElementById('cab-result-text');
const cabResultOkBtn  = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click',()=>{
  cabResultModal.style.display="none";
});

document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// game state
let gameState = {
  time: 100,
  money: 1000,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,

  tasksCompleted: 0,
  totalRewards: 0,

  activeTask: null,
  availableTasks: [],
  introModalOpen: true,

  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0
};

function updateScoreboard(){
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  scoreboard.tasksCompleted.textContent     = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent       = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent    = gameState.security;
  stabilityValueEl.textContent   = gameState.stability;
  developmentValueEl.textContent = gameState.development;
}

// location references
const locations={
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  Leverandør: document.getElementById('leverandor'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  'IT Jura': document.getElementById('it-jura'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
  Dokumentation: document.getElementById('dokumentation')
};

Object.entries(locations).forEach(([locName, el])=>{
  el.addEventListener('click', ()=>{
    handleLocationClick(locName);
  });
});

// minimal scenario data
const locationScenarios={
  "Hospital":{
    bigTitle:"Hospital (MediLog)",
    description:"Flere features i LIMS. Enten lidt forbedring eller stor udvidelse.",
    A:{
      label:"Minimal Udvikling",
      text:"Brug 2 tid, -50 kr => +1 Stabilitet, +1 Hospitalstilfredshed",
      effect:()=>{
        applyTimeCost(2); applyMoneyCost(50);
        applyStatChange("stability", +1);
        applyStatChange("hospitalSatisfaction", +1);
      },
      failBonus:0
    },
    B:{
      label:"Udvidet Udvikling",
      text:"Brug 5 tid, -150 kr => +3 Hospital, +2 Udvikling, +5% fejlchance",
      effect:()=>{
        applyTimeCost(5); applyMoneyCost(150);
        applyStatChange("hospitalSatisfaction", +3);
        applyStatChange("development", +2);
      },
      failBonus:0.05
    }
  },
  "Dokumentation":{
    bigTitle:"Dokumentation",
    description:"Valgfrit at dokumentere alle ændringer. Uden doc => CAB-skepsis.",
    A:{
      label:"Lav Dokumentation",
      text:"+3 tid, -10 kr => ingen ekstra fejlchance",
      effect:()=>{
        applyTimeCost(3); applyMoneyCost(10);
      },
      failBonus:0
    },
    B:{
      label:"Spring Doc Over",
      text:"Spar tid/pnge => +15% fejlchance i CAB",
      effect:()=>{
        gameState.docSkipCount++;
      },
      failBonus:0.15
    }
  }
};

// step pool
const stepsPool={
  stability:[
    ["Hospital","Infrastruktur","Dokumentation"]
  ],
  development:[
    ["Hospital","Informationssikkerhed","Dokumentation"]
  ],
  security:[
    ["Cybersikkerhed","Hospital","Dokumentation"]
  ]
};

// sample headlines
const headlines=["MediLog Opgradering","DataOps Patch","Ekstern Vendortjek"];
const descs={
  stability:"(Stabilitetsopgave) Mindre nedetid",
  development:"(Udviklingsopgave) Nye features",
  security:"(Sikkerhedsopgave) Sikkerhedshuller"
};

// main
function handleLocationClick(locName){
  if(!gameState.activeTask) return;
  if(gameState.time<=0) return;

  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length) return;

  const needed=gameState.activeTask.steps[i];
  if(locName!==needed){
    // if doc step but user wants skip => finalize anyway
    if(needed==="Dokumentation"){
      skipDocumentation();
    }
    return;
  }
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[i]) return;
  gameState.activeTask.decisionMadeForStep[i]=true;

  showScenarioModal(locName);
}

function skipDocumentation(){
  // user wants to skip doc => just finalize step
  gameState.docSkipCount++;
  finalizeStep();
}

// scenario modal
function showScenarioModal(locName){
  const sc=locationScenarios[locName];
  // open scenario-modal for consistent UI
  scenarioModal.style.display="flex";

  if(!sc){
    // fallback
    scenarioTitle.textContent=locName;
    scenarioDescription.textContent="(Standard scenarie)";
    scenarioALabel.textContent="Mulighed A (standard)";
    scenarioAText.textContent="Giver +2 Stabilitet, -50 kr";
    scenarioAButton.onclick = ()=>{
      applyTimeCost(2); applyMoneyCost(50);
      scenarioModal.style.display="none";
      finalizeStep();
    };

    scenarioBLabel.textContent="Mulighed B (hurtig)";
    scenarioBText.textContent="Billigere, men 10% fejlchance";
    scenarioBButton.onclick = ()=>{
      gameState.riskyTotal+=0.10;
      scenarioModal.style.display="none";
      finalizeStep();
    };
  } else {
    scenarioTitle.textContent= sc.bigTitle;
    scenarioDescription.textContent= sc.description;
    scenarioALabel.textContent= sc.A.label;
    scenarioAText.textContent= sc.A.text;
    scenarioAButton.onclick=()=>{
      sc.A.effect();
      gameState.riskyTotal += (sc.A.failBonus||0);
      scenarioModal.style.display="none";
      finalizeStep();
    };

    scenarioBLabel.textContent= sc.B.label;
    scenarioBText.textContent= sc.B.text;
    scenarioBButton.onclick=()=>{
      sc.B.effect();
      gameState.riskyTotal += (sc.B.failBonus||0);
      scenarioModal.style.display="none";
      finalizeStep();
    };
  }
}

function finalizeStep(){
  if(!gameState.activeTask) return;
  applyTimeCost(5); // each step cost 5 time
  gameState.activeTask.currentStep++;
  if(gameState.time<=0){
    endGame();
    return;
  }
  if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

function showCABModal(){
  let fail=gameState.riskyTotal + (gameState.docSkipCount*0.15);
  if(fail>1)fail=1;if(fail<0)fail=0;
  gameState.finalFailChance=fail;

  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Hurtige/billige valg: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Doc skip: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  if(Math.random()<gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="CAB accepterer dine ændringer. Opgaven fuldføres.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For høj risiko eller manglende dokumentation. Opgaven fejler.";
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

function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;
  const t=gameState.activeTask;
  let plus=(5+t.riskLevel*2);
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

  gameState.totalRewards += t.baseReward;
  summary+=`, +${t.baseReward} belønning`;

  showPopup(`Opgave fuldført: ${summary}`, "success",4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  updateScoreboard();
}

function applyTimeCost(t){
  gameState.time = Math.max(gameState.time-t,0);
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money = Math.max(gameState.money-m,0);
  updateScoreboard();
}

function applyStatChange(stat, delta){
  gameState[stat] = Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

function showFloatingText(txt, stat){
  const c=document.getElementById('floating-text-container');
  const div=document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%"; 
  div.style.top="50%";

  if(stat==="security")              div.style.color="#ff4444";
  else if(stat==="stability")       div.style.color="#44ff44";
  else if(stat==="development")     div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else                              div.style.color="#ffffff";

  div.textContent=txt;
  c.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}

// tasks
function generateTask(){
  if(gameState.time<=0)return; 
  if(gameState.availableTasks.length>=10)return;

  const r=Math.random();
  let type='stability';
  if(r<0.33) type='stability';
  else if(r<0.66) type='development';
  else type='security';

  const stepArr = stepsPool[type][0]; 
  // or random from the array if you had more options
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
    isHighPriority:(riskLevel===3),
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
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain}
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

function endGame(){
  showPopup("Tiden er gået!", "info",3000);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  endModal.style.display="flex";
  const sumText=`
    <strong>Slutresultat:</strong><br/>
    Penge tilbage: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilfredshed: ${gameState.hospitalSatisfaction}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    Samlet belønning: ${gameState.totalRewards}
  `;
  endGameSummary.innerHTML=sumText;
}

function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
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
      Stor belønning men større fejlchance i CAB.<br/>
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
      renderTasks();
    });
  } else {
    finalizeAssign(taskId, idx);
  }
}

function finalizeAssign(taskId, idx){
  gameState.activeTask= gameState.availableTasks.splice(idx,1)[0];
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
    let done=(i<gameState.activeTask.currentStep);
    li.textContent=`Trin ${i+1}: [${locName}]`;
    if(done){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function showPopup(msg, type="success", duration=3000){
  const el=document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  else if(type==="info") el.classList.add('info');
  el.style.animation="none";
  el.textContent=msg;
  document.getElementById("popup-container").appendChild(el);
  setTimeout(()=>el.remove(), duration);
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
