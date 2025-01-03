// ui.js

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    // 1) Create top bar (height = 120)
    this.createTopBar();
    // 2) Create left panel (from y=120 to bottom)
    this.createLeftPanel();
    // 3) Create right panel
    this.createRightPanel();

    // Refresh UI
    this.time.addEvent({
      delay: 1000,
      callback: this.refreshAll,
      callbackScope: this,
      loop: true
    });
  }

  createTopBar() {
    // Make it 1440 wide, 120 high, darker color
    this.topBg = this.add.rectangle(0, 0, 1440, 120, 0x111111)
      .setOrigin(0,0)
      .setDepth(-100)
      .setAlpha(0.95);  // Slight transparency

    // Score text
    this.scoreText = this.add.text(20, 10, 'Score: 10', {
      fontSize: '20px', fill: '#ff0000'
    });

    // Giver scoreboard (bigger area now)
    this.giverScoreText = this.add.text(20, 40, '', {
      fontSize: '16px', fill: '#ffffff'
    });

    // Instructions
    this.instructionsText = this.add.text(400, 10,
      'Arrow keys to move. Stand on the orange backlog to see tasks. Max 10 tasks.\n'+
      'Some tasks have "gather," others do not. Must document tasks before finalizing.\n'+
      'Information Security & Cybersecurity can give tasks now. Score is at left.',
      { fontSize: '14px', fill: '#ffffff' }
    );
  }

  createLeftPanel() {
    // Place from x=0, y=120, width=400, height=900-120=780
    this.leftBg = this.add.rectangle(0, 120, 400, 780, 0x333333)
      .setOrigin(0,0)
      .setDepth(-100)
      .setAlpha(0.95); // see partially through

    this.leftPanelTitle = this.add.text(10, 130, 'Tasks (Backlog)', {
      fontSize: '18px', fill: '#ffffff'
    });
    this.taskTexts = [];
  }

  createRightPanel() {
    // Right panel from x=400, y=120, width=1040, height=780
    this.rightBg = this.add.rectangle(400, 120, 1040, 780, 0xcccccc)
      .setOrigin(0,0)
      .setDepth(-100)
      .setAlpha(0.95);

    this.activeTaskContainer = this.add.container(410, 130);
    this.activeTaskContainer.setVisible(false);

    // Titles & text
    this.panelTitle = this.add.text(0, 0, 'Active Task:', { fontSize: '20px', fill: '#000' });
    this.stepText = this.add.text(0, 30, '', { fontSize: '16px', fill: '#333' });
    this.statusText = this.add.text(0, 60, '', { fontSize: '16px', fill: '#333' });
    this.priorityText = this.add.text(0, 90, '', { fontSize: '16px', fill: '#333' });
    this.riskText = this.add.text(0, 120, '', { fontSize: '16px', fill: '#f00' });
    this.taskTypeText = this.add.text(0, 150, '', { fontSize: '16px', fill: '#008000' });
    this.giverText = this.add.text(0, 180, '', { fontSize: '16px', fill: '#008080' });

    this.documented = false;

    this.documentBtn = this.add.text(0, 220, '[ Document Task ]', {
      fontSize: '16px', fill: '#fff', backgroundColor: '#4444ff', padding: { x:4, y:2 }
    }).setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.handleDocument());

    this.commitBtn = this.add.text(160, 220, '[ Commit to Task ]', {
      fontSize:'16px', fill:'#fff', backgroundColor:'#0000ff', padding:{x:4,y:2}
    }).setInteractive({useHandCursor:true})
      .on('pointerdown',()=>this.commitActiveTask());

    this.gatherBtn = this.add.text(0, 260, '[ Gather Everyone ]', {
      fontSize:'16px', fill:'#fff', backgroundColor:'#ff0000', padding:{x:4,y:2}
    }).setInteractive({useHandCursor:true})
      .on('pointerdown',()=>this.handleGather());

    this.finalizeBtn = this.add.text(200, 260, '[ Finalize Task ]', {
      fontSize:'16px', fill:'#000', backgroundColor:'#00ff00', padding:{x:4,y:2}
    }).setInteractive({useHandCursor:true})
      .on('pointerdown',()=>this.handleFinalize());

    this.allStepsLabel = this.add.text(0, 300, '', { fontSize:'16px', fill:'#000', underline:true });
    this.allStepsText = this.add.text(0, 330, '', { fontSize:'14px', fill:'#333', wordWrap:{width:1000} });

    this.activeTaskContainer.add([
      this.panelTitle, this.stepText, this.statusText, this.priorityText,
      this.riskText, this.taskTypeText, this.giverText,
      this.documentBtn, this.commitBtn, this.gatherBtn, this.finalizeBtn,
      this.allStepsLabel, this.allStepsText
    ]);
  }

  handleDocument() { this.documented = true; }
  commitActiveTask() { ... /* same as before */ }
  handleGather() { ... /* same as before */ }
  handleFinalize() { ... /* same as before */ }
  pickActiveTask(taskId) { ... /* same as before */ }
  updateActiveTaskPanel() { ... /* same as before */ }

  refreshAll() {
    this.refreshTopBar();
    this.refreshLeftPanel();
    this.updateActiveTaskPanel();
  }

  refreshTopBar() {
    this.scoreText.setText(`Score: ${window.playerScore}`);
    const boardStr =
      `Completed tasks:\n` +
      ` - hospital: ${window.giverScoreboard.hospital}\n` +
      ` - infrastructure: ${window.giverScoreboard.infrastructure}\n` +
      ` - informationSecurity: ${window.giverScoreboard.informationSecurity}\n` +
      ` - cybersecurity: ${window.giverScoreboard.cybersecurity}\n`;
    this.giverScoreText.setText(boardStr);
  }

  refreshLeftPanel() {
    this.taskTexts.forEach(t => t.destroy());
    this.taskTexts = [];

    if (!window.canViewBacklog) {
      const msg = this.add.text(10, 140, 'Stand on the orange backlog to see tasks', {
        fontSize: '14px', fill: '#ffffff'
      });
      this.taskTexts.push(msg);
      return;
    }

    let y=160;
    const lineHeight=20;
    window.globalTasks.forEach(task => {
      const cStr = task.committed?' (Committed)':'';
      const stepStr=`${task.currentStep}/${task.steps.length}`;
      const tType = task.isFeature?'[Feature]':'[Maint]';
      const label=`[${task.status}] ${task.description} ${tType}${cStr} (Risk=${task.risk}, Steps=${stepStr}, Giver=${task.giver})`;

      const txt=this.add.text(10,y,label,{
        fontSize:'14px', fill:'#ffffff', wordWrap:{width:380}
      });
      txt.setInteractive({ useHandCursor: true });
      txt.on('pointerdown', () => this.pickActiveTask(task.id));

      this.taskTexts.push(txt);
      y+=lineHeight;
    });
  }
}
