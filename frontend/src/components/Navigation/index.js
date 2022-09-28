// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";
// const Navigation = ({ isLoaded }) => {
// 	const currentUser = useSelector((state) => state.session.user);
// 	console.log(isLoaded);
// 	return (
// 		<div className="nav-wrapper">
// 			<nav className=".nav">
// 				<ul>
// 					<li className="nav-logo">
// 						<NavLink exact to="/">
// 							<img
// 								src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/%E2%80%94Pngtree%E2%80%94kpop+color+graphic+logo+south_6607272.png"
// 								alt="nav-logo"
// 							/>
// 						</NavLink>
// 					</li>
// 					<li>
// 						<NavLink exact to="/songs">
// 							All Songs
// 						</NavLink>
// 					</li>
// 					<li>
// 						<NavLink exact to="/upload">
// 							Upload
// 						</NavLink>
// 					</li>
// 				</ul>
// 				{currentUser && (
// 					<div>
// 						<ProfileButton currentUser={currentUser} />
// 					</div>
// 				)}
// 				{!currentUser && (
// 					<ul>
// 						<li>
// 							<NavLink to={"/signup"}>Signup</NavLink>
// 						</li>
// 						<li>
// 							<NavLink to={"/login"}>Login</NavLink>
// 						</li>
// 					</ul>
// 				)}
// 			</nav>
// 		</div>
// 	);
// };

// export default Navigation;

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	let sessionLinks;
	console.log(sessionUser);
	if (sessionUser) {
		sessionLinks = <ProfileButton />;
	} else {
		sessionLinks = (
			<>
				<NavLink to="/login">Log In</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
			</>
		);
	}

	return (
		<ul>
			<li>
				<NavLink exact to="/">
					Home
				</NavLink>
				{isLoaded && sessionLinks}
			</li>
		</ul>
	);
}

export default Navigation;
