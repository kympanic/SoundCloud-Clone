"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const demoPlaylistSongs = [
	{
		songId: 1,
		playlistId: 1,
	},
	{
		songId: 1,
		playlistId: 2,
	},
	{
		songId: 2,
		playlistId: 3,
	},
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "PlaylistSongs";
		await queryInterface.bulkInsert(options, demoPlaylistSongs, {});
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "PlaylistSongs";
		await queryInterface.bulkDelete(options, null, {});
	},
};
