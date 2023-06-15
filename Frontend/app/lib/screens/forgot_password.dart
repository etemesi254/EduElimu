import 'package:edu_elimu/screens/phone_otp_screen.dart';
import 'package:edu_elimu/utils.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

import '../themes/colors.dart';

class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({Key? key}) : super(key: key);

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  bool signedUpWithEmail = true;
  TextEditingController emailController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  FirebaseAuth auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Forgot Password"),
        elevation: 0.1,
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
          child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ListView(
          children: [
            SizedBox(
              child: Lottie.asset("assets/lottie/forgot-password.json"),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "Forgot Password",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w600,
                  fontSize: 28,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "Don't worry happens to the best of us\nWe just need some things to help you get back on your feet",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.normal,
                  fontSize: 13,
                ),
              ),
            ),
            if (signedUpWithEmail) createEmailField() else createPhoneField(),
            createChangeButton(),
            const SizedBox(height: 20),
            createSendMessageButton(),
          ],
        ),
      )),
    );
  }

  Widget createChangeButton() {
    String name = signedUpWithEmail ? "phone" : "email";
    return InkWell(
      onTap: () {
        signedUpWithEmail ^= true;
        setState(() {});
      },
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20),
        child: Align(
          alignment: Alignment.centerRight,
          child: Text(
            "Signed up with $name ?",
            style: GoogleFonts.poppins(
                color: EduColors.blackColor, fontWeight: FontWeight.w600),
          ),
        ),
      ),
    );
  }

  Widget createEmailField() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
      child: TextField(
          controller: emailController,
          keyboardType: TextInputType.emailAddress,
          style: GoogleFonts.poppins(),
          decoration: InputDecoration(
            prefixIcon: const Icon(Icons.alternate_email),
            isDense: false,
            focusedBorder: const UnderlineInputBorder(
                borderSide: BorderSide(color: EduColors.appColor)),
            label: Text("Email",
                style: TextStyle(
                    fontSize: 15, color: Colors.black.withOpacity(0.7))),
          ),
          textAlign: TextAlign.start),
    );
  }

  Widget createPhoneField() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
      child: TextField(
          controller: phoneController,
          keyboardType: TextInputType.phone,
          style: GoogleFonts.poppins(),
          decoration: InputDecoration(
            prefixIcon: const Icon(Icons.phone_android),
            isDense: false,
            focusedBorder: const UnderlineInputBorder(
                borderSide: BorderSide(color: EduColors.appColor)),
            label: Text("Phone",
                style: TextStyle(
                    fontSize: 15, color: Colors.black.withOpacity(0.7))),
          ),
          textAlign: TextAlign.start),
    );
  }

  Widget createSendMessageButton() {
    return InkWell(
      onTap: () async {
        if (signedUpWithEmail) {
          try {
            await auth.sendPasswordResetEmail(email: emailController.text);
            showOverlayMessage("Sent message to ${emailController.text}");
            Navigator.of(context).pop();
          } on Exception catch (e) {
            showOverlayError(e.toString());
          }
        } else {
          await FirebaseAuth.instance.verifyPhoneNumber(
            phoneNumber: phoneController.text,
            verificationCompleted: (PhoneAuthCredential credential) async {
              await auth.signInWithCredential(credential);
              showOverlayMessage("Successful sign up");
            },
            verificationFailed: (FirebaseAuthException e) {
              if (e.code == 'invalid-phone-number') {
                showOverlayError('The provided phone number is not valid.');
              }
              showOverlayError(e.toString());
            },
            codeSent: (String verificationId, int? resendToken) async {
              debugPrint("Verification ID $verificationId");
              setState(() {});

              // Create a PhoneAuthCredential with the code
              PhoneAuthCredential credential = PhoneAuthProvider.credential(
                  verificationId: verificationId,
                  smsCode: "");



              // Sign the user in (or link) with the credential
              await auth.signInWithCredential(credential);
              //auth.confirmPasswordReset(code: code, newPassword: newPassword)
              showOverlayMessage("Successful sign up");

            },
            codeAutoRetrievalTimeout: (String verificationId) {},
          );
          // signed up with OTP, take to next screen

        }
      },
      child: Container(
        height: 45,
        width: double.infinity,
        decoration: BoxDecoration(
            color: EduColors.appColor, borderRadius: BorderRadius.circular(3)),
        child: const Center(
            child: Text(
          "Send Code",
          textAlign: TextAlign.center,
          style: TextStyle(
              color: EduColors.blackColor,
              fontSize: 17,
              fontWeight: FontWeight.w500),
        )),
      ),
    );
  }
}
