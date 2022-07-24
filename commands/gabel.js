const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('gabel')
        .setDescription('Wirf oder picks mit Gabeln nach Leuten!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du mit einer Gabel werfen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const gabelUser = interaction.options.getMember('user');
        let antworten;

        if (gabelUser) {
            
            antworten = [
                `*${interaction.user} pickst ${gabelUser} mit einer Gabel. Haha, du wurdest aufgegabelt!*`,
                `*${interaction.user} pickst ${gabelUser} mit einer Gabel. Haha, du wurdest aufgegabelt!*`,
                `*${interaction.user} pickst ${gabelUser} mit einer Gabel. Haha, du wurdest aufgegabelt!*`,
                `*${interaction.user} wirft Gabeln nach ${gabelUser} und gabelt ${gabelUser} damit an die Wand.*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hält energisch eine Gabel in der Hand*`,
                `*${interaction.user} pickst sich selbst mit einer Gabel...*`,
                `*${interaction.user} hat Hunger und pickst sich selbst mit einer Gabel... Kann jemand helfen? Das sieht mir nicht ganz natürlich aus...*`
            ]
        }
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};