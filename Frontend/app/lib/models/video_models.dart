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
