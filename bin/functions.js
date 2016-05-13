var fs = require('fs')
var request = require('request')

module.exports = {
  getNavigation: getNavigation,
  processResume: processResume,
  buildPlaylistTable: buildPlaylistTable
}

function getNavigation() {
  var res = 
  `
    <table>
      <tbody>
        <tr>
          <td>
            <i class="fa fa-home"></i>
          </td>
          <td>
            <a href="/">home</a>
          </td>
        </tr>
        <tr>
          <td>
            <i class="fa fa-comment"></i>
          </td>
          <td>
            <a href="http://blog.j1.io/">blog</a>
          </td>
        </tr>
        <tr>
          <td>
            <i class="fa fa-align-left"></i>
          </td>
          <td>
            <a href="/projects">projects</a>
          </td>
        </tr>
        <tr>
          <td>
            <i class="fa fa-briefcase"></i>
          </td>
          <td>
            <a href="/hireme">hire me</a>
          </td>
        </tr>
      </tbody>
    </table>
  `
  return res
}

function processResume(callback) {
  var url = 'https://docs.google.com/document/d/19oHVdNPB6kei_OaQSQ1afYZCcQFh_oBw91yiNG2mLHQ/export?format=pdf'
  var r = request(url)
  var data = []
  r.on('data', function(chunk) { 
    data.push(chunk)
  });
  r.on('end', function() {
    data = Buffer.concat(data)
    callback(data)
  });
}

function buildPlaylistTable(playlist) {
  var tracks = playlist.tracks
  var res = 
    '<br>' +
    '<table id="playlist-header">' +
    '<tr><td>' +
    '<img height="200" width="200" src="' + playlist.img + '"></img>' +
    '</td><td>' +
    '<h2><a class="link-no-style" href="' + playlist.url + '">' + playlist.name + '</a></h2>' +
    '<strong>By: <a href="' + playlist.user.url + '">' + playlist.user.name + '</a></strong>' +
    ' ● ' + playlist.total_tracks + ' songs' +
    '</td><tfoot><tr>' +
    '<td></td><td></td>' +
    '<td valign="bottom" align="right">'+
    playlist.followers + ' Followers' +
    '</td></tr></tfoot>' +
    '</table>' +
    '<table id="playlist">'
  var pad = ''
  for (var i = 0; i < tracks.length.toString().length; i++) {
    pad += '0'
  }
  tracks.forEach(function(track, index) {
    var i = "" + (index + 1)
    res +=
      '<tr>' +
      '<td class="track-num">' +
      (pad.substring(i.length) + i) +
      '</td>' +
      '<td>' +
      track.name +
      '</td>' +
      '<td>' +
      track.artist +
      '</td>' +
      '<td>' +
      track.album +
      '</td>'
  })
  res += '</table>'
  return res
}

function padLeft (nr, n, str) {
  return Array(n-String(nr).length+1).join(str||'0')+nr
}