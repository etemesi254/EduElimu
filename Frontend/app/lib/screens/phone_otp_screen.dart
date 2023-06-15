import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

import '../themes/colors.dart';

class PhoneOtpScreen extends StatefulWidget {
  const PhoneOtpScreen({Key? key}) : super(key: key);

  @override
  State<PhoneOtpScreen> createState() => _PhoneOtpScreenState();
}

class _PhoneOtpScreenState extends State<PhoneOtpScreen> {
  TextEditingController otpController = TextEditingController();
  bool shouldShowMDomainMessage = false;
  bool shouldShowOTPExplanation = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Phone OTP"),
        backgroundColor: Colors.white,
        elevation: 0.1,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: ListView(
            children: [
              Lottie.asset("assets/lottie/phone-and-email-communication.json", height: 200),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 10),
                child: Text(
                  "We just sent you a message",
                  style: GoogleFonts.poppins(
                    fontWeight: FontWeight.w600,
                    fontSize: 24,
                  ),
                ),
              ),
              Text(
                "Check your inbox for a one time password and paste that here",
                style: GoogleFonts.poppins(
                    fontWeight: FontWeight.w500, fontSize: 14),
              ),
              const SizedBox(height: 20),
              createOTPBox(),
              if (shouldShowOTPExplanation) otpExplanation(),
              const SizedBox(height: 20),

              createOTPProceed(),
            ],
          ),
        ),
      ),
    );
  }

  Widget otpExplanation() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        "This is the code you received from your phone",
        style: GoogleFonts.poppins(fontSize: 12),
      ),
    );
  }

  Widget createOTPBox() {
    return TextField(
      controller: otpController,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
          prefixIcon: const Icon(Icons.message),
          isDense: false,
          focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: EduColors.appColor)),
          label: Text("OTP Code",
              style: TextStyle(
                  fontSize: 15, color: Colors.black.withOpacity(0.7))),
          suffixIcon: IconButton(
            onPressed: () {
              setState(() {
                shouldShowOTPExplanation ^= true;
              });
            },
            icon: const Icon(Icons.info),
          )),
      textAlign: TextAlign.start,
    );
  }

  Widget createOTPProceed() {
    return InkWell(
      onTap: () {
        // Navigator.of(context).push(
        //     MaterialPageRoute(builder: (context) => const SignupScreen()));
      },
      child: Container(
        height: 45,
        decoration: BoxDecoration(
            color: const Color(0xFF466b7d),
            borderRadius: BorderRadius.circular(0)),
        child: const Center(
            child: Text(
          "Proceed ",
          textAlign: TextAlign.center,
          style: TextStyle(
              color: EduColors.whiteColor,
              fontSize: 17,
              fontWeight: FontWeight.w500),
        )),
      ),
    );
  }
}
