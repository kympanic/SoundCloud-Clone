import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createSong } from "../../store/songs";
import PageNotFound from "../PageNotFound";
import "./uploadsongpage.css";

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

	const images = [
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/twice_fancy_you_concept_all_1.jpeg",
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/3852877.jpeg",
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/HD-wallpaper-kpop-girls-stan-girls-group-itzy-lesbian-mamamoo-red-velvet-twice.jpeg",
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/dreamcatcher.jpeg",
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/random.jpeg",
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/twice-regal.jpeg",
	];

	// const random = images[Math.floor(Math.random() * images.length)];

	const random = Math.floor(Math.random() * images.length);
	if (!sessionUser) {
		return <PageNotFound />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors([]);

		if (imageUrl)
			setImageUrl(
				"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/image-not-found.jpeg"
			);

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
		<div className="upload-page-background">
			<div id="upload-form-text">
				<h2>Upload Your New Song</h2>
			</div>
			<div className="upload-form-container">
				<div className="upload-form-wrapper-left">
					<form onSubmit={handleSubmit}>
						<div className="upload-input-container">
							<label htmlFor="title">Title:</label>
							<input
								type="text"
								name="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="upload-input-container">
							<label htmlFor="url">Audio Url:</label>
							<input
								type="url"
								name="url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>
						<div className="upload-input-container">
							<label htmlFor="imageUrl">Image Url:</label>
							<input
								type="url"
								name="imageUrl"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							/>
						</div>
						<div className="upload-input-container">
							<label htmlFor="description">Description:</label>
							<input
								type="text"
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className="upload-button-container">
							<button id="upload-submit-button" type="submit">
								Upload
							</button>
							<Link id="upload-cancel-button" to={"/songs"}>
								Cancel
							</Link>
						</div>
						<ul className="upload-error-list">
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</form>
				</div>
				<div className="upload-form-wrapper-right">
					<div className="upload-img-wrapper">
						<img src={images[random]} alt="twice-upload-img" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadSongPage;
