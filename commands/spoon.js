const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('spoon')
        .setDescription('Löffel ein paar Leuten eine :)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du eine Löffeln willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const spoonUser = interaction.options.getMember('user');
        let antworten;

        if (spoonUser) {
            if (spoonUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

            antworten = [
                `*${interaction.user} löffelt ${spoonUser} eine :spoon:*`,
                `*${interaction.user} löffelt ${spoonUser} eine :spoon:*`,
                `*${interaction.user} löffelt ${spoonUser} eine :spoon:*`,
                `*Beim Versuch ${spoonUser} eine zu löffeln, erreicht der Löffel 1.000 Grad und ${interaction.user} verbrennt sich die Hände :spoon:*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hat das Verlangen jemanden zu eine zu löffeln :spoon:*`,
                `*${interaction.user} hält energisch einen Löffel in der Hand :spoon:*`,
                `*${interaction.user} hält einen Löffel in der Hand :spoon:*`,
                `*${interaction.user} hält energisch einen Löffel in der Hand :spoon:*`,
                `*${interaction.user} löffelt sich selbst :spoon:*`,
                `*${interaction.user} löffelt sich selbst eine :spoon:*`,
                `*${interaction.user} hebt einen Löffel :spoon:*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};