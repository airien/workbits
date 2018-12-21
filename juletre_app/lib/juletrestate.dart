import 'package:flutter/material.dart';
import 'package:juletre_app/juletreside.dart';
import 'package:juletre_app/post.dart';

class JuletreSideState extends State<JuletreSide> {
  String lysAv = "Slå på lys";
  String lysPa = "Slå av lys";

  String motorAv = "Slå på motor";
  String motorPa = "Slå av motor";
  bool lys = false;
  bool motor = false;

  Future<Post> post;

  JuletreSideState(Future<Post> post) {
    this.post = post;
  }


  void toggleLys() {
    setState(() {
      lys = !lys;
    });

  }
  void toggleMotor() {
    setState(() {
      motor = !motor;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: new Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Image.asset('images/juletre.png'),
            Container(
              child: FutureBuilder<Post>(
                future: post,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return Text(snapshot.data.title);
                  } else if (snapshot.hasError) {
                    return Text("${snapshot.error}");
                  }

                  // By default, show a loading spinner
                  return CircularProgressIndicator();
                },
              ),
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                FlatButton(
                  textColor: Color.fromRGBO(0, 255, 0, 0.7),
                  onPressed: toggleLys,
                  child: ButtonBar(
                    children: <Widget>[
                      Icon(Icons.lightbulb_outline),
                      Text(
                        lys?lysPa:lysAv,
                      ),

                    ],
                  ),
                ),     FlatButton(
                  onPressed: toggleMotor,
                  textColor: Color.fromRGBO(255, 0, 0, 0.7),
                  child: ButtonBar(

                    children: <Widget>[
                      Icon(Icons.motorcycle),
                      Text(
                        motor?motorPa:motorAv,
                      ),

                    ],
                  ),
                ),

              ],
            )
          ],

        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
