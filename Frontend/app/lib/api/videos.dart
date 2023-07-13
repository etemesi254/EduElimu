import 'dart:convert';

import 'package:edu_elimu/models/video_models.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;

import '../utils.dart';

Future<String> uploadVideo(VideoUploaderCtx ctx) async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/uploads/upload_video";

  final uri = Uri.parse(url);
  var request = http.MultipartRequest('POST', uri);
  final httpImage = http.MultipartFile.fromBytes('image_banner', ctx.thumbnail,
      filename: 'image_banner');
  final httpVideo =
      http.MultipartFile.fromBytes('video', ctx.videoData, filename: 'video');

  request.files.add(httpImage);
  request.files.add(httpVideo);

  request.fields.addAll({
    "name": ctx.name,
    "description": ctx.description,
    "channel_id": ctx.channelId.toString(),
  });
  final streamedResponse = await request.send();
  var response = await http.Response.fromStream(streamedResponse);
  var decodedResp = jsonDecode(response.body);
  print(response.body);

  if (response.statusCode == 200) {
    return "Successfully uploaded image";
  } else {
    throw NetworkException(
        status: decodedResp["status"], message: decodedResp["message"]);
  }
}

Future<List<VideoModel>> getHomePageVideos() async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/videos/front";


  final uri = Uri.parse(url);
  var response = await http.get(uri);
  var json = jsonDecode(response.body);

  if (response.statusCode == 200) {
    return (json["data"]["videos"] as List).map((e) => VideoModel.fromJson(e)).toList();
  }
  throw NetworkException(status: json["status"], message: json["message"]);

}
