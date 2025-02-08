document.addEventListener('DOMContentLoaded', () => {
  /************************************************************
   * main.js – IT‑Tycoon (Endelig udgave med PI-mål, Inspect & Adapt,
   * balancering af KPI’er, dynamiske lokationer, arkitekthjælp og
   * korrekt tidshåndtering)
   *
   * Ændringer inkluderer:
   * 1. Sprintmålsætning vises som en modal ("sprint-goal-modal") med en detaljeret, spændende beskrivelse.
   * 2. Intro-modalen er udvidet med en mere engagerende tekst.
   * 3. Inspect & Adapt-modal vises efter 10 løste opgaver, og spillet afsluttes.
   * 4. "Leverandør" vises med korrekt stavning.
   * 5. KPI‑balancering: Sikkerhed ændres med en faktor på 0.75, udvikling med 1.25.
   * 6. Hvis der ikke er nok tid, vises en popup, og spillet afsluttes.
   * 7. Dashboardet opdateres med Chart.js, og den gamle instans destrueres, hvis den findes.
   * 8. Lokationsbokse genereres dynamisk med tilknyttede click‑eventlisteners.
   * 9. Arkitekthjælp-knappen oprettes dynamisk, hvis den ikke allerede findes.
   ************************************************************/

  // Sørg for, at dine task-filer (hospitalTasks.js, infrastrukturTasks.js, cybersikkerhedTasks.js) er indlæst
  window.hospitalTasks = window.hospitalTasks || [];
  window.infrastrukturTasks = window.infrastrukturTasks || [];
  window.cybersikkerhedTasks = window.cybersikkerhedTasks || [];

  // Global gameState – værdierne måles på en skala op til 40
  let gameState = {
    security: 20,
    development: 20,
    time: 30, // Spilleren starter med 30 tidspoint
    tasksCompleted: 0,
    activeTask: null,
    availableTasks: [],
    usedTasks: new Set(),
    docSkipCount: 0,
    riskyTotal: 0,
    finalFailChance: 0,
    lastFinishedTask: null
  };

  // Sprintmålsætning (PI-mål)
  const missionGoals = {
    security: 22,
    development: 22
  };

  const scenarioFlavorPool = [
    "Personalet bemærker udfordringer…",
    "Der opstår tekniske problemer, der kræver gennemgang…",
    "En ekstern konsulent peger på forbedringsmuligheder…",
    "Ledelsen ønsker at se, hvordan vi kan optimere systemet…"
  ];

  /* --- HTML References --- */
  const dashboardCanvas = document.getElementById('dashboard-canvas');
  const introModal = document.getElementById('intro-modal');
  const sprintGoalModal = document.getElementById('sprint-goal-modal');
  const tutorialModal = document.getElementById('tutorial-modal');
  const scenarioIntroModal = document.getElementById('scenario-intro-modal');
  const scenarioModal = document.getElementById('scenario-modal');
  const architectModal = document.getElementById('architect-modal');
  const cabModal = document.getElementById('cab-modal');
  const cabResultModal = document.getElementById('cab-result-modal');
  const taskSummaryModal = document.getElementById('task-summary-modal');
  const inspectModal = document.getElementById('inspect-modal');
  const moreInfoModal = document.getElementById('more-info-modal');

  const tutorialTitleEl = document.getElementById('tutorial-title');
  const tutorialTextEl = document.getElementById('tutorial-text');
  const scenarioIntroTitleEl = document.getElementById('scenario-intro-title');
  const scenarioIntroTextEl = document.getElementById('scenario-intro-text');
  const scenarioIntroCloseBtn = document.getElementById('scenario-intro-close-btn');

  const scenarioTitle = document.getElementById('scenario-title');
  const scenarioFlavorText = document.getElementById('scenario-flavor-text');
  const scenarioDescription = document.getElementById('scenario-description');
  const scenarioAButton = document.getElementById('scenario-a-btn');
  const scenarioBButton = document.getElementById('scenario-b-btn');
  const scenarioALabel = document.getElementById('scenario-a-label');
  const scenarioAText = document.getElementById('scenario-a-text');
  const scenarioBLabel = document.getElementById('scenario-b-label');
  const scenarioBText = document.getElementById('scenario-b-text');
  const scenarioNarrativeDiv = document.getElementById('scenario-narrative');
  const digDeeperLinksDiv = document.getElementById('dig-deeper-links');

  const cabSummary = document.getElementById('cab-summary');
  const cabResultTitle = document.getElementById('cab-result-title');
  const cabResultText = document.getElementById('cab-result-text');
  const taskSummaryText = document.getElementById('task-summary-text');
  const inspectContent = document.getElementById('inspect-content');
  const architectContent = document.getElementById('architect-content');
  const moreInfoContent = document.getElementById('more-info-content');

  /* --- Dynamisk generering af lokationsbokse --- */
  function renderLocations() {
    const gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    gameArea.innerHTML = "";
    const locations = ["hospital", "dokumentation", "leverandør", "infrastruktur", "it-jura", "cybersikkerhed"];
    locations.forEach(loc => {
      let div = document.createElement('div');
      div.id = loc;
      div.classList.add('location');
      let icon = document.createElement('span');
      icon.classList.add('loc-icon');
      icon.textContent = getIconForLocation(loc);
      div.appendChild(icon);
      let label = document.createElement('span');
      label.textContent = capitalize(loc);
      div.appendChild(label);
      // Tilføj click-eventlistener til lokationen
      div.addEventListener('click', () => handleLocationClick(loc));
      gameArea.appendChild(div);
    });
  }
  function getIconForLocation(loc) {
    switch (loc) {
      case "hospital": return "🏥";
      case "dokumentation": return "📄";
      case "leverandør": return "📦";
      case "infrastruktur": return "🔧";
      case "it-jura": return "⚖️";
      case "cybersikkerhed": return "💻";
      default: return "❓";
    }
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* --- Sikring af Arkitekthjælp-knap --- */
  function ensureArchitectHelpButton() {
    let btn = document.getElementById('architect-help-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'architect-help-btn';
      btn.classList.add('commit-button');
      btn.textContent = "Få arkitekthjælp";
      const activeTaskDiv = document.getElementById('active-task');
      if (activeTaskDiv) {
        activeTaskDiv.insertBefore(btn, activeTaskDiv.firstChild);
      }
      btn.addEventListener('click', () => {
        if (!gameState.activeTask) {
          showPopup("Ingen aktiv opgave!", "error");
          return;
        }
        if (gameState.activeTask.architectUsed) {
          showPopup("Arkitekthjælp allerede brugt!", "error");
          return;
        }
        showArchitectModal();
      });
    }
  }

  /* --- Event Listeners --- */
  const introStartBtn = document.getElementById('intro-start-btn');
  if (introStartBtn) {
    introStartBtn.addEventListener('click', () => {
      introModal.classList.add('modal-slide-out');
      setTimeout(() => {
        introModal.style.display = 'none';
        showSprintGoalModal();
      }, 500);
    });
  }
  if (scenarioIntroCloseBtn) {
    scenarioIntroCloseBtn.addEventListener('click', () => {
      scenarioIntroModal.style.display = 'none';
    });
  }
  const sprintGoalCloseBtn = document.getElementById('sprint-goal-close-btn');
  if (sprintGoalCloseBtn) {
    sprintGoalCloseBtn.addEventListener('click', () => {
      sprintGoalModal.style.display = 'none';
      openTutorialModal();
    });
  }
  const cabOkBtn = document.getElementById('cab-ok-btn');
  if (cabOkBtn) {
    cabOkBtn.addEventListener('click', () => {
      cabModal.style.display = 'none';
      finalizeCABResult();
    });
  }
  const cabResultOkBtn = document.getElementById('cab-result-ok-btn');
  if (cabResultOkBtn) {
    cabResultOkBtn.addEventListener('click', () => {
      cabResultModal.style.display = 'none';
      postCABTechnicalCheck();
    });
  }
  const taskSummaryOkBtn = document.getElementById('task-summary-ok-btn');
  if (taskSummaryOkBtn) {
    taskSummaryOkBtn.addEventListener('click', () => {
      taskSummaryModal.style.display = 'none';
      endActiveTask();
      renderTasks();
    });
  }
  const moreInfoCloseBtn = document.getElementById('more-info-close-btn');
  if (moreInfoCloseBtn) {
    moreInfoCloseBtn.addEventListener('click', () => {
      moreInfoModal.style.display = 'none';
    });
  }
  const inspectCloseBtn = document.getElementById('inspect-close-btn');
  if (inspectCloseBtn) {
    inspectCloseBtn.addEventListener('click', () => {
      inspectModal.style.display = 'none';
      endGame();
    });
  }

  /* --- Tutorial --- */
  const tutorialNextBtn = document.getElementById('tutorial-next-btn');
  let tutorialSteps = [
    { 
      title: "Din Rolle", 
      text: "Velkommen til IT‑Tycoon! Som IT‑forvalter skal du balancere sikkerhed, udvikling og tid. Dine beslutninger påvirker driftssikkerheden, og avancerede (anbefalede) valg koster ekstra tid – vælg med omtanke!"
    },
    { 
      title: "Læringskomponenter", 
      text: "Brug de indbyggede 'Mere info'-knapper for at få uddybende forklaringer på hvert trin. Arkitekthjælpen guider dig til de kritiske valg."
    }
  ];
  let tutorialIdx = 0;
  function openTutorialModal(){
    tutorialModal.style.display = "flex";
    showTutorialContent();
  }
  function showTutorialContent(){
    if (tutorialIdx >= tutorialSteps.length) {
      tutorialModal.style.display = "none";
      initGame();
      return;
    }
    tutorialTitleEl.textContent = tutorialSteps[tutorialIdx].title;
    tutorialTextEl.textContent = tutorialSteps[tutorialIdx].text;
  }
  if (tutorialNextBtn) {
    tutorialNextBtn.addEventListener('click', () => {
      tutorialIdx++;
      showTutorialContent();
    });
  }

  /* --- Sprint Goal Modal --- */
  function showSprintGoalModal(){
    sprintGoalModal.style.display = "flex";
  }

  /* --- initGame --- */
  function initGame(){
    renderLocations();
    ensureArchitectHelpButton();
    updateDashboard();
    window.backlog = [
      ...(window.hospitalTasks || []),
      ...(window.infrastrukturTasks || []),
      ...(window.cybersikkerhedTasks || [])
    ];
    setInterval(() => {
      if (gameState.availableTasks.length < 10) {
        generateTask();
      }
    }, 10000);
    for (let i = 0; i < 5; i++){
      generateTask();
    }
    updateDashboard();
  }

  /* --- Dashboard (Chart.js) --- */
  let dashboardChart; // Deklareres ÉN gang
  function initDashboard() {
    const ctx = dashboardCanvas.getContext('2d');
    if (dashboardChart) { dashboardChart.destroy(); }
    dashboardChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tid', 'Sikkerhed', 'Udvikling'],
        datasets: [
          {
            label: 'Nuværende Status',
            data: [gameState.time, gameState.security, gameState.development],
            backgroundColor: ['#f39c12', '#27ae60', '#8e44ad']
          },
          {
            label: 'Målsætning',
            data: [null, missionGoals.security, missionGoals.development],
            type: 'line',
            borderColor: '#f1c40f',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 40, ticks: { stepSize: 5 } } }
      }
    });
  }
  function updateDashboard() {
    if (!dashboardChart) return;
    dashboardChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    dashboardChart.update();
    animateDashboardUpdate();
  }
  function animateDashboardUpdate() {
    dashboardCanvas.classList.add('kpi-update');
    setTimeout(() => dashboardCanvas.classList.remove('kpi-update'), 1000);
  }
  function updateScoreboard(){ updateDashboard(); }

  /* --- Task Generation --- */
  function validateTask(task) {
    let locations = new Set();
    for (let step of task.steps) {
      if (locations.has(step.location)) {
        console.error(`Task "${task.title}" har duplikeret lokation: ${step.location}`);
        return false;
      }
      locations.add(step.location);
    }
    return true;
  }
  function generateTask(){
    if (gameState.availableTasks.length >= 10) return;
    let notUsed = window.backlog.filter(t => !gameState.usedTasks.has(t.title));
    if (!notUsed.length) return;
    let chosen = notUsed[Math.floor(Math.random() * notUsed.length)];
    if (!validateTask(chosen)) {
      console.error(`Task "${chosen.title}" er ugyldig pga. duplikerede lokationer. Skipper opgaven.`);
      return;
    }
    if (!chosen.riskProfile) { chosen.riskProfile = 1.0; }
    gameState.usedTasks.add(chosen.title);
    let newTask = JSON.parse(JSON.stringify(chosen));
    newTask.currentStep = 0;
    newTask.preRiskReduction = 0;
    newTask.architectUsed = false;
    newTask.riskProfile = chosen.riskProfile;
    gameState.availableTasks.push(newTask);
    renderTasks();
  }
  function renderTasks(){
    let tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = "";
    if (!gameState.availableTasks.length) {
      tasksList.innerHTML = "<li>Ingen opgaver tilgængelige</li>";
      return;
    }
    gameState.availableTasks.forEach(t => {
      let li = document.createElement('li');
      li.innerHTML = `<strong>${t.title}</strong><br/>${t.shortDesc || "Ingen beskrivelse"}`;
      li.addEventListener('click', () => {
        gameState.selectedTask = t;
        showPopup(`Valgt opgave: ${t.title}`, "info", 2000);
      });
      let comBtn = document.createElement('button');
      comBtn.textContent = "Forpligt";
      comBtn.classList.add('commit-button');
      comBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        assignTask(t.title);
      });
      li.appendChild(comBtn);
      tasksList.appendChild(li);
    });
  }
  function assignTask(taskTitle){
    if (gameState.activeTask) {
      showPopup("Du har allerede en aktiv opgave!", "error");
      return;
    }
    let idx = gameState.availableTasks.findIndex(x => x.title === taskTitle);
    if (idx === -1) return;
    let chosen = gameState.availableTasks.splice(idx, 1)[0];
    gameState.activeTask = chosen;
    if (chosen.narrativeIntro) { showScenarioIntroModal("Scenarie", chosen.narrativeIntro); }
    document.getElementById('active-task-headline').textContent = chosen.title;
    document.getElementById('active-task-description').textContent = chosen.shortDesc || "";
    updateStepsList();
    renderTasks();
  }
  function showScenarioIntroModal(title, text){
    scenarioIntroTitleEl.textContent = title;
    scenarioIntroTextEl.textContent = text;
    scenarioIntroModal.style.display = "flex";
  }
  function updateStepsList(){
    let stepsList = document.getElementById('steps-list');
    stepsList.innerHTML = "";
    if (!gameState.activeTask) {
      stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
      return;
    }
    let c = gameState.activeTask.currentStep || 0;
    gameState.activeTask.steps.forEach((st, i) => {
      let li = document.createElement('li');
      let loc = st.location || "ukendt lokation";
      li.textContent = `Trin ${i+1}: ${loc}`;
      if (i < c) {
        li.style.textDecoration = "line-through";
        li.style.color = "#95a5a6";
      }
      stepsList.appendChild(li);
    });
  }
  function handleLocationClick(locName){
    if (!gameState.activeTask) {
      showPopup("Vælg en opgave først!", "error");
      return;
    }
    let i = gameState.activeTask.currentStep;
    if (i >= gameState.activeTask.steps.length) return;
    let needed = gameState.activeTask.steps[i].location || "ukendt lokation";
    if (locName !== needed) return;
    showScenarioModal(i);
  }
  function showScenarioModal(stepIndex){
    scenarioModal.style.display = "flex";
    let t = gameState.activeTask;
    let st = t.steps[stepIndex];
    let loc = st.location || "ukendt";
    if (t.narrativeIntro) {
      scenarioNarrativeDiv.style.display = "block";
      scenarioNarrativeDiv.innerHTML = t.narrativeIntro;
    } else {
      scenarioNarrativeDiv.style.display = "none";
    }
    scenarioTitle.textContent = `Trin ${stepIndex+1}: ${loc}`;
    scenarioFlavorText.textContent = scenarioFlavorPool[Math.floor(Math.random() * scenarioFlavorPool.length)];
    scenarioDescription.innerHTML = `<p style="font-size:1.15rem; line-height:1.4;">${st.stepDescription || "Standard scenarie..."}</p>`;
    digDeeperLinksDiv.innerHTML = "";
    if (t.digDeeperLinks && t.digDeeperLinks.length) {
      digDeeperLinksDiv.style.display = "block";
      t.digDeeperLinks.forEach(linkObj => {
        let btn = document.createElement('button');
        btn.classList.add('commit-button');
        btn.textContent = "Mere info: " + linkObj.label;
        btn.onclick = () => showMoreInfo(linkObj.text);
        digDeeperLinksDiv.appendChild(btn);
      });
    } else {
      digDeeperLinksDiv.style.display = "none";
    }
    let modalContent = scenarioModal.querySelector('.modal-content');
    let oldContextDiv = modalContent.querySelector('#step-context-div');
    if (oldContextDiv) oldContextDiv.remove();
    if (st.stepContext) {
      let stepContextDiv = document.createElement('div');
      stepContextDiv.id = "step-context-div";
      stepContextDiv.style.marginTop = "8px";
      let contextBtn = document.createElement('button');
      contextBtn.classList.add('commit-button');
      contextBtn.textContent = "Mere info (trin)";
      contextBtn.onclick = () => showMoreInfo(st.stepContext);
      stepContextDiv.appendChild(contextBtn);
      modalContent.appendChild(stepContextDiv);
    }
    scenarioALabel.textContent = st.choiceA.label;
    scenarioAText.innerHTML = st.choiceA.text + (st.choiceA.recommended ? " <span class='recommended'>(Anbefalet, +2 tid)</span>" : "");
    scenarioBLabel.textContent = st.choiceB.label;
    scenarioBText.innerHTML = st.choiceB.text + (st.choiceB.recommended ? " <span class='recommended'>(Anbefalet, +2 tid)</span>" : "");
    scenarioAButton.onclick = () => {
      let effect = Object.assign({}, st.choiceA.applyEffect);
      if (st.choiceA.recommended) { effect.timeCost = (effect.timeCost || 0) + 2; }
      applyChoiceEffect(effect);
      finalizeStep(stepIndex);
      scenarioModal.style.display = "none";
    };
    scenarioBButton.onclick = () => {
      let effect = Object.assign({}, st.choiceB.applyEffect);
      if (st.choiceB.recommended) { effect.timeCost = (effect.timeCost || 0) + 2; }
      applyChoiceEffect(effect);
      finalizeStep(stepIndex);
      scenarioModal.style.display = "none";
    };
  }
  function applyChoiceEffect(eff){
    if (!eff) return;
    if (eff.timeCost) { applyTimeCost(eff.timeCost); }
    if (eff.statChange){
      for (let [stat, delta] of Object.entries(eff.statChange)){
        // Balancér: sikkerhed multipliceres med 0.75, udvikling med 1.25
        let multiplier = (stat === "security") ? 0.75 : (stat === "development") ? 1.25 : 1;
        let adjustedDelta = delta * multiplier * (gameState.activeTask.riskProfile || 1);
        applyStatChange(stat, adjustedDelta);
      }
    }
    if (eff.tradeOff){
      for (let [stat, delta] of Object.entries(eff.tradeOff)){
        applyStatChange(stat, delta);
      }
    }
    if (eff.riskyPlus) {
      gameState.riskyTotal += eff.riskyPlus * (gameState.activeTask.riskProfile || 1);
    }
  }
  function applyTimeCost(t) {
    if (gameState.time < t) {
      showPopup("Ikke nok tid! Spillet afsluttes.", "error");
      endGame();
      return;
    }
    gameState.time -= t;
    updateScoreboard();
    showFloatingText(`-${t} tid`, "time");
  }
  function applyStatChange(stat, delta){
    if (stat === "security" || stat === "development") {
      gameState[stat] = Math.min(Math.max(gameState[stat] + delta, 0), 40);
    }
    updateScoreboard();
    showFloatingText((delta >= 0 ? `+${delta}` : `${delta}`) + " " + stat, stat);
  }
  function finalizeStep(stepIndex) {
    let t = gameState.activeTask;
    if (!t) return;
    t.currentStep++;
    updateStepsList();
    if (t.currentStep >= t.steps.length) {
      gameState.lastFinishedTask = t;
      gameState.tasksCompleted++;
      if (gameState.tasksCompleted >= 10) {
        showInspectAndAdapt();
      } else {
        showTaskSummaryModal();
      }
    }
  }
  function showTaskSummaryModal(){
    let s = gameState.security, d = gameState.development, timeRemaining = gameState.time;
    let summary = `
      <strong>Opgave fuldført!</strong><br/>
      Status:<br/>
      Sikkerhed: ${s}, Udvikling: ${d}, Tid tilbage: ${timeRemaining}<br/><br/>
      Tips: Husk, at avancerede valg koster ekstra tid. Vurder dine valg nøje.
    `;
    let lastT = gameState.lastFinishedTask;
    if (lastT && lastT.knowledgeRecap) { summary += `<hr/><strong>Vidensopsummering:</strong><br/>${lastT.knowledgeRecap}`; }
    if (lastT && lastT.learningInfo) { summary += `<hr/><strong>Ekstra læring:</strong><br/>${lastT.learningInfo}`; }
    taskSummaryText.innerHTML = summary;
    taskSummaryModal.style.display = "flex";
  }
  function showInspectAndAdapt(){
    let s = gameState.security, d = gameState.development, timeRemaining = gameState.time;
    let report = `
      <h2>Inspect & Adapt</h2>
      <p>Du har løst ${gameState.tasksCompleted} opgaver.</p>
      <p>
        Status:<br/>
        Sikkerhed: ${s} (Mål: ${missionGoals.security})<br/>
        Udvikling: ${d} (Mål: ${missionGoals.development})<br/>
        Tid tilbage: ${timeRemaining}
      </p>
      <p>
        Hospitalet evaluerer din indsats – hvis du har nået målene, er du klar til at fortsætte som IT‑forvalter.
      </p>
      <button id="inspect-close-btn" class="commit-button">Afslut Spillet</button>
    `;
    inspectContent.innerHTML = report;
    inspectModal.style.display = "flex";
  }
  function endActiveTask(){
    if (!gameState.activeTask) return;
    gameState.activeTask = null;
    document.getElementById('active-task-headline').textContent = "Ingen aktiv opgave";
    document.getElementById('active-task-description').textContent = "";
    document.getElementById('steps-list').innerHTML = "<li>Ingen aktiv opgave</li>";
    updateScoreboard();
  }
  function showPopup(msg, type="success", duration=3000){
    let container = document.getElementById('popup-container');
    let div = document.createElement('div');
    div.classList.add('popup');
    if (type === "error") div.classList.add('error');
    else if (type === "info") div.classList.add('info');
    div.textContent = msg;
    container.appendChild(div);
    setTimeout(() => div.remove(), duration);
  }
  function showFloatingText(txt, stat){
    let fc = document.getElementById('floating-text-container');
    let div = document.createElement('div');
    div.classList.add('floating-text');
    div.style.left = "50%";
    div.style.top = "50%";
    if (stat === "security") div.style.color = "#ff4444";
    else if (stat === "development") div.style.color = "#4444ff";
    else if (stat === "time") div.style.color = "#f39c12";
    else div.style.color = "#ffffff";
    div.textContent = txt;
    fc.appendChild(div);
    setTimeout(() => div.remove(), 2000);
  }
  function showMoreInfo(infoText){
    moreInfoContent.innerHTML = infoText;
    moreInfoModal.style.display = "flex";
  }
  function showArchitectModal(){
    let t = gameState.activeTask;
    if (!t) return;
    let analysis = `<strong>Arkitekthjælp:</strong><br/><em>${t.title}</em><br/><br/><p>
      Efter at have gennemgået opgaven anbefales det særligt at fokusere på de trin, hvor der er markeret anbefalede valg.
    </p>`;
    let recommendations = "";
    t.steps.forEach((step, i) => {
      if (step.choiceA.recommended || step.choiceB.recommended) {
        recommendations += `<br/>Trin ${i+1}: `;
        if (step.choiceA.recommended) recommendations += `Vælg "${step.choiceA.label}" `;
        if (step.choiceB.recommended) recommendations += `eller "${step.choiceB.label}" `;
      }
    });
    analysis += (recommendations ? recommendations : "Ingen specifikke anbefalinger fundet.");
    architectContent.innerHTML = analysis;
    architectModal.style.display = "flex";
    t.architectUsed = true;
  }
  function startIntro(){
    const introModal = document.getElementById('intro-modal');
    introModal.style.display = 'flex';
    setTimeout(() => {
      const startBtn = document.getElementById('intro-start-btn');
      if (startBtn) startBtn.style.display = 'block';
    }, 5000);
  }
  function endGame(){
    showPopup("Spillet er slut. Tiden er opbrugt, eller du har gennemført PI'en.", "error", 5000);
    gameState.activeTask = null;
    // Her kan du udvide med en genstart eller anden afslutning
  }

  window.addEventListener('load', () => {
    startIntro();
    initDashboard();
  });
  initDashboard();
  renderLocations();
  ensureArchitectHelpButton();

  /* --- Dashboard (Chart.js) --- */
  let dashboardChart; // Deklareret ÉN gang
  function initDashboard() {
    const ctx = dashboardCanvas.getContext('2d');
    if (dashboardChart) { dashboardChart.destroy(); }
    dashboardChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Tid', 'Sikkerhed', 'Udvikling'],
        datasets: [
          {
            label: 'Nuværende Status',
            data: [gameState.time, gameState.security, gameState.development],
            backgroundColor: ['#f39c12', '#27ae60', '#8e44ad']
          },
          {
            label: 'Målsætning',
            data: [null, missionGoals.security, missionGoals.development],
            type: 'line',
            borderColor: '#f1c40f',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 40, ticks: { stepSize: 5 } } }
      }
    });
  }
  function updateDashboard() {
    if (!dashboardChart) return;
    dashboardChart.data.datasets[0].data = [gameState.time, gameState.security, gameState.development];
    dashboardChart.update();
    animateDashboardUpdate();
  }
  function animateDashboardUpdate() {
    dashboardCanvas.classList.add('kpi-update');
    setTimeout(() => dashboardCanvas.classList.remove('kpi-update'), 1000);
  }
  function updateScoreboard(){ updateDashboard(); }
});
