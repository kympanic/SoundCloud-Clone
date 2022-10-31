import "./HomePage.css";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import SearchBar from "../SearchBar/index";
import LoginForm from "../LoginFormModal/LoginForm";
import "./HomePage.css";
import SignUpForm from "../SignUpFormModal/SignUpForm";
const HomePage = () => {
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session?.user);
	const allSongs = useSelector((state) => Object.values(state.songs));
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);

	let homeBottom;

	const handleClick = (e) => {
		e.preventDefault();
		history.push("/upload/song");
	};

	if (sessionUser) {
		homeBottom = (
			<div className="home-bottom-list-container">
				<li className="home-bottom-list">
					<Link to={"#"}>Directory-</Link>
					<Link to={"#"}>About us-</Link>
					<Link to={"#"}>Artist Resources-</Link>
					<Link to={"#"}>Blog-</Link>
					<Link to={"#"}>Jobs-</Link>
					<Link to={"#"}>Developers-</Link>
					<Link to={"#"}>Help-</Link>
					<Link to={"#"}>Legal-</Link>
					<Link to={"#"}>Do not sell my personal information-</Link>
					<Link to={"#"}>Privacy-</Link>
					<Link to={"#"}>Cookie Policy-</Link>
					<Link to={"#"}>Cookie Manager-</Link>
					<Link to={"#"}>Imprint-</Link>
					<Link to={"#"}>Charts</Link>
				</li>
			</div>
		);
	} else {
		homeBottom = (
			<div id="home-bot-footer-container">
				<button
					className="home-bot-signupbtn"
					onClick={() => setShowSignUpModal(true)}
				>
					Create account
				</button>
				{showSignUpModal && (
					<Modal onClose={() => setShowSignUpModal(false)}>
						<SignUpForm />
					</Modal>
				)}
				<div>
					<p id="homebottom-account-p">Already have an account?</p>
					<button
						className="home-bot-loginbtn"
						onClick={() => setShowLoginModal(true)}
					>
						Log In
					</button>
					{showLoginModal && (
						<Modal onClose={() => setShowLoginModal(false)}>
							<LoginForm />
						</Modal>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="home-page-background">
			<div className="home-page-wrapper">
				<div className="header-container">
					<h1 id="header-title">What's next in Kpop is first on KWave</h1>
					<p id="header-p">
						Upload your first track and begin your journey. KWave gives you
						space to create, find your fans, and connect with other Kpop
						enthusiasts.
					</p>
					<button id="header-btn" onClick={handleClick}>
						Upload Today
					</button>
				</div>
				<div className="homepage-song-container">
					<div className="homepage-search-wrapper">
						<SearchBar />
						<p id="homepage-or">or</p>
						<button id="homepage-search-upload-btn" onClick={handleClick}>
							Upload Your Own
						</button>
					</div>
					<p id="homepage-songcontainer-title">
						Hear what is trending for free in the KWave community
					</p>
					<div className="homepage-songs-list">
						{allSongs?.map((song) => (
							<li key={song.id} className="homepage-song-card">
								<div
									className="homepage-card-img-wrapper"
									style={{ backgroundImage: "url(" + song?.previewImage + ")" }}
								></div>
								<p className="homepage-songcard-text">{song?.title}</p>
							</li>
						))}
					</div>
				</div>
				<div className="homepage-middle-container">
					<div className="homepage-middle-left-container"></div>
					<div className="homepage-middle-right-container">
						<h2 id="homepage-middle-title">Never Stop Listening</h2>
						<p id="homepage-middle-p">
							Kwave is available on Web, iOS, Android, Sonos, Chromecast, and
							Xbox One
						</p>
						<div id="homepage-middle-icons">
							<img
								src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/googleimgfixed.png"
								alt="google-icon"
							/>
							<img
								src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/appleiconfixed.png"
								alt="apple-icon"
							/>
						</div>
					</div>
				</div>
				<div className="homepage-bottom-container">
					<p id="homepage-bottom-title">Thanks for listening. Now join in.</p>
					<p id="homepage-bottom-content">
						Save tracks, follow artists and build playlists. All for free.
					</p>
					{homeBottom}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
