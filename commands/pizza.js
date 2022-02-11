const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('pizza')
		.setDescription('Iss ein Stück Pizza')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User dem du Pizza geben willst')
            .setRequired(false)),
		
/**
 * @param {import('discord.js').Interaction} interaction
 */
	async execute(interaction) {
		const pizzaUser = interaction.options.getMember('user');
        let antworten;

        if(pizzaUser) {
            if(pizzaUser.user.id===interaction.user.id) return await interaction.reply({content:'Du kannst den Command nicht auf dich selber wirken! Für dich selbst, gib keinen User an.',ephemeral:true})
            antworten = [
                `*${interaction.user} gibt ${pizzaUser} ein Stück Pizza :pizza:*`,
                `*${interaction.user} gibt ${pizzaUser} ein Stück Pizza :pizza:*`,
                `*${interaction.user} brät ${pizzaUser} eine mit einem Stück Pizza drüber :pizza:*`
            ]
        } else {
            antworten = [
                `*${interaction.user} isst Pizza :pizza:*`,
                `*${interaction.user} isst Pizza :pizza:*`,
                `*${interaction.user} isst Pizza :pizza:*`,
                `*${interaction.user} isst Pizza :pizza:*`,
                `*${interaction.user} isst Pizza :pizza:*`,
                `*${interaction.user} frisst Pizza, gibt aber niemandem ein Stück davon ab! :pizza:*`
            ]
        }
        await interaction.reply(antworten[Math.floor(Math.random() * antworten.length)])
	},
};