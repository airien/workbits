import 'package:flutter/material.dart';
import 'package:juletre_app/api.dart';
import 'package:juletre_app/juletreside.dart';
import 'package:juletre_app/state.dart';

class JuletreSideState extends State<JuletreSide> {
  String lysAv = "Slå på blått lys";
  String lysPa = "Slå av blått lys";


  String lys2Av = "Slå på grønt lys";
  String lys2Pa = "Slå av grønt lys";

  String res = "";
  bool lys = false;
  bool lys2 = false;

  Future<LightState> post;

  JuletreSideState() {
    post = hentState();
    post.then((state) {
      setState(() {
        lys = state.blue == "On";
        lys2 = state.green == "On";
      });
    });
  }


  void toggleLys1() {
    post = blue();
    post.then((state) {
      setState(() {
        lys = state.blue == "On";
        lys2 = state.green == "On";
      });
    });

  }
  void toggleLys2(){
    post = green();
    post.then((state) {
      setState(() {
        lys = state.blue == "On";
        lys2 = state.green == "On";
      });
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
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Image.asset('images/juletre.png'),
            FutureBuilder<LightState>(
                future: post,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return Container(
                      padding: EdgeInsets.fromLTRB(10, 50, 10, 50),
                        child:Column(
                          children: <Widget>[
                            Text("Grønn er: "+snapshot.data.green),
                            Text("Blå er: "+snapshot.data.blue)
                          ],

                        )
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
              new Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  RaisedButton(
                    textColor: Color.fromRGBO(0, 0, 255, 0.7),
                    color: Color.fromRGBO(250,250, 250, 20),
                    onPressed: toggleLys1,
                    child: Row(
                      children: <Widget>[
                        Icon(Icons.lightbulb_outline),
                        Text(
                          lys?lysPa:lysAv,
                          textScaleFactor: 1.0,
                        ),

                      ],
                    ),
                  ),

                  RaisedButton(
                    onPressed: toggleLys2,
                    textColor: Color.fromRGBO(0, 255, 0, 0.7),
                    color: Color.fromRGBO(250,250, 250, 20),
                    child: Row(

                      children: <Widget>[
                        Icon(Icons.lightbulb_outline),
                        Text(
                          lys2?lys2Pa:lys2Av,
                          textScaleFactor: 1.0,
                        ),

                      ],
                    ),
                  ),
                ]),
              ])
        ),
      );

  }
}
