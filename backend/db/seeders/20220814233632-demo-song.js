"use strict";

const demoSongs = [
	{
		userId: 1,
		albumId: 1,
		title: "The Greatest",
		description: "Song about the greatest",
		url: "https://test1.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/6192_6092830867_d0dc637376_320_240_nofilter.jpg",
	},
	{
		userId: 1,
		albumId: 1,
		title: "The Worst",
		description: "Song about the worst",
		url: "https://test2.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51963431023_a22d3b96b7_320_240_nofilter.jpg",
	},
	{
		userId: 1,
		albumId: 2,
		title: "Meaty Meat Meat",
		description: "Song about all the meats",
		url: "https://test3.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_52068198033_b1c84d85d1_320_240_nofilter.jpg",
	},
	{
		userId: 1,
		albumId: 3,
		title: "Heaven",
		description: "Song about the afterlife",
		url: "https://test4.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51926136127_27db43a6ca_320_240_nofilter.jpg",
	},
	{
		userId: 1,
		albumId: 2,
		title: "Love Triangle",
		description: "Song about love triangles",
		url: "https://test5.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51790651212_3231c1ac83_n_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "Dota",
		description: "Song about Defense of the Ancients",
		url: "https://test6.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51885590468_e06ccdacbd_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "League of Legends",
		description: "Song about the game League of Legends",
		url: "https://test7.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_52206445319_1463e1bc7c_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "Potatoes are the best",
		description: "Song about how potatoes are amazing",
		url: "https://test8.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51879131374_6b70f65faf_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "What does the chimp say",
		description: "Song about how chimps talk to eachother",
		url: "https://test9.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51793867848_dd354504c6_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "I am okay",
		description: "Song about how its okay, to be okay",
		url: "https://test10.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51739906854_8337d59e3a_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 5,
		title: "Thank you",
		description: "Song about thanking everyone for believing",
		url: "https://test11.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51864009545_729152e7e3_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 5,
		title: "Journey",
		description: "Song about lifes journeys",
		url: "https://test12.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_52195297670_a939d37a0b_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 5,
		title: "The Road",
		description: "Song about how life is a winding road",
		url: "https://test13.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51966566180_9e30cb3390_n_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 6,
		title: "Save the Earth",
		description: "Song about how humans are destroying the ecosystem",
		url: "https://test14.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51871887366_f9431fb742_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 6,
		title: "I like to move it",
		description: "I like to move it, move it",
		url: "https://test15.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_52017068978_8318bc9b36_320_240_nofilter.jpg",
	},
];

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Songs", demoSongs, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Songs", null, {});
	},
};
