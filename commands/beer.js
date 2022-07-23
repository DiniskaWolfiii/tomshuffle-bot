const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('beer')
        .setDescription('Trink oder gib jemand Bier!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du ein Bier geben willst.')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const bierUser = interaction.options.getMember('user');
        if (bierUser) {
            if (bierUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} gibt ${bierUser} ein Bier! :beers:*`);
        }
        await interaction.reply(`*${interaction.user} trinkt ein Bier! :beers:*`)

    },
};