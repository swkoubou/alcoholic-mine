# AlcoholicMine

[デモ](http://worddrop.johnscript.info/)(音量注意)  
[ソース](https://github.com/swkoubou/worddrop)

![ゲーム画像](https://blog.johnscript.info/wp-content/uploads/2017/01/alcoholicmine.jpg)

## 概要
- スマホで動く記憶系ミニゲームです。
- N x Mにブロックが配置されており、ゲームマスターが指定した元の色のブロックの位置を当ててください。
- お酒を飲みながらプレイして、負けたらお酒を飲むみたいなシナリオを想定しています。
- 2016年8月に30hローカルハッカソンにContributorsの3人で作ったものです。 

## Requirements
Platforms
- Android: >= 5.2.1 or
- Web Browser

Tools
- npm
- compass (scss)
- cordova

## Build
```
git clone https://github.com/swkoubou/alcoholic-mine.git
cd alcoholic-mine
cd www/
npm install
compass compile
cd ../
cordova prepare
cordova build
# android apk is "platforms/android/build/outputs/apk/android-debug.apk"
```

## Initialize (develop)

```
cd www/
npm install
compass compile
```

## LICENCE
以下のサイトの音声・画像を利用しています。

### BGM/SE
- [フリー音楽素材/魔王魂](http://maoudamashii.jokersounds.com/)
- [On-Jin ～音人～](http://on-jin.com/)
- [フリー音楽素材 Senses Circuit](http://www.senses-circuit.com/)
- [ニコニ・コモンズ nc125770](http://commons.nicovideo.jp/material/nc125770)
- [ニコニ・コモンズ nc125768](http://commons.nicovideo.jp/material/nc125768)
- [Gaia Stone](http://irukatoshizou.sonnabakana.com/)

### 画像
- [「木の床」/「くまみ」のイラスト \[pixiv\]](http://www.pixiv.net/member_illust.php?mode=medium&illust_id=46534517)
- [いらすとや](http://www.irasutoya.com/)
