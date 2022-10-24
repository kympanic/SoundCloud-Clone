import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SongsPage from "./components/SongsPage";
import SongsInfo from "./components/SongsInfo";
import ProfilePage from "./components/ProfileSection";
import EditSongPage from "./components/EditSongPage";
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
					<Route exact path="/songs">
						<SongsPage />
					</Route>
					<Route exact path="/songs/:songId">
						<SongsInfo />
					</Route>
					<Route exact path="/profile">
						<ProfilePage />
					</Route>
					<Route exact path="/:songId/edit">
						<EditSongPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
