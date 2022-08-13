const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//middleware to check login
const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Please provide a valid email or username."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

// Restore session user
router.get("/", restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.toSafeObject(),
		});
	} else return res.json({});
});

// Log User In
router.post("/", validateLogin, async (req, res, next) => {
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
