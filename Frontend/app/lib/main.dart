import 'package:edu_elimu/screens/landing_page.dart';
import 'package:edu_elimu/themes/app_theme.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:overlay_support/overlay_support.dart';

import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Add this
  await Hive.initFlutter();
  await Hive.openBox("settings");

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return OverlaySupport.global(
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Edu Elimu',
        theme: EduTheme.themeData(context),
        home: const LandingPage(),
      ),
    );
  }
}
