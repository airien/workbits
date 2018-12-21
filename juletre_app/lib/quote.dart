
class Success {
  int total;
  Success({this.total});

  factory Success.fromJson(Map<String, dynamic> json) {
    return Success(
        total: json['total']
    );
  }
}

class Contents {
  final List <Quote> quotes;
  Contents({this.quotes});
  factory Contents.fromJson(Map<String, dynamic> parsedJson){
    var list = parsedJson['quotes'] as List;
    List<Quote> quoteList = list.map((i) => Quote.fromJson(i)).toList();
    return Contents(
        quotes: quoteList
    );
  }
}

class Quote {
  final String quote;
  final String length;
  final String author;
  final List<String> tags;
  final String category;
  final String date;
  final String title;
  final String background;
  final String id;


  Quote({this.quote, this.length, this.author, this.tags,this.category,this.date,this.title, this.background, this.id});

  factory Quote.fromJson(Map<String, dynamic> json) {

    var list = json['tags'] as List;
    List<String> tagsList = list.map((i) => i.toString()).toList();

    return Quote(
      quote: json['quote'],
      length: json['length'],
      author: json['author'],
      tags: tagsList,
      category: json['category'],
      date: json['date'],
      title: json['title'],
      background: json['background'],
      id: json['id'],
    );
  }
}

class Quotes {
  Success success;
  Contents contents;
  Quotes({this.success, this.contents});

  factory Quotes.fromJson(Map<String, dynamic> json) {
    return Quotes(
        success: Success.fromJson(json['success']),
        contents: Contents.fromJson(json['contents'])
    );
  }
}

class Quote2 {

  Quote2({this.quote, this.author, this.cat});
  String quote;
  String author;
  String cat;

  factory Quote2.fromJson(Map<String, dynamic> json) {
    return Quote2(
        quote: json['quote'],
        author: json['author'],
        cat: json['cat']
    );
  }


}