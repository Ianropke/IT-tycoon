/************************************************************
 * script.js
 * 1) Introduce money (start=1000).
 * 2) Not purely "risk vs safe" but time+money approach (table).
 * 3) CAB as a pop-up after last doc step -> final approval/fail chance.
 * 4) Each location logic is in a scenario table with new approach.
 ************************************************************/

// scoreboard references
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');

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
  // optional: location.reload();
});

// CAB pop-up
const cabModal           = document.getElementById('cab-modal');
const cabSummary         = document.getElementById('cab-summary');
const cabOkBtn           = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click',()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

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

  secNeglect:0,
  devNeglect:0,
  stabNeglect:0,
  docSkipCount:0,

  // used to store "CAB fail chance" or partial info
  finalFailChance:0
};

document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// All location references
const locations={
  Infrastruktur:        document.getElementById('infrastruktur'),
  Informationssikkerhed:document.getElementById('informationssikkerhed'),
  Hospital:            document.getElementById('hospital'),
  Leverandør:          document.getElementById('leverandor'),
  'Medicinsk Udstyr':  document.getElementById('medicinsk-udstyr'),
  'IT Jura':           document.getElementById('it-jura'),
  Cybersikkerhed:      document.getElementById('cybersikkerhed'),
  Dokumentation:       document.getElementById('dokumentation')
};

// Add event listeners for location clicks
Object.entries(locations).forEach(([locName, el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(locName);
  });
});

// revised scenario table
// A vs B, with time and money cost
const locationScenarios={
  "Hospital": {
    question:"(Hospital) Minimal Udvikling vs Udvidet Udvikling",
    A: { text:"Minimal (+2 tid, -50 penge, +1 Stabilitet, +1 Hospital)", effect:()=>{
      applyTimeCost(2); applyMoneyCost(50);
      applyStatChange("stability",+1);
      applyStatChange("hospitalSatisfaction",+1);
    }, failBonus:0 }, 
    B: { text:"Udvidet (+5 tid, -150 penge, +3 Hospital, +2 Udvikling, +5% fail)", effect:()=>{
      applyTimeCost(5); applyMoneyCost(150);
      applyStatChange("hospitalSatisfaction",+3);
      applyStatChange("development",+2);
    }, failBonus:0.05 }
  },
  "IT Jura": {
    question:"(IT Jura) Grundig Kontrakt vs Minimal Kontrakt",
    A: { text:"+4 tid, -150 penge, +2 Sikkerhed, +1 Stabilitet", effect:()=>{
      applyTimeCost(4); applyMoneyCost(150);
      applyStatChange("security",+2);
      applyStatChange("stability",+1);
    }, failBonus:0 },
    B: { text:"+1 tid, -0 penge, +1 Udvikling (men +10% fail)", effect:()=>{
      applyTimeCost(1);
      applyStatChange("development",+1);
    }, failBonus:0.10 }
  },
  "Leverandør": {
    question:"(Leverandør) Kvalitetssikring vs Hurtig leverance",
    A: { text:"+6 tid, -200 penge, +2 Stabilitet, +1 Sikkerhed", effect:()=>{
      applyTimeCost(6); applyMoneyCost(200);
      applyStatChange("stability",+2);
      applyStatChange("security",+1);
    }, failBonus:0 },
    B: { text:"+2 tid, -50 penge, +1 Stabilitet, +10% fail", effect:()=>{
      applyTimeCost(2); applyMoneyCost(50);
      applyStatChange("stability",+1);
    }, failBonus:0.10 }
  },
  "Infrastruktur": {
    question:"(Infrastruktur) Stor Opgradering vs Minimal Patch",
    A: { text:"+5 tid, -200 penge, +2 Stabilitet, +2 Udvikling", effect:()=>{
      applyTimeCost(5); applyMoneyCost(200);
      applyStatChange("stability",+2);
      applyStatChange("development",+2);
    }, failBonus:0 },
    B: { text:"+1 tid, -50 penge, +1 Stabilitet, +5% fail", effect:()=>{
      applyTimeCost(1); applyMoneyCost(50);
      applyStatChange("stability",+1);
    }, failBonus:0.05 }
  },
  "Informationssikkerhed": {
    question:"(InfoSikkerhed) Ekstra Overvågning vs Basal",
    A: { text:"+4 tid, -60 penge, +2 Sikkerhed, +1 Stabilitet", effect:()=>{
      applyTimeCost(4); applyMoneyCost(60);
      applyStatChange("security",+2);
      applyStatChange("stability",+1);
    }, failBonus:0 },
    B: { text:"+2 tid, 0 penge, +1 Sikkerhed, +10% fail", effect:()=>{
      applyTimeCost(2);
      applyStatChange("security",+1);
    }, failBonus:0.10 }
  },
  "Medicinsk Udstyr": {
    question:"(Medicinsk) Grundig Vedligehold vs Hurtig Fix",
    A: { text:"+4 tid, -120 penge, +2 Stabilitet, +1 Sikkerhed", effect:()=>{
      applyTimeCost(4); applyMoneyCost(120);
      applyStatChange("stability",+2);
      applyStatChange("security",+1);
    }, failBonus:0 },
    B: { text:"+1 tid, -20 penge, +1 Stabilitet, +10% fail", effect:()=>{
      applyTimeCost(1); applyMoneyCost(20);
      applyStatChange("stability",+1);
    }, failBonus:0.10 }
  },
  "Cybersikkerhed": {
    question:"(Cyber) Dyb scanning vs Overfladisk Check",
    A: { text:"+4 tid, -80 penge, +2 Sikkerhed, +1 Stabilitet", effect:()=>{
      applyTimeCost(4); applyMoneyCost(80);
      applyStatChange("security",+2);
      applyStatChange("stability",+1);
    }, failBonus:0 },
    B: { text:"+2 tid, -30 penge, +1 Sikkerhed, +10% fail", effect:()=>{
      applyTimeCost(2); applyMoneyCost(30);
      applyStatChange("security",+1);
    }, failBonus:0.10 }
  },
  "Dokumentation": {
    question:"(Dokumentation) Du kan springe over for at spare tid/penge, men +15% fail",
    A: { text:"+3 tid, -10 penge (ingen fail)", effect:()=>{
      applyTimeCost(3); applyMoneyCost(10);
      // do nothing else
    }, failBonus:0 },
    B: { text:"Skip doc => +15% fail", effect:()=>{
      gameState.docSkipCount++;
    }, failBonus:0.15 }
  }
};

const stepsPool={
  // ensure last step is "Dokumentation" or skip => then final CAB pop-up
  // in this snippet, we do doc as second last physically. Then we pop the CAB modal
  // instead of physically stepping to 'CAB'
  stability:[
    ["Hospital","Infrastruktur","Dokumentation"],
    ["Hospital","Leverandør","Infrastruktur","Dokumentation"]
  ],
  development:[
    ["Hospital","Leverandør","IT Jura","Dokumentation"],
    ["Hospital","Informationssikkerhed","Dokumentation"]
  ],
  security:[
    ["Cybersikkerhed","IT Jura","Dokumentation"],
    ["Informationssikkerhed","Cybersikkerhed","Hospital","Dokumentation"]
  ]
};

const headlines=["Netværkstjek","Systemoptimering","Sikkerhedspatch","Brugerstyring","Migrering"];
const descs={
  stability:"(Stabilitetsopgave) Mindre nedetid",
  development:"(Udviklingsopgave) Nye features",
  security:"(Sikkerhedsopgave) Beskyt systemet"
};

function handleLocationClick(locName){
  if(!gameState.activeTask)return;
  if(gameState.time<=0)return;

  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length)return;

  const needed=gameState.activeTask.steps[i];
  if(locName!==needed){
    // if doc step but user wants skip => ...
    if(needed==="Dokumentation"){
      skipDocumentation();
    }
    return;
  }

  // doc or normal scenario
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[i])return;
  gameState.activeTask.decisionMadeForStep[i]=true;

  if(locName==="Dokumentation"){
    showScenarioPopup("Dokumentation");
    return;
  }
  showScenarioPopup(locName);
}

function skipDocumentation(){
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <strong>Spring Dokumentation over?</strong><br/>
    +15% fail i CAB.<br/>
    <button id="skipYes">Ja, skip</button>
    <button id="skipNo">Nej</button>
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

function showScenarioPopup(locName){
  const sc=locationScenarios[locName];
  if(!sc){
    fallbackPopup(locName);
    return;
  }
  const i=gameState.activeTask.currentStep;
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <strong>${locName}</strong><br/>
    ${sc.question}<br/><br/>
    (A) ${sc.A.text}<br/>
    (B) ${sc.B.text}
    <br/><br/>
    <button id="btnA">A</button>
    <button id="btnB">B</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('btnA').addEventListener('click',()=>{
    sc.A.effect();
    // store fail bonus if any
    applyFailBonus(sc.A.failBonus||0);
    pop.remove();
    finalizeStep();
  });
  document.getElementById('btnB').addEventListener('click',()=>{
    sc.B.effect();
    applyFailBonus(sc.B.failBonus||0);
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
    (A) +2 Stabilitet, -50 Penge <br/>
    (B) +1 Sikkerhed, -0 Penge, +10% fail
    <br/><br/>
    <button id="fa">A</button>
    <button id="fb">B</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('fa').addEventListener('click',()=>{
    applyTimeCost(2);
    applyMoneyCost(50);
    applyStatChange("stability",+2);
    pop.remove();
    applyFailBonus(0);
    finalizeStep();
  });
  document.getElementById('fb').addEventListener('click',()=>{
    applyStatChange("security",+1);
    // no money cost
    pop.remove();
    applyFailBonus(0.10);
    finalizeStep();
  });
}

function applyFailBonus(bonus){
  // store in activeTask or a global place
  // let's store in activeTask
  if(!gameState.activeTask.failSoFar) gameState.activeTask.failSoFar=0;
  gameState.activeTask.failSoFar+=bonus;
}

function finalizeStep(){
  if(!gameState.activeTask)return;

  // each step cost e.g. 5 time
  applyTimeCost(5);

  const i=gameState.activeTask.currentStep+1;
  const totalSteps=gameState.activeTask.steps.length;
  gameState.activeTask.currentStep++;

  if(gameState.time<=0){
    endGame();
    return;
  }
  if(gameState.activeTask.currentStep>=totalSteps){
    // done => open CAB pop-up
    showCABModal();
  } else {
    updateStepsList();
  }
}

function showCABModal(){
  // build summary of steps
  let docSkips=gameState.docSkipCount;
  let failSoFar=(gameState.activeTask.failSoFar||0);
  // base fail = 0. Let's do doc skip => +0.15 each skip
  // final chance= failSoFar + docSkips*0.15
  let totalFail=failSoFar + docSkips*0.15;
  // clamp e.g. 0..1
  totalFail=Math.min(Math.max(totalFail,0),1);

  gameState.finalFailChance=totalFail;

  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Godkendelse</strong><br/>
    Du har foretaget valg med en ekstra fejlchance på ${(failSoFar*100).toFixed(0)}% <br/>
    Du har sprunget Dokumentation over ${docSkips} gange (15% per skip).<br/>
    Samlet risiko for fejl = ${ (totalFail*100).toFixed(0) }%
    <br/><br/>
    Klik "Færdiggør" for at se om opgaven godkendes.
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  // roll random
  let failChance=gameState.finalFailChance||0;
  if(Math.random()<failChance){
    // fail
    showPopup("CAB Afviser! Pga. for stor risiko/ingen doc!", "error",4000);
    failTaskCAB();
  } else {
    // success
    completeTaskCAB();
  }
}

function failTaskCAB(){
  // treat as a fail => no belønning, maybe - hospitalSatisfaction
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  showPopup("Hospital utilfreds: -10 Hospitalstilfredshed", "error");

  // clear active task
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB(){
  showPopup("CAB Godkender! Opgave Fuldført!", "success",4000);
  gameState.tasksCompleted++;

  const t=gameState.activeTask;
  if(!t)return;

  // final reward
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

// apply money
function applyMoneyCost(amount){
  gameState.money=Math.max(gameState.money-amount,0);
  updateScoreboard();
}
function applyTimeCost(t){
  gameState.time=Math.max(gameState.time-t,0);
  updateScoreboard();
}

// apply stat changes
function applyStatChange(stat,delta){
  gameState[stat]=Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}

function showFloatingText(txt, stat){
  const ctn=document.getElementById('floating-text-container');
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
  ctn.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}

// Task generation
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
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain} (CAB-check)
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

  // if high risk => confirm
  if(t.riskLevel===3){
    const pop=document.createElement('div');
    pop.classList.add('popup','info');
    pop.style.animation="none";
    pop.innerHTML=`
      <strong>Høj Risiko</strong><br/>
      Større belønning men større fejlchance ved CAB.<br/>
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
    let done=(i<gameState.activeTask.currentStep);
    li.textContent=`Trin ${i+1}: [${locName}]`;
    if(done){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function updateScoreboard(){
  scoreboard.tasksCompleted.textContent=gameState.tasksCompleted;
  scoreboard.totalRewards.textContent=gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent=gameState.hospitalSatisfaction;

  timeLeftEl.textContent=gameState.time;
  moneyLeftEl.textContent=gameState.money;
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
  setTimeout(()=>el.remove(),duration);
}

function initGame(){
  updateScoreboard();
  // generate some tasks
  for(let i=0;i<2;i++){
    generateTask();
  }
  // tasks appear over time
  setInterval(()=>{
    if(gameState.time>0 && gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

initGame();
