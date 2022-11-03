const express = require("express");
const { Op } = require("sequelize");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const {
	validateSong,
	validateQuery,
	validateComments,
} = require("../../middleware/validationCheck");
const db = require("../../db/models");
const { User, Song, Album, Comment } = db;

const router = express.Router();

//get all songs
router.get("/", restoreUser, validateQuery, async (req, res) => {
	const songs = await Song.findAll({
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: User,
				include: [{ model: Album }],
			},
		],
	});
	return res.json({
		songs,
	});
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
	const comments = await Comment.findAll({
		where: { songId: parseInt(req.params.songId) },
		include: [
			{
				model: User,
			},
		],
		order: [["createdAt", "DESC"]],
	});
	return res.json(comments);
});

//create a song

router.post("/", requireAuth, restoreUser, validateSong, async (req, res) => {
	const { title, description, url, imageUrl, albumId } = req.body;
	const { user } = req;
	const currentAlbum = await Album.findByPk(albumId);
	//check to see if album exists
	if (!albumId) {
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

		return res.status(201).json(newSong);
	}
});

// Create a Comment for a Song based on the Song's id
router.post(
	"/:songId/comments",
	requireAuth,
	restoreUser,
	validateComments,
	async (req, res) => {
		const { user } = req;
		const songId = parseInt(req.params.songId);
		const { body } = req.body;

		await Comment.create({
			body,
			userId: user.id,
			songId,
		});

		const comments = await Comment.findAll({
			where: { songId: songId },
			include: [
				{
					model: User,
				},
			],
			order: [["createdAt", "DESC"]],
		});

		return res.json({ comments });
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
	console.log("THIS IS HEREJRLKSKFJSLDKJFSLDK:FSD:F");
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
