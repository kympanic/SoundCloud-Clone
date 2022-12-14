const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { validatePlaylist } = require("../../middleware/validationCheck");
const {
	Album,
	Playlist,
	Song,
	PlaylistSong,
	User,
} = require("../../db/models");
const user = require("../../db/models/user");
const router = express.Router();

//Get details of a Playlist from an id
router.get("/:playlistId", async (req, res) => {
	const { playlistId } = req.params;
	const currentPlaylist = await Playlist.findByPk(playlistId, {
		include: {
			model: Song,
			through: {
				attributes: [],
			},
		},
	});
	if (!currentPlaylist) {
		res.statusCode = 404;
		res.json({
			message: "Playlist couldn't be found",
			statusCode: 404,
		});
	}
	return res.json(currentPlaylist);

	//Another method of getting songs with mix-ins
	// const songs = await currentPlaylist.getSongs({
	// 	joinTableAttributes: [],
	// });
});

// Edit a Playlist

router.put(
	"/:playlistId",
	requireAuth,
	restoreUser,
	validatePlaylist,
	async (req, res) => {
		const { playlistId } = req.params;
		const { user } = req;
		const { name, imageUrl } = req.body;
		const editedPlaylist = await Playlist.findByPk(playlistId);

		if (!editedPlaylist) {
			return res.status(404).json({
				message: "Playlist couldn't be found",
				statusCode: 404,
			});
		}
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
		if (!editedPlaylist) {
			res.status(404).json({
				message: "Playlist couldn't be found",
				statusCode: 404,
			});
		}
	}
);

//create a playlist
router.post(
	"/",
	requireAuth,
	restoreUser,
	validatePlaylist,
	async (req, res) => {
		const { name, imageUrl } = req.body;
		const { user } = req;
		const newPlaylist = await Playlist.create({
			userId: user.id,
			name,
			createdAt: Playlist.createdAt,
			updatedAt: Playlist.updatedAt,
			previewImage: imageUrl,
		});
		res.status(201).json(newPlaylist);
	}
);

//Add a Song to a Playlist based on the Playlists's id
router.post(
	"/:playlistId/songs",
	requireAuth,
	restoreUser,
	async (req, res) => {
		const { playlistId } = req.params;
		const { songId } = req.body;
		const { user } = req;
		const currentPlaylist = await Playlist.findByPk(playlistId);
		const currentSong = await Song.findByPk(songId);
		if (!currentSong) {
			res.status(404).json({
				message: "Song couldn't be found",
				statusCode: res.statusCode,
			});
		}
		if (!currentPlaylist) {
			res.status(404).json({
				message: "Playlist couldn't be found",
				statusCode: 404,
			});
		}
		if (currentPlaylist.userId !== user.id) {
			res.status(404).json({
				message: "Forbidden",
				statusCode: res.statusCode,
			});
		}

		// await currentPlaylist.addSong(songId);
		//fix
		await PlaylistSong.create({
			songId: currentSong.id,
			playlistId: currentPlaylist.id,
		});

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
