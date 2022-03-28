const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('gruppenkuscheln')
        .setDescription('Organisiere eine Runde Gruppenkuscheln!'),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {

        let antworten = [
            `*${interaction.user} will den ganzen Chat kuscheln! :people_hugging:*`,
            `*${interaction.user} will den ganzen Chat kuscheln! :people_hugging:*`,
            `*${interaction.user} will den ganzen Chat kuscheln! :people_hugging:*`,
            `*${interaction.user} will den ganzen Chat kuscheln! :people_hugging:*`,
            `*${interaction.user} will den ganzen Chat kuscheln! :people_hugging:*`,
            `*${interaction.user} umarmt den gesamten Chat! :people_hugging:*`,
            `*${interaction.user} umarmt den gesamten Chat! :people_hugging:*`,
            `*${interaction.user} umarmt den gesamten Chat! :people_hugging:*`,
            `*${interaction.user} umarmt den gesamten Chat! :people_hugging:*`,
            `*${interaction.user} zerdrückt den ganzen Chat! :people_hugging:*`,
        ]
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};