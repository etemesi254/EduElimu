import 'package:edu_elimu/api/courses.dart';
import 'package:edu_elimu/components/video_component.dart';
import 'package:edu_elimu/models/courses_model.dart';
import 'package:edu_elimu/models/video_models.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive/hive.dart';

import '../components/error_component.dart';
import '../components/loading_component.dart';

class CourseScreen extends StatefulWidget {
  final CourseModel model;
  final String endpoint;

  const CourseScreen({Key? key, required this.model, required this.endpoint})
      : super(key: key);

  @override
  State<CourseScreen> createState() => _CourseScreenState();
}

class _CourseScreenState extends State<CourseScreen> {
  List<SingleVideoModel> videos = [];
  bool shouldReload = true;
  String? endpoint;

  Future<List<SingleVideoModel>> getVideos() async {
    if (shouldReload) {
      videos = await getVideoForCourses(widget.model);
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
      appBar: AppBar(
        title: Text(widget.model.name),
        backgroundColor: Colors.white,
      ),
      body: SafeArea(
        child: FutureBuilder(
            future: getVideos(),
            builder: (context, snapshot) {
              if (snapshot.connectionState != ConnectionState.done &&
                  shouldReload) {
                return LoadingComponent();
              }
              if (snapshot.hasData) {
                return ListView(
                  children: [
                    for (var video in snapshot.data!) showSingleVideo(video)
                  ],
                );
              } else if (snapshot.hasError) {
                return ErrorComponent(message: snapshot.error!.toString());
              } else {
                return LoadingComponent();
              }
            }),
      ),
    );
  }

  Widget showSingleVideo(SingleVideoModel component) {
    return SingleCourseVideoComponent(
        endpoint: widget.endpoint, model: component);
  }
}

class SingleCourseVideoComponent extends StatefulWidget {
  SingleVideoModel model;
  String endpoint;

  SingleCourseVideoComponent(
      {Key? key, required this.endpoint, required this.model})
      : super(key: key);

  @override
  State<SingleCourseVideoComponent> createState() =>
      _SingleCourseVideoComponentState();
}

class _SingleCourseVideoComponentState
    extends State<SingleCourseVideoComponent> {
  bool liked = false;
  bool disliked = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          RatioVideoPlayer(url: widget.endpoint + widget.model.fileUrl),
          Row(
            children: [
              Text(widget.model.name, style: GoogleFonts.poppins()),

              const Spacer(),
              IconButton(
                icon: Icon(Icons.thumb_up_sharp,
                    color: liked
                        ? EduColors.appColor
                        : Colors.black.withOpacity(0.4)),
                onPressed: () {
                  liked ^= true;
                  setState(() {});
                },
              ),
             // const SizedBox(width: 4),
              //Text(widget.model.likes.toString()),
              const SizedBox(width: 5),
              //Text(widget.model.dislikes.toString()),
             // const SizedBox(width: 4),
              IconButton(
                onPressed: () {
                  disliked ^= true;
                  setState(() {});
                },
                icon: Icon(
                  Icons.thumb_down,
                  color: disliked ? Colors.red : Colors.black.withOpacity(0.3),
                ),
              ),
              const SizedBox(width: 20),
            ],
          )
        ],
      ),
    );
    ;
  }
}
