const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('toaster')
        .setDescription('Wirf einen Toaster in Gesichter anderer Leute.')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User den du mit einem Toaster bewerfen willst.')
            .setRequired(true)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const toasterUser = interaction.options.getMember('user');
        let antworten = [
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
            `*${interaction.user} bewirft ${toasterUser} mit einem Toaster*`,
        ]
        for (let i = antworten.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = antworten[i];
            antworten[i] = antworten[j];
            antworten[j] = temp;
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};