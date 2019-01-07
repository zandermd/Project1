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
function searchBandsInTown(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (responseEvents) {
            // Printing the entire object to console
            console.log(response);
            console.log(responseEvents);

            // Constructing HTML containing the artist information
            var artistName = $("<band>").text(response.name);
            var artistURL = $("<band>").attr("href", response.url).append(artistName);
            var artistImage = $("<img>").attr("src", response.thumb_url);
            var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");


            // Empty the contents of the band-div, append the new artist content
            $("#band").empty();
            $("#band").append(artistURL, artistImage, upcomingEvents, artistName);

        });

    });
}

// Event handler for user clicking the stalk button
$("#stalk").on("click", function (event) {
    console.log("button clicked");
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim().replace(" ", "%20");
    console.log(inputArtist);
    $("#jumbotron").hide();
    $("#info").show();
    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
});

//Youtube video finder AJAX - API

var videoArtist;

$("#search-btn").on("click", function () {
    videoArtist = $("#query").val();
});


var gapikey = 'AIzaSyAT2Wav_q-sVdSMNwogqaJtlJy0NQiYpsU';

$(function () {

    $('#search-form').submit(function (e) {
        e.preventDefault();
    });

});

function search(artist) {

    // clear 
    $('#results').html('');
    $('#buttons').html('');

    // get form input
    q = $('#query').val();

    $.ajax({
        method: 'GET',
        url: `https://www.googleapis.com/youtube/v3/search?&part=snippet,id&q=${artist}&type=video&key=${gapikey}`,
        headers: 'Access-Control-Allow-Origin'
    }).done((data) => {
        console.log(data);
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // Log data
        console.log(data);

        $.each(data.items, function (i, item) {

            // Get Output
            var output = getOutput(item);

            // display results
            $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        // Display buttons
        $('#buttons').append(buttons);
    });
};


// clear 
$('#results').html('');
$('#buttons').html('');

// get form input
q = $('#query').val();

// run get request on API
// $.get(
//     `https://www.googleapis.com/youtube/v3/search?&part=snippet,id&q=${videoArtist}&type=video&key=${gapikey}`, {
//         part: 'snippet, id',
//         q: q,
//         pageToken: token,
//         type: 'video',
//         key: gapikey
//     }, function(data) {

//         var nextPageToken = data.nextPageToken;
//         var prevPageToken = data.prevPageToken;

//         // Log data
//         console.log(data);

//         $.each(data.items, function(i, item) {

//             // Get Output
//             var output = getOutput(item);

//             // display results
//             $('#results').append(output);
//         });

//         var buttons = getButtons(prevPageToken, nextPageToken);

//         // Display buttons
//         $('#buttons').append(buttons);
//     });    


// clear 
$('#results').html('');
$('#buttons').html('');

// get form input
q = $('#query').val();

// run get request on API
// $.get(
//     `https://www.googleapis.com/youtube/v3/search?&part=snippet,id&q=${videoArtist}&type=video&key=${gapikey}`, {
//         part: 'snippet, id',
//         q: q,
//         pageToken: token,
//         type: 'video',
//         key: gapikey
//     }, function(data) {

//         var nextPageToken = data.nextPageToken;
//         var prevPageToken = data.prevPageToken;

//         // Log data
//         console.log(data);

//         $.each(data.items, function(i, item) {

//             // Get Output
//             var output = getOutput(item);

//             // display results
//             $('#results').append(output);
//         });

//         var buttons = getButtons(prevPageToken, nextPageToken);

//         // Display buttons
//         $('#buttons').append(buttons);
//     });    


// Build output
function getOutput(item) {

    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build output string
    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '">' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a data-fancybox-type="iframe" class="fancyboxIframe" href="https://youtube.com/embed/' + videoID + '?rel=0" target="new">' + title + '</a></h3>' +
        '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' +
        '';
    return output;
};

function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnoutput = '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick = "nextPage();">Next Page</button>' +
            '</div>';
    } else {
        var btnoutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
            'onclick = "prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick = "nextPage();">Next Page</button>' +
            '</div>';
    }

    return btnoutput;
};