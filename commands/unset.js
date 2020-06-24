module.exports = {
	name: 'unset',
	guildOnly: true,
	adminOnly: true,
	description: 'Removes the role that will be added upon a certain reaction.',
	async execute(message, args, keyv) {
		// !unset <messageID> <emoji>(Optional)
		const messageID = args[0];

		const storage = await keyv.get(message.guild.id);

		if (isNaN(messageID)) {
			return await message.channel.send('That\'s not ID.');
		}

		if (messageID in storage.messages) {
			if (args.length === 1) {
				delete storage.messages[`${messageID}`];
				await keyv.set(message.guild.id, storage);
			}
			else if (args.length === 2) {
				if (args[1] in storage.messages[`${messageID}`]) {
					delete storage.messages[`${messageID}`][args[1]];
					await keyv.set(message.guild.id, storage);
				}
			}
			else {
				await message.channel.send('Sorry, I cannot find data you sent');
			}
		}


	},
};
