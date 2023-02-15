"use strict";

const demoComment = [
	{
		userId: 1,
		songId: 1,
		body: "This really is the greatest song ever!",
	},
	{
		userId: 2,
		songId: 1,
		body: "Not really. This is just okay",
	},
	{
		userId: 3,
		songId: 1,
		body: "Worst song ever.",
	},
	{
		userId: 1,
		songId: 2,
		body: "The lyrics are thoughtful and well made",
	},
	{
		userId: 1,
		songId: 6,
		body: "First",
	},
	{
		userId: 1,
		songId: 10,
		body: "This song puts me to sleep",
	},
	{
		userId: 2,
		songId: 12,
		body: "Best song I've heard today",
	},
	{
		userId: 2,
		songId: 13,
		body: "Why did you even make this",
	},
	{
		userId: 2,
		songId: 14,
		body: "We need to heed the warnings in this song",
	},
	{
		userId: 3,
		songId: 15,
		body: "I like to move it, move it",
	},
	{
		userId: 3,
		songId: 6,
		body: "I listen to this everyday",
	},
	{
		userId: 3,
		songId: 7,
		body: "Can we all agree to disagree?",
	},
];

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Comments", demoComment, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Comments", null, {});
	},
};
