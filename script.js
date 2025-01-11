/************************************************************
 * script.js
 * 1) Money (start=1000)
 * 2) Location pop-ups are bigger with more text
 * 3) CAB final pop-up summarizing & concluding
 * 4) More lively text and unique system references
 ************************************************************/

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

// UI for tasks
const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

// End-of-time
const endModal           = document.getElementById('end-modal');
const endGameSummary     = document.getElementById('end-game-summary');
const endOkBtn           = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click',()=>{
  endModal.style.display="none";
  // optional: reload
  // location.reload();
});

// CAB final pop-up (mid step)
const cabModal           = document.getElementById('cab-modal');
const cabSummary         = document.getElementById('cab-summary');
const cabOkBtn           = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click',()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

// The final result after CAB decides
const cabResultModal     = document.getElementById('cab-result-modal');
const cabResultTitle     = document.getElementById('cab-result-title');
const cabResultText      = document.getElementById('cab-result-text');
const cabResultOkBtn     = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click',()=>{
  cabResultModal.style.display="none";
  // done
});

// Our game state
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

  docSkipCount:0,    // skipping documentation => higher fail
  riskyTotal:0,      // track how many times user picks quick approach
  finalFailChance:0, // used at CAB check
};

// Intro
document.getElementById('intro-ok-btn').addEventListener('click',()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// Our location references (point&click)
const locations={
  Infrastruktur:        document.getElementById('infrastruktur'),
  Infosec:              document.getElementById('informationssikkerhed'),
  Hospital:            document.getElementById('hospital'),
  Leverandør:          document.getElementById('leverandor'),
  'Medicinsk Udstyr':  document.getElementById('medicinsk-udstyr'),
  'IT Jura':           document.getElementById('it-jura'),
  CyberScan:           document.getElementById('cybersikkerhed'),
  Dokumentation:       document.getElementById('dokumentation')
};

// Add event listeners
Object.entries(locations).forEach(([locName, el])=>{
  el.addEventListener('click',()=>{
    handleLocationClick(locName);
  });
});

// scenario table with more descriptive text
const locationScenarios={
  "Hospital": {
    bigTitle: "Hospital (MediLog Forvaltning)",
    description: `Du har opdaget at hospitalets personale ønsker flere funktioner i MediLog, 
    men det koster personaletid og opsætning.`,
    A: {
      label: "Minimal Udvikling",
      text: "Brug 2 tid, -50 penge. Få +1 Stabilitet og +1 i personaletilfredshed",
      effect:()=>{
        applyTimeCost(2); applyMoneyCost(50);
        applyStatChange("stability",+1);
        applyStatChange("hospitalSatisfaction",+1);
      },
      failBonus: 0
    },
    B: {
      label: "Udvidet Udvikling",
      text: "Brug 5 tid, -150 penge, men få +3 i hospitalstilfredshed og +2 Udvikling. 5% fejlrisk.",
      effect:()=>{
        applyTimeCost(5); applyMoneyCost(150);
        applyStatChange("hospitalSatisfaction",+3);
        applyStatChange("development",+2);
      },
      failBonus: 0.05
    }
  },
  "IT Jura": {
    bigTitle: "IT Jura (Kontrakttjek med TechLex Advokater)",
    description: `Du skal sikre at leverandørerne (f.eks. ScanCare) leverer. Grundig jura = dyr. Minimal jura = hurtigere, men større risiko.`,
    A: {
      label: "Grundig Kontrakt",
      text: "Brug 4 tid, -150 penge => +2 Sikkerhed, +1 Stabilitet",
      effect:()=>{
        applyTimeCost(4); applyMoneyCost(150);
        applyStatChange("security",+2);
        applyStatChange("stability",+1);
      },
      failBonus: 0
    },
    B: {
      label: "Minimal Kontrakt",
      text: "Brug 1 tid, 0 penge => +1 Udvikling, men +10% fail-chance",
      effect:()=>{
        applyTimeCost(1);
        applyStatChange("development",+1);
      },
      failBonus: 0.10
    }
  },
  "Leverandør": {
    bigTitle: "Leverandør (Teknova Solutions)",
    description: `Teknova Solutions tilbyder enten en grundig implementering eller en hurtig, billig leverance.`,
    A: {
      label: "Kvalitetssikring",
      text: "Brug 6 tid, -200 penge => +2 Stabilitet, +1 Sikkerhed",
      effect:()=>{
        applyTimeCost(6); applyMoneyCost(200);
        applyStatChange("stability",+2);
        applyStatChange("security",+1);
      },
      failBonus: 0
    },
    B: {
      label: "Hurtig Leverance",
      text: "Brug 2 tid, -50 penge => +1 Stabilitet, men +10% fail-chance",
      effect:()=>{
        applyTimeCost(2); applyMoneyCost(50);
        applyStatChange("stability",+1);
      },
      failBonus: 0.10
    }
  },
  "Infrastruktur": {
    bigTitle: "Infrastruktur (Serverpark for LIMS)",
    description: `Vil du lave en stor modernisering af serverparken eller blot en lille patch til at løse dagens problemer?`,
    A: {
      label: "Stor Opgradering",
      text: "Brug 5 tid, -200 penge => +2 Stabilitet, +2 Udvikling (fremtidssikret)",
      effect:()=>{
        applyTimeCost(5); applyMoneyCost(200);
        applyStatChange("stability",+2);
        applyStatChange("development",+2);
      },
      failBonus: 0
    },
    B: {
      label: "Minimal Patch",
      text: "Brug 1 tid, -50 penge => +1 Stabilitet men +5% fail-chance",
      effect:()=>{
        applyTimeCost(1); applyMoneyCost(50);
        applyStatChange("stability",+1);
      },
      failBonus: 0.05
    }
  },
  "Infosec": {
    bigTitle: "Informationssikkerhed (SikurSoft-løsning)",
    description: `Der er fundet potentielle huller i netværket. Vil du gå all-in med logs/overvågning eller en hurtig basal sikring?`,
    A: {
      label: "Ekstra Overvågning",
      text: "Brug 4 tid, -60 penge => +2 Sikkerhed, +1 Stabilitet",
      effect:()=>{
        applyTimeCost(4); applyMoneyCost(60);
        applyStatChange("security",+2);
        applyStatChange("stability",+1);
      },
      failBonus: 0
    },
    B: {
      label: "Basal Sikkerhed",
      text: "Brug 2 tid, 0 penge => +1 Sikkerhed, men +10% fail-chance",
      effect:()=>{
        applyTimeCost(2);
        applyStatChange("security",+1);
      },
      failBonus: 0.10
    }
  },
  "Medicinsk Udstyr": {
    bigTitle: "MediTek: Vedligehold",
    description: `MediTek har rapporteret fejl i apparater til blodprøvehåndtering. Grundig reparation eller hurtig fix?`,
    A: {
      label: "Grundig Vedligehold",
      text: "Brug 4 tid, -120 penge => +2 Stabilitet, +1 Sikkerhed",
      effect:()=>{
        applyTimeCost(4); applyMoneyCost(120);
        applyStatChange("stability",+2);
        applyStatChange("security",+1);
      },
      failBonus: 0
    },
    B: {
      label: "Hurtig Fix",
      text: "Brug 1 tid, -20 penge => +1 Stabilitet, +10% fail-chance",
      effect:()=>{
        applyTimeCost(1); applyMoneyCost(20);
        applyStatChange("stability",+1);
      },
      failBonus: 0.10
    }
  },
  "CyberScan": {
    bigTitle: "CyberScan (Dyb scanning vs. Overfladisk check)",
    description: `CyberScan-løsningen har opdaget aktivitet i netværket. Vil du køre en fuld scanning eller blot en hurtig test?`,
    A: {
      label: "Dyb Scanning",
      text: "Brug 4 tid, -80 penge => +2 Sikkerhed, +1 Stabilitet",
      effect:()=>{
        applyTimeCost(4); applyMoneyCost(80);
        applyStatChange("security",+2);
        applyStatChange("stability",+1);
      },
      failBonus: 0
    },
    B: {
      label: "Overfladisk Check",
      text: "Brug 2 tid, -30 penge => +1 Sikkerhed, +10% fail-chance",
      effect:()=>{
        applyTimeCost(2); applyMoneyCost(30);
        applyStatChange("security",+1);
      },
      failBonus: 0.10
    }
  },
  "Dokumentation": {
    bigTitle: "Dokumentation af LIMS Ændringer",
    description: `Du kan bruge tid på at udfylde dokumentation, 
    så CAB senere kan se præcis hvad der er ændret. Eller springe over 
    og spare tid/penge - men så stiger risikoen for at CAB afviser.`,
    A: {
      label: "Lav Dokumentation",
      text: "+3 tid, -10 penge => ingen ekstra fail-chance",
      effect:()=>{
        applyTimeCost(3); applyMoneyCost(10);
      },
      failBonus: 0
    },
    B: {
      label: "Spring Dokumentation over",
      text: "Ingen tid/penge => +15% fail-chance ved CAB",
      effect:()=>{
        gameState.docSkipCount++;
      },
      failBonus: 0.15
    }
  }
};

// The steps pool ensures the last step is "Dokumentation" physically, 
// then after doc, we show CAB pop-up
const stepsPool={
  stability:[
    ["Hospital","Infrastruktur","Dokumentation"],
    ["Hospital","Leverandør","Infrastruktur","Dokumentation"]
  ],
  development:[
    ["Hospital","Leverandør","IT Jura","Dokumentation"],
    ["Hospital","Infosec","Dokumentation"]
  ],
  security:[
    ["CyberScan","IT Jura","Dokumentation"],
    ["Infosec","CyberScan","Hospital","Dokumentation"]
  ]
};

const headlines=[
  "MediLog System-opgradering", 
  "BioPatch Integration",
  "ScanCare Sikkerhedshul Fundet",
  "Fælles EPR Ændring",
  "ArkivMigrering"
];
const descs={
  stability:"(Stabilitetsopgave) Mindre nedetid & robusthed",
  development:"(Udviklingsopgave) Nye features & funktioner",
  security:"(Sikkerhedsopgave) Beskyt systemet mod cybertrusler"
};

// If user physically clicks location = next step if correct
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
  // now we do the pop-up scenario
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[i])return;
  gameState.activeTask.decisionMadeForStep[i]=true;

  showScenarioPopup(locName);
}

// Skips doc => docSkipCount++
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

// Show large scenario popup
function showScenarioPopup(locName){
  const sc=locationScenarios[locName];
  const i=gameState.activeTask.currentStep;
  if(!sc){
    fallbackPopup(locName);
    return;
  }
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <h3 style="margin:0;">${sc.bigTitle}</h3>
    <p style="font-size:0.85rem;">${sc.description}</p>
    <strong>Valg A:</strong> ${sc.A.label}<br/>
    <em>${sc.A.text}</em>
    <br/><br/>
    <strong>Valg B:</strong> ${sc.B.label}<br/>
    <em>${sc.B.text}</em>
    <br/><br/>
    <button id="btnA" style="margin-right:8px;">Vælg A</button>
    <button id="btnB">Vælg B</button>
  `;
  document.getElementById('popup-container').appendChild(pop);

  document.getElementById('btnA').addEventListener('click',()=>{
    sc.A.effect();
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
  const pop=document.createElement('div');
  pop.classList.add('popup','info');
  pop.style.animation="none";
  pop.innerHTML=`
    <h3 style="margin:0;">${locName}</h3>
    <p style="font-size:0.85rem;">
      Standard fallback scenario – du kan vælge en 
      større indsats eller en hurtig fix.
    </p>
    <strong>Valg A:</strong> +2 Stabilitet, -50 penge, ingen fail<br/>
    <strong>Valg B:</strong> +1 Sikkerhed, ingen penge men +10% fail
    <br/><br/>
    <button id="fa" style="margin-right:8px;">A</button>
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
    pop.remove();
    applyFailBonus(0.10);
    finalizeStep();
  });
}

function applyFailBonus(bonus){
  gameState.riskyTotal += bonus;
}

function finalizeStep(){
  if(!gameState.activeTask)return;

  // each step cost 5 time
  applyTimeCost(5);

  gameState.activeTask.currentStep++;
  if(gameState.time<=0){
    endGame(); 
    return;
  }
  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length){
    // done => showCABModal
    showCABModal();
  } else {
    updateStepsList();
  }
}

// The CAB modal
function showCABModal(){
  // doc skip => each skip +15% fail
  // riskyTotal => sum of location approach fail bonuses
  // final formula e.g. base + doc + risky
  let fail=gameState.riskyTotal + (gameState.docSkipCount*0.15);
  if(fail>1) fail=1; if(fail<0) fail=0;
  gameState.finalFailChance=fail;
  
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB-gennemgang</strong><br/>
    Du har i denne opgave valgt 
    nogle hurtige/billige løsninger => +${(gameState.riskyTotal*100).toFixed(0)}% risiko.<br/>
    Du har sprunget Dokumentation over ${gameState.docSkipCount} gang(e) => +${(gameState.docSkipCount*15).toFixed(0)}% risiko.<br/>
    Samlet fejlchance: ${ (fail*100).toFixed(0)}%.
    <br/><br/>
    Klik "Færdiggør" for at se om CAB godkender opgaven!
  `;
}

function finalizeCABResult(){
  cabModal.style.display="none";
  let f=gameState.finalFailChance||0;
  if(Math.random()<f){
    // fail
    showCABResult(false);
  } else {
    // success
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="CAB roser dine valg og giver grønt lys!";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="CAB mener din løsning er for risikabel/udokumenteret.";
    failTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  // remove active task
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB(){
  // "safe" final reward
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;

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

  showPopup(`Opgave fuldført: ${summary}`, "success",4000);

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";

  updateScoreboard();
}

// Time & Money
function applyMoneyCost(amount){
  gameState.money=Math.max(gameState.money-amount,0);
  updateScoreboard();
}
function applyTimeCost(t){
  gameState.time=Math.max(gameState.time-t,0);
  updateScoreboard();
}

// Apply stat changes
function applyStatChange(stat,delta){
  gameState[stat]=Math.min(Math.max(gameState[stat]+delta,0),150);
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
  if(gameState.time<=0) return; 
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

// skipping high priority
function skipHighPriority(task){
  if(!task.isHighPriority)return;
  if(task.taskType==="security") gameState.secNeglect++;
  else if(task.taskType==="development") gameState.devNeglect++;
  else gameState.stabNeglect++;
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

// Time ends
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
