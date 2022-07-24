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
        await interaction.deferReply();
        const quarantaneUser = interaction.options.getMember('user');
        let antworten;

        if (quarantaneUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};