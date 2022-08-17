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

module.exports = router;
