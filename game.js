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
let activeTasks = [];
let availableTasks = [
  {
    description: "System Audit",
    taskGiver: "IT Security",
    risk: 3,
    reward: 50,
    requiredLocations: ["Legal Department", "Infrastructure", "Vendors"],
    progress: 0,
  },
  {
    description: "Employee Portal Setup",
    taskGiver: "HR Department",
    risk: 2,
    reward: 30,
    requiredLocations: ["Infrastructure", "Vendors", "Legal Department"],
    progress: 0,
  },
  {
    description: "Accounting Software Integration",
    taskGiver: "Finance Department",
    risk: 4,
    reward: 70,
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
  availableTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `
      <strong>${task.description}</strong> (Giver: ${task.taskGiver})
      <br>Risk: ${task.risk}, Reward: ${task.reward}
      <button onclick="commitToTask(${index})">Commit</button>
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
    // Tasks are already visible at Dispatch
    return;
  } else if (activeTasks.length > 0) {
    const currentTask = activeTasks[0];
    const nextLocation = currentTask.requiredLocations[currentTask.progress];
    if (nextLocation === locationName) {
      currentTask.progress++;
      resources.time -= 10;
      resources.budget -= currentTask.risk * 5; // Penalty for risk

      if (currentTask.progress === currentTask.requiredLocations.length) {
        alert(
          `Task "${currentTask.description}" by ${currentTask.taskGiver} completed! You earned ${currentTask.reward} budget.`
        );
        resources.budget += currentTask.reward; // Add reward
        activeTasks.shift(); // Remove completed task
      }

      updateUI();
    }
  }
}

// Commit to a task
function commitToTask(taskIndex) {
  const task = availableTasks.splice(taskIndex, 1)[0];
  activeTasks.push(task);
  alert(`You have committed to "${task.description}"`);
  updateUI();
}

// Initialize game
document.addEventListener("keydown", movePlayer);
updateUI();
