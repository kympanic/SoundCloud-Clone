import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SongsPage from "./components/SongsPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					{/* <Route path="/login">
						<LoginFormPage />
					</Route> */}
					{/* <Route path="/signup">
						<SignupFormPage />
					</Route> */}
					<Route path="/songs">
						<SongsPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
