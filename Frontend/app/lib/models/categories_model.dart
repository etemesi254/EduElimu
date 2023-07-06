class VideoCategory {
  final String imageUrl;
  final String name;
  final String description;
  final int status;
  final int id;

  VideoCategory(
      {required this.status,
      required this.id,
      required this.description,
      required this.imageUrl,
      required this.name});

  factory VideoCategory.fromJson(Map<String, dynamic> json) {
    return VideoCategory(
        status: json["status"],
        id: json["id"],
        description: json["description"],
        imageUrl: json["banner"],
        name: json["name"]);
  }
}
