import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';

import '../screens/settings_page.dart';
import '../themes/colors.dart';

class ConnectionErrorComponent extends StatelessWidget {
  String? message;

  ConnectionErrorComponent({Key? key, this.message}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Lottie.asset("assets/lottie/no-internet-connection.json",
              height: 300),
          const SizedBox(
            height: 20,
          ),
           Text(message ?? "No Internet",
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
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
              ))
        ],
      ),
    );
  }
}
