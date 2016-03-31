var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');
var f = require('./bin/functions.js');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public' , compile: compile}
));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index',
    {
      title : 'Home',
      domain : req.headers.host
    }
  );
});

app.get('/projects', function (req, res) {
  res.render('projects',
    {
      title : 'Projects',
      domain : req.headers.host
    }
  );
});

app.get('*', function(req, res){
  console.log(req.params);
  res.render('404',
    {
      title : '404',
      query : req.params,
      domain : req.headers.host
    }
  );
});

app.listen(3000);
