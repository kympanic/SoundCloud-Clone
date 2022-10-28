import "./SongsPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../store/songs";
import { Link } from "react-router-dom";
import PageNotFound from "../PageNotFound";

const SongsPage = () => {
	const dispatch = useDispatch();
	const allSongs = useSelector((state) => Object.values(state.songs));
	const sessionUser = useSelector((state) => state.session?.user);
	useEffect(() => {
		dispatch(getAllSongs());
	}, [dispatch]);

	if (!sessionUser) {
		return <PageNotFound />;
	}

	return (
		<div className="songs-list-full-container">
			<h1>Listen to your favorites here!</h1>

			<div>
				{allSongs.map((song) => (
					<li key={song.id} className="song-card">
						<div
							className="card-img-wrapper"
							style={{ backgroundImage: "url(" + song?.previewImage + ")" }}
						></div>
						<Link className="song-link-text" to={`/songs/${song.id}`}>
							<p>{song.title}</p>
						</Link>
						{/* <Link className="song-link-text" to={`/users/${sessionUser?.id}`}>
							<p>{sessionUser.username}</p>
						</Link> */}
					</li>
				))}
			</div>
		</div>
	);
};

export default SongsPage;
