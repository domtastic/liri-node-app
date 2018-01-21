let arrUserInput = process.argv;
let command = arrUserInput[2];
const fs = require("fs");
const twitter = require("twitter");
const keys = require("./keys.js");
var request = require("request");
console.log(keys);
var Spotify = require("node-spotify-api");
let movieName = "";

if (command === "my-tweets") {
  getTwitter();
} else if (command === "spotify-this-song") {
  getSpotify();
} else if (command === "movie-this") {
  // __________ MOVIE _________________
  getMovies();
} else if (command === "do-what-it-says") {
  // __________ do-what-it-says _________________
}

function getTwitter() {
  // ____ TWITTER TWEETS_______
  // ------ link to key.js instead ????? LOADING, BUT NOT WORKING ??????
  let client = new twitter(keys.twitterKeys);
  // console.log(client)
  var params = {
    screen_name: "denverdomtastic",
    count: 20
  };
  // something is not right.... GETting huge object response
  client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("==========================");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log(tweets[i].user.name);
        fs.appendFile("log.txt", tweets[i].text, err => {
          if (err) throw err;
          console.log("The tweets have been saved!");
        });
      }
    } else {
      console.log(err);
    }
  });
}

function getSpotify() {
  // __________ SPOTIFY _________________
  // take the User input array and create a string from everything after the 2nd index
  const spotify = new Spotify(keys.spotify);
  var userSong = "";
  for (let i = 3; i < arrUserInput.length; i++) {
    if (userSong === "") {
      userSong += arrUserInput[i];
    } else {
      userSong += " " + arrUserInput[i];
    }
  }
  console.log("userSong: " + userSong);
  spotify.search({ type: "track", query: userSong }, (err, data) => {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      for (var i = 0; i < 3; i++) {
        console.log("==============================");
        let output = `Artist: ${data.tracks.items[i].artists[0].name}
    Name: ${data.tracks.items[i].name}
    Link: ${data.tracks.items[i].external_urls.spotify}
    Album: ${data.tracks.items[i].album.name}
    `;
        console.log(output);
        fs.appendFile("log.txt", output, err => {
          if (err) throw err;
          console.log("The tweets have been saved!");
        });
        // console.log("Artist: " + data.tracks.items[i].artists[0].name);
        // console.log("Name: " + data.tracks.items[i].name);
        // console.log("Link: " + data.tracks.items[i].external_urls.spotify);
        // console.log("Album: " + data.tracks.items[i].album.name);
      }
    }
  });
}

function getMovies() {
  if (arrUserInput.length == 3) {
    movieName = "Mr. Nobody";
    omdbInfo();
  } else {
    for (let i = 3; i < arrUserInput.length; i++) {
      if (movieName === "") {
        movieName += arrUserInput[i];
      } else {
        movieName += " " + arrUserInput[i];
      }
    }
    omdbInfo();
  }
}

function omdbInfo() {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, (error, response, body) => {
    console.log("========================");
    // console.log("Body:", body); // Print the HTML for the Google homepage.
    console.log(`Title: ${JSON.parse(body).Title}`);
    console.log(`Year: ${JSON.parse(body).Year}`);
    console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);
    // how do you do this again?
    // console.log(
    //   "Rotten Tomatoes: " + JSON.parse(body).Ratings.Source["Rotten Tomatoes"]
    // );
    console.log(`Country: ${JSON.parse(body).Country}`);
    console.log(`Language: ${JSON.parse(body).Language}`);
    console.log(`Plot: ${JSON.parse(body).Plot}`);
    console.log(`Actors: ${JSON.parse(body).Actors}`);
  });
}
