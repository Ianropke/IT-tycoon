/************************************************************
 * script.js – Implementeret 30 opgaver fra tabellerne
 * 3 kategorier: cybersikkerhed, infrastruktur, hospital
 * Hver opgave har: title, description, logic. 
 * "Belønning" er fjernet fra scoreboard.
 ************************************************************/

function showPopup(msg, type="success", duration=3000){
  const el = document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  el.style.animation="none";
  el.textContent= msg;
  document.getElementById('popup-container').appendChild(el);
  setTimeout(()=> el.remove(), duration);
}

// Scoreboard references
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction')
  // Ingen totalRewards – “Belønning” er fjernet
};

// Modals
const scenarioModal       = document.getElementById('scenario-modal');
const scenarioTitle       = document.getElementById('scenario-title');
const scenarioDescription = document.getElementById('scenario-description');
const scenarioALabel      = document.getElementById('scenario-a-label');
const scenarioAText       = document.getElementById('scenario-a-text');
const scenarioAButton     = document.getElementById('scenario-a-btn');
const scenarioBLabel      = document.getElementById('scenario-b-label');
const scenarioBText       = document.getElementById('scenario-b-text');
const scenarioBButton     = document.getElementById('scenario-b-btn');

const docSkipOption       = document.getElementById('doc-skip-option');
const docSkipBtn          = document.getElementById('doc-skip-btn');

const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

const endModal       = document.getElementById('end-modal');
const endGameSummary = document.getElementById('end-game-summary');
const endOkBtn       = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', ()=>{
  endModal.style.display="none";
});

const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', ()=>{
  cabModal.style.display="none";
  finalizeCABResult();
});

const cabResultModal = document.getElementById('cab-result-modal');
const cabResultTitle = document.getElementById('cab-result-title');
const cabResultText  = document.getElementById('cab-result-text');
const cabResultOkBtn = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', ()=>{
  cabResultModal.style.display="none";
});

document.getElementById('intro-ok-btn').addEventListener('click', ()=>{
  document.getElementById('intro-modal').style.display='none';
  gameState.introModalOpen=false;
});

// Global state
let gameState={
  time: 100,
  money: 1000,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,

  tasksCompleted: 0,
  activeTask: null,
  availableTasks: [],
  introModalOpen: true,

  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,

  usedTasks: new Set()
};

/** 
 * De 3 kategorier: cybersikkerhed, infrastruktur, hospital 
 * Hver med 10 opgaver (30 total). 
 * Opgaven har: 
 *    title:    Tabel-kolonnens Opgave 
 *    description: Tabelens "Kort beskrivelse" + Agenda 
 *    logic:   Tabelens “Spillets logik for spilleren”
 *    flow:    Tabelens "Trin (lokationer)"
 */
const cybersikkerhedTasks = [
  {
    title: "NetværksPenTest (ekstern firma)",
    description: "Hyre eksterne specialister til at udføre en dyb penetrationstest af alle LIMS-relaterede netværkssegmenter. (Minimering af sårbarheder, overholdelse af GDPR/ISO, intern opkvalificering af sikkerhedsprocedurer)",
    logic: "Først besøger du Cybersikkerhed for at beslutte omfanget og bestille eksternt firma. Derefter IT Jura for at sikre lovlige aftaler. Derefter Hospitalet for at koordinere nedetid. Til sidst dokumenterer du resultatet til CAB.",
    flow: ["cybersikkerhed","it-jura","hospital","dokumentation"]
  },
  {
    title: "Opdatering af Firewall-regler",
    description: "Gennemgang og opdatering af forældede firewall-regler, netværksopdeling af fx patologi og mikrobiologi for at reducere risiko for spredning.",
    logic: "Først tjekker du Informationssikkerhed for at se hullerne. Derefter Cybersikkerhed for at skrive nye firewall-politikker. Så Hospital for at planlægge servicevindue. Til sidst dokumenterer du alt.",
    flow: ["informationssikkerhed","cybersikkerhed","hospital","dokumentation"]
  },
  {
    title: "Kryptering af interne databaser",
    description: "Fuld diskkryptering og streng adgangsstyring på databaser, der ligger bag LIMS. (Sikr patientfortrolighed, GDPR-krav)",
    logic: "Først går du til Cybersikkerhed for at vælge krypteringsmetode. Dernæst Infrastruktur for selve implementeringen. Så Hospital for at teste i praksis. Til sidst dokumenteres det til CAB.",
    flow: ["cybersikkerhed","infrastruktur","hospital","dokumentation"]
  },
  {
    title: "Two-Factor Authentication (2FA)",
    description: "Rulle obligatorisk 2FA ud til alle LIMS-brugere, så uautoriseret login forhindres.",
    logic: "Først planlægger du 2FA hos Cybersikkerhed. Dernæst introducerer du det hos Hospital (personalet). Så IT Jura for at dække retningslinjer. Til sidst dokumentation.",
    flow: ["cybersikkerhed","hospital","it-jura","dokumentation"]
  },
  {
    title: "Phishing-awareness Kampagne",
    description: "Udrulle en intern kampagne med testmails og e-læring for at uddanne personalet om phishing-trusler.",
    logic: "Først udformer du kampagnen hos Cybersikkerhed. Dernæst får du Hospital (HR) med for at støtte. Så IT Jura for at sikre lovlig monitorering. Endelig dokumentation af forløbet.",
    flow: ["cybersikkerhed","hospital","it-jura","dokumentation"]
  },
  {
    title: "SOC-overvågning (Security Operation Center)",
    description: "Etablere en SOC, der overvåger logs 24/7 for mistænkelige aktiviteter i LIMS.",
    logic: "Først definerer du SOC hos Cybersikkerhed. Dernæst beder du Infrastruktur opsætte log-forwarders. Så Hospital for at aftale alarmer/eskaleringsprocedurer. Til sidst dokumentation.",
    flow: ["cybersikkerhed","infrastruktur","hospital","dokumentation"]
  },
  {
    title: "Automatisk Patch Management",
    description: "Indføre automatiske sikkerhedspatches for OS/applikationer/firmware, så sårbarheder lukkes hurtigt.",
    logic: "Først laver du strategi hos Cybersikkerhed. Dernæst implementeres det hos Infrastruktur. Så Hospital for at koordinere servicevinduer. Til sidst dokumentation.",
    flow: ["cybersikkerhed","infrastruktur","hospital","dokumentation"]
  },
  {
    title: "Adgangsbegrænsning til leverandørportaler",
    description: "Sikre, at leverandørers fjernadgang kun foregår via segmenteret netværk og krypteret linje.",
    logic: "Først sætter Cybersikkerhed krav til VPN/segmentering. Dernæst IT Jura for at opdatere kontrakter. Så involveres Leverandør. Endelig dokumentation.",
    flow: ["cybersikkerhed","it-jura","leverandor","dokumentation"]
  },
  {
    title: "Log Management & SIEM-system",
    description: "Installere et SIEM-værktøj, der samler og analyserer logs fra LIMS i realtid.",
    logic: "Først beslutter du i Cybersikkerhed valg af SIEM. Dernæst får du Infrastruktur til at opsætte log-forwarders. Så Hospital for driftstidsvindue. Endelig dokumentation.",
    flow: ["cybersikkerhed","infrastruktur","hospital","dokumentation"]
  },
  {
    title: "Segmentering af LIMS-moduler",
    description: "Opdele LIMS i separate segmenter, så fx mikrobiologi og patologi ikke påvirker hinanden ved brud.",
    logic: "Først laver du segmenteringspolitik hos Cybersikkerhed. Dernæst opsætter Infrastruktur VLAN og net. Så tester Hospital workflow. Til slut dokumentation.",
    flow: ["cybersikkerhed","infrastruktur","hospital","dokumentation"]
  },
];

const infrastrukturTasks = [
  {
    title: "Serverpark Modernisering",
    description: "Udskifte forældede fysiske servere med nye, mere strømbesparende og effektive modeller for LIMS-drift.",
    logic: "Først planlægger du hos Infrastruktur. Derefter taler du med Hospital om midlertidige forstyrrelser. Så beder du Leverandør sikre softwarekompatibilitet. Til sidst dokumentation.",
    flow: ["infrastruktur","hospital","leverandor","dokumentation"]
  },
  {
    title: "NetværksOpgradering (10 GbE)",
    description: "Implementere hurtigere netværksforbindelser mellem LIMS-servere og afdelinger (fra 1 Gbit til 10 Gbit).",
    logic: "Først sætter du netudstyr op hos Infrastruktur. Dernæst tester du hos Hospital, at alt kører. Så involverer du Cybersikkerhed for net-sikkerhed. Til slut dokumentation.",
    flow: ["infrastruktur","hospital","cybersikkerhed","dokumentation"]
  },
  {
    title: "Konsolidering af sjældent brugte moduler",
    description: "Lukke eller udfase LIMS-moduler, der ikke længere bruges, for at spare ressourcer og reducere kompleksitet.",
    logic: "Først kortlægger Infrastruktur, hvad der kan lukkes. Dernæst spørger du Hospital, om moduler virkelig er overflødige. Så inddrager du IT Jura for at opsige licenser. Til sidst dokumentation.",
    flow: ["infrastruktur","hospital","it-jura","dokumentation"]
  },
  {
    title: "Overgang til Cloud-hybrid",
    description: "Flytte dele af LIMS (fx backup/test) i en cloud-løsning for at reducere on-prem overhead.",
    logic: "Først planlægger du hos Infrastruktur. Derefter Cybersikkerhed for at sikre data i skyen. Så Hospital for at godkende testadgang. Endelig dokumentation.",
    flow: ["infrastruktur","cybersikkerhed","hospital","dokumentation"]
  },
  {
    title: "HA for kritiske systemer",
    description: "Opsætte redundante servere/failover-løsninger, så LIMS altid er online (High Availability).",
    logic: "Først opsætter du HA i Infrastruktur. Dernæst tester Hospital failover. Så beder du Leverandør om softwareunderstøttelse. Til sidst dokumentation.",
    flow: ["infrastruktur","hospital","leverandor","dokumentation"]
  },
  {
    title: "Virtualiseringsprojekt",
    description: "Indføre/udvide virtuel infrastruktur (VMware e.l.) for at køre LIMS-komponenter fleksibelt.",
    logic: "Først opsætter du hypervisor i Infrastruktur. Dernæst tester Hospital performance. Så retter Leverandør licensaftaler, hvis nødvendigt. Til sidst dokumentation.",
    flow: ["infrastruktur","hospital","leverandor","dokumentation"]
  },
  {
    title: "Afvikling af ældre software (OS-versioner)",
    description: "Lukke ned for gamle OS-versioner (Windows/Linux) for at spare licens/support og øge sikkerhed.",
    logic: "Først laver du i Infrastruktur en liste over gamle OS’er. Dernæst afklarer du med Hospital, om de kan erstatte dem. Så kontakter du IT Jura for at ophæve supportaftaler. Til sidst dokumentation.",
    flow: ["infrastruktur","hospital","it-jura","dokumentation"]
  },
  {
    title: "Energioptimering i datacenter",
    description: "Forbedre køling, bruge strømbesparende PSU’er og intelligent temperaturstyring for at sænke driftsomkostninger.",
    logic: "Først vælger du energitiltag hos Infrastruktur. Dernæst aftaler du med Hospital, om der kan være nedetid. Så taler du med Leverandøren, hvis hardwarekrav skal justeres. Til sidst dokumentation.",
    flow: ["infrastruktur","hospital","leverandor","dokumentation"]
  },
  {
    title: "Lukning af parallel-lab systemer",
    description: "Integrere ældre standalone-lab systemer i hoved-LIMS for mindre dobbelt vedligehold.",
    logic: "Først forbereder du sammensmeltning i Infrastruktur. Dernæst migrerer du data hos Hospital. Så sikrer du hos Cybersikkerhed, at gamle systemer lukkes sikkert. Endelig dokumentation.",
    flow: ["infrastruktur","hospital","cybersikkerhed","dokumentation"]
  },
  {
    title: "Migrering til container-teknologi",
    description: "Køre visse LIMS-moduler i Docker/Kubernetes for hurtigere opdateringer og skalering.",
    logic: "Først opsætter du container-miljø i Infrastruktur. Dernæst tester Hospital stabiliteten. Så inddrager du Cybersikkerhed for images og net-sikkerhed. Til sidst dokumentation.",
    flow: ["infrastruktur","hospital","cybersikkerhed","dokumentation"]
  },
];

const hospitalTasks = [
  {
    title: "Patologi Billedanalyse-Plugin",
    description: "Indføre AI-baseret billedanalyse i patologiafdelingen for hurtigere diagnostik.",
    logic: "Først udformes krav hos Hospital. Dernæst får du Leverandøren til at udvikle plugin. Så IT Jura for databehandleraftaler. Til slut dokumentation.",
    flow: ["hospital","leverandor","it-jura","dokumentation"]
  },
  {
    title: "Biokemi Lab-automatisering",
    description: "Automatisere prøvehåndtering, så personalet slipper for manuelle indtastninger i LIMS.",
    logic: "Først beskriver du nye arbejdsgange hos Hospital. Dernæst Infrastruktur for at koble lab-robotter. Så Cybersikkerhed for at tjekke dataflows. Til sidst dokumentation.",
    flow: ["hospital","infrastruktur","cybersikkerhed","dokumentation"]
  },
  {
    title: "Mikrobiologi Real-time Monitoring",
    description: "Overvåge mikrobiologiske tests i realtid, så læger løbende kan se resultater.",
    logic: "Først afklarer du behovet hos Hospital. Dernæst opgraderer du Infrastruktur (server/net). Så Leverandør for at tilpasse LIMS. Til slut dokumentation.",
    flow: ["hospital","infrastruktur","leverandor","dokumentation"]
  },
  {
    title: "Klinisk Genetik BigData Integration",
    description: "Forbinde LIMS med ekstern gen-database, så specialister kan få variantfortolkninger.",
    logic: "Først definere du krav hos Hospital. Dernæst beder du Leverandøren om at bygge interface. Så Cybersikkerhed for at sikre gen-data. Til sidst dokumentation.",
    flow: ["hospital","leverandor","cybersikkerhed","dokumentation"]
  },
  {
    title: "Automatiseret rapportskabelon",
    description: "Udvide LIMS med funktion til at generere standardrapporter (fx onkologi, endokrinologi).",
    logic: "Først taler du med Hospital om kravspec. Dernæst Leverandør for at udvikle det. Så IT Jura om dataopbevaring i rapporter. Endelig dokumentation.",
    flow: ["hospital","leverandor","it-jura","dokumentation"]
  },
  {
    title: "Immunologi DataDashboard",
    description: "Et brugervenligt dashboard, der viser igangværende tests og forventet svartid i immunologi.",
    logic: "Først designer du UI hos Hospital. Dernæst inddrager du Infrastruktur for realtidsvisning. Så Cybersikkerhed for at styre adgang. Til sidst dokumentation.",
    flow: ["hospital","infrastruktur","cybersikkerhed","dokumentation"]
  },
  {
    title: "LIMS-UI Forbedring i KBA",
    description: "Forenkle menustruktur og lave hurtig-søg i Klinisk Biokemi, så personalet finder prøveresultater nemt.",
    logic: "Først afklarer du brugernes ønsker hos Hospital. Dernæst Leverandør for selve UI-ændringerne. Så IT Jura for evt. licensaftaler. Til sidst dokumentation.",
    flow: ["hospital","leverandor","it-jura","dokumentation"]
  },
  {
    title: "Multi-sprog i LIMS",
    description: "Gøre det muligt at skifte sprog, fx engelsk, til internationale ansatte.",
    logic: "Først undersøger du hospitalets behov for sprogpakker. Dernæst aftaler du med Leverandøren at implementere dem. Så sikrer du med Infrastruktur, at ydelsen er den samme. Endelig evt. tjek med Jura, og dokumenterer alt.",
    flow: ["hospital","leverandor","infrastruktur","dokumentation"]
  },
  {
    title: "MobilApp til Lab-gange",
    description: "En app, hvor personalet kan se teststatus og bestille analyser fra tablet/mobil.",
    logic: "Først definerer du app-funktioner hos Hospital. Dernæst får du Leverandøren til at lave appen. Så kontakter du Cybersikkerhed for at sikre databeskyttelse. Til sidst dokumentation.",
    flow: ["hospital","leverandor","cybersikkerhed","dokumentation"]
  },
  {
    title: "Quick-View for akutte patienter",
    description: "Prioritér akutte patientresultater i en “hurtig-liste”, så personalet hurtigt ser vigtige data.",
    logic: "Først spørger du Hospital, hvad der skal i quick-listen. Derefter Leverandør for at udvikle funktionen. Så Infrastruktur for at teste serverbelastning. Endelig dokumentation.",
    flow: ["hospital","leverandor","infrastruktur","dokumentation"]
  },
];

// Kategorier i en opslagsstruktur:
const categoryTaskData = {
  "cybersikkerhed": cybersikkerhedTasks,
  "infrastruktur": infrastrukturTasks,
  "hospital": hospitalTasks
};

function updateScoreboard(){
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  scoreboard.tasksCompleted.textContent = gameState.tasksCompleted;
  // Ingen belønning i scoreboard
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
}

// Steps-liste
function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const current= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName,i)=>{
    const li=document.createElement("li");
    li.textContent= `Trin ${i+1}: ${locName}`;
    if(i< current){
      li.style.textDecoration="line-through";
      li.style.color="#95a5a6";
    }
    stepsList.appendChild(li);
  });
  const prog=document.createElement("li");
  prog.style.color="#aaa";
  prog.textContent=`Trin ${current+1} / ${gameState.activeTask.steps.length}`;
  stepsList.appendChild(prog);
}

function handleLocationClick(locName){
  if(!gameState.activeTask){
    showPopup("Vælg en opgave først!", "error");
    return;
  }
  const idx= gameState.activeTask.currentStep;
  if(idx>= gameState.activeTask.steps.length) return;

  const needed= gameState.activeTask.steps[idx];
  if(needed.toLowerCase()==="dokumentation"){
    skipDocumentationPopup();
    return;
  }
  if(locName.toLowerCase()!== needed.toLowerCase()) return;

  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[idx])return;
  gameState.activeTask.decisionMadeForStep[idx]=true;

  showScenarioModal(locName);
}

// Dokumentations-skip
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";

  scenarioTitle.textContent= "Dokumentationstrin";
  scenarioDescription.textContent= "CAB vil have papir, men du kan skippe...";

  scenarioALabel.textContent= "Fuldt Dok";
  scenarioAText.textContent= "3 tid, 10 kr, ingen ekstra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep();
  };

  scenarioBLabel.textContent= "Minimal Dok";
  scenarioBText.textContent= "1 tid, 0 kr, +5% fejl";
  scenarioBButton.onclick=()=>{
    applyTimeCost(1);
    gameState.riskyTotal+=0.05;
    scenarioModal.style.display="none";
    finalizeStep();
  };
  docSkipBtn.onclick=()=>{
    gameState.docSkipCount++;
    scenarioModal.style.display="none";
    finalizeStep();
  };
}

// Viser scenario
function showScenarioModal(locName){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";

  // Fallback scenario
  scenarioTitle.textContent= locName;
  scenarioDescription.textContent= "(Standard scenario: fx +2 stabilitet, -50 kr, +10% fejl)";

  scenarioALabel.textContent= "Mulighed A (standard)";
  scenarioAText.textContent= "2 tid, 50 kr; +2 stabilitet";
  scenarioAButton.onclick=()=>{
    applyTimeCost(2);
    applyMoneyCost(50);
    applyStatChange("stability",2);
    scenarioModal.style.display="none";
    finalizeStep();
  };
  scenarioBLabel.textContent= "Mulighed B (hurtig)";
  scenarioBText.textContent= "1 tid, 0 kr; +10% fejlrisiko";
  scenarioBButton.onclick=()=>{
    gameState.riskyTotal+=0.1;
    scenarioModal.style.display="none";
    finalizeStep();
  };
  // Hvis du ønsker unikke scenarier for hver lokation, kan du 
  // opdatere med "detailedScenarios[locName]" ligesom før. 
}

// finalize step
function finalizeStep(){
  if(!gameState.activeTask)return;
  applyTimeCost(5);
  gameState.activeTask.currentStep++;
  if(gameState.activeTask.currentStep>= gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

// CAB
function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.15);
  fail= Math.max(0, Math.min(fail,1));
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Risikoprocent: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    SkipDok: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
    Samlet fejlchance: ${(fail*100).toFixed(0)}%
  `;
}
function finalizeCABResult(){
  cabModal.style.display="none";
  const r= Math.random();
  if(r< gameState.finalFailChance){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}
function showCABResult(isSuccess){
  cabResultModal.style.display="flex";
  if(isSuccess){
    cabResultTitle.textContent="CAB: Godkendt!";
    cabResultText.textContent="Opgaven godkendes trods eventuelle risici.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="CAB fandt risici/manglende dok for høje. Opgave fejler.";
    failTaskCAB();
  }
}
function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction",-10);
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}
function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask)return;
  // Ingen belønning
  // Just final success 
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();
  showPopup("Opgave fuldført!", "success", 4000);
}

// Tid/penge
function applyTimeCost(t){
  gameState.time-=t;
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money-=m;
  updateScoreboard();
}
function applyStatChange(stat,delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}
function showFloatingText(txt, stat){
  const c= document.getElementById('floating-text-container');
  const div= document.createElement('div');
  div.classList.add('floating-text');
  div.style.left= "50%";
  div.style.top= "50%";
  if(stat==="security") div.style.color="#ff4444";
  else if(stat==="stability") div.style.color="#44ff44";
  else if(stat==="development") div.style.color="#4444ff";
  else if(stat==="hospitalSatisfaction") div.style.color="#ffc107";
  else div.style.color="#ffffff";
  div.textContent= txt;
  c.appendChild(div);
  setTimeout(()=> div.remove(), 2000);
}

// Arrays med 30 tasks total
const categoryTasks = {
  "cybersikkerhed": cybersikkerhedTasks,
  "infrastruktur": infrastrukturTasks,
  "hospital": hospitalTasks
};

function renderTasks(){
  tasksList.innerHTML="";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML="<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t=>{
    const li=document.createElement("li");
    if(t.riskLevel===3){ li.style.borderColor="red"; li.style.borderWidth="2px"; }
    else if(t.riskLevel===2){ li.style.borderColor="orange"; }
    else { li.style.borderColor="green"; }
    let pLabel= (t.riskLevel===3)?" (HØJPRIORITET)":"";
    let risk= t.riskLevel;
    li.innerHTML=`
      <strong>${t.title}${pLabel}</strong><br/>
      Risiko: ${risk}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const btn=document.createElement("button");
    btn.classList.add("commit-button");
    btn.textContent="Forpligt";
    btn.addEventListener("click",(e)=>{
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener("click",()=>{
      li.querySelectorAll(".task-description").forEach(d=>{
        d.style.display=(d.style.display==="none"?"block":"none");
      });
    });
    li.appendChild(btn);
    tasksList.appendChild(li);
  });
}

// Opgave generation
function generateTask(){
  // Ingen random “development/stability/security” – 
  // i stedet: cybersikkerhed, infrastruktur, hospital
  const cats=["cybersikkerhed","infrastruktur","hospital"];
  const cat= cats[Math.floor(Math.random()* cats.length)];

  const tasksArr= categoryTasks[cat];
  if(!tasksArr) return;
  // Filtrer tasks, der ikke er brugt
  const possible = tasksArr.filter(opg=> !gameState.usedTasks.has(opg.title));
  if(!possible.length) return;

  // Tag en tilfældig
  const chosen= possible[Math.floor(Math.random()* possible.length)];
  // Markér den som brugt
  gameState.usedTasks.add(chosen.title);

  // riskLevel for sjov
  const riskLevel= Math.floor(Math.random()*3)+1;

  // Sæt opgave i “availableTasks” (ingen belønning, men tid/penge i minus)
  const newTask={
    id: Date.now()+ Math.floor(Math.random()*1000),
    category: cat,
    title: chosen.title,
    description: chosen.description, 
    logic: chosen.logic,  // spillets logik
    steps: chosen.flow,   // lokationer i den rækkefølge
    currentStep: 0,
    riskLevel: riskLevel,
    decisionMadeForStep:{}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  const idx= gameState.availableTasks.findIndex(t=> t.id===taskId);
  if(idx===-1)return;
  const chosen= gameState.availableTasks.splice(idx,1)[0];
  
  // Sæt Opgaveoverskrift + den korte beskrivelse i “headline”
  // Sæt "Spillets logik" i activeTaskDesc
  gameState.activeTask= chosen;
  activeTaskHeadline.textContent= chosen.title + " – " + chosen.description;
  // Her tilføjer vi “logic” i activeTaskDesc
  activeTaskDesc.textContent= chosen.logic;

  updateStepsList();
  renderTasks();
}

// Slutspil
function endGame(){
  let sumText= `
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML= sumText;
  endModal.style.display="flex";
  
  // Ryd aktiv opgave
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

function initGame(){
  updateScoreboard();
  // Generer fx 2 opgaver fra start
  for(let i=0; i<2; i++){
    generateTask();
  }
  // Løbende generering
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

// Lokation-lister
const locationElements={
  "Infrastruktur": document.getElementById('infrastruktur'),
  "Informationssikkerhed": document.getElementById('informationssikkerhed'),
  "Hospital": document.getElementById('hospital'),
  "Leverandør": document.getElementById('leverandor'),
  "Medicinsk Udstyr": document.getElementById('medicinsk-udstyr'),
  "IT Jura": document.getElementById('it-jura'),
  "Cybersikkerhed": document.getElementById('cybersikkerhed'),
  "Dokumentation": document.getElementById('dokumentation')
};
Object.values(locationElements).forEach(el=>{
  el.addEventListener('click',()=>{
    handleLocationClick(el.id);
  });
});

initGame();
