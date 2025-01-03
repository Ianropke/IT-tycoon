// main.js

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.createSquareTex('player_dummy', 0x0000ff);
    this.createSquareTex('vendor_dummy', 0x00ff00);
    this.createSquareTex('hospital_dummy', 0xffff00);
    this.createSquareTex('infra_dummy', 0xff00ff);
    this.createSquareTex('cab_dummy', 0x000000);
    this.createSquareTex('legal_dummy', 0x0000ff);
    this.createSquareTex('backlog_dummy', 0xffa500);
    this.createSquareTex('informationSecurity_dummy', 0x00ffff);
    this.createSquareTex('cybersecurity_dummy', 0x88ffff);
  }

  createSquareTex(key, colorInt) {
    const canvas = this.textures.createCanvas(key, 32, 32);
    const ctx = canvas.getContext();
    ctx.fillStyle = Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0, 0, 32, 32);
    canvas.refresh();
  }

  create() {
    window.canViewBacklog = false;

    // Place player so they can move around left side or go right
    this.player = this.physics.add.sprite(350,500,'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Place location sprites beyond x=400, y>120
    this.vendorZone = this.physics.add.staticSprite(450,200,'vendor_dummy').setDepth(0);
    this.hospitalZone = this.physics.add.staticSprite(650,200,'hospital_dummy').setDepth(0);
    this.infrastructureZone = this.physics.add.staticSprite(450,350,'infra_dummy').setDepth(0);
    this.cabZone = this.physics.add.staticSprite(650,350,'cab_dummy').setDepth(0);
    this.legalZone = this.physics.add.staticSprite(800,250,'legal_dummy').setDepth(0);
    this.infoSecZone = this.physics.add.staticSprite(950,300,'informationSecurity_dummy').setDepth(0);
    this.cyberSecZone = this.physics.add.staticSprite(1100,400,'cybersecurity_dummy').setDepth(0);

    // Backlog on the left side but below top bar
    this.backlogZone = this.physics.add.staticSprite(200,160,'backlog_dummy').setDepth(0);

    // Overlaps
    this.physics.add.overlap(this.player, this.vendorZone, ()=>this.triggerLocation('vendor'), null, this);
    this.physics.add.overlap(this.player, this.hospitalZone,()=>this.triggerLocation('hospital'),null,this);
    this.physics.add.overlap(this.player,this.infrastructureZone,()=>this.triggerLocation('infrastructure'),null,this);
    this.physics.add.overlap(this.player,this.cabZone,()=>this.triggerLocation('cab'),null,this);
    this.physics.add.overlap(this.player,this.legalZone,()=>this.triggerLocation('legal'),null,this);
    this.physics.add.overlap(this.player,this.infoSecZone,()=>this.triggerLocation('informationSecurity'),null,this);
    this.physics.add.overlap(this.player,this.cyberSecZone,()=>this.triggerLocation('cybersecurity'),null,this);

    // Overlap backlog
    this.physics.add.overlap(this.player,this.backlogZone,()=>{
      window.canViewBacklog=true;
    });

    // spawn tasks up to 10
    this.time.addEvent({
      delay:20000,
      callback:()=>{
        if(window.globalTasks.length<10){
          const newTask=createRandomTask();
          window.globalTasks.push(newTask);
          console.log('Spawned new task:',newTask);
        }
      },
      loop:true
    });

    // arrow key movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Launch UI scene
    this.scene.launch('UIScene');
  }

  update() {
    const speed=200;
    this.player.setVelocity(0);

    if(this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if(this.cursors.right.isDown) this.player.setVelocityX(speed);
    if(this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if(this.cursors.down.isDown) this.player.setVelocityY(speed);

    // if not overlapping backlog => false
    const backRect=this.backlogZone.getBounds();
    const plyRect=this.player.getBounds();
    if(!Phaser.Geom.Intersects.RectangleToRectangle(plyRect,backRect)){
      window.canViewBacklog=false;
    }
  }

  triggerLocation(locationName){
    const uiScene=this.scene.get('UIScene');
    if(!uiScene) return;
    const activeId=uiScene.activeTaskId;
    if(!activeId)return;
    const task=getTaskById(activeId);
    if(!task||!task.committed){
      console.log('No active or not committed => cannot advance steps.');
      return;
    }
    const idx=task.currentStep;
    if(idx>=task.steps.length)return;
    const needed=task.stepKeywords[idx];
    if(needed===locationName){
      advanceTaskStep(task.id);
      uiScene.updateActiveTaskPanel();
    }
  }
}

// 1440×900 for MacBook Air
const config={
  type:Phaser.AUTO,
  width:1440,
  height:900,
  backgroundColor:'#eeeeee',
  physics:{
    default:'arcade',
    arcade:{gravity:{y:0}, debug:false}
  },
  scene:[MainScene, UIScene]
};

new Phaser.Game(config);
