const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./user.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/user", usersRouter);

module.exports = router;
