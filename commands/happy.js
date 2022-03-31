const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('happy')
        .setDescription('Zeig deine Glücklichkeit!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du gute Laune verteilen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const goodUser = interaction.options.getMember('user');
        let antworten;

        if (goodUser) {
            if (goodUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

            antworten = [
                `*${interaction.user} verteilt gute Laune an ${goodUser}!*`,
                `*${interaction.user} verteilt gute Laune an ${goodUser}!*`,
                `*${interaction.user} verteilt gute Laune an ${goodUser}!*`,
                `*${interaction.user} verteilt gute Laune an ${goodUser}!*`,
                `*${interaction.user} verteilt gute Laune an ${goodUser}!*`,
                `*${interaction.user} verteilt gute Laune an ${goodUser}!*`
            ]
        } else {
            antworten = [
                `*${interaction.user} ist total happy!*`,
                `*${interaction.user} ist absolut mega super duper happy!*`,
                `*${interaction.user} ist total happy!*`,
                `*${interaction.user} ist mega gut gelaunt! Weiter so!*`,
                `*${interaction.user} hat niemand der gute Laune will und gibt sich selber gute Laune!*`,
                `*${interaction.user} hat niemand der gute Laune will und gibt sich selber gute Laune!*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};