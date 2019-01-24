import 'package:juletre_app/post.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:juletre_app/quote.dart';
import 'package:juletre_app/state.dart';

Future<Post> fetchPost() async {
  final response =
  await http.get('https://jsonplaceholder.typicode.com/posts/1');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return Post.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}

Future<Quotes> kjorlys() async {
  final response =
  await http.get('https://quotes.rest/qod.json?category=inspire');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return Quotes.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}

Future<Quotes> kjormotor() async {
  final response =
  await http.get('https://quotes.rest/qod.json?category=funny');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return Quotes.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}

Future<Quote2> hentQuote() async {
  final response =
  await http.get('https://talaikis.com/api/quotes/random/');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return Quote2.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}

Future<LightState> hentState() async {
  final response =
  await http.get('http://192.168.71.17:80/state');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return LightState.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}
Future<LightState> blue() async {
  final response =
  await http.get('http://192.168.71.17:80/blue');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return LightState.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}
Future<LightState> blueOn() async {
  final response =
  await http.get('http://192.168.71.17:80/blueon');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return LightState.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}
Future<LightState> blueOff() async {
  final response =
  await http.get('http://192.168.71.17:80/blueoff/');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return LightState.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}

Future<LightState> green() async {
  final response =
  await http.get('http://192.168.71.17:80/green');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return LightState.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}
Future<LightState> greenOn() async {
  final response =
  await http.get('http://192.168.71.17:80/greenon/');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return LightState.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}
Future<LightState> greenOff() async {
  final response =
  await http.get('http://192.168.71.17:80/greenoff/');

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    return LightState.fromJson(json.decode(response.body));
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load post');
  }
}