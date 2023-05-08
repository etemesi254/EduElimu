import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';

class VideoComponent extends StatefulWidget {
  const VideoComponent({super.key});

  @override
  State<VideoComponent> createState() => _VideoComponentState();
}

class _VideoComponentState extends State<VideoComponent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 10, horizontal: 0),
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
                SizedBox(width: 20),
                Text("Apple",style: TextStyle(color: EduColors.greyColor),),
                Spacer(),
                InkWell(
                  onTap: () {},
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical:12,horizontal: 15),
                    decoration: BoxDecoration(
                      color: EduColors.appColor,
                      borderRadius: BorderRadius.circular(20)
                    ),
                    child: Text("Subscribe",style: TextStyle(color: Colors.white),),
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
