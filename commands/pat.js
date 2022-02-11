const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Streichel einen anderen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du streicheln willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const patUser = interaction.options.getMember('user');
        let antworten;

        if (patUser) {
            if (patUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

            antworten = [
                `*${interaction.user} patted ${patUser}*`,
                `*${interaction.user} patted ${patUser}*`,
                `*${interaction.user} patted ${patUser}*`,
                `*${interaction.user} patted ${patUser} zu Tode*`
            ]
        } else {
            antworten = [
                `*${interaction.user} will gepatted werden*`,
                `*${interaction.user} hat das Verlangen gestreichelt zu werden*`,
                `*${interaction.user} will gepatted werden*`,
                `*${interaction.user} braucht jemand der ihn/sie patted*`,
                `*${interaction.user} patted sich selbst*`,
                `*${interaction.user} patted sich selbst... Kann ihn bitte jemand helfen?*`,
                `*${interaction.user} patted sich selbst in Grund und Boden...*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};