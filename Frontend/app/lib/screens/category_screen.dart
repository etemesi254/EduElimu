import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/api/categories.dart';
import 'package:edu_elimu/models/categories_model.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../components/error_component.dart';
import '../components/loading_component.dart';
import '../components/video_component.dart';
import '../models/video_models.dart';

class VideoCategoryScreen extends StatefulWidget {
  final VideoCategory category;

  const VideoCategoryScreen({Key? key, required this.category})
      : super(key: key);

  @override
  State<VideoCategoryScreen> createState() => _VideoCategoryScreenState();
}

class _VideoCategoryScreenState extends State<VideoCategoryScreen> {
  List<HomeVideoModel> videos = [];
  bool shouldReload = true;

  Future<List<HomeVideoModel>> getVideos() async {
    if (shouldReload) {
      videos = await getVideosInCategory(widget.category);
      shouldReload = false;
    }
    return videos;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.category.name),
        backgroundColor: Colors.white,
        elevation: 0.1,
      ),
      body: SafeArea(
          child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(widget.category.description,
              style: GoogleFonts.poppins(
                  fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 20),
          const Divider(),
          FutureBuilder(
              builder: (context, snapshot) {
                if (snapshot.connectionState != ConnectionState.done &&
                    shouldReload) {
                  return LoadingComponent();
                }
                if (snapshot.hasData) {
                  return Expanded(
                    child: ListView.builder(
                      //cacheExtent: ,

                      itemCount: snapshot.data!.length,
                      itemBuilder: (BuildContext context, int index) {
                        return VideoComponent(
                          model: snapshot.data![index],
                          endpoint: "",
                        );
                      },
                    ),
                  );
                } else if (snapshot.hasError) {
                  return ErrorComponent(message: snapshot.error!.toString());
                } else {
                  return LoadingComponent();
                }
              },
              future: getVideos())
        ],
      )),
    );
  }
}
