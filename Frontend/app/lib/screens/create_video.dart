import 'dart:io';
import 'dart:typed_data';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/api/channels.dart';
import 'package:edu_elimu/api/videos.dart';
import 'package:edu_elimu/components/connection_error.dart';
import 'package:edu_elimu/components/video_component.dart';
import 'package:edu_elimu/models/channels_models.dart';
import 'package:edu_elimu/models/video_models.dart';
import 'package:edu_elimu/utils.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lottie/lottie.dart';

import '../themes/colors.dart';

class UploadVideoScreen extends StatefulWidget {
  final User user;

  const UploadVideoScreen({Key? key, required this.user}) : super(key: key);

  @override
  State<UploadVideoScreen> createState() => _UploadVideoScreenState();
}

class _UploadVideoScreenState extends State<UploadVideoScreen> {
  TextEditingController videoNameController = TextEditingController();
  TextEditingController videoDescriptionController = TextEditingController();

  final ImagePicker _picker = ImagePicker();
  Image? image;
  Uint8List? imageBytes;
  FileBasedVideoPlayer? player;
  Uint8List? videoBytes;
  SingleChannelDetails? channel;
  List<SingleChannelDetails> channels = [];
  bool shouldReload = true;

  bool imageError = false;
  String imageErrorMessage = "Error accepting the image";

  @override
  Future<List<SingleChannelDetails>> getChannels() async {
    //
    if (shouldReload) {
      channels = await getChannelsForFirebaseId(widget.user.uid);
    }
    return channels;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Upload video"),
        elevation: 0.1,
        backgroundColor: Colors.white,
      ),
      body: FutureBuilder<List<SingleChannelDetails>>(
        future: getChannels(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return ListView(
              children: [
                // Lottie.asset("assets/lottie/create-channel.json",
                //     height: MediaQuery.of(context).size.height * 0.25),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
                  child: Text(
                    "Upload Video",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.w600,
                      fontSize: 28,
                    ),
                  ),
                ),
                const Divider(),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(vertical: 10, horizontal: 4),
                  child: Text(
                    "Upload Videos for people to learn ",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.normal,
                      fontSize: 13,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: createVideoNameField(),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: createVideoDescriptionField(),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
                  child: Text(
                    "Channel",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: showChannelDropDown(snapshot.data!),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
                  child: Text(
                    "Video banner",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
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
                //const Divider(),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: createVideoBannerField(),
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
                  padding:
                      const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
                  child: Text(
                    "Video",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 8.0, bottom: 20),
                  child: Text(
                    "Accepted formats are .mp4, .webm, .avi",
                    style: GoogleFonts.poppins(
                      fontWeight: FontWeight.normal,
                      fontSize: 11,
                    ),
                  ),
                ),
                createVideoField(),
                uploadVideoButton(),
                const SizedBox(height: 30)
              ],
            );
          } else if (snapshot.hasError) {
            return ConnectionErrorComponent(message: snapshot.error.toString());
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }

  Widget showChannelDropDown(List<SingleChannelDetails> channels) {
    if (channel != null) {
      var prevValue = channel!;
      channel = null;
      for (int i = 0; i < channels.length; i++) {
        if (prevValue.id == channels[i].id) {
          channel = channels[i];
          break;
        }
      }
    } else {
      if (channels.length > 1) {
        channel = channels[0];
      }
    }
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 10),
      width: double.infinity,
      child: DropdownButton(
          value: channel,
          items: channels.map<DropdownMenuItem<SingleChannelDetails>>(
              (SingleChannelDetails value) {
            return DropdownMenuItem<SingleChannelDetails>(
              value: value,
              child: SizedBox(width: 340, child: Text(value.name)),
            );
          }).toList(),
          onChanged: (SingleChannelDetails? ch) {
            channel = ch;
            setState(() {});
          }),
    );
  }

  Widget createVideoNameField() {
    return SizedBox(
      height: 90,
      child: TextFormField(
        controller: videoNameController,
        enabled: true,
        decoration: InputDecoration(
          prefixIcon: const Icon(Icons.badge),
          isDense: false,
          border: const UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.grey),
          ),
          focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: EduColors.appColor)),
          label: Text("Video Name",
              style: TextStyle(
                  fontSize: 15, color: Colors.black.withOpacity(0.7))),
        ),
        textAlign: TextAlign.start,
      ),
    );
  }

  Widget createVideoDescriptionField() {
    return SizedBox(
      height: 90,
      child: TextFormField(
        controller: videoDescriptionController,
        enabled: true,
        decoration: InputDecoration(
          prefixIcon: const Icon(Icons.description),
          isDense: false,
          border: const UnderlineInputBorder(
            borderSide: BorderSide(color: Colors.grey),
          ),
          focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: EduColors.appColor)),
          label: Text("Video Description",
              style: TextStyle(
                  fontSize: 15, color: Colors.black.withOpacity(0.7))),
        ),
        textAlign: TextAlign.start,
      ),
    );
  }

  Widget createVideoBannerField() {
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

  Widget createVideoField() {
    if (player == null) {
      //return //Placeholder(fallbackHeight: 100.0);
      return InkWell(
        onTap: () async {
          XFile? file = await _picker.pickMedia();

          if (file != null) {
            imageError = false;
            var bytes = await file.readAsBytes();
            player = FileBasedVideoPlayer(file: File(file.path));

            videoBytes = bytes;

            setState(() {});
          }
        },
        child: Container(
          height: player != null ? null : 178.5,
          width: double.infinity,
          margin: const EdgeInsets.all(10),
          decoration: BoxDecoration(border: Border.all(color: Colors.black)),
          child: player ?? const SizedBox(),
        ),
      );
    } else {
      return Stack(
        children: [
          Container(
            height: player != null ? null : 178.5,
            width: double.infinity,
            margin: const EdgeInsets.all(10),
            decoration: BoxDecoration(border: Border.all(color: Colors.black)),
            child: player ?? const SizedBox(),
          ),
          Positioned(
              right: 0,
              child: IconButton(
                  onPressed: () {
                    videoBytes = null;
                    player = null;

                    setState(() {});
                  },
                  icon: const Icon(Icons.cancel, color: Colors.white))),
        ],
      );
    }
  }

  Widget uploadVideoButton() {
    return InkWell(
      onTap: () async {
        if (imageBytes != null) {
          try {
            if (channel == null) {
              showOverlayError("Please choose channel ");
              return;
            }

            if (videoBytes == null) {
              showOverlayError("Please choose video ");
              return;
            }
            if (imageBytes == null) {
              showOverlayError("Please choose video banner");
              return;
            }
            if (videoDescriptionController.text.isEmpty) {
              showOverlayError("Please add description");
              return;
            }

            if (videoNameController.text.isEmpty) {
              showOverlayError("Please add video name");
              return;
            }
            EasyLoading.show(status: "Uploading..");

            var ctx = VideoUploaderCtx(
                channelId: channel!.id,
                videoData: videoBytes!,
                description: videoDescriptionController.text,
                thumbnail: imageBytes!,
                name: videoNameController.text);

            String response = await uploadVideo(ctx);
            showOverlayMessage("Successfully uploaded video");

            // Todo: Add dialog box on channel creation
          } on Exception catch (e) {
            if (e is NetworkException) {
              showOverlayError(e.message);
            } else {
              showOverlayError("An error occurred, please try again");
            }
          } finally {
            EasyLoading.dismiss();
          }
        } else {
          showOverlayError("Image not loaded!!!");
        }
        //   Navigator.of(context).push(
        //       MaterialPageRoute(builder: (context) => const SignupScreen()));
      },
      child: Container(
        height: 45,
        margin: const EdgeInsets.symmetric(horizontal: 10),
        decoration: BoxDecoration(
            color: const Color(0xFF466b7d),
            borderRadius: BorderRadius.circular(0)),
        child: const Center(
            child: Text(
          "Upload Video",
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
