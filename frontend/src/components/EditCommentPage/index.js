import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllComments } from "../../store/comments";
import { editComment } from "../../store/comments";
import { useDispatch } from "react-redux";
import PageNotFound from "../PageNotFound";

const EditCommentPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { commentId } = useParams();
	const sessionUser = useSelector((state) => state.session?.user);
	const comments = useSelector((state) => Object.values(state.comments));
	const location = useLocation();
	const songId = parseInt(location.state.songId);
	const selectedComment = comments.filter((comment) => {
		return parseInt(comment?.id) === parseInt(commentId);
	});

	// const completedTriviaPackages = allUserTriviaPackages.filter(
	// 	(triviapackage) => {
	// 		return triviapackage?.trivias?.length >= 14;
	// 	}
	// );
	const [body, setBody] = useState(selectedComment[0]?.body);

	const [errors, setErrors] = useState([]);
	console.log(typeof commentId, typeof commentId);
	console.log(comments, "this is the comments");
	console.log(selectedComment, "this should be the right comment");
	console.log(songId, "hello");
	console.log(sessionUser, "this is the session user");
	// console.log(comment, "this is the comment");
	useEffect(() => {
		dispatch(getAllComments(songId));
	}, [dispatch]);

	if (!sessionUser || selectedComment[0]?.userId !== sessionUser?.user?.id) {
		return <PageNotFound />;
	}

	const handleSubmit = async (e) => {
		console.log("is this hitting");
		e.preventDefault();

		const editedReview = {
			commentId: parseInt(commentId),
			body,
			songId,
		};
		await dispatch(editComment(editedReview))
			.then(() => history.push(`/songs/${songId}`))
			.catch(async (res) => {
				const data = await res.json();
				console.log(data);
				if (data && data.errors) {
					let foundErrors = Object.values(data.errors);
					setErrors(foundErrors);
				}
			});
	};

	const handleCancel = (e) => {
		e.preventDefault();
		history.push(`/songs/${songId}`);
	};

	return (
		sessionUser && (
			<div className="edit-page-background">
				<div id="edit-form-text">
					<h2>Edit Your Song</h2>
				</div>
				<div className="edit-form-container">
					<div className="edit-form-wrapper-left">
						<form>
							<div>
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
							<div>
								<label>Comment: </label>
								<input
									type="text"
									name="body"
									onChange={(e) => setBody(e.target.value)}
									maxLength={200}
									value={body}
								/>
							</div>
							<div>
								<div>
									<button onClick={handleSubmit}>Edit</button>
									<button onClick={handleCancel}>
										Cancel
									</button>
								</div>
							</div>
						</form>
					</div>
					{/* <div className="edit-form-wrapper-right">
						<div className="edit-img-wrapper">
							<img src={song?.previewImage} alt="songimg" />
						</div>
					</div> */}
				</div>
			</div>
		)
	);
};

export default EditCommentPage;
