const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { Song, Album, Playlist, Comment, User } = require("../../db/models");
const router = express.Router();

// get all songs from created by the current user

router.get("/songs", requireAuth, restoreUser, async (req, res) => {
	const { user } = req;
	const Songs = await Song.findAll({
		where: {
			userId: user.id,
		},
	});

	res.json({ Songs });
});

// get all comments created by the current user

router.get("/:userId/comments", restoreUser, async (req, res) => {
	const { userId } = req.params;
	const Comments = await Comment.findAll({
		where: {
			userId,
		},
	});
	res.json({ Comments });
});

//get all albums created by current user

router.get("/albums", requireAuth, restoreUser, async (req, res) => {
	const { user } = req;
	const Albums = await Album.findAll({
		where: {
			userId: user.id,
		},
	});

	res.json({ Albums });
});

//get all playlists created by current user
router.get("/playlists", requireAuth, restoreUser, async (req, res) => {
	const { user } = req;
	const Playlists = await Playlist.findAll({
		where: {
			userId: user.id,
		},
	});

	res.json({ Playlists });
});
module.exports = router;
