import "./SongsPage.css";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../store/songs";
import { Link } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import { playAudio } from "../../store/audioplayer";
const SongsPage = () => {
	const dispatch = useDispatch();
	const allSongs = useSelector((state) => Object.values(state.songs));
	const sessionUser = useSelector((state) => state.session?.user);

	const songButton = useCallback(
		(song) => {
			dispatch(playAudio(song));
		},
		[dispatch]
	);
	useEffect(() => {
		dispatch(getAllSongs());
	}, [dispatch]);

	if (!sessionUser) {
		return <PageNotFound />;
	}

	return (
		<div className="song-page-background">
			<div className="songs-list-full-container">
				<h1>Listen to your favorites here!</h1>

				<div>
					{allSongs.map((song) => (
						<li key={song.id} className="song-card">
							<div
								className="card-img-wrapper"
								style={{ backgroundImage: "url(" + song?.previewImage + ")" }}
							>
								<div className="play-button-wrapper">
									<button
										className="play-button"
										onClick={() => songButton(song)}
									>
										<i className="fa-solid fa-play"></i>
									</button>
								</div>
							</div>
							<Link className="song-link-text" to={`/songs/${song.id}`}>
								<p>{song.title}</p>
							</Link>
							{/* <Link className="song-link-text" to={`/users/${song?.User?.id}`}>
								<p>{song?.User?.username}</p>
							</Link> */}
						</li>
					))}
				</div>
			</div>
		</div>
	);
};

export default SongsPage;
