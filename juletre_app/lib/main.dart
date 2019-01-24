import 'package:flutter/material.dart';
import 'package:juletre_app/api.dart';
import 'package:juletre_app/post.dart';
import 'juletreside.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  String title = "Let there be light !";

  MyApp({Key key}) : super(key: key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: title,
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: JuletreSide(title: title),
    );
  }
}



