"use strict";
const { Model, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		toSafeObject() {
			//context will be the User instance
			const { id, username, email } = this;
			return { id, username, email };
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
		static async signup({ username, email, password }) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				username,
				email,
				hashedPassword,
			});
			return await User.scope("currentUser").findByPk(user.id);
		}
		static associate(models) {
			// define association here
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
					len: [4, 30],
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
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "createdAt", "updatedAt", "isArtist"],
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
