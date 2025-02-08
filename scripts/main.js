/* main.js */
document.addEventListener("DOMContentLoaded", function() {
  const gameState = {
    time: 100,
    security: 0,
    development: 0,
    currentTask: null,
    currentStepIndex: 0,
    tasksCompleted: 0,
    missionGoals: { security: 22, development: 22 },
    architectHelpUsed: false,
    tasks: [],          // Kombinerede opgaver fra de eksterne filer
    selectedTask: null  // Valgt opgave før forpligtelse
  };

  // Kombiner tasks fra de eksterne task-filer
  gameState.tasks = [].concat(hospitalTasks, infrastrukturTasks, cybersikkerhedTasks);

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
      },
      {
        label: 'Sprintmål',
        data: [null, gameState.missionGoals.security, gameState.missionGoals.development],
        type: 'line',
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
        pointRadius: 0
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  modalClose.addEventListener('click', closeModal);

  function openModal(content) {
    modalBody.innerHTML = content;
    modal.classList.remove('hidden');
  }
  function closeModal() {
    modal.classList.add('hidden');
  }

  // Render statiske lokationer i venstre side
  const locationsList = ["hospital", "dokumentation", "leverandør", "infrastruktur", "it‑jura", "cybersikkerhed"];
  function renderLocations() {
    const locationsDiv = document.getElementById('locations');
    locationsDiv.innerHTML = "";
    locationsList.forEach(loc => {
      const btn = document.createElement('button');
      btn.className = 'location-button';
      btn.textContent = loc + " " + getIcon(loc);
      btn.addEventListener('click', function() {
        handleLocationClick(loc);
      });
      locationsDiv.appendChild(btn);
    });
  }
  renderLocations();

  function showIntro() {
    const introContent = `
      <h2>Velkommen til IT‑Tycoon</h2>
      <p>Du agerer IT‑forvalter med ansvar for at balancere tre KPI’er: Tid, Sikkerhed og Udvikling.</p>
      <p>Venstre side viser din KPI-graf med sprintmålet og en liste med lokationer. Højre side viser aktiv opgave og potentielle opgaver.</p>
      <p>Når du vælger en opgave, skal du først vælge den og trykke på "Forpligt opgave" for at starte opgaven.</p>
      <p>Når opgaven er forpligtet, vises en liste med alle de lokationer, du skal besøge i opgaven.</p>
      <p>Planlæg dine valg omhyggeligt – avancerede valg giver bedre resultater, men koster ekstra tid. Du kan bruge arkitekthjælp (én gang per opgave), hvis du er i tvivl.</p>
      <button id="startGame">Start Spillet</button>
    `;
    openModal(introContent);
    document.getElementById('startGame').addEventListener('click', function() {
      closeModal();
      showSprintGoal();
    });
  }

  function showSprintGoal() {
    const sprintContent = `
      <h2>Sprintmålsætning</h2>
      <p>Mål: Opnå mindst ${gameState.missionGoals.security} i sikkerhed og ${gameState.missionGoals.development} i udvikling, inden tiden løber ud.</p>
      <button id="continueTutorial">Fortsæt til Tutorial</button>
    `;
    openModal(sprintContent);
    document.getElementById('continueTutorial').addEventListener('click', function() {
      closeModal();
      startTutorial();
    });
  }

  function startTutorial() {
    const tutorialContent = `
      <h2>Tutorial</h2>
      <p><strong>Spillets Koncept:</strong><br>
         Du navigerer komplekse IT-systemer og balancerer KPI’erne: Tid, Sikkerhed og Udvikling. Dit mål er at nå sprintmålsætningen, som du kan følge i grafen.</p>
      <p><strong>UI-Layout:</strong><br>
         - Venstre side: Viser KPI-graf med sprintmål og en statisk liste med lokationer.<br>
         - Højre side: Viser den aktive opgave og potentielle opgaver.<br>
         Når du vælger en opgave, skal du trykke på "Forpligt opgave" for at starte den. Herefter vises en liste med alle de lokationer, du skal besøge.</p>
      <p><strong>Spillets Mekanik:</strong><br>
         Når opgaven er forpligtet, skal du klikke på den korrekte lokation (venstre side) svarende til det næste trin i opgaven.</p>
      <p><strong>Planlægning og Strategi:</strong><br>
         Vær opmærksom på din tid – hvert valg påvirker KPI’erne. Målet er at balancere ressourcerne og nå sprintmålsætningen.</p>
      <button id="endTutorial">Næste</button>
    `;
    openModal(tutorialContent);
    document.getElementById('endTutorial').addEventListener('click', function() {
      closeModal();
      renderPotentialTasks();
    });
  }

  function renderPotentialTasks() {
    const potentialTasksDiv = document.getElementById('potentialTasks');
    potentialTasksDiv.innerHTML = '<h2>Potentielle Opgaver</h2>';
    // Kun vis potentielle opgaver, hvis der ikke allerede er forpligtet en opgave
    if (gameState.currentTask !== null) return;
    gameState.tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `<h3>${task.title}</h3><p>${task.shortDesc}</p>`;
      taskItem.addEventListener('click', function() {
        // Marker denne opgave som valgt
        gameState.selectedTask = task;
        highlightSelectedTask(index);
        renderCommitButton();
      });
      potentialTasksDiv.appendChild(taskItem);
    });
  }

  function highlightSelectedTask(selectedIndex) {
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach((item, index) => {
      item.style.backgroundColor = (index === selectedIndex) ? '#d3d3d3' : '';
    });
  }

  function renderCommitButton() {
    // Fjern eksisterende forpligt-knap, hvis den findes
    let commitBtn = document.getElementById('commitButton');
    if (commitBtn) {
      commitBtn.remove();
    }
    commitBtn = document.createElement('button');
    commitBtn.id = 'commitButton';
    commitBtn.textContent = 'Forpligt opgave';
    commitBtn.addEventListener('click', function() {
      if (gameState.selectedTask) {
        startTask(gameState.selectedTask);
        // Når opgaven er forpligtet, fjernes listen over potentielle opgaver
        document.getElementById('potentialTasks').innerHTML = '';
      }
    });
    const potentialTasksDiv = document.getElementById('potentialTasks');
    potentialTasksDiv.appendChild(commitBtn);
  }

  function startTask(task) {
    gameState.currentTask = task;
    gameState.currentStepIndex = 0;
    gameState.architectHelpUsed = false;
    renderActiveTask(task);
  }

  function renderActiveTask(task) {
    const activeTaskDiv = document.getElementById('activeTask');
    activeTaskDiv.innerHTML = `<h2>${task.title}</h2><p>${task.shortDesc}</p>`;
    // Vis en liste med alle lokationer for denne opgave
    if (task.steps && task.steps.length > 0) {
      const locationsListElem = document.createElement('ul');
      locationsListElem.id = 'taskLocations';
      task.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}. ${step.location} ${getIcon(step.location)}`;
        locationsListElem.appendChild(li);
      });
      activeTaskDiv.appendChild(locationsListElem);
      // Vis instruktion for det nuværende trin:
      const currentStep = task.steps[gameState.currentStepIndex];
      const instruction = document.createElement('p');
      instruction.innerHTML = `<strong>Vælg lokation:</strong> ${currentStep.location} ${getIcon(currentStep.location)}`;
      activeTaskDiv.appendChild(instruction);
    }
  }

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

  // Håndter klik på en lokationsknap (venstre side)
  function handleLocationClick(clickedLocation) {
    if (!gameState.currentTask) {
      alert("Vælg en opgave og forpligt dig først!");
      return;
    }
    const currentStep = gameState.currentTask.steps[gameState.currentStepIndex];
    if (clickedLocation === currentStep.location) {
      showStepChoices(currentStep);
    } else {
      alert("Forkert lokation. Prøv igen.");
    }
  }

  function showStepChoices(step) {
    const choiceContent = `
      <h2>${step.stepDescription}</h2>
      ${step.stepContext ? `<p>${step.stepContext}</p>` : ''}
      <button id="choiceA">${step.choiceA.label} (${step.choiceA.text})</button>
      <button id="choiceB">${step.choiceB.label} (${step.choiceB.text})</button>
      <br><br>
      <button id="architectHelp">${gameState.architectHelpUsed ? 'Arkitekthjælp brugt' : 'Brug Arkitekthjælp'}</button>
    `;
    openModal(choiceContent);
    document.getElementById('choiceA').addEventListener('click', function() {
      applyChoice(step.choiceA);
      closeModal();
      proceedToNextStep();
    });
    document.getElementById('choiceB').addEventListener('click', function() {
      applyChoice(step.choiceB);
      closeModal();
      proceedToNextStep();
    });
    document.getElementById('architectHelp').addEventListener('click', function() {
      if (!gameState.architectHelpUsed) {
        gameState.architectHelpUsed = true;
        alert('Anbefalet valg: ' + step.choiceA.label);
      }
    });
  }

  function applyChoice(choice) {
    gameState.time -= choice.applyEffect.timeCost;
    if (choice.applyEffect.statChange.security) {
      gameState.security += choice.applyEffect.statChange.security;
    }
    if (choice.applyEffect.statChange.development) {
      gameState.development += choice.applyEffect.statChange.development;
    }
    updateDashboard();
    if (gameState.time <= 0) {
      alert("Ikke nok tid! Spillet slutter.");
      location.reload();
    }
  }

  function proceedToNextStep() {
    const task = gameState.currentTask;
    if (gameState.currentStepIndex < task.steps.length - 1) {
      gameState.currentStepIndex++;
      renderActiveTask(task);
      // Ingen pop-up for næste trin – blot opdateres instruktionen
    } else {
      gameState.tasksCompleted++;
      alert("Opgaven er fuldført!");
      document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
      gameState.currentTask = null;
      gameState.currentStepIndex = 0;
      // Tillad nu valg af ny opgave
      renderPotentialTasks();
    }
  }

  function updateDashboard() {
    kpiChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    kpiChart.update();
  }

  function showInspectAndAdapt() {
    const inspectContent = `
      <h2>Inspect & Adapt</h2>
      <p>Sikkerhed: ${gameState.security} (mål: ${gameState.missionGoals.security})</p>
      <p>Udvikling: ${gameState.development} (mål: ${gameState.missionGoals.development})</p>
      <button id="endGame">Afslut Spillet</button>
    `;
    openModal(inspectContent);
    document.getElementById('endGame').addEventListener('click', function() {
      closeModal();
      alert("Tak for spillet!");
      location.reload();
    });
  }

  showIntro();
});
