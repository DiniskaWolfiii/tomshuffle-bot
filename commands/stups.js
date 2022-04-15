const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('stups')
        .setDescription('Stupse ander User an')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du anstupsen willst')
                .setRequired(true)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const stupsUser = interaction.options.getMember('user');
        let antworten = [
                `*${interaction.user} stupst ${stupsUser} an :point_right:*`,
                `*${interaction.user} stupst ${stupsUser} an :point_right:*`,
                `*${interaction.user} stupst ${stupsUser} an :point_right:*`,
                `*${interaction.user} stupst ${stupsUser} an und stirbt dadurch :point_right:*`,
                `*${interaction.user} macht ein stupst Wettbewerb mit ${stupsUser} :point_right:... ${stupsUser} verliert und stirbt*`,
            ]
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};