let tasks = [
    { name: "System Audit", giver: "IT Security", steps: ["Legal Dept", "Infrastructure"], risk: 3, reward: 50 },
    { name: "Employee Portal", giver: "HR Department", steps: ["Infrastructure"], risk: 2, reward: 30 },
];

let activeTask = null;
let scores = { "IT Security": 0, "HR Department": 0 };
let totalScore = 0;
const player = document.getElementById("player");

let dispatchTimer = null; // Timer to track 5 seconds on Dispatch

// Task Functions
function loadTasks() {
    const tasksList = document.getElementById("tasks-list");
    tasksList.innerHTML = ""; // Clear existing tasks
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <strong>${task.name}</strong><br>
            Giver: ${task.giver}<br>
            Risk: ${task.risk}, Reward: ${task.reward}<br>
            Steps: ${task.steps.join(" → ")}
            <button class="commit-btn" onclick="commitTask(${index})">Commit</button>
        `;
        tasksList.appendChild(taskDiv);
    });
}

function commitTask(index) {
    if (activeTask) {
        alert("You already have an active task!");
        return;
    }
    activeTask = tasks.splice(index, 1)[0];
    updateActiveTaskDisplay();
    loadTasks();
}

function updateActiveTaskDisplay() {
    const activeTaskDetails = document.getElementById("active-task-details");
    const completeTaskBtn = document.getElementById("completeTask");
    if (activeTask) {
        activeTaskDetails.innerHTML = `
            <strong>${activeTask.name}</strong><br>
            Giver: ${activeTask.giver}<br>
            Steps: ${activeTask.steps.join(" → ")}
        `;
        completeTaskBtn.disabled = false;
    } else {
        activeTaskDetails.innerHTML = "No active tasks.";
        completeTaskBtn.disabled = true;
    }
}

function completeTask() {
    if (activeTask) {
        scores[activeTask.giver] += activeTask.reward;
        totalScore += activeTask.reward;
        activeTask = null;
        updateScoreboard();
        updateActiveTaskDisplay();
    }
}

function updateScoreboard() {
    document.getElementById("scoreboard").innerHTML = `
        <p>IT Security: ${scores["IT Security"]}</p>
        <p>HR Department: ${scores["HR Department"]}</p>
        <p>Total: ${totalScore}</p>
    `;
}

// Player Movement and Interaction
document.addEventListener("keydown", (e) => {
    const step = 10;
    const rect = player.getBoundingClientRect();
    const parentRect = player.parentElement.getBoundingClientRect();
    if (e.key === "ArrowUp" && rect.top > parentRect.top) player.style.top = `${player.offsetTop - step}px`;
    if (e.key === "ArrowDown" && rect.bottom < parentRect.bottom) player.style.top = `${player.offsetTop + step}px`;
    if (e.key === "ArrowLeft" && rect.left > parentRect.left) player.style.left = `${player.offsetLeft - step}px`;
    if (e.key === "ArrowRight" && rect.right < parentRect.right) player.style.left = `${player.offsetLeft + step}px`;

    checkPlayerLocation();
});

function checkPlayerLocation() {
    const locations = document.querySelectorAll(".location");
    const playerRect = player.getBoundingClientRect();

    locations.forEach((location) => {
        const locationRect = location.getBoundingClientRect();
        if (
            playerRect.left < locationRect.right &&
            playerRect.right > locationRect.left &&
            playerRect.top < locationRect.bottom &&
            playerRect.bottom > locationRect.top
        ) {
            handleLocationVisit(location.id);
        }
    });
}

function handleLocationVisit(location) {
    if (location === "dispatch") {
        if (!dispatchTimer) {
            dispatchTimer = setTimeout(() => {
                loadTasks();
            }, 5000);
        }
    } else {
        clearTimeout(dispatchTimer);
        dispatchTimer = null;
    }

    if (activeTask && activeTask.steps[0] === capitalize(location)) {
        activeTask.steps.shift();
        if (activeTask.steps.length === 0) {
            alert("Task completed! Click 'Complete Task' to finalize.");
        }
        updateActiveTaskDisplay();
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Initialize Game
updateActiveTaskDisplay();
updateScoreboard();
