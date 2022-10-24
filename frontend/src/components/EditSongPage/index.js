import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editSong, getAllSongs } from "../../store/songs";
import { useDispatch } from "react-redux";
import PageNotFound from "../PageNotFound";

const EditSongPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { songId } = useParams();
	const sessionUser = useSelector((state) => state?.session?.user);
	const song = useSelector((state) => state.songs[songId]);

	const [title, setTitle] = useState(song?.title);
	const [description, setDescription] = useState(song?.description);
	const [url, setUrl] = useState(song?.url);
	const [previewImage, setPreviewImage] = useState(song?.previewImage);
	// const [errors, setErrors] = useState([]);

	useEffect(() => {
		dispatch(getAllSongs());
	}, [dispatch]);

	if (!sessionUser || song?.userId !== sessionUser?.user?.id) {
		return <PageNotFound />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const editedSong = {
			...song,
			title,
			description,
			url,
			previewImage,
		};
		dispatch(editSong(editedSong));
		history.push(`/songs/${song.id}`);
	};
	const handleCancel = (e) => {
		e.preventDefault();
		history.push(`/songs/${song.id}`);
	};

	return (
		sessionUser && (
			<form onSubmit={handleSubmit}>
				<h1>Edit Song</h1>
				<div className="input-container">
					<label>
						Title
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="input-container">
					<label>
						Description
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="input-container">
					<label>
						Audio Url
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="input-container">
					<label>
						Image Url
						<input
							type="url"
							value={previewImage}
							onChange={(e) => setPreviewImage(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
					<button type="submit">Edit Song</button>
					<button onClick={handleCancel}>Cancel</button>
				</div>
				{/* <ul>
					{errorList.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
			</form>
		)
	);
};

export default EditSongPage;
