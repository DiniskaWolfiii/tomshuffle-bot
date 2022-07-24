const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription('Boop die Nase von jemand :)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du boopen willst.')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const boopUser = interaction.options.getMember('user');
        if (boopUser) return await interaction.editReply(`*${interaction.user} boopt die Nase von ${boopUser}!*`);
        await interaction.editReply(`*${interaction.user} will jemanden die Nase boopen!*`)

    },
};