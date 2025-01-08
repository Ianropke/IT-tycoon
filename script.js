// JavaScript for IT Tycoon Game Logic

// Player Object
const player = {
  element: document.getElementById('player'),
  position: { top: 50, left: 50 }, // Percentage
  moveSpeed: 2, // Percentage per key press
  isVisiting: null, // To prevent multiple triggers
};

// Task Descriptions Pool
const taskDescriptions = {
  'IT Security': [
    'Implement a new firewall to enhance network security.',
    'Conduct a security audit to identify vulnerabilities.',
    'Respond to a phishing attack targeting employees.',
  ],
  'HR Department': [
    'Upgrade the employee management system for better performance.',
    'Resolve access issues in the HR database.',
    'Integrate new recruitment tools into existing systems.',
  ],
  'Infrastructure': [
    'Upgrade the server infrastructure to support increased load.',
    'Perform routine maintenance on network switches.',
    'Install new backup solutions for critical data.',
  ],
  'Legal Department': [
    'Ensure all software licenses are up to date.',
    'Implement GDPR compliance measures across systems.',
    'Review and update data retention policies.',
  ],
  'Vendors': [
    'Approve the latest software patch from the vendor.',
    'Negotiate better SLA terms with the current vendor.',
    'Integrate the vendor’s new API into existing applications.',
  ],
  'Labs': [
    'Set up new laboratory information management systems (LIMS).',
    'Troubleshoot connectivity issues in diagnostic equipment.',
    'Deploy updates to the lab data analysis tools.',
  ],
  'Diagnostics': [
    'Enhance the diagnostic system’s data processing speed.',
    'Fix the integration between EHR and diagnostic tools.',
    'Implement new diagnostic software updates.',
  ],
};

// Task Headlines Pool
const taskHeadlines = {
  'IT Security': [
    'Firewall Implementation',
    'Security Audit',
    'Phishing Attack Response',
  ],
  'HR Department': [
    'Employee Management Upgrade',
    'HR Database Access Issue',
    'Recruitment Tools Integration',
  ],
  'Infrastructure': [
    'Server Infrastructure Upgrade',
    'Network Switch Maintenance',
    'Backup Solutions Installation',
  ],
  'Legal Department': [
    'Software License Compliance',
    'GDPR Compliance Implementation',
    'Data Retention Policy Review',
  ],
  'Vendors': [
    'Software Patch Approval',
    'SLA Negotiation',
    'API Integration with Vendor',
  ],
  'Labs': [
    'LIMS Setup',
    'Diagnostic Equipment Connectivity',
    'Lab Data Analysis Tools Update',
  ],
  'Diagnostics': [
    'Diagnostic System Speed Enhancement',
    'EHR-Diagnostic Tools Integration Fix',
    'Diagnostic Software Updates',
  ],
};

// Game State
const gameState = {
  tasksCompleted: 0,
  totalRewards: 0,
  departmentRewards: {
    'IT Security': 0,
    'HR Department': 0,
  },
  activeTask: null,
  availableTasks: [],
  systemUptime: 100,
  stakeholderSatisfaction: 100,
  compliance: 100,
};

// Locations (Removed Dispatch)
const locations = {
  Infrastructure: document.getElementById('infrastructure'),
  'Legal Department': document.getElementById('legal'),
  Vendors: document.getElementById('vendors'),
  Labs: document.getElementById('labs'), // Expanded Location
  Diagnostics: document.getElementById('diagnostics'), // Expanded Location
};

// UI Elements
const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  itSecurity: document.getElementById('it-security'),
  hrDepartment: document.getElementById('hr-department'),
  systemUptime: document.getElementById('system-uptime'),
  stakeholderSatisfaction: document.getElementById('stakeholder-satisfaction'),
  compliance: document.getElementById('compliance'),
};

const activeTaskDetails = document.getElementById('active-task-details');
const activeTaskHeadline = document.getElementById('active-task-headline'); // Added Headline Element
const activeTaskDescription = document.getElementById('active-task-description'); // Added Description Element
const tasksList = document.getElementById('tasks-list');
const popupContainer = document.getElementById('popup-container');

// Initialize Game
function initGame() {
  updateScoreboard();
  generateAvailableTasks(); // Initial Task Generation
  renderAvailableTasks();
  setupEventListeners();
  startTaskGenerator(); // Continuous Task Generation
  startTaskUrgencyEscalation();
  startSystemUptimeDecay();
}

// Update Scoreboard UI
function updateScoreboard() {
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent = gameState.totalRewards;
  scoreboard.itSecurity.textContent = gameState.departmentRewards['IT Security'];
  scoreboard.hrDepartment.textContent = gameState.departmentRewards['HR Department'];
  scoreboard.systemUptime.textContent = `${gameState.systemUptime.toFixed(1)}%`;
  scoreboard.stakeholderSatisfaction.textContent = `${gameState.stakeholderSatisfaction.toFixed(1)}%`;
  scoreboard.compliance.textContent = `${gameState.compliance.toFixed(1)}%`;
}

// Generate Random Tasks with Urgency and Descriptions
function generateAvailableTasks() {
  if (gameState.availableTasks.length >= 10) return; // Max 10 tasks
  const riskLevel = Math.floor(Math.random() * 3) + 1; // 1 to 3
  const reward = riskLevel * 100; // Example reward calculation
  const departments = Object.keys(gameState.departmentRewards);
  const department = departments[Math.floor(Math.random() * departments.length)];
  const steps = getRandomTaskSteps();
  const urgency = getRandomUrgency(); // Assign initial urgency
  const headline = getRandomHeadline(department); // Assign headline
  const description = getRandomDescription(department); // Assign description

  const task = {
    id: Date.now(),
    department,
    riskLevel,
    reward,
    steps,
    currentStep: 0,
    urgency, // Added urgency
    headline, // Added headline
    description, // Added description
  };

  gameState.availableTasks.push(task);
}

// Get Random Task Steps (Sequence of Locations)
function getRandomTaskSteps() {
  const locationKeys = Object.keys(locations);
  const stepsCount = Math.floor(Math.random() * 3) + 2; // 2 to 4 steps
  const steps = [];

  while (steps.length < stepsCount) {
    const loc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
    if (!steps.includes(loc)) {
      steps.push(loc);
    }
  }

  return steps;
}

// Get Random Urgency Level
function getRandomUrgency() {
  const rand = Math.random();
  if (rand < 0.3) return 'high';
  if (rand < 0.7) return 'medium';
  return 'low';
}

// Get Random Headline Based on Department
function getRandomHeadline(department) {
  const headlines = taskHeadlines[department] || [
    'General Task',
    'Standard Procedure',
    'Routine Maintenance',
  ];
  return headlines[Math.floor(Math.random() * headlines.length)];
}

// Get Random Description Based on Department
function getRandomDescription(department) {
  const descriptions = taskDescriptions[department] || [
    'Complete the assigned task efficiently.',
    'Ensure all requirements are met.',
    'Coordinate with relevant teams to accomplish the task.',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Render Available Tasks in UI
function renderAvailableTasks() {
  tasksList.innerHTML = '';
  if (gameState.availableTasks.length === 0) {
    tasksList.innerHTML = '<li>No available tasks.</li>';
    return;
  }

  gameState.availableTasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${task.headline}</strong><br>Reward: $${task.reward} - Risk: ${task.riskLevel}`;
    li.classList.add(task.urgency); // Add urgency class for color-coding

    // Create a description element
    const desc = document.createElement('p');
    desc.textContent = task.description;
    desc.classList.add('task-description');
    desc.style.display = 'none'; // Hidden by default

    // Create a commit button
    const commitButton = document.createElement('button');
    commitButton.textContent = 'Commit';
    commitButton.classList.add('commit-button');
    commitButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the description toggle
      assignTask(task.id);
    });

    // Toggle description on tap/click (excluding commit button)
    li.addEventListener('click', () => {
      // Hide all other descriptions
      document.querySelectorAll('.task-description').forEach(p => {
        if (p !== desc) p.style.display = 'none';
      });
      // Toggle current description
      desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
    });

    li.appendChild(desc);
    li.appendChild(commitButton); // Append commit button
    tasksList.appendChild(li);
  });
}

// Assign Task to Active Task
function assignTask(taskId) {
  if (gameState.activeTask) {
    showPopup('You already have an active task.', 'error');
    return;
  }

  const taskIndex = gameState.availableTasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) return;

  gameState.activeTask = gameState.availableTasks.splice(taskIndex, 1)[0];
  activeTaskDetails.textContent = formatActiveTask(gameState.activeTask);
  activeTaskHeadline.textContent = `Task ${gameState.activeTask.id}: ${gameState.activeTask.headline}`; // Set headline
  activeTaskDescription.textContent = gameState.activeTask.description; // Display description
  renderAvailableTasks();
  showPopup(`Assigned Task: ${gameState.activeTask.headline}`, 'success');
}

// Format Active Task Details
function formatActiveTask(task) {
  return `Task ${task.id} (${task.department}) - Reward: $${task.reward}`;
}

// Setup Keyboard and Collision Event Listeners
function setupEventListeners() {
  document.addEventListener('keydown', handleMovement);
  requestAnimationFrame(checkCollisions); // Start collision detection loop
}

// Handle Player Movement via Arrow Keys and WASD
function handleMovement(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      player.position.top = Math.max(player.position.top - player.moveSpeed, 0);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      player.position.top = Math.min(player.position.top + player.moveSpeed, 100);
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      player.position.left = Math.max(player.position.left - player.moveSpeed, 0);
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      player.position.left = Math.min(player.position.left + player.moveSpeed, 100);
      break;
    default:
      return;
  }
  updatePlayerPosition();
}

// Update Player's Position in the UI
function updatePlayerPosition() {
  player.element.style.top = `${player.position.top}%`;
  player.element.style.left = `${player.position.left}%`;
}

// Check for Collisions between Player and Locations
function checkCollisions() {
  for (const [name, location] of Object.entries(locations)) {
    if (isColliding(player.element, location)) {
      handleLocationVisit(name);
    }
  }
  requestAnimationFrame(checkCollisions); // Continue the loop
}

// Simple Collision Detection
function isColliding(playerEl, locationEl) {
  const playerRect = playerEl.getBoundingClientRect();
  const locationRect = locationEl.getBoundingClientRect();

  return !(
    playerRect.top > locationRect.bottom ||
    playerRect.bottom < locationRect.top ||
    playerRect.left > locationRect.right ||
    playerRect.right < locationRect.left
  );
}

// Handle Visiting a Location
function handleLocationVisit(locationName) {
  // Prevent multiple visits for the same collision
  if (player.isVisiting === locationName) return;
  player.isVisiting = locationName;

  // Visual Feedback
  const location = locations[locationName];
  location.classList.add('visited');
  setTimeout(() => location.classList.remove('visited'), 500);

  // If there's an active task, check the next step
  if (gameState.activeTask) {
    const currentStep = gameState.activeTask.steps[gameState.activeTask.currentStep];
    if (locationName === currentStep) {
      gameState.activeTask.currentStep += 1;
      showPopup(`Visited ${locationName}.`, 'success');
      if (gameState.activeTask.currentStep >= gameState.activeTask.steps.length) {
        completeTask();
      } else {
        activeTaskDetails.textContent = formatActiveTask(gameState.activeTask);
      }
    } else {
      showPopup('Wrong location! Task failed.', 'error');
      failTask();
    }
  }

  // Reset visit status after a short delay to allow re-visiting if needed
  setTimeout(() => {
    player.isVisiting = null;
  }, 1000);
}

// Complete the Active Task
function completeTask() {
  showPopup('Task Completed!', 'success');
  gameState.tasksCompleted += 1;
  gameState.totalRewards += gameState.activeTask.reward;
  gameState.departmentRewards[gameState.activeTask.department] += gameState.activeTask.reward;

  // Update new metrics
  gameState.systemUptime = Math.min(gameState.systemUptime + 1, 100); // Increment uptime
  gameState.stakeholderSatisfaction = Math.min(gameState.stakeholderSatisfaction + 2, 100); // Increment satisfaction
  gameState.compliance = Math.min(gameState.compliance + 1, 100); // Increment compliance

  gameState.activeTask = null;
  activeTaskDetails.textContent = 'No active task.';
  activeTaskHeadline.textContent = 'No active task.';
  activeTaskDescription.textContent = ''; // Clear description
  updateScoreboard();
}

// Fail the Active Task
function failTask() {
  gameState.activeTask = null;
  activeTaskDetails.textContent = 'No active task.';
  activeTaskHeadline.textContent = 'No active task.';
  activeTaskDescription.textContent = ''; // Clear description
  updateScoreboard();

  // Decrease metrics due to failure
  gameState.systemUptime = Math.max(gameState.systemUptime - 5, 0);
  gameState.stakeholderSatisfaction = Math.max(gameState.stakeholderSatisfaction - 10, 0);
  gameState.compliance = Math.max(gameState.compliance - 2, 0);
  showPopup('Task Failed!', 'error');
}

// Start Continuous Task Generation with Max 10 Tasks
function startTaskGenerator() {
  setInterval(() => {
    generateAvailableTasks();
    renderAvailableTasks();
    if (gameState.availableTasks.length > 0) {
      showPopup('New tasks available.', 'success');
    }
  }, 10000); // Increased interval from 5s to 10s
}

// Start Periodic Task Urgency Escalation
function startTaskUrgencyEscalation() {
  setInterval(() => {
    gameState.availableTasks.forEach(task => {
      if (task.urgency === 'low') {
        task.urgency = 'medium';
      } else if (task.urgency === 'medium') {
        task.urgency = 'high';
      }
      // High urgency remains high
    });
    renderAvailableTasks();
  }, 20000); // Increased interval from 10s to 20s
}

// Start System Uptime Decay Over Time
function startSystemUptimeDecay() {
  setInterval(() => {
    gameState.systemUptime = Math.max(gameState.systemUptime - 0.1, 0);
    updateScoreboard();
    if (gameState.systemUptime <= 0) {
      showPopup('System Uptime Critical!', 'error');
    }
  }, 60000); // Every 60 seconds
}

// Function to show popup notifications
function showPopup(message, type = 'success') {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  if (type === 'error') {
    popup.classList.add('error');
  }
  popup.textContent = message;
  popupContainer.appendChild(popup);

  // Remove popup after animation
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Start the Game
initGame();
