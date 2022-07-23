const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('pinch')
        .setDescription('Zwick leute!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du zwicken willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const pinchUser = interaction.options.getMember('user');
        let antworten;

        if (pinchUser) {
            if (pinchUser.user.id === interaction.user.id) return await interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken!', ephemeral: true })

            antworten = [
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser}*`,
                `*${interaction.user} zwickt ${pinchUser} an der Nase*`,
                `*${interaction.user} zwickt ${pinchUser} an den Augen*`,
                `*${interaction.user} zwickt ${pinchUser} am Ass*`,
                `*${interaction.user} zwickt ${pinchUser} an den Armen*`,
                `*${interaction.user} zwickt ${pinchUser} an Stellen über die wir nicht erwähnen wollen :eyes:*`,
            ]
        } else {
            antworten = [
                `*${interaction.user} will jemand zwicken :eyes:*`,
                `*${interaction.user} will jemand zwicken :eyes:*`,
                `*${interaction.user} will jemand zwicken :eyes:*`,
                `*${interaction.user} will jemand zwicken :eyes:*`,
                `*${interaction.user} will jemand zwicken :eyes:*`,
                `*${interaction.user} hat das Bedürfnis jemand zu zwicken :eyes:*`,
                `*${interaction.user} hat das Bedürfnis jemand zu zwicken :eyes:*`,
                `*${interaction.user} hat das Bedürfnis jemand zu zwicken :eyes:*`,
                `*${interaction.user} hat das Bedürfnis jemand zu zwicken :eyes:*`,
                `*${interaction.user} hat das Bedürfnis jemand zu zwicken :eyes:*`,
                `*${interaction.user} zwickt sich selbst*`,

            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};