const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('microwave')
        .setDescription('Pack leute in eine Mikrowelle!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du in die Mikrowelle packen willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const microwaveUser = interaction.options.getMember('user');
        let antworten;

        if (microwaveUser) {
            if (microwaveUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

            antworten = [
                `*${interaction.user} packt ${microwaveUser} in die Mikrowelle*`,
                `*${interaction.user} packt ${microwaveUser} in die Mikrowelle*`,
                `*${interaction.user} packt ${microwaveUser} in die Mikrowelle*`,
                `*${interaction.user} packt ${microwaveUser} bei 800W für 3 Minuten in die Mikrowelle*`,
                `*${interaction.user} packt ${microwaveUser} bei 3000W für 5 Sekunden in die Mikrowelle*`,
                `*${interaction.user} packt ${microwaveUser} bei 187W für 3 Stunden in die Mikrowelle*`,
                `*${interaction.user} vergisst ${microwaveUser} in der Mikrowelle*`,
                `*${interaction.user} packt ${microwaveUser} für 0,01W bei 96 Stunden Mikrowelle*`,
                `*${interaction.user} wirft ${microwaveUser} mit Schmagges in die Mikrowelle*`,
                `*${interaction.user} wirft ${microwaveUser} mit Schmagges in die Mikrowelle*`,
                `*${interaction.user} stopft ${microwaveUser} in die Mikrowelle, schaltet sie an und geht weg*`
            ]
        } else {
            antworten = [
                `*${interaction.user} holt eine Mikrowelle*`,
                `*${interaction.user} holt eine Mikrowelle*`,
                `*${interaction.user} holt eine Mikrowelle*`,
                `*${interaction.user} holt eine Mikrowelle*`,
                `*${interaction.user} holt eine Mikrowelle und hat keine Angst sie einzusetzen*`,
                `*${interaction.user} holt eine Mikrowelle und hat keine Angst sie einzusetzen*`,
                `*${interaction.user} holt eine Mikrowelle und hat keine Angst sie einzusetzen*`,
                `*${interaction.user} hat das Verlangen jemand in eine Mikrowelle zu stopfen*`,
                `*${interaction.user} hat das Verlangen jemand in eine Mikrowelle zu stopfen*`,
                `*${interaction.user} hat Hunger. Will jemand freiwillig in die Mikrowelle springen?*`,

            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};