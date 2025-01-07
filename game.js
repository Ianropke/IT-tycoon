// game.js

// Player object
const player = {
  element: document.getElementById("player"),
  x: 400,
  y: 300,
  speed: 5,
};

// Resources and tasks
const resources = { time: 100, budget: 500, personnel: 5 };
let tasks = [];
let activeTasks = [];
const availableTasks = [
  {
    description: "System Audit",
    taskGiver: "IT Security",
    requiredLocations: ["Legal Department", "Infrastructure", "Vendors"],
    progress: 0,
  },
  {
    description: "Employee Portal Setup",
    taskGiver: "HR Department",
    requiredLocations: ["Infrastructure", "Vendors", "Legal Department"],
    progress: 0,
  },
  {
    description: "Accounting Software Integration",
    taskGiver: "Finance Department",
    requiredLocations: ["Vendors", "Legal Department", "Infrastructure"],
    progress: 0,
  },
];

// DOM elements
const taskList = document.getElementById("task-list");
const resourcesPanel = document.getElementById("resources");

// Update UI
function updateUI() {
  // Update tasks
  taskList.innerHTML = "";
  activeTasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `
      <strong>${task.description}</strong> (Giver: ${task.taskGiver})
      <br>Progress: ${task.progress}/${task.requiredLocations.length}
    `;
    taskList.appendChild(taskDiv);
  });

  // Update resources
  resourcesPanel.textContent = `Time: ${resources.time}, Budget: ${resources.budget}, Personnel: ${resources.personnel}`;
}

// Player movement
function movePlayer(event) {
  if (event.key === "ArrowUp") player.y -= player.speed;
  if (event.key === "ArrowDown") player.y += player.speed;
  if (event.key === "ArrowLeft") player.x -= player.speed;
  if (event.key === "ArrowRight") player.x += player.speed;

  // Update player position
  player.element.style.left = `${player.x}px`;
  player.element.style.top = `${player.y}px`;

  checkLocationInteraction();
}

// Check if the player is near a location
function checkLocationInteraction() {
  const locations = document.querySelectorAll(".location");
  locations.forEach((location) => {
    const rect = location.getBoundingClientRect();
    const playerRect = player.element.getBoundingClientRect();

    if (
      playerRect.left < rect.right &&
      playerRect.right > rect.left &&
      playerRect.top < rect.bottom &&
      playerRect.bottom > rect.top
    ) {
      handleLocationInteraction(location.dataset.name);
    }
  });
}

// Handle interaction with a location
function handleLocationInteraction(locationName) {
  if (locationName === "Dispatch") {
    loadNewTasks();
  } else if (activeTasks.length > 0) {
    const currentTask = activeTasks[0];
    const nextLocation = currentTask.requiredLocations[currentTask.progress];
    if (nextLocation === locationName) {
      currentTask.progress++;
      resources.time -= 10;
      resources.budget -= 20;

      if (currentTask.progress === currentTask.requiredLocations.length) {
        alert(`Task "${currentTask.description}" by ${currentTask.taskGiver} completed!`);
        activeTasks.shift(); // Remove completed task
      }

      updateUI();
    }
  }
}

// Load new tasks from the dispatch location
function loadNewTasks() {
  if (tasks.length === 0 && availableTasks.length > 0) {
    tasks = availableTasks.splice(0, 2); // Load two new tasks
    activeTasks.push(...tasks);
    tasks = [];
    updateUI();
    alert("New tasks loaded!");
  }
}

// Initialize game
document.addEventListener("keydown", movePlayer);
updateUI();
