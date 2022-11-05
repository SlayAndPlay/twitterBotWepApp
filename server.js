require("dotenv").config();

const express = require("express");
const path = require("path");
const Twitter = require("twitter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const twitter = require("twitter");

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
}) 

app.post('/twitter', (req, res) => {
  const tweet = req.body.tweet;
  console.log("Body: ", req.body);
  const params = {
    status: tweet
  };
  client.post('statuses/update', params, function (error, tweet, response) {
    if (error) {
        console.log('eerror: ', error);
        res.status(500).json({
          message: 'We were not able to tweet this for you',
      });
      return;
    }

    res.json({
      message: 'Tweet successfully tweeted',
    });
  });
});

app.listen(3000, console.log('Server is starting at port ', 3000));

