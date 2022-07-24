const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('cookie')
		.setDescription('Iss oder gib jemand anderen einen Keks!')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User dem du ein Keks geben willst')
            .setRequired(false)),
		
/**
 * @param {import('discord.js').Interaction} interaction
 */
	async execute(interaction) {
        await interaction.deferReply();
		const cookieUser = interaction.options.getMember('user');

        if(cookieUser) return await interaction.editReply(`*${interaction.user} gibt ${cookieUser} ein Keks :cookie:*`);
        await interaction.editReply(`*${interaction.user} isst genüsslich einen Keks :cookie:*`);
	},
};