const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('thema')
        .setDescription('Eröffne ein Thema zum diskutieren!')
        .addStringOption(option => 
            option.setName('thema')
            .setDescription('Das Thema über das du diskutieren wiilst')
            .setRequired(true)
        ),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        if(interaction.channelId !== '993610161656713406') {
            return await interaction.reply({content: 'Falscher Kanal! Gebe dir die Diskutieren Rolle in ' + interaction.guild.channels.cache.find(c=>c.id==='941438003144966184').toString() + ' und gehe dann in den Diskutieren Kanal um über ein Thema zu diskutieren!', ephemeral: true});
        }
    
        if (interaction.channel.topic.startsWith('AKTIV:')) {
            return await interaction.reply({ content: 'Es ist gerade ein Thema zum Diskutieren am laufen! Checke die Channel Beschreibung!', ephemeral: true });
        }
        const thema = interaction.options.getString('thema');
        let themenKanal = interaction.guild.channels.cache.findKey(c => c.id === '993610161656713406')
        if (!themenKanal) return;
        try {
            interaction.reply({content: `Alles klar! Das neue Thema zum diskutieren lautet: **${thema}.** 2 Stunden laufen ab... JETZT!`})
            interaction.channel.setTopic(`AKTIV: ` + thema)
            setTimeout(() => {
                let vorbeiEmbed = new Discord.MessageEmbed()
                    .setDescription(`Thema zum diskutieren vorbei! Jetzt kann mit /thema ein neues Thema zum diskutieren gewählt werden!`)
                    .setThumbnail('https://cdn.discordapp.com/attachments/297765250382430208/942030157886140466/Unbenannt-19.jpg')
                    .setColor('585858')
                interaction.channel.send({embeds: [vorbeiEmbed]})
                interaction.channel.setTopic('FREI. Starte ein neues Thema mit /thema')
            }, 7200000);
        }
        catch (err) {
            console.log(err);
        }
    },
};