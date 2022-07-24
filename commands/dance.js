const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Tanze alleine oder mit anderen!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User mit dem du tanzen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const danceUser = interaction.options.getMember('user');

        if (danceUser) return await interaction.editReply(`*${interaction.user} tanzt mit ${danceUser}*`);
        await interaction.editReply(`*${interaction.user} tanzt alleine rum... Das sieht merkwürdig aus...*`)
    },
};