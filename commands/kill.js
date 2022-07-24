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
        await interaction.deferReply();
        const killUser = interaction.options.getMember('user');
        let antworten;

        if (killUser) {
            
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
        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};