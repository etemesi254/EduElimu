# EduElimu
Here be the demons


## Building

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

