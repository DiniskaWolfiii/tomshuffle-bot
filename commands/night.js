const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('night')
        .setDescription('Wünsch allen eine gute Nacht')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du eine gute Nacht wünschen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const goodNightUser = interaction.options.getMember('user');

        if (goodNightUser) return await interaction.editReply(`*${interaction.user} wünscht ${goodNightUser} eine gute Nacht! :zzz:*`);
        await interaction.editReply(`*${interaction.user} wünscht allen eine gute Nacht! :zzz:*`);
    },
};