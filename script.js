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

// etc. (same final code)...

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
