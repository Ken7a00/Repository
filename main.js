let chara = new characterClass();

const NUM_STAGE = 3;                                            //ステージ数
let stage = new Array(NUM_STAGE);                               //ステージを管理する配列
for(let i=0; i < NUM_STAGE; i++) stage[i] = new stageClass();

const BULLET_MAX = 10;                                           //弾最大数
let bullet = new Array(BULLET_MAX);
for(i=0; i < BULLET_MAX; i++) bullet[i] = new bulletClass();

const OBJECT_MAX = 100;                                         //オブジェクト最大数
let object = new Array(OBJECT_MAX);
for(i=0; i < OBJECT_MAX; i++) object[i] = new objectClass();

const EFFECT_MAX = 100;                                         //エフェクト最大数
let effect = new Array(EFFECT_MAX);
for(i=0; i < EFFECT_MAX; i++) effect[i] = new effectClass();

const RATING_SCORE = Object.freeze({//スコアレート基準
    B: 100000, A: 180000, S: 250000
});

const KEY_CODE = Object.freeze({//キーコード
    SPACE: 32, A: 65, D: 68, E: 69, Q: 81, S: 83, W: 87
});

const CANVAS = Object.freeze({//描画キャンバスサイズ
    WIDTH: 1200, HEIGHT: 720
});

const SCENE = Object.freeze({
    TITLE:       0,     //タイトル画面
    STAGESELECT: 1,     //ステージ選択画面
    GROWUP:      2,     //成長画面
    CREDIT:      3,     //クレジット表示画面
    SHOOTING:    10,    //シューティング画面
    GAMEOVER:    11,    //ゲームオーバー画面
    GAMECLEAR:   12,    //ゲームクリア画面
})

let scene = 0;      //シーン管理
let tmr = 0;        //時間管理
let tmpT = false;
let bgX = 0;
let shake = 0;

function setup(){
    canvasSize(CANVAS.WIDTH, CANVAS.HEIGHT); //キャンバスサイズ指定
    image.loadImage();
    music.intializeMusic();
    soundEffect.intializeSoundEffect();
}

function mainloop(){
    if(shootingG.isPause == false) tmr++; //ポーズ中はタイマーを止める
    drawBackGround(1);
    switch(scene){
        case 0: //タイトル画面
            fText("☆ MasicGirl ☆", 600, 280, 100, "gold")
            if(tmr%40 < 20) fText("Click to Start!!", 600, 500, 30, "white");
            if(tmpT){
                scene = darkenScreen(0, 1);
                intializeCharaPosition();
            }
            else if(tapC == 1){
                tapC = 0;
                tmpT = true;
                tmr = 0;
                soundEffect.click2Start.play();
            }
        break;

        case SCENE.STAGESELECT: //ステージ選択画面
        case SCENE.GROWUP:      //育成画面
        case 3:
            music.inShooting.pause();   //シューティングのbgmを止める
            music.menu.play();          //ステージ選択画面のbgmを再生
            if(scene == SCENE.STAGESELECT){
                stageSelect.displayStageList();
                displayControlMethod();                             //操作方法表示
                showCharacterPreview();                             //魔法少女の動作をみせる
                drawMoveGrowUpButton();                             //育成画面へ移るためのボタンを描画
                drawCreditButton();
                if(stageSelect.isStageSelect) showDialogueBox();    //ステージ選択時にダイアログ表示
            }
            else if(scene == SCENE.GROWUP){
                displayStatusWindow();
            }
            else if(scene == SCENE.CREDIT){
                drawDredit();
            }
        break;

        case SCENE.SHOOTING: //シューティング画面
            if(shootingG.isGameOver){
                music.inShooting.pause();   //シューティングのbgmを止める
                shootingG.gameOver();       //ゲームオーバー画面へ
            }
            else{
                if(shootingG.isGameClear == false){
                    shootingG.pauseGame();  //中断用
                    shooting();             //シューティング
                    drawInfomation();       //画面内にスコアなどの情報を表示
                }
                else{
                    music.inShooting.pause();   //シューティングのbgmを止める
                    shootingG.gameClear();      //ゲームクリア画面へ
                }
            }
        break;

        case SCENE.GAMEOVER://ゲームオーバー
            const BUTTON = Object.freeze({x: 330, y: 470, w: 250, h: 80});
            const FONTSIZE = 40;
            fRect(0, 0, 1200, 720, "black");
            fText("GAMEOVER", 600, 150, 100, "yellow");
            fRect(BUTTON.x, BUTTON.y, BUTTON.w, BUTTON.h, "black");

            if(180 < tmr){
                fText("再挑戦する？", CANVAS.WIDTH/2, 400, 40, "yellow");
                let col1   = "white";
                let right  = BUTTON.x + BUTTON.w;
                let bottom = BUTTON.y + BUTTON.h;
                if(isMouseWithinRange(BUTTON.x, right, BUTTON.y, bottom)){
                    col1 = "yellow";
                    if(tapC == 1){
                        music.inShooting.play();
                        soundEffect.playSelectUp();
                        tapC = 0;
                        scene = SCENE.SHOOTING;
                        shootingG.initializeCharacter();
                    }
                }
                lineW(3);
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
                        music.menu.currentTime = 0;
                        tapC = 0;
                        scene = SCENE.STAGESELECT;
                        intializeCharaPosition();
                        chara.untouchable = 0;
                    }
                }
                sRect(left, BUTTON.y, BUTTON.w, BUTTON.h, col2);
                centerX = left     + BUTTON.w/2;
                centerY = BUTTON.y + BUTTON.h/2;
                fText("いいえ", centerX, centerY, FONTSIZE, col2);
            }
        break;

        case SCENE.GAMECLEAR://ゲームクリア
            fRect(0, 0, 1200, 720, "black");
            fText("STAGE CLEAR !!", 600, 200, 80, "yellow");
            if(35 <= tmr){//スコア表示
                fText("SCORE", 250, 400, 40, "white"); 
                fText(digit0(shootingG.score,9), 550, 400, 40,"white");
            }
            if(70 <= tmr){//ゲーム中に手に入れたマテリアル表示
                fText("MATERIAL", 250, 500, 40, "white");
                for(i = 0; i<3; i++){
                    if(shootingG.getMaterial[i]) drawImgC(i+30, 460+i*90, 500);
                    else fText("・", 460+i*90, 500, 40, "white");
                }
            }
            if(130 < tmr){//スコアに応じてランク表示
                let scoreLabel = "";
                if(RATING_SCORE.S <= shootingG.score)                                              scoreLabel = "S"; //レート更新
                else if((RATING_SCORE.A <= shootingG.score) && (shootingG.score < RATING_SCORE.S)) scoreLabel = "A";
                else if((RATING_SCORE.B <= shootingG.score) && (shootingG.score < RATING_SCORE.A)) scoreLabel = "B";
                else if(shootingG.score < RATING_SCORE.B)                                          scoreLabel = "C";
                fText(scoreLabel, 950, 450, 150, "white");
                if(tmr == 131) soundEffect.showScore.play();
            }
            if(140 < tmr){
                if(tapC == 1){//マウスをクリックしたら
                    tapC = 0;                   //入力を0にする 
                    scene = SCENE.STAGESELECT;  //ステージ選択画面へ
                    music.menu.currentTime = 0; //ステージ選択画面のbgmを初期化
                    shootingG.isGameClear = false;
                    stage[stageSelect.idxStage].updateInfo(shootingG.getMaterial, shootingG.score); //ステージ情報を更新する
                    intializeCharaPosition();   //魔法少女の表示位置をプレビュー位置に
                }
            }
        break;
    }
}

function drawBackGround(spd){//背景のスクロール
    let shakeY = 0;
    bgX = (bgX + spd)%CANVAS.WIDTH;
    if(shake > 0){//ダメージをうけたら画面をゆらす
        if(tmr%6 < 3) shakeY = 5;
        else          shakeY = -5;
        shake--;
    }
    drawImg(0, -bgX, shakeY);
    drawImg(0, CANVAS.WIDTH - bgX, shakeY);
}

function drawFrame(frmX, frmY, frmW, frmH, frmC){//フレーム描画
    const LINE_WIDTH_FRAME = 3;
    fRect(frmX, frmY, frmW, frmH, frmC);
    lineW(LINE_WIDTH_FRAME);
    setAlp(100);
    sRect(frmX, frmY, frmW, frmH, "white");
}

function isMouseWithinRange(left, right, top, bottom){//マウスカーソルが範囲内にあるか
    if((left < tapX) && (tapX < right) && (top < tapY) && (tapY < bottom)) return true;
    else return false;
}
