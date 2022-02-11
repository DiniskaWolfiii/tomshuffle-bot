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
        const knifeUser = interaction.options.getMember('user');
        let antworten;

        if (knifeUser) {
            if (knifeUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

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
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};