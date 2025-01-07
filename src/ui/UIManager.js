export default class UIManager {
  constructor(scene) {
    this.scene = scene;

    // Panels
    this.dispatchQueuePanel = this.createPanel(10, 50, 240, 500, 'Dispatch Queue');
    this.activeTasksPanel = this.createPanel(260, 50, 240, 500, 'Active Tasks');
    this.resourcesPanel = this.createPanel(510, 50, 240, 150, 'Resources');

    // Element storage
    this.dispatchTasks = [];
    this.activeTasks = [];
    this.resourcesText = null;
  }

  createPanel(x, y, width, height, title) {
    this.scene.add.rectangle(x + width / 2, y + height / 2, width, height, 0xffffff).setStrokeStyle(2, 0x000000);
    this.scene.add.text(x + 10, y + 10, title, { font: '16px Arial', fill: '#000' });
  }

  updateUI(resources, tasks, activeTasks) {
    // Update Resources
    if (this.resourcesText) this.resourcesText.destroy();
    this.resourcesText = this.scene.add.text(
      520,
      70,
      `Time: ${resources.time}\nBudget: ${resources.budget}\nPersonnel: ${resources.personnel}`,
      { font: '14px Arial', fill: '#000' }
    );

    // Update Dispatch Queue
    this.clearTasks(this.dispatchTasks);
    this.dispatchTasks = tasks
      .filter((task) => task.status === 'dispatch')
      .map((task, index) => this.createDispatchTask(task, 20, 100 + index * 60));

    // Update Active Tasks
    this.clearTasks(this.activeTasks);
    this.activeTasks = activeTasks
      .filter((task) => task.status === 'active')
      .map((task, index) => this.createActiveTask(task, 270, 100 + index * 60));
  }

  createDispatchTask(task, x, y) {
    const container = this.scene.add.container(x, y);

    // Task text
    const taskText = this.scene.add.text(0, 0, `${task.description}\nRisk: ${task.risk}\nPriority: ${task.priority}`, {
      font: '14px Arial',
      fill: '#000',
    });
    container.add(taskText);

    // Commit button
    const button = this.scene.add.rectangle(0, 50, 80, 30, 0x007bff).setInteractive();
    const buttonText = this.scene.add.text(-30, 42, 'Commit', { font: '14px Arial', fill: '#fff' });
    container.add(button).add(buttonText);

    button.on('pointerdown', () => {
      // Move task to active queue
      task.commit();
      this.scene.activeTasks.push(task);
      this.scene.tasks = this.scene.tasks.filter((t) => t !== task);
    });

    return container;
  }

  createActiveTask(task, x, y) {
    const container = this.scene.add.container(x, y);

    // Task description
    const taskText = this.scene.add.text(0, 0, `${task.description}\nProgress: ${task.progress}/${task.steps}`, {
      font: '14px Arial',
      fill: '#000',
    });
    container.add(taskText);

    // Simulate progress button
    const progressButton = this.scene.add.rectangle(0, 50, 80, 30, 0x28a745).setInteractive();
    const progressText = this.scene.add.text(-40, 42, 'Progress', { font: '14px Arial', fill: '#fff' });
    container.add(progressButton).add(progressText);

    progressButton.on('pointerdown', () => {
      task.progressTask();
    });

    return container;
  }

  clearTasks(tasks) {
    tasks.forEach((task) => task.destroy());
  }
}

