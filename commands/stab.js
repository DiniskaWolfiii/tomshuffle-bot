const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('stab')
        .setDescription('Stech andere User ab')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du abstechen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const stabUser = interaction.options.getMember('user');
        let antworten;

        if (stabUser) {
            if (stabUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            antworten = [
                `*${interaction.user} sticht ${stabUser} ab :knife:*`,
                `*${interaction.user} sticht ${stabUser} ab :knife:*`,
                `*${interaction.user} sticht ${stabUser} ab :knife:*`,
                `*${interaction.user} sticht ${stabUser} ab :knife:*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hat das Verlangen jemand abzustechen :knife:*`,
                `*${interaction.user} hebt ein Messer hervor :knife:*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};