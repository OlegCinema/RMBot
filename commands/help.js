const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Returns information about the bot.',
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('ReactionManagerBot')
			.setURL('https://github.com/OlegCinema/RMBot')
			.setAuthor('OlegCinema', 'https://i.imgur.com/Q6FXBYR.jpg', 'https://github.com/OlegCinema')
			.setDescription('Discord bot, written in JS, is using for adding or deleting roles in guilds.')
			.setThumbnail('https://i.imgur.com/53H5Ot8.png')
			.setTimestamp()
			.setFooter('You can contact by email: olegcinemaw@mail.ru');

		message.channel.send(exampleEmbed);
	},
};