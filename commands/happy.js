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
        await interaction.deferReply();
        const goodUser = interaction.options.getMember('user');
        let antworten;

        if (goodUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};