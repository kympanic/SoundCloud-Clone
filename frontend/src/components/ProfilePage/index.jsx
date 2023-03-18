import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUserComments } from "../../store/comments";
import { getAllSongs } from "../../store/songs";
import { getAllUsers } from "../../store/users";

const ProfilePage = () => {
	const userId = useParams();
	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.session?.user?.user);
	const profileUserId = parseInt(userId?.userId);
	const allUsers = useSelector((state) => Object.values(state.users));
	const selectedUser = allUsers.filter((user) => {
		return user.id === profileUserId;
	});
	console.log(loggedInUser, "this is the logged inuser");
	console.log(allUsers, "these are all the users");
	console.log(selectedUser, "this is the selected user");
	useEffect(() => {
		dispatch(getAllSongs());
		dispatch(getAllUserComments(profileUserId));
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<div>
			<h1>This is the profile page!</h1>
			<h1>This is the profile page!</h1>
			<h1>This is the profile page!</h1>
			<h1>This is the profile page!</h1>
			<h1>This is the profile page!</h1>
			<h1>This is the profile page!</h1>
			<h1>This is the profile page!</h1>
			<h1>This is the profile page!</h1>
		</div>
	);
};

export default ProfilePage;
