import "./searchbar.css";

const SearchBar = () => {
	return (
		<div className="search-container">
			<form className="search-form-wrapper">
				<div>
					<input
						className="search-input"
						type="text"
						placeholder="Search for a song or artist..."
					/>
					<i className="fas fa-search search-btn" style={{ color: "grey" }}></i>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
