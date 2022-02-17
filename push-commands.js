const fs = require('fs');
//const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, testClientId, deployId, token, deployToken} = require('./botconfig.json');

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token); // !!! TOKEN ÄNDERN BEIM PUSHEN !!!

(async () => {
	try {
		await rest.put(
			// Public
			// Routes.applicationCommands(clientId),

			// Test
			Routes.applicationGuildCommands(clientId, deployId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();