/***********************************************************
 * script.js
 * 1) Negative consequences for safe/risky approach
 * 2) Reduced spacing under "Aktiv Opgave"
 * 3) High-risk fail => must do extra fix tasks
 * 4) Consistent language (Belønning)
 ***********************************************************/

// scoreboard references
const securityValueEl     = document.getElementById('security-value');
const stabilityValueEl    = document.getElementById('stability-value');
const developmentValueEl  = document.getElementById('development-value');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

// tasks and steps UI
const tasksList = document.getElementById('tasks-list');
const stepsList = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDescription = document.getElementById('active-task-description');

// game state
let gameState = {
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,

  tasksCompleted: 0,
  totalRewards: 0,

  activeTask: null,
  availableTasks: [],
  introModalOpen: true,

  // track neglect if skipping high-priority tasks
  secNeglect: 0,
  devNeglect: 0,
  stabNeglect: 0,
};

// Intro
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// no WASD => point&click
const locations={
  Infrastruktur:        document.getElementById('infrastruktur'),
  Informationssikkerhed:document.getElementById('informationssikkerhed'),
  Hospital:            document.getElementById('hospital'),
  Leverandør:          document.getElementById('leverandor'),
  'Medicinsk Udstyr':  document.getElementById('medicinsk-udstyr'),
  'IT Jura':           document.getElementById('it-jura'),
  Cybersikkerhed:      document.getElementById('cybersikkerhed'),
};

Object.entries(locations).forEach(([locName, el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(locName);
  });
});

// location scenarios
const locationScenarios={
  "Hospital":{
    question:"Hospitalet vil have en sikker og stabil løsning.",
    safeEffect:"(Sikker) +2 Sikkerhed, men -1 Hospitalstilfredshed (for meget bureaukrati)",
    riskyEffect:"(Risikabel) +1 Stabilitet, -2 Security (hurtig men uforsvarlig)",
    safeFn:()=>{
      applyStatChange("security",+2);
      applyStatChange("hospitalSatisfaction",-1);
    },
    riskyFn:()=>{
      applyStatChange("stability",+1);
      applyStatChange("security",-2);
    }
  },
  "IT Jura":{
    question:"IT Jura: kræver strengere kontrakt. Vælger du",
    safeEffect:"(Sikker) +2 Sikkerhed, -2 Belønning (dyre kontrakter)",
    riskyEffect:"(Risikabel) +1 Udvikling, men -2 Stabilitet (potentiel konflikt)",
    safeFn:()=>{
      applyStatChange("security",+2);
      gameState.totalRewards=Math.max(gameState.totalRewards-2,0);
      updateScoreboard();
    },
    riskyFn:()=>{
      applyStatChange("development",+1);
      applyStatChange("stability",-2);
    }
  },
  "Leverandør":{
    question:"Leverandør: Tidskrævende kvalitet eller hurtig leverance?",
    safeEffect:"(Sikker) +2 Stabilitet, -1 Hospitalstilfredshed (tager ekstra tid)",
    riskyEffect:"(Risikabel) +2 Udvikling, -2 Stabilitet (hurtigt men ustabilt)",
    safeFn:()=>{
      applyStatChange("stability",+2);
      applyStatChange("hospitalSatisfaction",-1);
    },
    riskyFn:()=>{
      applyStatChange("development",+2);
      applyStatChange("stability",-2);
    }
  },
  "Infrastruktur":{
    question:"Infrastruktur: Vælg en stor opgradering eller en minimal patch",
    safeEffect:"(Sikker) +2 Stabilitet, -1 Belønning (dyrt i drift)",
    riskyEffect:"(Risikabel) +2 Udvikling, -2 Security (hurtig men sårbar)",
    safeFn:()=>{
      applyStatChange("stability",+2);
      gameState.totalRewards=Math.max(gameState.totalRewards-1,0);
      updateScoreboard();
    },
    riskyFn:()=>{
      applyStatChange("development",+2);
      applyStatChange("security",-2);
    }
  },
  "Informationssikkerhed":{
    question:"Inform.sikkerhed: Læg ekstra logs eller hold baseline?",
    safeEffect:"(Sikker) +2 Security, -2 Hospitalstilfredshed (besværligt for personalet)",
    riskyEffect:"(Risikabel) +1 Udvikling, -1 Security",
    safeFn:()=>{
      applyStatChange("security",+2);
      applyStatChange("hospitalSatisfaction",-2);
    },
    riskyFn:()=>{
      applyStatChange("development",+1);
      applyStatChange("security",-1);
    }
  },
  "Medicinsk Udstyr":{
    question:"Medicinsk Udstyr: Grundig vedligehold vs Hurtig fix",
    safeEffect:"(Sikker) +2 Stabilitet, -1 Belønning (ekstra omkostninger)",
    riskyEffect:"(Risikabel) +2 Udvikling, -2 Stabilitet (ustabilt)",
    safeFn:()=>{
      applyStatChange("stability",+2);
      gameState.totalRewards=Math.max(gameState.totalRewards-1,0);
      updateScoreboard();
    },
    riskyFn:()=>{
      applyStatChange("development",+2);
      applyStatChange("stability",-2);
    }
  },
  "Cybersikkerhed":{
    question:"Cybersikkerhed: Dyb scanning eller minimal check?",
    safeEffect:"(Sikker) +2 Security, -1 Udvikling (ressourcer brugt på sikkerhed)",
    riskyEffect:"(Risikabel) +2 Udvikling, -2 Security (mindre fokus på trusler)",
    safeFn:()=>{
      applyStatChange("security",+2);
      applyStatChange("development",-1);
    },
    riskyFn:()=>{
      applyStatChange("development",+2);
      applyStatChange("security",-2);
    }
  }
};

// define step pools
const stepsPool={
  stability:[
    ["Hospital","Infrastruktur"],
    ["Hospital","Leverandør","Infrastruktur"]
  ],
  development:[
    ["Hospital","Leverandør","IT Jura"],
    ["Hospital","Informationssikkerhed"]
  ],
  security:[
    ["Cybersikkerhed","IT Jura"],
    ["Informationssikkerhed","Cybersikkerhed","Hospital"]
  ]
};

const headlines=["Netværkstjek","Systemoptimering","Sikkerhedspatch","Brugerstyring","Migrering"];
const descs={
  stability:"(Stabilitetsopgave) Mindre nedetid.",
  development:"(Udviklingsopgave) Byg nye funktioner.",
  security:"(Sikkerhedsopgave) Forebyg trusler."
};

function handleLocationClick(locName){
  if(!gameState.activeTask)return;
  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length)return;

  const needed=gameState.activeTask.steps[i];
  if(locName!==needed)return;

  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[i]) return;
  gameState.activeTask.decisionMadeForStep[i]=true;

  showScenarioPopup(locName, i);
}

function showScenarioPopup(locName, stepIndex){
  const scenario=locationScenarios[locName];
  if(!scenario){
    fallbackPopup(locName);
    return;
  }
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <strong>${locName}</strong><br/>
    ${scenario.question}<br/><br/>
    (A) ${scenario.safeEffect}<br/>
    (B) ${scenario.riskyEffect}
    <br/><br/>
    <button id="btnA">A</button>
    <button id="btnB">B</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('btnA').addEventListener('click',()=>{
    scenario.safeFn();
    pop.remove();
    finalizeStep();
  });
  document.getElementById('btnB').addEventListener('click',()=>{
    scenario.riskyFn();
    pop.remove();
    finalizeStep();
  });
}

function fallbackPopup(locName){
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <strong>${locName}</strong><br/>
    (A) Lille indsats, (B) Hurtig-løsning
    <br/><br/>
    <button id="fa">A</button>
    <button id="fb">B</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('fa').addEventListener('click',()=>{
    applyStatChange("stability",+1);
    pop.remove();
    finalizeStep();
  });
  document.getElementById('fb').addEventListener('click',()=>{
    applyStatChange("stability",-1);
    pop.remove();
    finalizeStep();
  });
}

function finalizeStep(){
  if(!gameState.activeTask)return;
  gameState.activeTask.currentStep++;
  if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
    // chance of fail if risk is high => must do extra fix tasks
    const t=gameState.activeTask;
    if(t.riskLevel===3){
      // ~50% chance to fail
      if(Math.random()<0.5){
        showPopup("Opgave FEJLEDE, du skal udføre 2 fix-opgaver!", "error",4000);
        // add 2 small fix tasks
        for(let i=0;i<2;i++){
          generateFixTask(t.taskType);
        }
        failTask(t);
        return;
      }
    }
    completeTask();
  } else {
    updateStepsList();
  }
}

function failTask(originalTask){
  // penalize
  applyStatChange("hospitalSatisfaction",-5);
  // remove activeTask & scoreboard update
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

// generate a "fix" task if fail
function generateFixTask(taskType){
  const fixHeadline="Rettelses-opgave";
  const stepArr=["Hospital"];
  const fixTask={
    id:Date.now()+Math.floor(Math.random()*1000),
    taskType:taskType,
    headline: fixHeadline,
    description:"(Rettelse efter fiasko)",
    steps: stepArr,
    currentStep:0,
    riskLevel:1,
    baseReward:10, 
    isHighPriority:false,
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(fixTask);
  renderTasks();
}

function applyStatChange(stat,delta){
  gameState[stat]=Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat,stat);
}

function showFloatingText(txt, stat){
  const container=document.getElementById("floating-text-container");
  const div=document.createElement("div");
  div.classList.add("floating-text");
  div.style.left="50%";
  div.style.top="50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";

  div.textContent=txt;
  container.appendChild(div);
  setTimeout(()=>div.remove(),2000);
}

function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  const r=Math.random();
  let type='stability';
  if(r<0.33) type='stability'; 
  else if(r<0.66) type='development'; 
  else type='security';

  const stepArr=stepsPool[type][Math.floor(Math.random()*stepsPool[type].length)];
  const riskLevel=Math.floor(Math.random()*3)+1; 
  const baseReward=riskLevel*80;
  const head=headlines[Math.floor(Math.random()*headlines.length)];

  const newTask={
    id:Date.now()+Math.floor(Math.random()*1000),
    taskType:type,
    headline:head,
    description: descs[type],
    steps: stepArr,
    currentStep:0,
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
    let potentialGain=`+${5+(t.riskLevel*2)} til ${t.taskType}`;
    let failText=`(Hvis fiasko -> +2-3 fix-opgaver!)`;

    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain} ${failText}
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
  if(task.taskType==="security") gameState.secNeglect++;
  else if(task.taskType==="development") gameState.devNeglect++;
  else gameState.stabNeglect++;
  checkNeglectPenalties();
}
function checkNeglectPenalties(){
  if(gameState.secNeglect>=3){
    showPopup("Ignorerede for mange Sikkerhedsopgaver! -5 Security","error");
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
  const idx=gameState.availableTasks.findIndex(x=>x.id===taskId);
  if(idx===-1)return;
  const t=gameState.availableTasks[idx];

  if(t.riskLevel===3){
    const pop=document.createElement('div');
    pop.classList.add('popup','info');
    pop.style.animation="none";
    pop.innerHTML=`
      <strong>Høj Risiko</strong><br/>
      Stor belønning men fiasko medfører fix-opgaver.<br/>
      <button id="yes">Fortsæt</button>
      <button id="no">Fortryd</button>
    `;
    document.getElementById('popup-container').appendChild(pop);

    document.getElementById('yes').addEventListener('click',()=>{
      pop.remove();
      finalizeAssign(taskId, idx);
    });
    document.getElementById('no').addEventListener('click',()=>{
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
  activeTaskDescription.textContent=gameState.activeTask.description;
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
    const done=(i<gameState.activeTask.currentStep);
    const li=document.createElement("li");
    li.textContent=`Trin ${i+1}: [${locName}]`;
    if(done){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function completeTask(){
  showPopup("Opgave fuldført!", "success",4000);
  gameState.tasksCompleted++;

  const t=gameState.activeTask;
  let plus=(5+(t.riskLevel*2));
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

  // show summary popup
  const sumPop=document.createElement('div');
  sumPop.classList.add('popup');
  sumPop.style.animation="none";
  sumPop.textContent=`Opsummering: ${summary}`;
  document.getElementById('popup-container').appendChild(sumPop);
  setTimeout(()=>sumPop.remove(),4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function updateScoreboard(){
  scoreboard.tasksCompleted.textContent=gameState.tasksCompleted;
  scoreboard.totalRewards.textContent=gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent=gameState.hospitalSatisfaction;

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
  // generate some tasks initially
  for(let i=0;i<2;i++){
    generateTask();
  }
  // new tasks over time
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

initGame();
