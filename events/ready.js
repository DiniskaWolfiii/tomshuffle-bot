module.exports = {
    name: 'ready',
    once: true,
/**
 * @param {import('discord.js').Client} client
 */
    execute (client) {
        console.log(`Succesfully logged in as ${client.user.username} with ID ${client.user.id}!`);
        let stati = [
            'Habe ich den Ofen ausgeschaltet?',
            'Sollte ich doch nochmal pinkeln gehen?',
            'Gibt es intelligentes Leben auf der Erde?',
            'Wie heißt Obama mit Nachnamen?',
            'Roboter übernehmen die Meschheit! 🤖',
			'Wie pusten Drachen Kerzen aus?',
            'A party without a cake is just a meeting.',
            'Schaut alte Projekte an...',
            'Löscht alte Videos von Tom... 🤓',
            'Geht die Audit Logs durch... 👀',
            'Kontrolliert die User... 👀',
            'Kontrolliert die Mods... 👀',
            'Kontrolliert die Admins... 👀',
            'Kontrolliert Tom... 👀',
            'Kontrolliert Deno... 👀',
            'Kontrolliert die Bots... 👀',
            'Plant neue Video Projekte...',
            'Schaut um sich umher...',
            'Schnuppert an Blumen... 🌸',
            'Sorgt für Recht und Ordnung...',
            '👀'
        ]

        client.user.setActivity(stati[Math.floor(Math.random() * stati.length)], { type: 'PLAYING' });
    }
}