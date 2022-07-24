const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('goodvibes')
        .setDescription('Verteile Gute Laune!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du good vibes verteilen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const goodvibeUser = interaction.options.getMember('user');
        let antworten;

        if (goodvibeUser) {
            
            antworten = [
                `*${interaction.user} verteilt Good Vibes an ${goodvibeUser}!*`,
                `*${interaction.user} verteilt Good Vibes an ${goodvibeUser}!*`,
                `*${interaction.user} verteilt Good Vibes an ${goodvibeUser}!*`,
                `*${interaction.user} verteilt Good Vibes an ${goodvibeUser}!*`,
                `*${interaction.user} verteilt Good Vibes an ${goodvibeUser}!*`,
                `*${interaction.user} verteilt Good Vibes an ${goodvibeUser}!*`
            ]
        } else {
            antworten = [
                `*${interaction.user} verteilt Good Vibes!!!*`,
                `*${interaction.user} verteilt Good Vibes!!!*`,
                `*${interaction.user} sprüht voller Good Vibes!!!*`,
                `*${interaction.user} ist umgeben von Lauter Good Vibes!!*`,
                `*${interaction.user} hat niemand der Good Vibes will und gibt sich selber gute Laune!*`,
                `*${interaction.user} hat niemand der Good Vibes will und gibt sich selber gute Laune!*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};