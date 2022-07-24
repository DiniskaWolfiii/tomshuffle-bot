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
        await interaction.deferReply();
        const yeetUser = interaction.options.getMember('user');
        let antworten;

        if (yeetUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};