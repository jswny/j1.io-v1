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
  var res = '<table>'
  playlist.forEach(function(track) {
    res +=
      '<tr>' +
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