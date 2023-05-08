import 'package:edu_elimu/components/carousel_component.dart';
import 'package:edu_elimu/components/video_component.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        Row(
          children: [
            CircleAvatar(
              backgroundColor: Colors.black.withOpacity(0.1),
              child: IconButton(
                  onPressed: () {},
                  icon: const Icon(
                    Icons.search,
                    color: Colors.black,
                  )),
            ),
            const Spacer(),

             CircleAvatar(
              backgroundColor: Colors.black.withOpacity(0.07),
              child: IconButton(
                  onPressed: () {},
                  icon: const Icon(
                    Icons.notifications,
                    color: EduColors.appColor,
                  )),
            ),
             SizedBox(width: 20,),

            CircleAvatar(
              backgroundColor: Colors.transparent,
              child: Image.network(
                  "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png"),
            )
          ],
        ),
       const Padding(
          padding:  EdgeInsets.symmetric(vertical:8.0),
          child: Text("Featured",style: TextStyle(color: Colors.black,fontSize: 25,fontWeight: FontWeight.bold),),
        ),
        CarousellComponent(),

        const Padding(
          padding:  EdgeInsets.symmetric(vertical:8.0),
          child: Text("Videos",style: TextStyle(color: Colors.black,fontSize: 25,fontWeight: FontWeight.bold),),
        ),
        const VideoComponent(),
        const VideoComponent(),
        const VideoComponent(),
      ],
    );
  }
}
