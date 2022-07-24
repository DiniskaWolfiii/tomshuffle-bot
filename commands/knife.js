const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('knife')
        .setDescription('Wirf mit Messern nach Leuten. Hehe.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du mit Messern bewerfen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const knifeUser = interaction.options.getMember('user');
        let antworten;

        if (knifeUser) {
            
            antworten = [
                `*${interaction.user} wirft ${knifeUser} mit einem Messer ab! :knife:*`,
                `*${interaction.user} wirft ${knifeUser} mit einem Messer ab! :knife:*`,
                `*${interaction.user} wirft ${knifeUser} mit einem Messer ab! :knife:*`,
                `*${interaction.user} wirft ${knifeUser} mit einem Messer ab und nagelt ${knifeUser} damit an die Wand! :knife:*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hält energisch ein Messer in der Hand :knife:*`,
                `*${interaction.user} hält energisch ein Messer in der Hand und beobachtet jemanden :eyes:*`,
                `*${interaction.user} sticht sich selbst mit einem Messer ab :knife:*`,
                `*${interaction.user} lässt wirft ein Messer hoch und trifft sich selbst damit :knife:*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};