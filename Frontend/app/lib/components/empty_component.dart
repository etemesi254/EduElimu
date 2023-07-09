import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

class NoItemPlaceHolder extends StatefulWidget {
  final String? message;

  NoItemPlaceHolder({Key? key, this.message}) : super(key: key);

  @override
  State<NoItemPlaceHolder> createState() => _NoItemPlaceHolderState();
}

class _NoItemPlaceHolderState extends State<NoItemPlaceHolder> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Lottie.asset("assets/lottie/empty-box.json", height: 300),
        const SizedBox(height: 20),
        Text(
          widget.message ?? "We found the coffers empty",
          textAlign: TextAlign.center,
          style: GoogleFonts.poppins(
            fontWeight: FontWeight.w500,
          ),
        )
      ],
    );
  }
}
