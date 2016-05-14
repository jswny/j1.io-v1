var SpotifyWebApi = require('spotify-web-api-node')
var config = require('../config/config.js')
var clientId = config.clientId
var clientSecret = config.clientSecret

var spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
})

module.exports = {
	getDataFromPlaylist: getDataFromPlaylist,
	getUserPlaylists: getUserPlaylists
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
						url: data.body.external_urls.spotify,
						followers: data.body.followers.total,
						total_tracks: data.body.tracks.total,
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

function getUserPlaylists(userId, callback) {
	spotifyApi.clientCredentialsGrant()
		.then(function(data) {
			spotifyApi.setAccessToken(data.body['access_token'])
			spotifyApi.getUserPlaylists(userId)
				.then(function(data) {
					var playlists = data.body.items
					var playlistsArr = new Array()
					var count = 0
					playlists.forEach(function(playlist) {
						spotifyApi.getPlaylist(userId, playlist.id)
							.then(function(data) {
								playlistsArr.push({
									name: playlist.name,
									id: playlist.id,
									img: playlist.images[2].url,
									followers: data.body.followers.total,
									total_tracks: playlist.tracks.total
								})
								if (count == playlists.length - 1) {
									callback(playlistsArr)
								}
								count++
							}, function(err) {
								console.log('Something went wrong!', err)
							})
					})
				}, function(err) {
					console.log('Something went wrong!', err)
				})
		}, function(err) {
			console.log('Something went wrong when retrieving an access token', err)
		})
}