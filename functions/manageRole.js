const { sqlite } = require('./../config.json');

const Keyv = require('keyv');
const keyv = new Keyv(
	`sqlite://${sqlite.path}.${sqlite.format}`,
	{ serialize: JSON.stringify, deserialize: JSON.parse },
);
keyv.on('error', err => console.log('Connection Error', err));

module.exports.manageRole = async (message, user, action) => {
	const guild = message.message.guild;
	if (guild === null) return;

	const storage = await keyv.get(`${guild.id}`);
	if (`${message.message.id}` in storage.messages) {
		const emoji = message.emoji.toString().replace('>', '');
		if (emoji in storage.messages[`${message.message.id}`]) {
			const member = await guild.members.fetch(user.id);
			const role = await guild.roles.fetch(storage.messages[`${message.message.id}`][emoji]);

			switch(action) {
			case 'add':
				member.roles.add(role, 'User got the role by adding a reaction.');
				break;
			case 'remove':
				member.roles.remove(role, 'The role was deleted because the reaction was removed.');
				break;
			default:
				break;
			}
		}
	}
};