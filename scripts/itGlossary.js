/************************************************************
 * itGlossary.js – Udvidet med hospital-relaterede begreber
 * og eksisterende cybersikkerhedsord.
 ************************************************************/

window.itGlossary = {

  // Cybersikkerhed / Fælles IT
  "CAB": "Change Advisory Board: godkender/afviser planlagte IT-ændringer.",
  "Malware": "Ondsindet software (virus, trojan, ransomware osv.).",
  "Antivirus": "Software der beskytter systemer mod kendt malware via scanning.",
  "Signature": "Et mønster, der identificerer en specifik malware-variant.",
  "Phishing": "Falske mails/links der narrer brugere til at afgive data (login, kreditkort).",
  "Ransomware": "Malware, der krypterer filer og kræver løsesum.",
  "Backup": "En kopi af data til at gendanne systemer efter nedbrud/angreb.",
  "MFA": "Multi-Factor Authentication: Ekstra loginfaktor, fx password + engangskode.",
  "Patch management": "Løbende opdatering af software for at lukke kendte sikkerhedshuller.",
  "SIEM": "Security Information & Event Management: Samler logs og alarmerer ved unormal adfærd.",
  "IDS": "Intrusion Detection System: Overvåger netværk for mistænkelig trafik.",
  "Firewall": "Kontrollerer og filtrerer netværkstrafik, ofte i netværksperimeter.",
  "Compliance": "Overholdelse af lovgivning (GDPR) og interne/eksterne krav.",
  "Penetrationstest": "Simuleret hacking for at finde sårbarheder i systemer.",
  "Sårbarhedsscanning": "Automatisk scanning efter kendte svagheder i software og konfiguration.",
  "Encryption": "Kryptering af data, så kun autoriserede kan læse dem.",

  // Hospitalrelateret
  "Patientjournal": "EPJ/EPR: Elektronisk system til at håndtere patientdata, historik, behandling.",
  "Kliniske data": "Data relateret til patienter: prøvesvar, diagnoser, journaloplysninger.",
  "LIMS": "Laboratory Information Management System: håndterer laboratorieprøver og testresultater.",
  "Booking": "System til at planlægge tid/ressourcer, fx patienttider, operationsstuer.",
  "Triage": "Processen hvor patienter vurderes og prioriteres efter behandlingsbehov.",
  "Telemedicin": "Fjernmonitorering/behandling af patienter via video, apps eller online-løsninger.",
  "EPR": "Elektronisk Patientjournal (også kaldet EPJ/EMR), system til at registrere og vise patientdata.",
  "Integration": "Sammenkobling af systemer så data kan udveksles sikkert og automatisk.",
  "Medicinordination": "Proces hvor læge ordinerer medicin digitalt, med kontrol mod fejlinteraktioner."
};

/**
 * Viser kun ordforklaringer for den aktive opgaves "glossaryTerms".
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
