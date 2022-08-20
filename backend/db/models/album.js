"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Album extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Album.belongsTo(models.User, {
				foreignKey: "userId",
			});
			Album.hasMany(models.Song, {
				foreignKey: "albumId",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	Album.init(
		{
			userId: {
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
			previewImage: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Album",
		}
	);
	return Album;
};
