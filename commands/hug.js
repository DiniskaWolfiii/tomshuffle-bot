const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Verteile Umarmungen!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du eine Umarmung geben willst! UwU')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const hugUser = interaction.options.getMember('user');

        let antworten;

        if (hugUser) {
            if (hugUser.user.id === interaction.user.id) return await interaction.editReply({ content: 'Du kannst den Command nicht auf dich selber wirken!', ephemeral: true })

            antworten = [
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} umarmt ${hugUser}*`,
                `*${interaction.user} zerquetscht ${hugUser}*`
            ]
        } else {
            antworten = [
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} will umarmt werden*`,
                `*${interaction.user} hat das Verlangen umarmt zu werden*`,
                `*${interaction.user} braucht jemand der ihn/sie umarmt*`,
                `*${interaction.user} umarmt sich selbst*`,
                `*${interaction.user} umarmt sich selbst... Kann bitte jemand helfen?*`,
                `*${interaction.user} zerquetscht sich selbst...*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};