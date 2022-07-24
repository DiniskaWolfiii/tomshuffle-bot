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
        await interaction.deferReply();
        const freezeUser = interaction.options.getMember('user');
        let antworten;

        if (freezeUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};