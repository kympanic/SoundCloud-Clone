import { removeComment } from "../../store/comments";
import { useDispatch } from "react-redux";
import "./commentsection.css";

const CommentSection = ({ songId, comment, sessionUser }) => {
	const dispatch = useDispatch();

	return (
		<div className="comments-container">
			<div className="comments-user-body">
				<div className="comments-user-info">
					<div>{comment?.User?.username}</div>
				</div>
				<div>{comment?.body}</div>
				{sessionUser?.user?.id === comment?.User?.id && (
					<div className="comments-buttons">
						<i
							className="fas fa-trash-alt delete__btn"
							onClick={() =>
								dispatch(
									removeComment(songId, comment?.id, sessionUser?.user?.id)
								)
							}
						></i>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
