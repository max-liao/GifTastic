// This code will run as soon as the page loads
window.onload = function() {
    // $("#start").on("click", trivia.start);
    // $("#reset").on("click", trivia.reset);
    // $("#stop").on("click", trivia.stop);
    // $("#test").on("click", trivia.test);
    // $("#true").on("click", trivia.true);
    // $("#false").on("click", trivia.false);
  };


var clock;
var numberofgifs = 10;
var topics = ["cat", "dog", "goldfish", "parrot", "turtle"];


// Function for displaying movie data
function renderButtons() {
    // Delete the content inside the movies-view div prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#gif-view").empty("");

    // Loop through the array of movies, then generate buttons for each movie in the array
    for (i=0;i < topics.length;i++){
        // $("#gif-view").append('<button class = "topicbutton">'+ topics[i] + '</button>');
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        
        $("#movies-view").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-gif").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    var newtopic = $("#gif-input").val().trim();
    topics.push(newtopic);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newtopic + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });

    // The renderButtons function is called, rendering the list of movie buttons
    renderButtons();
});  

$(document).on("click", ".topic", showgifs);
renderButtons();

function showgifs() {
    $("#GIFS").empty("");

    // Loop through the array of movies, then generate buttons for each movie in the array
    for (i=0; i<numberofgifs; i++){
        // $("#gif-view").append('<button class = "topicbutton">'+ topics[i] + '</button>');
        var a = $("<img>");
        a.addClass("");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("GIFS").append(a);
    }
}

// // Get the size of an object
// Object.size = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
//   };
  
