import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comments";

const EditCommentModal = ({ setIsOpen, comment, sessionUser, songId }) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [body, setBody] = useState(comment.body);

	console.log(comment, "this is this comment");
	console.log(sessionUser, "this is the session user");
	console.log(songId, "this is the song id");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const editedReview = {
			commentId: comment.id,
			body,
			songId,
		};
		await dispatch(editComment(editedReview))
			.then(() => setIsOpen(false))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					let foundErrors = Object.values(data.errors);
					setErrors(foundErrors);
				}
			});
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>EDIT REVIEW</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<form
							className={styles.editReviewForm}
							onSubmit={handleSubmit}
						>
							<div className={styles.errors}>
								{errors.map((error, ind) => (
									<div className="error-body" key={ind}>
										<ul>
											<li className="error-item">
												{error}
											</li>
										</ul>
									</div>
								))}
							</div>
							<div className={styles.inputGroup}>
								<label>Comment: </label>
								<input
									type="text"
									name="body"
									onChange={(e) => setBody(e.target.value)}
									maxLength={200}
									value={body}
								/>
							</div>
							<div className={styles.modalActions}>
								<div className={styles.actionsContainer}>
									<button
										type="submit"
										className={styles.submitBtn}
									>
										Yes
									</button>
									<button
										className={styles.cancelBtn}
										onClick={() => setIsOpen(false)}
									>
										Cancel
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditCommentModal;
