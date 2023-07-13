import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

class ErrorComponent extends StatefulWidget {
  final String? message;

  ErrorComponent({Key? key, this.message}) : super(key: key);

  @override
  State<ErrorComponent> createState() => _ErrorComponentState();
}

class _ErrorComponentState extends State<ErrorComponent> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Lottie.asset("assets/lottie/error.json", height: 300),
          const SizedBox(height: 20),
          Text(
            widget.message ?? "Uuh oh, this is an error",
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              fontWeight: FontWeight.w500,
            ),
          )
        ],
      ),
    );
  }
}
