import 'dart:convert';

import 'package:edu_elimu/models/user_account.dart';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;

Future<void> registerUser(UserAccountModel model) async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/registerUser";

  String body = jsonEncode(model.toMap());
  var endpoint = Uri.parse(url);
  var response = await http.post(endpoint,
      headers: {"Content-Type": "application/json"}, body: body);
  var json = jsonDecode(response.body);
  if (response.statusCode >= 300) {
    //print(json);
    throw Exception("Error creating user " + json["message"]);
  }
}

Future<UserAccountModel?> getUserWithFirebaseId(String firebaseId) async {
  var box = await Hive.box("settings");
  // default is normal localhost
  String url = await box.get("base_url", defaultValue: "10.0.2.2:8000") +
      "/api/users/firebase_id?firebase_id=$firebaseId";

  var endpoint = Uri.parse(url);
  var response =
      await http.get(endpoint, headers: {"Content-Type": "application/json"});
  var json = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return UserAccountModel.fromJson(json);
  }
  return null;
}
