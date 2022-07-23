const { SlashCommandBuilder } = require('@discordjs/builders');
const shelljs = require('shelljs');
const {ownerId, adminRole, modRole} = require('./../botconfig.json');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('reboot')
		.setDescription('Startet den Bot neu. Wolfiii Only!'),
		
/**
 * @param {import('discord.js').Interaction} interaction
 */
	async execute(interaction) {
		await interaction.deferReply();
		if(interaction.member.roles.cache.some(r=>r.id===modRole) || interaction.member.roles.cache.some(r=>r.id===adminRole) || interaction.user.id===ownerId) {
        await interaction.editReply({content: 'Be right back... :zzz:', ephemeral: true})
        interaction.client.destroy();
        shelljs.exec('pm2 restart tomshuffle-bot')
		}
		else return await interaction.editReply({content: 'Du gehörst nicht zum Mod-Team!', ephemeral: true});
	},
};