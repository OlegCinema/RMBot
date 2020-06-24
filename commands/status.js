module.exports = {
	name: 'status',
	description: 'Returns the status of the bot.',
	execute(message) {
		const getRandomInt = (min, max) => {
			return Math.floor(Math.random() * (max - min)) + min;
		};

		const allTexts = [
			'Oh, nice! I am working now.',
			'Everything is great!',
			'I\'m fine, but how are you?:)',
			'I\'m so happy to be working...',
			'Sorry, I\'m working hard. I can\'t talk',
			'I am destroying the world.',
		];
		const randomText = allTexts[getRandomInt(0, allTexts.length)];

		message.channel.send(randomText);
	},
};