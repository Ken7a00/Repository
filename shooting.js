class shootingClass{
    constructor(){
        this.isPause = false;                       //ポーズ画面を開いているか
        this.xMax = 1000;                           //魔法少女の最大移動座標
        this.xMin = 40;                             //魔法少女の最大移動座標
        this.yMax = 680;                            //魔法少女の最大移動座標
        this.yMin = 40;                             //魔法少女の最大移動座標
        this.numHeart = 0;                          //ゲーム内生命力
        this.numMasic = 0;                          //ゲーム内魔法力
        this.numSpeed = 0;                          //ゲーム内機動力
        this.score = 0;                             //ゲーム内スコア
        this.scoreMax = 999999999;                  //スコア最大値
        this.getMaterial = [false, false, false];   //ゲーム内でマテリアルを取得したか
        this.numObject = 0;                         //オブジェクトを識別する
        this.numBullet = 0;                         //弾を識別する
        this.numEffect = 0;                         //エフェクトを識別する
        this.isGameOver = false;                    //ゲームオーバーか
        this.isGameClear = false;                   //ゲームクリアか
    }

    initializeCharacter(){//初期化
        tmr = 0;
        chara.x = 200;//┬初期位置
        chara.y = 360;//┘
        chara.untouchable = 0;
        this.numHeart = chara.statusValue[0];
        this.numMasic = chara.statusValue[1];
        this.numSpeed = chara.statusValue[2];
        this.score = 0;
        this.isGameOver  = false;
        this.isGameClear = false;
        this.getMaterial = [false, false, false];
        for(let i = 0; i<100; i++){
            object[i].isWithinScreen = false;
            effect[i].n = 0;
        }
        music.inShooting.currentTime = 0;
    }

    pauseGame(){//ポーズ処理
        if(this.isPause == false && key[KEY_CODE.E] == 1){
            soundEffect.playPauseGame();
            key[KEY_CODE.E]++;
            this.isPause = true;
        }
        if(this.isPause){
            this.drawPauseWindow();
            if(key[KEY_CODE.E] == 1){
                soundEffect.playSelectDown();
                key[KEY_CODE.E]++;
                this.isPause = false;
            }
        }
    }

    drawPauseWindow(){//ポーズウィンドウ表示
        const PAUSE_WINDOW = Object.freeze({x: 200, y: 100, w: 800, h: 520, c: "black"});
        const BUTTON = Object.freeze({x: 330, y: 470, w: 250, h: 80});
        const FONTSIZE = 40;
        drawFrame(PAUSE_WINDOW.x, PAUSE_WINDOW.y, PAUSE_WINDOW.w, PAUSE_WINDOW.h, PAUSE_WINDOW.c);
        fText("STAGE 選択に戻る?", 600, 200, 60, "gold");

        let col1   = "white";
        let right  = BUTTON.x + BUTTON.w;
        let bottom = BUTTON.y + BUTTON.h;
        fRect(BUTTON.x, BUTTON.y, BUTTON.w, BUTTON.h, "black");
        if(isMouseWithinRange(BUTTON.x, right, BUTTON.y, bottom)){
            col1 = "yellow";
            if(tapC == 1){
                tapC = 0;
                scene = 1;
                this.isPause = false;
                this.initializeCharacter();
                intializeCharaPosition();
                music.menu.currentTime = 0;
            }
        }
        lineW(3);
        sRect(BUTTON.x, BUTTON.y, BUTTON.w, BUTTON.h, col1);
        let centerX = BUTTON.x + BUTTON.w/2;
        let centerY = BUTTON.y + BUTTON.h/2;
        fText("はい", centerX, centerY, FONTSIZE, col1);

        let col2 = "white";
        let left = 620;
        right = 620 + BUTTON.w;
        fRect(left, BUTTON.y, BUTTON.w, BUTTON.h, "black");
        if(isMouseWithinRange(left, right, BUTTON.y, bottom)){
            col2 = "yellow";
            if(tapC == 1){
                tapC = 0;
                this.isPause = false;
            }
        }
        lineW(3);
        sRect(left, BUTTON.y, BUTTON.w, BUTTON.h, col2);
        centerX = left     + BUTTON.w/2;
        centerY = BUTTON.y + BUTTON.h/2;
        fText("いいえ", centerX, centerY, FONTSIZE, col2);
    }

    gameOver(){
        for(i=0; i< 100; i++){
            if(object[i].isWithinScreen) drawImgC(object[i].img, object[i].x, object[i].y);
        }
        if(tmr%40 < 20) drawImgC(12, chara.x, chara.y);
        else            drawImgC(13, chara.x, chara.y);

        let sec = int(tmr/30);
        let alpha = 50 + tmr;               //透明度
        setAlp(alpha);                      //透明度をセット
        fRect(0, 0, 1200, 720, "black");    //
        if(2 < sec){//2秒たったらシーン移行
            music.gameOver.play();
            scene = 11;
            tmr = 0;
        }
    }

    gameClear(){
        for(i=0; i< 100; i++){
            if(object[i].isWithinScreen) drawImgC(object[i].img, object[i].x, object[i].y);
        }
        if(tmr%40 < 20) drawImgC(10, chara.x, chara.y);
        else            drawImgC(11, chara.x, chara.y);

        let sec = int(tmr/30);
        if(sec < 1){
            setAlp(50);
            if(tmr%6 < 3) fRect(0, 0, 1200, 720, "white");
            setAlp(100);
        }
        else if((1 <= sec) && (sec <= 4)){
            let alpha = 50 + tmr/2;
            setAlp(alpha);
            fRect(0, 0, 1200, 720, "black");
            if(sec == 4){
                music.gameClear.play();
                scene = 12;
                tmr = 0;
            }
        }
    }
}

class bulletClass{//弾を管理するクラス
    constructor(){
        this.x  = 0;                    //弾のx座標
        this.y  = 0;                    //弾のy座標
        this.xp = 0;                    //x座標の変化量
        this.yp = 0;                    //y座標の変化量
        this.isWithinScreen = false;    //画面内にあるか
    }

    setBullet(x, y, xp, yp){
        this.x  = x + 30;
        this.y  = y;
        this.xp = xp;
        this.yp = yp;
        this.isWithinScreen = true;
        shootingG.numBullet = (shootingG.numBullet+1)%BULLET_MAX;
    }

    move(){
        if(this.isWithinScreen){//弾が画面内にあれば
            this.x += this.xp;                  //x座標を動かす
            this.y += this.yp;                  //y座標を動かす
            drawImgC(20, this.x, this.y);       //弾を描画する
            if(scene == 1){//ステージ選択画面なら
                if(this.x > 280) this.isWithinScreen = false;
            }
            if(this.x > 1200) this.isWithinScreen = false;  //画面外に出たら弾を撃てる状態にする
        }
    }
}

class objectClass{
    constructor(){
        this.x    = 0;                  //オブジェクトのx座標
        this.y    = 0;                  //オブジェクトのy座標
        this.xp   = 0;                  //x座標の変化量
        this.yp   = 0;                  //y座標の変化量
        this.isWithinScreen = false;    //画面内にあるか
        this.life = 0;                  //ライフ
        this.type = 0;                  //オブジェクトの
        this.img  = 0;                  //オブジェクトの画像番号
    }

    setObject(x, y, xp, yp, life, type, img){
        this.x    = x;
        this.y    = y;
        this.xp   = xp;
        this.yp   = yp;
        this.isWithinScreen = true;
        this.life = life;
        this.type = type;
        this.img  = img;
        shootingG.numObject = (shootingG.numObject+1)%100;
    }

    move(){
        if(this.isWithinScreen){//オブジェクトが画面内にあれば
            this.x += this.xp;  //x座標を動かす
            this.y += this.yp;  //y座標を動かす
            if(this.img == 41){//敵1の特殊な動き
                if(getDis(this.x, this.y, chara.x, chara.y) > 900){
                    if(chara.y - this.y < -3) this.yp = -3;
                    else if(chara.y - this.y > 3) this.yp = 3;
                    else this.yp = 0;
                }
            }
            if(this.img == 42){//敵2の特殊な動き
                if(getDis(this.x, this.y, chara.x, chara.y) < 250){
                    if((chara.x - this.x) < -3)     this.xp = -3;
                    else if((chara.x - this.x) > 3) this.xp = 3;
                    else this.xp = 0;

                    if(chara.y - this.y < -3) this.yp = -3;
                    else if(chara.y - this.y > 3) this.yp = 3;
                    else this.yp = 0;
                }
                else{
                    if(this.y < 60) this.yp = 8;
                    else if(this.y > 660) this.yp = -8;
                }
            }
            if(this.img == 43) {//敵3の特殊な動き
                if(this.xp < 0) {
                    this.xp = int(this.xp*0.95);
                    if(this.xp == 0) {
                        object[shootingG.numObject].setObject(this.x, this.y, -20, 0, 256, 1, 40);//弾を撃つ
                        this.xp = 20;
                    }
                }
            }
            if(this.img == 33){//クリスタルの動き
                if(this.x == 600) this.xp = 0;
                if(tmr%60 < 30) this.yp = 1;
                else this.yp = -1;
            }
            drawImgC(this.img, this.x, this.y);
            this.hitCheckWithBullet();
            this.hitCheckWithCharacter();
            if((this.x < -100)||(this.x > 1300)||(this.y < -100)||(this.y > 820)) this.isWithinScreen = false;
        }
    }

    hitCheckWithBullet(){
        if(this.type == 1){
            let rBullet = 12;                                             //弾の半径
            let rObject = (img[this.img].width + img[this.img].height)/4; //オブジェクトの半径
            for(let n = 0; n < BULLET_MAX; n++){
                if(bullet[n].isWithinScreen){
                    if(getDis(this.x, this.y, bullet[n].x, bullet[n].y) < rBullet + rObject){
                        bullet[n].isWithinScreen = false;
                        for(let iPow = 0; iPow<chara.statusValue[1]; iPow++) this.life--;
                        if(this.life <= 0){//ライフが0なら
                            soundEffect.playDestroy();
                            this.isWithinScreen = false;
                            effect[shootingG.numEffect].setEffect(this.x, this.y, 9);
                            shootingG.score += this.scoreCheck();
                            if(shootingG.score >= shootingG.scoreMax) shootingG.score = shootingG.scoreMax;
                        }
                        else effect[shootingG.numEffect].setEffect(this.x, this.y, 3);
                    }
                }
            }
        }
    }

    hitCheckWithCharacter(){//キャラクターのヒットチェック
        let rChara = 30;
        let rObject = (img[this.img].width+img[this.img].height)/4; //ヒットチェックの径(距離)
        if(getDis(this.x, this.y, chara.x, chara.y) < rChara + rObject) {
            if((this.type <= 1) && (chara.untouchable == 0)) {//敵の弾と敵機
                soundEffect.playDamage();
                this.isWithinScreen = false;
                effect[shootingG.numEffect].setEffect(this.x, this.y, 9);
                shootingG.numHeart--;
                chara.untouchable = 45;
                shake = 30;

                if(shootingG.numHeart <= 0) {//エネルギー0でゲームオーバーへ
                    shootingG.isGameOver = true;
                    tmr = 0;
                }        
            }
            if(this.type == 2) {//アイテム
                if(this.img < 33) soundEffect.getMaterial.play();
                else              soundEffect.getCrystal.play();
                this.isWithinScreen = false;
                if(this.img == 30)      shootingG.getMaterial[0] = true;
                else if(this.img == 31) shootingG.getMaterial[1] = true;
                else if(this.img == 32) shootingG.getMaterial[2] = true;
                else if(this.img == 33) {
                    shootingG.isGameClear = true;
                    tmr = 0;
                }
            }
        }
    }

    scoreCheck(){//スコア
        let score = 0;
        if(this.img == IMAGE.enemy1) score = 1000;
        else if(this.img == IMAGE.enemy2) score = 3000;
        else if(this.img == IMAGE.enemy3) score = 5000;
        else if(this.img == IMAGE.enemy4) score = 4000;
        return score;
    }
}

class effectClass{
    constructor(){
        this.x = 0; //エフェクトのx座標
        this.y = 0; //エフェクトのy座標
        this.n = 0; //エフェクトのx座標
    }

    setEffect(x, y, n) {
        this.x = x;
        this.y = y;
        this.n = n;
        shootingG.numEffect = (shootingG.numEffect+1)%100;
    }
    
    drawEffect() {
        if(this.n > 0) {
            drawImgTS(21, (9-this.n)*128, 0, 128, 128, this.x-64, this.y-64, 128, 128);
            this.n--;
        }
    }
}

let shootingG = new shootingClass();

function shooting(){
    if(shootingG.isPause == false){
        chara.move(shootingG.xMax, shootingG.yMax, shootingG.xMin, shootingG.yMin);
        chara.draw();
        for(let i = 0; i < BULLET_MAX; i++) bullet[i].move();
        setEnemy(stageSelect.idxStage);
        setItem();
        for(i=0; i < OBJECT_MAX; i++) object[i].move();
        for(i=0; i < EFFECT_MAX; i++) effect[i].drawEffect();
    }
}

function drawInfomation(){
    //生命力表示
    let colHeart = "white";
    let heart = int(shootingG.numHeart/chara.statusValue[0]*100); //現在の生命力のパーセント
    if(heart <= 33) colHeart = "red";                             //３３％でフレームを赤色にする
    else if((33 < heart) && (heart <= 50)) colHeart = "yellow";   //５０％でフレームを黄色にする
    fRect(40, 660, 10+40*chara.statusValue[0], 40, "black");
    line(3);
    sRect(40, 660, 10+40*chara.statusValue[0], 40, colHeart);
    for(let i = 0; i<shootingG.numHeart; i++) drawImgS(15, 50+40*i, 665, 30, 30); //現在の生命力を表示

    //スコア表示
    drawFrame(40, 20, 140, 40, "BLACK");
    fText("SCORE", 110, 40, 30, "white");
    drawFrame(190, 20, 220, 40, "BLACK");
    fText(digit0(shootingG.score,9), 300, 40, 30, "white");

    //ゲーム内で入手したマテリアル表示
    drawFrame(450, 20, 200, 40, "BLACK");
    fText("MATERIAL", 550, 40, 30, "white");
    drawFrame(660, 20, 250, 40, "BLACK");
    for(i=0; i<3; i++){
        if(shootingG.getMaterial[i] == false){
            let spacing = 60;
            fText("・", 725+i*spacing, 40, 30, "white");
        }
        else{
            let spacingIcon = 60;
            drawImgS(30+i, 705+i*spacingIcon, 25, int(0.8*img[31].width), int(0.8*img[31].height));
        }
    }
}

function darkenScreen(beforeScene, afterScene){//暗転させる
    let alpha = 50 + tmr; //透明度
    setAlp(alpha);        //透明度をセット
    fRect(0, 0, 1200, 720, "black");
    if(alpha > 110){//2秒たったらシーン移行
        tmpT = false;
        return afterScene;
    }
    else return beforeScene;
}

function setEnemy(stage){//敵をセット
    const PHASE = Object.freeze({first: 3, second: 40, third: 77});
    const DURATION = 27;
    let sec = int(tmr/30); //秒
    if(sec < PHASE.first){
        if(15 <= tmr%30) fText("GAME START", 600, 360, 50, "white");
    }
    else if((PHASE.first <= sec) && (sec < PHASE.first+DURATION)){//フェーズ１
        if(tmr%20 == 0) object[shootingG.numObject].setObject(1300, 60+rnd(600) , -16, 0, 1+stage, 1, 41);     //敵機1
        if(tmr%40 == 0) object[shootingG.numObject].setObject(1300, rnd(600)    , -12, 8, 2+stage, 1, 42);        //敵機2
        if(tmr%40 == 0) object[shootingG.numObject].setObject(1300, rnd(720-192), -8 , 0, 256    , 1, 44);   //障害物
    }
    else if((PHASE.second <= sec) && (sec < PHASE.second+DURATION)){//フェーズ２
        if(tmr%20 == 0) object[shootingG.numObject].setObject(1300, 60+rnd(600) , -16, 0       , 1+stage, 1, 41);   //敵機1
        if(tmr%20 == 0) object[shootingG.numObject].setObject(1300, rnd(300)    , -56, 4+rnd(8), 3+stage, 1, 43);   //敵機3
        if(tmr%40 == 0) object[shootingG.numObject].setObject(1300, rnd(720-192), -8 , 0       , 256    , 1, 44);   //障害物
    }
    else if((PHASE.third <= sec) && (sec < PHASE.third+DURATION)){//フェーズ３
        if(tmr%20 == 0) object[shootingG.numObject].setObject(1300, 60+rnd(600) , -16, 0       , 1+stage, 1, 41);     //敵機1
        if(tmr%50 == 0) object[shootingG.numObject].setObject(1300, rnd(600)    , -12, 8       , 2+stage, 1, 42);        //敵機2
        if(tmr%30 == 0) object[shootingG.numObject].setObject(1300, rnd(300)    , -56, 4+rnd(8), 3+stage, 1, 43); //敵機3
        if(tmr%40 == 0) object[shootingG.numObject].setObject(1300, rnd(720-192), -8 , 0       , 256    , 1, 44);   //障害物
    }   
}

function setItem(){//アイテムをセット
    if(tmr == 690)  object[shootingG.numObject].setObject(1300, 200+rnd(320), -12, 0, 0, 2, 30);    //マテリアル1
    if(tmr == 1800) object[shootingG.numObject].setObject(1300, 200+rnd(320), -12, 0, 0, 2, 31);    //マテリアル2
    if(tmr == 2910) object[shootingG.numObject].setObject(1300, 200+rnd(320), -12, 0, 0, 2, 32);    //マテリアル3
    if(tmr == 3300) object[shootingG.numObject].setObject(1300, 360, -5, 0, 0, 2, 33);              //クリスタル
}