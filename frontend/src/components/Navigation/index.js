import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal";
import DemoUser from "../DemoUser";
import "./Navigation.css";
import SearchBar from "../SearchBar";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	let sessionLinks;

	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<SignUpFormModal />
				<DemoUser />
			</>
		);
	}

	return (
		<nav>
			<div className="nav-bar">
				<ul className="nav-links">
					<li id="nav-logo">
						<NavLink exact to="/">
							<img
								src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/%E2%80%94Pngtree%E2%80%94kpop+color+graphic+logo+south_6607272.png"
								alt="nav-logo"
							/>
						</NavLink>
					</li>
					<li id="nav-home-link">
						<NavLink exact to="/">
							Home
						</NavLink>
					</li>
					<li id="nav-library-link">
						<NavLink exact to="/songs">
							Library
						</NavLink>
					</li>
					<SearchBar />
					<li id="nav-upload-link">
						<NavLink exact to="/upload/song">
							Upload
						</NavLink>
					</li>
					<li id="nav-profile-link">{isLoaded && sessionLinks}</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
