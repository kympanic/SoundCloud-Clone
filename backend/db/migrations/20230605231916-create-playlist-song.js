"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.createTable(
			"PlaylistSongs",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				songId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Songs",
						key: "id",
					},
					onDelete: "cascade",
				},
				playlistId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: "Playlists",
						key: "id",
					},
					onDelete: "cascade",
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "PlaylistSongs";
		await queryInterface.dropTable(options);
	},
};
