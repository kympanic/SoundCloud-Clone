const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { User, Song, Album, Playlist } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const user = require("../../db/models/user");

// Get details of an Artist from an id
router.get("/:artistId", async (req, res) => {
	const { artistId } = req.params;
	const currentArtist = await User.scope("currentUser").findByPk(artistId);
	if (!currentArtist) {
		res.statusCode = 404;
		return res.json({
			message: "Artist couldn't be found",
			statusCode: 404,
		});
	}
	totalSongs = await Song.count({
		where: {
			userId: artistId,
		},
	});
	totalAlbums = await Album.count({
		where: {
			userId: artistId,
		},
	});

	const payload = {
		id: artistId,
		username: currentArtist.username,
		totalSongs,
		totalAlbums,
		previewImage: currentArtist.previewImage,
	};
	res.json(payload);
});
//Get all Songs of an Artist from an id

router.get("/:artistId/songs", async (req, res) => {
	const { artistId } = req.params;
	const Songs = await Song.findAll({
		where: {
			userId: artistId,
		},
	});
	const currentUser = await User.findByPk(artistId);
	if (!currentUser) {
		res.statusCode = 404;
		res.json({ message: "Artist couldn't be found", statusCode: 404 });
	}
	res.json({ Songs });
});

//Get all Albums of an Artist from an id
router.get("/:artistId/albums", async (req, res) => {
	const { artistId } = req.params;
	const Albums = await Album.findAll({
		where: {
			userId: artistId,
		},
	});
	const currentUser = await User.findByPk(artistId);
	if (!currentUser) {
		res.statusCode = 404;
		res.json({ message: "Artist couldn't be found", statusCode: 404 });
	}
	res.json({ Albums });
});

// Get all Playlists of an Artist from an id

router.get("/:artistId/playlists", async (req, res) => {
	const { artistId } = req.params;
	const Playlists = await Playlist.findAll({
		where: {
			userId: artistId,
		},
	});
	const currentUser = await User.findByPk(artistId);
	if (!currentUser) {
		res.statusCode = 404;
		res.json({ message: "Artist couldn't be found", statusCode: 404 });
	}
	res.json({ Playlists });
});

module.exports = router;
