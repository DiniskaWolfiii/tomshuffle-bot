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
        const waterUser = interaction.options.getMember('user');
        let antworten;

        if (waterUser) {
            if (waterUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            antworten = [
                `*${interaction.user} spritzt ${waterUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${waterUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${waterUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${waterUser} mit Wasser ab :sweat_drops:*`,
                `*${interaction.user} spritzt ${waterUser} ab :sweat_drops:*`,
                `*${interaction.user} nimmt ein Glas Wasser und wirfts nach ${waterUser} :sweat_drops:*`,
                `*${interaction.user} nimmt ein Glas Wasser und wirfts nach ${waterUser} :sweat_drops:*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} ist bereit zum abspritzen :sweat_drops:*`,
                `*${interaction.user} hat das Verlangen jemanden mit Wasser abzuspritzen* :eyes:`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};