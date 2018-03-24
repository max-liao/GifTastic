// Variables
var numberofgifs = 10;
var numberoffavs = 0;
var topics = ["cat", "dog", "fish", "parrot", "bear"];
var currenttopic = "";
var stillArray = [];
var animateArray = [];


// This code will run as soon as the page loads
window.onload = function() {
    // localStorage.clear();
    console.log("Starting");
    // var Test = JSON.parse(localStorage.getItem("stillArray"));
    // var Test2 = JSON.parse(localStorage.getItem("animateArray"));
    var stills = localStorage.getItem("stillArray");
    var animates = localStorage.getItem("animateArray");

    // console.log(stills);
    // console.log(animates);

    if(stills){
        if(animates){
            stillArray = stills.split(",");
            animateArray = animates.split(",");
            // console.log(stillArray);
            // console.log(animateArray);
            renderFavorites();
        }
    }
};



$(document).on("click", ".topic", function(){
    currenttopic = $(this).attr("data-name");
    showgifs(true, currenttopic, numberofgifs);
});

$(document).on("click", ".gif", stillanimate);

renderButtons();


$(document).on("click", ".fav", function(){
    // console.log("Add to favorites");
    var stillimageUrl = $(this).attr("stillurl");
    var animateimageUrl = $(this).attr("animateurl");
    addFavorite(stillimageUrl,animateimageUrl);
    
});

function addFavorite(stillimageUrl,animateimageUrl) {

    var exists = false;
    for (i = 0; i< stillArray.length; i++){
        console.log(stillArray[i]);
        if (stillArray[i] == stillimageUrl){
            exists = true;
        }
    }
    if (exists == true){
        console.log("Favorite already exists");
    } else {
        animateArray.push(animateimageUrl);
        stillArray.push(stillimageUrl);
    }
    
    localStorage.setItem("stillArray", stillArray);
    localStorage.setItem("animateArray", animateArray);
    renderFavorites();
}

$(document.body).on("click", ".checkbox", function() {
    var index = $(this).attr("index");
    console.log(index);

    //Cut from arrays
    stillArray.splice(index, 1);
    animateArray.splice(index, 1);

    //Update localStorage
    localStorage.setItem("stillArray", stillArray);
    localStorage.setItem("animateArray", animateArray);

    //Refresh display
    renderFavorites();

    $(index).empty();
    // console.log(pId);
    // $(pId).empty();
      
    // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
    // var toDoNumber = $(this).attr("data-to-do");
    // console.log(toDoNumber);

    // var toDoList = JSON.parse(localStorage.getItem("toDolist"));
    
    // toDoList.splice(toDoNumber, 1);

    // var TDArrayJson = JSON.stringify(toDoList);
    // localStorage.setItem("toDolist", TDArrayJson);

    // // localStorage.removeItem(toDoList[toDoNumber]);
    
    // // Select and Empty the specific <p> element that previously held the to do item number.
    // var pId = "#item-" + toDoNumber;
    // console.log(pId);
    // $(pId).empty();
    
  });


function renderFavorites() {
    $("#Favorites").empty();
    // console.log("Favorites:");
    // console.log(stillArray.length);
    favslength = stillArray.length;
    if (favslength){
        for (i=0; i < favslength; i++){
            var div = $("<div>");
            var b = $("<img>");
            b.addClass("gif");
            b.attr("src", stillArray[i]);
            b.attr("stillurl", stillArray[i]);
            b.attr("animateurl", animateArray[i]);
            b.attr("alt", "gifurl");
            b.attr("gifstate", "still");
            var clear = $("<button>");
            clear.addClass("checkbox");
            clear.attr("index",i);
            clear.append("X");
            div.prepend(clear);
            div.prepend("<br>");
            div.prepend(b);
            $("#Favorites").append(div);
        }
    }
}

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
    if (newtopic == ""){
        // var temp = typeof(newtopic);
        console.log("Empty String");
    } else {
        topics.push(newtopic);
    }
    // The renderButtons function is called, rendering the list of gif buttons
    renderButtons();
});  


$("#add-more-gif").on("click", function(event) {
    console.log("Add more Gifs clicked");
    showgifs(false, currenttopic, 10);
});

$("#OMDB").on("click", function(event) {
    // console.log("OMDB clicked");
    $("#GIFS").empty("");

    event.preventDefault();
    var newmovie = $("#OMDB-input").val().trim();
    console.log(newmovie);

    var queryURL = "https://www.omdbapi.com/?t=" + newmovie + "&y=&plot=short&apikey=trilogy";
    // console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response.Poster);
        var b = $("<img>");
        b.attr("src", response.Poster);
        // $("#GIFS").append("<img href=" + response.Poster + "</img>");
        $("#GIFS").append(b);
    });
    // showgifs(false, currenttopic);
});

$("#clearfavs").on("click", function(event) {
    localStorage.clear();
    $("#Favorites").empty();
});

function showgifs(empty, topic, total) {
    if (empty){
        $("#GIFS").empty("");
    }
    // var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC" +"&limit=" + total;
    // console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
    // Loop through the array of topics, then generate buttons for each topic in the array
    for (i= 0; i<total; i++){
        // $("#gif-view").append('<button class = "topicbutton">'+ topics[i] + '</button>');
        var stillimageUrl = response.data[i].images.original_still.url;
        var animateimageUrl = response.data[i].images.original.url;
        
        var dataname = $(this).attr("data-name");

        var rating = "<p> Rating: " + response.data[i].rating +  "</p><br><br>";
        $("#GIFS").prepend(rating);


        //create image tag to insert url
        var b = $("<img>");
        b.addClass("gif");
        b.attr("data-name", dataname);
        b.attr("src", stillimageUrl);
        b.attr("stillurl", stillimageUrl);
        b.attr("animateurl", animateimageUrl);
        b.attr("alt", "gifurl");
        b.attr("gifstate", "still");

        var rating = "<p> Rating: " + response.data[i].rating +  "</p>";
        console.log(rating);
        b.append(rating);
        
        $("#GIFS").prepend(b);

        var download = "<a href=" + animateimageUrl + " download='new-image-name.jpg'> <button class='downloadlink'>Download this GIF</button></a>";
        var favs = "<button class='fav' animateurl=" + animateimageUrl + " stillurl=" + stillimageUrl + "> Add to Favorites </button>";
    
        // console.log(download);
        // var favs = $("<button>");
        // favs.addClass("fav");
        // favs.text("Add to Favorites")
        // favs.attr("data-name", $(this).attr("data-name"));
        
        var p = "<h3>" + response.data[i].title + "<br> <br>" + favs + "<br></h3>" + download + "<br><br>";

        $("#GIFS").prepend(p);

     }
    });
}


function stillanimate(){
    var state = $(this).attr("gifstate");
    // console.log(state);
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

// // Get the size of an object
// Object.size = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
//   };
  
