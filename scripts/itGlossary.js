/************************************************************
 * itGlossary.js – Intern ordbog over IT-begreber
 * Ingen eksterne links; alt håndteres lokalt.
 ************************************************************/

window.itGlossary = {
  "VPN": "VPN (Virtuel Privat Netværk) skaber en krypteret tunnel over internettet for sikker kommunikation.",
  "MFA": "MFA (Multi-Factor Authentication) kræver flere faktorer for login, fx password + kode.",
  "IDS": "IDS (Intrusion Detection System) overvåger netværk og alarmerer ved mistænkelig aktivitet.",
  "Firewall": "En firewall styrer og filtrerer netværkstrafik, så ondsindet trafik kan blokeres.",
  "Patch": "En softwareopdatering, der lukker sikkerhedshuller eller retter fejl.",
  "SIEM": "SIEM (Security Information & Event Management) samler logs og opdager unormal aktivitet.",
  // Tilføj flere ordforklaringer her...
};

/**
 * showGlossary() – viser en pop-up eller modal med ordbog
 */
function showGlossary(){
  let text = "<h2>IT Ordbog</h2><ul>";
  for(let [term, definition] of Object.entries(window.itGlossary)){
    text += `<li><strong>${term}:</strong> ${definition}</li>`;
  }
  text += "</ul>";

  // Hvis "showMoreInfo" findes i main.js, kan vi genbruge den til at vise en modal
  if(typeof showMoreInfo === "function"){
    showMoreInfo(text);
  } else {
    // fallback: vis en alert
    alert(text);
  }
}
