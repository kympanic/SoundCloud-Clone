"use strict";

const demoAlbum = [
	{
		userId: 1,
		title: "test1 Album",
		description: "testing the first album",
		previewImage:
			"https://dummyimage.com/600x400/d16e39/fff.png&text=Album+One",
	},
	{
		userId: 1,
		title: "test2 Album",
		description: "testing the second album",
		previewImage:
			"https://dummyimage.com/600x400/3167e6/fff.png&text=Album+Two",
	},
	{
		userId: 2,
		title: "test3 Album",
		description: "testing the third album",
		previewImage:
			"https://dummyimage.com/600x400/e333e6/fff.png&text=Album+Three",
	},
	{
		userId: 2,
		title: "test4 Album",
		description: "testing the fourth album",
		previewImage:
			"https://dummyimage.com/600x400/348f78/fff.png&text=Album+Four",
	},
	{
		userId: 3,
		title: "test5 Album",
		description: "testing the fifth album",
		previewImage:
			"https://dummyimage.com/600x400/a297a6/fff.png&text=Album+Five",
	},
	{
		userId: 2,
		title: "test6 Album",
		description: "testing the fifth album",
		previewImage:
			"https://dummyimage.com/600x400/30d9b4/fff.png&text=Album+Six",
	},
];
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Albums", demoAlbum, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Albums", null, {});
	},
};
