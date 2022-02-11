const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('fire')
        .setDescription('Zünde jemand an!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du anzünden willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const fireUser = interaction.options.getMember('user');
        let antworten;

        if (fireUser) {
            if (fireUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            
            antworten = [
                `*${interaction.user} zündet ${fireUser} an :fire:*`,
                `*${interaction.user} zündet ${fireUser} an :fire:*`,
                `*${interaction.user} zündet ${fireUser} an :fire:*`,
                `*Beim Versuch ${fireUser} anzuzünden, stolpert ${interaction.user} und setzt ausversehen den Channel in Brand :fire:*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hält einen Feuerball in der Hand, und hat keine Angst diesen einzusetzen :fire:*`,
                `*${interaction.user} zündet sich selbst an :fire:*`,
                `*${interaction.user} zündet sich selbst an... :fire: You good bro?*`,
                `*${interaction.user} zündet sich selbst an :fire:*`,
                `*${interaction.user} zündet sich selbst an :fire:*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};