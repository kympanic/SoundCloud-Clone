const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Song } = require("../../db/models");

const router = express.Router();

//get all songs
router.get("/", async (req, res) => {
	let songs = await Song.findAll({
		order: [["title"]],
	});

	res.json(songs);
});

module.exports = router;
