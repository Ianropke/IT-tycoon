// Updated Main Code (main.js)

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Create squares for player and locations
    this.makeSquare('player_dummy', 0x0000ff);
    this.makeSquare('vendor_dummy', 0x00ff00);
    this.makeSquare('hospital_dummy', 0xffff00);
    this.makeSquare('infra_dummy', 0xff00ff);
    this.makeSquare('cab_dummy', 0x000000);
    this.makeSquare('legal_dummy', 0x654321);
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
    // Game boundaries
    window.canViewBacklog = false;

    // Player sprite
    this.player = this.physics.add.sprite(100, 450, 'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Location sprites
    this.locations = {
      vendor: this.physics.add.staticSprite(300, 200, 'vendor_dummy'),
      hospital: this.physics.add.staticSprite(500, 200, 'hospital_dummy'),
      infrastructure: this.physics.add.staticSprite(300, 350, 'infra_dummy'),
      cab: this.physics.add.staticSprite(500, 350, 'cab_dummy'),
      legal: this.physics.add.staticSprite(600, 250, 'legal_dummy'),
      informationSecurity: this.physics.add.staticSprite(700, 300, 'informationSecurity_dummy'),
      cybersecurity: this.physics.add.staticSprite(800, 400, 'cybersecurity_dummy'),
      backlog: this.physics.add.staticSprite(150, 140, 'backlog_dummy')
    };

    // Overlaps
    Object.keys(this.locations).forEach(locationName => {
      this.physics.add.overlap(this.player, this.locations[locationName], () => {
        this.triggerLocation(locationName);
      }, null, this);
    });

    // Spawn tasks every 20 seconds
    this.time.addEvent({
      delay: 20000,
      callback: () => {
        if (window.globalTasks.length < 10) {
          const newTask = createRandomTask();
          window.globalTasks.push(newTask);
        }
      },
      loop: true
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // Launch UI
    this.scene.launch('UIScene');
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);

    const backlogRect = this.locations.backlog.getBounds();
    const playerRect = this.player.getBounds();
    window.canViewBacklog = Phaser.Geom.Intersects.RectangleToRectangle(playerRect, backlogRect);
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
      uiScene.updateActiveBox();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1440, // 900 for game + 540 for UI
  height: 900,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [GameScene, UIScene]
};

new Phaser.Game(config);
