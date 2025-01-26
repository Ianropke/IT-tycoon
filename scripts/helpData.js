// scripts/helpData.js
window.helpData = {

  "mfa": {
    title: "Multi-factor Authentication (MFA)",
    text: `
      MFA kræver en ekstra login-faktor ud over password, 
      fx SMS-kode eller app-godkendelse. 
      I en hospitalskontekst mindsker det risiko for, 
      at hackere får fat i patientdata blot ved at stjæle et password.
    `,
    officialLink: "https://www.enisa.europa.eu/mfa"
  },

  "nis2": {
    title: "NIS2-direktivet",
    text: `
      NIS2 er et EU-direktiv, der skærper kravene til it-sikkerhed 
      i kritisk infrastruktur som hospitaler. 
      Der stilles krav om rapportering, strengere sanktioner 
      og risikostyring af leverandører.
    `,
    officialLink: "https://eur-lex.europa.eu/eli/dir/2022/2555"
  },

  "hpc": {
    title: "High Performance Computing (HPC)",
    text: `
      HPC refererer til brug af kraftige servere (ofte med GPU'er) 
      til tunge beregninger, fx AI- eller billedanalyse. 
      I LIMS kan det være nødvendigt for at håndtere store datamængder 
      hurtigt og stabilt.
    `,
    officialLink: "https://example.com/hpc-dk"
  },

  "digitalPatologi": {
    title: "Digital Patologi",
    text: `
      Digital patologi indebærer scanning af vævssnit, lagring 
      og ofte AI-analyse. Fordelen er hurtigere konsultation 
      mellem specialister og bedre arkivering. 
      Ulempen: kræver stor lagerplads og 
      muligvis HPC for billedanalyse.
    `,
    officialLink: "https://example.com/digital-patologi-dk"
  },

  "gdpr": {
    title: "GDPR – Persondataforordningen",
    text: `
      GDPR beskytter persondata i EU. Hospitaler håndterer 
      særligt følsomme oplysninger. Mangel på compliance 
      kan føre til store bøder, så man skal have styr på 
      rettigheder, sletning, logning og sikkerhed.
    `,
    officialLink: "https://gdpr.eu/"
  },

  "docSkip": {
    title: "Hvorfor dokumentation?",
    text: `
      I ITIL/CAB-proces er dokumentation nøglen til 
      gennemsigtighed og sporbarhed. 
      Uden dokumentation forstår ingen, 
      hvordan ændringen er implementeret, 
      og risikostyring bliver svært.
    `,
    officialLink: "https://example.com/itil-cab-doc"
  },

  "flowCytometri": {
    title: "Flowcytometri i Immunologi",
    text: `
      Flowcytometri anvender laser til at analysere celler 
      og opfange deres fluorescens – typisk i immunologisk forskning 
      eller diagnostik. Direkte integration til LIMS 
      fjerner behovet for manuel dataindtastning.
    `,
    officialLink: "https://example.com/flow-immunologi"
  },

  "replikering": {
    title: "Replikering af data",
    text: `
      Replikering kopierer data i realtid mellem to servere 
      eller datacentre. Ved nedbrud kan man overtage 
      uden at miste data. Det er ofte et krav 
      under NIS2 for at sikre fortsat drift.
    `,
    officialLink: "https://example.com/replikerings-guide"
  }
};
