const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

// Sign up
router.post("/", async (req, res) => {
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
