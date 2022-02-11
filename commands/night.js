const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('night')
        .setDescription('Wünsch allen eine gute Nacht')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du eine gute Nacht wünschen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const goodNightUser = interaction.options.getMember('user');

        if (goodNightUser) {
            if (goodNightUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} wünscht ${goodNightUser} eine gute Nacht! :zzz:*`);
        }
        await interaction.reply(`*${interaction.user} wünscht allen eine gute Nacht! :zzz:*`);
    },
};