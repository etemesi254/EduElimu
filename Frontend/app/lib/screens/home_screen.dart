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
      children: const [
       Padding(
          padding:  EdgeInsets.symmetric(vertical:8.0),
          child: Text("Featured",style: TextStyle(color: Colors.black,fontSize: 25,fontWeight: FontWeight.bold),),
        ),
        CarousellComponent(),

        Padding(
          padding:  EdgeInsets.symmetric(vertical:8.0),
          child: Text("Videos",style: TextStyle(color: Colors.black,fontSize: 25,fontWeight: FontWeight.bold),),
        ),
        VideoComponent(),
        VideoComponent(),
        VideoComponent(),
      ],
    );
  }
}
