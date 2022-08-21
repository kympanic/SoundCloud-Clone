const express = require("express");
const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//middleware to check login -will move
const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.withMessage("Email or username is required.")
		.notEmpty()
		.withMessage("Email or username is required."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password.")
		.notEmpty()
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

// Get a session user
router.get("/", requireAuth, restoreUser, async (req, res) => {
	const { user } = req;
	const currentUser = await User.findByPk(user.id);

	res.json(currentUser);
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
	let userToken = token.split(".")[0];

	console.log(token);
	const payload = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.email,
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
