const express = require("express");
const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { validateLogin } = require("../../middleware/validationCheck");

// Get a session user
router.get("/", restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.toSafeObject(),
		});
	} else return res.json(null);
});

// Log User In
router.post("/", validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

	const user = await User.login({ credential, password });

	if (!user) {
		res.status(401).json({
			message: "Invalid credentials",
			statusCode: res.statusCode,
		});
		return next(err);
	}

	let token = await setTokenCookie(res, user);

	let userToken = token.split(".")[2];

	const payload = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
		token: userToken,
	};

	return res.json(payload);
});

// Log User Out
router.delete("/", (req, res) => {
	res.clearCookie("token");
	return res.json({
		message: "Successfully logged out User",
	});
});
module.exports = router;
