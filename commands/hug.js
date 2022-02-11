const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Verteile Umarmungen!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du eine Umarmung geben willst! UwU')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const hugUser = interaction.options.getMember('user');

        if (hugUser) {
            if (hugUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} gibt ${hugUser} eine Umarmung!*`)
        }
        await interaction.reply(`*${interaction.user} hat das Bedürfniss jemanden zu umarmen...*`)
    },
};