/************************************************************
 * script.js
 * - showPopup defineret først -> ingen reference error
 * - taskFlowMapping -> fast logisk rækkefølge pr opgave,
 *   så "Biokemi Nyt Fungeassay-Modul" fx => [Hospital, Leverandør, IT Jura, Dokumentation]
 * - Går i minus for tid/penge
 ************************************************************/

// showPopup defineres først
function showPopup(msg, type="success", duration=3000){
  const el = document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  // ingen "info"
  el.style.animation="none";
  el.textContent= msg;
  document.getElementById('popup-container').appendChild(el);
  setTimeout(()=> el.remove(), duration);
}

// Fortsæt med scoreboard references, state etc.
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

const endModal       = document.getElementById('end-modal');
const endGameSummary = document.getElementById('end-game-summary');
const endOkBtn       = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', ()=>{ endModal.style.display="none"; });

const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', ()=> {
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

let gameState={
  time: 100,
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

  usedTasks:new Set()
};

// For at have en *fast* rækkefølge for hver opgave, definerer vi en "taskFlowMapping"
// Eksempel: 3 tasks i dev, 3 i stability, 3 i security => 9 i alt
// Du kan udvide til 20 ved at tilføje flere entries her.
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

// Tilsvarende "fast" flow for hver opgave
// Eksempel: "Biokemi Nyt Fungeassay-Modul" =>
// 1) Hospital (kravspec), 2) Leverandør (udvikling), 3) IT Jura (aftale), 4) Dokumentation
// Tilføj dine 20 med de flows, du vil have.
const taskFlowMapping={
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

// Tilføj evt. flere

// scenarioer
const detailedScenarios={
  // Her kan du fortsat bruge "hospital", "it-jura", osv. => se næste sektion
  // ...
};

// scoreboard
function updateScoreboard(){
  timeLeftEl.textContent= gameState.time;
  moneyLeftEl.textContent= gameState.money;
  scoreboard.tasksCompleted.textContent= gameState.tasksCompleted;
  scoreboard.totalRewards.textContent  = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
}

// Vores scenarier (du kan blot genbruge fra tidligere – forkortet her for plads)
const locationScenarios={
  "hospital":[
    { 
      description:"Hospitalets LIMS skal opdateres. (Hospital prioriterer drift/personaletilfredshed).",
      A:{label:"Mindre Opgradering", text:"2 tid, 50 kr; +1 stabilitet, +1 hospital", time:2,money:50,effects:{stability:1,hospitalSatisfaction:1},failBonus:0},
      B:{label:"Stor Modernisering", text:"5 tid, 150 kr; +3 hospital, +2 udvikling, +5% fejl", time:5,money:150,effects:{hospitalSatisfaction:3,development:2},failBonus:0.05}
    }
    // .. tilføj 2-3 mere
  ],
  "leverandor":[
    {
      description:"Leverandør: kvalitet vs. hurtig leverance. (prioriterer let leverance).",
      A:{label:"Kvalitetstjek", text:"6 tid, 200 kr; +2 stabilitet, +1 sikkerhed", time:6,money:200,effects:{stability:2,security:1},failBonus:0},
      B:{label:"Hurtig Levering", text:"2 tid, 50 kr; +1 stabilitet, 10% fejl", time:2,money:50,effects:{stability:1},failBonus:0.1}
    }
    // etc.
  ],
  // ...
  "dokumentation":[
    {
      description:"CAB vil se dine papirer.",
      A:{label:"Fuldt Dok", text:"3 tid, 10 kr; ingen +fejl", time:3,money:10,effects:{},failBonus:0},
      B:{label:"Minimal Dok", text:"1 tid, 0 kr; +5% fejl", time:1,money:0,effects:{},failBonus:0.05}
    }
    // ...
  ]
};

// Vælg scenarie
function showScenarioModal(locName){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";

  const scArr= locationScenarios[locName.toLowerCase()];
  if(!scArr|| scArr.length===0){
    // fallback
    scenarioTitle.textContent= locName;
    scenarioDescription.textContent="(Standard scenarie)";
    scenarioALabel.textContent= "Mulighed A: Kvalitet";
    scenarioAText.textContent= "2 tid, 50 kr; +2 stabilitet";
    scenarioAButton.onclick=()=>{
      applyTimeCost(2);
      applyMoneyCost(50);
      applyStatChange("stability",2);
      scenarioModal.style.display="none";
      finalizeStep();
    };
    scenarioBLabel.textContent= "Mulighed B: Hurtig";
    scenarioBText.textContent= "1 tid, 0 kr; +10% fejl";
    scenarioBButton.onclick=()=>{
      gameState.riskyTotal+=0.1;
      scenarioModal.style.display="none";
      finalizeStep();
    };
    return;
  }

  const sc= scArr[Math.floor(Math.random()* scArr.length)];
  scenarioTitle.textContent= `${locName} – ${sc.description}`;
  scenarioDescription.textContent="";
  
  scenarioALabel.textContent= sc.A.label;
  scenarioAText.textContent= sc.A.text;
  scenarioAButton.onclick=()=>{
    applyTimeCost(sc.A.time);
    applyMoneyCost(sc.A.money);
    for(const stat in sc.A.effects){
      applyStatChange(stat, sc.A.effects[stat]);
    }
    gameState.riskyTotal+= sc.A.failBonus||0;
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
    gameState.riskyTotal+= sc.B.failBonus||0;
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// skip doc popup
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";

  scenarioTitle.textContent= "Dokumentation";
  scenarioDescription.textContent= "CAB vil have papirer. Du kan dog skippe.";

  // Fx fuld dok
  scenarioALabel.textContent="Fuldt Dok";
  scenarioAText.textContent="3 tid, 10 kr, ingen ekstra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep();
  };

  // Minimal
  scenarioBLabel.textContent="Minimal Dok";
  scenarioBText.textContent="1 tid, 0 kr; +5% fejl";
  scenarioBButton.onclick=()=>{
    applyTimeCost(1);
    gameState.riskyTotal+=0.05;
    scenarioModal.style.display="none";
    finalizeStep();
  };

  docSkipBtn.onclick=()=>{
    // skip => +15% fejl
    gameState.docSkipCount++;
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// finalize step
function finalizeStep(){
  if(!gameState.activeTask) return;
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
  fail= Math.max(0,Math.min(fail,1));
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Risikofaktor: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
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
    cabResultTitle.textContent= "CAB: Godkendt!";
    cabResultText.textContent= "CAB accepterer opgaven trods eventuelle risici.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent= "CAB: Afvist!";
    let reason= "CAB finder for stor risiko / manglende dokumentation.";
    cabResultText.textContent= reason;
    failTaskCAB();
  }
}
function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  gameState.activeTask=null;
  activeTaskHeadline.textContent= "Ingen aktiv opgave";
  activeTaskDesc.textContent= "";
  stepsList.innerHTML= "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}
function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask) return;
  const t= gameState.activeTask;
  let plus= 5 + t.riskLevel*2;
  if(t.taskType==="security") applyStatChange("security", plus);
  else if(t.taskType==="development") applyStatChange("development", plus);
  else applyStatChange("stability", plus);

  gameState.totalRewards+= t.baseReward;
  showPopup(`Opgave fuldført: +${plus} til ${t.taskType}, +${t.baseReward} kr`, "success", 4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent= "Ingen aktiv opgave";
  activeTaskDesc.textContent= "";
  stepsList.innerHTML= "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

// Gå i minus
function applyTimeCost(t){ 
  gameState.time-= t; 
  updateScoreboard(); 
}
function applyMoneyCost(m){ 
  gameState.money-= m;
  updateScoreboard(); 
}
function applyStatChange(stat,delta){
  gameState[stat]+= delta;
  if(gameState[stat]>150) gameState[stat]=150;
  if(gameState[stat]<0) gameState[stat]=0;
  updateScoreboard();
  showFloatingText((delta>=0? `+${delta}`:`${delta}`)+" "+stat, stat);
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
  setTimeout(()=> div.remove(),2000);
}

// Vores fastdefinerede opgavelister
// 3 i hver kategori som eksempel. Du kan udvide til 20.
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

// HVILKEN rækkefølge har hver opgave i flowMapping?
const taskFlowMapping={
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

// generer opgave
function generateTask(){
  if(gameState.availableTasks.length>=10) return; 
  const categories=["stability","development","security"];
  const category= categories[Math.floor(Math.random()* categories.length)];

  // Vælg et navn fra den valgte category
  let pickedName="";
  if(category==="stability"){
    const possible= stabilityTasks.filter(n=> !gameState.usedTasks.has(n));
    if(!possible.length) return;
    pickedName= possible[Math.floor(Math.random()* possible.length)];
    gameState.usedTasks.add(pickedName);
  } else if(category==="development"){
    const possible= devTasks.filter(n=> !gameState.usedTasks.has(n));
    if(!possible.length) return;
    pickedName= possible[Math.floor(Math.random()* possible.length)];
    gameState.usedTasks.add(pickedName);
  } else {
    const possible= secTasks.filter(n=> !gameState.usedTasks.has(n));
    if(!possible.length) return;
    pickedName= possible[Math.floor(Math.random()* possible.length)];
    gameState.usedTasks.add(pickedName);
  }

  // find fast flow
  const stepsFlow = taskFlowMapping[pickedName];
  if(!stepsFlow){
    console.warn("Ingen flowMapping fundet for ", pickedName);
    return;
  }

  // Bestem riskLevel & baseReward
  const riskLevel= Math.floor(Math.random()*3)+1;
  const baseReward= riskLevel*80;

  const newTask={
    id: Date.now()+ Math.floor(Math.random()*1000),
    taskType: category,
    headline: pickedName,
    description: getTaskDescription(category), // lille beskrivelse
    steps: stepsFlow.slice(), // en kopi
    currentStep:0,
    riskLevel,
    baseReward,
    isHighPriority: (riskLevel===3),
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
    else {li.style.borderColor="green";}
    let priorityLabel= t.isHighPriority? " (HØJPRIORITET)" : "";
    let potentialGain= `+${5 + t.riskLevel*2} til ${t.taskType}`;
    li.innerHTML=`
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn=document.createElement("button");
    commitBtn.classList.add("commit-button");
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

// forpligt opgave
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  const idx= gameState.availableTasks.findIndex(t=> t.id=== taskId);
  if(idx===-1)return;
  const chosen= gameState.availableTasks.splice(idx,1)[0];
  
  gameState.activeTask= chosen;
  activeTaskHeadline.textContent= chosen.headline;
  activeTaskDesc.textContent= chosen.description + " (Følg lokationerne i rækkefølge)";
  updateStepsList();
  renderTasks();
}

// endGame
function endGame(){
  const sumText= `
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Opgaver løst: ${gameState.tasksCompleted}<br/>
    Belønning: ${gameState.totalRewards}
  `;
  endGameSummary.innerHTML= sumText;
  endModal.style.display="flex";
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

// Start
function initGame(){
  updateScoreboard();
  // Generer fx 2 opgaver fra start
  for(let i=0;i<2;i++){
    generateTask();
  }
  // Generer nye opgaver løbende
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

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
  el.addEventListener('click',()=>{
    handleLocationClick(el.id);
  });
});

initGame();
