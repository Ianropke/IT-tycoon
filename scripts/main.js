// main.js

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Player (64×64)
    const playerCanvas = this.textures.createCanvas('player_dummy', 64, 64);
    const pctx = playerCanvas.getContext();
    pctx.fillStyle = '#0000ff';
    pctx.fillRect(16, 16, 32, 32);
    pctx.fillStyle = '#ff0000';
    pctx.fillRect(24, 8, 16, 16);
    playerCanvas.refresh();

    // Vendor (32×32, green)
    const vendorCanvas = this.textures.createCanvas('vendor_dummy', 32, 32);
    const vctx = vendorCanvas.getContext();
    vctx.fillStyle = '#00ff00';
    vctx.fillRect(0, 0, 32, 32);
    vendorCanvas.refresh();

    // Hospital (32×32, yellow)
    const hospCanvas = this.textures.createCanvas('hospital_dummy', 32, 32);
    const hctx = hospCanvas.getContext();
    hctx.fillStyle = '#ffff00';
    hctx.fillRect(0, 0, 32, 32);
    hospCanvas.refresh();

    // Infrastructure (32×32, magenta)
    const infraCanvas = this.textures.createCanvas('infra_dummy', 32, 32);
    const ictx = infraCanvas.getContext();
    ictx.fillStyle = '#ff00ff';
    ictx.fillRect(0, 0, 32, 32);
    infraCanvas.refresh();

    // CAB (32×32, black)
    const cabCanvas = this.textures.createCanvas('cab_dummy', 32, 32);
    const cctx =
