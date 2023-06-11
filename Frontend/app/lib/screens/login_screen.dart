import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/screens/signup_screen.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:edu_elimu/utils.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:lottie/lottie.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool showPassword = false;
  TextEditingController passwordController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  final GoogleSignIn googleSignIn = GoogleSignIn();
  FirebaseAuth auth = FirebaseAuth.instance;
  User? user;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
          child: ListView(children: [
            // createBanner(),
            Lottie.asset("assets/lottie/login.json",
                height: MediaQuery.of(context).size.height * 0.3),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "Login",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w600,
                  fontSize: 28,
                ),
              ),
            ),
            createEmailBox(),
            const SizedBox(
              height: 40,
            ),
            createPasswordBox(),
            //const SizedBox(height: 50),
            createForgotPasswordType(),
            createLoginButton(),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: Center(
                child: Text("OR",
                    style: GoogleFonts.poppins(
                        fontWeight: FontWeight.w600, fontSize: 18)),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  flex: 7,
                  child: loginWithGoogleButton(),
                ),
                const Spacer(),
                Expanded(
                  flex: 7,
                  child: loginWithPhoneButton(),
                ),
              ],
            ),
            const SizedBox(
              height: 30,
            ),
            InkWell(
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const SignupScreen()));
              },
              child: SizedBox(
                height: 50,
                child: Center(
                  child: RichText(
                    text: TextSpan(
                        text: "New to EduElimu? ",
                        style: GoogleFonts.poppins(
                            color: EduColors.blackColor,
                            fontWeight: FontWeight.w600),
                        children: const [
                          TextSpan(
                              text: "Register",
                              style: TextStyle(color: EduColors.appColor))
                        ]),
                  ),
                ),
              ),
            ),
            // Spacer()
          ]),
        ),
      ),
    );
  }

  Widget createForgotPasswordType() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20),
      child: Align(
        alignment: Alignment.centerRight,
        child: InkWell(
          child: Text(
            "Forgot Password ?",
            style: GoogleFonts.poppins(
                color: EduColors.blackColor, fontWeight: FontWeight.w600),
          ),
        ),
      ),
    );
  }

  Widget createEmailBox() {
    return TextField(
      controller: emailController,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.alternate_email),
        isDense: false,
        focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: EduColors.appColor)),
        label: Text("Email Address",
            style:
                TextStyle(fontSize: 15, color: Colors.black.withOpacity(0.7))),
      ),
      textAlign: TextAlign.start,
    );
  }

  Widget createPasswordBox() {
    return TextField(
      onChanged: (newValue) {},
      controller: passwordController,
      obscureText: showPassword,
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

  Widget createLoginButton() {
    return InkWell(
      onTap: () async {
        try {
          UserCredential resp = await auth.signInWithEmailAndPassword(
              email: emailController.text, password: passwordController.text);
        } on Exception catch (e) {
          showOverlayError(e.toString());
        }
      },
      child: Container(
        height: 45,
        width: double.infinity,
        decoration: BoxDecoration(
            color: EduColors.appColor, borderRadius: BorderRadius.circular(3)),
        child: const Center(
            child: Text(
          "LOGIN",
          textAlign: TextAlign.center,
          style: TextStyle(
              color: EduColors.blackColor,
              fontSize: 17,
              fontWeight: FontWeight.w500),
        )),
      ),
    );
  }

  Widget loginWithGoogleButton() {
    return InkWell(
      onTap: () async {
        try {
          final GoogleSignInAccount? googleSignInAccount =
              await googleSignIn.signIn();
          if (googleSignInAccount != null) {
            final GoogleSignInAuthentication googleSignInAuthentication =
                await googleSignInAccount.authentication;

            final AuthCredential credential = GoogleAuthProvider.credential(
              accessToken: googleSignInAuthentication.accessToken,
              idToken: googleSignInAuthentication.idToken,
            );

            try {
              final UserCredential userCredential =
                  await auth.signInWithCredential(credential);

              user = userCredential.user;
              showOverlayMessage("Sign In successful");
            } on FirebaseAuthException catch (e) {
              if (e.code == 'account-exists-with-different-credential') {
                // handle the error here
                showOverlayError(e.toString());
              } else if (e.code == 'invalid-credential') {
                // handle the error here
                showOverlayError(e.toString());
              }
            } catch (e) {
              // handle the error here
              showOverlayError(e.toString());
            }
          } else {
            showOverlayError("Could not sign in to Google :(");
          }
        } on Exception catch (e) {
          print(e.toString());
          showOverlayError("Could not sign up via Google");
          rethrow;
        }
      },
      child: Container(
        height: 45,
        decoration: BoxDecoration(
            color: EduColors.whiteColor,
            border: Border.all(color: EduColors.blackColor),
            borderRadius: BorderRadius.circular(0)),
        child: Row(
          children: [
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: CachedNetworkImage(
                  imageUrl:
                      "https://img.icons8.com/fluency/48/google-logo.png"),
            ),
            Center(
                child: Text(
              "Login with Google",
              textAlign: TextAlign.center,
              style: GoogleFonts.poppins(
                  color: EduColors.blackColor,
                  fontSize: 14,
                  fontWeight: FontWeight.w500),
            )),
          ],
        ),
      ),
    );
  }

  Widget loginWithPhoneButton() {
    return InkWell(
      child: Container(
        height: 45,
        decoration: BoxDecoration(
            color: EduColors.blackColor,
            borderRadius: BorderRadius.circular(0)),
        child: const Center(
            child: Text(
          "Login with Phone Number",
          textAlign: TextAlign.center,
          style: TextStyle(
              color: EduColors.whiteColor,
              fontSize: 14,
              fontWeight: FontWeight.w500),
        )),
      ),
    );
  }
}
