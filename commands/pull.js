const { SlashCommandBuilder } = require('@discordjs/builders');
const shelljs = require('shelljs');
const {ownerId} = require('./../botconfig.json');


module.exports = {

	data: new SlashCommandBuilder()
		.setName('pull')
		.setDescription('Zieht Code von der GitHub Repository. Wolfiii Only!'),
		
/**
 * @param {import('discord.js').Interaction} interaction
 */
	async execute(interaction) {
		await interaction.deferReply();
		if (interaction.user.id !== ownerId) return await interaction.reply({content: 'Du bist nicht Wolfiii!', ephemeral: true});
        shelljs.cd('/home/wolfiii/bots/tomshuffle-bot')
        shelljs.exec('git pull')
        shelljs.exec('npm i')
        await interaction.reply({content: ':bulb: Pulled!', ephemeral: true})
	},
};