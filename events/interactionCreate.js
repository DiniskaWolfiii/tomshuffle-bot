module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import('discord.js').Interaction} interaction
	 * @param {import('discord.js').Client} client
	 */
	async execute(interaction){
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Es gab einen Fehler beim ausführen des Commands! Bitte schreib Wolfiii an um den Fehler beheben zu lassen!', ephemeral: true });
		}
	}
}