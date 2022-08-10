const router = require("express").Router();

router.use("/session", require("./session"));
router.use("/user", require("./user"));

module.exports = router;
