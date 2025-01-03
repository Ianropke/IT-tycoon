class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.makeSquare('player_dummy', 0x0000ff);
    this.makeSquare('backlog_dummy', 0xffa500);
    this.makeSquare('hospital_dummy', 0xffff00);
    this.makeSquare('infrastructure_dummy', 0xff00ff);
    this.makeSquare('infoSec_dummy', 0x00ffff);
    this.makeSquare('cybersecurity_dummy', 0x88ffff);
  }

  makeSquare(key, colorInt) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 32, 32);
    canvas.refresh();
  }

  create() {
    this.player = this.physics.add.sprite(100, 450, 'player_dummy').setCollideWorldBounds(true);

    // Location zones
    this.backlogZone = this.physics.add.staticSprite(150, 140, 'backlog_dummy');
    this.hospitalZone = this.physics.add.staticSprite(300, 200, 'hospital_dummy');
    this.infrastructureZone = this.physics.add.staticSprite(500, 200, 'infrastructure_dummy');
    this.infoSecZone = this.physics.add.staticSprite(300, 350, 'infoSec_dummy');
    this.cyberSecZone = this.physics.add.staticSprite(500, 350, 'cybersecurity_dummy');

    // Overlaps
    this.physics.add.overlap(this.player, this.backlogZone, () => (window.canViewBacklog = true));
    this.physics.add.overlap(this.player, this.hospitalZone, () => this.triggerLocation('hospital'));
    this.physics.add.overlap(this.player, this.infrastructureZone, () => this.triggerLocation('infrastructure'));
    this.physics.add.overlap(this.player, this.infoSecZone, () => this.triggerLocation('informationSecurity'));
    this.physics.add.overlap(this.player, this.cyberSecZone, () => this.triggerLocation('cybersecurity'));

    this.cursors = this.input.keyboard.createCursorKeys();
    this.scene.launch('UIScene');

    // Dynamic stakeholder demands
    this.time.addEvent({
      delay: 15000,
      callback: () => {
        const stakeholders = ['hospital', 'infrastructure', 'informationSecurity', 'cybersecurity'];
        const randomGiver = stakeholders[Math.floor(Math.random() * stakeholders.length)];
        createRandomTask({ giver: randomGiver });
      },
      loop: true,
    });
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }

  triggerLocation(locationName) {
    const uiScene = this.scene.get('UIScene');
    if (!uiScene) return;
    const task = getActiveTask();
    if (task && task.steps[task.currentStep] === locationName) {
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskBox();
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 900,
  backgroundColor: '#eeeeee',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [GameScene, UIScene],
};

new Phaser.Game(config);
