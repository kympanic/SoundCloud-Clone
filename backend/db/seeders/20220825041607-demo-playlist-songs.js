"use strict";

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
		playlistId: 1,
	},
];

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("PlaylistSongs", demoPlaylistSongs, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};