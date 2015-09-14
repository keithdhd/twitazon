function getData(req, res){
  console.log("API getting twitter data");

  var Twit = require('twit');

  var twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  twitter.get('users/show/:screen_name', { screen_name: req.params.screen_name },  function (err, data, response) {
    res.send(data);
  });

};

module.exports = {
  getData: getData
}