import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
	const history = useHistory();

	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) {
		history.push("/");
	}

	return (
		sessionUser && (
			<>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
			</>
		)
	);
};

export default ProfilePage;
