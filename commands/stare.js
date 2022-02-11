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
        const stareUser = interaction.options.getMember('user');
        let antworten;

        if (stareUser) {
            if (stareUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

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
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};