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
        const niesUser = interaction.options.getMember('user');
        if (niesUser) {
            if (bierUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} bringt ${niesUser} zum niesen! :sneezing_face: Hachooo!*`);
        }
        await interaction.reply(`*${interaction.user} niest! :sneezing_face: Hachooo!*`)

    },
};