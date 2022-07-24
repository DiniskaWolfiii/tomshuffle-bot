const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('feed')
        .setDescription('Füttere andere User!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User den du füttern willst')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('futter')
                .setDescription('Futter mit dem du den User füttern willst')
                .setRequired(false)
        ),

    /**
     * @param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply();
        const feedUser = interaction.options.getMember('user');
        const feedStuff = interaction.options.getString('futter');

        if (feedStuff) await interaction.editReply(`*${interaction.user} füttert ${feedUser} mit ${feedStuff}*`)
        else { 
        let antworten = [
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser}*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit Fleisch*`,
            `*${interaction.user} füttert ${feedUser} mit einer Autobatterie*`,
            `*${interaction.user} füttert ${feedUser} mit einem halben Reifen*`,
            `*${interaction.user} füttert ${feedUser} mit einem ganzen Reifen*`,
            `*${interaction.user} füttert ${feedUser} mit Speck*`,
            `*${interaction.user} füttert ${feedUser} mit Schokolade*`,
            `*${interaction.user} füttert ${feedUser} mit Rührei*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Kuchen*`,
            `*${interaction.user} füttert ${feedUser} mit Erdbeerkäse*`,
            `*${interaction.user} füttert ${feedUser} mit Holz*`,
            `*${interaction.user} füttert ${feedUser} mit Metall*`,
            `*${interaction.user} füttert ${feedUser} mit Geckos*`,
            `*${interaction.user} füttert ${feedUser} mit Geckos*`,
            `*${interaction.user} füttert ${feedUser} mit Geckos*`,
            `*${interaction.user} füttert ${feedUser} mit Geckos*`,
            `*${interaction.user} füttert ${feedUser} mit Geckos*`,
            `*${interaction.user} füttert ${feedUser} mit Geckos*`,
            `*${interaction.user} füttert ${feedUser} mit Weizenbrot*`,
            `*${interaction.user} füttert ${feedUser} mit Vollkornbrot*`,
            `*${interaction.user} füttert ${feedUser} mit Körnerbrot*`,
            `*${interaction.user} füttert ${feedUser} mit Butter*`,
            `*${interaction.user} füttert ${feedUser} mit Toastbrot*`,
            `*${interaction.user} füttert ${feedUser} mit Weißbrot*`,
            `*${interaction.user} füttert ${feedUser} mit einem Krabben Burger*`,
            `*${interaction.user} füttert ${feedUser} mit einem gefakedem Krabben Burger*`,
            `*${interaction.user} füttert ${feedUser} mit Oliven*`,
            `*${interaction.user} füttert ${feedUser} mit einer verbrühten Suppe*`,
            `*${interaction.user} füttert ${feedUser} mit Salz*`,
            `*${interaction.user} füttert ${feedUser} mit Pfeffer*`,
            `*${interaction.user} füttert ${feedUser} mit Rohen Nudeln*`,
            `*${interaction.user} füttert ${feedUser} mit Dachziegel*`,
            `*${interaction.user} füttert ${feedUser} mit Backstein*`,
            `*${interaction.user} füttert ${feedUser} mit Zander*`,
            `*${interaction.user} füttert ${feedUser} mit Fledermäusen*`,
            `*${interaction.user} füttert ${feedUser} mit einer Laterne*`,
            `*${interaction.user} füttert ${feedUser} mit einer Straßenlaterne*`,
            `*${interaction.user} füttert ${feedUser} mit Photovoltaikanlage*`,
            `*${interaction.user} füttert ${feedUser} mit AKW*`,
            `*${interaction.user} füttert ${feedUser} mit nichts*`,
        ]
        for (let i = antworten.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = antworten[i];
            antworten[i] = antworten[j];
            antworten[j] = temp;
        }

        await interaction.editReply(antworten[Math.floor(Math.random() * antworten.length)])
    }

    },
};