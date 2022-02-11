const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('welcome')
		.setDescription('Heiße einen neuen Benutzer willkommen!')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User den du Willkommen heißen willst')
            .setRequired(true)),
		
/**
 * @param {import('discord.js').Interaction} interaction
 */
	async execute(interaction) {
		const welcomeUser = interaction.options.getMember('user');

        await interaction.reply(`${interaction.user} heißt ${welcomeUser} herzlich Willkommen!`);
	},
};