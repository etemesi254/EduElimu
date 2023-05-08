import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class PlaceholderComponent extends StatefulWidget {
  const PlaceholderComponent({super.key});

  @override
  State<PlaceholderComponent> createState() => _PlaceholderComponentState();
}

class _PlaceholderComponentState extends State<PlaceholderComponent> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}