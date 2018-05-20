const https = require('https');
var express = require('express');
var Feed = require('rss-to-json');

var app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function formatImg(str) {
  newStr = str.replace("\\\"", "\"").split("\"");
  imgTag = {"img": newStr[1], "title": newStr[3], "alt":newStr[5]}
  return imgTag
}

app.get('/', function (req, resp) {

  Feed.load('https://xkcd.com/rss.xml', function(err, rss){

      rss.items.forEach(function(item) {
        item.description = formatImg(item.description)
      });

      resp.send(rss);
  });

})

app.listen(5000, () => console.log('app listening on port 5000!'))
