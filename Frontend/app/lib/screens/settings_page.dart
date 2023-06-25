import 'package:edu_elimu/utils.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive/hive.dart';
import 'package:lottie/lottie.dart';

import '../themes/colors.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  TextEditingController baseUrl = TextEditingController();

  TextEditingController proxyUrl = TextEditingController();
  bool shouldShowMDomainMessage = false;
  bool shouldShowProxyMessage = false;

  Box<dynamic> box = Hive.box("settings");
  bool isLoggedIn = false;

  @override
  void dispose() {
    // close our box instance
    // box.close();
    // do the other cleanup
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    initAsync();
  }

  void initAsync() async {
    box = await Hive.openBox("settings");
    baseUrl.text = box.get("base_url", defaultValue: "");
    proxyUrl.text = box.get("proxy_url", defaultValue: "");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Proxy Settings"),
        elevation: 0.1,
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: ListView(
            children: [
              const SizedBox(height: 20),
              Lottie.asset("assets/lottie/internet.json", height: 200),
              const SizedBox(height: 30),
              Padding(
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  child: Text(
                    "Configure Proxy and Domain Settings",
                    style: GoogleFonts.poppins(
                        fontSize: 20, fontWeight: FontWeight.bold),
                  )),
              //Divider(),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20.0),
                child: Text(
                  "Here, you can configure proxy settings which will be used across the app when accessing the internet",
                  style: GoogleFonts.poppins(),
                ),
              ),
              const Divider(),

              createBaseUrlBox(),

              if (shouldShowMDomainMessage) domainExplanation(),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20.0),
                child: createBaseProxyNumber(),
              ),
              if (shouldShowProxyMessage) proxyExplanation(),

              const SizedBox(height: 20),

              createConfigureButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget createBaseUrlBox() {
    return TextField(
      controller: baseUrl,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
          prefixIcon: const Icon(Icons.language),
          isDense: false,
          focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: EduColors.appColor)),
          label: Text("Domain url",
              style: TextStyle(
                  fontSize: 15, color: Colors.black.withOpacity(0.7))),
          suffixIcon: IconButton(
            onPressed: () {
              setState(() {
                shouldShowMDomainMessage ^= true;
              });
            },
            icon: const Icon(Icons.info),
          )
          // suffixIcon:
          ),
      textAlign: TextAlign.start,
    );
  }

  Widget domainExplanation() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        "This allows you to configure domain from which the app will pull in videos from",
        style: GoogleFonts.poppins(fontSize: 12),
      ),
    );
  }

  Widget proxyExplanation() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        "Set the proxy used when accessing videos and data",
        style: GoogleFonts.poppins(fontSize: 12),
      ),
    );
  }

  Widget createBaseProxyNumber() {
    return TextField(
      controller: proxyUrl,
      keyboardType: TextInputType.emailAddress,
      decoration: InputDecoration(
          prefixIcon: const Icon(Icons.router),
          isDense: false,
          focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: EduColors.appColor)),
          label: Text("Proxy url",
              style: TextStyle(
                  fontSize: 15, color: Colors.black.withOpacity(0.7))),
          // suffixIcon:
          suffixIcon: IconButton(
            onPressed: () {
              setState(() {
                shouldShowProxyMessage ^= true;
              });
            },
            icon: const Icon(Icons.info),
          )),
      textAlign: TextAlign.start,
    );
  }

  Widget createConfigureButton() {
    return InkWell(
      onTap: (){
        box.put("base_url", baseUrl.text);
        box.put("proxy_url", proxyUrl.text);

        showOverlayMessage("Updated values",backgroundColor: Colors.black);
      },
      child: Container(
        height: 45,
        decoration: BoxDecoration(
            color: EduColors.blackColor,
            borderRadius: BorderRadius.circular(0)),
        child: const Center(
            child: Text(
          "CONFIGURE",
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
