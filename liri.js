let command = process.argv[2];
const fs = require("fs");

if (command === "my-tweets") {
  // ____ TWITTER TWEETS_______
  const Twitter = require("twitter");
  // ------ link to key.js instead ????? LOADING, BUT NOT WORKING ??????
  // let domTwitterKeys = require("./keys.js");
  // let client = new Twitter(domTwitterKeys);
  let client = new Twitter({
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
} else if (command === "movie-this") {
  // __________ MOVIE _________________
} else if (command === "do-what-it-says") {
  // __________ do-what-it-says _________________
}
