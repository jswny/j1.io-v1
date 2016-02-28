var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');

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
    { title : 'Home' }
  );
});

app.get('/blog', function (req, res) {
  // fs.readdir('./views', function(err, files) {
  //   var blogEntries = '';
  //   for (i = 0; i < files.length; i++) {
  //     if (files[i].indexOf('blog_') > -1) {
  //       var entry = files[i].replace('blog_', '').replace('.jade', '');
  //       blogEntries += '<br><a href="' + entry + '">' + entry + '.txt</a>\n';
  //     }
  //   }
  // });
  res.render('blog',
    { title : 'Blog' }
  );
});

app.get('/blog/fucking-linux', function (req, res) {
  res.render('blog_fucking-linux',
    { title : 'Fucking Linux' }
  );
});

app.get('/blog/troubleshooting-linux', function (req, res) {
  res.render('blog_troubleshooting-linux',
    { title : 'Troubleshooting Linux' }
  );
});

app.get('/blog/the-brain', function (req, res) {
  res.render('blog_the-brain',
    { title : "The Brain" }
  );
});

app.get('/blog/exit', function (req, res) {
  res.render('blog_exit',
    { title : 'Exit' }
  );
});

app.get('/blog/i-had-vip', function (req, res) {
  res.render('blog_i-had-vip',
    { title : 'I Had VIP' }
  );
});

app.get('/projects', function (req, res) {
  res.render('projects',
    { title : 'Projects' }
  );
});

app.get('*', function(req, res){
  console.log(req.params);
  res.render('404',
    {
      title : '404',
      query : req.params
    }
  );
});

app.listen(80);
