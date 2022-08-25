const {
	handleValidationErrors,
	checkUserEmail,
} = require("../utils/validation");
const { check, query } = require("express-validator");
const { User } = require("../db/models");

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

const validatePlaylist = [
	check("name")
		.exists({ checkFalsy: true })
		.withMessage("Playlist name is required")
		.notEmpty()
		.withMessage("Playlist name is required"),
	handleValidationErrors,
];

const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.withMessage("Email or username is required")
		.notEmpty()
		.withMessage("Email or username is required"),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Password is required")
		.notEmpty()
		.withMessage("Password is required"),
	handleValidationErrors,
];

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

const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
		.withMessage("Invalid email")
		.isEmail()
		.withMessage("Invalid email"),
	check("username")
		.exists({ checkFalsy: true })
		.withMessage("Username is required"),
	check("username").not().isEmail().withMessage("Username cannot be an email."),
	check("password")
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage("Password must be 6 characters or more."),
	check("firstName")
		.exists({ checkFalsy: true })
		.withMessage("First Name is required"),
	check("lastName")
		.exists({ checkFalsy: true })
		.withMessage("Last Name is required"),
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
const validateComments = [
	check("body")
		.exists({ checkFalsy: true })
		.withMessage("Comment body text is required")
		.notEmpty()
		.withMessage("Comment body text is required"),
	handleValidationErrors,
];

const validateUserEmail = [
	check("email").custom((value) => {
		return User.findOne({ where: { email: value } }).then((user) => {
			if (user) {
				return Promise.reject("User with that email already exists");
			}
		});
	}),
	check("username").custom((value) => {
		return User.findOne({ where: { username: value } }).then((user) => {
			if (user) {
				return Promise.reject("User with that username already exists");
			}
		});
	}),
	checkUserEmail,
];

module.exports = {
	validateAlbum,
	validateLogin,
	validatePlaylist,
	validateQuery,
	validateSignup,
	validateSong,
	validateComments,
	validateUserEmail,
};
