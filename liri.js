var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitterClient = new Twitter(keys.twitterKeys);
var spotifyClient = new Spotify(keys.spotifyKeys);
var omdbAPI = keys.omdbKey.apiKey;

var cmd1 = process.argv[2];
var cmd2 = process.argv[3];



function twitterCall(){
   twitterClient.get('statuses/user_timeline', 
   {screen_name:'homeworkapp1', count:20}, 
   function(error, tweets, response) {
      if(error) {
         console.log(tweets);
         return;
      } else {
         console.log("This is an error");
         console.log(error);
      }
   for(var i = 0; i< tweets.length; i++){
        console.log("####### Tweet: " + (i + 1) + " #######");
        console.log("Posted at: " + tweets[i].created_at);
        console.log("Tweet text: " + tweets[i].text);
        console.log("");
      }  
    }
   )};

function spotifyCall(cmd2) {
  if (cmd2 === undefined || cmd2 === null) {
    cmd2 === 'The Sign';
  }
   spotifyClient.search({ type: 'track', query: cmd2, limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } 
    // console.log(JSON.stringify(data.tracks, null, 2));
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview url: "+ data.tracks.items[0].preview_url);
    });
}

function movieInfo(){
  /*
     * Title of the movie.
         * Year the movie came out.
         * IMDB Rating of the movie.
         * Rotten Tomatoes Rating of the movie.
         * Country where the movie was produced.
         * Language of the movie.
         * Plot of the movie.
         * Actors in the movie.
    */
    
    if(cmd2 === undefined || cmd2 === null){
      cmd2 = "Mr Nobody";
    }
    var requestUrl = "http://www.omdbapi.com/?t=" + cmd2 + "&y=&plot=short&apikey=" + omdbAPI; 
    request.get({url:requestUrl},function(error,response,body){
               //console.log(JSON.parse(body));
                body = JSON.parse(body);
               if(error || body.Response === "False" || body.Error === "Movie not found!"){
                 console.log("movie not found");
                 return;
               }
                
                console.log("Year of release: " + body.Year);
                console.log("IMDB Rating: " + body.imdbRating);
                console.log("Actors: " + body.Actors);
                for(var i=0;i < body.Ratings.length;i++){
                  if(body.Ratings[i].Source === "Rotten Tomatoes"){
                   console.log("Rotten Tomatoes Rating: " + body.Ratings[i].Value);
                  }
                }
                console.log("Country of production: " + body.Country);
                console.log("Language of movie: " + body.Language);
                console.log("Plot: " + body.Plot);
              });
  }


  function randomTxt() {
    fs.readFile("random.txt", "utf8", function(error, data){
         if (error) {
      return console.log(error);
   }
   var firstCmd = data.split(",")[0];
   
   var secondCmd = data.split(",")[1];
    if(firstCmd === "spotify-this-song"){
      spotifyCall(secondCmd);
    }
    });
};
   //node logic
   if(cmd1 === 'my-tweets' || cmd1 === "mytweets" || cmd1 === 'my tweets' || cmd1 === 'My Tweets' || cmd1 === 'My tweets'){
      twitterCall();
   } else if (cmd1 === 'spotify-this-song' || cmd1 ==='Spotify-This-Song' || cmd1 === 'spotifythissong') {
     spotifyCall(cmd2); 
   } else if (cmd1 === 'movie-this' || cmd1 === 'moviethis' || cmd1 === 'movie this') {
    movieInfo(cmd2);
   } else if (cmd2 === 'do-what-it-says') {
     randomTxt();
   }
