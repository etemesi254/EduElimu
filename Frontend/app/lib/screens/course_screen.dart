import 'package:edu_elimu/api/courses.dart';
import 'package:edu_elimu/components/video_component.dart';
import 'package:edu_elimu/models/courses_model.dart';
import 'package:edu_elimu/models/video_models.dart';
import 'package:flutter/material.dart';
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
                    for (var video in snapshot.data!)
                      showSingleVideo(video)
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
    return Text(component.name);
  }
}
