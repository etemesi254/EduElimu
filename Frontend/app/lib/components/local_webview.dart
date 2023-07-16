import 'dart:io';

import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class LocalWebview extends StatefulWidget {
  final String url;

  LocalWebview({required this.url});

  @override
  _LocalWebviewState createState() => _LocalWebviewState(url: url);
}

class _LocalWebviewState extends State<LocalWebview> {
  final String url;

  _LocalWebviewState({required this.url});

  @override
  Widget build(BuildContext context) {
    WebViewController controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            // Update loading bar.
          },
          onPageStarted: (String url) {
            if (url == "https://localhost:3000/") {
              Navigator.of(context).pop();
              //Navigator.of(context).popAndPushNamed("/home");
            }
          },
          onPageFinished: (String url) {},
          onWebResourceError: (WebResourceError error) {},
          onNavigationRequest: (NavigationRequest request) {
            if (request.url.startsWith('https://www.youtube.com/')) {
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(url));
    return Scaffold(
      body: SafeArea(
        child: WebViewWidget(
            controller: controller,
            ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    // Enable hybrid composition.
  }
}
