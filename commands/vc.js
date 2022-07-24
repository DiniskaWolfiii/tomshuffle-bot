const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('vc')
        .setDescription('Schiebe Leute in den Voice')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du in den Voice schieben willst')
                .setRequired(true)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();

        const voiceUser = interaction.options.getMember('user');

        let antworten = [
            `*${interaction.user} schiebt ${voiceUser} in den Voice Chat*`,
            `*${interaction.user} schiebt ${voiceUser} in den Voice Chat*`,
            `*${interaction.user} schiebt ${voiceUser} in den Voice Chat*`,
            `*${interaction.user} schleift ${voiceUser} in den Voice Chat*`,
            `*${interaction.user} schleift ${voiceUser} in den Voice Chat*`,
            `*${interaction.user} schleift ${voiceUser} in den Voice Chat*`,
            `*${interaction.user} packt ${voiceUser} und wirft ${voiceUser} in den Voice Chat*`,
            `*${interaction.user} packt ${voiceUser} und wirft ${voiceUser} in den Voice Chat*`,
            `*${voiceUser} hat keine Lust, wird aber von ${interaction.user} in den Voice Chat geschoben*`,
            `*${voiceUser} hat keine Lust, wird aber von ${interaction.user} in den Voice Chat geschoben*`,
            `*${voiceUser} hat keine Lust, wird aber von ${interaction.user} gewaltsam in den Voice Chat geschoben*`,
            `*${voiceUser} hat keine Lust, wird aber von ${interaction.user} gewaltsam in den Voice Chat geschoben*`,
            `*${interaction.user} will unbedingt mit ${voiceUser} im Voice Chat reden*`,
            `*${interaction.user} will unbedingt mit ${voiceUser} im Voice Chat reden*`,
            `*${interaction.user} hat Bock mit ${voiceUser} zu labern*`,
            `*${interaction.user} hat Bock mit ${voiceUser} zu labern*`
        ];

        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    },
};