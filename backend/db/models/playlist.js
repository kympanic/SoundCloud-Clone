"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Playlist extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Playlist.belongsToMany(models.Song, {
				through: models.PlaylistSong,
				hooks: true,
				foreignKey: Playlist.id,
			});
			Playlist.belongsTo(models.User, {
				foreignKey: "userId",
			});
		}
	}
	Playlist.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
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
			modelName: "Playlist",
		}
	);
	return Playlist;
};
