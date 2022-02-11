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
        const goodvibeUser = interaction.options.getMember('user');
        let antworten;

        if (goodvibeUser) {
            if (goodvibeUser.user.id === interaction.user.id) return interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

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
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};