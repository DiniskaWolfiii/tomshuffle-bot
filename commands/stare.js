const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('stare')
        .setDescription('Starre ander User an')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du anstarren willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()
        const stareUser = interaction.options.getMember('user');
        let antworten;

        if (stareUser) {
            
            antworten = [
                `*${interaction.user} starrt ${stareUser} an :eyes:*`,
                `*${interaction.user} starrt ${stareUser} an :eyes:*`,
                `*${interaction.user} starrt ${stareUser} an :eyes:*`,
                `*${interaction.user} starrt ${stareUser} an und stirbt dadurch :eyes:*`,
                `*${interaction.user} macht ein Starr Wettbewerb mit ${stareUser} :eyes:... ${stareUser} verliert und stirbt*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} starrt jemand hier an :eyes:*`,
                `*${interaction.user} starrt jemand hier an :eyes:*`,
                `*${interaction.user} hat das Verlangen jemanden anzustarren :eyes:*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};