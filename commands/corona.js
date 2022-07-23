const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('corona')
        .setDescription('Teste dich selbst oder andere auf Corona zum Schutze aller!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du auf Corona testen möchtest')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const coronaUser = interaction.options.getMember('user');
        let antworten;

        if (coronaUser) {
            
            antworten = [
                `*${interaction.user} testet ${coronaUser} auf Corona... Der Test zeigt Negativ an!*`,
                `*${interaction.user} testet ${coronaUser} auf Corona... Der Test zeigt Negativ an!*`,
                `*${interaction.user} testet ${coronaUser} auf Corona... Der Test zeigt Negativ an!*`,
                `*${interaction.user} testet ${coronaUser} auf Corona... Der Test zeigt Negativ an!*`,
                `*${interaction.user} testet ${coronaUser} auf Corona... Der Test zeigt Negativ an!*`,
                `*${interaction.user} testet ${coronaUser} auf Corona... Der Test zeigt Positiv an!!! :bell:*`,
                `*${interaction.user} testet ${coronaUser} auf Corona... Der Test zeigt Positiv an!!! :bell:*`,
                `*${interaction.user} manipuliert den Corona-Test von ${coronaUser}... Er zeigt Negativ an.*`,
                `*${interaction.user} manipuliert den Corona-Test von ${coronaUser}... Er zeigt Positiv an!!! :bell:*`
            ]
        } else {
            antworten = [
                `*${interaction.user} testet sich selbst auf Corona... ${interaction.user} ist negativ!*`,
                `*${interaction.user} testet sich selbst auf Corona... ${interaction.user} ist negativ!*`,
                `*${interaction.user} testet sich selbst auf Corona... ${interaction.user} ist negativ!*`,
                `*${interaction.user} testet sich selbst auf Corona... ${interaction.user} ist negativ!*`,
                `*${interaction.user} testet sich selbst auf Corona... ${interaction.user} ist negativ!*`,
                `*${interaction.user} testet sich selbst auf Corona... ${interaction.user} ist positiv!!! :bell:*`,
                `*${interaction.user} testet sich selbst auf Corona... ${interaction.user} ist positiv!!! :bell:*`,
                `*${interaction.user} manipuliert den Corona-Test. Er zeigt Negativ an.*`,
                `*${interaction.user} manipuliert den Corona-Test. Er zeigt Positiv an!!! :bell:*`,
                `*${interaction.user} hat das Verlangen jemanden hier im Raum auf Corona zu testen :test_tube:*`,
                `*${interaction.user} hält einen Corona-Test in der Hand :test_tube:*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};