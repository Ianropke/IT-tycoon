function createRandomTask() {
  // Task descriptions
  const taskDescriptions = [
    "Fix EHR bug",
    "Upgrade LIMS system",
    "Compliance with GDPR",
    "Implement new server",
    "Address cybersecurity vulnerability",
    "Legal approval for vendor contract",
  ];

  // Randomize task details
  const randomDescription = taskDescriptions[Math.floor(Math.random() * taskDescriptions.length)];
  const steps = randomizeSteps();
  const risk = calculateRisk();
  const giver = pickTaskGiver();

  // Create and return the task object
  return {
    id: generateId(),
    description: randomDescription,
    steps,
    stepKeywords: steps, // Alias for location matching
    currentStep: 0,
    risk,
    giver,
    status: "New",
    committed: false,
    isFeature: randomDescription.includes("Upgrade") || randomDescription.includes("Implement"),
  };
}

function randomizeSteps() {
  // Possible locations for task steps
  const locations = ["hospital", "infrastructure", "cybersecurity", "infoSec", "legal"];
  
  // Random number of steps between 2 and 5
  const stepCount = Math.floor(Math.random() * 4) + 2;

  // Randomize step locations
  return Array.from({ length: stepCount }, () => locations[Math.floor(Math.random() * locations.length)]);
}

function calculateRisk() {
  // Risk = likelihood * consequence
  const likelihood = Math.floor(Math.random() * 10) + 1; // 1–10
  const consequence = Math.floor(Math.random() * 10) + 1; // 1–10
  return likelihood * consequence;
}

function pickTaskGiver() {
  // Possible stakeholders
  const givers = ["hospital", "infrastructure", "cybersecurity", "informationSecurity", "legal"];
  return givers[Math.floor(Math.random() * givers.length)];
}

function getTaskById(taskId) {
  // Retrieve a task by its unique ID
  return window.globalTasks.find((task) => task.id === taskId);
}

function commitToTask(taskId) {
  // Commit to a task
  const task = getTaskById(taskId);
  if (task && !task.committed) {
    task.committed = true;
    task.status = "In Progress";
    console.log(`Task "${task.description}" committed.`);
  }
}

function advanceTaskStep(taskId) {
  // Advance a task to its next step
  const task = getTaskById(taskId);
  if (task && task.currentStep < task.steps.length) {
    task.currentStep += 1;

    if (task.currentStep === task.steps.length) {
      task.status = "Ready to finalize";
    }

    console.log(`Task "${task.description}" advanced to step ${task.currentStep}.`);
  }
}

function finalizeTask(taskId) {
  // Finalize a task
  const task = getTaskById(taskId);
  if (task && task.status === "Ready to finalize") {
    task.status = "Done";

    // Award points for completing the task
    window.playerScore += task.risk; // Bonus points based on risk
    window.giverScoreboard[task.giver] += 10; // Reward stakeholder satisfaction

    // Remove the task from the global list
    window.globalTasks = window.globalTasks.filter((t) => t.id !== taskId);

    console.log(`Task "${task.description}" finalized. Points awarded: ${task.risk}.`);
  }
}

// Utility to generate unique task IDs
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
