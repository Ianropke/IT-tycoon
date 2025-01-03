// main.js

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Create your 32×32 squares (player, vendor, etc.)
    this.makeSquare('player_dummy',0x0000ff);
    this.makeSquare('vendor_dummy',0x00ff00);
    this.makeSquare('hospital_dummy',0xffff00);
    this.makeSquare('infra_dummy',0xff00ff);
    this.makeSquare('cab_dummy',0x000000);
    this.makeSquare('legal_dummy',0x0000ff);
    this.makeSquare('backlog_dummy',0xffa500);
    this.makeSquare('informationSecurity_dummy',0x00ffff);
    this.makeSquare('cybersecurity_dummy',0x88ffff);
  }

  makeSquare(key,colorInt){
    const c=this.textures.createCanvas(key,32,32);
    const ctx=c.getContext();
    ctx.fillStyle=Phaser.Display.Color.IntegerToColor(colorInt).rgba;
    ctx.fillRect(0,0,32,32);
    c.refresh();
  }

  create() {
    // If you're not in the backlog zone => can't see tasks in UI
    window.canViewBacklog=false;

    // Player near left side
    this.player=this.physics.add.sprite(200,450,'player_dummy');
    this.player.setCollideWorldBounds(true);

    // Place location sprites in x=300..900
    this.vendorZone=this.physics.add.staticSprite(300,200,'vendor_dummy');
    this.hospitalZone=this.physics.add.staticSprite(500,200,'hospital_dummy');
    this.infrastructureZone=this.physics.add.staticSprite(300,350,'infra_dummy');
    this.cabZone=this.physics.add.staticSprite(500,350,'cab_dummy');
    this.legalZone=this.physics.add.staticSprite(600,250,'legal_dummy');
    this.infoSecZone=this.physics.add.staticSprite(700,300,'informationSecurity_dummy');
    this.cyberSecZone=this.physics.add.staticSprite(800,400,'cybersecurity_dummy');

    // backlog near x=200, y=160
    this.backlogZone=this.physics.add.staticSprite(200,160,'backlog_dummy');

    // Overlaps
    this.physics.add.overlap(this.player,this.vendorZone,()=>this.triggerLocation('vendor'),null,this);
    this.physics.add.overlap(this.player,this.hospitalZone,()=>this.triggerLocation('hospital'),null,this);
    this.physics.add.overlap(this.player,this.infrastructureZone,()=>this.triggerLocation('infrastructure'),null,this);
    this.physics.add.overlap(this.player,this.cabZone,()=>this.triggerLocation('cab'),null,this);
    this.physics.add.overlap(this.player,this.legalZone,()=>this.triggerLocation('legal'),null,this);
    this.physics.add.overlap(this.player,this.infoSecZone,()=>this.triggerLocation('informationSecurity'),null,this);
    this.physics.add.overlap(this.player,this.cyberSecZone,()=>this.triggerLocation('cybersecurity'),null,this);

    // backlog overlap
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

    // arrow keys
    this.cursors=this.input.keyboard.createCursorKeys();

    // Launch UI scene
    this.scene.launch('UIScene');
  }

  update(){
    const speed=200;
    this.player.setVelocity(0);

    if(this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if(this.cursors.right.isDown) this.player.setVelocityX(speed);
    if(this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if(this.cursors.down.isDown) this.player.setVelocityY(speed);

    // If not overlapping backlog => false
    const backRect=this.backlogZone.getBounds();
    const plyRect=this.player.getBounds();
    if(!Phaser.Geom.Intersects.RectangleToRectangle(plyRect,backRect)){
      window.canViewBacklog=false;
    }
  }

  triggerLocation(locationName){
    // We need to update the active panel in the UI scene
    const uiScene=this.scene.get('UIScene');
    if(!uiScene)return;
    const activeId=uiScene.activeTaskId;
    if(!activeId)return;
    const task=getTaskById(activeId);
    if(!task||!task.committed){
      console.log('No active or not committed => cannot step');
      return;
    }
    const idx=task.currentStep;
    if(idx>=task.steps.length)return;
    const needed=task.stepKeywords[idx];
    if(needed===locationName){
      advanceTaskStep(task.id);
      uiScene.updateTaskDescription(); // refresh the detail box
    }
  }
}

const config={
  type:Phaser.AUTO,
  width:1440,
  height:900,
  backgroundColor:'#eeeeee',
  scene:[GameScene, UIScene],
  physics:{
    default:'arcade',
    arcade:{ gravity:{y:0}, debug:false }
  }
};

new Phaser.Game(config);
