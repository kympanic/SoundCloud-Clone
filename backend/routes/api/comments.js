const express = require("express");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
// const { Comment } = require("../../db/models");
const router = express.Router();
const { validateComments } = require("../../middleware/validationCheck");
// const { User, Song, Album, Comment } = db;
const db = require("../../db/models");
const { User, Song, Album, Comment } = db;

//edit a comment
router.put(
	"/:commentId",
	requireAuth,
	restoreUser,
	validateComments,
	async (req, res) => {
		const { user } = req;
		const { body, songId, commentId } = req.body;
		const editedComment = await Comment.findByPk(commentId);
		if (!editedComment) {
			return res.status(404).json({
				message: "Comment couldn't be found",
				statusCode: 404,
			});
		}
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
		const comments = await Comment.findAll({
			where: { songId: songId },
		});
	}
);

//delete a comment
router.delete("/:commentId", requireAuth, restoreUser, async (req, res) => {
	// const { commentId } = req.params;
	const { user } = req;
	const { commentId, songId } = req.body;
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

	const comments = await Comment.findAll({
		where: { songId: songId },
		include: [
			{
				model: User,
			},
		],
		order: [["createdAt", "DESC"]],
	});

	return res.json({ comments });
});

module.exports = router;
