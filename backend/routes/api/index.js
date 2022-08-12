const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

//tests
// const { requireAuth } = require("../../utils/auth.js");
// router.get("/require-auth", requireAuth, (req, res) => {
// 	return res.json(req.user);
// });

// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");
// router.get("/set-token-cookie", async (_req, res) => {
// 	const user = await User.findOne({
// 		where: {
// 			username: "Panicky",
// 		},
// 	});
// 	setTokenCookie(res, user);
// 	return res.json({ user });
// });

router.use("/session", require("./session"));
router.use("/user", require("./user"));

module.exports = router;
