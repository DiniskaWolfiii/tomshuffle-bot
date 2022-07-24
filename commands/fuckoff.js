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
        await interaction.deferReply();
        const fuckoffUser = interaction.options.getMember('user');
        let antworten;

        if (fuckoffUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};