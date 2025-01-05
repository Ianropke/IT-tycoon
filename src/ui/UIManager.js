// Inside UIManager.js

createBacklogTaskItem(task) {
  const container = this.scene.add.container(0, 0).setDepth(11);
  container.isExpanded = false;

  // Background for task item
  const bg = this.scene.add.rectangle(0, 0, 280, 50, 0x34495e).setOrigin(0);
  bg.setInteractive();
  container.add(bg);

  // Task Description
  const description = this.scene.add.text(10, -10, task.description, {
    font: '16px Arial',
    fill: '#ecf0f1',
    wordWrap: { width: 260 }
  }).setOrigin(0).setDepth(12);
  container.add(description);

  // Commit Button
  const commitButton = this.createButton(240, 0, 'Commit', '#2980b9', () => {
    this.handleCommitTask(task);
  });
  container.add(commitButton);

  // Hover Effects
  bg.on('pointerover', () => {
    bg.setFillStyle(0x1abc9c);
  });
  bg.on('pointerout', () => {
    bg.setFillStyle(0x34495e);
  });

  // Toggle expand/collapse on click
  bg.on('pointerdown', () => {
    container.isExpanded = !container.isExpanded;
    if (container.isExpanded) {
      this.expandBacklogTask(container, task);
    } else {
      this.collapseBacklogTask(container);
    }
  });

  // Log task position
  console.log(`Backlog Task Position Y: ${container.y}`);

  return container;
}

expandBacklogTask(container, task) {
  // Increase background height
  container.getAt(0).setSize(280, 100);

  // Add detailed information
  const stepsText = this.scene.add.text(10, 15, `Steps: ${task.steps}`, {
    font: '14px Arial',
    fill: '#bdc3c7'
  }).setOrigin(0).setDepth(12);
  container.add(stepsText);

  const riskText = this.scene.add.text(10, 35, `Risk: ${task.riskLevel}`, {
    font: '14px Arial',
    fill: '#bdc3c7'
  }).setOrigin(0).setDepth(12);
  container.add(riskText);
}

collapseBacklogTask(container) {
  // Reset background height
  container.getAt(0).setSize(280, 50);

  // Remove detailed information
  container.list = container.list.filter(child => {
    return !(child.text && (child.text.includes('Steps') || child.text.includes('Risk')));
  });

  // Re-add existing children if necessary
  container.refresh();
}
