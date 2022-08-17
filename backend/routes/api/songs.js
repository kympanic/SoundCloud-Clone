const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const db = require("../../db/models");
const { User, Song, Album } = db;

const router = express.Router();

//get all songs
router.get("/", async (req, res) => {
	let Songs = await Song.findAll({
		order: [["title"]],
	});
	res.json({ Songs });
});

// Get details of a Song from an id
router.get("/:songId", async (req, res) => {
	let query = {};
	const song = await Song.findByPk(req.params.songId, {
		include: [
			{
				model: User,
				include: [{ model: Album }],
			},
		],
	});

	res.json(song);
});

//create a song

router.post("/", requireAuth, restoreUser, async (req, res) => {
	const { title, description, url, imageUrl, albumId } = req.body;
	const { user } = req;
	const newSong = await Song.create({
		userId: user.id,
		title,
		description,
		url,
		previewImage: imageUrl,
		albumId,
	});
	res.json(newSong);
});

//delete a song
router.delete("/:songId", requireAuth, restoreUser, async (req, res) => {
	const { songId } = req.params;
	const { user } = req;
	const deletedSong = await Song.findByPk(songId);
	if (!deletedSong) {
		return res.json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}
	if (deletedSong.userId !== user.id) {
		return res.json({
			message: "Song must belong to current user",
		});
	}

	await deletedSong.destroy();
	res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});
module.exports = router;
