"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PlaylistSong extends Model {
		static associate(models) {
			// define association here
		}
	}
	PlaylistSong.init(
		{
			songId: DataTypes.INTEGER,
			playlistId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "PlaylistSong",
		}
	);
	return PlaylistSong;
};
