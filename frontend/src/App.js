import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SongsPage from "./components/SongsPage";
import SongsInfo from "./components/SongsInfo";
import ProfilePage from "./components/ProfileSection";
import EditSongPage from "./components/EditSongPage";
import PageNotFound from "./components/PageNotFound";
import UploadSongPage from "./components/UploadSongPage";
import * as sessionActions from "./store/session";
import DeleteSongPage from "./components/DeleteSongPage";
import { getAllSongs } from "./store/songs";
import Navigation from "./components/Navigation";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
		dispatch(getAllSongs);
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
					<Route exact path="/songs/:songId/edit">
						<EditSongPage />
					</Route>
					<Route exact path="/upload/song">
						<UploadSongPage />
					</Route>
					<Route exact path="/songs/:songId/delete">
						<DeleteSongPage />
					</Route>
					<Route path="/">
						<PageNotFound />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
