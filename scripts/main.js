/* main.js */
document.addEventListener("DOMContentLoaded", function() {
  // Spillet starter med 30 tidspoint
  const gameState = {
    time: 30,
    security: 0,
    development: 0,
    currentTask: null,      // Den forpligtede opgave
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

  // Sørg for, at tid ikke bliver negativ
  function updateDashboard() {
    if (gameState.time < 0) gameState.time = 0;
    kpiChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    kpiChart.update();
  }

  // Vis en kort feedback (toast) for tidsforbruget
  function showFeedback(message) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback';
    feedbackDiv.textContent = message;
    document.body.appendChild(feedbackDiv);
    setTimeout(() => {
      feedbackDiv.classList.add('fade-out');
      setTimeout(() => feedbackDiv.remove(), 1000);
    }, 1500);
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

  // Introduktion med SAFe/PI Planning
  function showIntro() {
    const introContent = `
      <h2>Velkommen til IT‑Tycoon</h2>
      <p>Du agerer IT‑forvalter under SAFe og starter med PI Planning, hvor målsætningen for udvikling og sikkerhed fastsættes.</p>
      <p>Venstre side viser din KPI-graf med sprintmålet samt en liste med lokationer. Højre side viser den aktive opgave og potentielle opgaver.</p>
      <p>Når du vælger en opgave, skal du trykke på "Forpligt opgave" ved siden af opgaven. Herefter vises en modal, hvor du skal vælge fokus: <strong>Udvikling</strong> eller <strong>Sikkerhed</strong>.</p>
      <p>Hvert valg i et trin viser sin tidsomkostning – den komplette løsning giver en straf på −2 tid (dette vises tydeligt), mens den hurtige løsning trækker 0 tid. Afvejningen sker mellem den positive effekt på din valgte KPI (udvikling eller sikkerhed) og tidsforbruget.</p>
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
      <h2>PI Planning</h2>
      <p>Målsætning: Opnå mindst ${gameState.missionGoals.security} i sikkerhed og ${gameState.missionGoals.development} i udvikling inden for sprintet.</p>
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
         Du navigerer komplekse IT-systemer og balancerer dine KPI’er: Tid, Sikkerhed og Udvikling. Dit mål er at nå sprintmålsætningen, som du kan følge i grafen.</p>
      <p><strong>UI-Layout:</strong><br>
         - Venstre side: Viser din KPI-graf med sprintmål og en statisk liste med lokationer.<br>
         - Højre side: Viser den aktive opgave samt potentielle opgaver.<br>
         Når du vælger en opgave, skal du trykke på "Forpligt opgave" ved siden af opgaven, hvorefter du vælger mellem fokus på <strong>Udvikling</strong> eller <strong>Sikkerhed</strong> for opgaven.</p>
      <p><strong>Spillets Mekanik:</strong><br>
         Når opgaven er forpligtet, skal du i hvert trin vælge den korrekte lokation (venstre side). Ved valg af den komplette løsning trækkes fast −2 tid, mens den hurtige løsning trækker 0 tid. Afvejningen sker mellem den positive effekt (på din valgte KPI) og tidsforbruget.</p>
      <p><strong>Planlægning og Strategi:</strong><br>
         Vær opmærksom på din tid – hvert valg påvirker dine KPI’er. Målet er at balancere ressourcerne og nå sprintmålet.</p>
      <button id="endTutorial">Næste</button>
    `;
    openModal(tutorialContent);
    document.getElementById('endTutorial').addEventListener('click', function() {
      closeModal();
      renderPotentialTasks();
    });
  }

  // Render listen over potentielle opgaver – hver med "Forpligt opgave" og "Arkitekthjælp"-knapper
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
          openModal("<p>Du har allerede forpligtet dig til en opgave!</p>");
          return;
        }
        // Før opgaven startes, skal spilleren vælge fokus: Udvikling eller Sikkerhed.
        openModal(`
          <h2>Vælg Fokus</h2>
          <p>For denne opgave skal du vælge, om du vil fokusere på <strong>Udvikling</strong> eller <strong>Sikkerhed</strong>.</p>
          <button id="focusDev">Udvikling</button>
          <button id="focusSec">Sikkerhed</button>
        `);
        document.getElementById('focusDev').addEventListener('click', function() {
          task.focus = "udvikling";
          closeModal();
          startTask(task);
        });
        document.getElementById('focusSec').addEventListener('click', function() {
          task.focus = "sikkerhed";
          closeModal();
          startTask(task);
        });
      });
      
      // "Arkitekthjælp"-knap – åbner en modal med arkitekthjælp
      const helpBtn = document.createElement('button');
      helpBtn.textContent = 'Arkitekthjælp';
      helpBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openModal(`<h2>Arkitekthjælp</h2><p>${task.narrativeIntro || "Ingen arkitekthjælp tilgængelig for denne opgave."}</p>`);
      });
      
      taskItem.appendChild(infoDiv);
      taskItem.appendChild(commitBtn);
      taskItem.appendChild(helpBtn);
      potentialTasksDiv.appendChild(taskItem);
    });
  }

  // Starter den forpligtede opgave (efter fokusvalg)
  function startTask(task) {
    gameState.currentTask = task;
    gameState.currentStepIndex = 0;
    gameState.architectHelpUsed = false;
    renderActiveTask(task);
  }

  // Render den aktive opgave med en liste over alle opgavens lokationer og markerede (gennemførte) trin
  function renderActiveTask(task) {
    const activeTaskDiv = document.getElementById('activeTask');
    activeTaskDiv.innerHTML = `<h2>${task.title}</h2><p>${task.shortDesc}</p><p><em>Fokus: ${task.focus === "udvikling" ? "Udvikling" : "Sikkerhed"}</em></p>`;
    if (task.steps && task.steps.length > 0) {
      const locationsListElem = document.createElement('ul');
      locationsListElem.id = 'taskLocations';
      task.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        if (idx < gameState.currentStepIndex) {
          li.innerHTML = `${idx + 1}. ${step.location} ${getIcon(step.location)} <span class="done">✔</span>`;
        } else {
          li.textContent = `${idx + 1}. ${step.location} ${getIcon(step.location)}`;
        }
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
      openModal("<p>Vælg en opgave og forpligt dig først!</p>");
      return;
    }
    const currentStep = gameState.currentTask.steps[gameState.currentStepIndex];
    if (clickedLocation === currentStep.location) {
      showStepChoices(currentStep);
    } else {
      openModal("<p>Forkert lokation. Prøv igen.</p>");
    }
  }

  // Vis modal med valgmuligheder for det aktuelle trin – inkl. "Mere info (trin)"
  function showStepChoices(step) {
    // Fjern evt. negative stattekster for sikkerhed/udvikling
    let choiceAText = step.choiceA.text
      .replace(/-?\d+\s*tid/, "−2 tid")
      .replace(/-\d+\s*sikkerhed/g, "")
      .replace(/-\d+\s*udvikling/g, "");
    let choiceBText = step.choiceB.text
      .replace(/-?\d+\s*tid/, "0 tid")
      .replace(/-\d+\s*sikkerhed/g, "")
      .replace(/-\d+\s*udvikling/g, "");
      
    const choiceContent = `
      <h2>${step.stepDescription}</h2>
      <p><em>Fokus: ${gameState.currentTask.focus === "udvikling" ? "Udvikling" : "Sikkerhed"}</em></p>
      <button id="choiceA">${step.choiceA.label} (${choiceAText})</button>
      <button id="choiceB">${step.choiceB.label} (${choiceBText})</button>
      <br><br>
      <button id="architectHelp">${gameState.architectHelpUsed ? 'Arkitekthjælp brugt' : 'Brug Arkitekthjælp'}</button>
      <button id="moreInfo">Mere info (trin)</button>
    `;
    openModal(choiceContent);
    // For Choice A: komplet løsning – fast −2 tid
    document.getElementById('choiceA').addEventListener('click', function() {
      let modifiedChoice = Object.assign({}, step.choiceA);
      modifiedChoice.applyEffect = Object.assign({}, step.choiceA.applyEffect, { timeCost: 2 });
      applyChoice(modifiedChoice);
      closeModal();
      if (gameState.currentStepIndex === gameState.currentTask.steps.length - 1) {
        cabApproval();
      } else {
        proceedToNextStep();
      }
    });
    // For Choice B: hurtig løsning – 0 tid
    document.getElementById('choiceB').addEventListener('click', function() {
      let modifiedChoice = Object.assign({}, step.choiceB);
      modifiedChoice.applyEffect = Object.assign({}, step.choiceB.applyEffect, { timeCost: 0 });
      applyChoice(modifiedChoice);
      closeModal();
      if (gameState.currentStepIndex === gameState.currentTask.steps.length - 1) {
        cabApproval();
      } else {
        proceedToNextStep();
      }
    });
    document.getElementById('architectHelp').addEventListener('click', function() {
      if (!gameState.architectHelpUsed) {
        gameState.architectHelpUsed = true;
        openModal(`<h2>Arkitekthjælp</h2><p>Anbefalet valg: ${step.choiceA.label}</p>`);
      }
    });
    document.getElementById('moreInfo').addEventListener('click', function() {
      openModal(`<h2>Mere info (trin)</h2><p>${step.stepContext || "Ingen yderligere information tilgængelig."}</p>`);
    });
  }

  function applyChoice(choice) {
    gameState.time -= choice.applyEffect.timeCost;
    if (gameState.time < 0) gameState.time = 0;
    if (choice.applyEffect.timeCost > 0) {
      showFeedback(`−${choice.applyEffect.timeCost} tid`);
    }
    if (choice.applyEffect.statChange.security) {
      gameState.security += choice.applyEffect.statChange.security;
    }
    if (choice.applyEffect.statChange.development) {
      gameState.development += choice.applyEffect.statChange.development;
    }
    updateDashboard();
    if (gameState.time === 0) {
      openModal("<p>Ikke nok tid! Spillet slutter.</p>");
      setTimeout(() => location.reload(), 2000);
    }
  }

  // Når det sidste trin er løst, sendes ændringen automatisk til CAB for vurdering
  function cabApproval() {
    closeModal();
    // Beregn godkendelseschance med reduceret risiko: bonus på 10
    let chance = (gameState.security + 10) / (gameState.missionGoals.security + 10);
    // For at øge chancen for godkendelse, kan vi evt. begrænse afvisningsraten yderligere
    if (Math.random() < chance) {
      openModal("<p>Opgaven er godkendt af CAB og udrullet!</p>");
      finishTask();
    } else {
      // Elegant visning af rework: én modal med en "Fortsæt rework"-knap
      openModal(`
        <h2>CAB Afvisning</h2>
        <p>CAB afviste opgaven. Rework er påkrævet, og du mister 3 tidspoint.</p>
        <button id="continueRework">Fortsæt rework</button>
      `);
      document.getElementById('continueRework').addEventListener('click', function() {
        const penalty = 3;
        gameState.time -= penalty;
        if (gameState.time < 0) gameState.time = 0;
        updateDashboard();
        showFeedback(`−${penalty} tid (rework)`);
        closeModal();
        // Efter en kort pause gentages CAB-vurderingen
        setTimeout(() => cabApproval(), 1000);
      });
    }
  }

  function proceedToNextStep() {
    const task = gameState.currentTask;
    if (gameState.currentStepIndex < task.steps.length - 1) {
      gameState.currentStepIndex++;
      renderActiveTask(task);
    } else {
      // Når alle trin er gennemført, send opgaven til CAB-vurdering
      cabApproval();
    }
  }

  function finishTask() {
    gameState.tasksCompleted++;
    openModal("<p>Opgaven er fuldført!</p>");
    document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
    gameState.currentTask = null;
    gameState.currentStepIndex = 0;
    renderPotentialTasks();
  }

  // Eksempel på Inspect & Adapt – kan udvides efter behov
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
      openModal("<p>Tak for spillet!</p>");
      setTimeout(() => location.reload(), 2000);
    });
  }

  showIntro();
});
