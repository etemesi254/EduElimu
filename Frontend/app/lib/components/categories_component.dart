import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/api/categories.dart';
import 'package:edu_elimu/components/connection_error.dart';
import 'package:edu_elimu/components/loading_component.dart';
import 'package:edu_elimu/screens/category_screen.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
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
              return LoadingComponent();
            }
            if (snapshot.hasData) {
              return ListView(
                children: [
                  for (var category in snapshot.data!)
                    createSingleCategoryComponent(category)
                ],
              );
            } else if (snapshot.hasError) {
              return Text(snapshot.error!.toString());
            } else {
              return ListView(
                children: [
                  ConnectionErrorComponent(),
                ],
              );
            }
          }),
    );
  }

  Widget createSingleCategoryComponent(VideoCategory category) {
    var url = "${category.imageUrl}";
    CachedNetworkImage img = CachedNetworkImage(
      imageUrl: url,
      // width: 200,
     // height: 300,
      fit: BoxFit.fitWidth,

    );
    return InkWell(
      onTap: () {
        // show button to show video categories
        Navigator.of(context).push(MaterialPageRoute(builder: (builder)=>VideoCategoryScreen(category: category)));
      },
      onLongPress: () {
        showDialog(
            context: context,
            builder: (builder) {
              return AlertDialog(
                //title: Text(category.name),
                content: FractionallySizedBox(
                  heightFactor: 0.6,
                  child: Column(
                    children: [
                      Text(
                        category.name,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Expanded(child: img),
                      Container(
                          color: Colors.white,
                          width: double.infinity,
                          padding: const EdgeInsets.only(top: 10),
                          height: 50,
                          child: Text(
                            category.description,
                            textAlign: TextAlign.center,
                            style: GoogleFonts.poppins(
                                fontWeight: FontWeight.normal, fontSize: 16),
                          )),
                      OutlinedButton(
                          style: OutlinedButton.styleFrom(
                            backgroundColor: EduColors.appColor,
                          ),
                          onPressed: () {},
                          child: const SizedBox(
                              width: double.infinity,
                              child: Text(
                                "Go",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 20,
                                    fontWeight: FontWeight.w500),
                              )))
                    ],
                  ),
                ),
              );
            });
      },
      child: Container(
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(10)),
        padding:
            const EdgeInsets.only(bottom: 10, top: 10, left: 10, right: 10),
        margin: const EdgeInsets.only(bottom: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(child: img),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                        padding: const EdgeInsets.only(top: 10),
                        child: Text(
                          category.name,
                          textAlign: TextAlign.start,
                          style: GoogleFonts.poppins(
                              fontWeight: FontWeight.w500, fontSize: 20),
                        )),
                    // Container(
                    //     padding: const EdgeInsets.only(top: 10),
                    //     child: Text(
                    //       category.description,
                    //       textAlign: TextAlign.start,
                    //       style: GoogleFonts.poppins(
                    //           fontWeight: FontWeight.normal, fontSize: 14),
                    //     )),
                  ],
                ),
                const Spacer(),
                const SizedBox(height: 10),
                const Padding(
                  padding:  EdgeInsets.all(8.0),
                  child: CircleAvatar(
                      backgroundColor: EduColors.blackColor,
                      child: Icon(
                        Icons.north_east,
                        color: Colors.white,
                      )),
                ),
              ],
            ),
            Text(
              category.description,
              maxLines: 10,
              textAlign: TextAlign.start,
              style: GoogleFonts.poppins(
                  fontWeight: FontWeight.normal, fontSize: 14),
            )
          ],
        ),
      ),
    );
  }
}
