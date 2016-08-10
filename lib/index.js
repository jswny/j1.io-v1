import express from 'express';
import exphbs from 'express-handlebars';
var f = require('../bin/functions.js')
// var s = require('./bin/spotify.js')

let app = express();

app.use(express.static('./public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home',
    {
      title: 'Home'
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
      navigation : f.getNavigation(),
      domain : req.headers.host
    }
  );
});

app.get('/wtf', function (req, res) {
  res.render('wtf',
    {
      title : 'WTF',
      navigation : f.getNavigation(),
      domain : req.headers.host
    }
  );
});

app.get('/playlists', function (req, res) {
  var test = s.getUserPlaylists('12186155030', function(playlists) {
      res.render('playlist',
      {
        title: 'Playlists',
        cmd: 'ls',
        playlist: f.buildUserPlaylistsTable(playlists),
        navigation: f.getNavigation(),
        domain: req.headers.host
      }
    );
  })
});

app.get('/playlist/:playlist_id', function (req, res) {
  var playlist_id = req.params.playlist_id
  s.getDataFromPlaylist('12186155030', playlist_id, function(playlist) {
      res.render('playlist',
      {
        title: playlist.name + ' - Playlist',
        cmd: 'cat ' + playlist.name,
        playlist: f.buildPlaylistTable(playlist),
        navigation: f.getNavigation(),
        domain: req.headers.host
      }
    );
  })
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

app.post('/status', function(req, res) {
  res.json({status: 'operational'})
})

// app.get('*', function(req, res){
//   res.render('404',
//     {
//       title : '404',
//       query : req.url,
//       navigation : f.getNavigation(),
//       domain : req.headers.host
//     }
//   );
// });

app.listen(3000, () => {
  console.log('j1.io Started on port 3000...')
});
