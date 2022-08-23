const express = require("express");
const { Op } = require("sequelize");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { check, query } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const db = require("../../db/models");
// const user = require("../../db/models/user");
// const song = require("../../db/models/song");
const { User, Song, Album, Comment } = db;

const router = express.Router();

//validate middlewares - will move in the future
const validateSong = [
	check("title")
		.exists({ checkFalsy: true })
		.withMessage("Song title is required")
		.notEmpty()
		.withMessage("Song title is required"),
	check("url")
		.exists({ checkFalsy: true })
		.withMessage("Audio is required")
		.notEmpty()
		.withMessage("Audio is required"),
	handleValidationErrors,
];

const validateQuery = [
	query("createdAt").optional().isString().withMessage("CreatedAt is invalid"),
	query("page")
		.optional()
		.isInt()
		.withMessage("Page must be set to a number")
		.isInt({ min: 0 })
		.withMessage("Page must be greater than or equal to 0")
		.isInt({ max: 20 })
		.withMessage("Page can not be greater than 20"),
	query("size")
		.optional()
		.isInt()
		.withMessage("Page must be set to a number")
		.isInt({ min: 0 })
		.withMessage("Size must be greater than or equal to 0")
		.isInt({ max: 20 })
		.withMessage("Size can not be greater than 20"),
	handleValidationErrors,
];

//get all songs
router.get("/", restoreUser, validateQuery, async (req, res) => {
	let query = {
		where: {},
	};

	const page = req.query.page === undefined ? 0 : parseInt(req.query.page);
	const size = req.query.size === undefined ? 20 : parseInt(req.query.size);

	if (page >= 1 && size >= 1) {
		query.limit = size;
		query.offset = size * (page - 1);
	}

	if (req.query.title) query.where.title = req.query.title;
	if (req.query.createdAt) query.where.createdAt = req.query.createdAt;

	let Songs = await Song.findAll(query);
	res.json(Songs);
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
				attributes: ["id", "username"],
			},
		],
	});
	//checks to see if there are any comments
	if (!Comments[0]) {
		res.status(404).json({
			message: "There are no comments",
			statusCode: 404,
		});
	}
	res.json({ Comments });
});

//create a song

router.post("/", requireAuth, restoreUser, validateSong, async (req, res) => {
	const { title, description, url, imageUrl, albumId } = req.body;
	const { user } = req;
	const currentAlbum = await Album.findByPk(albumId);
	//check to see if album exists
	if (albumId === null) {
		const newSong = await Song.create({
			userId: user.id,
			title,
			description,
			url,
			previewImage: imageUrl,
			albumId,
		});
		res.status(201).json(newSong);
	}
	if (albumId) {
		if (!currentAlbum) {
			return res
				.status(404)
				.json({ message: "Album couldn't be found", statusCode: 404 });
		}
		const newSong = await Song.create({
			userId: user.id,
			albumId,
			title,
			description,
			url,
			createdAt: Song.createdAt,
			updatedAt: Song.updatedAt,
			previewImage: imageUrl,
		});
		res.status(201).json(newSong);
	}
});

// Create a Comment for a Song based on the Song's id
router.post(
	"/:songId/comments",
	requireAuth,
	restoreUser,
	check("body")
		.exists({ checkFalsy: true })
		.withMessage("Comment body text is required")
		.notEmpty()
		.withMessage("Comment body text is required"),
	handleValidationErrors,
	async (req, res) => {
		const { user } = req;
		const { songId } = req.params;
		const { body } = req.body;
		const currentSong = await Song.findByPk(songId);
		if (!currentSong) {
			res.statusCode = 404;
			return res.json({
				message: "Song couldn't be found",
				statusCode: 404,
			});
		}
		const newComment = await Comment.create({
			userId: user.id,
			songId,
			body,
		});
		res.json(newComment);
	}
);

//edit a song

router.put(
	"/:songId",
	requireAuth,
	restoreUser,
	validateSong,
	async (req, res) => {
		const { songId } = req.params;
		const { user } = req;
		const { title, description, url, imageUrl, albumId } = req.body;
		const editedSong = await Song.findByPk(songId);
		if (!editedSong) {
			res.json({
				message: "Song couldn't be found",
				statusCode: 404,
			});
		}
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
			editedSong.previewImage = imageUrl;
			editedSong.albumId = albumId;

			await editedSong.save();
			res.json(editedSong);
		}
	}
);

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
