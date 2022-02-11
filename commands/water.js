const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('water')
        .setDescription('Trink oder gib anderen Wasser!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du Wasser geben willst!')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const waterUser = interaction.options.getMember('user');
        let antworten;

        if (waterUser) {
            if (waterUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            antworten = [
                `*${interaction.user} gibt ${waterUser} Wasser*`,
                `*${interaction.user} gibt ${waterUser} Wasser*`,
                `*${interaction.user} gibt ${waterUser} Wasser*`,
                `*${interaction.user} gibt ${waterUser} Wasser. Stay hydrated!*`,
                `*${interaction.user} gibt ${waterUser} Wasser. Stay hydrated!*`,
                `*${interaction.user} gibt ${waterUser} Wasser. Stay hydrated!*`,
                `*${interaction.user} gibt ${waterUser} Wasser. Stay hydrated!*`,
                `*${interaction.user} gibt ${waterUser} so viel Wasser dass ${waterUser} ertrinkt... Stay hydrated!*`,
                `*Beim Versuch ${waterUser} Wasser zu geben, stolpert ${interaction.user} und übergießt das ganze Wasser auf ${waterUser.user}...*`,
                `*Beim Versuch ${waterUser} Wasser zu geben, stolpert ${interaction.user} und übergießt das ganze Wasser auf ${waterUser.user}... Hoffentlich deckt ${interaction.user}'s sowas ab :grimacing:'`,
                `*Auf dem Weg ${waterUser} Wasser zu geben, verspührt ${interaction.user} selber Durst und trinkt das ganze Wasser leer...`
            ]
        } else {
            antworten = [
                `*${interaction.user} trinkt Wasser*`,
                `*${interaction.user} trinkt Wasser*`,
                `*${interaction.user} trinkt Wasser*`,
                `*${interaction.user} trinkt Wasser*`,
                `*${interaction.user} trinkt Wasser*`,
                `*${interaction.user} trinkt Wasser*`,
                `*${interaction.user} trinkt Wasser*`,
                `*${interaction.user} trinkt so viel Wasser dass ${interaction.user} ertrinkt... Stay hydrated!*`,
                `*Beim Versuch Wasser zu trinken stolpert ${interaction.user} und überkippt was Wasser über die ganzen Klamotten...*`,
                `*Beim Versuch Wasser zu trinken stolpert ${interaction.user} und ist nun Nass... Hoffentlich ist ${interaction.user} nicht Wasserscheu :grimacing:*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};