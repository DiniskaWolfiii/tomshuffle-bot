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
        const gabelUser = interaction.options.getMember('user');
        let antworten;

        if (gabelUser) {
            if (gabelUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true });
            
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
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};