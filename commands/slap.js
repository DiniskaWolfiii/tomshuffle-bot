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
        const slapUser = interaction.options.getMember('user');
        let antworten;

        if (slapUser) {
            if (slapUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

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
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};