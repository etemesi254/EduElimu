import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

class LoadingComponent extends StatefulWidget {
  final String? message;

  LoadingComponent({Key? key, this.message}) : super(key: key);

  @override
  State<LoadingComponent> createState() => _LoadingComponentState();
}

class _LoadingComponentState extends State<LoadingComponent> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        //mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Lottie.asset("assets/lottie/loading.json", height: 200),
          const SizedBox(height: 20),
          Text(
            widget.message ?? "Hold on, something great is coming",
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
