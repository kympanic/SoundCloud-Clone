const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { User, Song, Album, Comment } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

//edit a comment
//requires validation
router.put("/:commentId", requireAuth, restoreUser, async (req, res) => {
	const { commentId } = req.params;
	const { user } = req;
	const { body } = req.body;
	const editedComment = await Comment.findByPk(commentId);

	//check if proper user is editing the song
	if (editedComment.userId !== user.id) {
		res.statusCode = 403;
		return res.json({
			message: "Forbidden",
			statusCode: res.statusCode,
		});
	}
	if (editedComment) {
		editedComment.body = body;
	}
	await editedComment.save();
	res.json(editedComment);
});

//delete a comment
router.delete("/:commentId", requireAuth, restoreUser, async (req, res) => {
	const { commentId } = req.params;
	const { user } = req;
	const deletedComment = await Comment.findByPk(commentId);
	//check to see if comment exists
	if (!deletedComment) {
		res.statusCode = 404;
		return res.json({
			message: "Comment couldn't be found",
			statusCode: 404,
		});
	}
	//check to see if the song belongs to the logged in user
	if (deletedComment.userId !== user.id) {
		res.statusCode = 403;
		return res.json({
			message: "Forbidden",
			statusCode: res.statusCode,
		});
	}

	await deletedComment.destroy();
	res.json({
		message: "Successfully deleted",
		statusCode: 200,
	});
});

module.exports = router;
