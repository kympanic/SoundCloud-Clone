const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const db = require("../../db/models");
const user = require("../../db/models/user");
const { User, Song, Album } = db;

const router = express.Router();

const validateSong = [
	check("title")
		.exists({ checkFalsy: true })
		.withMessage("Song title is required"),
];

//get all songs
router.get("/", restoreUser, async (req, res) => {
	let Songs = await Song.findAll({
		order: [["title"]],
	});
	res.json({ Songs });
});

// Get details of a Song from an id

//need modifications
router.get("/:songId", async (req, res) => {
	const { songId } = req.params;
	const song = await Song.findByPk(songId, {
		include: [
			{
				model: User,
				required: true,
			},
			{
				model: Album,
				attributes: {
					exclude: ["userId", "description", "createdAt", "updatedAt"],
				},
				required: true /* ... */,
			},
			User,
			Album, // Shorthand syntax for { model: Qux } also works here
		],
	});

	res.json(song);
});

//create a song

router.post("/", requireAuth, restoreUser, validateSong, async (req, res) => {
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

//edit a song
router.put("/:songId", requireAuth, restoreUser, async (req, res) => {
	const { songId } = req.params;
	const { user } = req;
	const { title, description, url, imageUrl, albumId } = req.body;
	const editedSong = await Song.findByPk(songId);

	//check if proper user is editing the song
	if (editedSong.userId !== user.id) {
		res.statusCode = 403;
		return res.json({
			message: "Forbidden",
			statusCode: res.statusCode,
		});
	}
	if (editedSong) {
		editedSong.title = title;
		editedSong.description = description;
		editedSong.url = url;
		editedSong.imageUrl = imageUrl;
		editedSong.albumId = albumId;

		await editedSong.save();

		res.json(editedSong);
	} else {
		res.json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}
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
		res.statusCode = 403;
		return res.json({
			message: "Forbidden",
			statusCode: res.statusCode,
		});
	}

	await deletedSong.destroy();
	res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});
module.exports = router;
