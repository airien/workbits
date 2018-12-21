import 'package:juletre_app/post.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:juletre_app/quote.dart';

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