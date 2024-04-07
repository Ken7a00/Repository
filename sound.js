class musicClass{
    intializeMusic(){
        //音楽ファイルロード
        this.menu       = new Audio(musicFolder + "menu.m4a");
        this.inShooting = new Audio(musicFolder + "GB-Fighting-B10-1(Stage6).mp3");
        this.gameOver   = new Audio(musicFolder + "gameover.m4a");
        this.gameClear  = new Audio(musicFolder + "clear.m4a");

        //ボリューム調節
        this.menu.volume       -= 0.8;
        this.gameOver.volume   -= 0.8;
        this.gameClear.volume  -= 0.8;
    }
}

class soundEffectClass{
    intializeSoundEffect(){
        //SEを格納する配列を作成
        this.selectUp   = new Array(30);
        this.selectDown = new Array(30);
        this.masic      = new Array(30);
        this.damage     = new Array(2);
        this.destroy    = new Array(10);
        this.error      = new Array(30);
        this.pauseGame  = new Array(30);

        //配列にアクセスするためのインデックス
        this.numSelectUp   = 0;
        this.numSelectDown = 0;
        this.numMasic      = 0;
        this.numDamage     = 0;
        this.numDestroy    = 0;
        this.numError      = 0;
        this.numPauseGame  = 0;
        
        //ファイルロード
        for(i=0; i<this.selectUp.length;   i++) this.selectUp[i]   = new Audio(soundFolder + "SNES-Action01-20(Select).mp3");
        for(i=0; i<this.selectDown.length; i++) this.selectDown[i] = new Audio(soundFolder + "SNES-Action01-21(Select).mp3");
        for(i=0; i<this.masic.length;      i++) this.masic[i]      = new Audio(soundFolder + "NES-RPG03-04(Magic).mp3");
        for(i=0; i<this.damage.length;     i++) this.damage[i]     = new Audio(soundFolder + "NES-RPG03-03(Damage).mp3");
        for(i=0; i<this.destroy.length;    i++) this.destroy[i]    = new Audio(soundFolder + "SNES-RPG03-3(Door).mp3");
        for(i=0; i<this.error.length;      i++) this.error[i]      = new Audio(soundFolder + "SNES-RPG01-04(Wall).mp3");
        for(i=0; i<this.pauseGame.length;  i++) this.pauseGame[i]  = new Audio(soundFolder + "NES-Action01-08(Item).mp3");
        this.getMaterial = new Audio(soundFolder + "NES-RPG03-09(Magic-Cure).mp3");
        this.getCrystal  = new Audio(soundFolder + "NES-General02-04(Noise-Single1).mp3");
        this.showScore   = new Audio(soundFolder + "Arcade-Shooter01-3(Damage).mp3");
        this.levelUp     = new Audio(soundFolder + "NES-RPG-A12-3(Level_Up).mp3");
        this.click2Start = new Audio(soundFolder + "NES-Action01-12(Item).mp3");
    }
    playSelectUp(){
        this.selectUp[this.numSelectUp].play();
        this.numSelectUp = (this.numSelectUp+1)%this.selectUp.length;
    }
    playSelectDown(){
        this.selectDown[this.numSelectDown].play();
        this.numSelectDown = (this.numSelectDown+1)%this.selectDown.length;
    }
    playMasic(){
        this.masic[this.numMasic].play();
        this.numMasic = (this.numMasic+1)%this.masic.length;
    }
    playDamage(){
        this.damage[this.numDamage].play();
        this.numDamage = (this.numDamage+1)%this.damage.length;
    }
    playDestroy(){
        this.destroy[this.numDestroy].play();
        this.numDestroy = (this.numDestroy+1)%this.destroy.length;
    }
    playError(){
        this.error[this.numError].play();
        this.numError = (this.numError+1)%this.error.length;
    }
    playPauseGame(){
        this.pauseGame[this.numPauseGame].play();
        this.numPauseGame = (this.numPauseGame+1)%this.pauseGame.length;
    }
}

const musicFolder = "music/"; //音楽ファイルの保存先
const soundFolder = "sound/"; //SEファイルの保存先
let soundEffect = new soundEffectClass();
let music = new musicClass();