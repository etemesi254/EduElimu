import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:video_player/video_player.dart';

class VideoComponent extends StatefulWidget {
  const VideoComponent({super.key});

  @override
  State<VideoComponent> createState() => _VideoComponentState();
}

class _VideoComponentState extends State<VideoComponent> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
        child: Column(
          children: [
            ClipRRect(
                borderRadius: BorderRadius.circular(20.0),
                child: Container(
                  //height: 50,
                  //width: 50,
                  child: CachedNetworkImage(
                    imageUrl:
                        "https://unsplash.com/photos/xVpdyF9Pn0g/download?ixid=MnwxMjA3fDB8MXxhbGx8NDR8fHx8fHwyfHwxNjgzNDgyNDU4&force=true&w=640",
                    fit: BoxFit.contain,
                  ),
                )),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(children: const [
                Flexible(
                    child: Text("Apple ASMR - A calm rain at camp",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 25))),
                Icon(Icons.more_horiz)
              ]),
            ),
            Padding(
              padding:
                  const EdgeInsets.only(left: 10, top: 8, bottom: 8, right: 0),
              child: Row(
                children: [
                  Text(
                    "242k views",
                    style: TextStyle(color: Colors.black.withOpacity(0.5)),
                  ),
                  const SizedBox(width: 20),
                  Text(
                    "1 week ago",
                    style: TextStyle(color: Colors.black.withOpacity(0.5)),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 7),
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundColor: Colors.transparent,
                    child: Image.network(
                        "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png"),
                  ),
                  const SizedBox(width: 20),
                  const Text(
                    "Apple",
                    style: TextStyle(color: EduColors.blackColor),
                  ),
                  const Spacer(),
                  InkWell(
                    onTap: () {},
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          vertical: 12, horizontal: 15),
                      decoration: BoxDecoration(
                          color: EduColors.appColor,
                          borderRadius: BorderRadius.circular(20)),
                      child: const Text(
                        "Subscribe",
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class FileBasedVideoPlayer extends StatefulWidget {
  final File file;

  const FileBasedVideoPlayer({Key? key, required this.file}) : super(key: key);

  @override
  State<FileBasedVideoPlayer> createState() => _FileBasedVideoPlayerState();
}

class _FileBasedVideoPlayerState extends State<FileBasedVideoPlayer> {
  late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;
  bool showVeil = true;

  @override
  void initState() {
    super.initState();

    // Create and store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    _controller = VideoPlayerController.file(widget.file);

    _initializeVideoPlayerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    super.dispose();
    _controller.pause();
    _controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: _initializeVideoPlayerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // If the VideoPlayerController has finished initialization, use
            // the data it provides to limit the aspect ratio of the video.
            return Stack(
              children: [
                Column(children: [
                  AspectRatio(
                    aspectRatio: _controller.value.aspectRatio,
                    // Use the VideoPlayer widget to display the video.
                    child: InkWell(
                        onDoubleTap: () {
                          showVeil = true;
                          setState(() {});
                        },
                        child: VideoPlayer(_controller)),
                  ),
                  SizedBox(
                    height: 20,
                      child: VideoProgressIndicator(_controller,
                          allowScrubbing: true,
                          padding: EdgeInsets.zero,
                          colors:const  VideoProgressColors(
                            backgroundColor: Colors.white,
                            playedColor: EduColors.appColor,
                            bufferedColor: EduColors.whiteColor,
                          )))
                ]),
                if (showVeil)
                  Container(
                    color: Colors.black.withOpacity(0.2),
                    child: AspectRatio(
                      aspectRatio: _controller.value.aspectRatio,
                      child: Center(
                          child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          IconButton(
                              onPressed: () async {
                                Duration? currentPosition =
                                    await _controller.position;
                                if (currentPosition != null) {
                                  Duration diff = const Duration(seconds: 5);
                                  _controller.seekTo(currentPosition - diff);
                                }
                              },
                              icon: const Icon(
                                Icons.fast_rewind,
                                color: Colors.white,
                                size: 50,
                              )),
                          const SizedBox(width: 30),
                          IconButton(
                              onPressed: () {
                                if (_controller.value.isPlaying) {
                                  _controller.pause();
                                } else {
                                  _controller.play();
                                }
                                showVeil = false;
                                setState(() {});
                              },
                              icon: Icon(
                                _controller.value.isPlaying
                                    ? Icons.pause
                                    : Icons.play_arrow,
                                color: Colors.white,
                                size: 50,
                              )),
                          const SizedBox(width: 30),
                          IconButton(
                              onPressed: () async {
                                Duration? currentPosition =
                                    await _controller.position;
                                if (currentPosition != null) {
                                  Duration diff = const Duration(seconds: 5);
                                  _controller.seekTo(currentPosition + diff);
                                }
                              },
                              icon: const Icon(
                                Icons.fast_forward,
                                color: Colors.white,
                                size: 50,
                              ))
                        ],
                      )),
                    ),
                  )
              ],
            );
          } else {
            // If the VideoPlayerController is still initializing, show a
            // loading spinner.
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
        });
  }
}
