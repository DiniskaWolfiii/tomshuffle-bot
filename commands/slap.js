const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Klatsche andere User!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du eine klatschen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const slapUser = interaction.options.getMember('user');
        let antworten;

        if (slapUser) {
            
            antworten = [
                `*${interaction.user} klatscht ${slapUser}*`,
                `*${interaction.user} klatscht ${slapUser}*`,
                `*${interaction.user} klatscht ${slapUser}*`,
                `*${interaction.user} klatscht ${slapUser}*`,
                `*${interaction.user} klatscht ${slapUser}*`,
                `*${interaction.user} klatscht ${slapUser} auf den Ass*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hat das verlangen jemanden zu klatschen :clap:*`,
                `*${interaction.user} hebt die Hand und hat das Verlangen jemanden zu klatschen*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};