const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('custom')
        .setDescription('stuff'),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {

        // Get GuildIcon
        /*
        const guild = interaction.guild;
        await interaction.reply({content:guild.iconURL()});
        */
        //Give All Members Role
        const guild = interaction.guild;
        await interaction.reply({content: 'Working...', ephemeral: true})

        try {
            guild.members.fetch().then(members => {
                members.forEach(member => {
                    member.roles.add('943969798231056414', 'Auto Role')
                })
            })
            interaction.editReply('Done!');    
        } catch (error) {
            interaction.editReply('ERROR!')
        }
        
        
    },
};