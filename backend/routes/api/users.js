const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//middleware to check the body for errors in signup
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

// Sign up
router.post("/", validateSignup, async (req, res) => {
	const { firstName, lastName, username, email, password } = req.body;
	//create the user
	const user = await User.signup({
		firstName,
		lastName,
		username,
		email,
		password,
	});

	let token = await setTokenCookie(res, user);
	let userToken = token.split(".")[0];

	//building up the successful response
	const payload = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email,
		token: userToken,
	};

	return res.json(payload);
});

module.exports = router;
