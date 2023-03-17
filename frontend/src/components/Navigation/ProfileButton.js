import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import "./profilebutton.css";

function ProfileButton() {
	const [showMenu, setShowMenu] = useState(false);
	const currentUser = useSelector((state) => state?.session?.user);
	const history = useHistory();
	console.log(currentUser.user);
	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	const handleClick = (e) => {
		e.preventDefault();
		history.push(`/profile/${currentUser.user.id}`);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	return (
		<div className="dropdown">
			<button className="dropbtn" onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			{showMenu && currentUser && (
				<ul className="dropdown-content">
					<li>
						<button onClick={handleClick}>Profile</button>
					</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			)}
		</div>
	);
}

export default ProfileButton;
