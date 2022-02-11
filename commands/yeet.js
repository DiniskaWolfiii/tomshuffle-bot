const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('yeet')
        .setDescription('Yeete andere quer durch den Raum!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du yeeten willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const yeetUser = interaction.options.getMember('user');
        let antworten;

        if (yeetUser) {
            if (yeetUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })

            antworten = [
                `*${interaction.user} yeeted ${yeetUser} aus dem Channel*`,
                `*${interaction.user} yeeted ${yeetUser} aus dem Channel*`,
                `*${interaction.user} yeeted ${yeetUser} aus dem Channel*`,
                `*${interaction.user} yeeted ${yeetUser} durch den Channel. WEEEEEEEEEEE*`,
                `*${interaction.user} versucht ${yeetUser} wegzuyeeten... ${yeetUser} ist aber zu dick und kann nicht geyeeted werden*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} yeeted sich selbst weg*`,
                `*${interaction.user} yeeted sich selbst aus dem Raum*`,
                `*${interaction.user} hat das Verlangen jemanden weg zu yeeten*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};