import 'dart:typed_data';

class VideoUploaderCtx {
  final String description;
  final String name;
  final Uint8List thumbnail;
  final Uint8List videoData;
  final int channelId;

  VideoUploaderCtx(
      {required this.description,
      required this.name,
      required this.thumbnail,
      required this.videoData,
      required this.channelId});
}

class HomeVideoModel {
  final String videoName;
  final String videoBanner;
  final String videoFile;
  final String channelName;
  final String channelBanner;
  final String userName;
  final String userProfile;
  final String created;
  final String videoDescription;

  final int channelId;
  final int userId;
  final int videoViews;
  final int videoId;

  HomeVideoModel({
    required this.channelId,
    required this.userId,
    required this.videoBanner,
    required this.videoFile,
    required this.videoId,
    required this.created,
    required this.channelBanner,
    required this.channelName,
    required this.userName,
    required this.userProfile,
    required this.videoName,
    required this.videoViews,
    required this.videoDescription,
  });

  factory HomeVideoModel.fromJson(Map<String, dynamic> json) {
    print(json);
    return HomeVideoModel(
        channelId: json["channel_id"] ?? 0,
        userId: json["user_id"] ?? 0,
        videoBanner: json["video_banner"] ?? "",
        videoFile: json["video_file"] ?? "",
        videoId: json["video_id"] ?? 0,
        created: json["created"] ?? "",
        channelBanner: json["channel_banner"] ?? "",
        channelName: json["channel_name"] ?? "",
        userName: json["user_name"] ?? "",
        userProfile: json["user_profile"] ?? "",
        videoName: json["video_name"] ?? "",
        videoViews: json["video_views"] ?? 0,
        videoDescription: json["video_desc"]);
  }
}

class SingleVideoModel {
  int id;
  String name;
  int channelId;
  String description;
  int viewCount;
  String fileUrl;
  String bannerUrl;
  String? category;
  int likes;
  int dislikes;
  String? courseId;
  String pivotvideoId;

  SingleVideoModel(
      {required this.id,
      required this.name,
      required this.category,
      required this.channelId,
      required this.description,
      required this.viewCount,
      required this.fileUrl,
      required this.bannerUrl,
      required this.courseId,
      required this.dislikes,
      required this.likes,
      required this.pivotvideoId});

  factory SingleVideoModel.fromJson(Map<String, dynamic> json) {
    return SingleVideoModel(
        id: json["id"],
        name: json["name"],
        category: json["category"],
        channelId: json["channel_id"],
        description: json["description"],
        viewCount: json["view_count"],
        fileUrl: json["file_url"],
        bannerUrl: json["banner_url"],
        courseId: json["course_id"],
        dislikes: json["dislikes"],
        likes: json["likes"],
        pivotvideoId: json["pivot"]["video_id"]);
  }
}
