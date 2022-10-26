import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../store/comments";

const CommentCreateForm = ({ songId, sessionUser }) => {
	const dispatch = useDispatch();
	const [body, setBody] = useState("");
	const userId = sessionUser?.user?.songId;

	const handleCommentUpload = (e) => {
		e.preventDefault();
		dispatch(createComment(songId, userId, body));
		setBody("");
	};

	return (
		<div className="comment-upload-container">
			<form onSubmit={handleCommentUpload}>
				<input
					type="text"
					value={body}
					placeholder="Add Comment..."
					onChange={(e) => setBody(e.target.value)}
					required
				/>
			</form>
		</div>
	);
};

export default CommentCreateForm;
