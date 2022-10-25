import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "../PageNotFound";
import { deleteSong } from "../../store/songs";
import { Link, useHistory, useParams } from "react-router-dom";
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
		dispatch(deleteSong(song.id));
		history.push("/songs");
	};

	return (
		<div className="delete-form-container">
			<div className="delete-song-text">
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>Would you like to delete this Song?</h1>
				<h2>{song.title}</h2>
			</div>
			<div className="delete-buttons-wrapper">
				<button onClick={handleDelete}>Delete</button>
				<Link to={`/songs/${song.id}`}>Cancel</Link>
			</div>
		</div>
	);
};

export default DeleteSongPage;
