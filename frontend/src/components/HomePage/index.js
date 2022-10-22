import "./HomePage.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const HomePage = () => {
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	let header;

	const handleClick = (e) => {
		e.preventDefault();
		history.push("/upload");
	};

	if (sessionUser) {
		history.push("/profile");
	} else {
		header = (
			<div className="header-container">
				<h1>What's next in Kpop is first on KWave</h1>
				<p>
					Upload your first track and begin your journey. KWave gives you space
					to create, find your fans, and connect with other Kpop enthusiasts.
				</p>
				<button onClick={handleClick}>Upload Today</button>
			</div>
		);
	}

	return (
		<div>
			<div>{header}</div>
			<div>
				<h1>Discover Tracks and Playlists</h1>
			</div>
			<div>
				<h2>New Music Now</h2>
				<h2>Songs placeholder</h2>
			</div>
			<div>
				<h2>Hot Playlists</h2>
				<h2>Playlist placeholder</h2>
			</div>
		</div>
	);
};

export default HomePage;
