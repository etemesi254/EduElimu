import 'package:edu_elimu/themes/colors.dart';
import 'package:edu_elimu/utils.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:local_auth/local_auth.dart';
import 'package:lottie/lottie.dart';

class AccountPage extends StatefulWidget {
  final User user;

  const AccountPage({Key? key, required this.user}) : super(key: key);

  @override
  State<AccountPage> createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  final LocalAuthentication localAuth = LocalAuthentication();
  TextEditingController phoneNumberController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text("Account Details"),
        elevation: 0.1,
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: ListView(
          children: [
            const SizedBox(height: 20),
            CircleAvatar(
              backgroundColor: EduColors.appColor,
              radius: 50,
              child: widget.user.photoURL != null
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: Image.network(widget.user.photoURL!),
                    )
                  : const Text(""),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "Account details",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w600,
                  fontSize: 25,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "Hey, this is about you",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.normal,
                  fontSize: 13,
                ),
              ),
            ),
            // const Divider(),
            const SizedBox(height: 40),
            createNameField(),
            const SizedBox(height: 40),
            createEmailField(),
            const SizedBox(height: 40),
            createPhoneField(),

            const SizedBox(height: 40),
            createLogoutButton(context),
            const SizedBox(height: 40),
            createDeleteAccountButton(context),
          ],
        ),
      ),
    );
  }

  Widget createEmailField() {
    return TextFormField(
      keyboardType: TextInputType.emailAddress,
      initialValue: widget.user.email ?? "  ",
      enabled: false,
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.alternate_email),
        isDense: false,
        border: const OutlineInputBorder(
          borderSide: BorderSide(color: Colors.grey),
        ),
        focusedBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: EduColors.appColor)),
        label: Text("Email Address",
            style:
                TextStyle(fontSize: 15, color: Colors.black.withOpacity(0.7))),
      ),
      textAlign: TextAlign.start,
    );
  }

  Widget createNameField() {
    return TextFormField(
      keyboardType: TextInputType.emailAddress,
      initialValue: widget.user.displayName ?? "  ",
      enabled: false,
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.person),
        isDense: false,
        border: const OutlineInputBorder(
          borderSide: BorderSide(color: Colors.grey),
        ),
        focusedBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: EduColors.appColor)),
        label: Text("Display Name",
            style:
                TextStyle(fontSize: 15, color: Colors.black.withOpacity(0.7))),
      ),
      textAlign: TextAlign.start,
    );
  }

  Widget createPhoneField() {
    return TextFormField(
      keyboardType: TextInputType.emailAddress,
      initialValue: widget.user.phoneNumber ?? "  ",
      onEditingComplete: (){

      },
      enabled: true,
      decoration: InputDecoration(
        prefixIcon: const Icon(Icons.phone_android),
        isDense: false,
        border: const OutlineInputBorder(
          borderSide: BorderSide(color: Colors.grey),
        ),
        focusedBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: EduColors.appColor)),
        label: Text("Phone Number",
            style:
                TextStyle(fontSize: 15, color: Colors.black.withOpacity(0.7))),
      ),
      textAlign: TextAlign.start,
    );
  }

  Widget createLogoutButton(BuildContext context) {
    return InkWell(
      onTap: () async {
        EasyLoading.show();
        FirebaseAuth.instance.signOut();
        GoogleSignIn().signOut();
        EasyLoading.dismiss();
        showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text("Logged out"),
                content: FractionallySizedBox(
                  heightFactor: 0.55,
                  child: Column(
                    children: [
                      Lottie.asset("assets/lottie/login.json", height: 200),
                      const Text(
                          "Don't fret, you can always log in"),
                      const SizedBox(height: 50),
                      InkWell(
                        onTap: () {
                          Navigator.of(context)
                              .popUntil((route) => route.isFirst);
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 15),
                          width: double.infinity,
                          color: EduColors.blackColor,
                          child: const Center(
                            child: Text(
                              "Go To Home Page",
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              );
            });

        //        widget.user.unlink(providerId)
      },
      child: Container(
        height: 45,
        width: double.infinity,
        decoration: BoxDecoration(
            color: EduColors.appColor, borderRadius: BorderRadius.circular(3)),
        child: const Center(
            child: Text(
          "Logout",
          textAlign: TextAlign.center,
          style: TextStyle(
              color: EduColors.blackColor,
              fontSize: 17,
              fontWeight: FontWeight.w500),
        )),
      ),
    );
  }

  Widget createDeleteAccountButton(BuildContext context) {
    return InkWell(
      onTap: () async {
        final bool didAuthenticate = await localAuth.authenticate(
            localizedReason:
                "This is a potentially dangerous action, are you sure you want to permanently delete your account?");
        if (didAuthenticate) {
          try {
            await widget.user.delete();

            // ignore: use_build_context_synchronously
            showDialog(
                context: context,
                builder: (context) {
                  return AlertDialog(
                    title: const Text("Thank you"),
                    content: FractionallySizedBox(
                      heightFactor: 0.55,
                      child: Column(
                        children: [
                          Lottie.asset("assets/lottie/login.json", height: 200),
                          const Text(
                              "Thank you for staying with us, we hope to see you again someday"),
                          const SizedBox(height: 50),
                          InkWell(
                            onTap: () {
                              Navigator.of(context)
                                  .popUntil((route) => route.isFirst);
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 15),
                              width: double.infinity,
                              color: EduColors.blackColor,
                              child: const Center(
                                child: Text(
                                  "Go To Home Page",
                                  style: TextStyle(color: Colors.white),
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                  );
                });
          } on FirebaseAuthException catch (e) {
            showOverlayError(e.message!);
          }
        } else {
          showOverlayError("Could not grant delete privileges to user");
        }
      },
      child: Container(
        height: 45,
        width: double.infinity,
        decoration: BoxDecoration(
            color: Colors.red, borderRadius: BorderRadius.circular(3)),
        child: const Center(
            child: Text(
          "DELETE ACCOUNT",
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
