/* main.js */
document.addEventListener("DOMContentLoaded", function() {
  const gameState = {
    time: 30,
    security: 0,
    development: 0,
    currentTask: null,
    currentStepIndex: 0,
    tasksCompleted: 0,
    missionGoals: { security: 22, development: 22 },
    architectHelpUsed: false,
    // Her oprettes to arrays: 
    // allTasks: indeholder alle opgaver (samlet fra de tre task-filer)
    // tasks: de opgaver, der aktuelt vises som potentielle opgaver
    allTasks: [],
    tasks: [],
    choiceHistory: []
  };

  // Saml alle opgaver fra de tre kilder
  gameState.allTasks = [].concat(hospitalTasks, infrastrukturTasks, cybersikkerhedTasks);

  // Shuffle arrayet med opgaver for at få en tilfældig rækkefølge
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  shuffleArray(gameState.allTasks);

  // Tag de første 7 opgaver som de oprindelige potentielle opgaver
  gameState.tasks = gameState.allTasks.splice(0, 7);

  // Definér getIcon()-funktionen
  function getIcon(location) {
    const icons = {
      'hospital': '🏥',
      'dokumentation': '📄',
      'leverandør': '📦',
      'infrastruktur': '🔧',
      'it‑jura': '⚖️',
      'cybersikkerhed': '💻'
    };
    return icons[location.toLowerCase()] || '';
  }

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
    options: { scales: { y: { beginAtZero: true } } }
  });

  function updateDashboard() {
    if (gameState.time < 0) gameState.time = 0;
    kpiChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    kpiChart.update();
  }

  // Opdater opgaveprogress (f.eks. "Opgave X/10") i dashboardet
  function updateTaskProgress() {
    const progressElement = document.getElementById('taskProgress');
    progressElement.textContent = `Opgave ${gameState.tasksCompleted} / 10`;
  }
  updateTaskProgress();

  // Render lokationer i venstre side
  const locationsList = ["hospital", "dokumentation", "leverandør", "infrastruktur", "it‑jura", "cybersikkerhed"];
  function renderLocations() {
    const locationsDiv = document.getElementById('locations');
    locationsDiv.innerHTML = "";
    locationsList.forEach(loc => {
      const btn = document.createElement('button');
      btn.className = 'location-button';
      btn.innerHTML = loc.toUpperCase() + " " + getIcon(loc);
      btn.addEventListener('click', function() {
        handleLocationClick(loc);
      });
      locationsDiv.appendChild(btn);
    });
  }
  renderLocations();

  // Modalhåndtering med GSAP
  const modal = document.getElementById('modal');
  const modalBodyContainer = document.getElementById('modalBody');
  const modalFooterContainer = document.getElementById('modalFooter');
  const modalClose = document.getElementById('modalClose');
  modalClose.addEventListener('click', () => closeModal());

  function openModal(bodyContent, footerContent = "") {
    modalBodyContainer.innerHTML = bodyContent;
    modalFooterContainer.innerHTML = footerContent;
    modal.classList.remove('hidden');
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }

  function closeModal(callback) {
    gsap.to(modal, { opacity: 0, duration: 0.5, onComplete: () => {
      modal.classList.add('hidden');
      if (callback) callback();
    }});
  }

  // "Få hjælp"-knap
  document.getElementById('helpButton').addEventListener('click', function() {
    showHelp();
  });

  function showHelp() {
    const helpContent = `
      <h2>Få Hjælp</h2>
      <p><strong>Din Rolle som IT-forvalter</strong><br>
      Velkommen til IT Tycoon! Du skal balancere tre KPI’er: <em>Tid, Sikkerhed</em> og <em>Udvikling</em>. Træf strategiske beslutninger for at styrke it-sikkerheden og udviklingen, mens du holder øje med din tid.</p>
      <p><strong>Spillets Struktur:</strong><br>
      - Hver opgave består af flere trin, hvor du vælger mellem en komplet løsning (−2 tid, større bonus) og en hurtig løsning (0 tid, mindre bonus).<br>
      - Du skal gennemføre 10 opgaver for at nå Inspect & Adapt-fasen, hvor dine resultater evalueres.</p>
      <p><strong>Opdateringer:</strong><br>
      - Dashboardet viser løbende din tid og din opgaveprogress (f.eks. "Opgave 3/10").<br>
      - Hvis du ikke gennemfører nok opgaver, eller hvis dine KPI’er ikke er på niveau, vil spillet give dig en detaljeret fejlmeddelelse.</p>
      <p>Held og lykke!</p>
    `;
    openModal(helpContent, `<button id="closeHelp">Luk</button>`);
    document.getElementById('closeHelp').addEventListener('click', () => closeModal());
  }

  // Introduktion – Velkomstpop-up
  function showIntro() {
    const introContent = `
      <h2>Velkommen til IT‑Tycoon</h2>
      <p>Du agerer IT‑forvalter under SAFe og starter med PI Planning, hvor målsætningen for udvikling og sikkerhed fastsættes.</p>
      <p>Venstre side viser din KPI-graf og en liste med lokationer; højre side viser aktive og potentielle opgaver.</p>
      <p>Når du vælger en opgave, skal du trykke på "Forpligt opgave" for at starte den.</p>
      <p>Hvert valg i et trin viser sin tidsomkostning – den komplette løsning koster 2 tidspoint (−2 tid) og giver en større bonus, mens den hurtige løsning koster 0 tidspoint og giver en mindre bonus.</p>
    `;
    openModal(introContent, `<button id="startGame">Start Spillet</button>`);
    document.getElementById('startGame').addEventListener('click', function() {
      closeModal(() => showSprintGoal());
    });
  }

  function showSprintGoal() {
    const sprintContent = `
      <h2>PI Planning</h2>
      <p>Målsætning: Opnå mindst ${gameState.missionGoals.security} i sikkerhed og ${gameState.missionGoals.development} i udvikling inden for sprintet.</p>
    `;
    openModal(sprintContent, `<button id="continueTutorial">Fortsæt til Tutorial</button>`);
    document.getElementById('continueTutorial').addEventListener('click', function() {
      closeModal(() => startTutorial());
    });
  }

  function startTutorial() {
    const tutorialContent = `
      <h2>Tutorial</h2>
      <p><strong>Spillets Koncept:</strong><br>
      Du navigerer komplekse IT-systemer og balancerer dine KPI’er: Tid, Sikkerhed og Udvikling. Dit mål er at nå sprintmålsætningen, som du kan følge i grafen.</p>
      <p><strong>UI-Layout:</strong><br>
      Venstre side: KPI-graf og lokationer<br>
      Højre side: Aktiv opgave og potentielle opgaver</p>
      <p><strong>Spillets Mekanik:</strong><br>
      Når du forpligter en opgave, gennemfører du hvert trin ved at vælge den korrekte lokation. Den komplette løsning koster 2 tidspoint og giver en større bonus, mens den hurtige løsning koster 0 tidspoint og giver en mindre bonus.</p>
      <p><strong>Efter alle trin:</strong><br>
      Dine ændringer sendes til CAB for evaluering. Hvis CAB afviser, skal du udføre rework, hvilket koster ekstra tid.</p>
    `;
    openModal(tutorialContent, `<button id="endTutorial">Næste</button>`);
    document.getElementById('endTutorial').addEventListener('click', function() {
      closeModal(() => renderPotentialTasks());
    });
  }

  // Render potentielle opgaver – vis blot de opgaver, der er i gameState.tasks (som initialt er 7)
  function renderPotentialTasks() {
    const potentialTasksDiv = document.getElementById('potentialTasks');
    potentialTasksDiv.innerHTML = '<h2>Potentielle Opgaver</h2>';
    gameState.tasks.forEach((task) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      const infoDiv = document.createElement('div');
      infoDiv.className = 'task-info';
      infoDiv.innerHTML = `<h3>${task.title}</h3><p>${task.shortDesc}</p>`;
      const commitBtn = document.createElement('button');
      commitBtn.textContent = 'Forpligt opgave';
      commitBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (gameState.currentTask !== null) {
          openModal("<h2>Advarsel</h2><p>Du har allerede forpligtet dig til en opgave!</p>", `<button id="okButton">OK</button>`);
          document.getElementById('okButton').addEventListener('click', () => closeModal());
          return;
        }
        startTask(task);
      });
      const helpBtn = document.createElement('button');
      helpBtn.textContent = 'Arkitekthjælp';
      helpBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        let hint = "";
        if (task.title.toLowerCase().includes("hospital") || task.title.toLowerCase().includes("lims")) {
          hint = "Denne opgave understøtter Udvikling.";
        } else {
          hint = "Denne opgave understøtter Sikkerhed.";
        }
        openModal(`<h2>Arkitekthjælp</h2><p>${hint}</p><p>${task.narrativeIntro || ""}</p>`, `<button id="closeArchitectHelp">Luk</button>`);
        document.getElementById('closeArchitectHelp').addEventListener('click', () => closeModal());
      });
      taskItem.appendChild(infoDiv);
      taskItem.appendChild(commitBtn);
      taskItem.appendChild(helpBtn);
      potentialTasksDiv.appendChild(taskItem);
    });
  }

  // Når en opgave startes, fjern den fra potentielle opgaver
  function startTask(task) {
    gameState.currentTask = task;
    gameState.currentStepIndex = 0;
    gameState.architectHelpUsed = false;
    gameState.choiceHistory = [];
    renderActiveTask(task);
  }

  // Vis den aktive opgave med alle dens trin
  function renderActiveTask(task) {
    const activeTaskDiv = document.getElementById('activeTask');
    activeTaskDiv.innerHTML = `<h2>${task.title}</h2><p>${task.shortDesc}</p>`;
    if (task.steps && task.steps.length > 0) {
      const locationsListElem = document.createElement('ul');
      locationsListElem.id = 'taskLocations';
      task.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        if (idx < gameState.currentStepIndex) {
          li.innerHTML = `${idx + 1}. ${step.location.toUpperCase()} ${getIcon(step.location)} <span class="done">✔</span>`;
        } else {
          li.textContent = `${idx + 1}. ${step.location.toUpperCase()} ${getIcon(step.location)}`;
        }
        locationsListElem.appendChild(li);
      });
      activeTaskDiv.appendChild(locationsListElem);
      const currentStep = task.steps[gameState.currentStepIndex];
      const instruction = document.createElement('p');
      instruction.innerHTML = `<strong>Vælg lokation:</strong> ${currentStep.location.toUpperCase()} ${getIcon(currentStep.location)}`;
      activeTaskDiv.appendChild(instruction);
    }
  }

  function handleLocationClick(clickedLocation) {
    if (!gameState.currentTask) {
      openModal("<h2>Advarsel</h2><p>Vælg en opgave og forpligt dig først!</p>", `<button id="alertOk">OK</button>`);
      document.getElementById('alertOk').addEventListener('click', () => closeModal());
      return;
    }
    const currentStep = gameState.currentTask.steps[gameState.currentStepIndex];
    if (clickedLocation.toLowerCase() === currentStep.location.toLowerCase()) {
      showStepChoices(currentStep);
    } else {
      openModal("<h2>Fejl</h2><p>Forkert lokation. Prøv igen.</p>", `<button id="errorOk">OK</button>`);
      document.getElementById('errorOk').addEventListener('click', () => closeModal());
    }
  }

  function showStepChoices(step) {
    let choiceAText = step.choiceA.text.replace(/-?\d+\s*tid/, "<span style='color:#800000;'>−2 tid</span>");
    let choiceBText = step.choiceB.text.replace(/-?\d+\s*tid/, "<span style='color:#006400;'>0 tid</span>");
    if (gameState.currentTask.focus === "sikkerhed") {
      choiceAText = choiceAText.replace(/[\+\-]?\d+\s*udvikling/gi, "").trim();
      choiceBText = choiceBText.replace(/[\+\-]?\d+\s*udvikling/gi, "").trim();
    }
    const choiceContent = `
      <h2>${step.stepDescription}</h2>
      ${step.stepContext ? `<p>${step.stepContext}</p>` : ""}
      <div class="choice-buttons">
        <button id="choiceA">${step.choiceA.label} (${choiceAText})</button>
        <button id="choiceB">${step.choiceB.label} (${choiceBText})</button>
        <button id="architectHelp">${gameState.architectHelpUsed ? 'Arkitekthjælp brugt' : 'Brug Arkitekthjælp'}</button>
      </div>
    `;
    openModal(choiceContent);
    document.getElementById('choiceA').addEventListener('click', function() {
      let modifiedChoice = Object.assign({}, step.choiceA);
      modifiedChoice.applyEffect = Object.assign({}, step.choiceA.applyEffect, { timeCost: 2 });
      applyChoice(modifiedChoice);
      gameState.choiceHistory.push(`Trin ${gameState.currentStepIndex + 1}: ${step.choiceA.label} (${choiceAText})`);
      closeModal(() => {
        if (gameState.currentStepIndex === gameState.currentTask.steps.length - 1) {
          cabApproval();
        } else {
          proceedToNextStep();
        }
      });
    });
    document.getElementById('choiceB').addEventListener('click', function() {
      let modifiedChoice = Object.assign({}, step.choiceB);
      modifiedChoice.applyEffect = Object.assign({}, step.choiceB.applyEffect, { timeCost: 0 });
      applyChoice(modifiedChoice);
      gameState.choiceHistory.push(`Trin ${gameState.currentStepIndex + 1}: ${step.choiceB.label} (${choiceBText})`);
      closeModal(() => {
        if (gameState.currentStepIndex === gameState.currentTask.steps.length - 1) {
          cabApproval();
        } else {
          proceedToNextStep();
        }
      });
    });
    document.getElementById('architectHelp').addEventListener('click', function() {
      if (!gameState.architectHelpUsed) {
        gameState.architectHelpUsed = true;
        let hint = "Denne opgave understøtter Sikkerhed.";
        openModal(`<h2>Arkitekthjælp</h2><p>Anbefalet valg: ${step.choiceA.label}</p><p>${hint}</p>`, `<button id="closeArchitectHelp">Luk</button>`);
        document.getElementById('closeArchitectHelp').addEventListener('click', () => closeModal());
      }
    });
  }

  function applyChoice(choice) {
    gameState.time -= choice.applyEffect.timeCost;
    if (gameState.time < 0) gameState.time = 0;
    if (choice.applyEffect.statChange.security) {
      gameState.security += choice.applyEffect.statChange.security;
    }
    if (choice.applyEffect.statChange.development) {
      gameState.development += choice.applyEffect.statChange.development;
    }
    updateDashboard();
    if (gameState.time <= 0) {
      checkGameOverCondition();
      return;
    }
  }

  // Funktion der tjekker de tre scenarier, når tiden løber ud
  function checkGameOverCondition() {
    if (gameState.tasksCompleted < 10 &&
       (gameState.security >= gameState.missionGoals.security && gameState.development >= gameState.missionGoals.development)) {
      openModal("<h2>Din tid er opbrugt!</h2><p>Selvom dine KPI’er var på rette niveau, har du ikke gennemført de 10 nødvendige opgaver. Du skal fuldføre alle opgaver for at nå sprintets mål.</p>");
    }
    else if (gameState.tasksCompleted >= 10 &&
       (gameState.security < gameState.missionGoals.security || gameState.development < gameState.missionGoals.development)) {
      openModal("<h2>Din tid er opbrugt!</h2><p>Du har gennemført 10 opgaver, men dine KPI’er (Sikkerhed og Udvikling) nåede ikke sprintmålet. Vurder dine beslutninger og forsøg igen.</p>");
    }
    else if (gameState.tasksCompleted < 10 &&
       (gameState.security < gameState.missionGoals.security || gameState.development < gameState.missionGoals.development)) {
      openModal("<h2>Din tid er opbrugt!</h2><p>Du har hverken gennemført de krævede 10 opgaver eller opnået de fastsatte KPI-mål for Sikkerhed og Udvikling. Genovervej dine strategier og prøv igen.</p>");
    }
    else {
      openModal("<h2>Din tid er opbrugt!</h2><p>Spillet slutter, fordi du løb tør for tid.</p>");
    }
    setTimeout(() => location.reload(), 4000);
  }

  function cabApproval() {
    closeModal(() => {
      openModal("<h2>Til CAB</h2><p>Din ændring sendes nu til CAB for evaluering…</p>", `<button id="evaluateCAB">Evaluér nu</button>`);
      document.getElementById('evaluateCAB').addEventListener('click', function() {
        let chance = (gameState.security + 20) / (gameState.missionGoals.security + 20);
        if (Math.random() < chance) {
          showTaskSummary();
        } else {
          openModal("<h2>CAB Afvisning</h2><p>CAB afviste opgaven. Rework er påkrævet, og du mister 3 tidspoint.</p>", `<button id="continueRework">Fortsæt rework</button>`);
          document.getElementById('continueRework').addEventListener('click', function() {
            const penalty = 3;
            gameState.time -= penalty;
            if (gameState.time < 0) gameState.time = 0;
            updateDashboard();
            closeModal(() => cabApproval());
          });
        }
      });
    });
  }

  function showTaskSummary() {
    let summaryHTML = "<h2>Opsummering af dine valg</h2><ul>";
    gameState.choiceHistory.forEach(item => {
      summaryHTML += `<li>${item}</li>`;
    });
    summaryHTML += "</ul>";
    openModal(summaryHTML, `<button id="continueAfterSummary">Fortsæt</button>`);
    document.getElementById('continueAfterSummary').addEventListener('click', function() {
      closeModal(() => finishTask());
    });
  }

  function proceedToNextStep() {
    const task = gameState.currentTask;
    if (gameState.currentStepIndex < task.steps.length - 1) {
      gameState.currentStepIndex++;
      renderActiveTask(task);
    } else {
      cabApproval();
    }
  }

  // Når en opgave er løst: Fjern den fra listen, og tilføj 2 nye opgaver (hvis tilgængelige)
  function finishTask() {
    gameState.tasksCompleted++;
    updateTaskProgress();
    openModal("<h2>Info</h2><p>Opgaven er fuldført!</p>", `<button id="continueAfterFinish">Fortsæt</button>`);
    document.getElementById('continueAfterFinish').addEventListener('click', function() {
      closeModal(() => {
        // Fjern den aktuelle opgave fra den viste liste
        gameState.tasks = gameState.tasks.filter(task => task !== gameState.currentTask);
        // Tilføj op til 2 nye opgaver fra allTasks, hvis der er nogen
        const newTasks = gameState.allTasks.splice(0, 2);
        gameState.tasks = gameState.tasks.concat(newTasks);
        document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
        gameState.currentTask = null;
        gameState.currentStepIndex = 0;
        renderPotentialTasks();
      });
    });
  }

  function showInspectAndAdapt() {
    const inspectContent = `
      <h2>Inspect & Adapt</h2>
      <p>Sikkerhed: ${gameState.security} (mål: ${gameState.missionGoals.security})</p>
      <p>Udvikling: ${gameState.development} (mål: ${gameState.missionGoals.development})</p>
      <p>Din sprint er afsluttet. Nye, mere ambitiøse mål er nu sat: 24 for Sikkerhed og 24 for Udvikling. Din tid nulstilles til 30.</p>
      <button id="continueGame">Fortsæt</button>
    `;
    openModal(inspectContent);
    document.getElementById('continueGame').addEventListener('click', function() {
      closeModal(() => {
        gameState.time = 30;
        gameState.missionGoals = { security: 24, development: 24 };
        gameState.tasksCompleted = 0;
        updateTaskProgress();
        updateDashboard();
        showSprintGoal();
      });
    });
  }

  function showTaskSummary() {
    let summaryHTML = "<h2>Opsummering af dine valg</h2><ul>";
    gameState.choiceHistory.forEach(item => {
      summaryHTML += `<li>${item}</li>`;
    });
    summaryHTML += "</ul>";
    openModal(summaryHTML, `<button id="continueAfterSummary">Fortsæt</button>`);
    document.getElementById('continueAfterSummary').addEventListener('click', function() {
      closeModal(() => finishTask());
    });
  }

  // Start med introduktion
  showIntro();
});
