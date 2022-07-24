const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('niesen')
        .setDescription('Niese. Das wars.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du zum niesen bringen willst.')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()
        const niesUser = interaction.options.getMember('user');
        if (niesUser) await interaction.editReply(`*${interaction.user} bringt ${niesUser} zum niesen! :sneezing_face: Hachooo!*`);
        await interaction.editReply(`*${interaction.user} niest! :sneezing_face: Hachooo!*`)

    },
};