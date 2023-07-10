import 'dart:typed_data';

class ChannelUploadCtx {
  final Uint8List data;
  final String name;
  final String description;

  ChannelUploadCtx(
      {required this.description, required this.data, required this.name});
}

class SingleChannelDetails {
  final int id;
  final String name;
  final int userId;
  final int subscribers;
  final String description;
  final String banner;
  final String? details;
  final String? links;

  SingleChannelDetails(
      {required this.id,
      required this.name,
      required this.userId,
      required this.description,
      required this.details,
      required this.banner,
      required this.links,
      required this.subscribers});

  factory SingleChannelDetails.fromJson(Map<String, dynamic> json) {
    return SingleChannelDetails(
        id: json["id"],
        name: json["name"],
        userId: json["user_id"],
        description: json["description"],
        details: json["details"],
        banner: json["banner"],
        links: json["links"],
        subscribers: json["subscribers"]);
  }
}
