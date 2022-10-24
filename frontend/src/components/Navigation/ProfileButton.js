import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

function ProfileButton() {
	const [showMenu, setShowMenu] = useState(false);
	const currentUser = useSelector((state) => state.session.user);
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

	return (
		<>
			<button onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			{showMenu && (
				<ul className="profile-dropdown">
					<li>{currentUser?.username}</li>
					<li>{currentUser?.email}</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
