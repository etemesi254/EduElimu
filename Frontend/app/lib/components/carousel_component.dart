import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class CarousellComponent extends StatelessWidget {
  const CarousellComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: CarouselSlider(
        items: buildImageCarrousel(),
        options: CarouselOptions(
          padEnds: false,
          autoPlay: true,
          viewportFraction: 1,
          aspectRatio: 1.5,
          enlargeCenterPage: true,
        ),
      ),
    );
  }

  List<Widget> buildImageCarrousel() {
    final List<String> imgList = [
      "https://unsplash.com/photos/lUaaKCUANVI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fHx8MTY4MzQ3NjQ3Nw&force=true&w=640",
      "https://unsplash.com/photos/WE_Kv_ZB1l0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fGVkdWNhdGlvbnxlbnwwfHx8fDE2ODM0NzY0Nzc&force=true&w=640",
    ];

    final captions = {
      "https://unsplash.com/photos/lUaaKCUANVI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fHx8MTY4MzQ3NjQ3Nw&force=true&w=640":
          "Japanese II",
      "https://unsplash.com/photos/WE_Kv_ZB1l0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTB8fGVkdWNhdGlvbnxlbnwwfHx8fDE2ODM0NzY0Nzc&force=true&w=640":
          "For Everyone",

//  "We got you"
    };

    return imgList
        .map((item) => SizedBox(
              child: Container(
                margin: const EdgeInsets.all(0),
                child: ClipRRect(
                    borderRadius: const BorderRadius.all(Radius.circular(5.0)),
                    child: Stack(
                      children: <Widget>[
                        CachedNetworkImage(imageUrl: item),
                        Positioned(
                          bottom: 70.0,
                          left: 20.0,
                          right: 0.0,
                          child: Container(
                            decoration: const BoxDecoration(
                              // gradient: LinearGradient(
                              //   colors: [
                              //     Color.fromARGB(200, 0, 0, 0),
                              //     Color.fromARGB(0, 0, 0, 0)
                              //   ],
                              //   begin: Alignment.bottomCenter,
                              //   end: Alignment.topCenter,
                              // ),
                            ),
                            padding: const EdgeInsets.symmetric(
                                vertical: 1.0, horizontal: 2.0),
                            child: Text(
                              '${captions[item]}',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 20.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        Positioned(
                          bottom: 50.0,
                          left: 20.0,
                          right: 0.0,
                          child: Container(
                            // decoration: const BoxDecoration(
                            //   gradient: LinearGradient(
                            //     colors: [
                            //       Color.fromARGB(200, 0, 0, 0),
                            //       Color.fromARGB(0, 0, 0, 0)
                            //     ],
                            //     begin: Alignment.bottomCenter,
                            //     end: Alignment.topCenter,
                            //   ),
                            // ),
                            padding: const EdgeInsets.symmetric(
                                vertical: 1.0, horizontal: 2.0),
                            child: const Text(
                              "Learn how to speak Japanese today",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 14.0,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                          ),
                        ),
                        Positioned(
                          bottom: -4.0,
                          left: 10.0,
                          width: 90,
                          height: 55,
                          child: Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 10.0, horizontal: 12.0),
                              child: InkWell(
                                child: Container(
                                  decoration:  BoxDecoration(
                                    color: EduColors.appColor,
                                    borderRadius: BorderRadius.circular(10)
                                    
                                  ),
                                  child: const Center(
                                      child: Text(
                                    "Watch",
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 17,
                                        fontWeight: FontWeight.bold),
                                  )),
                                ),
                              )),
                        ),
                        Positioned(
                          bottom: -4.0,
                          left: 90.0,
                          width: 55,
                          height: 55,
                          child: Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 10.0, horizontal: 12.0),
                              child: InkWell(
                                child: Container(
                                  decoration:  BoxDecoration(
                                    color: Colors.black.withOpacity(0.5),
                                    borderRadius: BorderRadius.circular(5)
                                    
                                  ),
                                  child: const Center(
                                      child: Text(
                                    "+",
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 30,
                                        fontWeight: FontWeight.normal),
                                  )),
                                ),
                              )),
                        )
                      ],
                    )),
              ),
            ))
        .toList();
  }
}
