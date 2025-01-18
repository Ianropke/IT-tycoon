/************************************************************
 * script.js – Samlet version
 * - showPopup defineret først -> ingen reference error
 * - Én deklaration af devTasks, stabilityTasks, secTasks
 * - Intro modal-knap -> man kommer videre
 * - Ingen hårdt stop ved tid/penge < 0
 ************************************************************/

// 1) showPopup defineres først, så vi kan kalde den i resten
function showPopup(msg, type="success", duration=3000){
  const el = document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  el.style.animation="none";
  el.textContent = msg;
  document.getElementById('popup-container').appendChild(el);
  setTimeout(()=> el.remove(), duration);
}

// 2) Scoreboard-elementer
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

// 3) Modals & elementer
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

const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

const endModal       = document.getElementById('end-modal');
const endGameSummary = document.getElementById('end-game-summary');
const endOkBtn       = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', ()=>{
  endModal.style.display="none";
});

const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', ()=>{
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

// 4) Global spiltilstand
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
  finalFailChance: 0,

  usedTasks: new Set()
};

// 5) Én deklaration for dev/stability/sec tasks (ingen dubletter)
const devTasks = [
  "Biokemi Nyt Fungeassay-Modul",
  "Patologi Billedanalyse-Plugin",
  "Klinisk Genetik Variant-Database"
];
const stabilityTasks = [
  "Server-Cluster Tilpasning",
  "High-Availability Udbygning",
  "Konfig-Backup Gennemgang"
];
const secTasks = [
  "Fuld Kryptering af Datapunkter",
  "Penetrationstest (ZetaSec)",
  "Sårbarhedsscanning i GenomServer"
];

// Tydelig definition: Hvilket fast flow skal hver opgave have
const taskFlowMapping = {
  "Biokemi Nyt Fungeassay-Modul": ["hospital","leverandor","it-jura","dokumentation"],
  "Patologi Billedanalyse-Plugin": ["hospital","it-jura","leverandor","dokumentation"],
  "Klinisk Genetik Variant-Database": ["hospital","leverandor","it-jura","dokumentation"],

  "Server-Cluster Tilpasning": ["infrastruktur","hospital","leverandor","dokumentation"],
  "High-Availability Udbygning": ["infrastruktur","leverandor","hospital","dokumentation"],
  "Konfig-Backup Gennemgang": ["infrastruktur","hospital","leverandor","dokumentation"],

  "Fuld Kryptering af Datapunkter": ["informationssikkerhed","it-jura","hospital","dokumentation"],
  "Penetrationstest (ZetaSec)": ["informationssikkerhed","cybersikkerhed","hospital","dokumentation"],
  "Sårbarhedsscanning i GenomServer": ["cybersikkerhed","informationssikkerhed","hospital","dokumentation"]
};

// 6) scenarier (eksempler) 
// Du kan frit udvide med mere tekst i "description", "A/B" mm.
const locationScenarios = {
  "hospital":[
    {
      description: "Hospital vil have en LIMS-opdatering. (De prioriterer drift/personalets tilfredshed)",
      A:{ label:"Mindre Opgradering", text:"2 tid, 50 kr; +1 stabilitet, +1 hospital", 
          time:2,money:50,effects:{stability:1,hospitalSatisfaction:1},failBonus:0 },
      B:{ label:"Stor Modernisering", text:"5 tid, 150 kr; +3 hospital, +2 udvikling, +5% fejl", 
          time:5,money:150,effects:{hospitalSatisfaction:3,development:2},failBonus:0.05 }
    }
  ],
  "leverandor":[
    {
      description: "Leverandøren: Kvalitet vs. hurtig",
      A:{ label:"Kvalitetstjek", text:"6 tid, 200 kr; +2 stabilitet, +1 sikkerhed", 
          time:6, money:200,effects:{stability:2,security:1},failBonus:0 },
      B:{ label:"Hurtig Leverance", text:"2 tid, 50 kr; +1 stabilitet, +10% fejl", 
          time:2, money:50,effects:{stability:1},failBonus:0.1 }
    }
  ],
  "it-jura":[
    {
      description: "Jura: revidér kontrakter, (prioriterer lav risiko).",
      A:{ label:"Grundig Revision", text:"4 tid, 150 kr; +2 sikkerhed, +1 stabilitet",
          time:4,money:150,effects:{security:2,stability:1},failBonus:0 },
      B:{ label:"Hurtig Revision", text:"1 tid, 0 kr; +1 udvikling, +10% fejl",
          time:1,money:0,effects:{development:1},failBonus:0.1 }
    }
  ],
  "infrastruktur":[
    {
      description:"Forældet serverpark.",
      A:{ label:"Stor Modernisering", text:"5 tid, 200 kr; +2 stabilitet, +2 udvikling",
          time:5,money:200,effects:{stability:2, development:2}, failBonus:0 },
      B:{ label:"Minimal Patch", text:"1 tid, 50 kr; +1 stabilitet, +5% fejlrisiko",
          time:1,money:50,effects:{stability:1}, failBonus:0.05 }
    }
  ],
  "informationssikkerhed":[
    {
      description:"Sikkerhedshuller i LIMS-data.",
      A:{ label:"Avanceret Kryptering", text:"4 tid, 60 kr; +2 sikkerhed, +1 stabilitet",
          time:4,money:60,effects:{security:2,stability:1},failBonus:0 },
      B:{ label:"Basal Sikkerhed", text:"2 tid, 0 kr; +1 sikkerhed, +10% fejl",
          time:2,money:0,effects:{security:1},failBonus:0.1 }
    }
  ],
  "cybersikkerhed":[
    {
      description:"Cyber: Penetrationstest vs. hurtige patches",
      A:{ label:"Fuldt PenTest", text:"5 tid, 120 kr; +2 sikkerhed, +1 stabilitet",
          time:5,money:120,effects:{security:2,stability:1},failBonus:0 },
      B:{ label:"Minimal scanning", text:"2 tid, 30 kr; +1 sikkerhed, +8% fejl",
          time:2,money:30,effects:{security:1},failBonus:0.08 }
    }
  ],
  "dokumentation":[
    {
      description:"CAB vil se papirerne",
      A:{ label:"Fuldt Dok", text:"3 tid, 10 kr; ingen extra fejl",
          time:3,money:10,effects:{},failBonus:0 },
      B:{ label:"Minimal Dok", text:"1 tid, 0 kr; +5% fejl",
          time:1,money:0,effects:{},failBonus:0.05 }
    }
  ],
  "medicinsk-udstyr":[
    {
      description:"Medicinsk Udstyr: En fallback (eksempel)",
      A:{ label:"Grundig Vedligehold", text:"4 tid, 120 kr; +2 stabilitet, +1 sikkerhed",
          time:4,money:120,effects:{stability:2,security:1},failBonus:0 },
      B:{ label:"Hurtig Fix", text:"1 tid, 20 kr; +1 stabilitet, +10% fejl",
          time:1,money:20,effects:{stability:1},failBonus:0.1 }
    }
  ]
};

// scoreboard
function updateScoreboard(){
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent   = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent= gameState.hospitalSatisfaction;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
}

// final – steps-lister etc.
function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const current= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li=document.createElement("li");
    li.textContent= `Trin ${i+1}: ${locName}`;
    if(i< current){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
  const prog=document.createElement("li");
  prog.style.color="#aaa";
  prog.textContent=`Trin ${current+1} / ${gameState.activeTask.steps.length}`;
  stepsList.appendChild(prog);
}

// Håndtér klik på lokation
function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  const idx= gameState.activeTask.currentStep;
  if(idx>= gameState.activeTask.steps.length) return;

  const needed= gameState.activeTask.steps[idx];
  if(needed.toLowerCase()==="dokumentation"){
    skipDocumentationPopup();
    return;
  }
  if(locName.toLowerCase()!== needed.toLowerCase()) return;

  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[idx]) return;
  gameState.activeTask.decisionMadeForStep[idx]=true;

  showScenarioModal(locName);
}

// Dokumentation med 3 valg
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";

  scenarioTitle.textContent= "Dokumentationstrin";
  scenarioDescription.textContent= "CAB vil se papir, men du kan skippe...";

  scenarioALabel.textContent= "Fuldt Dok";
  scenarioAText.textContent= "3 tid, 10 kr; ingen ekstra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  scenarioBLabel.textContent= "Minimal Dok";
  scenarioBText.textContent= "1 tid, 0 kr; +5% fejl i CAB";
  scenarioBButton.onclick=()=>{
    applyTimeCost(1);
    gameState.riskyTotal+=0.05;
    scenarioModal.style.display="none";
    finalizeStep();
  };
  docSkipBtn.onclick=()=>{
    gameState.docSkipCount++;
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// Standard scenario
function showScenarioModal(locName){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";

  const scArr= locationScenarios[locName.toLowerCase()];
  if(!scArr||scArr.length===0){
    // fallback
    scenarioTitle.textContent= locName;
    scenarioDescription.textContent="(Standard)";
    scenarioALabel.textContent="Mulighed A";
    scenarioAText.textContent="2 tid, 50 kr, +2 stabilitet";
    scenarioAButton.onclick=()=>{
      applyTimeCost(2);
      applyMoneyCost(50);
      applyStatChange("stability",2);
      scenarioModal.style.display="none";
      finalizeStep();
    };
    scenarioBLabel.textContent="Mulighed B";
    scenarioBText.textContent="1 tid, 0 kr, +10% fejl";
    scenarioBButton.onclick=()=>{
      gameState.riskyTotal+=0.1;
      scenarioModal.style.display="none";
      finalizeStep();
    };
    return;
  }

  const sc= scArr[Math.floor(Math.random()* scArr.length)];
  scenarioTitle.textContent= `${locName} – ${sc.description}`;
  scenarioDescription.textContent= "";
  scenarioALabel.textContent= sc.A.label;
  scenarioAText.textContent= sc.A.text;
  scenarioAButton.onclick=()=>{
    applyTimeCost(sc.A.time);
    applyMoneyCost(sc.A.money);
    for(const stat in sc.A.effects){
      applyStatChange(stat, sc.A.effects[stat]);
    }
    gameState.riskyTotal+= (sc.A.failBonus||0);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  scenarioBLabel.textContent= sc.B.label;
  scenarioBText.textContent= sc.B.text;
  scenarioBButton.onclick=()=>{
    applyTimeCost(sc.B.time);
    applyMoneyCost(sc.B.money);
    for(const stat in sc.B.effects){
      applyStatChange(stat, sc.B.effects[stat]);
    }
    gameState.riskyTotal+= (sc.B.failBonus||0);
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// finalize step
function finalizeStep(){
  if(!gameState.activeTask)return;
  applyTimeCost(5);
  gameState.activeTask.currentStep++;
  if(gameState.activeTask.currentStep>= gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

// CAB
function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.15);
  fail= Math.max(0, Math.min(fail,1));
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Risikoprocent: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    SkipDoc: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}
function finalizeCABResult(){
  cabModal.style.display="none";
  if(Math.random()< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}
function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="CAB godkender opgaven.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko / manglende dokumentation. Opgaven fejler!";
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
  const t= gameState.activeTask;
  let plus= 5 + t.riskLevel*2;
  if(t.taskType==="security") applyStatChange("security", plus);
  else if(t.taskType==="development") applyStatChange("development", plus);
  else applyStatChange("stability", plus);

  gameState.totalRewards+= t.baseReward;
  showPopup(`Opgave fuldført: +${plus} til ${t.taskType}, +${t.baseReward} kr belønning`, "success", 4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

// Gå i minus
function applyTimeCost(t){
  gameState.time-=t;
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money-=m;
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+ delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}
function showFloatingText(txt, stat){
  const c= document.getElementById('floating-text-container');
  const div= document.createElement('div');
  div.classList.add('floating-text');
  div.style.left= "50%";
  div.style.top = "50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent= txt;
  c.appendChild(div);
  setTimeout(()=> div.remove(), 2000);
}

// Generer opgaver
function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  const categories=["stability","development","security"];
  const cat= categories[Math.floor(Math.random()* categories.length)];
  
  let name="";
  if(cat==="stability"){
    const possible= stabilityTasks.filter(n=> !gameState.usedTasks.has(n));
    if(!possible.length) return;
    name= possible[Math.floor(Math.random()* possible.length)];
    gameState.usedTasks.add(name);
  } else if(cat==="development"){
    const possible= devTasks.filter(n=> !gameState.usedTasks.has(n));
    if(!possible.length) return;
    name= possible[Math.floor(Math.random()* possible.length)];
    gameState.usedTasks.add(name);
  } else {
    const possible= secTasks.filter(n=> !gameState.usedTasks.has(n));
    if(!possible.length) return;
    name= possible[Math.floor(Math.random()* possible.length)];
    gameState.usedTasks.add(name);
  }

  // fast flow
  const stepsFlow= taskFlowMapping[name];
  if(!stepsFlow){
    console.warn("Ingen flowMapping for", name);
    return;
  }
  const riskLevel= Math.floor(Math.random()*3)+1;
  const baseReward= riskLevel*80;

  const newTask={
    id: Date.now()+ Math.floor(Math.random()*1000),
    taskType: cat,
    headline: name,
    description: getTaskDescription(cat),
    steps: stepsFlow.slice(),
    currentStep:0,
    riskLevel,
    baseReward,
    isHighPriority:(riskLevel===3),
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

// Render tasks
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
    else{li.style.borderColor="green";}
    let pLabel= t.isHighPriority?" (HØJPRIORITET)":"";
    let potential=`+${5 + t.riskLevel*2} til ${t.taskType}`;
    li.innerHTML=`
      <strong>${t.headline}${pLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potential}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const btn=document.createElement("button");
    btn.classList.add("commit-button");
    btn.textContent="Forpligt";
    btn.addEventListener("click",(e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener("click",()=>{
      li.querySelectorAll(".task-description").forEach(d=>{
        d.style.display=(d.style.display==="none"?"block":"none");
      });
    });
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
}

// Forpligt
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  const idx= gameState.availableTasks.findIndex(t=> t.id===taskId);
  if(idx===-1) return;
  const chosen= gameState.availableTasks.splice(idx,1)[0];
  
  gameState.activeTask= chosen;
  activeTaskHeadline.textContent= chosen.headline;
  activeTaskDesc.textContent= chosen.description+" (Følg lokationerne i rækkefølge.)";
  updateStepsList();
  renderTasks();
}

// Slutspil
function endGame(){
  const sumText=`
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte Opgaver: ${gameState.tasksCompleted}<br/>
    Belønning: ${gameState.totalRewards}
  `;
  endGameSummary.innerHTML=sumText;
  endModal.style.display="flex";
  
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

// Initiér
function initGame(){
  updateScoreboard();
  // Generer 2 opgaver
  for(let i=0;i<2;i++){
    generateTask();
  }
  // Generer løbende
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

// Lokation-lister
const locationElements = {
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
  el.addEventListener('click',()=>{
    handleLocationClick(el.id);
  });
});

initGame();
