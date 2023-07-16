import 'dart:convert';

import 'package:edu_elimu/models/video_models.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;
import '../models/courses_model.dart';

Future<List<CourseModel>> getAllCourses() async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/courses/all";
  var endpoint = Uri.parse(url);

  var resp = await http.get(endpoint);

  if (resp.statusCode < 300) {
    var json = jsonDecode(resp.body);
    print(json);
    return (json["data"] as List).map((e) => CourseModel.fromJson(e)).toList();
  }
  throw Exception("Error fetching courses");
}

Future<List<SingleVideoModel>> getVideoForCourses(CourseModel model) async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/courses/${model.id}/videos";
  var endpoint = Uri.parse(url);

  var resp = await http.get(endpoint);

  if (resp.statusCode < 300) {
    var json = jsonDecode(resp.body);
    return (json["data"] as List)
        .map((e) => SingleVideoModel.fromJson(e))
        .toList();
  }
  throw Exception("Error fetching video for courses");
}
