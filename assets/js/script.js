//moment.js for current day
var today = moment().format('l');
//Acces to RAWG API
var apiKey = "2656d25b0fe94a009f4b06c9e8bc55c8";
//ACCESS TO STEAM API
var steamKey = "1C0D153B3F4374F5BA98C0517953BC0B"
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
    var queryUrl = `https://api.rawg.io/api/games?search=${game}&key=2656d25b0fe94a009f4b06c9e8bc55c8`
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (gameResponse) {
        console.log(gameResponse);
        $("#current-game").empty();

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
        
        //calling gamePriceApi function here so I can use game parameter for searches
        gameGiveawayApi(game);
        
})


}
//This function will be used for game give aways API to show neat giveaways
//THE CALL IS GIVING ME 403 FORBIDEN!!! SUPER DEPRESSING!!!!
//
function gameGiveawayApi() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://gamerpower.p.rapidapi.com/api/giveaways",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "gamerpower.p.rapidapi.com",
            "x-rapidapi-key": "5002b490f6msh37fdb2fdeb7b2edp1d1841jsn1ecc2e3824b8"
        }
    };
    
    $.ajax(settings).done(function (giveResponse) {
        console.log(giveResponse);
        $("#sug-game").empty();

        

        var htmlCODE = ''
        
            for (i = 0; i < 3; i++) {
                var giveAway = giveResponse[i];
                console.log(giveAway.instructions);
                htmlCODE += 
                    `<div class="card">
                    <article class="panel is-info">
                    <p class="panel-heading">
                    Game giveaways!
                    </p>
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img src="${giveAway.image}" height=100 width=50 alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                        <div class="media-content">
                            <p class="title is-6">Description: ${giveAway.description}</p>
                            <p class="subtitle is-6">Instructions: ${giveAway.instructions}</p>
                            <p class="subtitle is-6">Giveaway URL: ${giveAway.open_giveaway_url}</p>
                        </div>
                        </div>
                        </div>
                    </div>`
            }
            $("#sug-games").html(htmlCODE);
            
        console.log(giveAway);

            
        
    });


}







// THIS FUNCTION WILL BE FOR STEAM WEB API to show news articles on sug-game ID 
// THE CALL ISNT WORKING YET NOT SURE WHATS WRONG WITH SYNTAX
//function gameNewsInfo(info) {
    //THIS URL WILL PULL UP LATEST OF A GAME SPECIFIED BY SEARCH
    //var queryNewsURL = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json`;

    //$.ajax({
       // url: queryNewsURL,
        //method: "GET",
        
    //}).then(function (newsResponse) {
        //console.log(newsResponse);
        //$("#sug-games").empty();
    
        // need to get the object to append what info we want to show on page
        // need to use loop and parse through object to display whats needed
        //var gameNews = gameNews.results;
    
    //}
    //)

//}







//event listener for the search button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var games = $("#search").val().trim();
    currentGameInfo(games);
    if(!searchedGames.includes(games)) {
        searchedGames.push(games);
        
        var gameInput = $(`<h3 class = "has-background-danger subtitle is-6">${games}</h3>`);
        $("#search-list").append(gameInput);
    };
    localStorage.setItem("searched-game", JSON.stringify(searchedGames));
    $("#search-list").empty();
    for (i = searchedGames.length - 10; i < searchedGames.length; i++ ) {
        var gameInput = $(`<h3 class = "has-background-danger subtitle is-6">${searchedGames[i]}</h3>`);
    $("#search-list").append(gameInput);
    }
    console.log(searchedGames);
    
});

