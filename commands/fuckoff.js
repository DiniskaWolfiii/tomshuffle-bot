const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('fuckoff')
        .setDescription('Einfach nur Fock off...')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User von dem du angepisst bist')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const fuckoffUser = interaction.options.getMember('user');
        let antworten;

        if (fuckoffUser) {
            if (fuckoffUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            
            antworten = [
                `*${interaction.user} ist angepisst von ${fuckoffUser}... Fuck-Off...*`,
                `*${interaction.user} ist angepisst von ${fuckoffUser}... Fuck-Off...*`,
                `*${interaction.user} ist angepisst von ${fuckoffUser}... Fuck-Off...*`,
                `*${interaction.user} ist angepisst von ${fuckoffUser}... Fuck-Off...*`,
                `*${interaction.user} ist angepisst von ${fuckoffUser}... Fuck-Off...*`,
                `*${interaction.user} ist angepisst von ${fuckoffUser}... Fuck-Off...*`
            ]
        } else {
            antworten = [
                `*${interaction.user}'s Worte: "Fuck-off..."*`,
                `*${interaction.user}'s Worte: "Fuck-off..."*`,
                `*${interaction.user} hat keinen Bock mehr und wirft alles hin... Just Fuck off...*`,
                `*${interaction.user} will einfach nicht mehr und schmeißt alles hin. FUCK-OFF!*`,
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};