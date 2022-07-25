const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('milk')
        .setDescription('Hol dir ein Glas Milch')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du ein Glas Milch geben willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const milkUser = interaction.options.getMember('user');

        if (milkUser) return await interaction.editReply(`*${interaction.user} gibt ${milkUser} ein Glas Milch*`);
        await interaction.editReply(`*${interaction.user} holt ein Glas Milch*`);
    },
};