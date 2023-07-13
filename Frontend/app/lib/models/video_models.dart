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

class VideoModel {
  final String videoName;
  final String videoBanner;
  final String videoFile;
  final String channelName;
  final String channelBanner;
  final String userName;
  final String userProfile;
  final String created;

  final int channelId;
  final int userId;
  final int videoViews;
  final int videoId;



  VideoModel({
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
  });

  factory VideoModel.fromJson(Map<String, dynamic> json) {
    print(json);
    return VideoModel(
        channelId: json["channel_id"]!,
        userId: json["user_id"]!,
        videoBanner: json["video_banner"]!,
        videoFile: json["video_file"]!,
        videoId: json["video_id"]!,
        created: json["created"]!,
        channelBanner: json["channel_banner"]!,
        channelName: json["channel_name"]!,
        userName: json["user_name"]!,
        userProfile: json["user_profile"]!,
        videoName: json["video_name"]!,
        videoViews: json["video_views"]!);
  }
}
