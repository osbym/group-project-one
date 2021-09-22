//moment.js for current day
var today = moment().format('l');
//Acces to API
var apiKey = "2656d25b0fe94a009f4b06c9e8bc55c8";
//Will store searched games in this
var searchedGames;

//gets any local stored info and if nothing it saves searchedGames in an object.
if (JSON.parse(localStorage.getItem("searched-game"))) {
    searchedGames = JSON.parse(localStorage.getItem("searched-game"))
} else {
    searchedGames = []
}

// This function will be used for getting API url to show current game based on search input
// Having troubles getting the correct syntax from the object.
function currentGameInfo(game) {
    // This URL pulls up object of searched game
    var queryUrl = `https://api.rawg.io/api/games?search=${game}&key=2656d25b0fe94a009f4b06c9e8bc55c8`

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (gameResponse) {
        console.log(gameResponse);
        $("#sug-games").empty();



        // need to get the object to append what info we want to show on page
        // need to use loop and parse through object to display whats needed
        var gameInfo = gameResponse.results;
        var HTMLCode = ''
        for (i = 0; i < 3; i++) {
            console.log(gameInfo[i].name);
            HTMLCode += 
                `<div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img src="${gameInfo[i].background_image}" height=300 width=300 alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                    <div class="media-content">
                        <p class="title is-4">Title: ${gameInfo[i].name}</p>
                        <p class="subtitle is-6">Genre: ${gameInfo[i].genres[0].name}</p>
                        <p class="subtitle is-6">Release Date: ${gameInfo[i].released}</p>
                    </div>
                    </div>
                    </div>
                </div>`
        }
        $("#current-game").html(HTMLCode);
        var gameHTML =`<div class = "block"><article class="panel is-info">
        <p class="panel-heading">
          Recommended Games
        </p>
       
      </article>`
        for (let i = 3; i <  gameInfo.length; i++) {
            gameHTML += `
            <a class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            ${gameInfo[i].name}
          </a>
            `
        }
        gameHTML += `</div>`
         $("#current-game").append(gameHTML);
        // //var gameInfoURL = `https://api.rawg.io/api/games?results=${game}&key=2656d25b0fe94a009f4b06c9e8bc55c8`;
        // var currentGameP = $(`
        // <p id = "currentGame">
        //     ${JSON.stringify(gameResponse.results)}"${gameInfo}" ${gameInfoURL}/> </p>
        // `);
        // $("#current-game").append(currentGameP);
        // console.log(gameInfo);


    })



}











//event listener for the search button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var games = $("#search").val().trim();
    currentGameInfo(games);
    if (!searchedGames.includes(games)) {
        searchedGames.push(games);
        var gameInput = $(`<h3 class = "has-background-danger">${games}</h3>`);
        $("#search-list").append(gameInput);
    };
    localStorage.setItem("searched-game", JSON.stringify(searchedGames));
    console.log(searchedGames);

});