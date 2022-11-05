import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import "./LoginFormPage.css";

function LoginForm() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.message) setErrors(data.message);
			}
		);
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div id="login-form-pic"></div>
			<h1 id="login-form-title">Login</h1>
			<div className="input-container">
				<label htmlFor="credential">Username or Email</label>
				<input
					type="text"
					name="credential"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button id="login-form-btn">Log In</button>
			<p id="login-form-errors">{errors}</p>
		</form>
	);
}

export default LoginForm;
