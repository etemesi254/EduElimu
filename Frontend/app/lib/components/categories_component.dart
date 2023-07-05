import 'package:flutter/widgets.dart';

class EduCategoriesComponent extends StatefulWidget {
  const EduCategoriesComponent({Key? key}) : super(key: key);

  @override
  State<EduCategoriesComponent> createState() => _EduCategoriesComponentState();
}

class _EduCategoriesComponentState extends State<EduCategoriesComponent> {
  @override
  Widget build(BuildContext context) {
    return  ListView(
      children: [
        Text("Hello"),
      ],
    );
  }
}
