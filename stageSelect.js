class stageSelectClass{
    constructor(){
        this.idxStage = 0;          //インデックス
        this.isStageSelect = false; //ステージを選択しているか
    }

    displayStageList(){
        const STAGE_SELECT = Object.freeze({//ステージ選択フレームの
            x: 400, //左端
            y: 140, //上端
            w: 720, //幅
            h: 140, //高さ
            s: 10   //間隔
        });
        let col = ["navy", "navy", "navy"];     //選択されていないとき

        //ステージ選択フレーム
        drawFrame(400, 40, 400, 80, "blue");
        fText("ステージ選択", 600, 80, 40, "white");

        let alpha = 90; //透明度
        setAlp(alpha);
        for(let i = 0; i < 3; i++){
            let top = STAGE_SELECT.y + i*(STAGE_SELECT.h + STAGE_SELECT.s);
            if(this.isStageSelect == false){
                let right = STAGE_SELECT.x + STAGE_SELECT.w;
                let bottom = top + STAGE_SELECT.h; 
                if(isMouseWithinRange(STAGE_SELECT.x, right, top, bottom)){
                    col[i] = "blue";
                    if(tapC == 1){
                        tapC = 0;
                        this.idxStage = i;
                        this.isStageSelect = true;
                        soundEffect.playSelectUp();
                    }
                }
            }
            drawFrame(STAGE_SELECT.x, top, STAGE_SELECT.w, STAGE_SELECT.h, col[i]);
        }
        this.showStageInformation(STAGE_SELECT);
    }

    showStageInformation(STAGE_SELECT){
        const STAGE_TITLE = Object.freeze({//ステージタイトルの
            x: 520, //─┬中心座標
            y: 180, //─┘
        });
        const STAGE_HISCORE = Object.freeze({
            x: 620, y: 240
        });
        const STAGE_RATING = Object.freeze({
            x: 1000, y: 240
        });
        const MATERIAL_IMAGE = Object.freeze({
            START:      800,
            SPACING:    100
        });

        //ステージ情報
        for(i = 0; i < 3; i++){
            fText("STAGE " + (i+1), STAGE_TITLE.x, STAGE_TITLE.y + i*(STAGE_SELECT.h + STAGE_SELECT.s), 40, "white");
            for(let j = 0; j < 3; j++){
                let centerX = MATERIAL_IMAGE.START + j*MATERIAL_IMAGE.SPACING;
                let centerY = STAGE_TITLE.y + i*(STAGE_SELECT.h + STAGE_SELECT.s);
                if(stage[i].getMaterial[j]) drawImgC(j+30, centerX, centerY, 40);
                else                        fText("・", centerX, centerY, 40, "white");
            }
            fText("HISCORE" + " : " + digit0(stage[i].hiScore,9), STAGE_HISCORE.x, STAGE_HISCORE.y + i*(STAGE_SELECT.h + STAGE_SELECT.s), 30, "white");
            fText(stage[i].rating, STAGE_RATING.x, STAGE_RATING.y + i*(STAGE_SELECT.h + STAGE_SELECT.s), 40,  "white");
        }
    }
}

let stageSelect = new stageSelectClass();

/* 操作方法表示
==============================================*/
function displayControlMethod(){
    const FONTSIZE = 30;
    const FRAME = Object.freeze({
        x: 40,  //左端
        y: 380, //上端
        w: 320, //幅
        h: 300  //高さ
    })
    const KEY_ICON_W = Object.freeze({
        x: 250, y: 420, w: 40, h: 40,
    })
    const KEY_ICON_A = Object.freeze({
        x: 210, y: 460, w: 40, h: 40
    })
    const KEY_ICON_S = Object.freeze({
        x: 250, y: 460, w: 40, h: 40
    })
    const KEY_ICON_D = Object.freeze({
        x: 290, y: 460, w: 40, h: 40
    })
    const KEY_ICON_SPACE = Object.freeze({
        x: 210, y: 530, w: 120, h: 40
    })
    const KEY_ICON_E = Object.freeze({
        x: 250, y: 600, w: 40, h: 40
    })

    //フレーム
    drawFrame(FRAME.x, FRAME.y, FRAME.w, FRAME.h, "black");

    //ラベルを表示
    fText("移動", 120, 460, FONTSIZE, "white");
    fText("攻撃", 120, 550, FONTSIZE, "white");
    fText("中断", 120, 620, FONTSIZE, "white");

    //Wアイコン表示
    drawFrame(KEY_ICON_W.x, KEY_ICON_W.y, KEY_ICON_W.w, KEY_ICON_W.h, "black");
    fText("W", KEY_ICON_W.x + KEY_ICON_W.w/2, KEY_ICON_W.y + KEY_ICON_W.h/2, FONTSIZE, "white");

    //Aアイコン表示
    drawFrame(KEY_ICON_A.x, KEY_ICON_A.y, KEY_ICON_A.w, KEY_ICON_A.h, "black");
    fText("A", KEY_ICON_A.x + KEY_ICON_A.w/2, KEY_ICON_A.y + KEY_ICON_A.h/2, FONTSIZE, "white");

    //Sアイコン表示
    drawFrame(KEY_ICON_S.x, KEY_ICON_S.y, KEY_ICON_S.w, KEY_ICON_S.h, "black");
    fText("S", KEY_ICON_S.x + KEY_ICON_S.w/2, KEY_ICON_S.y + KEY_ICON_S.h/2, FONTSIZE, "white");

    //Dアイコン表示
    drawFrame(KEY_ICON_D.x, KEY_ICON_D.y, KEY_ICON_D.w, KEY_ICON_D.h, "black");
    fText("D", KEY_ICON_D.x + KEY_ICON_D.w/2, KEY_ICON_D.y + KEY_ICON_D.h/2, FONTSIZE, "white");

    //SPACEアイコン表示
    drawFrame(KEY_ICON_SPACE.x, KEY_ICON_SPACE.y, KEY_ICON_SPACE.w, KEY_ICON_SPACE.h, "black");
    fText("-", KEY_ICON_SPACE.x + KEY_ICON_SPACE.w/2, 540, FONTSIZE, "white");

    //Eアイコン表示
    drawFrame(KEY_ICON_E.x, KEY_ICON_E.y, KEY_ICON_E.w, KEY_ICON_E.h, "black");
    fText("E", KEY_ICON_E.x + KEY_ICON_E.w/2, KEY_ICON_E.y + KEY_ICON_E.h/2, FONTSIZE, "white");
}

function showCharacterPreview(){
    setAlp(80);
    drawFrame(40, 40, 320, 320, "black");
    if(stageSelect.isStageSelect == false){
        chara.move(245, 315, 80, 80);
        chara.draw();
        if(chara.pushKey && bullet[numBullet].isWithinScreen == false){
            bullet[numBullet].setBullet(chara.x, chara.y, 40, 0);
            chara.pushKey = false;
            numBullet = (numBullet+1)%BULLET_MAX;
        }
        for(let i = 0; i<BULLET_MAX; i++) bullet[i].move();
    }
}

function intializeCharaPosition(){
    chara.x = 200;
    chara.y = 200;
}

/* ステージ選択時にダイアログ表示
==============================================*/
function showDialogueBox(){
    const DIALOGUE = Object.freeze({x: 200, y: 100, w: 800, h: 520, c: "black"});
    const BUTTON = Object.freeze({x: 330, y: 470, w: 250, h: 80});
    const FONTSIZE = 40;

    dimBackGround();
    drawFrame(DIALOGUE.x, DIALOGUE.y, DIALOGUE.w, DIALOGUE.h, DIALOGUE.c);
    fText("STAGE " + (stageSelect.idxStage+1) + "に挑戦する?", 600, 200, 60, "gold");

    fRect(BUTTON.x, BUTTON.y, BUTTON.w, BUTTON.h, "black");
    let col1   = "white";
    let right  = BUTTON.x + BUTTON.w;
    let bottom = BUTTON.y + BUTTON.h;
    if(isMouseWithinRange(BUTTON.x, right, BUTTON.y, bottom)){
        col1 = "yellow";
        if(tapC == 1){
            music.menu.pause();
            music.inShooting.play();
            soundEffect.playSelectUp();
            tapC = 0;
            scene = 10;
            stageSelect.isStageSelect = false;
            shootingG.initializeCharacter();
        }
    }
    sRect(BUTTON.x, BUTTON.y, BUTTON.w, BUTTON.h, col1);
    let centerX = BUTTON.x + BUTTON.w/2;
    let centerY = BUTTON.y + BUTTON.h/2;
    fText("はい", centerX, centerY, FONTSIZE, col1);

    let col2 = "white";
    let left = 620;
    right = left + BUTTON.w;
    fRect(left, BUTTON.y, BUTTON.w, BUTTON.h, "black");
    if(isMouseWithinRange(left, right, BUTTON.y, bottom)){
        col2 = "yellow";
        if(tapC == 1){
            soundEffect.playSelectDown();
            tapC = 0;
            stageSelect.isStageSelect = false;
        }
    }
    sRect(left, BUTTON.y, BUTTON.w, BUTTON.h, col2);
    centerX = left     + BUTTON.w/2;
    centerY = BUTTON.y + BUTTON.h/2;
    fText("いいえ", centerX, centerY, FONTSIZE, col2);
}

/* 背景を暗くする
==============================================*/
function dimBackGround(){
    const BACK_GROUND = Object.freeze({
        x: 0, y: 0, w: 1200, h: 720, c: "black"
    });
    let alpha = 80;
    setAlp(alpha);
    fRect(BACK_GROUND.x, BACK_GROUND.y, BACK_GROUND.w, BACK_GROUND.h, BACK_GROUND.c);
    alpha = 100;
    setAlp(alpha);
}

/* 成長画面へ移動するボタンを描画
==============================================*/
function drawMoveGrowUpButton(){
    const growUpBtn = Object.freeze({
        x:1000, y:650, w:160, h:50, c:"black"
    })
    fRect(growUpBtn.x, growUpBtn.y, growUpBtn.w, growUpBtn.h, growUpBtn.c);
    let col = "white";
    if(stageSelect.isStageSelect == false){//ダイアログが出ていなければ選択可
        let right  = growUpBtn.x + growUpBtn.w;
        let bottom = growUpBtn.y + growUpBtn.h;
        if(isMouseWithinRange(growUpBtn.x, right, growUpBtn.y, bottom)){//マウスが範囲内にあれば
            col = "yellow";//フレームを黄色に
            if(tapC == 1){
                soundEffect.playSelectUp();
                tapC = 0;
                scene = SCENE.GROWUP;
            }
        }
    }
    lineW(3);
    sRect(growUpBtn.x, growUpBtn.y, growUpBtn.w, growUpBtn.h, col);
    fText("成長", 1080, 675, 30, col);
}

/* クレジットを表示するボタンを描画
==============================================*/
function drawCreditButton(){
    const creditBtn = Object.freeze({x:760, y:650, w:220, h:50, c:"black"});
    fRect(creditBtn.x, creditBtn.y, creditBtn.w, creditBtn.h, creditBtn.c);
    let col = "white";
    if(stageSelect.isStageSelect == false){//ダイアログが出ていなければ選択可
        let right  = creditBtn.x + creditBtn.w;
        let bottom = creditBtn.y + creditBtn.h;
        if(isMouseWithinRange(creditBtn.x, right, creditBtn.y, bottom)){//マウスが範囲内にあれば
            col = "yellow";//フレームを黄色に
            if(tapC == 1){
                soundEffect.playSelectUp();
                tapC = 0;
                scene = SCENE.CREDIT;
            }
        }
    }
    lineW(3);
    sRect(creditBtn.x, creditBtn.y, creditBtn.w, creditBtn.h, col);
    fText("クレジット", creditBtn.x + creditBtn.w/2, creditBtn.y + creditBtn.h/2, 30, col);
}

function drawDredit(){
    const WINDOW = Object.freeze({x: 200, y: 100, w: 800, h: 520, c: "black"});
    drawFrame(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h, WINDOW.c);

    const FONTSIZE = 30;
    let credit1 = "BGM by OtoLogic(CC BY 4.0)";
    let credit2 = "SOUND EFFECT by OtoLogic(CC BY 4.0)";
    fText(credit1, CANVAS.WIDTH/2, 150, FONTSIZE, "white");
    fText(credit2, CANVAS.WIDTH/2, 200, FONTSIZE, "white");
    if(tapC == 1){
        soundEffect.playSelectDown();
        tapC = 0;
        scene = SCENE.STAGESELECT;
    }
}