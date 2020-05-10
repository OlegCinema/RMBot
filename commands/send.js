module.exports = {
	name: 'send',
	description: 'Returns the message sent from the bot.',
	execute(message, args) {
		message.channel.send(args.join(' '));
	},
};