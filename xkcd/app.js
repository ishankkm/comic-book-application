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

function formatImg2(str) {
  var reImg = /<img[^>]*>/g
  strImg = str.match(reImg)[0].replace("\\\"", "\"").split("\"");

  var reTit = /<br><br>Hovertext: <br>.*<br><br>/g
  strTit = str.match(reTit)[0].slice(23, -8)

  imgTag = {"img": strImg[1], "title": strTit, "alt":strTit}
  return imgTag
}

app.get('/xkcd', function (req, resp) {

  Feed.load('https://xkcd.com/rss.xml', function(err, rss){

      rss.items.forEach(function(item) {
        item.description = formatImg(item.description)
      });

      resp.send(rss);
  });

})

app.get('/smbc', function (req, resp) {

  Feed.load('https://www.smbc-comics.com/rss.php', function(err, rss){
      rss.items.forEach(function(item) {
        item.description = formatImg2(item.description)
      });
      resp.send(rss);
  });

})


app.listen(5000, () => console.log('app listening on port 5000!'))
