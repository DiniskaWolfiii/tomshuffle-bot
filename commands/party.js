const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('party')
        .setDescription('Mach Party mit anderen Usern')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User mit dem du Party machen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const partyUser = interaction.options.getMember('user');

        if (partyUser) {
            if (partyUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} macht Party mit ${partyUser}!*`);
        }
        await interaction.reply(`*${interaction.user} hat Bock auf Party!*`);
    },
};