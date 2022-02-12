const { SlashCommandBuilder } = require('@discordjs/builders');
const shelljs = require('shelljs');
const {ownerId} = require('./../botconfig.json');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('reboot')
		.setDescription('Startet den Bot neu. Wolfiii Only!'),
		
/**
 * @param {import('discord.js').Interaction} interaction
 */
	async execute(interaction) {
		if (interaction.user.id !== ownerId) return await interaction.reply({content: 'Du bist nicht Wolfiii!', ephemeral: true});
        await interaction.reply({content: 'Be right back... :zzz:', ephemeral: true})
        interaction.client.destroy();
        shelljs.exec('pm2 restart tomshuffle-bot')
	},
};