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
        await interaction.deferReply();
        const stabUser = interaction.options.getMember('user');
        let antworten;

        if (stabUser) {
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};