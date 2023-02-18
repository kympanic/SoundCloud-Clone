import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editSong, getAllSongs } from "../../store/songs";
import { useDispatch } from "react-redux";
import PageNotFound from "../PageNotFound";
import "./editsongpage.css";

const EditSongPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { songId } = useParams();
	//took out one ? in front of the session
	const sessionUser = useSelector((state) => state.session?.user);
	const song = useSelector((state) => state.songs[songId]);

	const [title, setTitle] = useState(song?.title);
	const [description, setDescription] = useState(song?.description);
	const [url, setUrl] = useState(song?.url);
	const [imageUrl, setImageUrl] = useState(song?.previewImage);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		dispatch(getAllSongs());
	}, [dispatch]);

	if (!sessionUser || song?.userId !== sessionUser?.user?.id) {
		return <PageNotFound />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors([]);

		const editedSong = {
			...song,
			title,
			description,
			url,
			imageUrl,
		};

		await dispatch(editSong(editedSong))
			.then(() => history.push(`/songs/${song?.id}`))
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
		history.push(`/songs/${song.id}`);
	};

	return (
		sessionUser && (
			<div className="edit-page-background">
				<div id="edit-form-text">
					<h2>Edit Your Song</h2>
				</div>
				<div className="edit-form-container">
					<div className="edit-form-wrapper-left">
						<form onSubmit={handleSubmit}>
							<div className="edit-input-container">
								<label htmlFor="title">Title:</label>
								<input
									type="text"
									value={title}
									name="title"
									onChange={(e) => setTitle(e.target.value)}
									// required
								/>
							</div>
							<div className="edit-input-container">
								<label htmlFor="description">
									Description:
								</label>
								<input
									type="text"
									name="description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</div>
							<div className="edit-input-container">
								<label htmlFor="url">Audio Url:</label>
								<input
									type="url"
									value={url}
									name="url"
									onChange={(e) => setUrl(e.target.value)}
								/>
							</div>
							<div className="edit-input-container">
								<label htmlFor="imageurl">Image Url</label>
								<input
									type="url"
									value={imageUrl}
									name="imageUrl"
									onChange={(e) =>
										setImageUrl(e.target.value)
									}
								/>
							</div>
							<div className="edit-button-container">
								<button id="edit-submit-button" type="submit">
									Edit
								</button>
								<button
									id="edit-cancel-button"
									onClick={handleCancel}
								>
									Cancel
								</button>
							</div>
							<ul className="edit-error-list">
								{errors.map((error, idx) => (
									<li key={idx}>{error}</li>
								))}
							</ul>
						</form>
					</div>
					<div className="edit-form-wrapper-right">
						<div className="edit-img-wrapper">
							<img src={song?.previewImage} alt="songimg" />
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default EditSongPage;
