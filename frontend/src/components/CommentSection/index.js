import { removeComment } from "../../store/comments";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import "./commentsection.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CommentSection = ({ songId, comment, sessionUser }) => {
	const dispatch = useDispatch();
	// const [isOpenEdit, setIsOpenEdit] = useState(false);
	const history = useHistory();
	console.log(comment, "this is this comment");
	console.log(sessionUser, "this is the session user");
	console.log(songId, "this is the song id");

	const handleClick = (e) => {
		e.preventDefault();
		history.push({
			pathname: `/comments/${comment.id}/edit`,
			state: { songId },
		});
	};

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
									removeComment(
										songId,
										comment?.id,
										sessionUser?.user?.id
									)
								)
							}
						></i>
						<FontAwesomeIcon
							className="comment-edit-btn"
							icon={faPenToSquare}
							onClick={handleClick}
						/>
						{/* {isOpenEdit && (
							<EditCommentModal
								setIsOpen={setIsOpenEdit}
								comment={comment}
								sessionUser={sessionUser}
								songId={songId}
							/>
						)} */}
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
