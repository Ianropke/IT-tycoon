function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomTask() {
  const steps = ["hospital", "infrastructure", "cybersecurity", "informationSecurity"];
  return {
    id: Date.now(),
    description: "Random Task",
    steps: steps.slice(0, getRandomInt(1, steps.length)),
    currentStep: 0,
    risk: getRandomInt(1, 10),
    giver: steps[getRandomInt(0, steps.length - 1)],
    status: "New",
    committed: false,
  };
}
