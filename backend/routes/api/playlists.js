const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Album, Playlist, Song, PlaylistSong } = require("../../db/models");
const router = express.Router();

//Get details of a Playlist from an id
//Need to exclude playlistSong
router.get("/:playlistId", async (req, res) => {
	const { playlistId } = req.params;
	const currentPlaylist = await Playlist.findByPk(playlistId);

	if (!currentPlaylist) {
		res.statusCode = 404;
		res.json({
			message: "Playlist couldn't be found",
			statusCode: 404,
		});
	}

	const songs = await currentPlaylist.getSongs({
		attributes: {
			exclude: ["PlaylistSongs"],
		},
	});

	const payload = {
		id: currentPlaylist.id,
		userId: currentPlaylist.userId,
		name: currentPlaylist.name,
		createdAt: currentPlaylist.createdAt,
		updatedAt: currentPlaylist.updatedAt,
		previewImage: currentPlaylist.previewImage,
		Songs: songs,
	};
	res.json(payload);
});

// Edit a Playlist
// work on validation errors
router.put("/:playlistId", requireAuth, restoreUser, async (req, res) => {
	const { playlistId } = req.params;
	const { user } = req;
	const { name, imageUrl } = req.body;
	const editedPlaylist = await Playlist.findByPk(playlistId);
	//check if proper user is editing the song
	if (editedPlaylist.userId !== user.id) {
		res.statusCode = 403;
		return res.json({
			message: "Forbidden",
			statusCode: res.statusCode,
		});
	}
	if (editedPlaylist) {
		editedPlaylist.name = name;
		editedPlaylist.previewImage = imageUrl;
	}
	await editedPlaylist.save();
	res.json(editedPlaylist);
	res.statusCode = 404;
	res.json({
		message: "Playlist couldn't be found",
		statusCode: 404,
	});
});

//create a playlist
//work on validation
router.post("/", requireAuth, restoreUser, async (req, res) => {
	const { name, imageUrl } = req.body;
	const { user } = req;
	const newPlaylist = await Playlist.create({
		userId: user.id,
		name,
		previewImage: imageUrl,
	});
	res.json(newPlaylist);
});

//Add a Song to a Playlist based on the Playlists's id
//requires work
router.post(
	"/:playlistId/songs",
	requireAuth,
	restoreUser,
	async (req, res) => {
		const { playlistId } = req.params;
		const { songId } = req.body;
		const { user } = req;
		const currentPlaylist = await Playlist.findByPk(playlistId);
		if (!currentPlaylist) {
			res.statusCode = 404;
			return res.json({
				message: "Playlist couldn't be found",
				statusCode: 404,
			});
		}
		if (currentPlaylist.userId !== user.id) {
			res.statusCode = 403;
			return res.json({
				message: "Forbidden",
				statusCode: res.statusCode,
			});
		}

		const addSong = await currentPlaylist.addSong(songId);

		const payload = {
			id: user.id,
			playlistId: currentPlaylist.id,
			songId,
		};
		res.json(payload);
	}
);

router.delete("/:playlistId", requireAuth, restoreUser, async (req, res) => {
	const { playlistId } = req.params;
	const { user } = req;
	const deletedPlaylist = await Playlist.findByPk(playlistId);
	//check to see if playlist exists
	if (!deletedPlaylist) {
		res.statusCode = 404;
		return res.json({
			message: "Playlist couldn't be found",
			statusCode: 404,
		});
	}
	//check to see if the song belongs to the logged in user
	if (deletedPlaylist.userId !== user.id) {
		res.statusCode = 403;
		return res.json({
			message: "Forbidden",
			statusCode: res.statusCode,
		});
	}

	await deletedPlaylist.destroy();
	res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});
module.exports = router;
