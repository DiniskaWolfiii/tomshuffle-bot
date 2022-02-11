const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('dance')
        .setDescription('Tanze alleine oder mit anderen!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User mit dem du tanzen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const danceUser = interaction.options.getMember('user');

        if (danceUser) {
            if (danceUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            return await interaction.reply(`*${interaction.user} tanzt mit ${danceUser}*`);
        }
        await interaction.reply(`*${interaction.user} tanzt alleine rum... Das sieht merkwürdig aus...*`)
    },
};