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
const { User, Song, Album, Comment } = db;

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

router.get("/:songId", async (req, res) => {
	const { songId } = req.params;
	const song = await Song.findByPk(songId);
	if (!song) {
		res.statusCode = 404;
		res.json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}
	const artist = await song.getUser({
		attributes: {
			exclude: ["firstName", "lastName", "email"],
			include: ["previewImage"],
		},
	});
	const album = await song.getAlbum({
		attributes: {
			exclude: ["userId", "description", "createdAt", "updatedAt"],
		},
	});

	const payload = {
		id: song.id,
		userId: song.userId,
		albumId: song.albumId,
		title: song.title,
		description: song.description,
		url: song.url,
		createdAt: song.createdAt,
		updatedAt: song.updatedAt,
		previewImage: song.previewImage,
		Artist: artist,
		Album: album,
	};
	res.json(payload);
});

//Get all Comments by a Song's id
//need to exclude attributes in the user include model
//and error does not work properly if comments is not found
router.get("/:songId/comments", async (req, res) => {
	const { songId } = req.params;
	const song = await Song.findByPk(songId);
	if (!song) {
		res.statusCode = 404;
		res.json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}

	const Comments = await song.getComments({
		include: [
			{
				model: User,
			},
		],
	});

	if (!Comments) {
		res.json({
			message: "There are no comments",
		});
	}

	res.json({ Comments });
});

//error handling not current working -must work on validateSong
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

router.post("/:songId/comments", requireAuth, restoreUser, async (req, res) => {
	const { user } = req;
	const { songId } = req.params;
	const { body } = req.body;

	const newComment = await Comment.create({
		userId: user.id,
		songId,
		body,
	});
	res.json(newComment);
});

//edit a song
//validation as well
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
	}
	if (!editedSong) {
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
	//check to see if song exists
	if (!deletedSong) {
		res.statusCode = 404;
		return res.json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}
	//check to see if the song belongs to the logged in user
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
