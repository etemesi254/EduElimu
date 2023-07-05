import 'dart:typed_data';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lottie/lottie.dart';

import '../themes/colors.dart';

class CreateChannelScreen extends StatefulWidget {
  final User user;

  const CreateChannelScreen({Key? key, required this.user}) : super(key: key);

  @override
  State<CreateChannelScreen> createState() => _CreateChannelScreenState();
}

class _CreateChannelScreenState extends State<CreateChannelScreen> {
  TextEditingController channelController = TextEditingController();
  TextEditingController channelDescController = TextEditingController();

  final ImagePicker _picker = ImagePicker();
  Image? image;
  Uint8List? imageBytes;
  bool imageError = false;
  String imageErrorMessage = "Error accepting the image";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Create channel"),
        elevation: 0.1,
        backgroundColor: Colors.white,
      ),
      body: ListView(
        children: [
          Lottie.asset("assets/lottie/create-channel.json",
              height: MediaQuery.of(context).size.height * 0.25),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
            child: Text(
              "Create Channel",
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.w600,
                fontSize: 28,
              ),
            ),
          ),
          const Divider(),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
            child: Text(
              "Show us what you got by creating a channel to share videos with the whole world\nWe hope you have as much fun teaching as kids enjoy reading",
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.normal,
                fontSize: 13,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: createChannelNameTextField(),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: createChannelDescTextField(),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
            child: Text(
              "Channel banner",
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
          const Divider(),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: createChannelBannerField(),
          ),
          if (imageError)
            Padding(
              padding: const EdgeInsets.only(left:8.0,bottom: 10),
              child: Text(
                imageErrorMessage,
                style: GoogleFonts.poppins(color: Colors.red),
              ),
            ),
          Padding(
            padding: const EdgeInsets.only(left: 8.0, bottom: 20),
            child: Text(
              "Your banner must be a PNG or JPEG, up to 15 MB, and 1,024 px by 500 px",
              style: GoogleFonts.poppins(
                fontWeight: FontWeight.normal,
                fontSize: 11,
              ),
            ),
          ),

        ],
      ),
    );
  }

  Widget createChannelNameTextField() {
    return SizedBox(
      height: 90,
      child: TextFormField(
        controller: channelController,
        enabled: true,
        decoration: InputDecoration(
          prefixIcon: const Icon(Icons.badge),
          isDense: false,
          border: const UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.grey),
          ),
          focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: EduColors.appColor)),
          label: Text("Channel Name",
              style: TextStyle(
                  fontSize: 15, color: Colors.black.withOpacity(0.7))),
        ),
        textAlign: TextAlign.start,
      ),
    );
  }

  Widget createChannelDescTextField() {
    return SizedBox(
      height: 90,
      child: TextFormField(
        controller: channelDescController,
        enabled: true,
        decoration: InputDecoration(
          prefixIcon: const Icon(Icons.description),
          isDense: false,
          border: const UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.grey),
          ),
          focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: EduColors.appColor)),
          label: Text("Channel Description",
              style: TextStyle(
                  fontSize: 15, color: Colors.black.withOpacity(0.7))),
        ),
        textAlign: TextAlign.start,
      ),
    );
  }

  Widget createChannelBannerField() {
    //return //Placeholder(fallbackHeight: 100.0);
    return InkWell(
      onTap: () async {
        XFile? file = await _picker.pickMedia();

        if (file != null) {
          imageError = false;
          var bytes = await file.readAsBytes();
          image =
               Image.memory(bytes, errorBuilder: (context, exception, error) {
            imageErrorMessage = exception.toString();
            imageError = true;
            return const Text("Could not load image");
          }, filterQuality: FilterQuality.high);
          imageBytes = imageBytes;

          if (image!.width != 1024) {
            imageError = true;
            imageErrorMessage = "Image width is not 1024!! (${image!.width})";
          }
          if (image!.height != 500) {
            imageError = true;
            imageErrorMessage = "Image height is not 500!! (${image!.height})";
          }
          setState(() {});
        }
      },
      child: Container(
        height: 178.5,
        width: double.infinity,
        margin: const EdgeInsets.all(10),
        decoration: BoxDecoration(border: Border.all(color: Colors.black)),
        child: image ?? const SizedBox(),
      ),
    );
  }
}
