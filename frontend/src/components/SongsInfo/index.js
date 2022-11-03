import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllSongs } from "../../store/songs";
import { getAllComments } from "../../store/comments";
import CommentSection from "../CommentSection";
import CommentCreateForm from "../CommentCreateForm";
import "./SongsInfo.css";
import PageNotFound from "../PageNotFound";
import { playAudio } from "../../store/audioplayer";
import { restoreUser } from "../../store/session";
const SongsInfo = () => {
	const { songId } = useParams();
	const dispatch = useDispatch();
	const song = useSelector((state) => state?.songs[songId]);
	const sessionUser = useSelector((state) => state?.session?.user);
	const comments = useSelector((state) => Object.values(state?.comments));

	const songButton = useCallback(
		(song) => {
			dispatch(playAudio(song));
		},
		[dispatch]
	);

	useEffect(() => {
		dispatch(getAllSongs());
		dispatch(getAllComments(song?.id));
		dispatch(restoreUser());
	}, [dispatch, song?.id]);

	if (!sessionUser) {
		return <PageNotFound />;
	}

	console.log(song?.userId, sessionUser?.user?.id);
	return (
		<div className="song-info-background">
			<div className="song-info-page">
				<div className="song-full-container">
					<div id="song-container-left">
						<div className="song-text">
							<h1>{song?.title}</h1>
							<p>{song?.description}</p>
						</div>
						<div>
							{song && sessionUser && song?.userId === sessionUser?.user?.id && (
								<div className="song-edit-delete-btns">
									<Link className="song-edit-btn" to={`/songs/${songId}/edit`}>
										Edit
									</Link>
									<Link
										className="song-edit-btn"
										to={`/songs/${songId}/delete`}
									>
										Delete
									</Link>
								</div>
							)}
						</div>
					</div>
					<div id="song-container-right">
						<div
							className="song-img-wrapper"
							style={{ backgroundImage: "url(" + song?.previewImage + ")" }}
						>
							<div id="play-button-songinfo">
								<button
									className="play-button"
									onClick={() => songButton(song)}
								>
									<i className="fa-solid fa-play"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div id="comments-song">
					<div className="comments-container">
						<CommentCreateForm songId={songId} sessionUser={sessionUser} />
						<div id="song-icons-bar">
							<div id="song-icons-buttons">
								<button className="song-btns">
									<i className="fas fa-heart"></i>
									Like
								</button>
								<button className="song-btns">
									<i className="fas fa-retweet"></i>
									Repost
								</button>
								<button className="song-btns">
									<i className="fas fa-share-square"></i>
									Share
								</button>
							</div>
							<div id="song-stats">
								<div className="songs-stats-divs">
									<i className="fas fa-play"></i>
									<p>50</p>
								</div>
								<div className="songs-stats-divs">
									<i className="fas fa-heart"></i>
									<p>300</p>
								</div>
								<div className="songs-stats-divs">
									<i className="fas fa-retweet"></i>
									<p>100</p>
								</div>
							</div>
						</div>
					</div>
					<div id="comments-area">
						<div className="user-comments-section">
							{comments &&
								comments?.map((comment) => (
									<CommentSection
										comment={comment}
										key={comment?.id}
										sessionUser={sessionUser}
										songId={songId}
									/>
								))}
						</div>
						<div id="comments-right-area">
							<div>
								<p>placeholder</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SongsInfo;
