import 'package:edu_elimu/api/users.dart';
import 'package:edu_elimu/models/user_account.dart';
import 'package:edu_elimu/screens/account_page.dart';
import 'package:edu_elimu/screens/profile_page.dart';
import 'package:edu_elimu/screens/settings_page.dart';
import 'package:edu_elimu/utils.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:lottie/lottie.dart';

import '../themes/colors.dart';

class AfterSignUpScreen extends StatefulWidget {
  final User user;

  const AfterSignUpScreen({Key? key, required this.user}) : super(key: key);

  @override
  State<AfterSignUpScreen> createState() => _AfterSignUpScreenState();
}

class _AfterSignUpScreenState extends State<AfterSignUpScreen> {
  TextEditingController nameController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController dateController = TextEditingController();
  DateTime? dob;

  bool emailEditable = true;
  bool phoneEditable = true;

  @override
  void initState() {
    super.initState();
    phoneController.text = widget.user.phoneNumber ?? "";
    nameController.text = widget.user.displayName ?? "";
    emailController.text = widget.user.email ?? "";
    emailEditable = emailController.text.isEmpty;
    phoneEditable = phoneController.text.isEmpty;
    getUserDetails();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10.0),
          child: ListView(children: [
            SizedBox(
              child:
                  Lottie.asset("assets/lottie/almost_there.json", height: 250),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "Almost There",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w600,
                  fontSize: 28,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
              child: Text(
                "We just need some more data to streamline the experience",
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.normal,
                  fontSize: 14,
                ),
              ),
            ),
            createNameField(),
            const SizedBox(height: 20),
            createEmailField(),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(child: createPhoneField()),
                Expanded(child: createDateField()),
              ],
            ),
            const SizedBox(height: 40),
            Row(
              children: [
                createFinishButton(),
                const SizedBox(width: 30),
                createSkipProjectButton(),
              ],
            ),
            const SizedBox(height: 20),
            InkWell(
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const SettingsPage()));
              },
              child: SizedBox(
                height: 50,
                child: Center(
                  child: RichText(
                    text: TextSpan(
                        text: "Custom Domain? ",
                        style: GoogleFonts.poppins(
                            color: EduColors.blackColor,
                            fontWeight: FontWeight.normal,
                            fontSize: 11),
                        children: const [
                          TextSpan(
                              text: "Configure domain and proxy settings",
                              style: TextStyle(color: EduColors.appColor))
                        ]),
                  ),
                ),
              ),
            )
          ]),
        ),
      ),
    );
  }

  Widget createFinishButton() {
    return Expanded(
      child: InkWell(
        onTap: () async {
          var userModel = UserAccountModel(
              phoneNumber: phoneController.text,
              dob: dob != null ? DateFormat("y-M-d").format(dob!) : "",
              firebaseUID: widget.user.uid,
              fullName: nameController.text,
              email: emailController.text,
              photoId: widget.user.photoURL,
              password: "TEMP");
          EasyLoading.show(status: "Loading..");
          try {
            await registerUser(userModel);
          } on Exception catch (e) {
            showOverlayError(e.toString());
          } finally {
            EasyLoading.dismiss();
          }
        },
        child: Container(
          height: 45,
          decoration: BoxDecoration(
              color: EduColors.appColor,
              borderRadius: BorderRadius.circular(3)),
          child: Center(
              child: Text(
            "FINISH",
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
                color: EduColors.blackColor,
                fontSize: 17,
                fontWeight: FontWeight.w500),
          )),
        ),
      ),
    );
  }

  Widget createSkipProjectButton() {
    return Expanded(
      child: InkWell(
        onTap: () async {
          Navigator.of(context).push(MaterialPageRoute(
              builder: (BuildContext context) =>
                  ProfilePageScreen(user: widget.user)));
        },
        child: Container(
          height: 45,
          //width: double.infinity,
          decoration: BoxDecoration(
              color: EduColors.blackColor,
              borderRadius: BorderRadius.circular(3)),
          child: Center(
              child: Text(
            "SKIP",
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
                color: EduColors.whiteColor,
                fontSize: 17,
                fontWeight: FontWeight.w500),
          )),
        ),
      ),
    );
  }

  Widget createNameField() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
      child: TextField(
          controller: nameController,
          keyboardType: TextInputType.emailAddress,
          style: GoogleFonts.poppins(),
          decoration: InputDecoration(
            prefixIcon: const Icon(Icons.alternate_email),
            isDense: false,
            focusedBorder: const UnderlineInputBorder(
                borderSide: BorderSide(color: EduColors.appColor)),
            label: Text("Full Name",
                style: TextStyle(
                    fontSize: 15, color: Colors.black.withOpacity(0.7))),
          ),
          textAlign: TextAlign.start),
    );
  }

  Widget createEmailField() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
      child: TextField(
          controller: emailController,
          keyboardType: TextInputType.emailAddress,
          enabled: emailEditable,
          style: GoogleFonts.poppins(
              color: emailEditable ? Colors.black : Colors.grey),
          decoration: InputDecoration(
            prefixIcon: const Icon(Icons.alternate_email),
            isDense: false,
            focusedBorder: const UnderlineInputBorder(
                borderSide: BorderSide(color: EduColors.appColor)),
            label: Text("Email Name",
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
          enabled: phoneEditable,
          style: GoogleFonts.poppins(
              color: phoneEditable ? Colors.black : Colors.grey),
          decoration: InputDecoration(
            prefixIcon: const Icon(Icons.phone_android),
            isDense: false,
            focusedBorder: const UnderlineInputBorder(
                borderSide: BorderSide(color: EduColors.appColor)),
            label: Text("Phone Number",
                style: TextStyle(
                    fontSize: 15, color: Colors.black.withOpacity(0.7))),
          ),
          textAlign: TextAlign.start),
    );
  }

  Widget createDateField() {
    return InkWell(
      onTap: () async {
        var selectedDate = await showDatePicker(
            context: context,
            initialDate: DateTime.now(),
            firstDate: DateTime.fromMillisecondsSinceEpoch(0),
            lastDate: DateTime.now());
        dateController.text = DateFormat("y-M-d").format(selectedDate!);

        dob = selectedDate;
        setState(() {});
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
        child: TextField(
            controller: dateController,
            keyboardType: TextInputType.phone,
            enabled: false,
            style: GoogleFonts.poppins(
                color: phoneEditable ? Colors.black : Colors.grey),
            decoration: InputDecoration(
              prefixIcon: const Icon(Icons.date_range),
              isDense: false,
              focusedBorder: const UnderlineInputBorder(
                  borderSide: BorderSide(color: EduColors.appColor)),
              label: Text("Date of birth",
                  style: TextStyle(
                      fontSize: 15, color: Colors.black.withOpacity(0.7))),
            ),
            textAlign: TextAlign.start),
      ),
    );
  }

  void getUserDetails() async{
    await getUserWithFirebaseId(widget.user.uid);
  }

}
