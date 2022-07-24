const { SlashCommandBuilder } = require('@discordjs/builders');
const { isGuildInteraction } = require('discord-api-types/utils/v9');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('tea')
        .setDescription('Trink eine Tasse Tee!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User mit dem du eine Tasse Tee trinken willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const teaUser = interaction.options.getMember('user');
        let antworten;

        if (teaUser) {
            antworten = [
                `*${interaction.user} gibt ${teaUser} eine Tasse Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse English Breakfast Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Earl Grey Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Hibiscus Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Emperor's Clouds & Mist Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Mint Citrus Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Mint Blend Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Youthberry Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Jasmine Pearls Tee*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Chai*`,
                `*${interaction.user} gibt ${teaUser} eine Tasse Chai Tea Latte*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} trinkt eine Tasse Tee*`,
                `*${interaction.user} trinkt eine Tasse English Breakfast Tee*`,
                `*${interaction.user} trinkt eine Tasse Earl Grey Tee*`,
                `*${interaction.user} trinkt eine Tasse Hibiscus Tee*`,
                `*${interaction.user} trinkt eine Tasse Emperor's Clouds & Mist Tee*`,
                `*${interaction.user} trinkt eine Tasse Mint Citrus Tee*`,
                `*${interaction.user} trinkt eine Tasse Mint Blend Tee*`,
                `*${interaction.user} trinkt eine Tasse Youthberry Tee*`,
                `*${interaction.user} trinkt eine Tasse Jasmine Pearls Tee*`,
                `*${interaction.user} trinkt eine Tasse Chai*`,
                `*${interaction.user} trinkt eine Tasse Chai Tea Latte*`,
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};