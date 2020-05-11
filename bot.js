const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const { prefix, token, redis_auth } = require('./config.json');
const { manageRole } = require('./functions/manageRole');
const Keyv = require('keyv');
const keyv = new Keyv(
	`redis://${redis_auth.user}:${redis_auth.password}@${redis_auth.host}:${redis_auth.port}`,
	{ serialize: JSON.stringify, deserialize: JSON.parse },
);
keyv.on('error', err => console.log('Connection Error', err));


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
	console.log('Hello! I am started!');
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Does something when the bot's getting a message
client.on('message', async message => {
	let prefixGuild = prefix;
	if (message.guild !== null) {
		prefixGuild = (await keyv.get(`${message.guild.id}`)).prefix;
	}

	if (!message.content.startsWith(prefixGuild) || message.author.bot) return;

	const args = message.content.slice(prefixGuild.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	if (command.guildOnly && message.channel.type !== 'text') {
		return await message.reply('I can\'t execute that command inside DMs!');
	}
	if (command.adminOnly && !message.member.hasPermission('ADMINISTRATOR')) return;

	try {
		command.execute(message, args, keyv);
	}
	catch (error) {
		console.log(error);
	}
});

// Adds guild to redis storage where bot was invited
client.on('guildCreate', async guild => {
	const guildDict = {
		guild_id: guild.id,
		messages: {},
		prefix: prefix,
	};
	await keyv.set(guild.id, guildDict);
});

// Does something when a user's reacting to message.
client.on('messageReactionAdd', async (message, user) => {
	if (user.bot) return;
	await manageRole(message, user, 'add');
});

// Does something when a user's removing a reaction from message.
client.on('messageReactionRemove', async (message, user) => {
	if (user.bot) return;
	await manageRole(message, user, 'remove');
});

client.login(token);
