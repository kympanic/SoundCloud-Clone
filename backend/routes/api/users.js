const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { validateSignup } = require("../../middleware/validationCheck");

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
