import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch } from "react-redux";
import PageNotFound from "../PageNotFound";

const EditSongPage = () => {
	const dispatch = useDispatch();
	const { songId } = useParams();
	const sessionUser = useSelector((state) => state?.session?.user);
	const song = useSelector((state) => state.songs[songId]);

	useEffect(() => {
		dispatch(getAllSongs());
	}, [dispatch]);

	if (!sessionUser || song?.userId !== sessionUser?.user?.id) {
		return <PageNotFound />;
	}

	return (
		sessionUser && (
			<div>
				<h1>EDIT SONG PAGE</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
				<h1>PLACEHOLDER</h1>
			</div>
		)
	);
};

export default EditSongPage;
