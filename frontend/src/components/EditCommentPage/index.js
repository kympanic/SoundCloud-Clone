import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllComments } from "../../store/comments";
import { editComment } from "../../store/comments";
import { useDispatch } from "react-redux";
import PageNotFound from "../PageNotFound";
import "./editcomment.css";

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
	const selectedSong = useSelector((state) => state.songs[songId]);
	console.log(selectedSong, "this is the song");

	const [body, setBody] = useState(selectedComment[0]?.body);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		dispatch(getAllComments(songId));
	}, [dispatch]);

	if (!sessionUser || selectedComment[0]?.userId !== sessionUser?.user?.id) {
		return <PageNotFound />;
	}

	const handleSubmit = async (e) => {
		console.log("is this hitting");
		e.preventDefault();

		setErrors([]);

		const editedReview = {
			commentId: parseInt(commentId),
			body,
			songId,
		};
		console.log(editedReview, "this is the new review");
		await dispatch(editComment(editedReview))
			.then(() => history.push(`/songs/${songId}`))
			.catch(async (res) => {
				const data = await res.json();
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
		sessionUser &&
		selectedSong && (
			<div className="edit-page-background">
				<div className="edit-comment-container">
					<div className="comment-edit-title">
						<h1>Edit Your Comment</h1>
					</div>
					<div>
						<img src={selectedSong.previewImage} />
						<h2> {selectedSong.title}</h2>
					</div>

					<form>
						<div>
							{errors.map((error, ind) => (
								<div className="error-body" key={ind}>
									<ul>
										<li className="error-item">{error}</li>
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
							<button onClick={handleSubmit}>Edit</button>
							<button onClick={handleCancel}>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default EditCommentPage;
