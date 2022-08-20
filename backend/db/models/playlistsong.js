"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PlaylistSong extends Model {
		// static getSongsByPlaylistId(id) {
		// 	return PlaylistSong.scope("noPlaylistSongs").findByPk(id);
		// }
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
			// scopes: {
			// 	noPlaylistSongs: {
			// 		attributes: { exclude: ["songId"] },
			// 	},
			// },
		}
	);
	return PlaylistSong;
};
