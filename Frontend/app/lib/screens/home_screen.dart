import 'package:edu_elimu/api/videos.dart';
import 'package:edu_elimu/components/carousel_component.dart';
import 'package:edu_elimu/components/error_component.dart';
import 'package:edu_elimu/components/loading_component.dart';
import 'package:edu_elimu/components/video_component.dart';
import 'package:edu_elimu/models/video_models.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:hive/hive.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<VideoModel> videos = [];
  bool shouldReload = true;
  String? endpoint;

  Future<List<VideoModel>> getVideos() async {
    if (shouldReload) {
      videos = await getHomePageVideos();
      shouldReload = false;
    }
    var box = Hive.box("settings");
    // default is normal localhost
    endpoint =
        await box.get("base_url", defaultValue: "10.0.2.2:8000") + "/storage/";

    return videos;
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async{
        shouldReload=true;
        setState(() {});
      },
      child: FutureBuilder<List<VideoModel>>(
          future: getVideos(),
          builder: (context, snapshot) {
            if (snapshot.connectionState != ConnectionState.done &&
                shouldReload) {
              return  LoadingComponent();
            }
            if (snapshot.hasData) {
              return ListView.builder(
                itemCount: snapshot.data!.length,
                itemBuilder: (BuildContext context, int index) {
                  return VideoComponent(
                    model: snapshot.data![index],
                    endpoint: endpoint!,
                  );
                },
              );
            } else if (snapshot.hasError) {
              return ErrorComponent(message: snapshot.error!.toString());
            } else {
              return LoadingComponent();
            }
          }),
    );
  }
}
