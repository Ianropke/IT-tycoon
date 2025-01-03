// scripts/state.js

/** Game State **/
export const gameState = {
    tasks: [],
    activeTask: null,
    scores: {
        totalScore: 0,
        currentMoney: 50000,
        stakeholderScores: {
            hospital: 0,
            infrastructure: 0,
            cybersecurity: 0,
            infosec: 0
        }
    },
    contracts: [],
    employees: [],
    resources: {
        servers: 0,
        softwareLicenses: 0,
        officeSpace: 0
    },
    currentZone: 'None'
};
