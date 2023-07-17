import 'package:edu_elimu/screens/create_video.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive/hive.dart';
import '../api/videos.dart';
import '../components/error_component.dart';
import '../components/loading_component.dart';
import '../components/video_component.dart';
import '../models/video_models.dart';
import '../themes/colors.dart';

class MyVideosScreen extends StatefulWidget {
  final User user;

  const MyVideosScreen({Key? key, required this.user}) : super(key: key);

  @override
  State<MyVideosScreen> createState() => _MyVideosScreenState();
}

class _MyVideosScreenState extends State<MyVideosScreen> {
  bool shouldReload = true;
  String? endpoint;
  List<HomeVideoModel> videos = [];

  Future<List<HomeVideoModel>> getVideos() async {
    if (shouldReload) {
      videos = await geMyVideos(widget.user.uid);
      shouldReload = false;
    }
    var box = Hive.box("settings");
    // default is normal localhost
    endpoint =
        await box.get("base_url", defaultValue: "10.0.2.2:8000") + "/storage/";

    return videos;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomSheet: Padding(
          padding: const EdgeInsets.all(8.0),
          child: InkWell(
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (builder) =>
                        UploadVideoScreen(user: widget.user)));
              },
              child: Container(
                  color: EduColors.appColor,
                  width: double.infinity,
                  height: 50,
                  child: const Center(
                    child: Text(
                      "Upload a video",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w500),
                    ),
                  ))),
        ),
        appBar: AppBar(
          title: const Text("My Videos"),
          backgroundColor: Colors.white,
        ),
        body: RefreshIndicator(
          onRefresh: () async {
            shouldReload = true;
            setState(() {});
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 10, bottom: 10),
                child: Text(
                  "This shows your uploaded videos",
                  style: GoogleFonts.poppins(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ),
              FutureBuilder<List<HomeVideoModel>>(
                  future: getVideos(),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState != ConnectionState.done &&
                        shouldReload) {
                      return LoadingComponent();
                    }
                    if (snapshot.hasData) {
                      return ListView.builder(
                        shrinkWrap: true,
                        itemCount: snapshot.data!.length,
                        itemBuilder: (BuildContext context, int index) {
                          return VideoComponent(
                            model: snapshot.data![index],
                            endpoint: endpoint!,
                            videos: snapshot.data!,
                          );
                        },
                      );
                    } else if (snapshot.hasError) {
                      return ErrorComponent(
                          message: snapshot.error!.toString());
                    } else {
                      return LoadingComponent();
                    }
                  }),
            ],
          ),
        ));
  }
}
