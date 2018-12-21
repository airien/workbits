import 'package:flutter/material.dart';
import 'package:juletre_app/api.dart';
import 'package:juletre_app/juletreside.dart';
import 'package:juletre_app/quote.dart';

class JuletreSideState extends State<JuletreSide> {
  String lysAv = "Slå på lys";
  String lysPa = "Slå av lys";

  String motorAv = "Slå på motor";
  String motorPa = "Slå av motor";
  String res = "";
  bool lys = false;
  bool motor = false;

  Future<Quote2> post;

  JuletreSideState() {

  }


  void toggleLys() {
    setState(() {
      lys = !lys;
    });
    this.post = hentQuote();

  }
  void toggleMotor() {
    setState(() {
      motor = !motor;
    });
    this.post = hentQuote();
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
              child: FutureBuilder<Quote2>(
                future: post,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return Column(
                      children: <Widget>[
                        Text(snapshot.data.quote),
                        Text(snapshot.data.author),
                        Text(snapshot.data.cat),

                      ],

                    );

                  } else if (snapshot.hasError) {
                    return Text("${snapshot.error}");
                  }
                  if(post != null)
                  // By default, show a loading spinner
                    return CircularProgressIndicator();
                  else
                    return Text("trykk på en knapp");
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
                        textScaleFactor: 1.2,
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
                        textScaleFactor: 1.2,
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
