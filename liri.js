var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// var omdbObj = keys.omdbKey;

var twitterClient = new Twitter(keys.twitterKeys);
var spotifyClient = new Spotify(keys.spotifyKeys);

var cmd1 = process.argv[2];
var cmd2 = process.argv[3];

console.log("Twitter Keys " + Twitter.consumer_key);
// console.log("Spotify Keys " + Spotify.id;
// console.log("omdb stuff " + omdbObj.apiKey);


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
   spotifyClient.search({ type: 'track', query: cmd2, limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } 
    // console.log(JSON.stringify(data.tracks, null, 2));
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
	  console.log("Preview url: "+ data.tracks.items[0].preview_url);
    });
}

   //node logic
   if(cmd1 === 'my-tweets' || cmd1 === "mytweets" || cmd1 === 'my tweets' || cmd1 === 'My Tweets' || cmd1 === 'My tweets'){
      twitterCall();
   } else if (cmd1 === 'spotify-this-song' || cmd1 ==='Spotify-This-Song' || cmd1 === 'spotifythissong') {
     spotifyCall(cmd2);
   }
