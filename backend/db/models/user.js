"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		toSafeObject() {
			//context will be the User instance
			const { id, firstName, lastName, username, email, previewImage } = this;
			return { id, firstName, lastName, username, email, previewImage };
		}
		validatePassword(password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		}
		static getCurrentUserById(id) {
			return User.scope("currentUser").findByPk(id);
		}
		static async login({ credential, password }) {
			const { Op } = require("sequelize");
			const user = await User.scope("loginUser").findOne({
				where: {
					[Op.or]: {
						username: credential,
						email: credential,
					},
				},
			});
			if (user && user.validatePassword(password)) {
				return await User.scope("currentUser").findByPk(user.id);
			}
		}
		static async signup({ firstName, lastName, username, email, password }) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				firstName,
				lastName,
				username,
				email,
				hashedPassword,
				previewImage,
			});
			return await User.scope("currentUser").findByPk(user.id);
		}
		static associate(models) {
			User.hasMany(models.Comment, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
			User.hasMany(models.Song, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
			User.hasMany(models.Album, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
			User.hasMany(models.Playlist, {
				foreignKey: "userId",
				onDelete: "CASCADE",
				hooks: true,
			});
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 250],
					isEmail: true,
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			isArtist: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			previewImage: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: [
						"hashedPassword",
						"createdAt",
						"updatedAt",
						"isArtist",
						"previewImage",
					],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);
	return User;
};
