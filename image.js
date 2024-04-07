class imageClass{
    loadImage(){//画像のロード
        loadImg(IMAGE.backG,   imageFolder + "bg.png");
        loadImg(IMAGE.mgirl1,  imageFolder + "mg_illust.png");
        loadImg(IMAGE.mgirl2,  imageFolder + "mgirl2.png");
        loadImg(IMAGE.mgirl3,  imageFolder + "mgirl3.png");
        loadImg(IMAGE.mgirl4,  imageFolder + "mgirl4.png");
        loadImg(IMAGE.mgirl5,  imageFolder + "mgirl5.png");
        loadImg(IMAGE.heart,   imageFolder + "mark_heart_red.png");
        loadImg(IMAGE.bullet,  imageFolder + "missile.png");
        loadImg(IMAGE.explode, imageFolder + "explode.png");
        loadImg(IMAGE.item0,   imageFolder + "item0.png");
        loadImg(IMAGE.item1,   imageFolder + "item1.png");
        loadImg(IMAGE.item2,   imageFolder + "item2.png");
        loadImg(IMAGE.item3,   imageFolder + "chip6.png");
        loadImg(IMAGE.enemy0,  imageFolder + "enemy0.png");
        loadImg(IMAGE.enemy1,  imageFolder + "enemy1.png");
        loadImg(IMAGE.enemy2,  imageFolder + "enemy2.png");
        loadImg(IMAGE.enemy3,  imageFolder + "enemy3.png");
        loadImg(IMAGE.enemy4,  imageFolder + "enemy4.png");
    }
}

const IMAGE =  Object.freeze({
    backG:   0,     //背景
    mgirl1:  2,     //魔法少女立ち絵
    mgirl2:  10,    //シューティング内魔法少女1(通常)
    mgirl3:  11,    //シューティング内魔法少女2(通常)
    mgirl4:  12,    //シューティング内魔法少女1(無敵)
    mgirl5:  13,    //シューティング内魔法少女2(無敵)
    heart:   15,    //魔法少女の生命力
    bullet:  20,    //弾
    explode: 21,    //爆発エフェクト
    item0:   30,    //マテリアル1
    item1:   31,    //マテリアル2
    item2:   32,    //マテリアル3
    item3:   33,    //クリスタル
    enemy0:  40,    //敵の撃つ弾
    enemy1:  41,    //敵1
    enemy2:  42,    //敵2
    enemy3:  43,    //敵3
    enemy4:  44,    //障害物
})

const imageFolder = "image/" //画像ファイルの保存先
let image = new imageClass();