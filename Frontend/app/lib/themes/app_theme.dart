import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';

class EduTheme {
  static ThemeData themeData(BuildContext context) {
    return ThemeData(
      primarySwatch: Colors.red,
      primaryColor: EduColors.appColor,
    );
  }
}
