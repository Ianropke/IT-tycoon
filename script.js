const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 },
  moveSpeed: 2,
  isVisiting: null,
};

let gameState = {
  tasksCompleted: 0,
  totalRewards: 0,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,

  activeTask: null,
  availableTasks: [],
  introModalOpen: true,
  shownFirstTaskPopup: false,
  shownFirstActivePopup: false,
};

const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  'Medicinsk Udstyr': document.getElementById('medicinsk-udstyr'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
  Leverandør: document.getElementById('leverandor'),
  'IT Jura': document.getElementById('it-jura'),
};

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

const securityBar    = document.getElementById('security-bar');
const stabilityBar   = document.getElementById('stability-bar');
const developmentBar = document.getElementById('development-bar');

const activeTaskHeadline   = document.getElementById('active-task-headline');
const activeTaskDescription= document.getElementById('active-task-description');
const activeTaskDetails    = document.getElementById('active-task-details');
const stepsList            = document.getElementById('steps-list');
const tasksList            = document.getElementById('tasks-list');

// Intro Modal
const introModal = document.getElementById('intro-modal');
const introOkBtn = document.getElementById('intro-ok-btn');
introOkBtn.addEventListener('click', () => {
  introModal.style.display = 'none';
  gameState.introModalOpen = false;
});

// Step Explanations
const stepExplanations = {
  Infrastruktur: "Du opgraderer serverinfrastrukturen for at undgå nedetid.",
  Informationssikkerhed: "Du installerer en patch for at forbedre sikkerheden.",
  Hospital: "Du koordinerer ændringen med hospitalets ledelse.",
  'Medicinsk Udstyr': "Du vedligeholder udstyrets software.",
  Cybersikkerhed: "Du håndterer trusler i netværket.",
  Leverandør: "Du bestiller udvikling hos leverandøren.",
  'IT Jura': "Du tjekker kontrakter og juridiske krav for it-projekter.",
};

const stepsPool = {
  stability: [
    ["Hospital", "Infrastruktur", "Hospital"],
    ["Infrastruktur", "Medicinsk Udstyr", "Hospital", "Leverandør"],
    ["Hospital", "IT Jura", "Infrastruktur"],
  ],
  development: [
    ["Hospital", "Medicinsk Udstyr", "Leverandør", "IT Jura"],
    ["Hospital", "Informationssikkerhed", "Hospital"],
    ["Leverandør", "Hospital", "Medicinsk Udstyr"],
  ],
  security: [
    ["Cybersikkerhed", "Hospital", "IT Jura"],
    ["Informationssikkerhed", "Cybersikkerhed", "IT Jura", "Hospital"],
    ["Leverandør", "Cybersikkerhed", "Hospital"],
  ]
};

const headlines = [
  "Netværkstjek",
  "Systemoptimering",
  "Sikkerhedspatch",
  "Brugerstyring",
  "Udstyrsopdatering",
  "Kontraktgennemgang",
];
const descs = {
  stability: "(Stabilitetsopgave) Minimer nedetid, hold systemet robust.",
  development: "(Udviklingsopgave) Implementér nye features, forbedr systemet.",
  security: "(Sikkerhedsopgave) Håndtér trusler, styrk beskyttelse.",
};

// Collisions
function checkCollisions() {
  for (const [locName, locEl] of Object.entries(locations)) {
    if (isColliding(player.element, locEl)) {
      handleLocationVisit(locName);
    }
  }
  requestAnimationFrame(checkCollisions);
}

function setupListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions);
}

function isColliding(aEl,bEl){
  const r1=aEl.getBoundingClientRect();
  const r2=bEl.getBoundingClientRect();
  return !(
    r1.top>r2.bottom||
    r1.bottom<r2.top||
    r1.left>r2.right||
    r1.right<r2.left
  );
}

function handleLocationVisit(locName){
  if(player.isVisiting===locName)return;
  player.isVisiting=locName;

  const locEl=locations[locName];
  locEl.classList.add('visited');
  setTimeout(()=>locEl.classList.remove('visited'),500);

  if(gameState.activeTask){
    const idx=gameState.activeTask.currentStep;
    if(idx<gameState.activeTask.steps.length){
      const needed=gameState.activeTask.steps[idx];
      if(locName===needed){
        gameState.activeTask.currentStep++;
        showPopup(`Rigtigt trin: ${locName}`, "info");
        if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
          completeTask();
        } else {
          updateStepsList();
        }
      }
    }
  }
  setTimeout(()=>{player.isVisiting=null;},1000);
}

function handleMovement(e){
  if(gameState.introModalOpen)return;
  switch(e.key.toLowerCase()){
    case 'arrowup':
    case 'w':
      player.position.top=Math.max(player.position.top-player.moveSpeed,0);
      break;
    case 'arrowdown':
    case 's':
      player.position.top=Math.min(player.position.top+player.moveSpeed,100);
      break;
    case 'arrowleft':
    case 'a':
      player.position.left=Math.max(player.position.left-player.moveSpeed,0);
      break;
    case 'arrowright':
    case 'd':
      player.position.left=Math.min(player.position.left+player.moveSpeed,100);
      break;
  }
  player.element.style.top= player.position.top+"%";
  player.element.style.left=player.position.left+"%";
}

// Tasks
function generateTask(){
  if(gameState.availableTasks.length>=10)return;
  const r=Math.random();
  let type='stability';
  if(r<0.33) type='stability'; 
  else if(r<0.66) type='development';
  else type='security';

  const stepOptions=stepsPool[type];
  const chosen= stepOptions[Math.floor(Math.random()*stepOptions.length)];
  const risk=Math.floor(Math.random()*3)+1;
  const reward=risk*100;
  const head=headlines[Math.floor(Math.random()*headlines.length)];

  const newTask={
    id: Date.now()+Math.floor(Math.random()*1000),
    taskType:type,
    headline:head,
    description:descs[type],
    steps:chosen,
    currentStep:0,
    urgency:getRandomUrgency(),
    riskLevel:risk,
    reward:reward,
  };
  gameState.availableTasks.push(newTask);
}
function getRandomUrgency(){
  const r=Math.random();
  if(r<0.3)return 'high';
  if(r<0.7)return 'medium';
  return 'low';
}

function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement("li");
    li.classList.add(t.urgency);
    li.innerHTML=`<strong>${t.headline}</strong>`;
    const desc=document.createElement("p");
    desc.classList.add("task-description");
    desc.style.display="none";
    desc.textContent=t.description;

    const commitBtn=document.createElement("button");
    commitBtn.classList.add("commit-button");
    commitBtn.textContent="Forpligt";
    commitBtn.addEventListener("click",(e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });

    li.addEventListener("click",()=>{
      document.querySelectorAll(".task-description").forEach(d=>{
        if(d!==desc)d.style.display="none";
      });
      desc.style.display=(desc.style.display==="none")?"block":"none";
    });

    li.appendChild(desc);
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

// Assign
function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Du har allerede en aktiv opgave!","error");
    return;
  }
  const idx=gameState.availableTasks.findIndex(x=>x.id===taskId);
  if(idx===-1)return;

  gameState.activeTask=gameState.availableTasks.splice(idx,1)[0];
  activeTaskHeadline.textContent=gameState.activeTask.headline;
  activeTaskDescription.textContent=gameState.activeTask.description;
  activeTaskDetails.textContent="";
  updateStepsList();
  renderTasks();
  checkImmediateStep();

  if(!gameState.shownFirstActivePopup){
    showPopup("Aktiv opgave valgt! Tjek trinlisten.","info",4000);
    gameState.shownFirstActivePopup=true;
  }
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li=document.createElement("li");
    let short=stepExplanations[locName]||"Du udfører en handling.";
    if(i<gameState.activeTask.currentStep){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    li.textContent=`Trin ${i+1}: [${locName}] ${short}`;
    stepsList.appendChild(li);
  });
}
function checkImmediateStep(){
  if(!gameState.activeTask)return;
  const i=gameState.activeTask.currentStep;
  if(i>=gameState.activeTask.steps.length)return;
  const needed=gameState.activeTask.steps[i];
  const locEl=locations[needed];
  if(locEl && isColliding(player.element, locEl)){
    gameState.activeTask.currentStep++;
    showPopup(`Du stod allerede på ${needed}!`,"info");
    if(gameState.activeTask.currentStep>=gameState.activeTask.steps.length){
      completeTask();
    }else{
      updateStepsList();
    }
  }
}

// Complete & Fail
function completeTask(){
  showPopup("Opgave fuldført!","success");
  gameState.tasksCompleted++;
  gameState.totalRewards+=gameState.activeTask.reward;
  applyEffects(gameState.activeTask);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}
function failTask(){
  showPopup("Opgave mislykkedes!","error");
  if(gameState.activeTask){
    gameState.security=Math.max(gameState.security-2,0);
    gameState.stability=Math.max(gameState.stability-2,0);
    gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-5,0);
  }
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDescription.textContent="";
  activeTaskDetails.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

/** Effects & Scoreboard **/
function applyEffects(task){
  switch(task.taskType){
    case 'stability':
      gameState.stability=Math.min(gameState.stability+5,150);
      gameState.development=Math.max(gameState.development-2,0);
      break;
    case 'development':
      gameState.development=Math.min(gameState.development+5,150);
      gameState.stability=Math.max(gameState.stability-2,0);
      break;
    case 'security':
      gameState.security=Math.min(gameState.security+5,150);
      gameState.stability=Math.max(gameState.stability-1,0);
      gameState.development=Math.max(gameState.development-1,0);
      break;
  }
  if(gameState.security<50||gameState.stability<50||gameState.development<50){
    gameState.hospitalSatisfaction=Math.max(gameState.hospitalSatisfaction-5,0);
  }else{
    gameState.hospitalSatisfaction=Math.min(gameState.hospitalSatisfaction+3,100);
  }
}
function updateScoreboard(){
  scoreboard.tasksCompleted.textContent=gameState.tasksCompleted;
  scoreboard.totalRewards.textContent=gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent=gameState.hospitalSatisfaction+"%";
  updateBars();
}
function updateBars(){
  const sec=Math.max(0,Math.min(gameState.security,150));
  const stab=Math.max(0,Math.min(gameState.stability,150));
  const dev=Math.max(0,Math.min(gameState.development,150));
  const maxW=80;
  securityBar.style.width=(sec/150)*maxW+"px";
  stabilityBar.style.width=(stab/150)*maxW+"px";
  developmentBar.style.width=(dev/150)*maxW+"px";
}

/** Popups **/
function showPopup(msg,type="success",duration=3000){
  const el=document.createElement("div");
  el.classList.add("popup");
  if(type==="error") el.classList.add("error");
  else if(type==="info") el.classList.add("info");
  el.textContent=msg;
  document.getElementById("popup-container").appendChild(el);
  setTimeout(()=>el.remove(),duration);
}

/** initGame **/
function initGame(){
  updateScoreboard();
  for(let i=0;i<2;i++){generateTask();}
  renderTasks();
  setupListeners();

  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
      renderTasks();
    }
  },10000);
}
initGame();
