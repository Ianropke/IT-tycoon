// scripts/state.js
export const gameState = {
    currentZone: null,
    tasks: [],
    activeTask: null,
    employees: [],
    resources: {
        servers: 0,
        softwareLicenses: 0,
        officeSpace: 0
    },
    scores: {
        totalScore: 0,
        currentMoney: 50000,
        stakeholderScores: {
            hospital: 5,
            infrastructure: 3,
            cybersecurity: 0,
            infosec: 2
        }
    }
};
