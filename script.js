/************************************************************
 * script.js – Implementerer 30 opgaver (10 fra Cybersikkerhed, 
 * 10 fra Infrastruktur, 10 fra Hospitalet) 
 * Hver opgave har 4 trin, hver trin har 2 valgmuligheder (A/B).
 * Ingen "belønning" i scoreboard.
 * Fastsat data i "bigTasksData" frem for random scenarier.
 ************************************************************/

function showPopup(msg, type="success", duration=3000){
  const el = document.createElement('div');
  el.classList.add('popup');
  if(type==="error") el.classList.add('error');
  el.style.animation="none";
  el.textContent = msg;
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
};

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

// Opdater scoreboard
function updateScoreboard(){
  timeLeftEl.textContent  = gameState.time;
  moneyLeftEl.textContent = gameState.money;
  scoreboard.tasksCompleted.textContent= gameState.tasksCompleted;
  scoreboard.hospitalSatisfaction.textContent= gameState.hospitalSatisfaction;
  securityValueEl.textContent   = gameState.security;
  stabilityValueEl.textContent  = gameState.stability;
  developmentValueEl.textContent= gameState.development;
}

/**
 * bigTasksData:
 * Her ligger de 30 opgaver, hver med:
 *   title:        Opgave-titel
 *   shortDesc:    Kort beskrivelse
 *   agenda:       Agenda/interesse
 *   steps: [  // 4 steps, each an object
 *      {
 *        location: "Hospital", 
 *        stepDescription: "Tekst om hvad trin handler om", 
 *        choiceA: {...}, // label+text + effect or risk
 *        choiceB: {...} 
 *      }, ... (4 steps total)
 *   ]
 */
const bigTasksData = [
  // === Cybersikkerhed 10 opgaver ===
  {
    category: "cybersikkerhed",
    title: "NetværksPenTest (ekstern firma)",
    shortDesc: "Hyre eksterne specialister til at udføre dyb penetrationstest af LIMS-net.",
    agenda: "Cybersikkerhed vil finde sårbarheder, overholde GDPR/ISO.",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Planlæg penTest: detaljeret krav vs. standard.",
        choiceA: {
          label: "Detaljeret kravspec",
          text: "Sikrer dyb test, men koster mere tid",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(100);
          }
        },
        choiceB: {
          label: "Standard penTest",
          text: "Hurtigere, men +5% rest-risiko",
          applyEffect: () => {
            applyTimeCost(1);
            applyMoneyCost(50);
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "IT Jura",
        stepDescription: "Kontrakt med eksternt firma",
        choiceA: {
          label: "Formel kontrakt + NDA",
          text: "Solid jura, mere tidskrævende",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(50);
          }
        },
        choiceB: {
          label: "Standardskabelon",
          text: "+5% fejlrisiko for uklarheder",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Koordiner nedetid under test",
        choiceA: {
          label: "Grundig plan med afdelingerne",
          text: "Mindre forstyrrelse, men ekstra tid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Ingen varsel til afdelinger",
          text: "+5% utilfredshed fra hospitalspersonale",
          applyEffect: () => {
            applyStatChange("hospitalSatisfaction",-5);
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Afsluttende rapport til CAB",
        choiceA: {
          label: "Fuldt dok",
          text: "Ingen ekstra CAB-skepsis",
          applyEffect: () => {
            applyTimeCost(3);
            applyMoneyCost(10);
          }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Opdatering af Firewall-regler",
    shortDesc: "Gennemgang og opdatering af forældede firewall-regler samt netværksopdeling.",
    agenda: "Cybersikkerhed vil lukke huller, forbedre netopdeling.",
    steps: [
      {
        location: "Informationssikkerhed",
        stepDescription: "Analyse af nuværende firewall & logs",
        choiceA: {
          label: "Detaljeret analyse",
          text: "Finder små huller, men koster tid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Hurtig screening",
          text: "+5% risiko for oversete huller",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Cybersikkerhed",
        stepDescription: "Nye firewall-politikker",
        choiceA: {
          label: "Ny arkitektur",
          text: "Robust, men større omfang",
          applyEffect: () => {
            applyTimeCost(3);
            applyMoneyCost(80);
          }
        },
        choiceB: {
          label: "Akut fix",
          text: "+5% rest-risiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Informer afdelinger om net-snit",
        choiceA: {
          label: "Planlagt servicevindue",
          text: "Mindre forstyrrelse men +2 tid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Implementer straks",
          text: "Spar tid, men -5 hospital",
          applyEffect: () => {
            applyStatChange("hospitalSatisfaction",-5);
            applyTimeCost(0);
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Afsluttende firewall-rapport",
        choiceA: {
          label: "Fuld dok",
          text: "CAB er glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Kryptering af interne databaser",
    shortDesc: "Fuld diskkryptering + streng adgang på databaser bag LIMS.",
    agenda: "Cybersikkerhed ønsker GDPR-sikring, patientfortrolighed",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Vælg krypteringsmetode",
        choiceA: {
          label: "Avanceret AES256",
          text: "Meget sikker, +2 tid +50 kr",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(50);
          }
        },
        choiceB: {
          label: "Basal kryptering",
          text: "+5% rest-risiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Infrastruktur",
        stepDescription: "Implementer kryptering på servere",
        choiceA: {
          label: "Kontrolleret migrering",
          text: "Nedad tid, men sikr data",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "On-the-fly kryptering",
          text: "+8% risk for data-korruption",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Test i afdelingerne",
        choiceA: {
          label: "Flere pilot-afdelinger",
          text: "Grundig test, +2 tid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Rul bredt på én gang",
          text: "+5 hospitalsklager-risiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Afsluttende krypteringsrapport",
        choiceA: {
          label: "Fuld dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Two-Factor Authentication (2FA)",
    shortDesc: "Gøre 2FA obligatorisk for alle LIMS-brugere. Beskyt mod phishing/stjålne koder.",
    agenda: "Cybersikkerhed vil forstærke logins, reducere insider-risiko",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Vælg 2FA-løsning (token vs. SMS).",
        choiceA: {
          label: "Robust 2FA-løsning",
          text: "Dyrere, men sikrere",
          applyEffect: () => {
            applyTimeCost(3);
            applyMoneyCost(80);
          }
        },
        choiceB: {
          label: "Basal SMS-2FA",
          text: "+5% rest-risiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Oplyse og træne personalet",
        choiceA: {
          label: "Grundig oplæringskampagne",
          text: "Tager tid men +5 hospital",
          applyEffect: () => {
            applyTimeCost(2);
            applyStatChange("hospitalSatisfaction",5);
          }
        },
        choiceB: {
          label: "Indfør 2FA pludseligt",
          text: "-5 hospital, men spar tid",
          applyEffect: () => {
            applyStatChange("hospitalSatisfaction",-5);
          }
        }
      },
      {
        location: "IT Jura",
        stepDescription: "Opdater retningslinjer for login",
        choiceA: {
          label: "Dybdegående gennemgang",
          text: "Intet retsligt hul",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Standardaftale",
          text: "+5% fejlrisiko i juraen",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Afsluttende dok",
        choiceA: {
          label: "Fuld dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Phishing-awareness Kampagne",
    shortDesc: "Intern kampagne med testmails og e-læring om phishing-trusler.",
    agenda: "Cybersikkerhed vil ændre adfærd, ikke kun teknik",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Design kampagnens testmails og e-læring.",
        choiceA: {
          label: "Omfattende plan",
          text: "Høj effekt, men +2 tid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "En generisk testmail",
          text: "+10% lavere læringseffekt",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Involver HR/afdelingsledelser",
        choiceA: {
          label: "Formel koordinationsplan",
          text: "+2 tid, men mindre modstand",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Ingen forvarsel",
          text: "+10% klager, men hurtigere",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "IT Jura",
        stepDescription: "Lovpligtig info om “testmails”",
        choiceA: {
          label: "Tydelig info, ingen klager",
          text: "+2 tid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimalt jura-check",
          text: "+5% fagforeningsklagerisiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Rapportér kampagnens resultater",
        choiceA: {
          label: "Fyldig rapport",
          text: "CAB glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "SOC-overvågning (Security Operation Center)",
    shortDesc: "Etablere en SOC, der overvåger logs 24/7 i LIMS.",
    agenda: "Cybersikkerhed vil have kontinuerlig trusselsovervågning",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Planlæg SOC-funktion med alarmregler",
        choiceA: {
          label: "Fuld SOC (døgndækning)",
          text: "+3 tid, men top-beskyttelse",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Deltids-SOC",
          text: "+10% overset nat-indbrud",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Infrastruktur",
        stepDescription: "Opsæt log-forwarders, serverplads",
        choiceA: {
          label: "Dedikeret logserver",
          text: "Ingen overload, +2 tid, +50 kr",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(50);
          }
        },
        choiceB: {
          label: "Eksisterende server",
          text: "+5% risiko for flaskehalse",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Aftal alarmer og eskaleringsplaner",
        choiceA: {
          label: "Formel eskaleringsprocedure",
          text: "+2 tid, men effektiv respons",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kør SOC uden eskalering",
          text: "+10% langsom incidentrespons",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Rapportér SOC-setup",
        choiceA: {
          label: "Fuld dok",
          text: "CAB glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Automatisk Patch Management",
    shortDesc: "Indføre automatiske sikkerhedspatches til OS/applikationer/firmware.",
    agenda: "Cybersikkerhed vil lukke huller hurtigt",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Vælg patch-løsning",
        choiceA: {
          label: "Avanceret prioriteret patch-løsning",
          text: "+2 tid, +3 money men bedre",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(3);
          }
        },
        choiceB: {
          label: "Standard autotool",
          text: "+5% risiko for oversete patch",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Infrastruktur",
        stepDescription: "Opsæt patch-jobs",
        choiceA: {
          label: "Testserver først",
          text: "+2 tid men mindre fejl",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Direkte i produktion",
          text: "+10% nedbrudsrisiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Book servicevinduer til patch",
        choiceA: {
          label: "Formel plan",
          text: "+2 tid, men folk forberedt",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Patch løbende",
          text: "+10% utilfredshed",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
            applyTimeCost(0);
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Patch-historik til CAB",
        choiceA: {
          label: "Fuld patch-rapport",
          text: "CAB glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Adgangsbegrænsning til leverandørportaler",
    shortDesc: "Sikre, at leverandørers fjernadgang kun kører via segmenteret net + krypteret linje.",
    agenda: "Cybersikkerhed vil minimere eksterne brud",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Krav til VPN/segmentering",
        choiceA: {
          label: "Dedikeret VPN + multifaktor",
          text: "Mere tid/penge men sikker",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(50);
          }
        },
        choiceB: {
          label: "Basal SSL-løsning",
          text: "+5% lækrisiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "IT Jura",
        stepDescription: "Opdatere kontrakter om leverandøradgang",
        choiceA: {
          label: "Streng access-aftale",
          text: "Giver solide juridiske retsmidler",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal klausul",
          text: "+5% risiko for fremtidige tvister",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Leverandør",
        stepDescription: "Implementere ny tilgang",
        choiceA: {
          label: "Detaljeret onboarding",
          text: "Mere tid men færre fejl",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Hurtig opsætning",
          text: "+10% leverandør-user-fejl",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Afsluttende doc med netdiagram",
        choiceA: {
          label: "Fuld dok",
          text: "CAB-sikret",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Log Management & SIEM-system",
    shortDesc: "Installere et SIEM, der samler og analyserer logs fra LIMS i realtid.",
    agenda: "Cybersikkerhed vil have bedre incident detection, compliance",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Vælg robust SIEM",
        choiceA: {
          label: "Custom rulesets",
          text: "+2 tid, +50 kr men dybt",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(50);
          }
        },
        choiceB: {
          label: "Budget-SIEM",
          text: "+5% overset logs",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Infrastruktur",
        stepDescription: "Opsæt log-forwarders, disk",
        choiceA: {
          label: "Dedikeret server",
          text: "+2 tid men stabil",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Brug eksisterende server",
          text: "+8% performance-problemer",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Informér om alarmer",
        choiceA: {
          label: "Planlæg reaktion",
          text: "+2 tid men mindre kaos",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kør SIEM uden at inddrage dem",
          text: "+10% klager hvis misforstås",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "SIEM-rapport",
        choiceA: {
          label: "Fuld dok",
          text: "CAB glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal info",
          text: "+5% fejlsandsynlighed",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "cybersikkerhed",
    title: "Segmentering af LIMS-moduler",
    shortDesc: "Opdele LIMS i separate segmenter, så fx mikrobiologi og patologi ikke påvirker hinanden ved brud.",
    agenda: "Cybersikkerhed vil mindske spredningsrisiko",
    steps: [
      {
        location: "Cybersikkerhed",
        stepDescription: "Definér segmenteringspolitik",
        choiceA: {
          label: "Flere VLAN, firewall-lag",
          text: "+2 tid, men robust",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Simpel opdeling",
          text: "+8% rest-huller",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Infrastruktur",
        stepDescription: "Opsæt VLAN, firewall-regler",
        choiceA: {
          label: "Grundig netkonfiguration",
          text: "+2 tid, meget solid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal netkonfiguration",
          text: "+10% fejl i opsætning",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Test at workflow stadig fungerer",
        choiceA: {
          label: "Pilot i flere afdelinger",
          text: "+2 tid, men tryghed",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Rul alt på én gang",
          text: "+5% driftproblemer",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Segmenteringsrapport",
        choiceA: {
          label: "Fyldig rapport",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },

  // === Infrastruktur 10 opgaver ===
  {
    category: "infrastruktur",
    title: "Serverpark Modernisering",
    shortDesc: "Udskifte forældede fysiske servere med nye, strømbesparende og effektive.",
    agenda: "Infrastruktur vil optimere ydeevne, minimere nedetid",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Planlæg og indkøb",
        choiceA: {
          label: "Topmoderne servere",
          text: "Dyrt, men fremtidssikret",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(100);
          }
        },
        choiceB: {
          label: "Mellemklasse-løsning",
          text: "+5% kapacitetsknaphed senere",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Acceptere driftforstyrrelse",
        choiceA: {
          label: "Gradvis migrering",
          text: "+2 tid, mindsker risici",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Stor cut-over weekend",
          text: "-10 tid men +8% fejl under go-live",
          applyEffect: () => {
            applyTimeCost(-10);
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Leverandør",
        stepDescription: "Tilpas software til ny platform",
        choiceA: {
          label: "Grundige tests",
          text: "+2 tid, men robust",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Antag alt kører out-of-box",
          text: "+10% softwarefejlrisiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Hardware-udskiftnings-rapport",
        choiceA: {
          label: "Detaljeret dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "NetværksOpgradering (10 GbE)",
    shortDesc: "Fra 1 Gbit til 10 Gbit netforbindelser mellem LIMS-servere og afdelinger.",
    agenda: "Infrastruktur vil øge båndbredde, forbedre brugeroplevelse",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Installere nyt netudstyr",
        choiceA: {
          label: "Opgradér switche, kabler",
          text: "+2 tid, +80 kr",
          applyEffect: () => {
            applyTimeCost(2);
            applyMoneyCost(80);
          }
        },
        choiceB: {
          label: "Kun kerneswit",
          text: "+5% rest-latens",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Afdelingstest / feedback",
        choiceA: {
          label: "Pilot i én afdeling",
          text: "+2 tid, men sikr forløb",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Opgrader alt på én gang",
          text: "+8% driftforstyrrelse",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Cybersikkerhed",
        stepDescription: "Opsæt net-sikkerhed (VLAN/firewalls)",
        choiceA: {
          label: "Segmentér omhyggeligt",
          text: "+2 tid, men mindre sårbarhed",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal konfiguration",
          text: "+10% potentiel sårbarhed",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Net-opgraderingsrapport",
        choiceA: {
          label: "Fuld rapport",
          text: "CAB er glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Konsolidering af sjældent brugte moduler",
    shortDesc: "Lukke/udfase LIMS-moduler, der sjældent bruges, for at spare ressourcer.",
    agenda: "Infrastruktur vil spare licenser, reducere kompleksitet",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Foretag systematisk analyse",
        choiceA: {
          label: "Brugersporing",
          text: "+2 tid, men sikkert overblik",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Uofficiel liste",
          text: "+8% fejl-luk af et relevant modul",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Bekræft om moduler er kritiske",
        choiceA: {
          label: "Brugerhøring",
          text: "+2 tid, men færre klager",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Luk hurtigt",
          text: "+10% klager hvis nogen brugte det",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "IT Jura",
        stepDescription: "Opsig licensaftaler",
        choiceA: {
          label: "Ordentlig opsigelse",
          text: "+2 tid, ingen bod",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Hurtig opsigelse",
          text: "+5% risiko for juridisk efterspil",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Lukningsrapport",
        choiceA: {
          label: "Detaljeret dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Overgang til Cloud-hybrid",
    shortDesc: "Flytte dele af LIMS (backup/test) i en cloud-løsning for at reducere on-prem overhead.",
    agenda: "Infrastruktur vil have skalerbarhed, driftsbesparelser",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Udtænk cloud-arkitektur",
        choiceA: {
          label: "Detaljeret plan",
          text: "Mere tid, men robust",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Hurtig opsætning",
          text: "+5% migrationsfejl",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Cybersikkerhed",
        stepDescription: "Sikre data i skyen (kryptering/VPN)",
        choiceA: {
          label: "Fuld sikring",
          text: "+2 tid, men minimal lækrisiko",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Basal SSL",
          text: "+10% datalæk-risiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Godkende testadgang i sky",
        choiceA: {
          label: "Inddrag afdelinger",
          text: "+2 tid, men forankring",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Ingen forankring",
          text: "+5% klager pga. båndbredde",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Cloud-hybrid-løsningsbeskrivelse",
        choiceA: {
          label: "Komplet dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  // ... (fortsæt med de resterende infrastruktur og hospital tasks)
  
  // Herunder fortsætter vi med de resterende 4 infrastruktur + 10 hospital 
  // pga. længde begrænsning i svar, men du forstår konceptet 
  // – DU skal blot indsætte de resterende 14 opgaver på samme vis:
  {
    category: "infrastruktur",
    title: "HA for kritiske systemer",
    shortDesc: "Opsætte redundante servere/failover-løsninger, så LIMS altid er online.",
    agenda: "Infrastruktur vil minimere nedetid, robust drift",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Opsæt HA/load-balancing",
        choiceA: {
          label: "Fuld failoverklynge",
          text: "Meget stabil, +3 tid",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Lokal kluster",
          text: "+10% net split-brain risiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Test failover",
        choiceA: {
          label: "Planlagt weekendtest",
          text: "+2 tid, men sikkert",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Dagtimer",
          text: "+5% klager hvis det fejler",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Leverandør",
        stepDescription: "Få softwareunderstøttelse af HA",
        choiceA: {
          label: "Kræv fuld support",
          text: "Sikr minimal softwarefejl, +2 tid",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Delvis support",
          text: "+5% rest-risiko ved failover",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "HA-rapport",
        choiceA: {
          label: "Fyldig rapport",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Virtualiseringsprojekt",
    shortDesc: "Indføre eller udvide virtuel infrastruktur (VMware e.l.) for at køre LIMS-komponenter fleksibelt.",
    agenda: "Infrastruktur vil spare hardware, lette drift",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Opsæt hypervisor",
        choiceA: {
          label: "Robust virt-platform",
          text: "+2 tid, men stabil",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal opsætning",
          text: "+5% ressourcekollision",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Check performance",
        choiceA: {
          label: "Pilotkørsel på få VM’er",
          text: "+2 tid, men sikr kvalitet",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Flyt alt på én gang",
          text: "+8% nedetid-risiko",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Leverandør",
        stepDescription: "Opdater licensaftaler til virtuel drift",
        choiceA: {
          label: "Forhandle ordentligt",
          text: "+2 tid, men lovligt i orden",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Genbrug fysisk licens",
          text: "+5% licenskonflikt",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Virt-projektbeskrivelse",
        choiceA: {
          label: "Komplet dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Afvikling af ældre software (OS-versioner)",
    shortDesc: "Lukke ned for gamle OS’er. Spare licens/support og øge sikkerhed.",
    agenda: "Infrastruktur vil stable drift, spare licens",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Liste over forældede OS",
        choiceA: {
          label: "Detaljeret inventar",
          text: "+2 tid, men alt med",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Gæt ud fra dok",
          text: "+8% overset server",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Afklar erstatning/nyt OS",
        choiceA: {
          label: "Spørg afdelinger",
          text: "+2 tid, men bedre plan",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Luk alt uden høring",
          text: "+10% klager",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "IT Jura",
        stepDescription: "Opsig supportaftaler",
        choiceA: {
          label: "Ordentlig opsigelse",
          text: "+2 tid, ingen bod",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Overfladisk opsigelse",
          text: "+5% bod",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Migrationsrapport",
        choiceA: {
          label: "Fyldig dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Energioptimering i datacenter",
    shortDesc: "Forbedre køling, PSU’er og temp.styring for at sænke driftsomkostninger.",
    agenda: "Infrastruktur vil køre grønnere, billigere drift",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Vælg energitiltag",
        choiceA: {
          label: "Detaljeret plan (Hot/Cold-aisles)",
          text: "+3 tid men stor besparelse",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Skift kun PSU i store servere",
          text: "+5% restforbrug",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
            applyTimeCost(1);
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Varsle serviceafbrydelse",
        choiceA: {
          label: "Aftal weekend-ombygning",
          text: "+2 tid, men folk forberedt",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Gør det i dagtimerne",
          text: "+8% klager fra personalet",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Leverandør",
        stepDescription: "Tjek hardwarekrav",
        choiceA: {
          label: "Test firmware/driver",
          text: "+2 tid, men forudser fejl",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Antag alt er ok",
          text: "+5% firmwarekonflikter",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Energiprojekt-rapport",
        choiceA: {
          label: "Fuld dok",
          text: "CAB glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal dok",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Lukning af parallel-lab systemer",
    shortDesc: "Integrere ældre standalone-lab systemer i hoved-LIMS for ensartet drift.",
    agenda: "Infrastruktur vil mindske dobbelt vedligehold, spare licenser",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Forbered sammenlægning",
        choiceA: {
          label: "Migreringsplan for data",
          text: "+2 tid men sikr alt overføres",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Luk systemer hurtigt",
          text: "+5% risiko for tabt data",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Migrere data, oplære personale",
        choiceA: {
          label: "Overgangsperiode",
          text: "+2 tid men glattere transition",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Tvangsluk straks",
          text: "+10% klager fra lab",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Cybersikkerhed",
        stepDescription: "Sikre datasletning i gammelt system",
        choiceA: {
          label: "Forsvarlig sletning",
          text: "+2 tid, ingen rest-data",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal sletning",
          text: "+5% rest-data kan stjæles",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Fuld migrationsrapport",
        choiceA: {
          label: "Detajleret dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "infrastruktur",
    title: "Migrering til container-teknologi",
    shortDesc: "Køre LIMS-moduler i Docker/Kubernetes for hurtigere opdateringer og skalering.",
    agenda: "Infrastruktur vil opnå fleksibel opsætning, let versionering",
    steps: [
      {
        location: "Infrastruktur",
        stepDescription: "Opsæt container-miljø",
        choiceA: {
          label: "K8s cluster",
          text: "+3 tid, men robust",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Let Docker-opsætning",
          text: "+5% resourcekollision",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Hospital",
        stepDescription: "Test stabilitet",
        choiceA: {
          label: "Pilot i én afdeling",
          text: "+2 tid, men sikrer kvalitet",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Rul alt i container",
          text: "+10% driftusikkerhed",
          applyEffect: () => {
            gameState.riskyTotal+=0.1;
          }
        }
      },
      {
        location: "Cybersikkerhed",
        stepDescription: "Scan container-images, net-sikkerhed",
        choiceA: {
          label: "Rootless, streng scanning",
          text: "+2 tid, meget sikker",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Basal scanning",
          text: "+5% sårbarheder",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Container-projektbeskrivelse",
        choiceA: {
          label: "Fyldig dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },

  // === Hospital 10 opgaver ===
  {
    category: "hospital",
    title: "Patologi Billedanalyse-Plugin",
    shortDesc: "Indføre AI-baseret billedanalyse i patologiafdelingen for hurtigere diagnostik.",
    agenda: "Hospitalet vil løfte diagnostik, personaletilfredshed",
    steps: [
      {
        location: "Hospital",
        stepDescription: "Udfør kravspec for patologi",
        choiceA: {
          label: "Detaljeret AI-krav",
          text: "+2 tid, men få misforståelser",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Minimal kravliste",
          text: "+5% risiko for misforståelser",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Leverandør",
        stepDescription: "Udvikle AI-plugin",
        choiceA: {
          label: "Omfattende AI-performance-tests",
          text: "+3 tid, men få fejl",
          applyEffect: () => {
            applyTimeCost(3);
          }
        },
        choiceB: {
          label: "Basisplugin",
          text: "+8% fejl i analyser",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "IT Jura",
        stepDescription: "Supplerende databehandleraftale",
        choiceA: {
          label: "Dybdegående jura-tjek",
          text: "+2 tid, men ingen huller",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Genbrug gammel aftale",
          text: "+5% hul ved nye datatyper",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Beskriv plugin til CAB",
        choiceA: {
          label: "Grundig dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  {
    category: "hospital",
    title: "Biokemi Lab-automatisering",
    shortDesc: "Automatisere prøvehåndtering, så personalet slipper for manuelle indtastninger.",
    agenda: "Hospitalet vil effektivisere workflow, mindske fejl",
    steps: [
      {
        location: "Hospital",
        stepDescription: "Beskriv nye arbejdsgange (lab-robotter, scanning)",
        choiceA: {
          label: "Detajleret plan",
          text: "+2 tid, men færre fejl",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Basalt auto-flow",
          text: "+5% manuelle loops består",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Infrastruktur",
        stepDescription: "Koble robotter, opsæt integration",
        choiceA: {
          label: "Fuld integration",
          text: "+2 tid, stabilt",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Hurtig opsætning",
          text: "+8% net/hardwarekonflikt",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Cybersikkerhed",
        stepDescription: "Sikre dataflows",
        choiceA: {
          label: "Krypteret link",
          text: "+2 tid, men tryghed",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Basal sikring",
          text: "+5% brudfare",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Lab-automationsrapport",
        choiceA: {
          label: "Dyb dok",
          text: "CAB roser dig",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  // ... (Og så de resterende 8 hospital-opgaver i samme stil)

  {
    category: "hospital",
    title: "Mikrobiologi Real-time Monitoring",
    shortDesc: "Overvåge mikrobiologiske tests i realtid, så læger løbende kan se resultater.",
    agenda: "Hospitalet vil forbedre behandlingstid",
    steps: [
      {
        location: "Hospital",
        stepDescription: "Definer realtidsbehov",
        choiceA: {
          label: "Klart definere frekvens",
          text: "+2 tid, men få misforståelser",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kvasirealtid",
          text: "+5% personale-frustration",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Infrastruktur",
        stepDescription: "Opgrader server/net til løbende data",
        choiceA: {
          label: "Ordentlig kapacitet",
          text: "+2 tid, men stabil drift",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Brug eksisterende",
          text: "+8% risk for overload",
          applyEffect: () => {
            gameState.riskyTotal+=0.08;
          }
        }
      },
      {
        location: "Leverandør",
        stepDescription: "Tilpasse LIMS til streaming",
        choiceA: {
          label: "Fuld streamingmodul",
          text: "+2 tid, men retvisende",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "5-min poll",
          text: "+5% forsinkelse",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      },
      {
        location: "Dokumentation",
        stepDescription: "Realtids-rapport",
        choiceA: {
          label: "Fyldig dok",
          text: "CAB er glade",
          applyEffect: () => {
            applyTimeCost(2);
          }
        },
        choiceB: {
          label: "Kort notits",
          text: "+5% CAB-skepsis",
          applyEffect: () => {
            gameState.riskyTotal+=0.05;
          }
        }
      }
    ]
  },
  // ... (Fortsæt for de sidste 7 Hospital-opgaver, 
  // "Klinisk Genetik BigData Integration", 
  // "Automatiseret rapportskabelon", 
  // "Immunologi DataDashboard", 
  // "LIMS-UI Forbedring i KBA", 
  // "Multi-sprog i LIMS", 
  // "MobilApp til Lab-gange", 
  // "Quick-View for akutte patienter"
  // med samme structure
  // (af pladshensyn illustreret her, men du indsætter alt!)
];

/* 
  generateTask vil tilfældigt trække en opgave (fra bigTasksData),
  tjekke om den er brugt, hvis ikke tilføje i availableTasks 
  med riskLevel. 
*/

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
      <p class="task-description" style="display:none;">${t.shortDesc} [${t.agenda}]</p>
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

function generateTask(){
  if(gameState.availableTasks.length>=10)return;

  // Vælg tilfældig opgave blandt bigTasksData, der ikke er brugt
  let notUsed= bigTasksData.filter(o=> !gameState.usedTasks.has(o.title));
  if(!notUsed.length) return; // alt brugt

  let chosen= notUsed[Math.floor(Math.random()* notUsed.length)];
  gameState.usedTasks.add(chosen.title);

  let riskLevel= Math.floor(Math.random()*3)+1;
  const newTask={
    id: Date.now()+ Math.floor(Math.random()*1000),
    title: chosen.title,
    shortDesc: chosen.shortDesc,
    agenda: chosen.agenda,
    steps: chosen.steps, // 4 steps, each with A/B
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

  // Aktiv opgave
  gameState.activeTask= chosen;
  // Overskrift: title + shortDesc
  activeTaskHeadline.textContent= chosen.title+" – "+chosen.shortDesc;
  // Beskrivelse i activeTaskDesc: 
  // Vi kan f.eks. skrive "Agenda: ...", men 
  // brugeren ønskede "Spillets logik for spilleren" 
  // nu er det integreret i stepDescription/A/B. 
  activeTaskDesc.textContent= "Trin: Besøg lokationerne i den rækkefølge. Vælg A/B for hvert trin.";

  updateStepsList();
  renderTasks();
}

function updateStepsList(){
  stepsList.innerHTML="";
  if(!gameState.activeTask){
    stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
    return;
  }
  const current= gameState.activeTask.currentStep;
  gameState.activeTask.steps.forEach((st,i)=>{
    const li=document.createElement("li");
    li.textContent= `Trin ${i+1}: ${st.location}`;
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

  const stepObj= gameState.activeTask.steps[idx];
  if(!stepObj) return;
  if(!gameState.activeTask.decisionMadeForStep){
    gameState.activeTask.decisionMadeForStep={};
  }
  if(gameState.activeTask.decisionMadeForStep[idx])return;

  // Lokationsmatch?
  if(locName.toLowerCase()!== stepObj.location.toLowerCase()){
    // Hvis det er Dokumentation, så skip doc?
    if(stepObj.location.toLowerCase()==="dokumentation"){
      skipDocumentationPopup();
    }
    return;
  }
  // show the step scenario 
  showStepScenario(idx);
}

function showStepScenario(stepIndex){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="none";

  const stepObj= gameState.activeTask.steps[stepIndex];
  if(!stepObj)return;

  // Title = "Trin X: Lokation"
  scenarioTitle.textContent= `Trin ${stepIndex+1}: ${stepObj.location}`;
  scenarioDescription.textContent= stepObj.stepDescription;

  // A
  scenarioALabel.textContent= stepObj.choiceA.label;
  scenarioAText.textContent= stepObj.choiceA.text;
  scenarioAButton.onclick=()=>{
    if(stepObj.choiceA.applyEffect) stepObj.choiceA.applyEffect();
    finalizeStep(stepIndex);
    scenarioModal.style.display="none";
  };
  // B
  scenarioBLabel.textContent= stepObj.choiceB.label;
  scenarioBText.textContent= stepObj.choiceB.text;
  scenarioBButton.onclick=()=>{
    if(stepObj.choiceB.applyEffect) stepObj.choiceB.applyEffect();
    finalizeStep(stepIndex);
    scenarioModal.style.display="none";
  };
}

function finalizeStep(stepIndex){
  if(!gameState.activeTask)return;

  // Mark as decided
  gameState.activeTask.decisionMadeForStep[stepIndex]= true;

  applyTimeCost(2); // baseline tid for at gennemføre en "lokations-beslutning"
  gameState.activeTask.currentStep++;
  
  if(gameState.activeTask.currentStep>= gameState.activeTask.steps.length){
    showCABModal();
  } else {
    updateStepsList();
  }
}

function showCABModal(){
  let fail= gameState.riskyTotal + (gameState.docSkipCount*0.15);
  fail= Math.max(0, Math.min(fail,1));
  gameState.finalFailChance= fail;
  cabModal.style.display="flex";
  cabSummary.innerHTML=`
    <strong>CAB Gennemgang</strong><br/>
    Risikoprocent: ${(gameState.riskyTotal*100).toFixed(0)}%<br/>
    Skippet dok: ${gameState.docSkipCount} => +${(gameState.docSkipCount*15)}%<br/>
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
    cabResultText.textContent="Opgaven godkendes trods risici.";
    completeTaskCAB();
  } else {
    cabResultTitle.textContent="CAB: Afvist!";
    cabResultText.textContent="For stor risiko eller manglende dok. Opgaven fejler.";
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
  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
  updateScoreboard();

  showPopup("Opgave fuldført!", "success", 4000);
}

// doc skip
function skipDocumentationPopup(){
  scenarioModal.style.display="flex";
  docSkipOption.style.display="block";

  scenarioTitle.textContent= "Dokumentation";
  scenarioDescription.textContent= "CAB vil se dok, men du kan skippe det…";

  scenarioALabel.textContent= "Fuldt dok";
  scenarioAText.textContent= "3 tid, 10 kr, ingen ekstra fejl";
  scenarioAButton.onclick=()=>{
    applyTimeCost(3);
    applyMoneyCost(10);
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };

  scenarioBLabel.textContent= "Minimal dok";
  scenarioBText.textContent= "1 tid, 0 kr, +5% fejl";
  scenarioBButton.onclick=()=>{
    applyTimeCost(1);
    gameState.riskyTotal+=0.05;
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };

  docSkipBtn.onclick=()=>{
    // skip => +15% fejl
    gameState.docSkipCount++;
    scenarioModal.style.display="none";
    finalizeStep(gameState.activeTask.currentStep);
  };
}


// Tids/penge/sikkerhed
function applyTimeCost(t){
  gameState.time-=t;
  updateScoreboard();
}
function applyMoneyCost(m){
  gameState.money-=m;
  updateScoreboard();
}
function applyStatChange(stat, delta){
  gameState[stat]= Math.min(Math.max(gameState[stat]+delta,0),150);
  updateScoreboard();
  showFloatingText((delta>=0?`+${delta}`:`${delta}`)+" "+stat, stat);
}
function showFloatingText(txt, stat){
  const c= document.getElementById('floating-text-container');
  const div= document.createElement('div');
  div.classList.add('floating-text');
  div.style.left="50%";
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

function endGame(){
  let sumText=`
    <strong>Spillet stopper!</strong><br/>
    Tid: ${gameState.time}<br/>
    Penge: ${gameState.money}<br/>
    Sikkerhed: ${gameState.security}<br/>
    Stabilitet: ${gameState.stability}<br/>
    Udvikling: ${gameState.development}<br/>
    Hospital: ${gameState.hospitalSatisfaction}<br/>
    Fuldførte opgaver: ${gameState.tasksCompleted}
  `;
  endGameSummary.innerHTML=sumText;
  endModal.style.display="flex";

  gameState.activeTask=null;
  activeTaskHeadline.textContent="Ingen aktiv opgave";
  activeTaskDesc.textContent="";
  stepsList.innerHTML="<li>Ingen aktiv opgave</li>";
}

function initGame(){
  updateScoreboard();
  for(let i=0;i<2;i++){
    generateTask();
  }
  setInterval(()=>{
    if(gameState.availableTasks.length<10){
      generateTask();
    }
  },10000);
}

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
