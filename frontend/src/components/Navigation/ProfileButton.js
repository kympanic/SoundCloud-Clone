import React, { useState, useEffect } from "react";

import LogoutButton from "./LogoutButton";

function ProfileButton({ currentUser }) {
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	console.log(currentUser);

	return (
		<>
			<button onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			{showMenu && (
				<ul className="profile-dropdown">
					<li>{currentUser.username}</li>
					<li>{currentUser.email}</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
