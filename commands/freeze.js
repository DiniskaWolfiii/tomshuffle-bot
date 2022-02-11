const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('freeze')
        .setDescription('Friere andere Benutzer ein!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du einfrieren willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const freezeUser = interaction.options.getMember('user');
        let antworten;

        if (freezeUser) {
            if (freezeUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            
            antworten = [
                `*${interaction.user} friert ${freezeUser} ein :snowflake:*`,
                `*${interaction.user} friert ${freezeUser} ein :snowflake:*`,
                `*${interaction.user} friert ${freezeUser} ein :snowflake:*`,
                `*${interaction.user} friert ${freezeUser} ein und yeetet ${freezeUser} in ein Gletscher :snowflake:*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} friert :cold_face:*`,
                `*${interaction.user} will jemand einfrieren :snowflake:*`,
                `*${interaction.user} friert sich selbst ein :snowflake:*`,
                `*${interaction.user} steht auf Kälte und friert sich selbst ein :snowflake:*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};