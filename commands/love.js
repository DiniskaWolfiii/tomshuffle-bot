const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('love')
        .setDescription('Hab andere ganz doll Lieb')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du deine Liebe geben willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const loveUser = interaction.options.getMember('user');

        if (loveUser) return await interaction.editReply(`*${interaction.user} hat ${loveUser} ganz doll Lieb :heart:*`);
        await interaction.editReply(`*Richtige Einstellung ${interaction.user}! Erstmal sich selbst lieben :heart:*`);
    },
};