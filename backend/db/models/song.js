"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Song extends Model {
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
				hooks: true,
				foreignKey: Song.songId,
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
				allowNull: true,
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
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
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
