import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/screens/after_signup_screen.dart';
import 'package:edu_elimu/screens/login_screen.dart';
import 'package:edu_elimu/screens/phone_signup.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:edu_elimu/utils.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:lottie/lottie.dart';

RegExp emailRegex = RegExp(
    r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

RegExp phoneRegexp = RegExp(r"^[\+254|07|01][0-9]{9,12}");
RegExp specialChar = RegExp(r"[$&+,:;=?@#|'<>.^*()%!-]");

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  bool showPassword = false;
  bool showConfirmPassword = false;

  TextEditingController passwordController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController passwordConfirmController = TextEditingController();

  final GoogleSignIn googleSignIn = GoogleSignIn();
  FirebaseAuth auth = FirebaseAuth.instance;
  User? user;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Sign Up"),
        elevation: 0.1,
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
          child: ListView(children: [
            // createBanner(),
            Lottie.asset("assets/lottie/sign-up.json",
                height: MediaQuery.of(context).size.height * 0.25),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "Sign Up",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w600,
                  fontSize: 28,
                ),
              ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: createEmailBox(),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10.0),
              child: createPasswordBox(),
            ),

            const SizedBox(height: 10),

            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10.0),
              child: createPasswordConfirmBox(),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 10),
              child: Text(
                  "Password length must be greater than 8 characters and at least one special symbol"),
            ),
            createSignUpButton(),
            const SizedBox(
              height: 15,
            ),
            const Text(
              "OR",
              textAlign: TextAlign.center,
            ),
            const SizedBox(
              height: 15,
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
                    builder: (context) => const LoginScreen()));
              },
              child: SizedBox(
                height: 50,
                child: Center(
                  child: RichText(
                    text: TextSpan(
                        text: "Already have an account? ",
                        style: GoogleFonts.poppins(
                            color: EduColors.blackColor,
                            fontWeight: FontWeight.w600),
                        children: const [
                          TextSpan(
                              text: "Log in",
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
    return TextFormField(
      controller: emailController,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.alternate_email),
        isDense: false,
        errorBorder: const UnderlineInputBorder(
          borderSide: BorderSide(color: Colors.red),
        ),
        focusedBorder: const UnderlineInputBorder(
            borderSide: BorderSide(color: EduColors.appColor)),
        label: Text("Email Address or phone",
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
          if (emailController.text.isEmpty) {
            showOverlayError("Email field is empty");
            return;
          }
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
            return;
          }
          if (!specialChar.hasMatch(passwordController.text)) {
            showOverlayError("Password does not have a special character");
            return;
          }

          EasyLoading.show(status: "Loading");
          UserCredential user = await auth.createUserWithEmailAndPassword(
              email: emailController.text, password: passwordController.text);

          showOverlayMessage("Successfully created user");
          Navigator.of(context).popUntil((route) => route.isFirst);

          EasyLoading.dismiss();
        } on Exception catch (e) {
          EasyLoading.dismiss();
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

  Widget loginWithGoogleButton() {
    return InkWell(
      onTap: () async {
        try {
          EasyLoading.show(status: "Loading...");
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
              EasyLoading.dismiss();

              Navigator.of(context).push(MaterialPageRoute(
                  builder: (BuildContext ctx) =>
                      AfterSignUpScreen(user: user!)));
            } on FirebaseAuthException catch (e) {
              if (e.code == 'account-exists-with-different-credential') {
                // handle the error here
                showOverlayError(e.message!);
              } else if (e.code == 'invalid-credential') {
                // handle the error here
                showOverlayError(e.message!);
              }
            } catch (e) {
              EasyLoading.dismiss();
              // handle the error here
              showOverlayError(e.toString());
            }
          } else {
            EasyLoading.dismiss();
            showOverlayError("Could not sign in to Google :(");
          }
        } on FirebaseAuthException catch (e) {
          EasyLoading.dismiss();
          showOverlayError("Could not sign up via Google ${e.message}");
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
      onTap: () {
        Navigator.of(context).push(
            MaterialPageRoute(builder: (context) => const PhoneLoginScreen()));
      },
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
