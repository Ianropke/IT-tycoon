// src/objects/Player.js

export default class Player {
  constructor(scene, x, y, texture) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, texture);
    this.sprite.setCollideWorldBounds(true);
    this.speed = 300;

    // Draw player as a circle
    const graphics = scene.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(0, 0, 20);
    graphics.generateTexture('player', 40, 40);
    graphics.destroy();

    this.sprite.setTexture('player');
    this.sprite.setDepth(15); // Ensure player is above zones and UI
  }

  update(cursors) {
    const body = this.sprite.body;
    body.setVelocity(0);

    if (cursors.left.isDown) {
      body.setVelocityX(-this.speed);
    }
    if (cursors.right.isDown) {
      body.setVelocityX(this.speed);
    }
    if (cursors.up.isDown) {
      body.setVelocityY(-this.speed);
    }
    if (cursors.down.isDown) {
      body.setVelocityY(this.speed);
    }
  }
}
