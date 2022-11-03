import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal";
import DemoUser from "../DemoUser";
import "./Navigation.css";

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
		<nav className="nav-bar-wrapper">
			<ul className="nav-links">
				<li className="nav-items">
					<NavLink className="nav-btn" exact to="/">
						<img
							id="nav-logo"
							src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/logo.png"
							alt="logo"
						/>
					</NavLink>
				</li>
				<li className="nav-items">
					<NavLink className="nav-btn" exact to="/">
						Home
					</NavLink>
				</li>
				<li className="nav-items">
					<NavLink className="nav-btn" exact to="/songs">
						Library
					</NavLink>
				</li>
				<li className="nav-items">
					<NavLink className="nav-btn" exact to="/upload/song">
						Upload
					</NavLink>
				</li>
				<li className="nav-items">{isLoaded && sessionLinks}</li>
			</ul>
		</nav>
	);
}

export default Navigation;
