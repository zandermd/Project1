// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgvMG6X-qUQOMJUNoOq6jOIxeIiS5dOVs",
    authDomain: "project1-fae24.firebaseapp.com",
    databaseURL: "https://project1-fae24.firebaseio.com",
    projectId: "project1-fae24",
    storageBucket: "project1-fae24.appspot.com",
    messagingSenderId: "57183397397"
};
firebase.initializeApp(config);
var database = firebase.database();

// BandsInTown AJAX - API
{
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          // Printing the entire object to console
          console.log(response);
          // Constructing HTML containing the artist information
          var artistName = $("<h1>").text(response.name);
          var artistURL = $("<a>").attr("href", response.url).append(artistName);
          var artistImage = $("<img>").attr("src", response.thumb_url);
          var upcomingEvents = $("<h2>").text(response.upcoming_event_count + "upcoming events");
          var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
          // Empty the contents of the artist-div, append the new artist content
          $("#artist-div").empty();
          $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
        });
      }
      // Event handler for user clicking the select-artist button
      $("#select-artist").on("click", function(event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        // Storing the artist name
        var inputArtist = $("#artist-input").val().trim();
        // Running the searchBandsInTown function(passing in the artist as an argument)
        searchBandsInTown(inputArtist);
      });
      