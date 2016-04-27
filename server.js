var express = require('express')
var stylus = require('stylus')
var nib = require('nib')
var request = require('request')
var f = require('./bin/functions.js')

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(stylus.middleware(
  { src: __dirname + '/public' , compile: compile}
));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index',
    {
      title : 'Home',
      navigation : f.getNavigation(),
      domain : req.headers.host
    }
  );
});

app.get('/projects', function (req, res) {
  res.render('projects',
    {
      title : 'Projects',
      navigation : f.getNavigation(),
      domain : req.headers.host
    }
  );
});

app.get('/hireme', function (req, res) {
  res.render('hireme',
    {
      title : 'Hire Me',
      // modified : f.getModifiedDate('./public/resume.pdf'),
      navigation : f.getNavigation(),
      domain : req.headers.host
    }
  );
});

app.get('/resume', function (req, res) {
  var date = new Date(Date.now())
  var month = date.getMonth() + 1
  var day = date.getDate()
  var year = date.getFullYear().toString().slice(-2)
  var fileDate = month + '.' + day + '.' + year
  res.setHeader('Content-disposition', 'inline; filename=Sweeney-John-Resume-' + fileDate + '.pdf')
  res.setHeader('Content-type', 'application/pdf')
  
  f.processResume(function(data) {
    res.send(data)
  });
});

app.get('*', function(req, res){
  console.log(req.url);
  res.render('404',
    {
      title : '404',
      query : req._parsedurl,
      navigation : f.getNavigation(),
      domain : req.headers.host
    }
  );
});

app.listen(3000);
