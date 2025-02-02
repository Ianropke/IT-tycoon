window.itGlossary = {

  // Cybersikkerhed / generelle IT
  "CAB": "Change Advisory Board: godkender/afviser ændringer baseret på risiko og dokumentation.",
  "Antivirus": "Software til beskyttelse mod kendt malware.",
  "Malware": "Ondsindet software (virus, trojan, ransomware, etc.).",
  "Signature": "Et mønster der identificerer en bestemt malware.",
  "Phishing": "Angreb via falske mails, der lokker brugere til at udlevere data.",
  "Ransomware": "Malware der krypterer filer og kræver løsesum.",
  "Backup": "En kopi af data til gendannelse efter nedbrud eller angreb.",
  "MFA": "Multi-Factor Authentication: Extra lag, fx password + engangskode.",
  "Patch management": "Løbende opdatering af software for at lukke kendte sikkerhedshuller.",
  "SIEM": "Security Information & Event Management: Samler logs, finder unormal adfærd.",
  "IDS": "Intrusion Detection System: Overvåger netværk/servere for mistænkelig aktivitet.",
  "Firewall": "Filtrerer netværkstrafik og blokerer ondsindede forbindelser.",
  "Compliance": "Overholdelse af lovkrav (GDPR) og interne retningslinjer.",
  "Penetrationstest": "Simuleret hackingtest for at finde sårbarheder.",
  "Sårbarhedsscanning": "Automatisk scanning for kendte svagheder i software.",
  "Encryption": "Kryptering af data, så kun autoriserede kan læse dem.",

  // Hospital
  "Patientjournal": "Elektronisk Patientjournal (EPJ/EPR): Samling af patientdata.",
  "Kliniske data": "Data relateret til patientforløb, resultater, diagnoser.",
  "LIMS": "Laboratory Information Management System: håndterer laboratorieprøver.",
  "Booking": "System til at planlægge patienttider, ressourcer mm.",
  "Triage": "Processen for at vurdere og prioritere patienter i akutmodtagelse.",
  "Telemedicin": "Fjernmonitorering/behandling via video/apps.",
  "Integration": "Sammenkobling af systemer, så data kan udveksles sikkert og automatisk.",
  "Medicinordination": "Digital proces, hvor læge ordinerer medicin med kontrolfunktioner.",

  // Infrastruktur
  "Cloud-løsninger": "IT-ressourcer leveret eksternt (sky), skalerbar efter behov.",
  "WAN": "Wide Area Network: Netværksforbindelse mellem geografisk adskilte lokationer.",
  "Netværkskerne": "Det centrale netværksudstyr, der håndterer hovedtrafikken i organisationen.",
  "Load Balancer": "Fordeler trafik mellem flere servere for at undgå overbelastning.",
  "High Availability": "Minimere nedetid ved hjælp af redundans og failover.",
  "Failover": "Skift til backupserver/linje ved nedbrud for at opretholde drift.",
  "Virtualisering": "Køre flere virtuelle maskiner på én fysisk server (bedre ressourceudnyttelse).",
  "HPC": "High Performance Computing: stor beregningskraft til AI, analyse, store datasæt."
};

/**
 * showGlossaryForTask() – viser ordforklaringer for 
 * den aktive opgaves "glossaryTerms".
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

  // showMoreInfo(...) ligger i main.js
  if(typeof showMoreInfo === "function"){
    showMoreInfo(text);
  } else {
    // fallback
    alert(text);
  }
}
