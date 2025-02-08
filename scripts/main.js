// Vent på, at DOM’en er klar
document.addEventListener("DOMContentLoaded", function() {
  // Opret et gameState-objekt til at holde styr på spillets tilstand
  const gameState = {
    time: 100,
    security: 0,
    development: 0,
    currentTask: null,
    tasksCompleted: 0,
    missionGoals: { security: 22, development: 22 },
    architectHelpUsed: false
  };

  // Initialiser Chart.js-dashboardet
  const ctx = document.getElementById('kpiChart').getContext('2d');
  const kpiChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Tid', 'Sikkerhed', 'Udvikling'],
      datasets: [{
        label: 'KPI',
        data: [gameState.time, gameState.security, gameState.development],
        backgroundColor: ['#f39c12', '#27ae60', '#8e44ad']
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Modal-håndtering
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  modalClose.addEventListener('click', () => closeModal());

  function openModal(content) {
    modalBody.innerHTML = content;
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  // 1. Intro-modal: Spillets introduktion
  function showIntro() {
    const introContent = `
      <h2>Velkommen til IT‑Tycoon</h2>
      <p>Som IT‑forvalter skal du navigere i komplekse IT‑systemer og balancere KPI’er (Tid, Sikkerhed og Udvikling).</p>
      <button id="startGame">Start Spillet</button>
    `;
    openModal(introContent);
    document.getElementById('startGame').addEventListener('click', () => {
      closeModal();
      showSprintGoal();
    });
  }

  // 2. Sprint Goal-modal
  function showSprintGoal() {
    const sprintContent = `
      <h2>Sprintmålsætning</h2>
      <p>Målet er at opnå mindst ${gameState.missionGoals.security} i sikkerhed og ${gameState.missionGoals.development} i udvikling.</p>
      <button id="continueTutorial">Fortsæt</button>
    `;
    openModal(sprintContent);
    document.getElementById('continueTutorial').addEventListener('click', () => {
      closeModal();
      startTutorial();
    });
  }

  // 3. Tutorial-modal
  function startTutorial() {
    const tutorialContent = `
      <h2>Tutorial</h2>
      <p>Her gennemgår du spillets mekanik. Hvert trin i en opgave består af et valg mellem to muligheder – et avanceret valg (Choice A) og et hurtigere valg (Choice B). Vær opmærksom på, at avancerede valg koster ekstra tid, men giver bedre effekter.</p>
      <button id="endTutorial">Næste</button>
    `;
    openModal(tutorialContent);
    document.getElementById('endTutorial').addEventListener('click', () => {
      closeModal();
      loadTasks();
    });
  }

  // 4. Indlæs opgaver – her anvendes eksempelvis hospitalTasks fra hospitalTasks.js
  function loadTasks() {
    // I dette eksempel benyttes hospitalTasks-arrayet, som er defineret i hospitalTasks.js
    const tasks = hospitalTasks;
    renderTaskList(tasks);
  }

  // Render opgavelisten i højre kolonne
  function renderTaskList(tasks) {
    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = '<h2>Mulige opgaver</h2>';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `<h3>${task.title}</h3><p>${task.shortDesc}</p>`;
      taskItem.addEventListener('click', () => {
        startTask(task);
      });
      taskListDiv.appendChild(taskItem);
    });
  }

  // Start en valgt opgave
  function startTask(task) {
    gameState.currentTask = task;
    gameState.architectHelpUsed = false;
    renderActiveTask(task);
  }

  // Vis den aktive opgave med dens trin
  function renderActiveTask(task) {
    const activeTaskDiv = document.getElementById('activeTask');
    activeTaskDiv.innerHTML = `<h2>${task.title}</h2><p>${task.shortDesc}</p>`;
    // Opret en knap for hvert trin, baseret på den unikke lokation
    const stepsDiv = document.createElement('div');
    stepsDiv.id = 'taskSteps';
    task.steps.forEach((step, stepIndex) => {
      const btn = document.createElement('button');
      btn.className = 'location-button';
      btn.textContent = step.location + ' ' + getIcon(step.location);
      btn.addEventListener('click', () => {
        handleStep(step, stepIndex);
      });
      stepsDiv.appendChild(btn);
    });
    activeTaskDiv.appendChild(stepsDiv);
  }

  // Returner en emoji-ikon baseret på lokation
  function getIcon(location) {
    const icons = {
      'hospital': '🏥',
      'dokumentation': '📄',
      'leverandør': '📦',
      'infrastruktur': '🔧',
      'it‑jura': '⚖️',
      'cybersikkerhed': '💻'
    };
    return icons[location] || '';
  }

  // Håndter et trin: vis en modal med de to valg (Choice A og Choice B)
  function handleStep(step, stepIndex) {
    const choiceContent = `
      <h2>${step.stepDescription}</h2>
      ${step.stepContext ? `<p>${step.stepContext}</p>` : ''}
      <button id="choiceA">${step.choiceA.label} (${step.choiceA.text})</button>
      <button id="choiceB">${step.choiceB.label} (${step.choiceB.text})</button>
      <br><br>
      <button id="architectHelp">${gameState.architectHelpUsed ? 'Arkitekthjælp brugt' : 'Brug Arkitekthjælp'}</button>
    `;
    openModal(choiceContent);
    
    document.getElementById('choiceA').addEventListener('click', () => {
      applyChoice(step.choiceA);
      closeModal();
      proceedToNextStep(stepIndex);
    });
    document.getElementById('choiceB').addEventListener('click', () => {
      applyChoice(step.choiceB);
      closeModal();
      proceedToNextStep(stepIndex);
    });
    document.getElementById('architectHelp').addEventListener('click', () => {
      if (!gameState.architectHelpUsed) {
        gameState.architectHelpUsed = true;
        // Eksempelvis vises en simpel vejledning; denne funktion kan udbygges
        alert('Arkitekthjælp: Anbefalet valg er ' + step.choiceA.label);
      }
    });
  }

  // Anvend effekterne fra et valg
  function applyChoice(choice) {
    gameState.time -= choice.applyEffect.timeCost;
    const change = choice.applyEffect.statChange;
    if (change.security) {
      gameState.security += change.security;
    }
    if (change.development) {
      gameState.development += change.development;
    }
    updateDashboard();
    // Vis øjeblikkelig feedback (her med console.log, men kan udvides med popups/animeret tekst)
    console.log(`Valg: ${choice.label} – Effekt: ${choice.text}`);
    // Hvis tiden løber ud, afslut spillet
    if (gameState.time <= 0) {
      alert("Ikke nok tid! Spillet slutter.");
      // Her kan du udvide med afslutningslogik
    }
  }

  // Gå videre til næste trin eller afslut opgaven, hvis alle trin er gennemført
  function proceedToNextStep(currentStepIndex) {
    const task = gameState.currentTask;
    if (currentStepIndex < task.steps.length - 1) {
      // For eksemplets skyld viser vi en simpel besked
      alert(`Gå til næste trin (${currentStepIndex + 2} af ${task.steps.length})`);
    } else {
      // Opgaven er fuldført
      gameState.tasksCompleted++;
      alert("Opgaven er fuldført!");
      // Efter 10 opgaver vises Inspect & Adapt-modalen
      if (gameState.tasksCompleted % 10 === 0) {
        showInspectAndAdapt();
      }
    }
  }

  // Opdater Chart.js-dashboardet med de aktuelle KPI-værdier
  function updateDashboard() {
    kpiChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    kpiChart.update();
  }

  // Inspect & Adapt-modal efter 10 opgaver
  function showInspectAndAdapt() {
    const inspectContent = `
      <h2>Inspect & Adapt</h2>
      <p>Sikkerhed: ${gameState.security} (mål: ${gameState.missionGoals.security})</p>
      <p>Udvikling: ${gameState.development} (mål: ${gameState.missionGoals.development})</p>
      <button id="endGame">Afslut Spillet</button>
    `;
    openModal(inspectContent);
    document.getElementById('endGame').addEventListener('click', () => {
      closeModal();
      alert("Tak for spillet!");
      // Her kan du implementere yderligere afslutningslogik
    });
  }

  // Start spillet med intro-modalen
  showIntro();
});
