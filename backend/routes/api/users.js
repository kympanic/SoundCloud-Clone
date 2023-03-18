const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const {
	validateSignup,
	validateUserEmail,
} = require("../../middleware/validationCheck");

// Sign up

//get all users
router.get("/", restoreUser, async (req, res) => {
	const users = await User.findAll({
		order: [["createdAt", "DESC"]],
	});
	return res.json({
		users,
	});
});

router.post("/", validateSignup, validateUserEmail, async (req, res) => {
	const { firstName, lastName, username, email, password, previewImage } =
		req.body;
	//create the user
	const user = await User.signup({
		firstName,
		lastName,
		username,
		email,
		password,
		previewImage,
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
		previewImage: user.previewImage,
	};

	return res.json(payload);
});

module.exports = router;
