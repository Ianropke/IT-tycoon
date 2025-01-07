// game.js

// Player object
const player = {
  element: document.getElementById("player"),
  x: 400,
  y: 300,
  speed: 8, // Increased speed
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
const activeTaskDetails = document.getElementById("active-task-details");

// Update UI
function updateUI() {
  // Display available tasks
  taskList.innerHTML = "";
  availableTasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
      <strong>${task.description}</strong>
      <p>Giver: ${task.taskGiver}</p>
      <p>Risk: ${task.risk}, Reward: ${task.reward}</p>
      <p>Steps: ${task.requiredLocations.join(" → ")}</p>
      <button onclick="commitToTask(${index})">Commit</button>
    `;
    taskList.appendChild(taskDiv);
  });

  // Display active task details
  if (activeTasks.length > 0) {
    const task = activeTasks[0];
    activeTaskDetails.innerHTML = `
      <strong>${task.description}</strong>
      <p>Giver: ${task.taskGiver}</p>
      <p>Risk: ${task.risk}, Reward: ${task.reward}</p>
      <p>Progress: ${task.progress} / ${task.requiredLocations.length}</p>
      <p>Next Step: ${task.requiredLocations[task.progress]}</p>
    `;
  } else {
    activeTaskDetails.innerHTML = "<p>No active tasks.</p>";
  }
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

// Commit to a task
function commitToTask(taskIndex) {
  const task = availableTasks.splice(taskIndex, 1)[0];
  activeTasks.push(task);
  alert(`You committed to "${task.description}"`);
  updateUI();
}

// Check location interactions (same as before)

// Initialize game
document.addEventListener("keydown", movePlayer);
updateUI();
