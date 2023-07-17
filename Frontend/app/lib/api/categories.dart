import 'dart:convert';

import 'package:edu_elimu/models/categories_model.dart';
import 'package:edu_elimu/models/video_models.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;

Future<List<VideoCategory>> getAllCategories() async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/categories/all";
  var endpoint = Uri.parse(url);

  var resp = await http.get(endpoint);

  if (resp.statusCode == 200) {
    var json = jsonDecode(resp.body);
    print(json);
    return (json["data"] as List).map((e) => VideoCategory.fromJson(e)).toList();
  }
  throw Exception("Error fetching categories");
}


Future<List<HomeVideoModel>> getVideosInCategory(VideoCategory category) async{
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/categories/videos?category_id=${category.id}";
  var endpoint = Uri.parse(url);

  var resp = await http.get(endpoint);

  if (resp.statusCode == 200) {
    var json = jsonDecode(resp.body);
    print(json);
    return (json["data"] as List).map((e) => HomeVideoModel.fromJson(e)).toList();
  }
  throw Exception("Error fetching categories");
}