import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';
import 'package:edu_elimu/themes/colors.dart';

import '../utils.dart';
import 'login_screen.dart';

class PasswordResetScreenWithEmail extends StatefulWidget {
  final String urlText;

  const PasswordResetScreenWithEmail({Key? key, required this.urlText})
      : super(key: key);

  @override
  State<PasswordResetScreenWithEmail> createState() =>
      _PasswordResetScreenWithEmailState();
}

class _PasswordResetScreenWithEmailState
    extends State<PasswordResetScreenWithEmail> {
  bool showPassword = false;
  TextEditingController passwordController = TextEditingController();
  TextEditingController passwordConfirmController = TextEditingController();
  bool showConfirmPassword = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text("Account Details"),
        elevation: 0.1,
      ),
      body: Container(
        padding: EdgeInsets.symmetric(horizontal: 10),
        child: ListView(
          children: [
            Lottie.asset("assets/lottie/reset-password.json", height: 300),
            const SizedBox(height: 30),
            Container(
              color: Colors.white,
              child: Text(
                "Reset Password",
                style: GoogleFonts.poppins(
                    fontSize: 23, fontWeight: FontWeight.bold),
              ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Text(
                "You can change your password here",
                style: GoogleFonts.poppins(
                    fontSize: 15, fontWeight: FontWeight.normal),
              ),
            ),

            createPasswordBox(),
            SizedBox(height: 50),
            createPasswordConfirmBox(),
            SizedBox(height: 20),
            createSignUpButton(),
            //FirebaseAuth.instance.confirmPasswordReset(code: code, newPassword: newPassword)
          ],
        ),
      ),
    );
  }

  Widget createPasswordBox() {
    return TextField(
      onChanged: (newValue) {},
      controller: passwordController,
      obscureText: showPassword,
      autocorrect: false,
      enableSuggestions: false,
      // contextMenuBuilder: (context,textState){
      //
      // },
      // toolbarOptions: ToolbarOptions(
      //   copy: false,
      //   paste: false,
      //   cut: false,
      //   selectAll: false,
      // ),
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.lock),
        suffixIcon: IconButton(
          onPressed: () {
            showPassword ^= true;
            setState(() {});
          },
          icon: showPassword
              ? const Icon(Icons.visibility)
              : const Icon(Icons.visibility_off),
        ),
        isDense: false,
        focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: EduColors.appColor)),
        label: Text("Password",
            style:
                TextStyle(fontSize: 15, color: Colors.black.withOpacity(0.7))),
      ),
      textAlign: TextAlign.start,
    );
  }

  Widget createPasswordConfirmBox() {
    return TextField(
      onChanged: (newValue) {},
      controller: passwordConfirmController,
      obscureText: showConfirmPassword,
      autocorrect: false,
      enableSuggestions: false,
      // contextMenuBuilder: (context,textState){
      //
      // },
      // toolbarOptions: ToolbarOptions(
      //   copy: false,
      //   paste: false,
      //   cut: false,
      //   selectAll: false,
      // ),
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.lock),
        suffixIcon: IconButton(
          onPressed: () {
            showConfirmPassword ^= true;
            setState(() {});
          },
          icon: showConfirmPassword
              ? const Icon(Icons.visibility)
              : const Icon(Icons.visibility_off),
        ),
        isDense: false,
        focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: EduColors.appColor)),
        label: Text("Confirm password",
            style:
                TextStyle(fontSize: 15, color: Colors.black.withOpacity(0.7))),
      ),
      textAlign: TextAlign.start,
    );
  }

  Widget createSignUpButton() {
    return InkWell(
      onTap: () async {
        try {
          if (passwordController.text.length < 8) {
            showOverlayError("Password is not long enough");
            return;
          }
          if (passwordController.text.length < 8) {
            showOverlayError("Password is not long enough");
            return;
          }
          if (passwordConfirmController.text != passwordController.text) {
            showOverlayError("Passwords do not match");
          }
          if (!specialChar.hasMatch(passwordController.text)) {
            showOverlayError("Password does not have a special character");
            return;
          }
          var url = Uri.parse("http://localhost${widget.urlText}");
          var oobCode = url.queryParameters["oobCode"]!;
          EasyLoading.show(status: "Loading..");
          try {
            await FirebaseAuth.instance.confirmPasswordReset(
                code: oobCode, newPassword: passwordController.text);
          } on FirebaseException catch (e) {
            showOverlayError(e.message!);
          } finally {
            EasyLoading.dismiss();
          }
          // UserCredential user = await auth.createUserWithEmailAndPassword(
          //     email: emailController.text, password: passwordController.text);

          showOverlayMessage("Successfully created user");
        } on Exception catch (e) {
          var msg = "Could not create user";

          if (e is FirebaseAuthException) {
            msg = e.message ?? "Could not create user";
          }
          showOverlayError(msg);
          rethrow;
        }
      },
      child: Container(
        height: 45,
        width: double.infinity,
        decoration: BoxDecoration(
            color: EduColors.appColor, borderRadius: BorderRadius.circular(3)),
        child: const Center(
            child: Text(
          "CONTINUE",
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
