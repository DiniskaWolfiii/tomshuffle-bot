const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('coffee')
        .setDescription('Trink oder gib anderen Kaffee!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User dem du ein Kaffee spendieren willst')
                .setRequired(false)),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const coffeeUser = interaction.options.getMember('user');
        let antworten;

        if (coffeeUser) {
            if (coffeeUser.user.id === interaction.user.id) return interaction.reply({ content: 'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.', ephemeral: true })
            
            antworten = [
                `*${interaction.user} gibt ${coffeeUser} einen Latte Macchiato*`,
                `*${interaction.user} gibt ${coffeeUser} einen Java Chip Frappucino*`,
                `*${interaction.user} gibt ${coffeeUser} einen Pumpkin Pie Latte*`,
                `*${interaction.user} gibt ${coffeeUser} einen Espresso*`,
                `*${interaction.user} gibt ${coffeeUser} einen Vanille Chocolate Latte*`,
                `*${interaction.user} gibt ${coffeeUser} einen Kaffee*`,
                `*${interaction.user} gibt ${coffeeUser} einen White Chocolate Macchiato*`,
                `*${interaction.user} gibt ${coffeeUser} einen Caffè Latte*`,
                `*${interaction.user} gibt ${coffeeUser} einen Cappuccino*`,
                `*${interaction.user} gibt ${coffeeUser} einen Caramel Macchiato*`,
                `*${interaction.user} gibt ${coffeeUser} einen Caffè Mocha*`,
                `*${interaction.user} gibt ${coffeeUser} einen Caffè Americano*`
            ]
        } else {
            antworten = [
                `*${interaction.user} trinkt einen Latte Macchiato*`,
                `*${interaction.user} trinkt einen Java Chip Frappucino*`,
                `*${interaction.user} trinkt einen Pumpkin Pie Latte*`,
                `*${interaction.user} trinkt einen Espresso*`,
                `*${interaction.user} trinkt einen Vanille Chocolate Latte*`,
                `*${interaction.user} trinkt einen Kaffee*`,
                `*${interaction.user} trinkt einen White Chocolate Macchiato*`,
                `*${interaction.user} trinkt einen Caffè Latte*`,
                `*${interaction.user} trinkt einen Cappuccino*`,
                `*${interaction.user} trinkt einen Caramel Macchiato*`,
                `*${interaction.user} trinkt einen Caffè Mocha*`,
                `*${interaction.user} trinkt einen Caffè Americano*`
            ]
        }
        let randomNumber = Math.floor(Math.random() * antworten.length);
        await interaction.reply(antworten[randomNumber])

    },
};