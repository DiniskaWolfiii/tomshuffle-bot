const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Bring Leute um')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du umbringen willst...')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const killUser = interaction.options.getMember('user');
        let antworten;

        if (killUser) {
            if (killUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

            antworten = [
                `*${interaction.user} bringt ${killUser} um :skull:*`,
                `*${interaction.user} bringt ${killUser} um :skull:*`,
                `*${interaction.user} bringt ${killUser} um :skull:*`,
                `*${interaction.user} bringt ${killUser} um :skull:*`,
                `*${interaction.user} bringt ${killUser} um :skull:*`,
                `*${interaction.user} zwingt ${killUser} ein Gift zu trinken :skull:*`,
                `*${interaction.user} zwingt ${killUser} ein Gift zu trinken :skull:*`,
                `*${interaction.user} zwingt ${killUser} ein Gift zu trinken, überlebt es aber. ÄTSCH :stuck_out_tongue:*`
            ]
        } else {
            antworten = [
                `*${interaction.user} hat das Verlangen jemanden umzubringen :skull:*`,
                `*${interaction.user} hat das Verlangen jemanden umzubringen :skull:*`,
                `*${interaction.user} hat das Verlangen jemanden umzubringen :skull:*`,
                `*${interaction.user} zückt ein Messer und schaut dabei jemand in diesem Raum an :eyes::skull:*`,
                `*${interaction.user} bringt sich selbst um :skull:*`,
                `*${interaction.user} bringt sich selbst um :skull:*`,
                `*${interaction.user} bringt sich selbst um :skull:*`,
                `*${interaction.user} versucht sich selbst umzubringen... Hat aber vackackt :P*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};