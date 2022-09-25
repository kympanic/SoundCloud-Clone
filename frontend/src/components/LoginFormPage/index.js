import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginFormPage.css";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/profile" />;

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
		<div className="form-background">
			<form className="login-form" onSubmit={handleSubmit}>
				<h1>Login</h1>

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
				<button>Log In</button>
				<p>{errors}</p>
			</form>
		</div>
	);
}

export default LoginFormPage;
