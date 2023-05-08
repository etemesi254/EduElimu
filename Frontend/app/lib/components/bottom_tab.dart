import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class BottomTabComponent extends StatelessWidget {
  final IconData icon;
  final String text;
  Color? textColor;
  Color? color;
  Color? iconColor;
  bool expand = false;

  BottomTabComponent(
      {super.key,
      required this.icon,
      required this.text,
      this.color,
      this.textColor,
      this.iconColor,
      this.expand = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 6),
      decoration:
          BoxDecoration(color: color, borderRadius: BorderRadius.circular(20)),
      child: Row(
        children: [
          Icon(icon, color: iconColor),
          const SizedBox(width: 10),
          expand
              ? Text(
                  text,
                  style: TextStyle(color: textColor),
                )
              : const SizedBox()
        ],
      ),
    );
  }
}
