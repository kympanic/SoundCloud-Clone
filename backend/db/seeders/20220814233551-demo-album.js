"use strict";

const demoAlbum = [
	{
		userId: 1,
		title: "Born Pink",
		description: "test",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BlackPink-Born+Pink/bornpink-album.jpg",
	},
	{
		userId: 1,
		title: "Walpurgis Night",
		description: "test",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/GFriend+-+Walpurgis+Night/WalpurgisNight.jpg",
	},
	{
		userId: 2,
		title: "TWICEcoaster Lane 1",
		description: "test",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Twice-TwiceCoaster/TWICEcoaster_LANE_1_Cover.jpeg",
	},
	{
		userId: 2,
		title: "Persona: Map of the Soul 7",
		description: "test",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Map+of+the+Soul.jpg",
	},
	{
		userId: 3,
		title: "MADE",
		description: "test",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/made-album.jpeg",
	},
	{
		userId: 3,
		title: "Girls Generation",
		description: "test",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/girlsgenerationalbum.jpeg",
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
