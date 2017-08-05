$( document ).ready(function() {
	var characters = ["Totoro", "Tigger", "Cheshire Cat", "Pooh", "No Face"];

	renderButtons();

	function renderButtons() {
		$("#character-input").val("");
		$("#buttons-display").empty();
		for (var i = 0; i < characters.length; i++) {
			var a = $("<button>");
			a.addClass("character");
			a.attr("data-name", characters[i]);
			a.text(characters[i]);
			$("#buttons-display").append(a);
		}
		displayGif(); // be able to pull gifs for new buttons
	}

	$("#add-character").on("click", function(event) {
	event.preventDefault();
	var character = $("#character-input").val().trim();
    if ($("#character-input").val() === "") {
      alert("You can't submit an empty button");
      return false;
    }
	characters.push(character);
	renderButtons();
	});

	function displayGif() {
		$(".character").on("click", function() {
		var character = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=f5f4f40ab6b7423a9e1ffc47d6cb2df4&q=" +
    character + "&limit=10&offset=&rating=PG&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) { // loops through the data array (10x)
        var gifDiv = $("#gifs-display");
        var rating = results[i].rating; // grabs the rating of each gif 
        var p = $("<p>").text("Rating: " + rating);
        p.addClass("caption");

        var gif = $("<img>"); // grabs the image of each gif
        gif.attr("src", results[i].images.fixed_height_still.url);
        gif.attr("data-still", results[i].images.fixed_height_still.url); //setting data-states for click
        gif.attr("data-animate", results[i].images.fixed_height.url);
        gif.attr("data-state", "still");

        gifDiv.append(p);
        p.append(gif);
      }
      $("img").mouseover(function() {
      	var state = $(this).attr("data-state");
      	$(this).attr("src", $(this).attr("data-animate"));
      	$(this).attr("data-state", "animate");
      }).mouseleave(function() {
      	$(this).attr("src", $(this).attr("data-still"));
      	$(this).attr("data-state", "still");
      });
    });
  $("#gifs-display").empty();
  });
  }
});