"use strict";

const demoSongs = [
	{
		userId: 1,
		albumId: 1,
		title: "80's Rock Medley",
		description: "A medley of Van Halen and Joan Jett",
		url: "https://cf-media.sndcdn.com/vi1ygtLaT5kF.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]KKWnlQIBY72EJl3j4mtLxbAg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/6192_6092830867_d0dc637376_320_240_nofilter.jpg",
	},
	{
		userId: 1,
		albumId: 2,
		title: "Romantic Homicide",
		description: "In the back of my mind you died",
		url: "https://cf-media.sndcdn.com/F5q3N1h8GEgK.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]6s-7hvkMDsxD4-x9LW0-uaoQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51963431023_a22d3b96b7_320_240_nofilter.jpg",
	},
	{
		userId: 1,
		albumId: 1,
		title: "I think I live it when it rains",
		description: "A southern twist to the classic love story",
		url: "https://cf-media.sndcdn.com/YAsSTtx7QSmt.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]U0cYKp-lPydLjN2IXSKA6I8Q__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_52068198033_b1c84d85d1_320_240_nofilter.jpg",
	},
	{
		userId: 1,
		albumId: 2,
		title: "Rises the Moon",
		description: "A warm piece about rising from past tragedy",
		url: "https://cf-media.sndcdn.com/WzqLXMnAqZMM.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]PyKaRkIHRf61smNWHYsGlW3A__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51926136127_27db43a6ca_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "What You Heard",
		description:
			"Its jaunty piano line and happily jingling tambourine might make ‘Lust For Life’ sound like a cheery tune about grabbing life by the horns, but Iggy actually wrote it about drug addiction.",
		url: "https://cf-media.sndcdn.com/9xD0erBwiXOd.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]a29iesxhNtaahgmfNXtS5CCQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51790651212_3231c1ac83_n_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "Tears for Fears",
		description: "Everybody wants to rule the world",
		url: "https://cf-media.sndcdn.com/yspM6k84ZVh1.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]iNa0FIB5I5Ue~kX2PnbIbQYg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51885590468_e06ccdacbd_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "Put Your Records On",
		description: "Somebody that I used to know",
		url: "https://cf-media.sndcdn.com/RkYpr45g6RNd.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]nPnAI~UIatye4ujhSTaJVBOQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_52206445319_1463e1bc7c_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "All Mine",
		description: "Collecting whats rightfully mine",
		url: "https://cf-media.sndcdn.com/0MVv62vhpKqF.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]~sB-iBi8tdMA6o85a0kolDCQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51879131374_6b70f65faf_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 3,
		title: "Lost Me",
		description: "You can never get back what you haven't lost",
		url: "https://cf-media.sndcdn.com/2fPccfxBeHXO.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]D15ofRBpJ03xg60Uezz62Fgw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51793867848_dd354504c6_320_240_nofilter.jpg",
	},
	{
		userId: 2,
		albumId: 4,
		title: "No Idea",
		description: "It's okay. It's not okay",
		url: "https://cf-media.sndcdn.com/fM536e3NNpP3.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]IyDSAVsKJ81P-TBsi8hvbCtg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51739906854_8337d59e3a_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 5,
		title: "Looking Out For You",
		description: "Something about you",
		url: "https://cf-media.sndcdn.com/rey7Or12AhtS.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]vn8ihMI39Fisnll3I1LY3GkQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51864009545_729152e7e3_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 6,
		title: "Time",
		description: "EDM Mixup Back 2 School",
		url: "https://cf-media.sndcdn.com/WCYVp3FrW3TH.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]xxIyT4Rg7vzU7Uw4pjRS~Qkg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_52195297670_a939d37a0b_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 5,
		title: "Demons Around",
		description: "Dead in the water",
		url: "https://cf-media.sndcdn.com/yljxh0jhLFUm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]k6R~odi1MOwPQnEPN4K8TkpQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51966566180_9e30cb3390_n_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 6,
		title: "In My Head",
		description:
			"https://cf-media.sndcdn.com/jgoOba2mse9d.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]ZfSvV63lwJ0u~Spgv5ge2BOg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
		url: "https://test14.mp3",
		previewImage:
			"https://loremflickr.com/cache/resized/65535_51871887366_f9431fb742_320_240_nofilter.jpg",
	},
	{
		userId: 3,
		albumId: 6,
		title: "Heads Will Roll",
		description: "Welcome to the jungle",
		url: "https://cf-media.sndcdn.com/Lv4XTt8mGVc7.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cm[…]pVPKhwDfwLS5stN~Yt7Ze0aQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
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
