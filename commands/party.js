const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('party')
        .setDescription('Mach Party mit anderen Usern')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User mit dem du Party machen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const partyUser = interaction.options.getMember('user');

        if (partyUser) return await interaction.editReply(`*${interaction.user} macht Party mit ${partyUser}!*`);
        await interaction.editReply(`*${interaction.user} hat Bock auf Party!*`);
    },
};