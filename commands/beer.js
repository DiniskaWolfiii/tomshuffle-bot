const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('beer')
        .setDescription('Trink oder gib jemand Bier!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du ein Bier geben willst.')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const bierUser = interaction.options.getMember('user');
        if (bierUser) return await interaction.editReply(`*${interaction.user} gibt ${bierUser} ein Bier! :beers:*`);
        await interaction.editReply(`*${interaction.user} trinkt ein Bier! :beers:*`)

    },
};