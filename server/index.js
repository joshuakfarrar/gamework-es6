'use strict';

var express = require('express');
var path = require('path');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(process.env.PORT || 3000);

app.get('/', function(req, res, next) {
  var Person = require('./lib/person');
  var Greeter = require('./lib/greeter');

  var Joshua = new Person("Joshua K. Farrar");

  var posts = [
    {
      title: "Microprojects: Adventures in C",
      content: "How did I get here? I've been building random things on the internet for somewhere around 8 years now, and during that time I've been paid...",
      author: {
        name: "sent1nel",
        twitter_url: "https://twitter.com/sent1nel"
      }
    },
    {
      title: "Developer Environments, or How I Code",
      content: "As usual, I'm quite busy hacking away on a project, so the original idea I had about writing about privacy is on hold, at least for...",
      author: {
        name: "sent1nel",
        twitter_url: "https://twitter.com/sent1nel"
      }
    }
  ];

  res.render('index', { greeting: Greeter.greet(Joshua), posts: posts });
});

module.exports = app;
