import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUserComments } from "../../store/comments";
import { getAllSongs } from "../../store/songs";
import { getAllUsers } from "../../store/users";
import "./profile.css";

const ProfilePage = () => {
	const userId = useParams();
	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.session?.user?.user);
	const profileUserId = parseInt(userId?.userId);
	console.log(loggedInUser, "this is the logged inuser");

	useEffect(() => {
		dispatch(getAllSongs());
		// dispatch(getAllUserComments(profileUserId));
	}, [dispatch]);

	return (
		<div className="profile-page-container">
			{loggedInUser && (
				<div>
					<div className="profile-page-header"></div>
					{/* <div className="profile-card">
						<img
							src={selectedUser[0]?.previewImage}
							alt="profile-preview"
						/>
						<h2>{selectedUser[0].username}</h2>
					</div> */}
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
