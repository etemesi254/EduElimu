# EduElimu
Here be the demons


## Building
### On Arch linux

If you are on arch linux, you can run `./install.sh` to install

Other Linux operating systems

### Backend
You need a recent version of composer,laravel (10.+) and php (8.1+) to build.

The versions which were run include

- PHP
```text
PHP 8.2.6 (cli) (built: May  9 2023 16:47:59) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.6, Copyright (c) Zend Technologies
```
-  Laravel
```text
10.11.0
```
- Composer
```text
Composer version 2.4.1 2022-08-20 11:44:50
```
To build, run the following commands (in Unix derived systems)
```bash
git clone https://github.com/etemesi254/EduElimu
cd ./EduElimu/Backend/

composer install

php artisan serve --host=0.0.0.0
```
This will fire up a server at port `8000` if not in user


### Website
You need a recent version of npm and react to build

To build
```bash
git clone https://github.com/etemesi254/EduElimu
cd ./EduElimu/Frontend/
npm install

npm run start
```


### Android

You need a recent version of flutter to build the Android/IOS app

The versions which the commands were run include

```text
[✓] Flutter (Channel stable, 3.7.12, on Manjaro Linux
    6.2.12-1-MANJARO, locale en_US.UTF-8)
[✓] Android toolchain - develop for Android devices (Android
    SDK version 33.0.2)
```

To build, run the following command

```bash
cd ./Frontend/app
```

Or whatever method needed to change the current terminal directory in your favourite os



```bash
flutter build apk
```
Will build an apk


```bash
flutter build appbundle
```

Will build an appbundle


In case you'd like to run a debug version in an Android emulator, you can use `flutter run`, which would only work if you have a connected device with USB debugging enabled or an emulator running.

