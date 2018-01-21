let arrUserInput = process.argv;
let command = arrUserInput[2];
const fs = require("fs");

if (command === "my-tweets") {
  // ____ TWITTER TWEETS_______
  const twitter = require("twitter");
  // ------ link to key.js instead ????? LOADING, BUT NOT WORKING ??????
  // let domTwitterKeys = require("./keys.js");
  // let client = new Twitter(domTwitterKeys);
  let client = new twitter({
    consumer_key: "etx6VdK6tiTBGtATzYcGcwog0",
    consumer_secret: "KGnLrF0qOcrtXqasFUznS0BrpOw5cFUXviIZ5UPxNnunyyIOUE",
    access_token_key: "954843821078069248-n2pNq374LHkVemZbTC4V7jOuIrQKHOL",
    access_token_secret: "cuIZBW5nq5q11qKQnmrI91eWsXm50tCZVdwzn18b4ObPJ"
  });
  var params = {
    screen_name: "denverdomtastic",
    count: 20
  };
  // something is not right.... GETting huge object response
  client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if (!error) {
      console.log(tweets);
      fs.appendFile("log.txt", tweets, err => {
        if (err) throw err;
        console.log("The tweets have been saved!");
      });
    } else {
      console.log(err);
    }
  });
} else if (command === "spotify-this-song") {
  // __________ SPOTIFY _________________
  // take the User input array and create a string from everything after the 2nd index
  let song;
  for (let i = 3; i < arrUserInput.length; i++) {
    song += arrUserInput[i];
  }
  console.log("song: " + song);
  let spotify = require("node-spotify-api");

  let spotifyCLient = new spotify({
    id: "12ff9337b04a481a9f1ef068a81347c5",
    secret: "7ec80c9360ed4bc694f553f8ca7ec599"
  });

  spotifyClient.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data);
  });
} else if (command === "movie-this") {
  // __________ MOVIE _________________
} else if (command === "do-what-it-says") {
  // __________ do-what-it-says _________________
}
