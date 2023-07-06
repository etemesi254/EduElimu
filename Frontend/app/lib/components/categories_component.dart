import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/api/categories.dart';
import 'package:edu_elimu/components/connection_error.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:hive/hive.dart';

import '../models/categories_model.dart';

class EduCategoriesComponent extends StatefulWidget {
  const EduCategoriesComponent({Key? key}) : super(key: key);

  @override
  State<EduCategoriesComponent> createState() => _EduCategoriesComponentState();
}

class _EduCategoriesComponentState extends State<EduCategoriesComponent> {
  List<VideoCategory>? category;
  bool shouldRefresh = true;
  Uri? endpoint;

  Future<List<VideoCategory>> getVideCategories() async {
    if (shouldRefresh) {
      category = await getAllCategories();
      shouldRefresh = false;
    }
    var box = Hive.box("settings");
    // default is normal localhost
    String url =
        await box.get("base_url", defaultValue: "10.0.2.2:8000") + "/storage/";
    endpoint = Uri.parse(url);

    return category!;
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {
        shouldRefresh = true;
        setState(() {});
      },
      child: FutureBuilder<List<VideoCategory>>(
          future: getVideCategories(),
          builder: (context, snapshot) {
            if (snapshot.connectionState != ConnectionState.done &&
                shouldRefresh) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snapshot.hasData) {
              return CustomScrollView(
                slivers: [
                  SliverGrid(
                      gridDelegate:
                          const SliverGridDelegateWithMaxCrossAxisExtent(
                        maxCrossAxisExtent: 250.0,
                        mainAxisSpacing: 10.0,
                        crossAxisSpacing: 10.0,
                        childAspectRatio: 1.0,
                      ),
                      delegate: SliverChildBuilderDelegate(
                          childCount: snapshot.data!.length,
                          (BuildContext context, int index) {
                        var stand = snapshot.data![index];
                        var url =
                            "${endpoint!}${snapshot.data![index].imageUrl}";
                        print(url);
                        CachedNetworkImage img = CachedNetworkImage(
                          imageUrl: url,
                          // width: 200,
                        );
                        return Container(
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.black)
                          ),
                          child: Stack(
                            children: [
                              img,
                              Positioned(
                                  bottom: 20,
                                  child: Container(
                                      color: Colors.white,
                                      width: 250,
                                      height: 50,
                                      child: Text(stand.name)))
                            ],
                          ),
                        );
                      }))
                ],
              );
            } else if (snapshot.hasError) {
              return Text(snapshot.error!.toString());
            } else {
              return ListView(
                children: const [
                  ConnectionErrorComponent(),
                ],
              );
            }
          }),
    );
  }

  Widget createSingleCategoryComponent(VideoCategory category) {
    return Container(
      height: 200,
      width: 100,
      child: Stack(
        children: [Text("data")],
      ),
    );
  }
}
