const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('sad')
        .setDescription('Trauere mit anderne Leuten :(')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User mit dem du trauern willst :(')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const sadUser = interaction.options.getMember('user');
        let antworten;

        if (sadUser) {
            if (sadUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true });

            antworten = [
                `*${interaction.user} trauert mit ${sadUser} :(*`,
                `*${interaction.user} trauert mit ${sadUser} :(*`,
                `*${interaction.user} trauert mit ${sadUser} :(*`,
                `*${interaction.user} weint mit ${sadUser} :,(*`,
                `*${interaction.user} weint mit ${sadUser} :,(*`
            ]
        } else {
            antworten = [
                `*${interaction.user} ist grad traurig :(*`,
                `*${interaction.user} ist grad traurig :(*`,
                `*${interaction.user} hat grad schlechte Laune... Mag jemand helfen? :,(*`,
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};