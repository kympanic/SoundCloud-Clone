const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Album } = require("../../db/models");
const router = express.Router();

//validate middlewares - will move in the future

const validateAlbum = [
	check("title")
		.exists({ checkFalsy: true })
		.withMessage("Album title is required")
		.notEmpty()
		.withMessage("Album title is required"),
	check("description")
		.exists({ checkFalsy: true })
		.withMessage("Description is required")
		.notEmpty()
		.withMessage("Description is required"),

	handleValidationErrors,
];

//get all albums

router.get("/", async (req, res) => {
	const Albums = await Album.findAll({
		order: [["title"]],
	});

	res.json({ Albums });
});

//Get details of an Album from an id

router.get("/:albumId", async (req, res) => {
	const { albumId } = req.params;
	const currentAlbum = await Album.findByPk(albumId);
	if (!currentAlbum) {
		res.statusCode = 404;
		res.json({
			message: "Album couldn't be found",
			statusCode: 404,
		});
	}
	const artist = await currentAlbum.getUser({
		attributes: {
			exclude: ["firstName", "lastName", "email"],
			include: ["previewImage"],
		},
	});
	const songs = await currentAlbum.getSongs({});

	const payload = {
		id: currentAlbum.id,
		userId: currentAlbum.userId,
		title: currentAlbum.title,
		description: currentAlbum.description,
		createdAt: currentAlbum.createdAt,
		updatedAt: currentAlbum.updatedAt,
		previewImage: currentAlbum.previewImage,
		Artist: artist,
		Songs: songs,
	};
	res.json(payload);
});

//create a album

router.post("/", requireAuth, restoreUser, validateAlbum, async (req, res) => {
	const { title, description, imageUrl } = req.body;
	const { user } = req;

	const newAlbum = await Album.create({
		userId: user.id,
		title,
		description,
		previewImage: imageUrl,
	});

	//get the album with all the attributes
	const getAlbum = await Album.findByPk(newAlbum.id);

	res.json(getAlbum);
});

//edit an album
router.put(
	"/:albumId",
	requireAuth,
	restoreUser,
	validateAlbum,
	async (req, res) => {
		const { albumId } = req.params;
		const { user } = req;
		const { title, description, imageUrl } = req.body;
		const editedAlbum = await Album.findByPk(albumId);

		//check if proper user is editing the song
		if (editedAlbum.userId !== user.id) {
			res.statusCode = 403;
			return res.json({
				message: "Forbidden",
				statusCode: res.statusCode,
			});
		}
		if (editedAlbum) {
			editedAlbum.title = title;
			editedAlbum.description = description;
			editedAlbum.previewImage = imageUrl;

			await editedAlbum.save();

			const currentAlbum = await Album.findByPk(editedAlbum.id);
			res.json(currentAlbum);
		} else {
			res.statusCode = 404;
			res.json({
				message: "Album couldn't be found",
				statusCode: 404,
			});
		}
	}
);

//delete a album
router.delete("/:albumId", requireAuth, restoreUser, async (req, res) => {
	const { albumId } = req.params;
	const { user } = req;
	const deletedAlbum = await Album.findByPk(albumId);
	if (!deletedAlbum) {
		res.statusCode = 404;
		return res.json({
			message: "Album couldn't be found",
			statusCode: 404,
		});
	}
	if (deletedAlbum.userId !== user.id) {
		res.statusCode = 403;
		return res.json({
			message: "Forbidden",
			statusCode: res.statusCode,
		});
	}

	await deletedAlbum.destroy();
	res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});
module.exports = router;
