module.exports = {
	name: 'set',
	guildOnly: true,
	adminOnly: true,
	description: 'Sets role is needed to add if user add reaction.',
	async execute(message, args, keyv) {
		// !set <messageID> <emoji> <role>
		const messageID = args[0];
		const role = args.slice(2).join(' ');

		const storage = await keyv.get(message.guild.id);

		if (isNaN(messageID)) {
			return await message.channel.send('That\'s not ID.');
		}

		try {
			// Bends data for work and checks it.
			const msg = await message.channel.messages.fetch(messageID);
			let emoji = decodeURIComponent(await message.guild.emojis.resolveIdentifier(args[1]));
			emoji = emoji.replace('>', '');

			let mainRole = null;
			const roles = await message.guild.roles.fetch();
			roles.cache.map(r => {
				if (r.name === role) {
					mainRole = r;
				}
			});

			if (mainRole === null) return await message.channel.send('That role is undefined!');

			// Writes data to storage (Redis).
			if (`${msg.id}` in storage.messages) {
				storage.messages[`${msg.id}`] = {
					...storage.messages[`${msg.id}`],
					[emoji]: mainRole.id,
				};
			}
			else {
				storage.messages = {
					[`${msg.id}`]: {
						[emoji]: mainRole.id,
					},
				};
			}

			await keyv.set(message.guild.id, storage);

			// Sends message about successful added and reacts to message.
			await msg.react(emoji);
			await message.channel.send(
				`OK! Now you can delete special messages and use my super functionalities!:)\n
				:man_police_officer_tone2: What happened? Presently each user can get a role, reacting to message. 
				If you want to delete it, use **unset**.`,
			);
		}
		catch (err) {
			await message.channel.send('Sorry, I cannot find data you sent');
			console.log(err);
		}

	},
};
