const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('summon')
        .setDescription('Beschwöre ander User herbei!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du herraufbeschwören willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const summonUser = interaction.options.getMember('user');
        let antworten;

        if (summonUser) {
            if (summonUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            antworten = [
                `*${interaction.user} ruft ${summonUser} von den Toten zurück*`,
                `*${interaction.user} ruft ${summonUser} von den Toten zurück*`,
                `*${interaction.user} ruft ${summonUser} von den Toten zurück*`,
                `*${interaction.user} macht ein Ritual und ruft ${summonUser}*`
            ]
        } else {
            antworten = [
                `*${interaction.user} tanz weird rum...*`,
                `*${interaction.user} will jemand von den Toten zurückrufen...*`,
                `*${interaction.user} versucht jemand zu Rufen...*`,
                `*${interaction.user} versucht jemand vom Jenseits zurückzurufen, aber die Astralischen Kräfte sind zu mächtig und erlauben das nicht...*`,
                `*${interaction.user} ersteht von den Toten auf!*`,
                `*${interaction.user} erscheint!*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};