const searchBtn = document.getElementById("search-button");
const searchBook = document.getElementById("search-book");
const resultContainer = document.getElementById("search-container");
const results = document.getElementById("search-list");
const bestSellers = document.getElementById("best-seller-container");

var NytAPIKey = "n0MXIKtdoTP0TGIXEBn3dResJCtNHSai";

$("#search-button").click(function (event) {
  event.preventDefault();

  var searchTitle = $(".search-book").val();

  var responseURL =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    searchTitle +
    "&key=AIzaSyCT1bI8iN0RIzSLYEPmZUDiadmozUA0ZGI";

  console.log(responseURL);
  $.ajax({
    url: responseURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#search-result").html("");
    for (var i = 0; i < response.items.length; i++) {
      var title = response.items[i].volumeInfo.title;
      console.log(title);
      var author = response.items[i].volumeInfo.authors;
      console.log(author);
      var publishedDate = response.items[i].volumeInfo.publishedDate;
      var bookImg = response.items[i].volumeInfo.imageLinks.smallThumbnail;

      var displayBooks = $("<p>").html(
        "Title: " +
          title +
          "<br>" +
          "Author: " +
          author +
          "<br>" +
          "PublishedDate: " +
          publishedDate +
          "<br>"
      );

      var Img = $("<img>").attr("src", bookImg);

      $("#search-result").append(Img, displayBooks);
    }
  });
});

var queryURL =
  "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" +
  NytAPIKey;
console.log(queryURL);

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);

  // declare best sellers in a response
  var bestSellers = response.results.books;
  // var count = 0;
  console.log(bestSellers);

  for (var i = 0; i < 5; i++) {
    var title = bestSellers[i].title;
    var auth = bestSellers[i].author;
    var bImg = bestSellers[i].book_image;
    var description = bestSellers[i].description;
    var rank = bestSellers[i].rank;

    var displayList = $("<p>").html(
      "Title: " +
        title +
        "<br>" +
        "Author: " +
        auth +
        "<br>" +
        "Description: " +
        description +
        "<br>" +
        "Rating: " +
        rank +
        "<br>"
    );

    var displayImg = $("<img>").attr("src", bImg);
    // $("#best-seller-container").append(displayImg);
    $("#best-seller-container").append(displayImg, displayList);
  }

  // var displayList = $("<p>").html(
  //   "Title: " +
  //     title +
  //     "<br>" +
  //     "Author: " +
  //     auth +
  //     "<br>" +
  //     "Description: " +
  //     description +
  //     "<br>" +
  //     "Rating: " +
  //     rank +
  //     "<br>"
  // );
  console.log(displayList);

  $("#best-seller-container").append(displayList);
});
