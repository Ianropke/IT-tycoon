/************************************************************
 * script.js
 * IT Tycoon: LIMS Forvaltning – Udvidet version med detaljerede scenarier
 ************************************************************/

// Elementreferencer fra index.html
const securityValueEl    = document.getElementById('security-value');
const stabilityValueEl   = document.getElementById('stability-value');
const developmentValueEl = document.getElementById('development-value');
const timeLeftEl         = document.getElementById('time-left');
const moneyLeftEl        = document.getElementById('money-left');

const scoreboard = {
  tasksCompleted: document.getElementById('tasks-completed'),
  totalRewards: document.getElementById('total-rewards'),
  hospitalSatisfaction: document.getElementById('hospital-satisfaction'),
};

// Scenario modal references
const scenarioModal        = document.getElementById('scenario-modal');
const scenarioTitle        = document.getElementById('scenario-title');
const scenarioDescription  = document.getElementById('scenario-description');
const scenarioALabel       = document.getElementById('scenario-a-label');
const scenarioAText        = document.getElementById('scenario-a-text');
const scenarioAButton      = document.getElementById('scenario-a-btn');
const scenarioBLabel       = document.getElementById('scenario-b-label');
const scenarioBText        = document.getElementById('scenario-b-text');
const scenarioBButton      = document.getElementById('scenario-b-btn');

const tasksList          = document.getElementById('tasks-list');
const stepsList          = document.getElementById('steps-list');
const activeTaskHeadline = document.getElementById('active-task-headline');
const activeTaskDesc     = document.getElementById('active-task-description');

// End-of-Time Modal
const endModal        = document.getElementById('end-modal');
const endGameSummary  = document.getElementById('end-game-summary');
const endOkBtn        = document.getElementById('end-ok-btn');
endOkBtn.addEventListener('click', () => {
  endModal.style.display = "none";
});

// CAB Modal
const cabModal     = document.getElementById('cab-modal');
const cabSummary   = document.getElementById('cab-summary');
const cabOkBtn     = document.getElementById('cab-ok-btn');
cabOkBtn.addEventListener('click', () => {
  cabModal.style.display = "none";
  finalizeCABResult();
});

// CAB Result Modal
const cabResultModal  = document.getElementById('cab-result-modal');
const cabResultTitle  = document.getElementById('cab-result-title');
const cabResultText   = document.getElementById('cab-result-text');
const cabResultOkBtn  = document.getElementById('cab-result-ok-btn');
cabResultOkBtn.addEventListener('click', () => {
  cabResultModal.style.display = "none";
});

// Intro Modal
document.getElementById('intro-ok-btn').addEventListener('click', () => {
  document.getElementById('intro-modal').style.display = 'none';
  gameState.introModalOpen = false;
});

// Game state
let gameState = {
  time: 100,
  money: 1000,
  security: 100,
  stability: 100,
  development: 100,
  hospitalSatisfaction: 100,
  tasksCompleted: 0,
  totalRewards: 0,
  activeTask: null,
  availableTasks: [],
  introModalOpen: true,
  docSkipCount: 0,
  riskyTotal: 0,
  finalFailChance: 0,
  usedTasks: new Set() // Undgå dubletter
};

// Opdater score board
function updateScoreboard() {
  timeLeftEl.textContent   = gameState.time;
  moneyLeftEl.textContent  = gameState.money;
  scoreboard.tasksCompleted.textContent     = gameState.tasksCompleted;
  scoreboard.totalRewards.textContent       = gameState.totalRewards;
  scoreboard.hospitalSatisfaction.textContent = gameState.hospitalSatisfaction;
  securityValueEl.textContent    = gameState.security;
  stabilityValueEl.textContent   = gameState.stability;
  developmentValueEl.textContent = gameState.development;
}

// Lokationer
const locations = {
  Infrastruktur: document.getElementById('infrastruktur'),
  Informationssikkerhed: document.getElementById('informationssikkerhed'),
  Hospital: document.getElementById('hospital'),
  Leverandør: document.getElementById('leverandor'),
  "Medicinsk Udstyr": document.getElementById('medicinsk-udstyr'),
  "IT Jura": document.getElementById('it-jura'),
  Cybersikkerhed: document.getElementById('cybersikkerhed'),
  Dokumentation: document.getElementById('dokumentation')
};

Object.entries(locations).forEach(([locName, el]) => {
  el.addEventListener('click', () => {
    handleLocationClick(locName);
  });
});

/* ------------------------------------------ */
/* Detaljerede Scenarier (10 pr. lokation)     */
/* ------------------------------------------ */
const detailedScenarios = {
  "Hospital": [
    {
      description: "Personalet oplever, at det nuværende LIMS-modul til patologi er langsomt og ineffektivt.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Udfør en basal opgradering: Investér 2 tid og 50 kr for at opdatere brugerfladen og forfine workflowet. Effekten: +1 stabilitet og +1 hospitalstilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Implementér en komplet opgradering med avanceret billedanalyse og realtidsdata: Brug 5 tid og 150 kr, hvilket giver +3 hospitalstilfredshed og +2 udvikling, men 5% ekstra fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Immunologiske analyser i LIMS er ineffektive, og personalet kæmper med forældede funktioner.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Udfør en basal opgradering: 2 tid, 50 kr; Effekten: +1 stabilitet og +1 hospitalstilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Invester i en komplet opgradering med avanceret teknologi: 5 tid, 150 kr; Effekten: +3 hospitalstilfredshed, +2 udvikling, 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Biokemi-afdelingen får ikke de nødvendige data til at træffe beslutninger.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Implementér en mindre opgradering for forbedret datavisualisering: 2 tid, 50 kr; +1 stabilitet og +1 tilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Udrul en fuld dataintegrationsløsning: 5 tid, 150 kr; +3 tilfredshed og +2 udvikling, med 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Personalet klager over en forældet brugerflade, der forringer arbejdsgangen.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Opdater layoutet med en standard opgradering: 2 tid, 50 kr; +1 stabilitet og +1 tilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Implementér et innovativt redesign med avancerede funktioner: 5 tid, 150 kr; +3 tilfredshed, +2 udvikling, 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Afdelingen udtrykker behov for et ekstra modul til realtidsrapportering.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Tilføj et standard modul med begrænset funktionalitet: 2 tid, 50 kr; +1 stabilitet, +1 tilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Udvikl et avanceret modul med omfattende realtidsfunktioner: 5 tid, 150 kr; +3 tilfredshed, +2 udvikling, 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Der er generelt en efterspørgsel efter flere værktøjer til dataanalyse i LIMS.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Gennemfør en lille opgradering med standard analyseredskaber: 2 tid, 50 kr; +1 stabilitet, +1 tilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Invester i et fuldt integreret analysesystem med avanceret AI: 5 tid, 150 kr; +3 tilfredshed, +2 udvikling, 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Personalet rapporterer, at manuelle indtastninger forstyrrer den daglige drift.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Implementér et simpelt automatiseringsmodul: 2 tid, 50 kr; +1 stabilitet, +1 tilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Rul en komplet automatiseringsløsning ud med AI-assistance: 5 tid, 150 kr; +3 tilfredshed, +2 udvikling, 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Forældede processer i LIMS forårsager forstyrrelser i afdelingsarbejdet.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Opdater eksisterende processer med en standard opgradering: 2 tid, 50 kr; +1 stabilitet, +1 tilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Gennemfør en fuld procesomlægning, der optimerer og digitaliserer arbejdsgangene: 5 tid, 150 kr; +3 tilfredshed, +2 udvikling, 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    },
    {
      description: "Der er behov for at implementere et feedbacksystem til at måle brugertilfredsheden.",
      A: {
        label: "Konservativ Udvidelse",
        text: "Tilføj et simpelt feedbackmodul: 2 tid, 50 kr; +1 stabilitet, +1 tilfredshed.",
        time: 2,
        money: 50,
        effects: { stability: 1, hospitalSatisfaction: 1 },
        failBonus: 0
      },
      B: {
        label: "Stor Modernisering",
        text: "Udvikl et avanceret, interaktivt feedbacksystem med dybdegående analyser: 5 tid, 150 kr; +3 tilfredshed, +2 udvikling, 5% fejlrisiko.",
        time: 5,
        money: 150,
        effects: { hospitalSatisfaction: 3, development: 2 },
        failBonus: 0.05
      }
    }
  ],
  "IT Jura": [
    {
      description: "Leverandørkontrakter med ScanCare er komplekse og usikre.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Foretag en omfattende revision med detaljeret gennemgang af alle klausuler. Omkostninger: 4 tid, 150 kr; +2 sikkerhed og +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Brug en standard skabelon til en hurtig revision. Omkostninger: 1 tid, 0 kr; (Bemærk: ingen bonus i udvikling) men +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "Der er uklarheder om betalingsbetingelser i kontrakten med Genomio Labs.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Foretag en detaljeret revision for at sikre forudsigelig betaling: 4 tid, 150 kr; +2 sikkerhed og +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Gennemfør en hurtig revision med standard vilkår: 1 tid, 0 kr; ingen bonus i udvikling, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "De nuværende kontrakter dækker ikke alle EU-krav.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Udarbejd en detaljeret revision der sikrer overensstemmelse med EU-krav: 4 tid, 150 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Gennemfør en standard revision: 1 tid, 0 kr; uden bonus i udvikling, men med 10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "Leverandøren har været i konflikt med tidligere kunder.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Foretag en omfattende revision med fokus på at undgå fremtidige konflikter: 4 tid, 150 kr; +2 sikkerhed og +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Brug en hurtig standardrevision: 1 tid, 0 kr; ingen bonus i udvikling, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "Der mangler klare ansvarsfordelinger i kontrakten.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Udarbejd en omfattende revision med klare rollebeskrivelser: 4 tid, 150 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Gennemfør en simpel revision med standardansvarsfordeling: 1 tid, 0 kr; ingen udviklingsbonus, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "De juridiske vilkår mangler klare exit-strategier.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Indfør en komplet forhandlingsproces med exit-klausuler: 4 tid, 150 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Vælg en hurtig revision med standard exit-betingelser: 1 tid, 0 kr; ingen bonus i udvikling, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "Kontrakten indeholder for mange tekniske uoverensstemmelser.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Foretag en dybdegående gennemgang af alle uoverensstemmelser: 4 tid, 150 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Udfør en standardrevision der retter de mest væsentlige fejl: 1 tid, 0 kr; ingen udviklingsbonus, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "Leverandøren kræver fuld forudbetaling uden garantier.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Forhandl en revision der sikrer garantier for hospitalet: 4 tid, 150 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Accepter en hurtig standardrevision: 1 tid, 0 kr; ingen bonus i udvikling, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "Der er usikkerhed omkring supportvilkår i kontrakten.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Foretag en revision der sikrer detaljerede supportvilkår: 4 tid, 150 kr; +2 sikkerhed og +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Gennemfør en hurtig revision med standard supportvilkår: 1 tid, 0 kr; ingen bonus i udvikling, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    },
    {
      description: "Kontrakten mangler incitamenter, der fremmer kvalitet.",
      A: {
        label: "Grundig Kontraktrevision",
        text: "Tilføj incitamentsprogram og sikkerhedsklausuler: 4 tid, 150 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 150,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Minimal Revision",
        text: "Brug standardvilkår uden incitamenter: 1 tid, 0 kr; ingen bonus i udvikling, +10% fejlrisiko.",
        time: 1,
        money: 0,
        effects: { },
        failBonus: 0.10
      }
    }
  ],
  "Leverandør": [
    {
      description: "Der er mistanke om, at systemløsningen fra Teknova Solutions ikke lever op til kravene i patologi.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Gennemfør en dybdegående kvalitetsinspektion: 6 tid, 200 kr; +2 stabilitet og +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Vælg en hurtig standardiseret løsning: 2 tid, 50 kr; +1 stabilitet, men 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Løsningen skal understøtte et nyt bioinformatikmodul, men leverandørens kapacitet er usikker.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Planlæg en fuld kvalitetssikring og test af modulintegrationen: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Accepter en hurtig leverance med basisfunktioner: 2 tid, 50 kr; +1 stabilitet, men 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er kritik af systemets skalerbarhed fra tidligere kunder.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Invester i en omfattende løsning med ekstra test og stabilitetsforbedringer: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Vælg en hurtig løsning, der dog medfører 10% øget risiko: 2 tid, 50 kr; +1 stabilitet.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Leverandøren skal opfylde avancerede krav fra klinisk genetik.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Gennemfør en detaljeret kvalitetsrevision: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Accepter en hurtig standardløsning: 2 tid, 50 kr; +1 stabilitet, men 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er behov for at sikre fuld integration af systemets moduler.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Udfør en komplet integrationstest med ekstern ekspertise: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Implementer en hurtig integration med standardtests: 2 tid, 50 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Tidligere leverancer har haft fejl i rapporteringen af kritiske data.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Udfør en dybdegående kvalitetskontrol med fokus på dataredundans: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Gennemfør en hurtig revision, der kun adresserer de mest alvorlige fejl: 2 tid, 50 kr; +1 stabilitet, 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er bekymring for, om Teknova kan levere en fuldt funktionel løsning til immunologi.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Gennemfør en fuld kvalitetsrevision med eksterne specialister: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Vælg en hurtig leverance med basisfunktioner: 2 tid, 50 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Eksisterende kontrakter med Teknova har utilstrækkelig support.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Forhandl en avanceret supportaftale med dedikeret hotline og SLA: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Acceptér en hurtig standard supportaftale: 2 tid, 50 kr; +1 stabilitet, men 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er behov for at imødekomme nye markedskrav til systemets funktionalitet.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Anvend en komplet revision af systemarkitekturen: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Implementer et hurtigt patchbaseret update: 2 tid, 50 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Leverandørens løsning skal tilpasses et specifikt specialområde, fx klinisk genetik.",
      A: {
        label: "Omfattende Kvalitetssikring",
        text: "Udfør en omfattende tilpasning med involvering af eksperter: 6 tid, 200 kr; +2 stabilitet, +1 sikkerhed.",
        time: 6,
        money: 200,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Leverance",
        text: "Vælg en hurtig, generisk løsning med minimal tilpasning: 2 tid, 50 kr; +1 stabilitet, men 10% fejlrisiko.",
        time: 2,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    }
  ],
  "Infrastruktur": [
    {
      description: "Serverparken er aldrende og forårsager intermitterende nedbrud.",
      A: {
        label: "Stor Modernisering",
        text: "Implementér en fuld opgradering med nye, redundante systemer: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Udfør en hurtig patch for at rette de akutte fejl: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Der er konstante driftsafbrydelser i biokemi-afdelingen.",
      A: {
        label: "Stor Modernisering",
        text: "Udskift de ældre servere og opgrader netværksinfrastrukturen: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Lav en midlertidig optimering af belastningsfordelingen: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Netværkslatensen påvirker hastigheden på kritiske LIMS-applikationer.",
      A: {
        label: "Stor Modernisering",
        text: "Installer moderne switches og redundans for at reducere latency: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Optimer den eksisterende netværksopsætning: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Datacenteret i patologi er ofte overbelastet.",
      A: {
        label: "Stor Modernisering",
        text: "Invester i en fuld kapacitetsudvidelse med nye servere: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Lav en midlertidig kapacitetsforøgelse via optimering af den eksisterende hardware: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Ældre hardware forårsager hyppige systemnedbrud.",
      A: {
        label: "Stor Modernisering",
        text: "Erstat den forældede hardware med moderne løsninger: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Udfør en hurtig reparation for at forlænge hardwarelevetiden: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Der er problemer med driftsikkerheden i serverparken for klinisk genetik.",
      A: {
        label: "Stor Modernisering",
        text: "Udrul en komplet modernisering med højtydende komponenter: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Gennemfør en hurtig genkonfiguration for at stabilisere driften: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Netværkets skalerbarhed er utilstrækkelig for de nye datamængder.",
      A: {
        label: "Stor Modernisering",
        text: "Implementér en fuld skalerbarhedsopgradering med cloud-integration: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Foretag en hurtig optimering af netværksforbindelserne: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Mangelfuld redundans fører til tab af data under afbrydelser.",
      A: {
        label: "Stor Modernisering",
        text: "Installer et fuldt redundant backup-system med avanceret failover: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Udfør en hurtig replikering af kritiske data: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    },
    {
      description: "Overgangen til en hybrid cloud-løsning kræver opgradering af det fysiske setup.",
      A: {
        label: "Stor Modernisering",
        text: "Udrul en komplet opgradering med moderne cloud-teknologi: 5 tid, 200 kr; +2 stabilitet og +2 udvikling.",
        time: 5,
        money: 200,
        effects: { stability: 2, development: 2 },
        failBonus: 0
      },
      B: {
        label: "Minimal Patch",
        text: "Installer en midlertidig cloud-gateway for at lette overgangen: 1 tid, 50 kr; +1 stabilitet, men med 5% fejlrisiko.",
        time: 1,
        money: 50,
        effects: { stability: 1 },
        failBonus: 0.05
      }
    }
  ],
  "Informationssikkerhed": [
    {
      description: "Systemet udviser alvorlige sikkerhedshuller ved dataoverførsler.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Rul en avanceret krypteringsløsning ud på alle datapunkter med overvågning: 4 tid, 60 kr; +2 sikkerhed og +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Implementér en basal kryptering, der dækker de vigtigste forbindelser: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Patientdata sendes ukrypteret mellem laboratorierne.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Konfigurer en end-to-end kryptering med fuld logning: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Tilføj simpel kryptering til de kritiske kanaler: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er sporadiske uautoriserede adgangsforsøg.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Installer avancerede intrusion detection-systemer: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Opdater adgangskontrolreglerne: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Firewall-reglerne er forældede og ineffektive.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Konfigurer moderne firewalls med segmentering: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Opdatér de eksisterende regler med standard patch: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Logdata viser uregelmæssigheder, der kan indikere datalæk.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Udrul en central logserver med SIEM-integration: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Gennemfør en kort logrevision: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "GDPR-krav kræver en opgradering af datasikkerheden.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Implementer en fuld databeskyttelsesstrategi: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Udfør en minimalistisk revision: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er rapporteret om mistænkelig trafik mellem interne systemer.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Installer et avanceret overvågningssystem med proaktiv alarm: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Udfør en hurtig analyse af trafikmønstre: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Sikkerhedstest afslører uopdagede sårbarheder.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Udrul et avanceret penetrationstest-program: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Installer simpel kryptering med standardprotokol: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der opstår gentagne problemer med GDPR-overholdelse.",
      A: {
        label: "Fuld Kryptering og Overvågning",
        text: "Udrul en fuld sikkerhedsløsning der sikrer alle GDPR-krav: 4 tid, 60 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 60,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Basal Sikkerhedsløsning",
        text: "Brug en standardløsning der dækker de mest kritiske punkter: 2 tid, 0 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 0,
        effects: { security: 1 },
        failBonus: 0.10
      }
    }
  ],
  "Medicinsk Udstyr": [
    {
      description: "Blodprøveapparaterne viser gentagne fejl og unøjagtigheder.",
      A: {
        label: "Grundig Vedligehold",
        text: "Udfør en dybdegående inspektion og udskiftning af slidte komponenter: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Udfør en midlertidig reparation for at afhjælpe de presserende fejl: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Kalibreringen af analyseudstyret er forældet.",
      A: {
        label: "Grundig Vedligehold",
        text: "Gennemfør en fuld kalibrerings- og justeringsprocedure: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Lav en hurtig kalibrering for midlertidigt at rette unøjagtighederne: 1 tid, 20 kr; +1 stabilitet, men 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der rapporteres om hyppige systemnedbrud under kritiske tests.",
      A: {
        label: "Grundig Vedligehold",
        text: "Udfør en omfattende diagnosticering og softwareopgradering: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Implementer en midlertidig patch: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Brugergrænsefladen er forældet og forvirrende for laboratoriepersonalet.",
      A: {
        label: "Grundig Vedligehold",
        text: "Design og implementer en ny, intuitiv brugerflade: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Lav en hurtig opgradering af den eksisterende grænseflade: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er uoverensstemmelser i dataoutput under mikrobiologiske tests.",
      A: {
        label: "Grundig Vedligehold",
        text: "Udfør en detaljeret gennemgang af udstyrssoftwaren og rekalibrer alle enheder: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Udfør hurtige justeringer for midlertidigt at afhjælpe datafejlene: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Patientmonitoreringssystemet fungerer ustabilt i klinisk genetik.",
      A: {
        label: "Grundig Vedligehold",
        text: "Erstat ældre komponenter med nye, avancerede enheder: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Implementér en hurtig fejlfinding og kortsigtet reparation: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Udstyrets software giver fejlagtige rapporter ved kritiske analyser.",
      A: {
        label: "Grundig Vedligehold",
        text: "Udfør en fuld softwareopdatering med omfattende test: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Gennemfør en hurtig patch af de kritiske softwaredele: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er behov for at modernisere integrationen mellem udstyrsdata og LIMS.",
      A: {
        label: "Grundig Vedligehold",
        text: "Implementér en omfattende integration med avanceret API og datavalidering: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Udfør en hurtig integration med standardprotokoller: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er behov for at sikre, at systemet efterlever ISO-standarder for medicinsk udstyr.",
      A: {
        label: "Grundig Vedligehold",
        text: "Udfør en komplet revisions- og opgraderingsproces med eksterne eksperter: 4 tid, 120 kr; +2 stabilitet, +1 sikkerhed.",
        time: 4,
        money: 120,
        effects: { stability: 2, security: 1 },
        failBonus: 0
      },
      B: {
        label: "Hurtig Fix",
        text: "Lav en kort revision, der dækker de mest kritiske aspekter: 1 tid, 20 kr; +1 stabilitet, men med 10% fejlrisiko.",
        time: 1,
        money: 20,
        effects: { stability: 1 },
        failBonus: 0.10
      }
    }
  ],
  "Cybersikkerhed": [
    {
      description: "Interne dataoverførsler mellem LIMS-komponenter er synlige og sårbare.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Udfør en omfattende end-to-end krypteringsløsning med avancerede sikkerhedsværktøjer: 4 tid, 80 kr; +2 sikkerhed og +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Indfør en basal krypteringsløsning på de mest kritiske datapunkter: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er konstateret uautoriseret adgang til datatransmission i LIMS.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Installer et fuldt IDS/IPS-system og opgrader firewallen: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Udfør en hurtig firewall-opdatering og implementer simple adgangskontrolmekanismer: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Vigtige datapunkter sendes uden kryptering, hvilket kan føre til datalæk.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Implementér en avanceret krypteringsprotokol der beskytter alle dataoverførsler: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Indfør simpel kryptering for de mest følsomme data: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der opstår gentagne hackerangreb på LIMS.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Foretag en dyb penetrationstest og opdater alle sikkerhedsprotokoller: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Kør en standard sårbarhedsscanning og installer tilgængelige patches: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er mistænkelige aktiviteter i netværket, der kan kompromittere patientdata.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Udrul et centralt overvågningssystem med realtidsalarmer: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Udfør en hurtig manuel gennemgang af logdata og juster eksisterende sikkerhedsregler: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Risikoen for phishing-angreb på LIMS-stationerne er voksende.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Implementér omfattende sikkerhedsuddannelse og tofaktorautentificering: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Gennemfør en kort oplysningskampagne og basale sikkerhedsforanstaltninger: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der er flere kendte sårbarheder, der udnyttes i systemet.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Anvend en fuld patch management-løsning med automatiserede opdateringer: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Implementér en hurtig manuel patching af de mest alvorlige sårbarheder: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Dataoverførsler sker med en langsom og usikker protokol.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Rul en opdateret og sikker transmissionsprotokol ud med avancerede krypteringsmetoder: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Indfør en basal krypteringsløsning med standardprotokol: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "Der mangler en centraliseret sikkerhedshåndtering af alle systemlogfiler.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Udrul et avanceret SIEM-system, der centraliserer og analyserer logdata: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Tilføj en simpel logserver-løsning til de mest kritiske systemer: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    },
    {
      description: "IT-afdelingen skal forberede sig på nye cybertrusler mod LIMS.",
      A: {
        label: "Dyb Sikkerhedsscanning",
        text: "Invester i en fuld sikkerhedscertificering og opdatering af systemet med eksterne konsulenter: 4 tid, 80 kr; +2 sikkerhed, +1 stabilitet.",
        time: 4,
        money: 80,
        effects: { security: 2, stability: 1 },
        failBonus: 0
      },
      B: {
        label: "Overfladisk Check",
        text: "Gennemfør en hurtig sikkerhedsgennemgang med fokus på de mest presserende trusler: 2 tid, 30 kr; +1 sikkerhed, men med 10% fejlrisiko.",
        time: 2,
        money: 30,
        effects: { security: 1 },
        failBonus: 0.10
      }
    }
  ],
  "Dokumentation": [
    {
      description: "For at sikre audit-overholdelse skal du præcist dokumentere alle systemændringer.",
      A: {
        label: "Dokumentation Udført",
        text: "Brug 3 tidsenheder og 10 kr for at udarbejde en detaljeret rapport over ændringerne. Dette reducerer CAB's mistillid og eliminerer ekstra fejlrisiko.",
        time: 3,
        money: 10,
        effects: { },
        failBonus: 0
      }
    }
  ]
};

/* ------------------------------------------ */
/* Funktioner                               */
/* ------------------------------------------ */

function updateStepsList(){
  stepsList.innerHTML = "";
  if(!gameState.activeTask){
    stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
    return;
  }
  const current = gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((locName, i) => {
    const li = document.createElement("li");
    li.textContent = `Trin ${i + 1}: [${locName}]`;
    if(i < current){
      li.style.textDecoration = "line-through";
      li.style.color = "#95a5a6";
    }
    stepsList.appendChild(li);
  });
}

function handleLocationClick(locName){
  if(!gameState.activeTask) return;
  if(gameState.time <= 0) return;

  const idx = gameState.activeTask.currentStep;
  if(idx >= gameState.activeTask.steps.length) return;

  const needed = gameState.activeTask.steps[idx];
  if(locName !== needed){
    if(needed === "Dokumentation"){
      skipDocumentation();
    }
    return;
  }

  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep = {};
  }
  if(gameState.activeTask.decisionMadeForStep[idx]) return;
  gameState.activeTask.decisionMadeForStep[idx] = true;

  // Vis scenariet
  showScenarioModal(locName);
}

function skipDocumentation(){
  gameState.docSkipCount++;
  finalizeStep();
}

function showScenarioModal(locName){
  scenarioModal.style.display = "flex";
  const scenarios = detailedScenarios[locName];
  if(!scenarios || scenarios.length === 0){
    // fallback-scenarie
    scenarioTitle.textContent = locName;
    scenarioDescription.textContent = "(Standard scenarie)";
    scenarioALabel.textContent = "Mulighed A (standard)";
    scenarioAText.textContent = "Giver +2 stabilitet, -50 kr";
    scenarioAButton.onclick = () => {
      applyTimeCost(2);
      applyMoneyCost(50);
      applyStatChange("stability", 2);
      scenarioModal.style.display = "none";
      finalizeStep();
    };
    scenarioBLabel.textContent = "Mulighed B (hurtig)";
    scenarioBText.textContent = "Billigere, men 10% fejlrisiko";
    scenarioBButton.onclick = () => {
      gameState.riskyTotal += 0.10;
      scenarioModal.style.display = "none";
      finalizeStep();
    };
    return;
  }
  // Vælg et tilfældigt scenarie
  const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
  scenarioTitle.textContent = `${locName} – ${sc.description}`;
  scenarioDescription.textContent = ""; // Du kan tilføje ekstra beskrivelse her

  // Mulighed A
  scenarioALabel.textContent = sc.A.label;
  scenarioAText.textContent = sc.A.text;
  scenarioAButton.onclick = () => {
    applyTimeCost(sc.A.time);
    applyMoneyCost(sc.A.money);
    for (const stat in sc.A.effects){
      applyStatChange(stat, sc.A.effects[stat]);
    }
    gameState.riskyTotal += sc.A.failBonus || 0;
    scenarioModal.style.display = "none";
    finalizeStep();
  };

  // Mulighed B
  scenarioBLabel.textContent = sc.B.label;
  scenarioBText.textContent = sc.B.text;
  scenarioBButton.onclick = () => {
    applyTimeCost(sc.B.time);
    applyMoneyCost(sc.B.money);
    for (const stat in sc.B.effects){
      applyStatChange(stat, sc.B.effects[stat]);
    }
    gameState.riskyTotal += sc.B.failBonus || 0;
    scenarioModal.style.display = "none";
    finalizeStep();
  };
}

function finalizeStep(){
  if(!gameState.activeTask) return;
  applyTimeCost(5);
  gameState.activeTask.currentStep++;
  if(gameState.time <= 0){
    endGame();
    return;
  }
  if(gameState.activeTask.currentStep >= gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

function showCABModal(){
  let fail = gameState.riskyTotal + (gameState.docSkipCount * 0.15);
  if(fail > 1) fail = 1;
  if(fail < 0) fail = 0;
  gameState.finalFailChance = fail;
  cabModal.style.display = "flex";
  cabSummary.innerHTML = `
    <strong>CAB Gennemgang</strong><br/>
    Hurtige/billige valg: ${(gameState.riskyTotal * 100).toFixed(0)}%<br/>
    Skip af dokumentation: ${gameState.docSkipCount} gang(e) => +${(gameState.docSkipCount * 15)}%<br/>
    Samlet fejlchance: ${(fail * 100).toFixed(0)}%
  `;
}

function finalizeCABResult(){
  cabModal.style.display = "none";
  let f = gameState.finalFailChance;
  if(Math.random() < f){
    showCABResult(false);
  } else {
    showCABResult(true);
  }
}

function showCABResult(isSuccess){
  cabResultModal.style.display = "flex";
  if(isSuccess){
    cabResultTitle.textContent = "CAB: Godkendt!";
    cabResultText.textContent = "CAB accepterer ændringerne. Opgaven er en succes.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent = "CAB: Afvist!";
    cabResultText.textContent = "CAB finder for stor risiko eller manglende dokumentation. Opgaven mislykkes.";
    failTaskCAB();
  }
}

function failTaskCAB(){
  gameState.tasksCompleted++;
  applyStatChange("hospitalSatisfaction", -10);
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function completeTaskCAB(){
  gameState.tasksCompleted++;
  if(!gameState.activeTask) return;
  const t = gameState.activeTask;
  let plus = (5 + t.riskLevel * 2);
  if(t.taskType === "security"){
    applyStatChange("security", plus);
  } else if(t.taskType === "development"){
    applyStatChange("development", plus);
  } else {
    applyStatChange("stability", plus);
  }
  gameState.totalRewards += t.baseReward;
  showPopup(`Opgave fuldført: +${plus} til relevant stat, +${t.baseReward} belønning`, "success", 4000);
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  updateScoreboard();
}

function showPopup(msg, type = "success", duration = 3000){
  const el = document.createElement('div');
  el.classList.add('popup');
  if(type === "error") el.classList.add('error');
  else if(type === "info") el.classList.add('info');
  el.style.animation = "none";
  el.textContent = msg;
  document.getElementById("popup-container").appendChild(el);
  setTimeout(() => el.remove(), duration);
}

function applyTimeCost(t){
  gameState.time = Math.max(gameState.time - t, 0);
  updateScoreboard();
}

function applyMoneyCost(m){
  gameState.money = Math.max(gameState.money - m, 0);
  updateScoreboard();
}

function applyStatChange(stat, delta){
  gameState[stat] = Math.min(Math.max(gameState[stat] + delta, 0), 150);
  updateScoreboard();
  showFloatingText((delta >= 0 ? `+${delta}` : `${delta}`) + " " + stat, stat);
}

function showFloatingText(txt, stat){
  const c = document.getElementById('floating-text-container');
  const div = document.createElement('div');
  div.classList.add('floating-text');
  div.style.left = "50%"; 
  div.style.top = "50%";
  if(stat === "security") div.style.color = "#ff4444";
  else if(stat === "stability") div.style.color = "#44ff44";
  else if(stat === "development") div.style.color = "#4444ff";
  else if(stat === "hospitalSatisfaction") div.style.color = "#ffc107";
  else div.style.color = "#ffffff";
  div.textContent = txt;
  c.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}

// Opgavegenerering (simpel version)
function generateTask(){
  if(gameState.time <= 0) return;
  if(gameState.availableTasks.length >= 10) return;
  // Vælg tilfældigt kategori
  const r = Math.random();
  let category = 'stability';
  if(r < 0.33) category = 'stability';
  else if(r < 0.66) category = 'development';
  else category = 'security';
  
  // Simplificeret steps pool
  const chosenSteps = ["Hospital", "Dokumentation"];
  
  // Vælg et unikt navn
  let taskName = "";
  if(category === "stability"){
    taskName = pickUniqueName(["Server-Cluster Tilpasning", "Datacenter Genstart"]);
  } else if(category === "development"){
    taskName = pickUniqueName(["Nyt Fungeassay-Modul", "Billedanalyse-Plugin"]);
  } else {
    taskName = pickUniqueName(["Kryptering af Datapunkter", "Sårbarhedsscanning"]);
  }
  if(!taskName) return;
  const riskLevel = Math.floor(Math.random() * 3) + 1;
  const baseReward = riskLevel * 80;
  
  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    taskType: category,
    headline: taskName,
    description: getTaskDescription(category),
    steps: chosenSteps,
    currentStep: 0,
    riskLevel,
    baseReward,
    isHighPriority: (riskLevel === 3),
    decisionMadeForStep: {}
  };
  gameState.availableTasks.push(newTask);
  renderTasks();
}

function pickUniqueName(taskArray){
  const available = taskArray.filter(n => !gameState.usedTasks.has(n));
  if(!available.length) return null;
  const name = available[Math.floor(Math.random() * available.length)];
  gameState.usedTasks.add(name);
  return name;
}

function getTaskDescription(category){
  if(category === "stability"){
    return "(Stabilitetsopgave) For at sikre pålidelig drift i LIMS.";
  } else if(category === "development"){
    return "(Udviklingsopgave) Nye funktioner til specialerne.";
  } else {
    return "(Sikkerhedsopgave) Luk huller og beskyt data.";
  }
}

function renderTasks(){
  tasksList.innerHTML = "";
  if(!gameState.availableTasks.length){
    tasksList.innerHTML = "<li>Ingen opgaver tilgængelige</li>";
    return;
  }
  gameState.availableTasks.forEach(t => {
    const li = document.createElement("li");
    if(t.riskLevel === 3){
      li.style.borderColor = "red"; 
      li.style.borderWidth = "2px";
    } else if(t.riskLevel === 2){
      li.style.borderColor = "orange";
    } else {
      li.style.borderColor = "green";
    }
    let priorityLabel = t.isHighPriority ? " (HØJPRIORITET)" : "";
    let potentialGain = `+${5 + t.riskLevel * 2} til ${t.taskType}`;
    li.innerHTML = `
      <strong>${t.headline}${priorityLabel}</strong><br/>
      Risiko: ${t.riskLevel} – Belønning: ~${t.baseReward}<br/>
      Potentielt: ${potentialGain}<br/>
      <p class="task-description" style="display:none;">${t.description}</p>
    `;
    const commitBtn = document.createElement('button');
    commitBtn.classList.add('commit-button');
    commitBtn.textContent = "Forpligt";
    commitBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      assignTask(t.id);
    });
    li.addEventListener("click", () => {
      li.querySelectorAll(".task-description").forEach(d => {
        d.style.display = (d.style.display === "none" ? "block" : "none");
      });
    });
    li.appendChild(commitBtn);
    tasksList.appendChild(li);
  });
}

function endGame(){
  showPopup("Tiden er gået!", "info", 3000);
  gameState.activeTask = null;
  activeTaskHeadline.textContent = "Ingen aktiv opgave";
  activeTaskDesc.textContent = "";
  stepsList.innerHTML = "<li>Ingen aktiv opgave</li>";
  endModal.style.display = "flex";
  const sumText = `
    <strong>Slutresultat:</strong><br/>
    Resterende Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospitalstilfredshed: ${gameState.hospitalSatisfaction}%<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}<br/>
    Samlet belønning: ${gameState.totalRewards}
  `;
  endGameSummary.innerHTML = sumText;
}

function assignTask(taskId){
  if(gameState.activeTask){
    showPopup("Allerede en aktiv opgave!", "error");
    return;
  }
  if(gameState.time <= 0){
    endGame();
    return;
  }
  const idx = gameState.availableTasks.findIndex(t => t.id === taskId);
  if(idx === -1) return;
  const task = gameState.availableTasks[idx];
  if(task.riskLevel === 3){
    const pop = document.createElement('div');
    pop.classList.add('popup', 'info');
    pop.style.animation = "none";
    pop.innerHTML = `
      <strong>Høj Risiko</strong><br/>
      Udviklerne advarer om stor risiko for fejl. Vil du fortsætte?
      <br/><button id="hrYes">Fortsæt</button>
      <button id="hrNo">Fortryd</button>
    `;
    document.getElementById('popup-container').appendChild(pop);
    document.getElementById('hrYes').addEventListener('click', () => {
      pop.remove();
      finalizeAssign(taskId, idx);
    });
    document.getElementById('hrNo').addEventListener('click', () => {
      pop.remove();
      gameState.availableTasks.splice(idx, 1);
      renderTasks();
    });
  } else {
    finalizeAssign(taskId, idx);
  }
}

function finalizeAssign(taskId, idx){
  gameState.activeTask = gameState.availableTasks.splice(idx, 1)[0];
  activeTaskHeadline.textContent = gameState.activeTask.headline;
  activeTaskDesc.textContent = gameState.activeTask.description;
  updateStepsList();
  renderTasks();
}

function initGame(){
  updateScoreboard();
  // Generer initialt 2 opgaver
  for(let i = 0; i < 2; i++){
    generateTask();
  }
  // Nye opgaver genereres løbende
  setInterval(() => {
    if(gameState.time > 0 && gameState.availableTasks.length < 10){
      generateTask();
    }
  }, 10000);
}

initGame();
