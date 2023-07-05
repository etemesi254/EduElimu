import 'dart:typed_data';

class ChannelUploadCtx {
  final Uint8List data;
  final String name;
  final String description;

  ChannelUploadCtx(
      {required this.description, required this.data, required this.name});

}
