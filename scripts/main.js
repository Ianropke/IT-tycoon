// scripts/main.js

// Globale var
let gameState = { ... }; // time, money, security, etc.

function updateScoreboard(){ ... }
function initGame(){
  // Saml opgaver:
  window.bigTasksData = [
    ...window.cybersikkerhedTasks,
    ...window.infrastrukturTasks,
    ...window.hospitalTasks
  ];
  // rest init
}
function generateTask(){ 
  // vælg random fra bigTasksData, 
  // sæt i availableTasks
}
function assignTask(taskId){ ... }
// etc. 
// + tutorialFlow, showCABModal, postCABTechnicalCheck, showPostCABFeedback ...

// til sidst
document.addEventListener('DOMContentLoaded', ()=>{
  // Din scoreboard og event-lister
  updateScoreboard();
  // start 2-3 tasks
  for(let i=0;i<3;i++){
    generateTask();
  }
  setInterval(...);
});
