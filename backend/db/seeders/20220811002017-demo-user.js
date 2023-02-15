"use strict";
const bcrypt = require("bcryptjs");

const demoUsers = [
	{
		firstName: "Dan",
		lastName: "Yoo",
		email: "demo@gmail.com",
		username: "Panicky",
		hashedPassword: bcrypt.hashSync("password"),
		previewImage:
			"https://dummyimage.com/600x400/8f368f/fff.png&text=Profile+1",
	},
	{
		firstName: "Amy",
		lastName: "Leang",
		email: "amyleang@gmail.com",
		username: "AmyLeang",
		hashedPassword: bcrypt.hashSync("password2"),
		previewImage:
			"https://dummyimage.com/600x400/3d3ba1/fff.png&text=Profile+2",
	},
	{
		firstName: "John",
		lastName: "Kim",
		email: "digitsnu@gmail.com",
		username: "DigitsNu",
		hashedPassword: bcrypt.hashSync("password3"),
		previewImage:
			"https://dummyimage.com/600x400/2bab4d/fff.png&text=Profile+3",
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
