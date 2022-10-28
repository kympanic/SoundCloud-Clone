import { removeComment } from "../../store/comments";
import { useDispatch } from "react-redux";

const CommentSection = ({ songId, comment, sessionUser }) => {
	const dispatch = useDispatch();

	return (
		<div className="comments-container">
			<div>{comment?.User?.username}</div>
			<div>{comment?.body}</div>

			{sessionUser?.user?.id === comment?.User?.id && (
				<div className="comments-buttons">
					<i class="fa-solid fa-pen-to-square"></i>
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
	);
};

export default CommentSection;
