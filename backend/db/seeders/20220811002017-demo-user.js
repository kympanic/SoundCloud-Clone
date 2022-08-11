"use strict";
const bcrypt = require("bcryptjs");

const demoUsers = [
	{
		firstName: "Daniel",
		lastName: "Yoo",
		email: "demo@gmail.com",
		username: "Panicky",
		hashPassword: bcrypt.hashSync("password"),
	},
	{
		firstName: "James",
		lastName: "Ra",
		email: "army@gmail.com",
		username: "SejunRa",
		hashPassword: bcrypt.hashSync("password2"),
	},
	{
		firstName: "John",
		lastName: "Kim",
		email: "digitsnu@gmail.com",
		username: "DigitsNu",
		hashPassword: bcrypt.hashSync("password3"),
	},
];

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Users", demoUsers, {});
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete("Users", {
			username: { [Op.in]: ["Panicky", "SejunRa", "DigitsNu"] },
		});
	},
};
