const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Album } = require("../../db/models");
const router = express.Router();

router.get("/", async (req, res) => {
	const albums = await Album.findAll({
		order: [["title"]],
	});

	res.json(albums);
});

module.exports = router;
