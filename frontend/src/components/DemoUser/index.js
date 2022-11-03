import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import "./demobutton.css";

const DemoUser = () => {
	const dispatch = useDispatch();

	const user = {
		credential: "Panicky",
		password: "password",
	};

	const handleClick = (e) => {
		e.preventDefault();
		return dispatch(login(user));
	};
	return (
		<button className="demo-btn" onClick={handleClick}>
			Demo
		</button>
	);
};

export default DemoUser;
