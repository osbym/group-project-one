//moment.js for current day
var today = moment().format('l');
//Acces to API
var apiKey = "7978c91d365042ba95b523c7b119ac7c";
//Will store searched games in this
var searchedGames;

// This function will be used for getting API url to show current game based on search input
// Having troubles getting the correct syntax from the object.
function currentGameInfo(game) {
    var queryUrl = `https://api.rawg.io/api/games?search=${game}&key=7978c91d365042ba95b523c7b119ac7c`// This URL pulls up object of games
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(gameResponse){
        console.log(gameResponse);
        $("#sug-games").empty();
    // need to get the object to append what info we want to show on page
        var gameInfo = gameResponse.results[0].short_screenshots;
        var currentGame = $(`
        <h2 id = "currentGame">
            ${gameResponse.results} <img src="${gameInfo}" /> </h2>
        `);
        $("#current-game").append(currentGame);


    })



    }











//event listener for the search button
$("#search-button").on("click",function(event){
    event.preventDefault();
    var games = $("#search").val().trim();
    recoGames(games);
    if(!searchedGames.includes(games)) {
        searchedGames.push(games);
        var gameInput = $(`<li class = "list-group-item row background">${games}</li>`);
        $("#search-list").append(gameInput);
    };
    localStorage.setItem("searched-game", JSON.stringify(searchedGames));
    console.log(searchedGames);
})