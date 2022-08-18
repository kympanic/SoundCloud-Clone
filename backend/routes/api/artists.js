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

// Get all Songs of an Artist from an id

//error handling not current working
router.get("/:artistId/songs", async (req, res) => {
	const { artistId } = req.params;
	const songs = await Song.findAll({
		where: {
			userId: artistId,
		},
	});
	if (!artistId) {
		res.statusCode = 404;
		res.json({ message: "Artist couldn't be found", statusCode: 404 });
	}
	res.json(songs);
});

module.exports = router;
