const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

module.exports = router;
