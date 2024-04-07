class levelUpClass{
    constructor(){
        this.idxStatus = 0;       //インデックス
        this.duration = 0;        //継続時間
        this.clickButton = false; //ボタンが押されたか
        this.clickYes    = false;
        this.refMaterial = 1;     //基準値
    }

    growUp(index, rank, have, value){
        let numNeedMaterial = rank[index]*rank[index]*this.refMaterial; //必要なマテリアルの数
        have [index] -= numNeedMaterial;                                //所持マテリアルから減らす
        value[index]++;                                                 //ステータスを1増やす
        rank [index]++;                                                 //ステータスランクを1増やす
    }

    drawLevelUpButton(value, have, rank){//レベルアップボタンを描画
        const BTN = Object.freeze({x: 1000, y: 180, w: 100, h: 40, spacing: 70});

        for(let i=0; i < value.length; i++){
            let col = "black";
            if(validateLevelUp(have[i], rank[i])) col = "red";
            drawFrame(BTN.x, BTN.y + (i*BTN.spacing), BTN.w, BTN.h, col);
            let right  = BTN.x + BTN.w;                   //右端
            let top    = BTN.y + (i*BTN.spacing);         //上端
            let bottom = BTN.y + BTN.h + (i*BTN.spacing); //下端
            if(this.clickYes == false && isMouseWithinRange(BTN.x, right, top, bottom)){
                if(tapC == 1){
                    if((isStatusMax(value[i], chara.statusValueMax)) || (validateLevelUp(have[i], rank[i]) == false)){
                        soundEffect.playError();
                    }
                    else soundEffect.playSelectUp();
                    tapC = 0;
                    this.clickButton = true;
                    this.idxStatus = i;
                }
            }
        }
    }

    diplayMessageWindow(){
        const MSG_WINDOW = Object.freeze({ x: 600, y: 390, w: 520, h: 220, c: "black" });
        const MESSAGE    = Object.freeze({ y: 450, fontSize: 30, start: 650 });

        drawFrame(MSG_WINDOW.x, MSG_WINDOW.y, MSG_WINDOW.w, MSG_WINDOW.h, MSG_WINDOW.c); //メッセージウィンドウ
        if(this.clickButton == false){//デフォルトメッセージ
            this.showDefaultMessage(MESSAGE);
        }
        else{//ボタンがクリックされたら
            if(isStatusMax(chara.statusValue[this.idxStatus], chara.statusValueMax[this.idxStatus])){//ステータスが最大なら
                this.showLevelMaxMessage(MESSAGE);
            }
            else{//ステータスが最大でないなら
                if(validateLevelUp(chara.haveMaterial[this.idxStatus], chara.statusRank[this.idxStatus])){//レベルアップできるなら
                    this.showAskLevelUpMessage(MESSAGE);
                }
                else{//レベルアップできないなら
                    this.showCautionMessage(MESSAGE, chara.haveMaterial[this.idxStatus], chara.statusRank[this.idxStatus]);
                }
            }
        }
    }


    showDefaultMessage(MSG){//デフォルトメッセージ
        let txt1 = "マテリアルを使用して";//メッセージ1行目
        let txt2 = "魔法少女を強化できるよ！";//メッセージ2行目
        fText(txt1, MSG.start + computeTextCenter(txt1, MSG.fontSize), MSG.y,    MSG.fontSize, "white");
        fText(txt2, MSG.start + computeTextCenter(txt2, MSG.fontSize), MSG.y+40, MSG.fontSize, "white");
    }

    showLevelMaxMessage(MSG){
        let txt = chara.statusLabel[this.idxStatus] + "は最大レベルだよ";
        let center = MSG.start + computeTextCenter(txt, MSG.fontSize);
        fText(txt, center, MSG.y, MSG.fontSize, "white");
        if(tapC == 1){
            tapC = 0;
            this.clickButton = false;
        }
    }

    showAskLevelUpMessage(MSG){
        let txt = chara.statusLabel[this.idxStatus] + "を成長させる?";
        let center = MSG.start + computeTextCenter(txt, MSG.fontSize);
        fText(txt, center, MSG.y, MSG.fontSize, "white");
        this.drawYesNoButton();
    }

    drawYesNoButton(){
        const BTN = Object.freeze({ x: 660, y: 540, w: 200, h: 40, spacing: 20 });
        const FONTSIZE = 30;

        let centerX = BTN.x + BTN.w/2;
        let centerY = BTN.y + BTN.h/2;
        drawFrame(BTN.x, BTN.y, BTN.w, BTN.h, "white");
        fText("はい", centerX, centerY, FONTSIZE, "black");

        let left = BTN.x + BTN.w + BTN.spacing;
        centerX = left + BTN.w/2;
        drawFrame(left, BTN.y, BTN.w, BTN.h, "white");
        fText("いいえ", centerX, centerY, FONTSIZE, "black");
        
        let right  = BTN.x + BTN.w;
        let bottom = BTN.y + BTN.h;
        if(isMouseWithinRange(BTN.x, right, BTN.y, bottom)){
            if(tapC == 1){
                soundEffect.levelUp.play();
                tapC = 0;
                this.duration = 60;
                this.clickYes = true;
                this.clickButton = false;
                this.growUp(this.idxStatus, chara.statusRank, chara.haveMaterial, chara.statusValue);
            }
        }
        right = left + BTN.w;
        if(isMouseWithinRange(left, right, BTN.y, bottom)){
            if(tapC == 1){
                soundEffect.playSelectDown();
                tapC = 0;
                this.clickButton = false;
            }
        }
    }

    showCautionMessage(MSG, have, rank){
        let txt1 = "マテリアルがあと";
        let txt2 = "必要だよ";
        let need = rank*rank*this.refMaterial; //必要なマテリアル
        let lack = need - have;                //不足数
        fText(txt1, MSG.start + computeTextCenter(txt1, MSG.fontSize), MSG.y,    MSG.fontSize, "white");
        fText(lack + "個",  1000, MSG.y, 40, "red");
        fText(txt2, MSG.start + computeTextCenter(txt2, MSG.fontSize), MSG.y+40, MSG.fontSize, "white");
        if(tapC == 1){
            tapC = 0;
            this.clickButton = false;
        }
    }

    drawLevelUpWindow(index, label, value){
        //背景を暗くする
        setAlp(80);
        fRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT, "black");
        setAlp(100);

        drawFrame(200, 100, 800, 520, "black");
        fText("LEVEL UP!!",   600, 200, 80, "gold");
        fText(label[index],   400, 500, 40, "white");
        fText(value[index]-1, 600, 500, 40, "white");
        fText("→",            700, 500, 40, "white");

        let col = "white";
        //ステータスが最大なら金色にする
        if((index == 0) && (value[0] == chara.statusValueMax[0])) col = "gold";
        if((index == 1) && (value[1] == chara.statusValueMax[1])) col = "gold";
        if((index == 2) && (value[2] == chara.statusValueMax[2])) col = "gold";
        fText(value[index] , 800, 500, 40, col);
        if(this.duration == 0){
            if(tapC == 1){
                tapC = 0;
                this.clickYes = false;
            } 
        }
        else this.duration--;
    }
}

let levelUp = new levelUpClass();

function displayStatusWindow(){//ステータスウィンドウを表示
    const CHARACTER_WINDOW = Object.freeze({x: 40, y: 80, w: 500, h: 550, c: "navy"});
    const STATUS_WINDOW    = Object.freeze({x: 580, y: 80, w: 580, h: 550, c: "navy"});
    drawFrame(CHARACTER_WINDOW.x, CHARACTER_WINDOW.y, 
        CHARACTER_WINDOW.w, CHARACTER_WINDOW.h, CHARACTER_WINDOW.c);    //ステータスウィンドウ
    drawFrame(STATUS_WINDOW.x, STATUS_WINDOW.y, 
        STATUS_WINDOW.w, STATUS_WINDOW.h, STATUS_WINDOW.c);             //ステータスウィンドウ
    drawImgC(2, 250, 380);  //キャラクター表示
    showStatus();           //ステータス表示
    showMaterialNum();      //マテリアルの個数表示
    drawBackButton();       //戻るボタン表示
    levelUp.drawLevelUpButton(chara.statusValue, chara.haveMaterial, chara.statusRank); //レベルアップボタン表示
    levelUp.diplayMessageWindow();
    if(levelUp.clickYes) levelUp.drawLevelUpWindow(levelUp.idxStatus, chara.statusLabel, chara.statusValue);
}

function showStatus(){//ステータス表示
    const STATUS_TEXT  = Object.freeze({x: 720, y: 200});
    const STATUS_VALUE = Object.freeze({x: 920, y: 200});
    const STATUS_SPACING = 70;
    drawFrame(600, 100, 250, 60, "navy");       //囲う
    fText("ステータス", 725, 130, 30, "gold");      //見出し
    let col = ["white", "white", "white"];
    for(let i = 0; i < chara.statusLabel.length; i++){//ステータスのラベルと値の表示
        if(chara.statusValue[i] == chara.statusValueMax[i]) col[i] = "gold";
        fText(chara.statusLabel[i], STATUS_TEXT.x,  STATUS_TEXT.y  + i*STATUS_SPACING, 30, col[i]);
        fText(chara.statusValue[i], STATUS_VALUE.x, STATUS_VALUE.y + i*STATUS_SPACING, 30, col[i]);
    }
}

function showMaterialNum(){//マテリアルの画像と個数を表示
    for(let i = 0; i < chara.haveMaterial.length; i++){
        let n = [30, 31, 32];
        fText("所持マテリアル", 520, 40, 30, "white");
        fText(digit0(chara.haveMaterial[i], 3), 760+i*180, 40, 30, "white");
        drawImgC(n[i], 680+i*180, 40);
    }
}

function drawBackButton(){
    const BACK_BUTTON = Object.freeze({x: 1000, y: 650, w: 160, h: 50, c:"black"});
    fRect(BACK_BUTTON.x, BACK_BUTTON.y, BACK_BUTTON.w, BACK_BUTTON.h, BACK_BUTTON.c);
    let col = "white";
    if(levelUp.clickYes == false){
        let right  = BACK_BUTTON.x + BACK_BUTTON.w;
        let bottom = BACK_BUTTON.y + BACK_BUTTON.h;
        if(isMouseWithinRange(BACK_BUTTON.x, right, BACK_BUTTON.y, bottom)){
            col = "yellow";
            if(tapC == 1){
                soundEffect.playSelectDown();
                tapC = 0;
                scene = 1;
            }
        }
    }
    lineW(3);
    sRect(BACK_BUTTON.x, BACK_BUTTON.y, BACK_BUTTON.w, BACK_BUTTON.h, col);
    fText("戻る", 1080, 675, 30, col);
}

function computeTextCenter(text, fontSize){//テキストの中心座標を計算する
    let textC = text.length/2*fontSize;
    return textC;
}

function isStatusMax(statusValue, statusValueMax){//ステータスが最大か
    if(statusValue == statusValueMax) return true;
    else return false;
}

function validateLevelUp(materialNum, statusRank){//レベルアップできるか
    if(materialNum - statusRank*statusRank*levelUp.refMaterial >= 0) return true;
    else return false;
}
