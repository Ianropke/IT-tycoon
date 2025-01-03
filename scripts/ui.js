// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // Full 1440×900 for this UI scene; we’ll place some elements at x≥900
    this.cameras.main.setViewport(0, 0, 1440, 900);
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0)'); 

    // ---------- SCOREBOARD BAR (y=0..60, full width) ----------
    this.scorebarBg = this.add.rectangle(0, 0, 1440, 60, 0xf4f4f4)
      .setOrigin(0, 0);

    // Score on left
    this.scoreTitle = this.add.text(10, 15, 'Score: 0', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '24px',
      color: '#007aff'
    });

    // Completed scoreboard on the far right
    this.scoreboardLines = this.add.text(1150, 10, '', {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '16px',
      color: '#333333'
    });

    // ---------- RIGHT UI BACKGROUND (x=900..1440, y=60..900) ----------
    this.rightBg = this.add.rectangle(900, 60, 540, 840, 0xffffff)
      .setOrigin(0,0);

    // ---------- BACKLOG (TABLE) (y=60..480) ----------
    this.backlogTitle = this.add.text(910, 70, 'Tasks (Backlog)', {
      fontFamily:'Helvetica', fontSize:'18px', color:'#333333'
    });

    // Column headers for table
    // We’ll give the Description more width (e.g., 200px) so text is less cramped
    this.add.text(910, 100, 'Desc', { fontSize:'14px', color:'#666666' });
    this.add.text(1130,100, 'Steps', { fontSize:'14px', color:'#666666' });
    this.add.text(1180,100, 'Risk',  { fontSize:'14px', color:'#666666' });
    this.add.text(1220,100, 'Giver', { fontSize:'14px', color:'#666666' });

    this.taskRowTexts = [];
    // The table extends from y=120 to y=480, so ~360 px for tasks

    // ---------- ACTIVE TASK BOX (y=480..900) ----------
    this.activeBg = this.add.rectangle(900, 480, 540, 420, 0xf0f0f2)
      .setOrigin(0,0);

    this.activeTitle = this.add.text(910, 490, 'Active Task', {
      fontFamily:'Helvetica', fontSize:'18px', color:'#333333'
    });

    // We show current step info + all steps 
    // so user knows what steps remain
    this.activeLines = [];
    for(let i=0;i<7;i++){
      const line = this.add.text(910, 520 + i*20, '', {
        fontFamily:'Helvetica', fontSize:'14px', color:'#333333'
      });
      this.activeLines.push(line);
    }

    // A separate text block for “step list”
    this.stepListTitle = this.add.text(910, 680, 'All Steps:', {
      fontFamily:'Helvetica', fontSize:'14px', color:'#333333'
    });
    this.stepListTexts = []; 
    // up to 8 lines for the step list
    for(let i=0; i<8; i++){
      const line = this.add.text(910, 700 + i*18, '', {
        fontFamily:'Helvetica', fontSize:'13px', color:'#666666'
      });
      this.stepListTexts.push(line);
    }

    // We might have [Commit], [Gather], [Finalize] buttons
    this.commitBtn = this.add.text(1100, 520, '[ Commit ]',{
      fontFamily:'Helvetica',fontSize:'16px',
      backgroundColor:'#007aff',color:'#fff',
      padding:{x:8,y:4}
    }).setInteractive({useHandCursor:true})
      .on('pointerdown',()=>this.handleCommit());

    this.gatherBtn = this.add.text(1100, 560, '[ Gather ]',{
      fontFamily:'Helvetica',fontSize:'16px',
      backgroundColor:'#34c759',color:'#fff',
      padding:{x:8,y:4}
    }).setInteractive({useHandCursor:true})
      .on('pointerdown',()=>this.handleGather());

    this.finalizeBtn= this.add.text(1100,600,'[ Finalize ]',{
      fontFamily:'Helvetica',fontSize:'16px',
      backgroundColor:'#ff9500',color:'#fff',
      padding:{x:8,y:4}
    }).setInteractive({useHandCursor:true})
      .on('pointerdown',()=>this.handleFinalize());

    // Track active task
    this.activeTaskId=null;
    this.documented=false;

    // Refresh
    this.time.addEvent({
      delay:1000,
      callback:()=>this.refreshUI(),
      loop:true
    });
  }

  refreshUI() {
    // Score on left, scoreboard lines on right
    this.scoreTitle.setText(`Score: ${window.playerScore}`);
    let scoreboardString =
      `Completed:\n`+
      ` - hospital: ${window.giverScoreboard.hospital}\n`+
      ` - infrastructure: ${window.giverScoreboard.infrastructure}\n`+
      ` - informationSec: ${window.giverScoreboard.informationSecurity}\n`+
      ` - cybersecurity: ${window.giverScoreboard.cybersecurity}\n`;
    this.scoreboardLines.setText(scoreboardString);

    // Refresh tasks
    this.taskRowTexts.forEach(r => r.forEach(t => t.destroy()));
    this.taskRowTexts=[];

    let y=120;
    if(!window.canViewBacklog){
      const noTasks = this.add.text(910,y,
        'Stand on orange backlog to see tasks.',{
        fontSize:'14px',color:'#999999'
      });
      this.taskRowTexts.push([noTasks]);
      return;
    }
    // Show tasks in the table
    for(let i=0; i<window.globalTasks.length;i++){
      const t=window.globalTasks[i];
      const stepStr=`${t.currentStep}/${t.steps.length}`;
      const rowDesc=`[${t.status}] ${t.description}`+(t.isFeature?' [Feature]':' [Maint]');
      const riskStr=`${t.risk}`;
      const giverStr=`${t.giver}`;

      // Desc column gets up to 200px
      const textDesc= this.add.text(910, y, rowDesc,{
        fontSize:'14px', color:'#333333', wordWrap:{width:200}
      }).setInteractive({useHandCursor:true});
      textDesc.on('pointerdown',()=>this.selectActiveTask(t.id));

      // Steps col at x=1130
      const textSteps= this.add.text(1130,y, stepStr,{
        fontSize:'14px', color:'#333333'
      });
      // Risk col at x=1180
      const textRisk= this.add.text(1180,y, riskStr,{
        fontSize:'14px', color:'#333333'
      });
      // Giver col at x=1220
      const textGiver= this.add.text(1220,y, giverStr,{
        fontSize:'14px', color:'#333333'
      });

      this.taskRowTexts.push([textDesc,textSteps,textRisk,textGiver]);
      y+=40;
      if(y>480){
        const moreMsg= this.add.text(910,y,'...more tasks hidden...',{
          fontSize:'14px', color:'#888888'
        });
        this.taskRowTexts.push([moreMsg]);
        break;
      }
    }

    // Refresh active
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
    // Clear stepList
    for(let i=0;i<this.stepListTexts.length;i++){
      this.stepListTexts[i].setText('');
    }
    // Hide 3 buttons
    this.commitBtn.setVisible(false);
    this.gatherBtn.setVisible(false);
    this.finalizeBtn.setVisible(false);

    if(!this.activeTaskId)return;
    const task=getTaskById(this.activeTaskId);
    if(!task)return;

    // line0: step info
    let line0;
    if(task.currentStep>=task.steps.length){
      line0='All steps done. Document before finalize.';
    } else {
      line0= `Step ${task.currentStep+1} of ${task.steps.length}: ${task.steps[task.currentStep]}`;
    }
    this.activeLines[0].setText(line0);

    // line1: status
    this.activeLines[1].setText(`Status: ${task.status}`);
    // line2: priority
    this.activeLines[2].setText(`Priority: ${task.priority}`);
    // line3: risk
    this.activeLines[3].setText(`Risk: ${task.risk}`);
    // line4: type
    this.activeLines[4].setText(task.isFeature?'Feature Task':'Maintenance Task');
    // line5: giver
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

    // Display the entire step list below 
    // so user sees each required step
    if(task.steps && task.steps.length>0){
      for(let i=0;i<task.steps.length && i<this.stepListTexts.length;i++){
        // e.g. "1) Hospital partial fix"
        const stepLine = `${i+1}) ${task.steps[i]}`;
        this.stepListTexts[i].setText(stepLine);
      }
    }
  }

  handleCommit(){
    if(!this.activeTaskId)return;
    commitToTask(this.activeTaskId);
  }

  handleGather(){
    // Overlaps are in main scene
    console.log('User wants to gather. Must step on gather location in GameScene...');
  }

  handleFinalize(){
    if(!this.activeTaskId)return;
    // check doc
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
