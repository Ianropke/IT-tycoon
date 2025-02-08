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
    tasks: [],
    choiceHistory: []
  };

  // Sørg for, at task-filerne er loadet før main.js
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
    options: { scales: { y: { beginAtZero: true } } }
  });

  function updateDashboard() {
    if (gameState.time < 0) gameState.time = 0;
    kpiChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    kpiChart.update();
  }

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

  // Event listener for "Få hjælp"-knappen i headeren
  document.getElementById('helpButton').addEventListener('click', function() {
    showHelp();
  });

  function showHelp() {
    const helpContent = `
      <h2>Få Hjælp</h2>
      <p><strong>Din Rolle som IT-forvalter</strong><br>
      Velkommen til IT Tycoon! I dette spil agerer du som IT-forvalter i en moderne organisation. Din primære opgave er at balancere tre centrale nøglepræstationsindikatorer (KPI’er): <em>Tid, Sikkerhed</em> og <em>Udvikling</em>. Du skal træffe strategiske beslutninger, der både styrker din organisations it-sikkerhed og udviklingskapacitet, mens du holder øje med den tilgængelige tid.</p>
      
      <p><strong>Spillets Struktur og Valgmuligheder</strong><br>
      Spillet er inddelt i opgaver, der hver består af flere trin. Hvert trin præsenterer dig for to muligheder:
      <ul>
        <li><strong>Den komplette løsning:</strong> Giver en større bonus, men koster ekstra tid (typisk −2 tid). Ideelt, når du har tid til overs og ønsker et kraftigt løft i enten sikkerhed eller udvikling.</li>
        <li><strong>Den hurtige løsning:</strong> Koster ingen ekstra tid, men giver en mindre bonus – nyttig, når du skal spare tid, selvom det betyder en mindre effekt.</li>
      </ul>
      Dine valg påvirker dine KPI’er, så det er vigtigt nøje at afveje risiko og belønning.</p>
      
      <p><strong>Vigtige Funktioner</strong><br>
      <em>Opgaver:</em> Vælg en opgave fra listen, forpligt dig til den og gennemfør hvert trin for at påvirke dine KPI’er.<br>
      <em>Arkitekthjælp:</em> Brug denne funktion, hvis du er usikker på, hvilket valg der er bedst – den giver anbefalinger, men husk at lære af dine egne beslutninger.<br>
      <em>CAB (Change Advisory Board):</em> Efter alle trin sendes dine ændringer til CAB for evaluering. Hvis CAB afviser, skal du udføre rework, hvilket koster ekstra tid.<br>
      <em>Inspect & Adapt:</em> Efter et sprint får du en samlet evaluering af dine resultater, så du kan justere din strategi.</p>
      
      <p><strong>Mulige Udfordringer</strong><br>
      - <em>Tidsstyring:</em> Forkerte valg kan få dig til at løbe tør for tid – overvej altid, hvilken løsning der er bedst i den givne situation.<br>
      - <em>Forkerte Beslutninger:</em> Fejlagtige valg kan påvirke dine KPI’er negativt, hvilket kan resultere i, at CAB afviser dine ændringer og du skal udføre rework.<br>
      - <em>Afvejning af Risiko og Belønning:</em> Det er en balancegang at vælge mellem hurtige løsninger og de mere omfattende, men fordelagtige, løsninger.<br>
      - <em>Overblik:</em> Hold nøje øje med dine KPI’er og den tilgængelige tid, så du altid træffer informerede beslutninger.</p>
      
      <p>Brug denne hjælp som en vejledning til at forstå spillets mekanikker og forberede dig på de udfordringer, der måtte opstå. Held og lykke!</p>
    `;
    openModal(helpContent, `<button id="closeHelp">Luk</button>`);
    document.getElementById('closeHelp').addEventListener('click', () => closeModal());
  }

  // Render lokationer
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

  // Introduktion og PI Planning
  function showIntro() {
    const introContent = `
      <h2>Velkommen til IT‑Tycoon</h2>
      <p>Du agerer IT‑forvalter under SAFe og starter med PI Planning, hvor målsætningen for udvikling og sikkerhed fastsættes.</p>
      <p>Venstre side viser din KPI-graf og en liste med lokationer; højre side viser aktive og potentielle opgaver.</p>
      <p>Når du vælger en opgave, skal du trykke på "Forpligt opgave" ved siden af opgaven for at starte den.</p>
      <p>Hvert valg i et trin viser sin tidsomkostning – den komplette løsning giver en straf på <span style="color:#800000;">−2 tid</span> og en større bonus, mens den hurtige løsning giver <span style="color:#006400;">0 tid</span> og en mindre bonus. Bonusserne vises direkte i pop‑up’en.</p>
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
      Højre side: Aktiv opgave og potentielle opgaver<br>
      Opgavens titel og beskrivelse fortæller, om den understøtter Udvikling (hospitalopgaver) eller Sikkerhed (infrastruktur-/cybersikkerhedsopgaver).</p>
      <p><strong>Spillets Mekanik:</strong><br>
      Når opgaven forpligtes, udfører du hvert trin ved at vælge den korrekte lokation. Ved valg af den komplette løsning trækkes <span style="color:#800000;">−2 tid</span> og du opnår en større bonus; den hurtige løsning giver <span style="color:#006400;">0 tid</span> og en mindre bonus. Effekterne vises direkte i pop‑up’en.</p>
      <p><strong>Efter de normale trin:</strong><br>
      Når alle trin er gennemført, sendes din ændring til CAB for evaluering. Du får besked om, at din ændring sendes til CAB – og herefter skal du trykke på "Evaluér nu" for at starte evalueringen. Hvis CAB afviser, mister du 3 tidspoint, og evalueringen gentages.</p>
    `;
    openModal(tutorialContent, `<button id="endTutorial">Næste</button>`);
    document.getElementById('endTutorial').addEventListener('click', function() {
      closeModal(() => renderPotentialTasks());
    });
  }

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
          openModal(
            "<h2>Advarsel</h2><p>Du har allerede forpligtet dig til en opgave!</p>",
            `<button id="okButton">OK</button>`
          );
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
        openModal(
          `<h2>Arkitekthjælp</h2><p>${hint}</p><p>${task.narrativeIntro || ""}</p>`,
          `<button id="closeArchitectHelp">Luk</button>`
        );
        document.getElementById('closeArchitectHelp').addEventListener('click', () => closeModal());
      });
      taskItem.appendChild(infoDiv);
      taskItem.appendChild(commitBtn);
      taskItem.appendChild(helpBtn);
      potentialTasksDiv.appendChild(taskItem);
    });
  }

  function startTask(task) {
    gameState.currentTask = task;
    gameState.currentStepIndex = 0;
    gameState.architectHelpUsed = false;
    gameState.choiceHistory = [];
    renderActiveTask(task);
  }

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
      openModal(
        "<h2>Advarsel</h2><p>Vælg en opgave og forpligt dig først!</p>",
        `<button id="alertOk">OK</button>`
      );
      document.getElementById('alertOk').addEventListener('click', () => closeModal());
      return;
    }
    const currentStep = gameState.currentTask.steps[gameState.currentStepIndex];
    if (clickedLocation.toLowerCase() === currentStep.location.toLowerCase()) {
      showStepChoices(currentStep);
    } else {
      openModal(
        "<h2>Fejl</h2><p>Forkert lokation. Prøv igen.</p>",
        `<button id="errorOk">OK</button>`
      );
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
        openModal(
          `<h2>Arkitekthjælp</h2><p>Anbefalet valg: ${step.choiceA.label}</p><p>${hint}</p>`,
          `<button id="closeArchitectHelp">Luk</button>`
        );
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
    if (gameState.time === 0) {
      openModal("<h2>Fejl</h2><p>Ikke nok tid! Spillet slutter.</p>");
      setTimeout(() => location.reload(), 2000);
    }
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

  function finishTask() {
    gameState.tasksCompleted++;
    openModal("<h2>Info</h2><p>Opgaven er fuldført!</p>", `<button id="continueAfterFinish">Fortsæt</button>`);
    document.getElementById('continueAfterFinish').addEventListener('click', function() {
      closeModal(() => {
        // Fjern den fuldførte opgave fra gameState.tasks
        gameState.tasks = gameState.tasks.filter(task => task !== gameState.currentTask);
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
      <button id="endGame">Afslut Spillet</button>
    `;
    openModal(inspectContent);
    document.getElementById('endGame').addEventListener('click', function() {
      closeModal(() => {
        openModal("<h2>Tak for spillet!</h2><p>Vi ses næste gang.</p>");
        setTimeout(() => location.reload(), 2000);
      });
    });
  }

  showIntro();
});
