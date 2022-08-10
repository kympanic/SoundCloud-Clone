const router = require("express").Router();

router.use("/session", require("./session"));

module.exports = router;
