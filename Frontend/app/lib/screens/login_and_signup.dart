import 'package:edu_elimu/screens/login_screen.dart';
import 'package:edu_elimu/screens/signup_screen.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

class LoginAndSignupBanner extends StatefulWidget {
  const LoginAndSignupBanner({Key? key}) : super(key: key);

  @override
  State<LoginAndSignupBanner> createState() => _LoginAndSignupBannerState();
}

class _LoginAndSignupBannerState extends State<LoginAndSignupBanner> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          RichText(
              text: TextSpan(
                  text: "It's time to upgrade your\n",
                  style: GoogleFonts.poppins(
                      color: EduColors.blackColor,
                      fontWeight: FontWeight.w500,
                      fontSize: 22),
                  children: [
                TextSpan(
                    text: "Learning",
                    style: GoogleFonts.poppins(
                        color: EduColors.blueColor,
                        fontSize: 28,
                        fontWeight: FontWeight.w600))
              ])),
          Lottie.asset("assets/lottie/learning-concept.json",
              height: MediaQuery.of(context).size.height * 0.6),
          const Spacer(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(flex: 7,child: loginButton(),),
              const Spacer(),
              Expanded(flex: 7,child: signUpButton(),),
            ],
          ),
          const SizedBox(height: 20,),
        ],
      ),
    );
  }

  Widget loginButton() {
    return InkWell(
      onTap: (){
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => LoginScreen()));
      },
      child: Container(
        height: 45,
        decoration: BoxDecoration(
            color: EduColors.appColor,
            borderRadius: BorderRadius.circular(0)),
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

  Widget signUpButton() {
    return InkWell(
      onTap: (){
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => const SignupScreen()));
      },
      child: Container(
        height: 45,
        decoration: BoxDecoration(
            color: const Color(0xFF466b7d), borderRadius: BorderRadius.circular(0)
        ),

        child: const Center(
            child: Text(
          "SIGNUP ",
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
