import 'dart:convert';

import 'package:edu_elimu/models/channels_models.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;

import '../utils.dart';

Future<String> uploadChannelDetails(ChannelUploadCtx ctx) async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/channels/create/firebase_id";

  final uri = Uri.parse(url);
  var request = http.MultipartRequest('POST', uri);
  final httpImage = http.MultipartFile.fromBytes('channel_banner', ctx.data,
      filename: 'channel_banner');

  request.files.add(httpImage);

  request.fields.addAll({
    "name": ctx.name,
    "description": ctx.description,
    "firebase_id": ctx.firebaseId
  });
  final streamedResponse = await request.send();
  var response = await http.Response.fromStream(streamedResponse);
  var decodedResp = jsonDecode(response.body);

  if (response.statusCode == 201) {
    return "Successfully created channel";
  } else {
    throw NetworkException(
        status: decodedResp["status"], message: decodedResp["message"]);
  }
}

Future<List<SingleChannelDetails>> getChannelsForFirebaseId(
    String firebaseID) async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/channels/firebase_id?firebase_id=$firebaseID";

  final uri = Uri.parse(url);
  var response = await http.get(uri);
  if (response.statusCode == 200) {
    var json = jsonDecode(response.body);

    return (json["data"] as List)
        .map((e) => SingleChannelDetails.fromJson(e))
        .toList(growable: false);
  }
  return [];
}
