var SpotifyWebApi = require('spotify-web-api-node')
var clientId = 'd3d21a190f7a45bebc6d4df68b648c36'
var clientSecret = '1ab8ecc6055b446daef5870ca408adf2'

var spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
})

module.exports = {
	getDataFromPlaylist: getDataFromPlaylist
}
function getDataFromPlaylist(userId, playlistId, callback) {
	spotifyApi.clientCredentialsGrant()
		.then(function(data) {
			spotifyApi.setAccessToken(data.body['access_token'])
			spotifyApi.getPlaylist(userId, playlistId)
			.then(function(data) {
				var tracks = data.body.tracks.items
				var tracksArr = new Array()
				tracks.forEach(function(track) {
					var name = track.track.name
					var artists = ''
					track.track.artists.forEach(function(artist) {
						artists += artist.name + ', '
					})
					artists = artists.slice(0, -2)
					var album = track.track.album.name
					tracksArr.push({
						name: name,
						artist: artists,
						album: album
					})
				})
				res = {
					name: data.body.name,
					img: data.body.images[1].url,
					user: {
						name: 'Joe Sweeney',
						url: data.body.owner.external_urls.spotify,
						id: data.body.owner.id
					},
					tracks: tracksArr
				}
				callback(res)
			}, function(err) {
				console.log('Something went wrong!', err)
			})
		}, function(err) {
			console.log('Something went wrong when retrieving an access token', err)
		})
}