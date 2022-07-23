const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription('TBonke einen anderen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du bonken')
                .setRequired(true)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const bonkUser = interaction.options.getMember('user');
        let antworten;

        if (bonkUser.user.id === interaction.user.id) {
            antworten = [
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber...*`,
                `*${interaction.user} bonkt sich selber... Go to Horny Jail!*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} bonkt ${bonkUser}...*`,
                `*${interaction.user} bonkt ${bonkUser}...*`,
                `*${interaction.user} bonkt ${bonkUser}...*`,
                `*${interaction.user} bonkt ${bonkUser}...*`,
                `*${interaction.user} bonkt ${bonkUser}...*`,
                `*${interaction.user} bonkt ${bonkUser}...*`,
                `*${interaction.user} bonkt ${bonkUser}...*`,
                `*${interaction.user} bonkt ${bonkUser}... Go to Horny Jail!*`,
            ]
        }
        let randomNumber = Math.floor(Math.random() * antworten.length);
        await interaction.reply(antworten[randomNumber])

    },
};