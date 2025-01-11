/***************************************************
 * script.js
 * 1) Point-and-click => no WASD
 * 2) No overlapping, use given positions
 * 3) No bar graphics => use numeric scoreboard
 * 4) Highlight gains/losses up front
 * 5) Show summary popup at task completion
 * 6) Step-by-step impact => floating text
 * 7) Slightly different outcomes for “A” vs. “B”
 * 8) High-Priority neglect
 * 9) Reduce repetition
 ***************************************************/

const securityValueEl     = document.getElementById('security-value');
const stabilityValueEl    = document.getElementById('stability-value');
const developmentValueEl  = document.getElementById('development-value');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

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
  shownFirstActivePopup: false,

  // high priority neglect
  secNeglect: 0,
  devNeglect: 0,
  stabNeglect: 0,
};

// Remove WASD => Use location clicks
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  Leverandør: document.getElementById('leverandor'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  'IT Jura': document.getElementById('it-jura'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
};

Object.entries(locations).forEach(([name, el]) => {
  el.addEventListener('click', () => {
    handleLocationClick(name);
  });
});

document.getElementById('intro-ok-btn').addEventListener('click', () => {
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// Mini scenario / location logic
const locationScenarios = {
  "Hospital": {
    question: "Ekstra test? (A) Gennemføre, (B) Spring over",
    A: { text:"A: +2 Stability", effect:()=>applyStatChange("stability", +2) },
    B: { text:"B: −2 Stability", effect:()=>applyStatChange("stability", -2) },
  },
  "IT Jura": {
    question: "Strenge kontrakter? (A) Ja, (B) Nej",
    A: { text:"A: +2 Security, −1 Satisfaction", effect:()=>{
      applyStatChange("security", +2);
      applyStatChange("hospitalSatisfaction", -1);
    }},
    B: { text:"B: Uændret", effect:()=>{} },
  },
  "Leverandør": {
    question: "Leverandør: Forhåndsbetaling? (A) Betal, (B) Afslå",
    A: { text:"A: +1 Dev, -2 Reward", effect:()=>{
      applyStatChange("development", +1);
      gameState.totalRewards=Math.max(gameState.totalRewards-2,0);
      updateScoreboard();
    }},
    B: { text:"B: -1 Stability (forsinkelse)", effect:()=>applyStatChange("stability", -1) }
  },
  "Infrastruktur": {
    question:"Infrastruktur: (A) Stor opgradering, (B) Lidt patch",
    A:{ text:"A: +2 Stability", effect:()=>applyStatChange("stability",+2)},
    B:{ text:"B: +1 Stability", effect:()=>applyStatChange("stability",+1)}
  },
  "Informationssikkerhed":{
    question:"Infosikkerhed: (A) Ekstra logs, (B) baseline",
    A:{ text:"A: +2 Security", effect:()=>applyStatChange("security",+2)},
    B:{ text:"B: 0 effect", effect:()=>{}}
  },
  "Medicinsk Udstyr":{
    question:"Medicinsk: (A) Grundig vedligehold, (B) Hurtig fix",
    A:{ text:"A: +2 Stability, -1 Dev", effect:()=>{
      applyStatChange("stability",+2);
      applyStatChange("development",-1);
    }},
    B:{ text:"B: -2 Stability", effect:()=>applyStatChange("stability",-2)}
  },
  "Cybersikkerhed":{
    question:"Cybersikkerhed: (A) Dyb scanning, (B) overfladisk",
    A:{ text:"A: +2 Security, -1 Reward", effect:()=>{
      applyStatChange("security",+2);
      gameState.totalRewards=Math.max(gameState.totalRewards-1,0);
      updateScoreboard();
    }},
    B:{ text:"B: -2 Security", effect:()=>applyStatChange("security",-2)}
  }
};

// tasks data
const stepsPool = {
  stability:[
    ["Hospital","Infrastruktur"],
    ["Hospital","Leverandør","Infrastruktur"],
  ],
  development:[
    ["Hospital","Leverandør","IT Jura"],
    ["Hospital","Informationssikkerhed"],
  ],
  security:[
    ["Cybersikkerhed","IT Jura"],
    ["Informationssikkerhed","Cybersikkerhed","Hospital"]
  ]
};

const headlines = ["Netværkstjek","Systemoptimering","Sikkerhedspatch","Brugerstyring","Migrering"];
const descs={
  stability:"(Stabilitetsopgave) Vedligehold drift",
  development:"(Udviklingsopgave) Udvikl/forbedr systemet",
  security:"(Sikkerhedsopgave) Forebyg trusler"
};

function handleLocationClick(locName){
  if(!gameState.activeTask) return; // no active task => ignore
  const idx=gameState.activeTask.currentStep;
  if(idx>=gameState.activeTask.steps.length) return;

  const needed=gameState.activeTask.steps[idx];
  if(locName!==needed) return; // not correct step => do nothing

  // show scenario
  showLocationScenario(locName);
}

// show location scenario => user picks A or B => finalize step
function showLocationScenario(locName){
  if(!gameState.activeTask) return;
  // ensure only 1 scenario per step
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  const i=gameState.activeTask.currentStep;
  if(gameState.activeTask.decisionMadeForStep[i]) return;

  gameState.activeTask.decisionMadeForStep[i]=true;

  // build popup
  const scenario=locationScenarios[locName];
  if(!scenario){
    // fallback
    genericPopup(locName);
    return;
  }
  const popup=document.createElement('div');
  popup.classList.add('popup','info');
  popup.style.animation="none";

  popup.innerHTML=`
    <strong>${locName}</strong><br/>
    ${scenario.question}<br/><br/>
    <button id="scenarioA">${scenario.A.text}</button>
    <button id="scenarioB">${scenario.B.text}</button>
  `;
  document.getElementById('popup-container').appendChild(popup);

  document.getElementById('scenarioA').addEventListener('click',()=>{
    scenario.A.effect();
    popup.remove();
    finalizeStep();
  });
  document.getElementById('scenarioB').addEventListener('click',()=>{
    scenario.B.effect();
    popup.remove();
    finalizeStep();
  });
}

function genericPopup(locName){
  const popup=document.createElement('div');
  popup.classList.add('popup','info');
  popup.style.animation="none";
  popup.innerHTML=`
    <strong>${locName}</strong><br/>
    (A) Grundig, (B) Hurtig
    <br/><br/>
    <button id="genA">A</button>
    <button id="genB">B</button>
  `;
  document.getElementById('popup-container').appendChild(popup);

  document.getElementById('genA').addEventListener('click',()=>{
    applyStatChange("stability",+1);
    popup.remove();
    finalizeStep();
  });
  document.getElementById('genB').addEventListener('click',()=>{
    applyStatChange("stability",-1);
    popup.remove();
    finalizeStep();
  });
}

function finalizeStep(){
  if(!gameState.activeTask)return;
  gameState.activeTask.currentStep++;
  if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
    completeTask();
  }else{
    updateStepsList();
  }
}

function applyStatChange(stat, delta){
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
  if(stat==="security")   div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development")div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";

  div.textContent=txt;
  ctn.appendChild(div);

  setTimeout(()=> div.remove(),2000);
}

function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  const r=Math.random();
  let type='stability';
  if(r<0.33) type='stability'; else if(r<0.66) type='development'; else type='security';

  const stepArr=stepsPool[type][Math.floor(Math.random()*stepsPool[type].length)];
  const riskLevel=Math.floor(Math.random()*3)+1; //1..3
  const baseReward=riskLevel*80;
  const head=headlines[Math.floor(Math.random()*headlines.length)];

  const newTask={
    id: Date.now()+Math.floor(Math.random()*1000),
    taskType:type,
    headline: head,
    description: descs[type],
    steps: stepArr,
    currentStep:0,
    riskLevel: riskLevel,
    baseReward: baseReward,
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
    const li=document.createElement('li');

    if(t.riskLevel===3){
      li.style.borderColor="red";
      li.style.borderWidth="2px";
    }else if(t.riskLevel===2){
      li.style.borderColor="orange";
    }else{
      li.style.borderColor="green";
    }

    // (4) highlight gains/losses
    let potentialGain="+"+(5+t.riskLevel*2)+" til "+t.taskType; 
    let potentialLoss="(ved fail, men vi do auto success for simplicity)";

    let priorityLabel=t.isHighPriority?" (HØJPRIORITET)":"";
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain} ${potentialLoss}
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn=document.createElement('button');
    commitBtn.classList.add('commit-button');
    commitBtn.textContent="Forpligt";
    commitBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener('click',()=>{
      li.querySelectorAll('.task-description').forEach(d=>{
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
    showPopup("Ignorerede for mange Udviklingsopgaver! -5 Dev","error");
    applyStatChange("development",-5);
    gameState.devNeglect=0;
  }
  if(gameState.stabNeglect>=3){
    showPopup("Ignorerede for mange Stabilitetsopgaver! -5 Stability","error");
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
    // confirm
    const pop=document.createElement('div');
    pop.classList.add('popup','info');
    pop.style.animation="none";
    pop.innerHTML=`
      <strong>Høj Risiko</strong><br/>
      Denne opgave har stor gevinst men stor straf hvis fejler.<br/>
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
  }else{
    finalizeAssign(taskId,idx);
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
    let done=(i<gameState.activeTask.currentStep);
    const li=document.createElement('li');
    li.textContent=`Trin ${i+1}: [${locName}]`;
    if(done){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function completeTask(){
  showPopup("Opgave fuldført! (Se opsummering nedenfor)","success",4000);
  gameState.tasksCompleted++;

  // summary popup (#5)
  const sumPop=document.createElement('div');
  sumPop.classList.add('popup');
  sumPop.style.animation="none";
  let summary="";

  let plus=(5+gameState.activeTask.riskLevel*2);
  if(gameState.activeTask.taskType==="security"){
    applyStatChange("security",+plus);
    summary=`+${plus} Sikkerhed`;
  } else if(gameState.activeTask.taskType==="development"){
    applyStatChange("development",+plus);
    summary=`+${plus} Udvikling`;
  } else{
    applyStatChange("stability",+plus);
    summary=`+${plus} Stabilitet`;
  }

  gameState.totalRewards+=gameState.activeTask.baseReward;
  summary+=`, +${gameState.activeTask.baseReward} point`;
  
  sumPop.textContent=`Opsummering: ${summary}`;
  document.getElementById('popup-container').appendChild(sumPop);

  setTimeout(()=> sumPop.remove(),4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  updateScoreboard();
}

// scoreboard
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
  document.getElementById('popup-container').appendChild(el);
  setTimeout(()=> el.remove(), duration);
}

function initGame(){
  updateScoreboard();

  // generate some tasks
  for(let i=0;i<2;i++){
    generateTask();
  }

  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

initGame();
