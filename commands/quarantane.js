const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('quarantane')
        .setDescription('Schiebe jemand in Quarantäne')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du in Quarantäen schieben willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const quarantaneUser = interaction.options.getMember('user');
        let antworten;

        if (quarantaneUser) {
            if (quarantaneUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

            antworten = [
                `*${interaction.user} schiebt ${quarantaneUser} in Quarantäne! 14 Tage ab jetzt*`,
                `*${interaction.user} schiebt ${quarantaneUser} in Quarantäne!*`,
                `*${interaction.user} schiebt ${quarantaneUser} in Quarantäne!*`,
                `*${interaction.user} schiebt ${quarantaneUser} in Quarantäne, trotz eines Negativen Testes!*`,
                `*${interaction.user} yeeted ${quarantaneUser} in Quarantäne! Bis in 14 Tagen!*`,
                `*${quarantaneUser} wird von ${interaction.user} in Quarantäne geschoben. Bis in 14 Tagen!*`
            ]
        } else {
            antworten = [
                `*${interaction.user} will jemand in Quarantäne schicken... :eyes:*`,
                `*${interaction.user} hat Angst und schiebt gleich jemand in Quarantäne...*`,
                `*${interaction.user} hat kein Bock mehr und beantragt Quarantäne für 2 Jahre...*`,
                `*${interaction.user} schiebt sich selbst in Quarantäne... Bis in 14 Tagen!*`,
                `*${interaction.user} befindet sich noch in Quarantäne... Die geht noch... Hat niemand dokumentiert... Also von neu. 14 Tage!*`,
                `*${interaction.user} geht in Quarantäne*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};