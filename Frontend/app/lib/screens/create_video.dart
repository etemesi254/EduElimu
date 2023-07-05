import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class CreateVideoScreen extends StatefulWidget {
  User user;

  CreateVideoScreen({Key? key,required this.user}) : super(key: key);

  @override
  State<CreateVideoScreen> createState() => _CreateVideoScreenState();
}

class _CreateVideoScreenState extends State<CreateVideoScreen> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
