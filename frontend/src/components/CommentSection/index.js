const CommentSection = ({ song, comments }) => {
	return (
		<div>
			{comments?.length > 0 ? (
				<div>
					{comments.map((comment) => (
						<li key={comment?.id}>
							<div>{comment.User?.username}</div>
							<div>{comment.body}</div>
						</li>
					))}
				</div>
			) : (
				<div>
					<h1>No comments yet</h1>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
