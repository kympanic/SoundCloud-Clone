"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const demoPlaylist = [
	{
		userId: 1,
		name: "Current Favorites",
		previewImage: "https://dummyimage.com/600x400/000/fff&text=Playlist+1",
	},
	{
		userId: 2,
		name: "Dance Favorites",
		previewImage:
			"https://dummyimage.com/600x400/822382/ffffff&text=Playlist+2",
	},
	{
		userId: 3,
		name: "Group Favorites",
		previewImage:
			"https://dummyimage.com/600x400/3ac9af/ffffff&text=Playlist+3",
	},
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Playlists";
		await queryInterface.bulkInsert(options, demoPlaylist, {});
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "Playlists";
		await queryInterface.bulkDelete(options, null, {});
	},
};
