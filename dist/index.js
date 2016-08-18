'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var f = require('../bin/functions.js');
// var s = require('./bin/spotify.js')

var app = (0, _express2.default)();

app.use(_express2.default.static('./public'));
app.use(_express2.default.static('./bower_components'));
app.engine('hbs', (0, _expressHandlebars2.default)({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('home', {
    title: 'Home',
    bundle: 'home'
  });
});

app.get('/projects', function (req, res) {
  res.render('projects', {
    title: 'Projects',
    bundle: 'projects'
  });
});

// app.get('/projects', function (req, res) {
//   res.render('projects',
//     {
//       title : 'Projects',
//       navigation : f.getNavigation(),
//       domain : req.headers.host
//     }
//   );
// });

// app.get('/hireme', function (req, res) {
//   res.render('hireme',
//     {
//       title : 'Hire Me',
//       navigation : f.getNavigation(),
//       domain : req.headers.host
//     }
//   );
// });

// app.get('/wtf', function (req, res) {
//   res.render('wtf',
//     {
//       title : 'WTF',
//       navigation : f.getNavigation(),
//       domain : req.headers.host
//     }
//   );
// });

// app.get('/playlists', function (req, res) {
//   var test = s.getUserPlaylists('12186155030', function(playlists) {
//       res.render('playlist',
//       {
//         title: 'Playlists',
//         cmd: 'ls',
//         playlist: f.buildUserPlaylistsTable(playlists),
//         navigation: f.getNavigation(),
//         domain: req.headers.host
//       }
//     );
//   })
// });

// app.get('/playlist/:playlist_id', function (req, res) {
//   var playlist_id = req.params.playlist_id
//   s.getDataFromPlaylist('12186155030', playlist_id, function(playlist) {
//       res.render('playlist',
//       {
//         title: playlist.name + ' - Playlist',
//         cmd: 'cat ' + playlist.name,
//         playlist: f.buildPlaylistTable(playlist),
//         navigation: f.getNavigation(),
//         domain: req.headers.host
//       }
//     );
//   })
// });

// app.get('/resume', function (req, res) {
//   var date = new Date(Date.now())
//   var month = date.getMonth() + 1
//   var day = date.getDate()
//   var year = date.getFullYear().toString().slice(-2)
//   var fileDate = month + '.' + day + '.' + year
//   res.setHeader('Content-disposition', 'inline; filename=Sweeney-John-Resume-' + fileDate + '.pdf')
//   res.setHeader('Content-type', 'application/pdf')

//   f.processResume(function(data) {
//     res.send(data)
//   });
// });

// app.post('/status', function(req, res) {
//   res.json({status: 'operational'})
// })

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

if (process.env.NODE_ENV === 'development') {
  app.use((0, _errorhandler2.default)());
}

app.listen(3000, function () {
  console.log('j1.io Started on port 3000...');
});