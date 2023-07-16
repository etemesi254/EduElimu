import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/models/video_models.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../components/video_component.dart';
import '../themes/colors.dart';

class SingeVideoScreen extends StatefulWidget {
  final HomeVideoModel video;
  final String endpoint;
  final NetworkBasedVideoPlayer component;

  const SingeVideoScreen(
      {Key? key,
      required this.video,
      required this.component,
      required this.endpoint})
      : super(key: key);

  @override
  State<SingeVideoScreen> createState() => _SingeVideoScreenState();
}

class _SingeVideoScreenState extends State<SingeVideoScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text(widget.video.videoName),
      ),
      body: SafeArea(
        child: Container(
          child: ListView(
            children: [
              SizedBox(
                child: widget.component,
              ),
              // channel
              Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 4.0, horizontal: 8.0),
                child: Text(
                  widget.video.videoName,
                  style: GoogleFonts.poppins(
                      fontSize: 20, fontWeight: FontWeight.w500),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Row(
                  children: [
                    ClipRRect(
                      // backgroundColor: Colors.transparent,
                      borderRadius: BorderRadius.circular(20),
                      child: CachedNetworkImage(
                          width: 30,
                          height: 30,
                          imageUrl:
                              "${widget.endpoint}${widget.video.channelBanner}"),
                    ),
                    const SizedBox(width: 20),
                    Text(
                      widget.video.channelName,
                      style: GoogleFonts.poppins(color: EduColors.blackColor),
                    ),
                    const Spacer(),
                    SizedBox(
                      child: InkWell(
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              vertical: 8, horizontal: 9),
                          decoration: BoxDecoration(
                              color: EduColors.appColor,
                              borderRadius: BorderRadius.circular(5)),
                          child: Text(
                            "Subscribe",
                            style: GoogleFonts.poppins(
                                color: Colors.white, fontSize: 17),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    
                  ],
                ),
              ),
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0,vertical: 5),
                child: Text(widget.video.videoDescription),
              )

            ],

          ),
        ),
      ),
    );
  }
}
