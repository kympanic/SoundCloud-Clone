const express = require("express");
const router = express.Router();

//test
router.get("/", (req, res) => {
	res.send("test");
});

module.exports = router;
