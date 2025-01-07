export default class UIManager {
  constructor(scene) {
    this.scene = scene;

    this.dispatchPanel = this.createPanel(10, 50, 'Dispatch Queue');
    this.activePanel = this.createPanel(550, 50, 'Active Tasks');
    this.resourcesPanel = this.createPanel(280, 50, 'Resources');
  }

  createPanel(x, y, header) {
    const panel = this.scene.add.rectangle(x, y, 200, 500, 0xffffff);
    const text = this.scene.add.text(x + 10, y - 240, header, {
      font: '16px Arial',
      fill: '#000',
    });

    return panel;
  }

  updateUI(resources, tasks, activeTasks) {
    // Update resources
    const { time, budget, personnel } = resources;
    this.scene.add.text(
      290,
      80,
      `Time: ${time}\nBudget: ${budget}\nPersonnel: ${personnel}`,
      { font: '14px Arial', fill: '#000' }
    );

    // Update dispatch queue
    let y = 100;
    tasks.forEach((task) => {
      if (task.status === 'dispatch') {
        this.scene.add.text(
          20,
          y,
          `${task.description}\nRisk: ${task.risk}\nPriority: ${task.priority}`,
          { font: '14px Arial', fill: '#000' }
        );
        y += 50;
      }
    });

    // Update active tasks
    y = 100;
    activeTasks.forEach((task) => {
      if (task.status === 'active') {
        this.scene.add.text(
          560,
          y,
          `${task.description}\nProgress: ${task.progress}/${task.steps}`,
          { font: '14px Arial', fill: '#000' }
        );
        y += 50;
      }
    });
  }
}
