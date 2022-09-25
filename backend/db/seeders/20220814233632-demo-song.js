"use strict";

const demoSongs = [
	{
		userId: 1,
		albumId: 1,
		title: "Pink Venom",
		description: "Title Song for Born Pink",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BlackPink-Born+Pink/BlackPink-Pink+Venom.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BlackPink-Born+Pink/pinkvenom.jpg",
	},
	{
		userId: 1,
		albumId: 1,
		title: "Shut Down",
		description: "BlackPink shutting the haters down",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BlackPink-Born+Pink/BlackPink-Shut+down.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BlackPink-Born+Pink/shutdown.jpg",
	},
	{
		userId: 2,
		albumId: 2,
		title: "MAGO",
		description:
			"MAGO does not seek to impress through daring instrumental twists and turns. Instead, it stakes its claim on a good chorus",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/GFriend+-+Walpurgis+Night/MAGO.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/GFriend+-+Walpurgis+Night/Mago.jpeg",
	},
	{
		userId: 2,
		albumId: 2,
		title: "GRWM",
		description:
			"GRWM is all about the anticipation before a big event, and it unveils this sentiment with panache.",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/GFriend+-+Walpurgis+Night/GRWM.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/GFriend+-+Walpurgis+Night/GRWM.jpeg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "TT",
		description:
			"The minimalist electro trap beat has a stuttery appeal, perched halfway between midtempo and full-on dance music.",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Twice-TwiceCoaster/TT.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Twice-TwiceCoaster/tt.jpeg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "Pit a Pat",
		description:
			"The song flows like the changes that happen to people when they fall in love",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Twice-TwiceCoaster/Pit-a-Pat.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Twice-TwiceCoaster/Pit-a-Pat.jpeg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "Ugh",
		description:
			"RM, Suga, and j-hope use UGH! to criticize a society where people hide behind anonymity while using their anger against others.",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Ugh.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Ugh.jpeg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "Boy with Luv",
		description:
			"Boy With Luv is pure fun, grooving on an irresistible bed of sunny synths and rhythm guitar.",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Boy+with+Luv.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/boywithluv.jpg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "Dionysus",
		description:
			"Named after the Greek god of wine associated with debauchery and excess",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Dionysus.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BTS-MapoftheSoul/Dionysus.jpeg",
	},
	{
		userId: 3,
		albumId: 5,
		title: "Bang Bang Bang",
		description:
			"Bang Bang Bang has proven to be the project's most iconic moment.",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/BangBangBang.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/bangbangbang.png",
	},
	{
		userId: 3,
		albumId: 5,
		title: "Loser",
		description: "Loser explores the duality of Big Bang's members",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/Loser.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/Loser.jpeg",
	},
	{
		userId: 3,
		albumId: 5,
		title: "FXXK It",
		description:
			"Fxxk It is the feel-good offering, showcasing Bigbang at their most playful. ",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/FxxkIt.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/BigBang-Made/FXXKIT.jpeg",
	},
	{
		userId: 3,
		albumId: 6,
		title: "Genie",
		description:
			"Genie offers a edgier, more hard-hitting production and addictive choreography",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/Genie.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/genie.jpeg",
	},
	{
		userId: 3,
		albumId: 6,
		title: "Mr. Taxi",
		description: "Lively bop with edm sounds",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/Mr.+Taxi.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/mr.+taxi.png",
	},
	{
		userId: 3,
		albumId: 6,
		title: "Run Devil Run",
		description:
			"Showcases a new dark, sexy, and fierce image for the girls dubbed the Dark Soshi concept by fans.",
		url: "https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/Run+Devil+Run.mp3",
		previewImage:
			"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/Girls+Generation-2011/rundevilrun.jpeg",
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
