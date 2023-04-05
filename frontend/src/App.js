import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SongsPage from "./components/SongsPage";
import SongsInfo from "./components/SongsInfo";
import EditSongPage from "./components/EditSongPage";
import EditCommentPage from "./components/EditCommentPage";
import PageNotFound from "./components/PageNotFound";
import UploadSongPage from "./components/UploadSongPage";
import DeleteSongPage from "./components/DeleteSongPage";
import ProfilePage from "./components/ProfilePage";
import Navigation from "./components/Navigation";
import Player from "./components/AudioPlayer";
import * as sessionActions from "./store/session";
import { getAllSongs } from "./store/songs";
import { getAllUsers } from "./store/users";
function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
		dispatch(getAllSongs());
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<>
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
						<Route exact path="/songs/:songId/edit">
							<EditSongPage />
						</Route>
						<Route exact path="/comments/:commentId/edit">
							<EditCommentPage />
						</Route>
						<Route exact path="/profile/:userId">
							<ProfilePage />
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
					<Player />
				</>
			)}
		</>
	);
}

export default App;
