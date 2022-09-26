import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../store/session";
import "./SignUpFormPage.css";
function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
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

	if (sessionUser) return <Redirect to="/profile" />;

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
		<div className="form-background">
			<form className="signup-form" onSubmit={handleSubmit}>
				<h1>SignUp</h1>
				<div className="inp-container">
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="inp-container">
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="inp-container">
					<label>
						First Name
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstname(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="inp-container">
					<label>
						Last Name
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastname(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="input-container">
					<label>
						Profile Image
						<input
							type="url"
							value={profileImg}
							onChange={(e) => setProfileImg(e.target.value)}
						/>
					</label>
				</div>
				<div className="inp-container">
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="inp-container">
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit">Sign Up</button>
				<ul>
					{errorList.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			</form>
		</div>
	);
}

export default SignupFormPage;
