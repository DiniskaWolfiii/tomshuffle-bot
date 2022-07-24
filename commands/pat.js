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
        await interaction.deferReply();
        const patUser = interaction.options.getMember('user');
        let antworten;

        if (patUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};