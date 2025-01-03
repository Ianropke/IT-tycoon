// scripts/state.js
export const gameState = {
    currentZone: null,
    tasks: [], // Backlog of tasks
    activeTask: null, // Currently selected task
    employees: [],
    resources: {
        servers: 0,
        softwareLicenses: 0,
        officeSpace: 0
    },
    contracts: [], // Contracts array
    scores: {
        totalScore: 0,
        currentMoney: 50000,
        stakeholderScores: {
            hospital: 0,
            infrastructure: 0,
            cybersecurity: 0,
            infosec: 0
        }
    }
};
