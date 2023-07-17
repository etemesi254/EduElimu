class CourseModel {
  int id;
  String name;
  String description;
  int channelId;
  String courseBanner;

  CourseModel({
    required this.description,
    required this.name,
    required this.id,
    required this.channelId,
    required this.courseBanner,
  });

  factory CourseModel.fromJson(Map<String, dynamic> json) {
    return CourseModel(
        description: json["description"],
        name: json["name"],
        id: json["id"],
        channelId: json["channel_id"],
        courseBanner: json["course_banner"]);
  }
}
