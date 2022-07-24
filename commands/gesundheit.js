const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('gesundheit')
        .setDescription('Wünsche anderen Leuten Gesundheit!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du Gesundheit wünschen willst.')
                .setRequired(true)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const gesundheitUser = interaction.options.getMember('user');
        await interaction.editReply(`*${interaction.user} wünscht ${gesundheitUser} Gesundheit! :sneezing_face:*`);

    },
};