/************************************************************
 * itGlossary.js – Yderligere ord for infrastruktur (WAN, HPC, 
 * netværkskerne, load balancing, high availability).
 * Samt alt fra tidligere (CAB, LIMS, etc.).
 ************************************************************/

window.itGlossary = {

  // Cybersikkerhed/fælles
  "CAB": "Change Advisory Board: godkender/afviser IT-ændringer baseret på risiko og dokumentation.",
  "Malware": "Ondsindet software (virus, trojan, ransomware m.m.).",
  "Antivirus": "Software der beskytter systemer mod kendt malware via scanning.",
  "Signature": "Et mønster der identificerer en specifik malware-variant.",
  "Phishing": "Falske mails/links der narrer brugere til at afgive data (login, kreditkort).",
  "Ransomware": "Malware der krypterer filer og kræver løsesum.",
  "Backup": "En kopi af data til gendannelse efter nedbrud/angreb.",
  "MFA": "Multi-Factor Authentication: Ekstra lag, fx password + engangskode.",
  "Patch management": "Opdatering af software for at lukke kendte sårbarheder.",
  "SIEM": "Security Information & Event Management: Samler logs, finder unormal adfærd.",
  "IDS": "Intrusion Detection System: Overvåger netværk/servere for mistænkelig aktivitet.",
  "Firewall": "Filtrerer netværkstrafik for at blokere ondsindede forbindelser.",
  "Compliance": "Overholdelse af lovkrav (fx GDPR) og interne/eksterne politikker.",
  "Penetrationstest": "Simuleret hacking for at finde sårbarheder i systemer.",
  "Sårbarhedsscanning": "Automatisk scanning efter kendte svagheder i software og konfiguration.",
  "Encryption": "Kryptering af data, så kun autoriserede kan aflæse dem.",

  // Hospital / Klinisk
  "Patientjournal": "EPJ/EPR: Elektronisk system til at registrere og fremvise patientdata.",
  "Kliniske data": "Data relateret til patientforløb, prøvesvar, diagnoser, behandling.",
  "LIMS": "Laboratory Information Management System: Håndterer laboratorieprøver og testresultater.",
  "Booking": "System til at planlægge patienttider og ressourcer (operationsstuer, etc.).",
  "Triage": "Processen for at vurdere og prioritere patienter efter behandlingsbehov.",
  "Telemedicin": "Fjernmonitorering/behandling af patienter via video, apps eller online-løsninger.",
  "EPR": "Elektronisk Patientjournal, også EPJ/EMR, system til patientdata.",
  "Integration": "Sammenkobling af systemer, så data kan udveksles automatisk.",
  "Medicinordination": "Digital proces hvor læge ordinerer medicin med kontrol mod fejl.",

  // Infrastruktur
  "Cloud-løsninger": "IT-ressourcer leveret eksternt i skyen, skalerbart efter behov.",
  "WAN": "Wide Area Network: Netværksforbindelse mellem geografisk adskilte lokationer.",
  "Netværkskerne": "Det centrale netværksudstyr i en organisation, der håndterer hovedtrafikken.",
  "Load Balancer": "Software/hardware der fordeler trafik mellem flere servere for at undgå overbelastning.",
  "High Availability": "Designpraksis for at minimere nedetid, fx redundans og failover.",
  "Failover": "At skifte til en backupserver/linje ved nedbrud, for at opretholde drift.",
  "Virtualisering": "At køre flere virtuelle maskiner på én fysisk server for bedre ressourceudnyttelse.",
  "HPC": "High Performance Computing: Avanceret beregningskraft til AI, analyse, store datasæt."
};

/**
 * showGlossaryForTask() – viser ordforklaringer, der svarer 
 * til den aktive opgaves "glossaryTerms" array.
 */
function showGlossaryForTask(){
  if(!window.gameState || !window.gameState.activeTask){
    alert("Ingen aktiv opgave – ordbogen kræver en aktiv opgave!");
    return;
  }
  let task = window.gameState.activeTask;
  if(!task.glossaryTerms || !task.glossaryTerms.length){
    alert("Denne opgave har ingen definerede begreber i ordbogen.");
    return;
  }

  let text = `<h2>IT Ordbog for: '${task.title}'</h2><ul>`;
  let foundAny = false;

  task.glossaryTerms.forEach(term => {
    let definition = window.itGlossary[term];
    if(definition){
      foundAny = true;
      text += `<li><strong>${term}:</strong> ${definition}</li>`;
    }
  });
  text += "</ul>";

  if(!foundAny){
    text = "<p>Ingen matchende termer i itGlossary for denne opgave.</p>";
  }

  // Kald showMoreInfo(...) hvis main.js definerer den
  if(typeof showMoreInfo === "function"){
    showMoreInfo(text);
  } else {
    alert(text);
  }
}
