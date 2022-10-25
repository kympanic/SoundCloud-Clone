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
			<form onSubmit={handleSubmit}>
				<h1>Edit Song</h1>
				<div className="input-container">
					<label>
						Title
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							// required
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
							// required
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
							// required
						/>
					</label>
				</div>
				<div className="input-container">
					<label>
						Image Url
						<input
							type="url"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							// required
						/>
					</label>
				</div>
				<div>
					<button type="submit">Edit Song</button>
					<button onClick={handleCancel}>Cancel</button>
				</div>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			</form>
		)
	);
};

export default EditSongPage;
