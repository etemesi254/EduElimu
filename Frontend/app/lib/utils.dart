import 'package:edu_elimu/themes/colors.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

void showOverlayError(String error) {
  showSimpleNotification(
      Text(
        error,
        style: const TextStyle(color: Colors.white),
      ),
      background: Colors.red);
}

void showOverlayMessage(String error,
    {Duration? duration, Color? backgroundColor}) {
  showSimpleNotification(
      Text(
        error,
        style: const TextStyle(color: Colors.white),
      ),
      background: backgroundColor ?? Colors.green,
      duration: duration);
}
