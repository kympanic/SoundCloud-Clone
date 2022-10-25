import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createSong } from "../../store/songs";
import PageNotFound from "../PageNotFound";

const UploadSongPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const userId = sessionUser?.user?.id;
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);

	if (!sessionUser) {
		return <PageNotFound />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors([]);

		const newSong = {
			userId,
			title,
			url,
			imageUrl,
			description,
		};

		dispatch(createSong(newSong))
			.then(() => history.push("/songs"))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					let foundErrors = Object.values(data.errors);
					setErrors(foundErrors);
				}
			});
		setTitle("");
		setUrl("");
		setImageUrl("");
		setDescription("");
	};

	return (
		<div>
			<h2>Upload Your New Song</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<h1>PLACEHOLDER</h1>
					<h1>PLACEHOLDER</h1>
					<h1>PLACEHOLDER</h1>
				</div>
				<div className="input-container">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="url">Audio Url</label>
					<input
						type="url"
						name="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="imageUrl">Image Url</label>
					<input
						type="url"
						name="imageUrl"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="form-button-container">
					<button type="submit">Upload</button>
					<Link to={"/"}>Cancel</Link>
				</div>
				<ul className="error-list">
					{errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			</form>
		</div>
	);
};

export default UploadSongPage;
