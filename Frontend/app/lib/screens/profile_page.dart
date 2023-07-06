import 'package:edu_elimu/screens/account_page.dart';
import 'package:edu_elimu/screens/create_channel_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../themes/colors.dart';
import 'create_video.dart';

class ProfilePageScreen extends StatefulWidget {
  User user;

  ProfilePageScreen({Key? key, required this.user}) : super(key: key);

  @override
  State<ProfilePageScreen> createState() => _ProfilePageScreenState();
}

class _ProfilePageScreenState extends State<ProfilePageScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Profile details"),
        elevation: 0.1,
        backgroundColor: Colors.white,
      ),
      body: ListView(
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
              widget.user.displayName ?? "",
              textAlign: TextAlign.center,
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.w600,
                fontSize: 25,
              ),
            ),
          ),
          const Divider(),
          InkWell(
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (builder) => AccountPage(user: widget.user)));
            },
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15),
              child: Row(
                children: const [
                  Icon(Icons.account_circle),
                  SizedBox(width: 10),
                  Text("Account details"),
                  Spacer(),
                  Icon(Icons.keyboard_arrow_right)
                ],
              ),
            ),
          ),
          const Divider(),
          InkWell(
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (builder) => CreateChannelScreen(user: widget.user)));
            },
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15),
              child: Row(
                children: const [
                  Icon(Icons.create),
                  SizedBox(width: 10),
                  Text("Create Channel"),
                  Spacer(),
                  Icon(Icons.keyboard_arrow_right)
                ],
              ),
            ),
          ),
          const Divider(),
          InkWell(
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (builder) => CreateVideoScreen(user: widget.user)));
            },
            child: Padding(
              padding:
              const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15),
              child: Row(
                children: const [
                  Icon(Icons.create),
                  SizedBox(width: 10),
                  Text("Upload videos"),
                  Spacer(),
                  Icon(Icons.keyboard_arrow_right)
                ],
              ),
            ),
          ),
          const Divider()
        ],
      ),
    );
  }
}
