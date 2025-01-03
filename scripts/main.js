class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Load sprites for player and locations
    this.load.image('player', 'assets/player.png');
    this.load.image('hospital', 'assets/hospital.png');
    this.load.image('infrastructure', 'assets/infrastructure.png');
    this.load.image('cybersecurity', 'assets/cybersecurity.png');
    this.load.image('infoSec', 'assets/infoSec.png');
    this.load.image('backlog', 'assets/backlog.png');
    this.load.image('legal', 'assets/legal.png');
  }

  create() {
    // Global game state
    window.globalTasks = []; // List of tasks
    window.playerScore = 0; // Player score
    window.giverScoreboard = {
      hospital: 0,
      infrastructure: 0,
      informationSecurity: 0,
      cybersecurity: 0,
      legal: 0,
    };

    this.createLocations();
    this.createPlayer();
    this.setupInput();

    // Launch the UI scene
    this.scene.launch('UIScene');

    // Generate tasks periodically
    this.time.addEvent({
      delay: 20000, // Every 20 seconds
      callback: this.generateTask,
      loop: true,
    });

    // Apply penalties for neglected tasks periodically
    this.time.addEvent({
      delay: 15000, // Every 15 seconds
      callback: this.applyTaskPenalties,
      loop: true,
    });
  }

  createLocations() {
    // Define locations
    this.locations = {
      hospital: this.add.sprite(500, 200, 'hospital'),
      infrastructure: this.add.sprite(300, 350, 'infrastructure'),
      backlog: this.add.sprite(150, 140, 'backlog'),
      infoSec: this.add.sprite(700, 300, 'infoSec'),
      cybersecurity: this.add.sprite(800, 400, 'cybersecurity'),
      legal: this.add.sprite(600, 250, 'legal'),
    };

    // Enable collision for all locations
    Object.values(this.locations).forEach((loc) => {
      this.physics.world.enable(loc);
      loc.body.setImmovable(true);
    });
  }

  createPlayer() {
    // Add the player sprite
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setCollideWorldBounds(true);

    // Set up collision detection with locations
    Object.keys(this.locations).forEach((location) => {
      this.physics.add.collider(
        this.player,
        this.locations[location],
        () => this.handleLocationTrigger(location),
        null,
        this
      );
    });
  }

  setupInput() {
    // Arrow key controls for player movement
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Move the player with arrow keys
    if (this.cursors.left.isDown) this.player.setVelocityX(-200);
    if (this.cursors.right.isDown) this.player.setVelocityX(200);
    if (this.cursors.up.isDown) this.player.setVelocityY(-200);
    if (this.cursors.down.isDown) this.player.setVelocityY(200);

    // Toggle task visibility when near the backlog
    const backlogBounds = this.locations.backlog.getBounds();
    const playerBounds = this.player.getBounds();
    window.canViewBacklog = Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, backlogBounds);
  }

  handleLocationTrigger(location) {
    // Get the active UI scene
    const uiScene = this.scene.get('UIScene');
    if (!uiScene) return;

    // Get the active task
    const activeTask = uiScene.activeTaskId ? getTaskById(uiScene.activeTaskId) : null;
    if (!activeTask || !activeTask.committed) return;

    // Check if the current location matches the required step
    const currentStep = activeTask.steps[activeTask.currentStep];
    if (currentStep === location) {
      advanceTaskStep(activeTask.id);
      uiScene.updateActiveTask();
    }
  }

  generateTask() {
    // Add a new task if the backlog is not full
    if (window.globalTasks.length < 10) {
      const newTask = createRandomTask();
      window.globalTasks.push(newTask);
    }
  }

  applyTaskPenalties() {
    // Apply penalties for neglected tasks
    window.globalTasks.forEach((task) => {
      if (task.status === "New" || task.status === "In Progress") {
        // Reduce satisfaction for the task giver
        window.giverScoreboard[task.giver] -= 5;
        console.log(`Penalty applied to ${task.giver} for neglecting task "${task.description}".`);
      }
    });
  }
}
