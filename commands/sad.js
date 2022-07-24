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
        await interaction.deferReply();
        const sadUser = interaction.options.getMember('user');
        let antworten;

        if (sadUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};