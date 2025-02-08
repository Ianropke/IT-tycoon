/* main.js */
document.addEventListener("DOMContentLoaded", function() {
  const gameState = {
    time: 100,
    security: 0,
    development: 0,
    currentTask: null,
    tasksCompleted: 0,
    missionGoals: { security: 22, development: 22 },
    architectHelpUsed: false,
    tasks: [] // Samlet liste over alle opgaver
  };

  // Kombiner tasks fra de tre task-filer
  gameState.tasks = [].concat(hospitalTasks, infrastrukturTasks, cybersikkerhedTasks);

  // Initialiser Chart.js
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

  function showIntro() {
    const introContent = `
      <h2>Velkommen til IT‑Tycoon</h2>
      <p>Du agerer IT‑forvalter med ansvar for at balancere tre centrale KPI’er: Tid, Sikkerhed og Udvikling.</p>
      <p>På venstre side ser du en graf, der viser dine nuværende KPI‑værdier med en rød linje, der markerer sprintmålet.</p>
      <p>Under grafen finder du en række lokationer – hver repræsenterer et trin i en opgave. Klik på en lokation for at udføre handlingen.</p>
      <p>På højre side vises din aktive opgave øverst, mens en liste med potentielle opgaver vises nedenunder.</p>
      <p>Planlæg dine valg omhyggeligt: Avancerede valg giver bedre resultater, men koster mere tid. Du kan bruge arkitekthjælp én gang per opgave til at få anbefalinger.</p>
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
         Du navigerer komplekse IT-systemer og balancerer KPI’erne: Tid, Sikkerhed og Udvikling. Dit mål er at opnå sprintmålsætningen, som du altid kan følge i grafen.</p>
      <p><strong>UI-Layout:</strong><br>
         - Venstre side: En graf med dine KPI-værdier og en rød linje for sprintmålet. Under grafen er lokationer, der repræsenterer opgavens trin.<br>
         - Højre side: Den aktive opgave vises øverst med detaljer om det aktuelle trin, mens en liste med potentielle opgaver vises nedenunder.</p>
      <p><strong>Spillets Mekanik:</strong><br>
         Ved hvert trin vælger du mellem to muligheder (Choice A og Choice B). Avancerede valg giver bedre effekter, men koster ekstra tid. Brug arkitekthjælp, hvis du er i tvivl (én gang per opgave).</p>
      <p><strong>Planlægning og Strategi:</strong><br>
         Hold øje med din tid. Hvert valg påvirker dine KPI’er. Målet er at balancere dine ressourcer og nå sprintmålsætningen, før tiden løber ud.</p>
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
    gameState.tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `<h3>${task.title}</h3><p>${task.shortDesc}</p>`;
      taskItem.addEventListener('click', function() {
        startTask(task);
      });
      potentialTasksDiv.appendChild(taskItem);
    });
  }

  function startTask(task) {
    gameState.currentTask = task;
    gameState.architectHelpUsed = false;
    renderActiveTask(task);
  }

  function renderActiveTask(task) {
    const activeTaskDiv = document.getElementById('activeTask');
    activeTaskDiv.innerHTML = `<h2>${task.title}</h2><p>${task.shortDesc}</p>`;
    const stepsDiv = document.createElement('div');
    stepsDiv.id = 'taskSteps';
    task.steps.forEach((step, stepIndex) => {
      const btn = document.createElement('button');
      btn.className = 'location-button';
      btn.textContent = step.location + ' ' + getIcon(step.location);
      btn.addEventListener('click', function() {
        handleStep(step, stepIndex);
      });
      stepsDiv.appendChild(btn);
    });
    activeTaskDiv.appendChild(stepsDiv);
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
    
    document.getElementById('choiceA').addEventListener('click', function() {
      applyChoice(step.choiceA);
      closeModal();
      proceedToNextStep(step, stepIndex);
    });
    document.getElementById('choiceB').addEventListener('click', function() {
      applyChoice(step.choiceB);
      closeModal();
      proceedToNextStep(step, stepIndex);
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

  function proceedToNextStep(step, currentStepIndex) {
    const task = gameState.currentTask;
    if (currentStepIndex < task.steps.length - 1) {
      alert(`Gå til næste trin (${currentStepIndex + 2} af ${task.steps.length})`);
    } else {
      gameState.tasksCompleted++;
      alert("Opgaven er fuldført!");
      renderPotentialTasks();
      document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
      if (gameState.tasksCompleted % 10 === 0) {
        showInspectAndAdapt();
      }
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
