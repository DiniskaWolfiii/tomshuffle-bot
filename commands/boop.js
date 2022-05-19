const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription('Boop die Nase von jemand :)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du boopen willst.')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const boopUser = interaction.options.getMember('user');
        if (boopUser) {
            if (boopUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} boopt die Nase von ${boopUser}!*`);
        }
        await interaction.reply(`*${interaction.user} will jemanden die Nase boopen!*`)

    },
};