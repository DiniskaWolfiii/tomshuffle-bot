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
        const beerUser = interaction.options.getMember('user');
        let antworten;

        if (beerUser) {
            if (beerUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            antworten = [
                `*${interaction.user} stoßt mit ${beerUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${beerUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${beerUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${beerUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${beerUser} auf ein Bier an :beers:*`,
                `*${interaction.user} stoßt mit ${beerUser} auf ein Radler an :beers:*`,
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
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};