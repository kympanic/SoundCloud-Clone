"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

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
		options.tableName = "Users";
		return queryInterface.bulkInsert(options, demoUsers, {});
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ["Panicky", "SejunRa", "DigitsNu"] },
			},
			{}
		);
	},
};
