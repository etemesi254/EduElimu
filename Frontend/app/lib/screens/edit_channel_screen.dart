import 'dart:typed_data';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/api/channels.dart';
import 'package:edu_elimu/models/channels_models.dart';
import 'package:edu_elimu/utils.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lottie/lottie.dart';

import '../themes/colors.dart';

class EditChannelScreen extends StatefulWidget {
  final User user;
  final SingleChannelDetails channel;

  const EditChannelScreen({Key? key, required this.user, required this.channel})
      : super(key: key);

  @override
  State<EditChannelScreen> createState() => _EditChannelScreenState();
}

class _EditChannelScreenState extends State<EditChannelScreen> {
  TextEditingController channelController = TextEditingController();
  TextEditingController channelDescController = TextEditingController();

  final ImagePicker _picker = ImagePicker();
  Image? image;
  Uint8List? imageBytes;
  bool imageError = false;
  String imageErrorMessage = "Error accepting the image";

  @override
  void initState() {
    channelController.text = widget.channel.name;
    channelDescController.text = widget.channel.description;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Edit channel"),
        elevation: 0.1,
        backgroundColor: Colors.white,
      ),
      body: ListView(
        children: [
          // Lottie.asset("assets/lottie/create-channel.json",
          //     height: MediaQuery.of(context).size.height * 0.25),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
            child: Text(
              "Edit Channel",
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
              "Change your channel details here",
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
              padding: const EdgeInsets.only(left: 8.0, bottom: 10),
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
          createChannelButton(),
          const SizedBox(height: 30)
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
          imageBytes = bytes;

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

  Widget createChannelButton() {
    return InkWell(
      onTap: () async {
        EasyLoading.show(status: "Updating..");
        try {
          var ctx = ChannelUpdateCtx(
              id: widget.channel.id.toString(),
              description: channelDescController.text,
              data: imageBytes,
              name: channelController.text);
          String response = await updateChannelDetails(ctx);
          // Todo: Add dialog box on channel creation
          showOverlayMessage(response);
        } on Exception catch (e) {
          if (e is NetworkException) {
            showOverlayError(e.message);
          } else {
            showOverlayError("An error occurred, please try again");
          }
        } finally {
          EasyLoading.dismiss();
        }
        //   Navigator.of(context).push(
        //       MaterialPageRoute(builder: (context) => const SignupScreen()));
      },
      child: Container(
        height: 45,
        margin: EdgeInsets.symmetric(horizontal: 10),
        decoration: BoxDecoration(
            color: const Color(0xFF466b7d),
            borderRadius: BorderRadius.circular(0)),
        child: const Center(
            child: Text(
          "Update Channel ",
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
