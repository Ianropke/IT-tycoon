class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Create textures for the player and location sprites
    this.makeSquare('player_dummy', 0x0000ff);
    this.makeSquare('vendor_dummy', 0x00ff00);
    this.makeSquare('hospital_dummy', 0xffff00);
    this.makeSquare('infra_dummy', 0xff00ff);
    this.makeSquare('cab_dummy', 0x000000);
    this.makeSquare('legal_dummy', 0x8b4513); // Brown for legal
    this.makeSquare('backlog_dummy', 0xffa500);
    this.makeSquare('informationSecurity_dummy', 0x00ffff);
    this.makeSquare('cybersecurity_dummy', 0x88ffff);
  }

  makeSquare(key, colorInt) {
    const c = this.textures.createCanvas(key, 32, 32);
    const ctx = c.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 32, 32);
    c.refresh();
  }

  create() {
    // We only use x=0..900 for the gameplay area
    window.canViewBacklog = false;

    // Create the player sprite
    this.player = this.physics.add.sprite(100, 450, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Place location sprites within the gameplay area (x < 900)
    this.vendorZone = this.physics.add.staticSprite(300, 200, 'vendor_dummy');
    this.hospitalZone = this.physics.add.staticSprite(500, 200, 'hospital_dummy');
    this.infrastructureZone = this.physics.add.staticSprite(300, 350, 'infra_dummy');
    this.cabZone = this.physics.add.staticSprite(500, 350, 'cab_dummy');
    this.legalZone = this.physics.add.staticSprite(600, 250, 'legal_dummy');
    this.infoSecZone = this.physics.add.staticSprite(700, 300, 'informationSecurity_dummy');
    this.cyberSecZone = this.physics.add.staticSprite(800, 400, 'cybersecurity_dummy');

    // Define the backlog zone (near x=150, y=140)
    this.backlogZone = this.physics.add.staticSprite(150, 140, 'backlog_dummy');

    // Add overlap detection for the player and locations
    this.addOverlapTriggers();

    // Periodic task spawning (up to a maximum of 10 tasks)
    this.time.addEvent({
      delay: 20000,
      callback: this.spawnTask,
      callbackScope: this,
      loop: true,
    });

    // Set up player controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Launch the UI scene
    this.scene.launch('UIScene');
  }

  addOverlapTriggers() {
    // Overlap detection for each location
    const overlaps = [
      { zone: this.vendorZone, location: 'vendor' },
      { zone: this.hospitalZone, location: 'hospital' },
      { zone: this.infrastructureZone, location: 'infrastructure' },
      { zone: this.cabZone, location: 'cab' },
      { zone: this.legalZone, location: 'legal' },
      { zone: this.infoSecZone, location: 'informationSecurity' },
      { zone: this.cyberSecZone, location: 'cybersecurity' },
    ];

    overlaps.forEach(({ zone, location }) => {
      this.physics.add.overlap(this.player, zone, () => this.triggerLocation(location), null, this);
    });

    // Overlap detection for the backlog
    this.physics.add.overlap(this.player, this.backlogZone, () => {
      window.canViewBacklog = true;
    });
  }

  spawnTask() {
    if (window.globalTasks.length < 10) {
      const newTask = createRandomTask();
      window.globalTasks.push(newTask);
    }
  }

  update() {
    // Reset player velocity
    const speed = 200;
    this.player.setVelocity(0);

    // Handle player movement
    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);

    // Detect when the player leaves the backlog zone
    const backRect = this.backlogZone.getBounds();
    const plyRect = this.player.getBounds();
    if (!Phaser.Geom.Intersects.RectangleToRectangle(plyRect, backRect)) {
      window.canViewBacklog = false;
    }
  }

  triggerLocation(locationName) {
    const uiScene = this.scene.get('UIScene');
    if (!uiScene) return;

    const activeId = uiScene.activeTaskId;
    if (!activeId) return;

    const task = getTaskById(activeId);
    if (!task || !task.committed) return;

    const idx = task.currentStep;
    if (idx >= task.steps.length) return;

    const needed = task.stepKeywords[idx];
    if (needed === locationName) {
      advanceTaskStep(task.id);
      uiScene.updateActiveBox(); // Refresh UI
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1440, // Gameplay (900) + UI (540)
  height: 900,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [GameScene, UIScene],
};

new Phaser.Game(config);
