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
		const cookieUser = interaction.options.getMember('user');

        if(cookieUser) {
            if(cookieUser.user.id===interaction.user.id) return await interaction.reply({content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true})
            return await interaction.reply(`*${interaction.user} gibt ${cookieUser} ein Keks :cookie:*`);
        }
        await interaction.reply(`*${interaction.user} isst genüsslich einen Keks :cookie:*`);
	},
};