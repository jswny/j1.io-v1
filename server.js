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
    {
      title : 'Home',
      domain : req.headers.host
    }
  );
});

app.get('/blog', function (req, res) {
  fs.readdir('./articles', function(err, files) {
    if (err) console.log(err);
    var articles = '';
    var template = 
        `
          <tr>
            <td>
              {date}
            </td>
            <td>
              <h3 class="inline">
                <a href="blog/{file}">{file}.txt</a>
              </h3>
            </td>
          </tr>
        `;
    for (i = 0; i < files.length; i++) {
      if (files[i].indexOf('.js') > -1) {
        var article = require('./articles/' + files[i]);
        articles += template.replace('{date}', article.date).replace(/{file}/g, files[i].replace('.js', ''));
      }
    }
    res.render('blog',
    {
      title: 'Blog',
      posts: articles,
      domain: req.headers.host
    }
  );
  });
});

app.get('/projects', function (req, res) {
  res.render('projects',
    {
      title : 'Projects',
      domain : req.headers.host
    }
  );
});

app.get('/blog/*', function (req, res) {
  // fs.readFile('./articles/' + req.params + '.html', function(err, data) {
  //   if (err) console.log(err);
    
    // var firstIndex = data.indexOf('<h1 style="text-align: center">')
    // var secondIndex = data.indexOf()
    // var title = 
    
    var article = require('./articles/' + req.params + '.js');
    
    res.render('article',
      {
        file: req.params + '.txt',
        title: article.title,
        date: article.date,
        content: article.content,
        domain: req.headers.host
      }
    );
  // });
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
