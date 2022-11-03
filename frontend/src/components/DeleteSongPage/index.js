import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "../PageNotFound";
import { removeSong } from "../../store/songs";
import { Link, useHistory, useParams } from "react-router-dom";
import "./deletesongpage.css";
const DeleteSongPage = () => {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const song = useSelector((state) => state.songs[songId]);
	const sessionUser = useSelector((state) => state.session?.user);

	if (!sessionUser || song?.userId !== sessionUser?.user?.id) {
		return <PageNotFound />;
	}

	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(removeSong(song.id));
		history.push("/songs");
	};

	return (
		<div className="delete-form-container">
			<div id="delete-song-wrapper">
				<div id="delete-song-img"></div>
				<p id="delete-song-title">Would you like to delete this Song?</p>
				<h1 id="delete-song-name">{song.title}</h1>
				<div className="delete-buttons-wrapper">
					<button id="delete-btn" onClick={handleDelete}>
						Delete
					</button>
					<Link id="cancel-delete-btn" to={`/songs/${song.id}`}>
						Cancel
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DeleteSongPage;
