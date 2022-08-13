const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//middleware to check the body for errors in signup
const validateSignup = [
	check("email")
		.exists({ checkFalsy: true })
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

// Sign up
router.post("/", validateSignup, async (req, res) => {
	const { firstName, lastName, username, email, password } = req.body;
	const user = await User.signup({
		firstName,
		lastName,
		username,
		email,
		password,
	});

	let token = await setTokenCookie(res, user);

	return res.json({
		user,
		token,
	});
});

module.exports = router;
