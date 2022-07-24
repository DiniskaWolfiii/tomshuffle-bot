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
        await interaction.deferReply();
        const spoonUser = interaction.options.getMember('user');
        let antworten;

        if (spoonUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};