import 'package:cached_network_image/cached_network_image.dart';
import 'package:edu_elimu/api/channels.dart';
import 'package:edu_elimu/components/empty_component.dart';
import 'package:edu_elimu/components/error_component.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hive/hive.dart';

import '../models/channels_models.dart';
import '../themes/colors.dart';
import 'create_channel_screen.dart';

class MyChannelsScreen extends StatefulWidget {
  final User user;

  const MyChannelsScreen({Key? key, required this.user}) : super(key: key);

  @override
  State<MyChannelsScreen> createState() => _MyChannelsScreenState();
}

class _MyChannelsScreenState extends State<MyChannelsScreen> {
  List<SingleChannelDetails> channels = [];
  bool shouldRefresh = true;
  Uri? endpoint;

  Future<List<SingleChannelDetails>> getChannels() async {
    if (shouldRefresh) {
      channels = await getChannelsForFirebaseId(widget.user.uid);
      shouldRefresh = false;
    }
    var box = Hive.box("settings");

    String url =
        await box.get("base_url", defaultValue: "10.0.2.2:8000") + "/storage/";
    endpoint = Uri.parse(url);

    return channels;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("My channel"),
        backgroundColor: Colors.white,
        elevation: 0.1,
      ),
      bottomSheet: Padding(
        padding: const EdgeInsets.all(8.0),
        child: OutlinedButton(
            style: OutlinedButton.styleFrom(
              backgroundColor: EduColors.appColor,
            ),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(
                  builder: (builder) =>
                      CreateChannelScreen(user: widget.user)));
            },
            child: const SizedBox(
                width: double.infinity,
                height: 50,
                child: Center(
                  child: Text(
                    "Create a new Channel",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w500),
                  ),
                ))),
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            shouldRefresh = true;
            setState(() {});
          },
          child: FutureBuilder<List<SingleChannelDetails>>(
              future: getChannels(),
              builder: (context, snapshot) {
                if (snapshot.connectionState != ConnectionState.done &&
                    shouldRefresh) {
                  return const Center(child: CircularProgressIndicator());
                }
                if (snapshot.hasData) {
                  var listData = snapshot.data!;
                  if (listData.isEmpty) {
                    return NoItemPlaceHolder(
                        message:
                            "No channel yet? Create a new channel to get started");
                  }
                  return ListView(
                    children: [
                      for (var chan in channels) createSingleChannelLayout(chan)
                    ],
                  );
                } else if (snapshot.hasError) {
                  return ErrorComponent();
                } else {
                  return const Center(child: CircularProgressIndicator());
                }
              }),
        ),
      ),
    );
  }

  Widget createSingleChannelLayout(SingleChannelDetails details) {
    var url = "${endpoint!}${details.banner}";
    CachedNetworkImage img = CachedNetworkImage(
      imageUrl: url,
      // width: 200,
      height: 200,
      fit: BoxFit.fitWidth,
    );
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            child: img,
            width: double.infinity,
          ),
          const SizedBox(height: 20),
          Text(
            details.name,
            style: const TextStyle(fontWeight: FontWeight.bold,fontSize: 20),
          ),
        ],
      ),
    );
  }
}