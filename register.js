const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '947890118365179935';
const guildId = '724610473982558218';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log("requiring " + file )
    console.log(command)

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken('OTQ3ODkwMTE4MzY1MTc5OTM1.Yhz1dw.RvJkRfV8XTuf5bSJUUSh6Gk08h4');

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
