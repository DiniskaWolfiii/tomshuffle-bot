const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('prost')
        .setDescription('Stoße mit anderen auf ein Bier an!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User mit dem du anstoßen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const prostUser = interaction.options.getMember('user');
        let antworten;

        if (prostUser) {
            antworten = [
                `*${interaction.user} stoßt mit ${prostUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${prostUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${prostUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${prostUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${prostUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${prostUser} auf ein Radler an :beers:*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} stoßt auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt auf ein Radler an :beers:*`,
                `*${interaction.user} stoßt mit sich selber an... :beers:*`,
                `*${interaction.user} hat niemanden zum Antoßen... :beers:*`,
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};