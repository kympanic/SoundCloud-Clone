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

//get all albums

router.get("/", async (req, res) => {
	const Albums = await Album.findAll({
		order: [["title"]],
	});

	res.json({ Albums });
});

//create a album

router.post("/", requireAuth, restoreUser, async (req, res) => {
	const { title, description, imageUrl } = req.body;
	const { user } = req;
	const newAlbum = await Album.create({
		userId: user.id,
		title,
		description,
		previewImage: imageUrl,
	});
	res.json(newAlbum);
});

module.exports = router;
