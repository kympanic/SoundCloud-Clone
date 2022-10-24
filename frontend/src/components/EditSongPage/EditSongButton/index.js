import { Link, useParams } from "react-router-dom";

const EditSongButton = () => {
	const { songId } = useParams();

	return <Link to={`/${songId}/edit`}>Edit</Link>;
};

export default EditSongButton;
