const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('love')
        .setDescription('Hab andere ganz doll Lieb')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du deine Liebe geben willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const loveUser = interaction.options.getMember('user');

        if (loveUser) {
            if (loveUser.user.id === interaction.user.id) return await interaction.reply({ comtent: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} hat ${loveUser} ganz doll Lieb :heart:*`);
        }
        await interaction.reply(`*Richtige Einstellung ${interaction.user}! Erstmal sich selbst lieben :heart:*`);
    },
};