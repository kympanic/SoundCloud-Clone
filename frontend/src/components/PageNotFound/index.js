import { Link } from "react-router-dom";
import "./pagenotfound.css";

const PageNotFound = () => {
	return (
		<div className="page-not-found-container">
			<div id="page-not-found-wrapper">
				<div id="page-not-found-img"></div>
				<p id="page-not-found-title">Oops! You seem to be lost.</p>
				<p id="page-not-found-p">
					You need to login or signup to view this page. Lets get you back on
					the right track
				</p>
				<Link id="page-not-found-btn" to="/">
					Home
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
