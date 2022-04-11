const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('throw')
        .setDescription('Bewirf Leute mit Random Dingen.')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User den du bewerfen willst.')
            .setRequired(true)),

    /**
     *@param {import('discord.js').Interaction} interaction
     */
    async execute(interaction) {
        const toasterUser = interaction.options.getMember('user');
        let antworten = [
            'einem Toaster',
            'einer Küchenmaschine',
            'einem Kühlschrank',
            'Tom',
            'Deno',
            'einem Fernseher',
            'einem Waschmaschine',
            'einem Trockner',
            'einer Kloschüssel',
            'einer Tür',
            'Tomaten',
            'nassen Lappen',
            'einem Schlappen',
            'einer Glas Flasche',
            'einem Tisch',
            'einer PS1',
            'einer PS2',
            'einer PS3',
            'einer PS4',
            'einer PS5',
            'einer PS6',
            'einer Wii-Mote weil man "vergessen" hat das Bändchen umzubinden',
            'einer Wii-Mote weil man das Bändchen umgebunden hat',
            'einem Auto',
            'einem Opel Astra',
            'einem Keyblade',
            'einem Gecko',
            'einem Sandkorn',
            'einer Genkidama',
            'einem Lichtschwert',
            'einem Pokeball... Gonna catch em all!',
            'einem Controller',
            'einer Lampe',
            'einer Granate',
            'Wurftsternen',
            'Duftbombe weil du stinkst',
            'einem Blatt',
            'einem Wattepad',
            '-1 lagigen Klopapier',
            'einer Europalette',
            'einem Gabelstapler',
            'einem 1ct',
            'einem T-Shirt',
            'einer Jacke',
            'sich selbst. YEEET',
            'einer Portal Gun',
            'einem Waifu-Pillow',
            'einem Schredder',
            'einem Schrank',
            'einem ODM Gear',
            'einem Titan',
            'einem Shonen Protagonist',
            'Nudeln',
            'Ravioli',
            'einem Plastikstrohhalm',
            'einem Glasstrohhalm',
            'einem Plastikteller',
            'einem Pappteller',
            'einem Asthmaspray',
            'einem TicTac',
            'einer Tafel Schokolade',
            'dem Mastersword',
            'einer aufgegessenen Chips Tüte',
            'einem Spiegel',
            'schlechten Game Design',
            'einer Spitzhacke',
            'einem Plastikflugzeug',
            'einem Papierflugzeug',
            'einem Kreditkarte',
            'einem Teddybär',
            'einer RTX 3080',
            'Nintendo Charakteren',
            'Cappy aus Mario Odyssey',
            'den Infinity Stones',
            'Stormbraker',
            'Mjolnir',
            'Captain Americas Schild',
            'einer Gardine',
            'einem Hund',
            'einem Katze',
            'einem Hamster',
            'einem Pferd',
            'einer Schlange',
            'einer giftigen Schlange',
            'einer Oculus Rift',
            'einem Ofen',
            'einem heißen Ofen',
            'einem Lehrer',
            'GLaDOS',
            'einer Zigarette',
            'einem TARDIS',
            'einem Subwoofer',
            'einer Dubstep Gun',
            'einem Schneeball',
            'einem Dalek',
            'einem Feuerball',
            'einem Todesball',
            'einer Majoras Mask',
            'einem Triforce',
            'einem Ocarina of Time',
            'einem Drachi',
            'einem Wolfiii',
            'einem Lutz',
            'einem Floet',
            'einem Greeencube',
            'einem Pikmin',
            'einem Bett',
            'Schulden',
            'einer Hochzeit',
            'einem Fussballstadion',
            'der Allianz Arena',
            'Heroin',
            'Obdachlosigkeit',
            'Scheidungspapieren',
            'einer Random Stadt',
            'nichts',
            'einem Auto',
            'ÖKOLJUHBEFPGIWUBEPFGIKUWZGE=F(IPUNWHEPI$O)G=/UZGHWEPOG)IU(HW§=$)T(/"HZ§?)T(U/HGWEPIOVNUDVPOSJvopwu48tzh0ß39284gujhaß9we487zht3ß9rgvjnaße958zg==',
            'Boomern',
            'Lebenshilfe',
            'Depression',
            'einem Bügeleisen',
            'einem traurigen Leben mit einer schlechten Karriere, einer schrecklichen Familie und Krebs im Endstadium',
            'Tot',
            'deiner Mum',
            'einem Hochzeitsring',
            'der Sonne',
            'Rickroll',
            'Hass',
            'schlechten Witzen',
            'Komplimenten'
        ]
        for (let i = antworten.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() *(i + 1));
            const temp = antworten[i];
            antworten[i] = antworten[j];
            antworten[j] = temp;
        }
        antworten[Math.floor(Math.random() *antworten.length)]
        if(Math.random()*10===1) {
            if(Math.random()*10===1) {
                await interaction.reply(`TRIPLE THROW! ${interaction.user} bewirft ${toasterUser} mit ${antworten[Math.floor(Math.random() *antworten.length)]}, ${antworten[Math.floor(Math.random() *antworten.length)]} und ${antworten[Math.floor(Math.random() *antworten.length)]}`);
            }
            await interaction.reply(`DOUBLE THROW! ${interaction.user} bewirft ${toasterUser} mit ${antworten[Math.floor(Math.random() *antworten.length)]} und ${antworten[Math.floor(Math.random() *antworten.length)]}`);
        } else await interaction.reply(`${interaction.user} bewirft ${toasterUser} mit ${antworten[Math.floor(Math.random() *antworten.length)]}`)
    },
};