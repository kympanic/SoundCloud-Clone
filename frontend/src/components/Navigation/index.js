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
					<li className="nav-logo">
						<NavLink exact to="/">
							<img
								src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/%E2%80%94Pngtree%E2%80%94kpop+color+graphic+logo+south_6607272.png"
								alt="nav-logo"
							/>
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/songs">
							Library
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/upload/song">
							Upload
						</NavLink>
					</li>
					<SearchBar />
					<li>{isLoaded && sessionLinks}</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
