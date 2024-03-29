"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const demoAlbum = [
	{
		userId: 1,
		title: "Born Pink",
		description:
			"Leans into an image of authority undercut by familiar ideas and stale musical concepts.",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BlackPink-Born+Pink/bornpink-album.jpg",
	},
	{
		userId: 1,
		title: "Walpurgis Night",
		description:
			"For the third time in 2020, GFriend arrived with a demonstration of both versatility and sheer perseverance in the K-Pop industry.",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/GFriend+-+Walpurgis+Night/WalpurgisNight.jpg",
	},
	{
		userId: 2,
		title: "TWICEcoaster Lane 1",
		description:
			"Third effort from the nine-member JYP group and came on the heels of their success with their second mini.",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Twice-TwiceCoaster/TWICEcoaster_LANE_1_Cover.jpeg",
	},
	{
		userId: 2,
		title: "Persona: Map of the Soul 7",
		description:
			"Map Of The Soul: Persona impressively and cohesively flies from genre to genre, but sounds more confident than ever.",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Map+of+the+Soul.jpg",
	},
	{
		userId: 3,
		title: "MADE",
		description:
			"Literally every track is good enough to be another group's best song",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/made-album.jpeg",
	},
	{
		userId: 3,
		title: "Girls Generation",
		description:
			"The music combats but at the same time compliments the image of class",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/girlsgenerationalbum.jpeg",
	},
];
module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "Albums";
		await queryInterface.bulkInsert(options, demoAlbum, {});
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Albums";
		await queryInterface.bulkDelete(options, null, {});
	},
};
