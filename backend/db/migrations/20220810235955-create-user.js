"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.createTable(
			"Users",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				firstName: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				lastName: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
				},
				username: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
				},
				hashedPassword: {
					type: Sequelize.STRING.BINARY,
					allowNull: false,
				},
				isArtist: {
					type: Sequelize.BOOLEAN,
					defaultValue: true,
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
				previewImage: {
					type: Sequelize.STRING,
					allowNull: true,
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		return await queryInterface.dropTable("Users", options);
	},
};
