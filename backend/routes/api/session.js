const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

// Log User In
router.post("/", async (req, res, next) => {
	const { credential, password } = req.body;

	const user = await User.login({ credential, password });

	if (!user) {
		const err = new Error("Login failed");
		err.status = 401;
		err.title = "Login failed";
		err.errors = ["The provided credentials were invalid."];
		return next(err);
	}

	let token = await setTokenCookie(res, user);

	return res.json({
		user,
		token,
	});
});

// Log User Out
router.delete("/", (req, res) => {
	res.clearCookie("token");
	return res.json({
		message: "Successfully logged out User",
	});
});
module.exports = router;
