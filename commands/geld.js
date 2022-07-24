const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('geld')
        .setDescription('Finde oder gib Leuten Geld')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du Geld geben willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const geldUser = interaction.options.getMember('user');
        let antworten;

        if (geldUser) {
            
            antworten = [
                `*${interaction.user} gibt ${geldUser} einen Euro*`,
                `*${interaction.user} gibt ${geldUser} sieben Yen*`,
                `*${interaction.user} gibt ${geldUser} kein Geld. GEH ARBEITEN*`,
                `*${interaction.user} gibt ${geldUser} 1,24 Yen*`,
                `*${interaction.user} gibt ${geldUser} 1000 Euro Trinkgeld*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hat Gehalt bekommen und gibt eine Runde Alkohol aus!*`,
                `*${interaction.user} hat kein Geld*`,
                `*${interaction.user}'s Kontostand ist gerade Roter als Antonia mit Sonnenbrand*`,
                `*${interaction.user} zeigt einen fuenf Euro Schein*`,
                `*${interaction.user} hat 1 Cent auf der Straße gefunden*`,
                `*${interaction.user} hat 23 Euro auf der Straße gefunden*`,
                `*${interaction.user} gibt sich selbst Geld*`,
                `*${interaction.user} schließt einen Sparbuch ab mit 0% Effektivzins*`,
                `*${interaction.user} gibt sich selbst Geld*`,
                `*${interaction.user} gibt sich selbst Geld*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};