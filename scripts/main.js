class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Preload player and location dummy sprites
    this.makeSquare('player_dummy', 0x0000ff);
    this.makeSquare('hospital_dummy', 0xffff00);
    this.makeSquare('infrastructure_dummy', 0xff00ff);
    this.makeSquare('cybersecurity_dummy', 0x00ffff);
    this.makeSquare('infoSec_dummy', 0x88ffff);
    this.makeSquare('backlog_dummy', 0xffa500);
  }

  makeSquare(key, colorInt) {
    const c = this.textures.createCanvas(key, 32, 32);
    const ctx = c.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 32, 32);
    c.refresh();
  }

  create() {
    window.canViewBacklog = false;

    // Player sprite
    this.player = this.physics.add.sprite(100, 450, 'player_dummy').setCollideWorldBounds(true);

    // Location sprites
    this.hospitalZone = this.physics.add.staticSprite(300, 200, 'hospital_dummy');
    this.infrastructureZone = this.physics.add.staticSprite(400, 300, 'infrastructure_dummy');
    this.cybersecurityZone = this.physics.add.staticSprite(500, 400, 'cybersecurity_dummy');
    this.infoSecZone = this.physics.add.staticSprite(600, 250, 'infoSec_dummy');
    this.backlogZone = this.physics.add.staticSprite(150, 150, 'backlog_dummy');

    // Overlap detection
    this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'), null, this);
    this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infrastructure'), null, this);
    this.physics.add.overlap(this.player, this.cybersecurityZone, () => this.triggerLocation('cybersecurity'), null, this);
    this.physics.add.overlap(this.player, this.infoSecZone, () => this.triggerLocation('infoSec'), null, this);
    this.physics.add.overlap(this.player, this.backlogZone, () => {
      window.canViewBacklog = true;
      this.scene.get('UIScene').updateUI();
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // Generate tasks periodically
    this.time.addEvent({
      delay: 20000,
      callback: () => {
        if (window.globalTasks.length < 10) {
          const newTask = createRandomTask();
          window.globalTasks.push(newTask);
        }
      },
      loop: true,
    });

    this.scene.launch('UIScene');
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);

    if (!Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.backlogZone.getBounds())) {
      window.canViewBacklog = false;
    }
  }

  triggerLocation(locationName) {
    const uiScene = this.scene.get('UIScene');
    if (!uiScene) return;
    const activeTask = uiScene.getActiveTask();
    if (!activeTask || activeTask.currentStep >= activeTask.steps.length) return;
    if (activeTask.steps[activeTask.currentStep] === locationName) {
      advanceTaskStep(activeTask.id);
      uiScene.updateUI();
    }
  }
}
