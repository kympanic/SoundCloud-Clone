"use strict";

const demoAlbum = [
	{
		userId: 1,
		title: "Born Pink",
		description:
			"The K-pop quartet’s highly anticipated second album leans into an image of authority that’s undercut by familiar ideas and stale musical concepts.",
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
			"TWICEcoaster : LANE 1 is the third effort from the nine-member JYP group and came on the heels of their success with their second mini.",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Twice-TwiceCoaster/TWICEcoaster_LANE_1_Cover.jpeg",
	},
	{
		userId: 2,
		title: "Persona: Map of the Soul 7",
		description:
			"Like many a Bangtan album before it, 'Map Of The Soul: Persona' impressively and cohesively flies from genre to genre, but sounds more confident than ever. It's bookended by two hard-hitting, hip-hop heavy tracks.",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Map+of+the+Soul.jpg",
	},
	{
		userId: 3,
		title: "MADE",
		description:
			"The MADE album has such incredible musical diversity – it's impossible to believe that all these songs came out as part of one album. Literally every track is good enough to be another group's best song – yet BIGBANG owns them all. They truly are the kings of Kpop.",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/made-album.jpeg",
	},
	{
		userId: 3,
		title: "Girls Generation",
		description:
			"The music combats but at the same time compliments the image of class; singing about risqué subjects but still retaining that celestial aesthetic quality",
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
