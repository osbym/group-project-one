//moment.js for current day
var today = moment().format('l');
//Acces to API
var apiKey = "7978c91d365042ba95b523c7b119ac7c";
//Will store searched games in this
var searchedGames;












//event listener for the search button
$("#search-button").on("click",function(event){
    event.preventDefault();
    var gameSearch = $("#search").val().trim();
    recoGames(gameSearch);
    if(!searchedGames.includes(gameSearch)) {
        searchedGames.push(gameSearch);
        var gameInput = $(`<li class = "list-group-item row background">${gameSearch}</li>`);
        $("#search-list").append(gameInput);
    };
    localStorage.setItem("searched-game", JSON.stringify(searchedGames));
    console.log(searchedGames);
})