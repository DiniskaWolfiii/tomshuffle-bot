const { SlashCommandBuilder } = require('@discordjs/builders');
const water = require('./water');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('splash')
        .setDescription('Spritze andere Leute mit Wasser ab!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du mit Wasser abspritzen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const splashUser = interaction.options.getMember('user');
        let antworten;

        if (splashUser) {
            antworten = [
                `*${interaction.user} spritzt ${splashUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${splashUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${splashUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${splashUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${splashUser} ab :sweat_drops:*`,
                `*${interaction.user} nimmt ein Glas Wasser und wirfts nach ${splashUser} :sweat_drops:*`,
                `*${interaction.user} nimmt ein Glas Wasser und wirfts nach ${splashUser} :sweat_drops:*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} ist bereit zum abspritzen :sweat_drops:*`,
                `*${interaction.user} hat das Verlangen jemanden mit Wasser abzuspritzen* :eyes:`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};