import 'package:edu_elimu/components/bottom_tab.dart';
import 'package:edu_elimu/components/categories_component.dart';
import 'package:edu_elimu/components/local_webview.dart';
import 'package:edu_elimu/screens/account_page.dart';
import 'package:edu_elimu/screens/default_screen.dart';
import 'package:edu_elimu/screens/home_screen.dart';
import 'package:edu_elimu/screens/login_and_signup.dart';
import 'package:edu_elimu/screens/login_screen.dart';
import 'package:edu_elimu/screens/profile_page.dart';
import 'package:edu_elimu/screens/signup_screen.dart';
import 'package:edu_elimu/themes/colors.dart';
import 'package:firebase_auth/firebase_auth.dart';
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
      backgroundColor: Color.fromRGBO(248, 248, 248, 1.0),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.1,
        title: Text("EduElimu"),
        actions: [
          if (FirebaseAuth.instance.currentUser != null)
            InkWell(
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (BuildContext context) => ProfilePageScreen(
                        user: FirebaseAuth.instance.currentUser!)));
              },
              child: Padding(
                padding: const EdgeInsets.only(right: 18.0),
                child: CircleAvatar(
                  backgroundColor: EduColors.appColor,
                  radius: 20,
                  child: FirebaseAuth.instance.currentUser!.photoURL != null
                      ? ClipRRect(
                          borderRadius: BorderRadius.circular(100),
                          child: Image.network(
                              FirebaseAuth.instance.currentUser!.photoURL!),
                        )
                      : const Text(""),
                ),
              ),
            )
          else
            Row(
              children: [
                InkWell(
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (BuildContext context) =>
                            const LoginScreen()));
                  },
                  child: Center(
                      child: Container(
                    color: EduColors.blackColor,
                    padding:
                        const EdgeInsets.symmetric(horizontal: 18, vertical: 9),
                    margin: const EdgeInsets.only(right: 10),
                    child: const Text(
                      "Login",
                      style: TextStyle(color: Colors.white),
                    ),
                  )),
                ),
                InkWell(
                  onTap: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (BuildContext context) =>
                            const SignupScreen()));
                  },
                  child: Center(
                      child: Container(
                    color: EduColors.appColor,
                    padding:
                        const EdgeInsets.symmetric(horizontal: 18, vertical: 9),
                    margin: const EdgeInsets.only(right: 10),
                    child: const Text(
                      "Sign Up",
                      style: TextStyle(color: EduColors.blackColor),
                    ),
                  )),
                ),
              ],
            )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20),
        child: TabBarView(controller: controller, children: [
          HomeScreen(),
          EduCategoriesComponent(),
          LocalWebview(url: "http://192.168.100.8:3000/interactive_games/dashboard"),
          LoginAndSignupBanner()
        ]),
      ),
      bottomNavigationBar: SizedBox(
        height: 60,
        child: TabBar(
            //isScrollable: true,
            indicatorColor: EduColors.appColor,
            controller: controller,
            indicatorWeight: 4,
            tabs: const [
              Tab(
                text: "Home",
                icon: Icon(Icons.home),
              ),
              Tab(text: "Categories", icon: Icon(Icons.category)),

              Tab(text: "Games",icon:Icon(Icons.casino)),
              Tab(text: "Settings", icon: Icon(Icons.settings))
            ]),
      ),
    );
  }
}
