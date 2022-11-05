import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/session";
import "./SignUpFormPage.css";

function SignUpForm() {
	const dispatch = useDispatch();
	// const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	//
	const [firstName, setFirstname] = useState("");
	const [lastName, setLastname] = useState("");
	const [profileImg, setProfileImg] = useState("");
	//
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				signup({
					email,
					username,
					password,
					lastName,
					firstName,
					profileImg,
				})
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		}
		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	let errorList = Object.values(errors);

	return (
		<form className="signup-form" onSubmit={handleSubmit}>
			<div id="signup-form-pic"></div>
			<h1 id="signup-form-title">SignUp</h1>
			<div className="signup-input-container">
				<label>Email</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className="signup-input-container">
				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>
			<div className="signup-input-container">
				<label>First Name</label>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstname(e.target.value)}
					required
				/>
			</div>
			<div className="signup-input-container">
				<label>Last Name</label>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastname(e.target.value)}
					required
				/>
			</div>
			<div className="signup-input-container">
				<label>Profile Image</label>
				<input
					type="url"
					value={profileImg}
					onChange={(e) => setProfileImg(e.target.value)}
				/>
			</div>
			<div className="signup-input-container">
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<div className="signup-input-container">
				<label>Confirm Password</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
			</div>
			<button id="signup-form-btn" type="submit">
				Sign Up
			</button>
			<ul>
				{errorList.map((error, idx) => (
					<li id="login-form-errors" key={idx}>
						{error}
					</li>
				))}
			</ul>
		</form>
	);
}

export default SignUpForm;
