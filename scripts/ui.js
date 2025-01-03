// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // 1) This scene covers the entire 1440×900, 
    //    but the scoreboard bar is at y=0..60 (full width),
    //    the "right UI" is x=900..1440 for tasks & active details.
    this.cameras.main.setViewport(0, 0, 1440, 900);
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)'); 
    // We'll manually draw backgrounds for scoreboard & UI

    // ---------- SCOREBOARD BAR (y=0..60, x=0..1440) ----------
    this.scorebarBg = this.add.rectangle(0, 0, 1440, 60, 0xf4f4f4)
      .setOrigin(0,0);

    this.scoreTitle = this.add.text(20, 15, 'Score: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '24px',
      color: '#007aff'
    });
    // Giver scoreboard text at the top-right
    this.scoreboardLines = this.add.text(700, 10, '', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      color: '#333333'
    });

    // ---------- "RIGHT UI" BG (x=900..1440, y=60..900) ----------
    this.rightBg = this.add.rectangle(900, 60, 540, 840, 0xffffff)
      .setOrigin(0,0);

    // We'll place backlog & active details inside x≥900

    // ---------- BACKLOG TABLE AREA (y=60..480, x=900..1440) ----------
    this.backlogTitle = this.add.text(910, 70, 'Tasks (Backlog)', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '18px',
      color: '#333333'
    });

    // We'll create a small "header" for the table columns
    // (Description, Steps, Risk, Giver)
    this.add.text(910, 100, 'Desc', {
      fontSize: '14px', color: '#666666'
    });
    this.add.text(1060,100, 'Steps', {
      fontSize:'14px', color:'#666666'
    });
    this.add.text(1120,100, 'Risk', {
      fontSize:'14px', color:'#666666'
    });
    this.add.text(1160,100,'Giver',{
      fontSize:'14px', color:'#666666'
    });

    // We'll place tasks from y=120 downward
    this.taskRowTexts = []; // will store rows

    // ---------- ACTIVE TASK BOX (y=480..900, x=900..1440) ----------
    this.activeBg = this.add.rectangle(900, 480, 540, 420, 0xf0f0f2)
      .setOrigin(0,0);

    this.activeTitle = this.add.text(910,490,'Active Task',{
      fontFamily:'Helvetica',fontSize:'18px',color:'#333333'
    });

    // We'll store lines for step info, priority, etc.
    this.activeLines = [];
    for(let i=0;i<7;i++){
      const line = this.add.text(910,520+i*20,'',{
        fontFamily:'Helvetica',fontSize:'14px',color:'#333333'
      });
      this.activeLines.push(line);
    }

    // We'll have up to 3 possible buttons: [Commit], [Gather], [Finalize]
    // We'll place them near y=680, spaced out horizontally
    this.commitBtn = this.add.text(910,680,'[ Commit ]',{
      fontFamily:'Helvetica',fontSize:'16px',
      backgroundColor:'#007aff',color:'#fff',
      padding:{x:8,y:4}
    })
    .setInteractive({useHandCursor:true})
    .on('pointerdown',()=>this.handleCommit());

    this.gatherBtn = this.add.text(1010,680,'[ Gather ]',{
      fontFamily:'Helvetica',fontSize:'16px',
      backgroundColor:'#34c759',color:'#fff',
      padding:{x:8,y:4}
    })
    .setInteractive({useHandCursor:true})
    .on('pointerdown',()=>this.handleGather());

    this.finalizeBtn=this.add.text(1110,680,'[ Finalize ]',{
      fontFamily:'Helvetica',fontSize:'16px',
      backgroundColor:'#ff9500',color:'#fff',
      padding:{x:8,y:4}
    })
    .setInteractive({useHandCursor:true})
    .on('pointerdown',()=>this.handleFinalize());

    // track the active task 
    this.activeTaskId=null;
    this.documented=false;

    // refresh every second
    this.time.addEvent({
      delay:1000,
      callback:()=>this.refreshUI(),
      loop:true
    });
  }

  refreshUI(){
    // 1) Update score
    this.scoreTitle.setText(`Score: ${window.playerScore}`);

    // scoreboard lines
    const scoreboardString =
      `Completed:\n` +
      `- hospital: ${window.giverScoreboard.hospital}\n`+
      `- infrastructure: ${window.giverScoreboard.infrastructure}\n`+
      `- informationSec: ${window.giverScoreboard.informationSecurity}\n`+
      `- cybersecurity: ${window.giverScoreboard.cybersecurity}\n`;
    this.scoreboardLines.setText(scoreboardString);

    // 2) Show tasks in a table
    this.taskRowTexts.forEach(row => {
      row.forEach(t => t.destroy());
    });
    this.taskRowTexts=[];

    let y=120;
    if(!window.canViewBacklog){
      // Not on backlog
      const noTasks = this.add.text(910,y,'Stand on orange backlog to see tasks.',{
        fontSize:'14px',color:'#999999',wordWrap:{width:520}
      });
      this.taskRowTexts.push([noTasks]);
      return;
    }

    for(let i=0;i<window.globalTasks.length;i++){
      const t=window.globalTasks[i];
      const steps=`${t.currentStep}/${t.steps.length}`;
      const rowDesc = `[${t.status}] ${t.description}`+(t.isFeature?' [Feature]':' [Maint]');
      const risk=`${t.risk}`;
      const giv=`${t.giver}`;
      const textDesc=this.add.text(910,y,rowDesc,{
        fontSize:'14px',color:'#333333',wordWrap:{width:140}
      }).setInteractive({useHandCursor:true});
      textDesc.on('pointerdown',()=>this.selectActiveTask(t.id));

      const textSteps=this.add.text(1060,y,steps,{
        fontSize:'14px',color:'#333333'
      });
      const textRisk=this.add.text(1120,y,risk,{
        fontSize:'14px',color:'#333333'
      });
      const textGiver=this.add.text(1160,y,giv,{
        fontSize:'14px',color:'#333333'
      });

      this.taskRowTexts.push([textDesc,textSteps,textRisk,textGiver]);
      y+=30;
      if(y>460){
        // end of backlog area
        const moreMsg=this.add.text(910,y,'...more tasks hidden...',{
          fontSize:'14px',color:'#888888'
        });
        this.taskRowTexts.push([moreMsg]);
        break;
      }
    }

    // 3) Update active box
    this.updateActiveBox();
  }

  selectActiveTask(taskId){
    this.activeTaskId=taskId;
    this.documented=false;
    this.updateActiveBox();
  }

  updateActiveBox(){
    // Clear lines
    for(let i=0;i<this.activeLines.length;i++){
      this.activeLines[i].setText('');
    }

    // Hide all 3 buttons by default
    this.commitBtn.setVisible(false);
    this.gatherBtn.setVisible(false);
    this.finalizeBtn.setVisible(false);

    if(!this.activeTaskId)return;
    const task=getTaskById(this.activeTaskId);
    if(!task)return;

    let line0='';
    if(task.currentStep>=task.steps.length){
      line0='All steps done. Document before finalize.';
    }else{
      line0=`Step ${task.currentStep+1} of ${task.steps.length}: ${task.steps[task.currentStep]}`;
    }
    this.activeLines[0].setText(line0);

    this.activeLines[1].setText(`Status: ${task.status}`);
    this.activeLines[2].setText(`Priority: ${task.priority}`);
    this.activeLines[3].setText(`Risk: ${task.risk}`);
    this.activeLines[4].setText(task.isFeature?'Feature Task':'Maintenance Task');
    this.activeLines[5].setText(`Giver: ${task.giver}`);

    // line6: instructions
    let line6='';
    if(!task.committed){
      line6+='(Need to commit)\n';
      this.commitBtn.setVisible(true);
    }
    if(task.currentStep<task.steps.length && task.steps[task.currentStep].toLowerCase().includes('gather')){
      line6+='(Gather step)\n';
      this.gatherBtn.setVisible(true);
    }
    if(task.status==='Ready to finalize'){
      line6+='(Document, then finalize)\n';
      this.finalizeBtn.setVisible(true);
    }
    this.activeLines[6].setText(line6.trim());
  }

  handleCommit(){
    if(!this.activeTaskId)return;
    commitToTask(this.activeTaskId);
  }
  handleGather(){
    // Actually gather is done by stepping on the gather location in GameScene
    // But you might do something special here if needed
    console.log('User pressed Gather—maybe do a check or info...');
  }
  handleFinalize(){
    if(!this.activeTaskId)return;
    // must doc first?
    if(!this.documented){
      console.log('Document first!');
      return;
    }
    const task=getTaskById(this.activeTaskId);
    if(!task)return;
    if(task.status==='Ready to finalize'){
      completeTask(task.id);
      task.status='Done';
      this.activeTaskId=null;
    }
  }
}
