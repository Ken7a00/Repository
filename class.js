class characterClass{
    constructor(){//コンストラクタ
        this.statusValue    = [3, 1, 8];                    //ステータス値
        this.statusValueMax = [10, 5, 13];                  //ステータス最大値
        this.statusLabel    = ["生命力", "魔法力", "機動力"];  //ステータス最大値
        this.statusRank     = [1, 1, 1];                    //ステータスを強化するごとに増加
        this.haveMaterial   = [13, 3, 52];                  //所持マテリアル
        this.x              = 200;                          //キャラクターのx座標
        this.y              = 200;                          //キャラクターのy座標
        this.untouchable    = 0;                            //無敵時間を管理
    }
    
    move(maxX, maxY, minX, minY){//キャラクターを動かす
        if(shootingG.isGameClear == false){
            if((key[KEY_CODE.A] > 0) && (this.x > minX)) this.x -= this.statusValue[2];//左移動
            if((key[KEY_CODE.D] > 0) && (this.x < maxX)) this.x += this.statusValue[2];//右移動
            if((key[KEY_CODE.W] > 0) && (this.y > minY)) this.y -= this.statusValue[2];//上移動
            if((key[KEY_CODE.S] > 0) && (this.y < maxY)) this.y += this.statusValue[2];//下移動
            if((key[KEY_CODE.SPACE] == 1) && (this.untouchable == 0)){//攻撃（無敵時間中は不可）
                key[KEY_CODE.SPACE]++;
                if(bullet[shootingG.numBullet].isWithinScreen == false) bullet[shootingG.numBullet].setBullet(chara.x, chara.y, 40, 0);
                soundEffect.playMasic();
            }
        }
    }

    draw(){//キャラクターを描画
        if(this.untouchable == 0){//通常
            if(tmr%40 < 20) drawImgC(10, this.x, this.y);
            else            drawImgC(11, this.x, this.y);
        }
        if(this.untouchable > 0){//無敵
            if(this.untouchable%2 == 0){//点滅させる
                if(tmr%40 < 20) drawImgC(12, this.x, this.y);
                else            drawImgC(13, this.x, this.y);
            }
            this.untouchable--;
        }
    }
}

class stageClass{
    constructor(){//コンストラクタ
        this.isClear     = false;
        this.getMaterial = [false, false, false];
        this.hiScore     = 0;
        this.rating      = "--";
    }

    updateInfo(getMaterialInGame, score){
        this.isClear = true;
        for(let i=0; i<3; i++){
            if((this.getMaterial[i] == false) && (getMaterialInGame[i])){
                this.getMaterial[i] = true;
                chara.haveMaterial[i]++;
            };
        }
        if(score > this.hiScore) this.hiScore = score;  //ハイスコア更新
        if(this.hiScore >= RATING_SCORE.S)                                           this.rating = "S"; //レート更新
        else if((this.hiScore >= RATING_SCORE.A) && (this.hiScore < RATING_SCORE.S)) this.rating = "A";
        else if((this.hiScore >= RATING_SCORE.B) && (this.hiScore < RATING_SCORE.A)) this.rating = "B";
        else if(this.hiScore < RATING_SCORE.B)                                       this.rating = "C";
    }
}



