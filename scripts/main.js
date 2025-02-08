/* main.js */
document.addEventListener("DOMContentLoaded", function() {
  const gameState = {
    time: 100,
    security: 0,
    development: 0,
    currentTask: null,      // Den opgave, der er forpligtet
    currentStepIndex: 0,
    tasksCompleted: 0,
    missionGoals: { security: 22, development: 22 },
    architectHelpUsed: false,
    tasks: []               // Kombinerede opgaver fra eksterne filer
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

  // Opdater dashboard – sørg for at "tid" aldrig bliver negativ
  function updateDashboard() {
    if (gameState.time < 0) gameState.time = 0;
    kpiChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    kpiChart.update();
  }

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

  // Render statiske lokationer (venstre side)
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

  function showIntro() {
    const introContent = `
      <h2>Velkommen til IT‑Tycoon</h2>
      <p>Du agerer IT‑forvalter med ansvar for at balancere tre KPI’er: Tid, Sikkerhed og Udvikling.</p>
      <p>Venstre side viser din KPI-graf med sprintmålet samt en liste med lokationer. Højre side viser den aktive opgave og potentielle opgaver.</p>
      <p>Når du vælger en opgave, skal du trykke på "Forpligt opgave" ved siden af opgaven for at starte den. Herefter vises en liste med alle de lokationer, du skal besøge.</p>
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
         - Højre side: Viser den aktive opgave samt potentielle opgaver.<br>
         Når du vælger en opgave, skal du trykke på "Forpligt opgave" ved siden af opgaven for at starte den. Herefter vises en liste med alle de lokationer, du skal besøge.</p>
      <p><strong>Spillets Mekanik:</strong><br>
         Når opgaven er forpligtet, skal du klikke på den korrekte lokation (venstre side) svarende til det næste trin i opgaven.</p>
      <p><strong>Planlægning og Strategi:</strong><br>
         Vær opmærksom på din tid – hvert valg påvirker KPI’erne. Målet er at balancere ressourcerne og nå sprintmålet.</p>
      <button id="endTutorial">Næste</button>
    `;
    openModal(tutorialContent);
    document.getElementById('endTutorial').addEventListener('click', function() {
      closeModal();
      renderPotentialTasks();
    });
  }

  // Render listen over potentielle opgaver – hver med to knapper: "Forpligt opgave" og "Arkitekthjælp"
  function renderPotentialTasks() {
    const potentialTasksDiv = document.getElementById('potentialTasks');
    potentialTasksDiv.innerHTML = '<h2>Potentielle Opgaver</h2>';
    gameState.tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      
      // Oplysning om opgaven
      const infoDiv = document.createElement('div');
      infoDiv.className = 'task-info';
      infoDiv.innerHTML = `<h3>${task.title}</h3><p>${task.shortDesc}</p>`;
      
      // "Forpligt opgave"-knap
      const commitBtn = document.createElement('button');
      commitBtn.textContent = 'Forpligt opgave';
      commitBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (gameState.currentTask !== null) {
          alert("Du har allerede forpligtet dig til en opgave!");
          return;
        }
        startTask(task);
        // BEHOVER IKKE at fjerne hele listen – den forbliver synlig
      });
      
      // "Arkitekthjælp"-knap for den potentielle opgave
      const helpBtn = document.createElement('button');
      helpBtn.textContent = 'Arkitekthjælp';
      helpBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        alert(task.narrativeIntro || "Ingen arkitekthjælp tilgængelig for denne opgave.");
      });
      
      taskItem.appendChild(infoDiv);
      taskItem.appendChild(commitBtn);
      taskItem.appendChild(helpBtn);
      potentialTasksDiv.appendChild(taskItem);
    });
  }

  // Starter den forpligtede opgave
  function startTask(task) {
    gameState.currentTask = task;
    gameState.currentStepIndex = 0;
    gameState.architectHelpUsed = false;
    renderActiveTask(task);
  }

  // Render den aktive opgave med en liste over alle opgavens lokationer og instruktion for det næste trin
  function renderActiveTask(task) {
    const activeTaskDiv = document.getElementById('activeTask');
    activeTaskDiv.innerHTML = `<h2>${task.title}</h2><p>${task.shortDesc}</p>`;
    if (task.steps && task.steps.length > 0) {
      const locationsListElem = document.createElement('ul');
      locationsListElem.id = 'taskLocations';
      task.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}. ${step.location} ${getIcon(step.location)}`;
        locationsListElem.appendChild(li);
      });
      activeTaskDiv.appendChild(locationsListElem);
      // Instruktion for det nuværende trin:
      const currentStep = task.steps[gameState.currentStepIndex];
      const instruction = document.createElement('p');
      instruction.innerHTML = `<strong>Vælg lokation:</strong> ${currentStep.location} ${getIcon(currentStep.location)}`;
      activeTaskDiv.appendChild(instruction);
    }
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

  // Vis modal med valgmuligheder for det aktuelle trin – inkluderer også "Mere info (trin)"
  function showStepChoices(step) {
    const choiceContent = `
      <h2>${step.stepDescription}</h2>
      <button id="choiceA">${step.choiceA.label} (${step.choiceA.text})</button>
      <button id="choiceB">${step.choiceB.label} (${step.choiceB.text})</button>
      <br><br>
      <button id="architectHelp">${gameState.architectHelpUsed ? 'Arkitekthjælp brugt' : 'Brug Arkitekthjælp'}</button>
      <button id="moreInfo">Mere info (trin)</button>
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
    document.getElementById('moreInfo').addEventListener('click', function() {
      alert(step.stepContext || "Ingen yderligere information tilgængelig.");
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
    } else {
      gameState.tasksCompleted++;
      alert("Opgaven er fuldført!");
      document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
      gameState.currentTask = null;
      gameState.currentStepIndex = 0;
      // Potentielle opgaver forbliver synlige – men commit-knapperne afviser et nyt valg, hvis en opgave er forpligtet
      renderPotentialTasks();
    }
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
