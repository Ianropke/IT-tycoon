class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.makeSquare("player", 0x0000ff);
    this.makeSquare("hospital", 0xffff00);
    this.makeSquare("infrastructure", 0xff00ff);
    this.makeSquare("cybersecurity", 0x88ffff);
    this.makeSquare("informationSecurity", 0x00ffff);
    this.makeSquare("backlog", 0xffa500);
  }

  makeSquare(key, color) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(color).rgba;
    ctx.fillRect(0, 0, 32, 32);
    canvas.refresh();
  }

  create() {
    this.player = this.physics.add.sprite(100, 450, "player").setCollideWorldBounds(true);
    this.locations = {
      hospital: this.physics.add.staticSprite(300, 200, "hospital"),
      infrastructure: this.physics.add.staticSprite(500, 200, "infrastructure"),
      cybersecurity: this.physics.add.staticSprite(300, 350, "cybersecurity"),
      informationSecurity: this.physics.add.staticSprite(500, 350, "informationSecurity"),
      backlog: this.physics.add.staticSprite(150, 140, "backlog"),
    };

    Object.keys(this.locations).forEach(key => {
      this.physics.add.overlap(this.player, this.locations[key], () => {
        if (key === "backlog" && window.globalTasks.length < 10) {
          window.globalTasks.push(createRandomTask());
        }
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.scene.launch("UIScene");
  }

  update() {
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) this.player.setVelocityX(-200);
    if (this.cursors.right.isDown) this.player.setVelocityX(200);
    if (this.cursors.up.isDown) this.player.setVelocityY(-200);
    if (this.cursors.down.isDown) this.player.setVelocityY(200);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 900,
  backgroundColor: "#eeeeee",
  physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
  scene: [GameScene, UIScene],
};

new Phaser.Game(config);
