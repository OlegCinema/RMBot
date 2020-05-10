module.exports = {
	name: 'prefix',
	guildOnly: true,
	adminOnly: true,
	description: 'Changes the guild\'s prefix.',
	async execute(message, args, keyv) {
		// !prefix <new_prefix>
		const prefixNew = args[0];
		if (prefixNew === undefined) return;
		if (!prefixNew.length) {
			return await message.channel.send('The new prefix must contain 1 character!');
		}

		const storage = await keyv.get(`${message.guild.id}`);
		storage.prefix = prefixNew;

		await keyv.set(`${message.guild.id}`, storage);
		await message.channel.send('The new prefix changed successfully!');

	},
};