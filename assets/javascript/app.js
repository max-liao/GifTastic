// This code will run as soon as the page loads
window.onload = function() {
    console.log("Starting");
};

var numberofgifs = 10;
var topics = ["cat", "dog", "goldfish", "parrot", "turtle"];
var currenttopic = "";

// Function for displaying Buttons
function renderButtons() {

    $("#gif-view").empty("");

    // Loop through the array of topics, then generate buttons for each topic in the array
    for (i=0; i < topics.length;i++){
        // $("#gif-view").append('<button class = "topicbutton">'+ topics[i] + '</button>');
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#gif-view").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();
    var newtopic = $("#gif-input").val().trim();
    topics.push(newtopic);

    // The renderButtons function is called, rendering the list of gif buttons
    renderButtons();
});  

// function showgifs(pointer,empty) {
function showgifs() {
    // if (empty){
        $("#GIFS").empty("");
    // }
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    // Loop through the array of topics, then generate buttons for each topic in the array
    for (i= 0; i<numberofgifs; i++){
        // $("#gif-view").append('<button class = "topicbutton">'+ topics[i] + '</button>');
        var stillimageUrl = response.data[i].images.original_still.url;
        var animateimageUrl = response.data[i].images.original.url;
        
        //create image tag to insert url
        var b = $("<img>");
        var p = "<p> Rating: " + response.data[i].rating + "</p>";
        b.addClass("gif");
        b.attr("data-name", $(this).attr("data-name"));
        b.attr("src", stillimageUrl);
        b.attr("stillurl", stillimageUrl);
        b.attr("animateurl", animateimageUrl);
        b.attr("alt", "gifurl");
        b.attr("gifstate", "still");
        $("#GIFS").prepend(b);
        $("#GIFS").prepend(p);
     }
    });
}

function stillanimate(){
    var state = $(this).attr("gifstate");
    if (state == "still"){
        var animateurl = $(this).attr("animateurl");
        $(this).attr("src", animateurl);
        $(this).attr("gifstate","animate");
    } else if (state == "animate"){
        var stillurl = $(this).attr("stillurl");
        $(this).attr("src", stillurl);
        $(this).attr("gifstate","still");
    }
}
// $(function(){
//     $('img').each(function(e){
//       var src = $(e).attr('src');
//       $(e).hover(function(){
//         $(this).attr('src', src.replace('.gif', '_anim.gif'));
//       }, function(){
//         $(this).attr('src', src);
//       });
//     });
//   });

// $(document).on("click", ".topic", function(){
//     var point = this;
//     console.log(this);
//     console.log(point);
//     showgifs(point,true);
// });
$(document).on("click", ".topic", showgifs);
$(document).on("click", ".gif", stillanimate);

renderButtons();

// // Get the size of an object
// Object.size = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
//   };
  
