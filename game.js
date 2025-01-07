// game.js

// Player and Resources
const player = {
  element: document.getElementById("player"),
  x: 400,
  y: 300,
  speed: 10, // Faster speed
};

const resources = { time: 100, budget: 500, personnel: 5 };
let score = 0;

// Tasks
let activeTasks = [];
let availableTasks = [
  { description: "System Audit", taskGiver: "IT Security", risk: 3, reward: 50, requiredLocations: ["Legal Department", "Infrastructure"], progress: 0 },
  { description: "Employee Portal", taskGiver: "HR", risk: 2, reward: 30, requiredLocations: ["Infrastructure"], progress: 0 },
];

// DOM Elements
const taskList = document.getElementById("task-list");
const activeTaskDetails = document.getElementById("active-task-details");
const scoreDisplay = document.getElementById("score-display");

// Update UI
function updateUI() {
  // Update score
  scoreDisplay.innerText = `Score: ${score}`;

  // Available Tasks
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

  // Active Tasks
  activeTaskDetails.innerHTML = activeTasks.length
    ? activeTasks
        .map(
          (task) => `
        <strong>${task.description}</strong>
        <p>Giver: ${task.taskGiver}</p>
        <p>Progress: ${task.progress}/${task.requiredLocations.length}</p>
      `
        )
        .join("")
    : "<p>No active tasks.</p>";
}

// Commit to Task
function commitToTask(index) {
  const task = availableTasks.splice(index, 1)[0];
  activeTasks.push(task);
  score += task.reward;
  updateUI();
}

// Movement
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") player.y -= player.speed;
  if (event.key === "ArrowDown") player.y += player.speed;
  if (event.key === "ArrowLeft") player.x -= player.speed;
  if (event.key === "ArrowRight") player.x += player.speed;
  player.element.style.left = `${player.x}px`;
  player.element.style.top = `${player.y}px`;
});

updateUI();
