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
	async up(queryInterface, Sequelize) {
		options.tableName = "PlaylistSongs";
		await queryInterface.bulkInsert(options, demoPlaylistSongs, {});
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "PlaylistSongs";
		await queryInterface.bulkDelete(options, null, {});
	},
};
