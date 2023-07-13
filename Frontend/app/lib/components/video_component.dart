import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:video_player/video_player.dart';

import '../models/video_models.dart';

class VideoComponent extends StatefulWidget {
  final VideoModel model;
  final String endpoint;

  const VideoComponent(
      {super.key, required this.model, required this.endpoint});

  @override
  State<VideoComponent> createState() => _VideoComponentState();
}

class _VideoComponentState extends State<VideoComponent> {
  @override
  Widget build(BuildContext context) {
    print("${widget.endpoint}${widget.model.channelBanner}");
    return SafeArea(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 0),
        child: Column(
          children: [
            ClipRRect(
              //borderRadius: BorderRadius.circular(20.0),
              child: Container(
                //height: 50,
                //width: 50,
                child: NetworkBasedVideoPlayer(
                    url: '${widget.endpoint}${widget.model.videoFile}'),
              ),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Row(
              children: [
                Flexible(
                  child: Text(widget.model.videoName,
                      style: GoogleFonts.poppins(
                          fontWeight: FontWeight.bold, fontSize: 22)),
                ),
                const Spacer(),

                Text(
                  "${widget.model.videoViews} views",
                  style: TextStyle(color: Colors.black.withOpacity(0.5)),
                ),
                const SizedBox(width: 20),
                Text(
                  "1 week ago",
                  style: TextStyle(color: Colors.black.withOpacity(0.5)),
                )
              ]),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(vertical: 2),
              child: Row(
                children: [
                  ClipRRect(
                    // backgroundColor: Colors.transparent,
                    borderRadius: BorderRadius.circular(20),
                    child: CachedNetworkImage(
                        width: 30,
                        height: 30,
                        imageUrl:
                            "${widget.endpoint}${widget.model.channelBanner}"),
                  ),
                  const SizedBox(width: 20),
                  Text(
                    widget.model.channelName,
                    style: GoogleFonts.poppins(color: EduColors.blackColor),
                  ),
                  const Spacer(),

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
  bool showVeil = false;

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
                          colors: const VideoProgressColors(
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
            return Padding(
              padding: EdgeInsets.symmetric(vertical: 10),
              child: const Center(
                child: CircularProgressIndicator(),
              ),
            );
          }
        });
  }
}

class NetworkBasedVideoPlayer extends StatefulWidget {
  final String url;

  const NetworkBasedVideoPlayer({Key? key, required this.url})
      : super(key: key);

  @override
  State<NetworkBasedVideoPlayer> createState() =>
      _NetworkBasedVideoPlayerState();
}

class _NetworkBasedVideoPlayerState extends State<NetworkBasedVideoPlayer> {
  late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;
  bool showVeil = true;

  @override
  void initState() {
    super.initState();

    // Create and store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    _controller = VideoPlayerController.networkUrl(Uri.parse(widget.url));

    _initializeVideoPlayerFuture = _controller.initialize();

    _controller.addListener(() {
      if (showVeil) {
        // call to update values when the veil is being shown
        setState(() {});
      }
    });
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
                        onTap: () {
                          showVeil ^= true;
                          setState(() {});
                        },
                        child: VideoPlayer(_controller)),
                  ),
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
                  ),
                if (showVeil)
                  Positioned(
                      bottom: 18,
                      right: 10,
                      child: Text(
                        formatDuration(_controller.value.position),
                        style: GoogleFonts.poppins(color: Colors.white),
                      )),
                if (showVeil)
                  Positioned(
                    bottom: 10,
                    child: Container(
                      height: 5,
                      width: MediaQuery.of(context).size.width - 20,
                      child: VideoProgressIndicator(_controller,
                          allowScrubbing: true,
                          padding: EdgeInsets.zero,
                          colors: const VideoProgressColors(
                            backgroundColor: Colors.white,
                            playedColor: EduColors.appColor,
                            bufferedColor: EduColors.whiteColor,
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

String formatDuration(Duration time) {
  return "${time.inMinutes.toString().padLeft(2, '0')}:${(time.inSeconds % 60).toString().padLeft(2, '0')}";
}
