// game.js

// Player and Resources
const player = {
  element: document.getElementById("player"),
  x: 200,
  y: 150,
  speed: 8,
};

const resources = { time: 100, budget: 500, personnel: 5 };
let score = { "IT Security": 0, "HR Department": 0 };

// Tasks
let activeTasks = [];
let availableTasks = [
  { description: "System Audit", taskGiver: "IT Security", risk: 3, reward: 50, requiredLocations: ["Legal Department", "Infrastructure"], progress: 0 },
  { description: "Employee Portal", taskGiver: "HR Department", risk: 2, reward: 30, requiredLocations: ["Infrastructure"], progress: 0 },
];

// DOM Elements
const taskList = document.getElementById("task-list");
const activeTaskDetails = document.getElementById("active-task-details");

// Update UI
function updateUI() {
  // Update score
  document.getElementById("it-security-score").innerText = score["IT Security"];
  document.getElementById("hr-score").innerText = score["HR Department"];

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
        <p>Progress: ${task.progress}/${task.requiredLocations.length}</p>
      `
        )
        .join("")
    : "No active tasks.";
}

// Commit to a Task
function commitToTask(index) {
  const task = availableTasks.splice(index, 1)[0];
  activeTasks.push(task);
  updateUI();
}

// Initialize
updateUI();
