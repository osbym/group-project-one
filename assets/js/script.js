//moment.js for current day
var today = moment().format('l');
//Acces to API
var apiKey = "7978c91d365042ba95b523c7b119ac7c";
//Will store searched games in this
var searchedGames;

//gets any local stored info and if nothing it saves searchedGames in an object.
if (JSON.parse(localStorage.getItem("searched-game"))) {
    searchedGames = JSON.parse(localStorage.getItem("searched-game"))
}else {
    searchedGames = []
}

// This function will be used for getting API url to show current game based on search input
// Having troubles getting the correct syntax from the object.
function currentGameInfo(game) {
    // This URL pulls up object of searched game
    var queryUrl = `https://api.rawg.io/api/games?search=${game}&key=7978c91d365042ba95b523c7b119ac7c`
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(gameResponse){
        console.log(gameResponse);
        $("#sug-games").empty();
    // need to get the object to append what info we want to show on page
    // this is pulling up 404 so need the correct info
        var gameInfo = gameResponse.results[0].short_screenshots[0];
        var currentGame = $(`
        <h2 id = "currentGame">
            ${gameResponse.results}"${gameInfo}" /> </h2>
        `);
        $("#current-game").append(currentGame);


    })



    }











//event listener for the search button
$("#search-button").on("click",function(event){
    event.preventDefault();
    var games = $("#search").val().trim();
    currentGameInfo(games);
    if(!searchedGames.includes(games)) {
        searchedGames.push(games);
        var gameInput = $(`<h3 class = "has-background-danger ">${games}</h3>`);
        $("#search-list").append(gameInput);
    };
    localStorage.setItem("searched-game", JSON.stringify(searchedGames));
    console.log(searchedGames);
});
