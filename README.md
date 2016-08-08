# AlcoholicMine

## requirements

platforms
- android: >5.2.1

tools

- npm
- compass (scss)
- cordova

## build

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

## initialize (develop)

```
cd www/
npm install
compass compile
```

