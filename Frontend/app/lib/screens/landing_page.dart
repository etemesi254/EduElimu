import 'package:edu_elimu/components/bottom_tab.dart';
import 'package:edu_elimu/screens/default_screen.dart';
import 'package:edu_elimu/screens/home_screen.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({super.key});

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage>
    with TickerProviderStateMixin {
  late TabController controller;
  int index = 0;

  @override
  void initState() {
    super.initState();
    controller = TabController(length: 3, vsync: this);

    controller.addListener(() {
      setState(() {
        index = controller.index;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical:8.0,horizontal: 20),
        child: TabBarView(controller: controller, children: [
          HomeScreen(),
          PlaceholderComponent(),
          PlaceholderComponent(),
        ]),
      ),
      bottomNavigationBar: SizedBox(
        height: 60,
        child: TabBar(
            //isScrollable: true,
            indicatorColor: Colors.transparent,
            controller: controller,
            tabs: [
              BottomTabComponent(
                icon: Icons.home,
                text: "Home",
                textColor: index == 0 ? EduColors.appColor : Colors.grey,
                iconColor: index == 0 ? EduColors.appColor : Colors.grey,
                expand: index == 0,
                color: index == 0 ? Colors.black.withOpacity(0.05) : null,
              ),
              BottomTabComponent(
                icon: Icons.face,
                text: "Live",
                textColor: index == 1 ? EduColors.appColor : Colors.grey,
                iconColor: index == 1 ? EduColors.appColor : Colors.grey,
                expand: index == 1,
                color: index == 1 ? Colors.black.withOpacity(0.05) : null,
              ),
              BottomTabComponent(
                icon: Icons.home,
                text: "Settings",
                textColor: index == 2 ? EduColors.appColor : Colors.grey,
                iconColor: index == 2 ? EduColors.appColor : Colors.grey,
                expand: index == 2,
                color: index == 2 ? Colors.black.withOpacity(0.05) : null,
              ),
            ]),
      ),
    );
  }
}
