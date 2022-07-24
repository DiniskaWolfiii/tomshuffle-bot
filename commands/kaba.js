const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('kaba')
        .setDescription('Trinke Heiße Schoki!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du Heiße Schoki geben willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const kabaUser = interaction.options.getMember('user');
        let antworten;

        if (kabaUser) {
            antworten = [
                `*${interaction.user} gibt ${kabaUser} eine Heisse Schokolade*`,
                `*${interaction.user} gibt ${kabaUser} einen White Hot Chocolate*`,
                `*${interaction.user} gibt ${kabaUser} einen Hazelnut Chocolate*`,
                `*${interaction.user} gibt ${kabaUser} einen Caramel Chocolate*`
            ]
        } else {
            antworten = [
                `*${interaction.user} trinkt eine Heisse Schokolade*`,
                `*${interaction.user} trinkt einen White Hot Chocolate*`,
                `*${interaction.user} trinkt einen Hazelnut Chocolate*`,
                `*${interaction.user} trinkt einen Caramel Chocolate*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};