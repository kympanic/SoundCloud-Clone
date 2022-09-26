import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";

const LogoutButton = () => {
	const dispatch = useDispatch();

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<>
			<button onClick={logout}>
				<Link to={"/"}>Log Out</Link>
			</button>
		</>
	);
};

export default LogoutButton;
