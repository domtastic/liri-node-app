let arrUserInput = process.argv;
let command = arrUserInput[2];
const fs = require("fs");
const twitter = require("twitter");
const keys = require("./keys.js");
console.log("Keys:", keys);
var request = require("request");
var Spotify = require("node-spotify-api");
let userTitle = "";

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
        });
        console.log("The tweets have been saved!");
      }
    } else {
      console.log(error);
    }
  });
}

function getUserTitle() {
  for (let i = 3; i < arrUserInput.length; i++) {
    if (userTitle === "") {
      userTitle += arrUserInput[i];
    } else {
      userTitle += " " + arrUserInput[i];
    }
  }
}

function getSpotify(songName) {
  // __________ SPOTIFY _________________
  // take the User input array and create a string from everything after the 2nd index
  const spotify = new Spotify(keys.spotify);
  console.log("userSong: " + songName);
  spotify.search({ type: "track", query: songName }, (err, data) => {
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
          console.log("The song has been saved!");
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
    omdbInfo("Mr. Nobody");
  } else {
    getUserTitle();
    omdbInfo(userTitle);
  }
}

function omdbInfo(movieName) {
  var queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
  request(queryUrl, (error, response, body) => {
    console.log("========================");
    console.log("Body:", body); // Print the HTML for the Google homepage.
    let info = JSON.parse(body);
    let rottenRatings = "";
    info.Ratings.forEach((element, i) => {
      if (info.Ratings[i].Source === "Rotten Tomatoes") {
        rottenRatings = info.Ratings[i].Value;
      }
    });
    let output = `Title: ${info.Title}
    Year: ${info.Year}
    IMDB Rating: ${info.imdbRating}
    Rotten Tomatoes: ${rottenRatings}
    Country: ${info.Country}
    Language: ${info.Language}
    Plot: ${info.Plot}
    Actors: ${info.Actors}`;

    console.log(output);
    fs.appendFile("log.txt", output, err => {
      if (err) throw err;
      console.log("The movie has been saved!");
    });
  });
}

function getRandomText() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log("Data: ", data);
    getSpotify(data);
  });
}

if (command === "my-tweets") {
  getTwitter();
} else if (command === "spotify-this-song") {
  getUserTitle();
  getSpotify(userTitle);
} else if (command === "movie-this") {
  // __________ MOVIE _________________
  getMovies();
} else if (command === "do-what-it-says") {
  // __________ do-what-it-says _________________
  getRandomText();
}
