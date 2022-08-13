"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Song extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Song.belongsTo(models.User, {
				foreignKey: "userId",
			});
			Song.belongsTo(models.Album, {
				foreignKey: "albumId",
			});
			Song.hasMany(models.Comment, {
				foreignKey: "songId",
				onDelete: "CASCADE",
				hooks: true,
			});
			Song.belongsToMany(models.Playlist, {
				through: models.PlaylistSong,
			});
		}
	}
	Song.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			albumId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			previewImage: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Song",
		}
	);
	return Song;
};
