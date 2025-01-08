const player = document.getElementById("player");
const locations = {
  dispatch: document.getElementById("dispatch"),
  infrastructure: document.getElementById("infrastructure"),
  legalDept: document.getElementById("legal-dept"),
  vendors: document.getElementById("vendors"),
};
const taskList = document.getElementById("tasks-list");
const activeTask = document.getElementById("active-task");
const completeTaskButton = document.getElementById("complete-task");
const scores = {
  itSecurity: document.getElementById("it-security-score"),
  hr: document.getElementById("hr-score"),
  total: document.getElementById("total-score"),
};

let activeTaskData = null;
let availableTasks = [];
let playerPosition = { x: 25, y: 50 }; // Percentage position

function updatePlayerPosition() {
  player.style.left = `${playerPosition.x}%`;
  player.style.top = `${playerPosition.y}%`;
}

function checkLocation() {
  Object.keys(locations).forEach((key) => {
    const rect = locations[key].getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < rect.right &&
      playerRect.right > rect.left &&
      playerRect.top < rect.bottom &&
      playerRect.bottom > rect.top
    ) {
      onEnterLocation(key);
    }
  });
}

function onEnterLocation(location) {
  if (location === "dispatch" && availableTasks.length === 0) {
    taskList.innerHTML = "Loading tasks...";
    setTimeout(() => {
      availableTasks = [
        { name: "System Audit", giver: "IT Security", steps: ["Legal Dept", "Infrastructure"], risk: 3, reward: 50 },
        { name: "Employee Portal", giver: "HR Department", steps: ["Infrastructure"], risk: 2, reward: 30 },
      ];
      renderTasks();
    }, 3000);
  }

  if (activeTaskData && activeTaskData.steps[0] === location) {
    activeTaskData.steps.shift();
    if (activeTaskData.steps.length === 0) {
      completeTaskButton.disabled = false;
    }
    highlightLocation(location);
  }
}

function highlightLocation(location) {
  locations[location].style.backgroundColor = "green";
  setTimeout(() => {
    locations[location].style.backgroundColor = "#444";
  }, 1000);
}

function renderTasks() {
  taskList.innerHTML = "";
  availableTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `
      <strong>${task.name}</strong><br>
      Giver: ${task.giver}<br>
      Risk: ${task.risk}, Reward: ${task.reward}<br>
      Steps: ${task.steps.join(" → ")}
      <button onclick="commitTask(${index})">Commit</button>
    `;
    taskDiv.classList.add("task");
    taskList.appendChild(taskDiv);
  });
}

function commitTask(index) {
  activeTaskData = availableTasks.splice(index, 1)[0];
  activeTask.innerHTML = `
    <strong>${activeTaskData.name}</strong><br>
    Giver: ${activeTaskData.giver}<br>
    Steps: ${activeTaskData.steps.join(" → ")}
  `;
  renderTasks();
}

completeTaskButton.addEventListener("click", () => {
  if (!activeTaskData) return;

  const score = parseInt(scores[activeTaskData.giver.toLowerCase().replace(" ", "")].innerText) || 0;
  scores[activeTaskData.giver.toLowerCase().replace(" ", "")].innerText = score + activeTaskData.reward;
  scores.total.innerText = parseInt(scores.total.innerText) + activeTaskData.reward;

  activeTaskData = null;
  activeTask.innerHTML = "No active tasks.";
  completeTaskButton.disabled = true;
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      playerPosition.y = Math.max(5, playerPosition.y - 5);
      break;
    case "ArrowDown":
      playerPosition.y = Math.min(95, playerPosition.y + 5);
      break;
    case "ArrowLeft":
      playerPosition.x = Math.max(5, playerPosition.x - 5);
      break;
    case "ArrowRight":
      playerPosition.x = Math.min(95, playerPosition.x + 5);
      break;
  }
  updatePlayerPosition();
  checkLocation();
});

updatePlayerPosition();
