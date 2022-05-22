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
        const gesundheitUser = interaction.options.getMember('user');
        if (gesundheitUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} wünscht ${gesundheitUser} Gesundheit! :sneezing_face:*`);

    },
};