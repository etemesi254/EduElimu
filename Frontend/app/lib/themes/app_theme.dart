import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class EduTheme {
  static ThemeData themeData(BuildContext context) {
    return ThemeData(
      primarySwatch: Colors.orange,
      primaryColor: EduColors.appColor,
    );
  }
}
