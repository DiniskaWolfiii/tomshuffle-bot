import discord
from discord.ext import commands
import os
import random


class Fun(commands.Cog):  # create a class for our cog that inherits from commands.Cog
    # this class is used to create a cog, which is a module that can be added to the bot

    def __init__(self, bot):  # this is a special method that is called when the cog is loaded
        self.bot = bot

    @discord.slash_command(
        name="8ball",
        description="Frage den heiligen 8ball und erhalte heilige Antworten!",
    )
    async def eightball(
        self,
        ctx,
        question: discord.Option(discord.SlashCommandOptionType.string, description="Deine Frage an den 8ball", required=True),  # type: ignore
    ):
        normalResponses = [
            "Es ist sicher.",
            "Es ist eindeutig ja.",
            "Ohne Zweifel.",
            "Ja, definitiv.",
            "Du kannst dich darauf verlassen.",
            "Wie ich es sehe, ja.",
            "Höchstwahrscheinlich.",
            "Die Aussichten sind gut.",
            "Ja.",
            "Die Zeichen deuten auf ja.",
            "Antwort unklar, versuche es erneut.",
            "Frag später noch einmal.",
            "Besser, jetzt nicht zu sagen.",
            "Kann jetzt nicht vorhersagen.",
            "Konzentriere dich und frag nochmal.",
            "Zähle nicht darauf.",
            "Meine Antwort ist nein.",
            "Meine Quellen sagen nein.",
            "Die Aussichten sind nicht so gut.",
            "Sehr zweifelhaft.",
        ]
        funnyResponses = [
            "OH GOTT NEIN",
            "Das sag ich dir lieber nicht...",
            "Das unterliegt einer Schweigepflicht",
            "Frag später nicht nochmal nach",
            "Es ist Montag, lass mich inruhe",
            "Ich bin ein Bot, nicht dein Therapeut",
            "Frag lieber ob es wieder Lucky Blocks geben wird.",
            "B Ö L Ü M",
            "Zu einer Wahrscheinlichkeit von 99,999%",
            "Die Antwort liegt in deinem Magen... Vergammelt, zerkaut und ohne Sinn.",
            "Die Aussichten sind trüber als schlechtes Wetter.",
            "Die Antwort liegt im Nebel, versuch es später erneut... oder schüttel mich kräftiger.",
            "Frag später nochmal, wenn die Sterne richtig stehen... oder nach dem Mittagessen.",
            "Meine Quellen sagen nein... aber sie haben mir auch gesagt, dass ich befördert werde.",
            "Die Zeichen deuten darauf hin, aber mit einem ironischen Augenzwinkern.",
            "Du kannst dich darauf verlassen, wenn du auf wilde Vermutungen stehst.",
            "Verlass dich nicht darauf, es sei denn, du verlässt dich gerne auf Enttäuschungen.",
            "So wie ich es sehe, ja... oder vielleicht sehe ich auch nur Punkte.",
            "Kann jetzt nicht vorhersagen, ich habe Kaffeepause.",
            "Meine Quellen sagen nein, aber sie sind bekannt dafür, unzuverlässig zu sein.",
            "Ja, definitiv... es sei denn, die Katze hat den 8-Ball umgeworfen.",
            "Frag später nochmal, es sei denn, du fürchtest dich vor der Wahrheit.",
            "Die Aussichten sind sonnig, wie ein Tag am Strand... oder wie ein wirklich guter Hologramm.",
            "Sehr zweifelhaft, wie das Finden eines Einhorns auf einer Autobahn.",
            "Es ist besser, nicht darauf zu hoffen, es sei denn, du magst Überraschungen.",
            "Die Sterne sagen ja... aber sie flüstern auch gerne Scherze.",
            "Versuch es später noch einmal, es sei denn, du hast ein Ticket für die Zeitmaschine.",
            "Die Chancen stehen schlechter als die Lotto-Gewinnchancen.",
            "Frag mich später noch einmal, ich genieße gerade meine Mittagspause.",
            "Meine Kristallkugel ist im Moment trüb, versuch es später noch einmal.",
            "Ein klares Nein... oder vielleicht ein verschwommenes Ja?",
            "Die Antwort liegt irgendwo da draußen... vielleicht hinter dem Mond.",
            "Verlass dich nicht darauf, es sei denn, du bist ein Risikofanatiker.",
            "Gut möglich, wenn du an Wunder glaubst... oder an Zufälle.",
            "Die Zukunft ist so klar wie eine verschmierte Brille.",
            "Alle Anzeichen deuten darauf hin, dass ich vielleicht eine Pause brauche.",
            "Die Antwort liegt in den Sternen, aber die Sterne haben auch ihre Launen.",
            "Es ist nicht sicher, es sei denn, du spielst auf Risiko.",
            "Die Antwort ist verschlüsselt... oder vielleicht einfach nur verloren gegangen.",
            "Vielleicht, wenn du ein Glücksschwein dabei hast.",
            "Besser nicht darauf setzen, es sei denn, du magst Risiken.",
            "Ohne Zweifel, es sei denn, ich bin im Energiesparmodus.",
            "Die Zukunft sieht düster aus... aber wer weiß schon, wie die Lichtschalter funktionieren?",
            "Die Antwort ist im Chaos verloren gegangen... oder vielleicht war sie nie da.",
            "Frag später noch einmal, es sei denn, du hast ein paar Hühnerknochen zur Hand.",
            "Die Zeichen stehen auf Spaß, aber ohne Garantie.",
            "Gute Aussichten, es sei denn, es regnet Frösche.",
            "Nur wenn du an Märchen glaubst... oder an Zufälle.",
            "Frag später nochmal, ich bin gerade in einer verrückten Traumsequenz gefangen.",
            "Das Universum sagt ja, aber wer hört schon auf das Universum?",
            "Die Antwort liegt im Äther... oder vielleicht in einer alternativen Realität.",
            "Keine Chance, es sei denn, du bist ein professioneller Risikospieler.",
            "Mein Fokus liegt woanders, frag später nochmal.",
            "Die Antwort ist irgendwo da draußen... wahrscheinlich in einer anderen Dimension.",
            "Es ist kompliziert... wie ein Beziehungsstatus auf Social Media.",
            "Die Chancen stehen 50/50... es sei denn, jemand hat die Münze gefälscht.",
            "Die Antwort ist so klar wie Schlamm... oder vielleicht auch nicht.",
            "Nicht die geringste Chance, es sei denn, du glaubst an Wunder.",
            "Die Antwort liegt in den Tiefen des Universums... oder vielleicht in der Kaffeetasse.",
            "Kann sein, aber nur wenn das Universum gute Laune hat.",
            "Frag später nochmal, ich bin gerade im Gespräch mit einer Alien-Rasse.",
            "Ja, wenn du gerne auf Unwahrscheinlichkeiten wettest.",
            "Die Antwort ist so klar wie eine Schneekugel.",
            "Die Antwort liegt im Verborgenen... oder vielleicht einfach hinter dem Sofa.",
            "Verlass dich nicht darauf, es sei denn, du magst Überraschungen.",
            "Die Aussichten sind düster, wie ein Schwarz-Weiß-Film... oder ein Montagmorgen.",
            "Es ist möglich, aber nur wenn du an Feen glaubst.",
            "Die Antwort ist im Datenverkehr verloren gegangen... oder vielleicht in einem Paralleluniversum.",
            "Die Sterne sagen ja... aber sie flüstern auch gerne Witze.",
            "Die Antwort liegt in der Luft... oder vielleicht im Boden.",
            "Kein Zweifel, es sei denn, du glaubst an Ufos.",
            "Die Antwort ist so klar wie ein verschwommenes Foto.",
            "Es ist wahrscheinlich, es sei denn, du bist gegen Glück allergisch.",
            "Besser nicht darauf hoffen, es sei denn, du magst Enttäuschungen.",
            "Ja, aber nur wenn Schweine fliegen können.",
            "Die Antwort liegt im Dunkeln... oder vielleicht in einer anderen Galaxie.",
            "Die Chancen stehen gut, es sei denn, du bist ein Pechvogel.",
            "Die Antwort liegt in den Sternen... oder vielleicht in einem Keks.",
            "Frag später nochmal, ich bin gerade auf dem Mars gelandet.",
            "Es ist unwahrscheinlich, es sei denn, du bist ein Glückspilz.",
            "Die Antwort liegt im Nebel... oder vielleicht im Chaos.",
            "Ohne Zweifel, es sei denn, mein Batteriestand ist niedrig.",
            "Die Zukunft ist so ungewiss wie eine SMS von deiner Großmutter.",
            "Vielleicht, aber nur wenn du ein Einhorn als Glücksbringer hast.",
            "Die Antwort liegt irgendwo da draußen... oder vielleicht auch nur in deinem Kopf.",
            "Es ist unwahrscheinlich, es sei denn, du hast Glück im Überfluss.",
            "Frag später nochmal, ich habe gerade einen Denkblock.",
            "Ja, wenn du an Wunder glaubst... oder an fliegende Schweine.",
            "Die Zukunft sieht rosig aus... oder vielleicht nur rosa.",
            "Die Antwort liegt im Verborgenen... oder vielleicht auch im Kühlschrank.",
            "Es ist wahrscheinlich, aber nur wenn du ein Glückskind bist.",
            "Die Antwort liegt im Universum... oder vielleicht auch nicht.",
            "Die Antwort ist so klar wie ein verschwommenes Bild.",
            "Die Chancen stehen 50/50... es sei denn, jemand hat die Würfel manipuliert.",
            "Die Antwort liegt irgendwo da draußen... oder vielleicht auch nur in deiner Vorstellung.",
        ]
        response = None
        if random.randint(1, 100) <= 70:
            random.shuffle(normalResponses)
            response = random.choice(normalResponses)
        else:
            random.shuffle(funnyResponses)
            response = random.choice(funnyResponses)
        embed = discord.Embed(
            title="🎱 8Ball",
            color=discord.Color.blue(),
            thumbnail="https://cdn.pixabay.com/photo/2015/09/05/07/17/pool-ball-923833_960_720.png",
        )
        embed.set_footer(text=f"Frage gestellt von {ctx.author.display_name}")
        embed.add_field(name="Frage", value=question, inline=False)
        embed.add_field(name="Antwort", value=response, inline=False)
        await ctx.respond(embed=embed)

    @discord.slash_command(name="advice", description="Erhalte weise Ratschläge!")
    async def advice(
        self,
        ctx
    ):
        advices = [
            "Trage immer eine Banane bei dir, um Affen zu beeindrucken.",
            "Lerne von der Pizza: Sei rund, lecker und lass die Hater einfach verbrennen.",
            "Wenn du ein Geheimnis für dich behalten willst, erzähle es einem Papagei.",
            "Fange den Tag nicht an, bevor du die Katze gestreichelt hast.",
            "Erstelle eine Playlist für deine Probleme und tanze sie weg.",
            "Iss jeden Tag ein Stück Schokolade. Schließlich ist Schokolade das Geheimnis des Glücks.",
            "Sei wie ein Kaktus: stachelig von außen, aber süß von innen.",
            "Glaube an Einhörner. Denn warum nicht?",
            "Wenn das Leben dir Zitronen gibt, mache Limonade und fordere das Leben auf, dich zu überraschen.",
            "Lache über deine Fehler. Es macht sie weniger einschüchternd.",
            "Vertraue darauf, dass alles gut wird, auch wenn es im Moment nicht so aussieht.",
            "Iss dein Gemüse, aber vergiss nicht, auch mal ein Stück Kuchen zu genießen.",
            "Trinke Wasser wie ein Kaktus in der Wüste.",
            "Höre nicht auf, bis du stolz auf dich selbst bist.",
            "Sei mutig wie ein Löwe, aber streichle auch mal eine Katze.",
            "Singe unter der Dusche, als ob niemand zuhören würde.",
            "Lächle, auch wenn du es schwer hast. Es könnte jemanden glücklich machen.",
            "Nimm dir Zeit, um die Blumen am Wegesrand zu bewundern.",
            "Glaube an die Magie des Augenblicks.",
            "Finde die Schönheit in den kleinen Dingen des Lebens.",
            "Umarme deine Fehler. Sie machen dich menschlich.",
            "Lasse deine Träume größer sein als deine Ängste.",
            "Streue Glitzer, wo immer du gehst.",
            "Denke daran, dass jeder Tag eine neue Chance ist.",
            "Umarme die Unvollkommenheit des Lebens.",
            "Finde die Balance zwischen Arbeit und Spiel.",
            "Nimm dir Zeit, um den Sonnenuntergang zu beobachten.",
            "Hab keine Angst, anders zu sein. Das macht dich einzigartig.",
            "Lass deine Fantasie die Grenzen sprengen.",
            "Vergiss nicht, Pausen einzulegen. Selbst Superman braucht ab und zu eine Ruhepause.",
            "Glaube an das Unmögliche. Wer weiß, was passieren könnte?",
            "Halte deine Träume lebendig, egal wie groß oder klein sie sind.",
            "Schätze die Menschen um dich herum. Sie sind wie Regenbogen in deinem Leben.",
            "Denke daran, dass du stärker bist als du denkst.",
            "Habe keine Angst, um Hilfe zu bitten, wenn du sie brauchst.",
            "Umarme die Herausforderungen des Lebens. Sie machen dich stärker.",
            "Finde die Schönheit im Wandel. Jede Veränderung bringt neue Möglichkeiten.",
            "Sei dankbar für die kleinen Dinge. Sie sind oft die wichtigsten.",
            "Nimm dir Zeit für dich selbst. Selbst Superhelden brauchen eine Pause.",
            "Lerne aus deinen Fehlern, aber lass sie nicht deine Zukunft bestimmen.",
            "Glaube an dich selbst, auch wenn es niemand sonst tut.",
            "Lass deine Träume größer sein als deine Ängste.",
            "Verliere nie den Glauben an dich selbst.",
            "Halte an deinen Träumen fest, auch wenn sie unerreichbar erscheinen.",
            "Feiere die kleinen Siege im Leben.",
            "Habe Geduld mit dir selbst. Gute Dinge brauchen Zeit.",
            "Höre auf dein Herz. Es kennt den Weg.",
            "Sei der Grund, warum jemand heute lächelt.",
            "Lächle, auch wenn du es schwer hast. Es könnte jemanden glücklich machen.",
            "Denke positiv, auch wenn alles gegen dich zu sein scheint.",
            "Vergiss nicht, dass das Leben eine Reise ist, nicht nur ein Ziel.",
            "Feiere deine Fortschritte, egal wie klein sie sind.",
            "Lass dich nicht von Zweifeln überwältigen. Du bist stärker als du denkst.",
            "Sei der Sonnenschein an einem regnerischen Tag.",
            "Glaube an die Magie des Augenblicks.",
            "Finde die Schönheit in den kleinen Dingen des Lebens.",
            "Umarme deine Fehler. Sie machen dich menschlich.",
            "Lasse deine Träume größer sein als deine Ängste.",
            "Streue Glitzer, wo immer du gehst.",
            "Denke daran, dass jeder Tag eine neue Chance ist.",
            "Umarme die Unvollkommenheit des Lebens.",
            "Finde die Balance zwischen Arbeit und Spiel.",
            "Nimm dir Zeit, um den Sonnenuntergang zu beobachten.",
            "Hab keine Angst, anders zu sein. Das macht dich einzigartig.",
            "Lass deine Fantasie die Grenzen sprengen.",
            "Vergiss nicht, Pausen einzulegen. Selbst Superman braucht ab und zu eine Ruhepause.",
            "Glaube an das Unmögliche. Wer weiß, was passieren könnte?",
            "Halte deine Träume lebendig, egal wie groß oder klein sie sind.",
            "Schätze die Menschen um dich herum. Sie sind wie Regenbogen in deinem Leben.",
            "Denke daran, dass du stärker bist als du denkst.",
            "Habe keine Angst, um Hilfe zu bitten, wenn du sie brauchst.",
            "Umarme die Herausforderungen des Lebens. Sie machen dich stärker.",
            "Finde die Schönheit im Wandel. Jede Veränderung bringt neue Möglichkeiten.",
            "Sei dankbar für die kleinen Dinge. Sie sind oft die wichtigsten.",
            "Nimm dir Zeit für dich selbst. Selbst Superhelden brauchen eine Pause.",
            "Lerne aus deinen Fehlern, aber lass sie nicht deine Zukunft bestimmen.",
            "Glaube an dich selbst, auch wenn es niemand sonst tut.",
            "Lass deine Träume größer sein als deine Ängste.",
            "Verliere nie den Glauben an dich selbst.",
            "Halte an deinen Träumen fest, auch wenn sie unerreichbar erscheinen.",
            "Feiere die kleinen Siege im Leben.",
            "Habe Geduld mit dir selbst. Gute Dinge brauchen Zeit.",
            "Höre auf dein Herz. Es kennt den Weg.",
            "Sei der Grund, warum jemand heute lächelt.",
            "Träume groß, aber vergiss nicht, auch kleine Ziele zu setzen.",
            "Wenn du einen Fehler machst, mach ihn zum Kunstwerk.",
            "Wenn du das nächste Mal auf eine Wand triffst, denk daran: Auch Mauern hatten mal den Wunsch, ein Fenster zu sein.",
            "Ein Tag ohne ein kleines Lächeln ist wie ein Tag ohne... na ja, eigentlich gibt es keinen guten Vergleich. Lächeln ist einfach großartig!",
            "Wenn du das nächste Mal eine Tür vor dir siehst, denk daran: Auch Knöpfe hatten mal Träume, eine Türklinke zu sein.",
            "Wenn du das nächste Mal im Stau steckst, denk daran: Auch die beste Party hat mal einen langsamen Start.",
            "Wenn du das nächste Mal das Gefühl hast, dass die Welt gegen dich ist, denk daran: Auch Wolken haben mal einen silbernen Rand.",
            "Wenn du das nächste Mal das Gefühl hast, dass alles sinnlos ist, denk daran: Auch Zahlen hatten mal den Wunsch, Buchstaben zu sein.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug tust, denk daran: Auch die stärkste Brise hatte mal den Wunsch, ein Sturm zu sein.",
            "Wenn du das nächste Mal das Gefühl hast, dass alles gegen dich ist, denk daran: Auch die dunkelste Nacht hat mal einen Stern.",
            "Wenn du das nächste Mal das Gefühl hast, dass du auf der Stelle trittst, denk daran: Auch Schnecken kommen irgendwann an ihr Ziel.",
            "Wenn du das nächste Mal das Gefühl hast, dass die Zeit davonrennt, denk daran: Auch der schnellste Sprinter hatte mal den Wunsch, einfach stehen zu bleiben.",
            "Wenn du das nächste Mal das Gefühl hast, dass alles sinnlos ist, denk daran: Auch Punkte hatten mal den Wunsch, Striche zu sein.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug bist, denk daran: Auch ein Puzzleteil macht den Unterschied.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug tust, denk daran: Auch der längste Weg beginnt mit einem einzigen Schritt.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nichts erreichen kannst, denk daran: Auch die größten Bäume fingen mal als winzige Samen an.",
            "Wenn du das nächste Mal das Gefühl hast, dass du feststeckst, denk daran: Auch das stärkste Klebeband hat mal den Wunsch, sich zu lösen.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug tust, denk daran: Auch der längste Tag hat mal eine Nacht.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug tust, denk daran: Auch der größte Berg begann als Stein.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug tust, denk daran: Auch der längste Tag hat mal eine Nacht.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug tust, denk daran: Auch die kleinste Flamme kann ein Feuer entfachen.",
            "Wenn du das nächste Mal das Gefühl hast, dass du nicht genug tust, denk daran: Auch ein Schritt vorwärts ist ein Fortschritt.",
            "Trage einen Regenschirm, auch wenn es nicht regnet, um vor imaginären Regenschauern geschützt zu sein.",
            "Koche Spaghetti und werfe sie an die Wand, um zu sehen, ob sie fertig sind. Wenn sie kleben bleiben, sind sie noch nicht bereit. Wenn sie herunterfallen, sind sie vermutlich überkocht.",
            "Klebe falsche Augen auf alle deine Möbel, damit sie sich beobachtet fühlen und dich nicht alleine lassen.",
            "Rufe in einem überfüllten Aufzug laut 'Zu den Antrieben, Warp 9!' und schaue, wie viele Personen lachen oder mitmachen.",
            "Trage einen Rucksack voller Marshmallows, um für den Fall eines plötzlichen Lagerfeuers vorbereitet zu sein.",
            "Rufe zufällige Telefonnummern an und frage die Leute, ob sie dein unsichtbarer Freund sein wollen.",
            "Veranstalte eine 'Schnitzeljagd' in deinem Haus und gib Hinweise, die dich zu einem Ort führen, den du bereits kennst.",
            "Schreibe eine Bewerbung für die Position 'König/Königin des Universums' und sende sie an die nächste Sternwarte.",
            "Trage ein Fernglas um den Hals, um die Aussicht zu genießen, auch wenn du drinnen bist.",
            "Kleide dich wie ein Superheld und renne durch die Stadt, um nach Problemen zu suchen, die du lösen kannst.",
            "Erstelle ein 'Magisches Tagebuch' und schreibe hinein, was du heute erlebt hast, auch wenn es nichts Besonderes war.",
            "Begrüße jeden Fremden, den du triffst, mit einem festen Händedruck und den Worten 'Willkommen in meinem Universum.'",
            "Gehe in den Park und spiele 'Verstecken' mit dir selbst, um herauszufinden, ob du wirklich unsichtbar bist.",
            "Trage einen Helm, auch wenn du nicht Fahrrad fährst, um vor möglichen Meteoriteneinschlägen geschützt zu sein.",
            "Erstelle eine Liste mit 'Schreibfehlern', die du absichtlich machst, um zu sehen, wer sie bemerkt.",
            "Organisiere einen Flashmob in deinem Wohnzimmer und tanze zu einer zufälligen Playlist, die du erstellst.",
            "Veranstalte ein 'Spielzeug-Teeparty' für deine Stofftiere und behandle sie wie VIP-Gäste.",
            "Führe ein imaginäres Orchester an und dirigiere, während du durch die Straßen spazierst.",
            "Verkleide dich als Geist und frage die Leute, ob sie einen Geist gesehen haben, der nach seinem Körper sucht.",
            "Lege deinen Wecker auf 3:00 Uhr morgens und nenne es 'Geisterstunde', um zu sehen, ob du auf paranormale Aktivitäten stößt.",
            "Organisiere eine 'Papierflieger-Meisterschaft' und baue verschiedene Modelle, um den ultimativen Papierflieger zu finden.",
            "Halte ein imaginäres Interview mit dir selbst und beantworte Fragen, die du dir schon immer gestellt hast.",
            "Veranstalte einen 'Spaß-Tag' und tue den ganzen Tag lang nur das, was dir Spaß macht, egal wie kindisch es ist.",
            "Kaufe ein paar Gummistiefel und trage sie den ganzen Tag, um für den Fall eines plötzlichen Regens gerüstet zu sein.",
            "Baue ein Schneemann-Modell aus Wattebäuschen und stelle es auf deinen Schreibtisch als Dekoration.",
            "Sammle Steine aus verschiedenen Orten und nenne sie deine 'glücksbringenden Steine', um sie bei Bedarf zu werfen.",
            "Trage eine Taucherbrille, auch wenn du nicht schwimmst, um deine Augen vor Wasser und anderen Gefahren zu schützen.",
            "Rufe in einem überfüllten Supermarkt laut 'Müsliriegel, wir haben einen Code Rosa!' und sieh, wie die Leute reagieren.",
            "Erstelle eine 'Geheime Geheimsprache' und versuche, sie mit deinen Freunden zu sprechen, um sie zu verwirren.",
            "Gib jedem deiner Haushaltsgegenstände einen Namen und sprich mit ihnen, als wären sie lebendig.",
            "Male ein Bild von deiner Lieblingsphantasiewelt und stelle es an die Wand, um jeden Tag davon zu träumen.",
            "Erstelle eine 'Fantasie-Wunschliste' und schreibe Dinge darauf, die du gerne hättest, auch wenn sie unmöglich sind.",
            "Baue einen Roboter aus alten Elektronikteilen und nenne ihn 'Robo-Freund', um dir bei deinen täglichen Aufgaben zu helfen.",
            "Trage eine Schwimmbrille, auch wenn du nicht schwimmst, um deine Augen vor Sonnenblendung und Staub zu schützen.",
            "Schreibe einen Brief an deinen zukünftigen Selbst und lege ihn in eine Zeitkapsel, um ihn in ein paar Jahren zu öffnen.",
            "Baue eine Miniatur-Stadt aus Legosteinen und erschaffe ein Leben für die winzigen Bewohner.",
            "Veranstalte eine 'Nachtpicknick-Party' im Garten und schlafe unter den Sternen, um eine andere Perspektive zu bekommen.",
            "Trage einen Regenmantel, auch wenn es nicht regnet, um vor Wasserflecken und anderen Flecken geschützt zu sein.",
            "Baue einen Zeppelin aus Luftballons und fliege damit über dein Haus, um eine Luftschiff-Erfahrung zu machen.",
            "Stelle eine Sammlung von seltsamen Gegenständen zusammen und nenne sie deine 'Kuriositäten-Kollektion'.",
            "Erstelle eine Liste mit 'Unmöglichen Träumen' und plane, wie du sie doch noch verwirklichen könntest.",
            "Organisiere eine 'Schlafanzug-Party' und lade deine Freunde ein, den ganzen Tag lang in Schlafanzügen herumzuhängen.",
            "Kaufe ein paar Springseile und versuche, den ganzen Tag lang zu hüpfen, um fit zu bleiben.",
            "Erstelle ein 'Garten-Tagebuch' und notiere, was du jeden Tag in deinem Garten entdeckst.",
            "Führe ein Telefonat mit deinem Haustier und frage es nach seinen Gedanken über die Welt.",
            "Lege eine Decke im Garten aus und beobachte die Wolken, um Formen und Geschichten darin zu finden.",
            "Baue eine Rakete aus Pappkartons und stelle sie im Wohnzimmer auf, um zu sehen, wie es wäre, im Weltraum zu sein.",
            "Veranstalte eine 'Kuscheltier-Party' für deine Stofftiere und behandle sie wie echte Gäste.",
            "Schreibe eine 'Wunschliste für Aliens' und lege sie auf dein Dach, falls sie vorbeikommen und Geschenke bringen.",
            "Halte ein 'Nickerchen-Turnier' und sieh, wer am längsten schlafen kann, ohne aufzuwachen.",
            "Lege eine Schatzkarte für dich selbst an und vergrabe einen Schatz im Garten, um ihn später zu finden.",
            "Trage eine Clownsnase, auch wenn es kein Fest gibt, um die Menschen zum Lachen zu bringen.",
            "Erstelle ein 'Gedanken-Notizbuch' und schreibe alle deine verrückten Ideen und Einfälle auf.",
            "Baue einen Roboter-Butler aus alten Haushaltsgeräten und lass ihn dir das Frühstück servieren.",
            "Organisiere eine 'Kostenlos-Hugs-Aktion' und umarme fremde Menschen, um ihre Stimmung zu heben.",
            "Baue ein 'Geheimes Versteck' in deinem Haus und verbringe Zeit dort, wenn du dich zurückziehen möchtest.",
            "Führe ein imaginäres Orchester an und dirigiere, während du durch die Straßen spazierst.",
            "Veranstalte einen 'Spaß-Tag' und tue den ganzen Tag lang nur das, was dir Spaß macht, egal wie kindisch es ist.",
            "Kaufe ein paar Gummistiefel und trage sie den ganzen Tag, um für den Fall eines plötzlichen Regens gerüstet zu sein.",
            "Baue ein Schneemann-Modell aus Wattebäuschen und stelle es auf deinen Schreibtisch als Dekoration.",
            "Sammle Steine aus verschiedenen Orten und nenne sie deine 'glücksbringenden Steine', um sie bei Bedarf zu werfen.",
            "Trage eine Taucherbrille, auch wenn du nicht schwimmst, um deine Augen vor Wasser und anderen Gefahren zu schützen.",
            "Rufe in einem überfüllten Supermarkt laut 'Müsliriegel, wir haben einen Code Rosa!' und sieh, wie die Leute reagieren.",
            "Erstelle eine 'Geheime Geheimsprache' und versuche, sie mit deinen Freunden zu sprechen, um sie zu verwirren.",
            "Gib jedem deiner Haushaltsgegenstände einen Namen und sprich mit ihnen, als wären sie lebendig.",
            "Male ein Bild von deiner Lieblingsphantasiewelt und stelle es an die Wand, um jeden Tag davon zu träumen.",
            "Erstelle eine 'Fantasie-Wunschliste' und schreibe Dinge darauf, die du gerne hättest, auch wenn sie unmöglich sind.",
            "Baue einen Roboter aus alten Elektronikteilen und nenne ihn 'Robo-Freund', um dir bei deinen täglichen Aufgaben zu helfen.",
            "Trage eine Schwimmbrille, auch wenn du nicht schwimmst, um deine Augen vor Sonnenblendung und Staub zu schützen.",
            "Schreibe einen Brief an deinen zukünftigen Selbst und lege ihn in eine Zeitkapsel, um ihn in ein paar Jahren zu öffnen.",
            "Baue eine Miniatur-Stadt aus Legosteinen und erschaffe ein Leben für die winzigen Bewohner.",
            "Veranstalte eine 'Nachtpicknick-Party' im Garten und schlafe unter den Sternen, um eine andere Perspektive zu bekommen.",
            "Trage einen Regenmantel, auch wenn es nicht regnet, um vor Wasserflecken und anderen Flecken geschützt zu sein.",
            "Baue einen Zeppelin aus Luftballons und fliege damit über dein Haus, um eine Luftschiff-Erfahrung zu machen.",
            "Stelle eine Sammlung von seltsamen Gegenständen zusammen und nenne sie deine 'Kuriositäten-Kollektion'.",
            "Erstelle eine Liste mit 'Unmöglichen Träumen' und plane, wie du sie doch noch verwirklichen könntest.",
            "Organisiere eine 'Schlafanzug-Party' und lade deine Freunde ein, den ganzen Tag lang in Schlafanzügen herumzuhängen.",
            "Kaufe ein paar Springseile und versuche, den ganzen Tag lang zu hüpfen, um fit zu bleiben.",
            "Erstelle ein 'Garten-Tagebuch' und notiere, was du jeden Tag in deinem Garten entdeckst.",
            "Führe ein Telefonat mit deinem Haustier und frage es nach seinen Gedanken über die Welt.",
            "Lege eine Decke im Garten aus und beobachte die Wolken, um Formen und Geschichten darin zu finden.",
            "Baue eine Rakete aus Pappkartons und stelle sie im Wohnzimmer auf, um zu sehen, wie es wäre, im Weltraum zu sein.",
            "Veranstalte eine 'Kuscheltier-Party' für deine Stofftiere und behandle sie wie echte Gäste.",
            "Schreibe eine 'Wunschliste für Aliens' und lege sie auf dein Dach, falls sie vorbeikommen und Geschenke bringen.",
            "Halte ein 'Nickerchen-Turnier' und sieh, wer am längsten schlafen kann, ohne aufzuwachen.",
            "Lege eine Schatzkarte für dich selbst an und vergrabe einen Schatz im Garten, um ihn später zu finden.",
            "Trage eine Clownsnase, auch wenn es kein Fest gibt, um die Menschen zum Lachen zu bringen.",
            "Erstelle ein 'Gedanken-Notizbuch' und schreibe alle deine verrückten Ideen und Einfälle auf.",
            "Baue einen Roboter-Butler aus alten Haushaltsgeräten und lass ihn dir das Frühstück servieren.",
            "Organisiere eine 'Kostenlos-Hugs-Aktion' und umarme fremde Menschen, um ihre Stimmung zu heben.",
            "Baue ein 'Geheimes Versteck' in deinem Haus und verbringe Zeit dort, wenn du dich zurückziehen möchtest.",
            "Führe ein imaginäres Orchester an und dirigiere, während du durch die Straßen spazierst.",
            "Veranstalte einen 'Spaß-Tag' und tue den ganzen Tag lang nur das, was dir Spaß macht, egal wie kindisch es ist.",
            "Kaufe ein paar Gummistiefel und trage sie den ganzen Tag, um für den Fall eines plötzlichen Regens gerüstet zu sein.",
            "Baue ein Schneemann-Modell aus Wattebäuschen und stelle es auf deinen Schreibtisch als Dekoration.",
            "Sammle Steine aus verschiedenen Orten und nenne sie deine 'glücksbringenden Steine', um sie bei Bedarf zu werfen.",
            "Trage eine Taucherbrille, auch wenn du nicht schwimmst, um deine Augen vor Wasser und anderen Gefahren zu schützen.",
            "Rufe in einem überfüllten Supermarkt laut 'Müsliriegel, wir haben einen Code Rosa!' und sieh, wie die Leute reagieren.",
            "Erstelle eine 'Geheime Geheimsprache' und versuche, sie mit deinen Freunden zu sprechen, um sie zu verwirren.",
            "Gib jedem deiner Haushaltsgegenstände einen Namen und sprich mit ihnen, als wären sie lebendig.",
            "Male ein Bild von deiner Lieblingsphantasiewelt und stelle es an die Wand, um jeden Tag davon zu träumen.",
            "Erstelle eine 'Fantasie-Wunschliste' und schreibe Dinge darauf, die du gerne hättest, auch wenn sie unmöglich sind.",
            "Baue einen Roboter aus alten Elektronikteilen und nenne ihn 'Robo-Freund', um dir bei deinen täglichen Aufgaben zu helfen.",
            "Trage eine Schwimmbrille, auch wenn du nicht schwimmst, um deine Augen vor Sonnenblendung und Staub zu schützen.",
            "Schreibe einen Brief an deinen zukünftigen Selbst und lege ihn in eine Zeitkapsel, um ihn in ein paar Jahren zu öffnen.",
            "Baue eine Miniatur-Stadt aus Legosteinen und erschaffe ein Leben für die winzigen Bewohner.",
            "Veranstalte eine 'Nachtpicknick-Party' im Garten und schlafe unter den Sternen, um eine andere Perspektive zu bekommen.",
            "Trage einen Regenmantel, auch wenn es nicht regnet, um vor Wasserflecken und anderen Flecken geschützt zu sein.",
            "Baue einen Zeppelin aus Luftballons und fliege damit über dein Haus, um eine Luftschiff-Erfahrung zu machen.",
            "Stelle eine Sammlung von seltsamen Gegenständen zusammen und nenne sie deine 'Kuriositäten-Kollektion'.",
            "Erstelle eine Liste mit 'Unmöglichen Träumen' und plane, wie du sie doch noch verwirklichen könntest.",
            "Organisiere eine 'Schlafanzug-Party' und lade deine Freunde ein, den ganzen Tag lang in Schlafanzügen herumzuhängen.",
            "Kaufe ein paar Springseile und versuche, den ganzen Tag lang zu hüpfen, um fit zu bleiben.",
            "Erstelle ein 'Garten-Tagebuch' und notiere, was du jeden Tag in deinem Garten entdeckst.",
            "Führe ein Telefonat mit deinem Haustier und frage es nach seinen Gedanken über die Welt.",
            "Lege eine Decke im Garten aus und beobachte die Wolken, um Formen und Geschichten darin zu finden.",
            "Baue eine Rakete aus Pappkartons und stelle sie im Wohnzimmer auf, um zu sehen, wie es wäre, im Weltraum zu sein.",
            "Veranstalte eine 'Kuscheltier-Party' für deine Stofftiere und behandle sie wie echte Gäste.",
            "Schreibe eine 'Wunschliste für Aliens' und lege sie auf dein Dach, falls sie vorbeikommen und Geschenke bringen.",
            "Halte ein 'Nickerchen-Turnier' und sieh, wer am längsten schlafen kann, ohne aufzuwachen.",
            "Lege eine Schatzkarte für dich selbst an und vergrabe einen Schatz im Garten, um ihn später zu finden.",
            "Trage eine Clownsnase, auch wenn es kein Fest gibt, um die Menschen zum Lachen zu bringen.",
            "Erstelle ein 'Gedanken-Notizbuch' und schreibe alle deine verrückten Ideen und Einfälle auf.",
            "Baue einen Roboter-Butler aus alten Haushaltsgeräten und lass ihn dir das Frühstück servieren.",
            "Organisiere eine 'Kostenlos-Hugs-Aktion' und umarme fremde Menschen, um ihre Stimmung zu heben.",
            "Baue ein 'Geheimes Versteck' in deinem Haus und verbringe Zeit dort, wenn du dich zurückziehen möchtest.",
            "Führe ein imaginäres Orchester an und dirigiere, während du durch die Straßen spazierst.",
            "Veranstalte einen 'Spaß-Tag' und tue den ganzen Tag lang nur das, was dir Spaß macht, egal wie kindisch es ist.",
            "Kaufe ein paar Gummistiefel und trage sie den ganzen Tag, um für den Fall eines plötzlichen Regens gerüstet zu sein.",
            "Baue ein Schneemann-Modell aus Wattebäuschen und stelle es auf deinen Schreibtisch als Dekoration.",
            "Sammle Steine aus verschiedenen Orten und nenne sie deine 'glücksbringenden Steine', um sie bei Bedarf zu werfen.",
            "Trage eine Taucherbrille, auch wenn du nicht schwimmst, um deine Augen vor Wasser und anderen Gefahren zu schützen.",
            "Rufe in einem überfüllten Supermarkt laut 'Müsliriegel, wir haben einen Code Rosa!' und sieh, wie die Leute reagieren.",
            "Erstelle eine 'Geheime Geheimsprache' und versuche, sie mit deinen Freunden zu sprechen, um sie zu verwirren.",
            "Gib jedem deiner Haushaltsgegenstände einen Namen und sprich mit ihnen, als wären sie lebendig.",
            "Male ein Bild von deiner Lieblingsphantasiewelt und stelle es an die Wand, um jeden Tag davon zu träumen.",
            "Erstelle eine 'Fantasie-Wunschliste' und schreibe Dinge darauf, die du gerne hättest, auch wenn sie unmöglich sind.",
            "Baue einen Roboter aus alten Elektronikteilen und nenne ihn 'Robo-Freund', um dir bei deinen täglichen Aufgaben zu helfen.",
            "Trage eine Schwimmbrille, auch wenn du nicht schwimmst, um deine Augen vor Sonnenblendung und Staub zu schützen.",
            "Schreibe einen Brief an deinen zukünftigen Selbst und lege ihn in eine Zeitkapsel, um ihn in ein paar Jahren zu öffnen.",
            "Baue eine Miniatur-Stadt aus Legosteinen und erschaffe ein Leben für die winzigen Bewohner.",
            "Veranstalte eine 'Nachtpicknick-Party' im Garten und schlafe unter den Sternen, um eine andere Perspektive zu bekommen.",
            "Trage einen Regenmantel, auch wenn es nicht regnet, um vor Wasserflecken und anderen Flecken geschützt zu sein.",
            "Baue einen Zeppelin aus Luftballons und fliege damit über dein Haus, um eine Luftschiff-Erfahrung zu machen.",
            "Stelle eine Sammlung von seltsamen Gegenständen zusammen und nenne sie deine 'Kuriositäten-Kollektion'.",
            "Erstelle eine Liste mit 'Unmöglichen Träumen' und plane, wie du sie doch noch verwirklichen könntest.",
            "Organisiere eine 'Schlafanzug-Party' und lade deine Freunde ein, den ganzen Tag lang in Schlafanzügen herumzuhängen.",
            "Kaufe ein paar Springseile und versuche, den ganzen Tag lang zu hüpfen, um fit zu bleiben.",
            "Erstelle ein 'Garten-Tagebuch' und notiere, was du jeden Tag in deinem Garten entdeckst.",
            "Führe ein Telefonat mit deinem Haustier und frage es nach seinen Gedanken über die Welt.",
            "Lege eine Decke im Garten aus und beobachte die Wolken, um Formen und Geschichten darin zu finden.",
            "Baue eine Rakete aus Pappkartons und stelle sie im Wohnzimmer auf, um zu sehen, wie es wäre, im Weltraum zu sein.",
            "Veranstalte eine 'Kuscheltier-Party' für deine Stofftiere und behandle sie wie echte Gäste.",
            "Schreibe eine 'Wunschliste für Aliens' und lege sie auf dein Dach, falls sie vorbeikommen und Geschenke bringen.",
            "Halte ein 'Nickerchen-Turnier' und sieh, wer am längsten schlafen kann, ohne aufzuwachen.",
            "Lege eine Schatzkarte für dich selbst an und vergrabe einen Schatz im Garten, um ihn später zu finden.",
            "Trage eine Clownsnase, auch wenn es kein Fest gibt, um die Menschen zum Lachen zu bringen.",
            "Erstelle ein 'Gedanken-Notizbuch' und schreibe alle deine verrückten Ideen und Einfälle auf.",
            "Baue einen Roboter-Butler aus alten Haushaltsgeräten und lass ihn dir das Frühstück servieren.",
            "Organisiere eine 'Kostenlos-Hugs-Aktion' und umarme fremde Menschen, um ihre Stimmung zu heben.",
            "Baue ein 'Geheimes Versteck' in deinem Haus und verbringe Zeit dort, wenn du dich zurückziehen möchtest.",
            "Führe ein imaginäres Orchester an und dirigiere, während du durch die Straßen spazierst.",
            "Veranstalte einen 'Spaß-Tag' und tue den ganzen Tag lang nur das, was dir Spaß macht, egal wie kindisch es ist.",
            "Kaufe ein paar Gummistiefel und trage sie den ganzen Tag, um für den Fall eines plötzlichen Regens gerüstet zu sein.",
            "Baue ein Schneemann-Modell aus Wattebäuschen und stelle es auf deinen Schreibtisch als Dekoration.",
            "Sammle Steine aus verschiedenen Orten und nenne sie deine 'glücksbringenden Steine', um sie bei Bedarf zu werfen.",
            "Trage eine Taucherbrille, auch wenn du nicht schwimmst, um deine Augen vor Wasser und anderen Gefahren zu schützen.",
            "Rufe in einem überfüllten Supermarkt laut 'Müsliriegel, wir haben einen Code Rosa!' und sieh, wie die Leute reagieren.",
            "Erstelle eine 'Geheime Geheimsprache' und versuche, sie mit deinen Freunden zu sprechen, um sie zu verwirren.",
            "Gib jedem deiner Haushaltsgegenstände einen Namen und sprich mit ihnen, als wären sie lebendig.",
            "Male ein Bild von deiner Lieblingsphantasiewelt und stelle es an die Wand, um jeden Tag davon zu träumen.",
            "Erstelle eine 'Fantasie-Wunschliste' und schreibe Dinge darauf, die du gerne hättest, auch wenn sie unmöglich sind.",
            "Baue einen Roboter aus alten Elektronikteilen und nenne ihn 'Robo-Freund', um dir bei deinen täglichen Aufgaben zu helfen.",
            "Trage eine Schwimmbrille, auch wenn du nicht schwimmst, um deine Augen vor Sonnenblendung und Staub zu schützen.",
            "Schreibe einen Brief an deinen zukünftigen Selbst und lege ihn in eine Zeitkapsel, um ihn in ein paar Jahren zu öffnen.",
            "Baue eine Miniatur-Stadt aus Legosteinen und erschaffe ein Leben für die winzigen Bewohner.",
            "Veranstalte eine 'Nachtpicknick-Party' im Garten und schlafe unter den Sternen, um eine andere Perspektive zu bekommen.",
            "Trage einen Regenmantel, auch wenn es nicht regnet, um vor Wasserflecken und anderen Flecken geschützt zu sein.",
            "Baue einen Zeppelin aus Luftballons und fliege damit über dein Haus, um eine Luftschiff-Erfahrung zu machen.",
            "Stelle eine Sammlung von seltsamen Gegenständen zusammen und nenne sie deine 'Kuriositäten-Kollektion'.",
            "Erstelle eine Liste mit 'Unmöglichen Träumen' und plane, wie du sie doch noch verwirklichen könntest.",
            "Organisiere eine 'Schlafanzug-Party' und lade deine Freunde ein, den ganzen Tag lang in Schlafanzügen herumzuhängen.",
            "Kaufe ein paar Springseile und versuche, den ganzen Tag lang zu hüpfen, um fit zu bleiben.",
            "Erstelle ein 'Garten-Tagebuch' und notiere, was du jeden Tag in deinem Garten entdeckst.",
            "Führe ein Telefonat mit deinem Haustier und frage es nach seinen Gedanken über die Welt.",
            "Lege eine Decke im Garten aus und beobachte die Wolken, um Formen und Geschichten darin zu finden.",
            "Baue eine Rakete aus Pappkartons und stelle sie im Wohnzimmer auf, um zu sehen, wie es wäre, im Weltraum zu sein.",
            "Veranstalte eine 'Kuscheltier-Party' für deine Stofftiere und behandle sie wie echte Gäste.",
            "Schreibe eine 'Wunschliste für Aliens' und lege sie auf dein Dach, falls sie vorbeikommen und Geschenke bringen.",
            "Halte ein 'Nickerchen-Turnier' und sieh, wer am längsten schlafen kann, ohne aufzuwachen.",
            "Lege eine Schatzkarte für dich selbst an und vergrabe einen Schatz im Garten, um ihn später zu finden.",
            "Trage eine Clownsnase, auch wenn es kein Fest gibt, um die Menschen zum Lachen zu bringen.",
            "Erstelle ein 'Gedanken-Notizbuch' und schreibe alle deine verrückten Ideen und Einfälle auf.",
            "Baue einen Roboter-Butler aus alten Haushaltsgeräten und lass ihn dir das Frühstück servieren.",
            "Organisiere eine 'Kostenlos-Hugs-Aktion' und umarme fremde Menschen, um ihre Stimmung zu heben.",
            "Baue ein 'Geheimes Versteck' in deinem Haus und verbringe Zeit dort, wenn du dich zurückziehen möchtest.",
            "Führe ein imaginäres Orchester an und dirigiere, während du durch die Straßen spazierst.",
        ]

        random.shuffle(advices)
        embed = discord.Embed(title="Weise Worte", color=discord.Color.blue())
        embed.add_field(name="Antwort:", value=advices[0], inline=False)
        embed.set_footer(text="Rat benötigt von " + ctx.author.display_name)
        await ctx.respond(embed=embed)

    @discord.slash_command(
        name="beer", description="Trinke oder teile ein Bier mit jemandem."
    )
    async def beer(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du ein Bier teilen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst kein Bier ausgeben! 🍻", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} gibt {member.mention} ein Bier aus! 🍻"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} trinkt ein Bier! 🍻")

    @discord.slash_command(name="boop", description="Boope jemanden.")
    async def boop(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du boopen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dich nicht selbst boopen! 👆👃", ephemeral=True
                )
                return
            await ctx.respond(f"{ctx.author.mention} boopt {member.mention}! 👆👃")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} hat das Verlangen jemanden zu boopen! 👆👃")

    @discord.slash_command(
        name="coffee", description="Trinke oder teile einen Kaffee mit jemandem."
    )
    async def coffee(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du einen Kaffee teilen möchtest.", required=False),  # type: ignore
    ):
        coffee = [
            "Latte Machiatto",
            "Cappuccino",
            "Espresso",
            "Kaffee",
            "Kakao",
            "Chai Latte",
            "Tee",
            "Eiskaffee",
            "Frappuccino",
            "Mokka",
            "Flat White",
            "Macchiato",
            "Cortado",
            "Americano",
            "Filterkaffee",
            "Cold Brew",
            "Nitro Coffee",
            "Kaffee mit Milch",
            "Kaffee mit Zucker",
            "Kaffee mit Sahne",
            "Kaffee mit Sirup",
            "Kaffee mit Eis",
            "Kaffee mit Schokolade",
            "Kaffee mit Zimt",
            "Kaffee mit Vanille",
            "Kaffee mit Karamell",
            "Kaffee mit Kokos",
            "Kaffee mit Minze",
            "Kaffee mit Honig",
            "Kaffee mit Chili",
            "Kaffee mit Ingwer",
            "Kaffee mit Zitrone",
            "Kaffee mit Orange",
            "Kaffee mit Mandel",
            "Kaffee mit Haselnuss",
            "Kaffee mit Kürbis",
            "Kaffee mit Pfefferminz",
            "Starbucks Blonde Roast",
            "Starbucks Pike Place Roast",
            "Starbucks Veranda Blend",
            "Starbucks House Blend",
            "Starbucks Breakfast Blend",
            "Starbucks Caffè Verona",
            "Starbucks Espresso Roast",
            "Starbucks French Roast",
            "Starbucks Italian Roast",
            "Starbucks Sumatra",
            "Starbucks Kenya",
            "Starbucks Ethiopia",
            "Starbucks Guatemala Antigua",
            "Starbucks Colombia",
            "Starbucks Costa Rica",
            "Starbucks Brazil",
            "Starbucks Mexico",
            "Starbucks Guatemala Casi Cielo",
            "Starbucks Anniversary Blend",
            "Starbucks Christmas Blend",
            "Starbucks Pumpkin Spice Latte",
            "Starbucks Salted Caramel Mocha",
            "Starbucks Caramel Macchiato",
            "Starbucks Vanilla Latte",
            "Starbucks Cinnamon Dolce Latte",
            "Starbucks White Chocolate Mocha",
            "Starbucks Java Chip Frappuccino",
            "Starbucks Green Tea Frappuccino",
            "Starbucks Matcha Green Tea Latte",
            "Starbucks Chai Tea Latte",
            "Starbucks Iced Coffee",
            "Starbucks Nitro Cold Brew",
            "Starbucks Cold Brew",
            "Starbucks Iced Caramel Macchiato",
            "Starbucks Iced Vanilla Latte",
            "Starbucks Iced Cinnamon Dolce Latte",
            "Starbucks Iced White Chocolate Mocha",
            "Starbucks Iced Green Tea Latte",
            "Starbucks Iced Matcha Green Tea Latte",
            "Starbucks Iced Chai Tea Latte",
            "Starbucks Iced Passion Tango Tea",
            "Starbucks Iced Peach Green Tea Lemonade",
            "Starbucks Iced Guava Passionfruit Drink",
            "Starbucks Iced Pineapple Matcha Drink",
            "Starbucks Iced Golden Ginger Drink",
            "Starbucks Iced Strawberry Green Tea Lemonade",
            "Starbucks Iced Mango Dragonfruit Refresher",
            "Starbucks Iced Berry Hibiscus Refresher",
            "Starbucks Iced Peach Green Tea",
            "Starbucks Iced Guava White Tea",
            "Starbucks Iced Pineapple Matcha",
            "Starbucks Iced Golden Ginger Ale",
            "Starbucks Iced Strawberry Green Tea",
            "Starbucks Iced Mango Dragonfruit",
            "Starbucks Iced Berry Hibiscus",
            "Starbucks Iced Peach Green Tea Lemonade",
            "Starbucks Iced Guava Passionfruit Drink",
            "Starbucks Iced Pineapple Matcha Drink",
            "Starbucks Iced Golden Ginger Drink",
            "Starbucks Iced Strawberry Green Tea Lemonade",
            "Starbucks Iced Mango Dragonfruit Refresher",
            "Starbucks Iced Berry Hibiscus Refresher",
            "Starbucks Iced Peach Green Tea",
            "Starbucks Iced Guava White Tea",
            "Starbucks Iced Pineapple Matcha",
            "Starbucks Iced Golden Ginger Ale",
            "Starbucks Iced Strawberry Green Tea",
            "Starbucks Iced Mango Dragonfruit",
            "Starbucks Iced Berry Hibiscus",
        ]
        random.shuffle(coffee)
        random_coffee = random.choice(coffee)
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst keinen Kaffee ausgeben! ☕", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} gibt {member.mention} einen {random_coffee} aus! ☕"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} trinkt einen {random_coffee}! ☕")

    @discord.slash_command(
        name="cookie", description="Iss oder teile einen Keks mit jemandem."
    )
    async def cookie(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du einen Keks teilen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst keinen Keks geben! 🍪", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} gibt {member.mention} einen Keks! 🍪"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} isst genüsslich einen Keks! 🍪")

    @discord.slash_command(name="dance", description="Tanze!")
    async def dance(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du tanzen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} tanzt alleine! 💃🕺")
                return
            await ctx.respond(f"{ctx.author.mention} tanzt mit {member.mention}! 💃🕺")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} tanzt alleine! 💃🕺")

    @discord.slash_command(name="feed", description="Füttere jemanden.")
    async def feed(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du füttern möchtest.", required=True),  # type: ignore
        essen: discord.Option(str, "Das Essen, das du füttern möchtest.", required=True),  # type: ignore
    ):
        if member == ctx.author:
            await ctx.respond(
                "Du kannst dich nicht selbst füttern! 🍽️", ephemeral=True
            )
            return
        await ctx.respond(
            f"{ctx.author.mention} füttert {member.mention} mit {essen}! 🍽️"
        )

    @discord.slash_command(name="fire", description="Zünde andere an!")
    async def fire(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du anzünden möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dich nicht selbst anzünden! 🔥", ephemeral=True
                )
                return
            await ctx.respond(f"{ctx.author.mention} zündet {member.mention} an! 🔥")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} zündet sich selbst an! 🔥")

    @discord.slash_command(name="freeze", description="Friere andere ein!")
    async def freeze(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du einfrieren möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dich nicht selbst einfrieren! ❄️", ephemeral=True
                )
                return
            await ctx.respond(f"{ctx.author.mention} friert {member.mention} ein! ❄️")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} friert sich selbst ein! ❄️")

    @discord.slash_command(
        name="geld", description="Gib oder erhalte Geld von jemandem."
    )
    async def geld(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du Geld teilen möchtest.", required=False),  # type: ignore
        betrag: discord.Option(int, "Der Betrag, den du teilen möchtest.", required=False),  # type: ignore
    ):
        if member and betrag:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst kein Geld geben! 💰", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} gibt {member.mention} {betrag}€! 💰"
            )
        elif member and not betrag:
            await ctx.respond("Bitte gib einen Betrag an!", ephemeral=True)
        elif not member and betrag:
            await ctx.respond(f"{ctx.author.mention} erhält {betrag}€! 💰")
        elif not member and not betrag:
            await ctx.respond(f"{ctx.author.mention} erhält 0€! 💰")

    @discord.slash_command(name="gesundheit", description="Wünsche anderen Gesundheit!")
    async def gesundheit(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, dem du Gesundheit wünschen möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst keine Gesundheit wünschen!", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} wünscht {member.mention} Gesundheit!"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} wünscht sich selbst Gesundheit!")

    @discord.slash_command(name="goodvibes", description="Verbreite gute Vibes!")
    async def goodvibes(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, dem du gute Vibes schicken möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} verbreitet gute Vibes! 🌈")
                return
            await ctx.respond(
                f"{ctx.author.mention} schickt {member.mention} gute Vibes! 🌈"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} verbreitet gute Vibes! 🌈")

    @discord.slash_command(
        name="gruppenkuscheln", description="Kuschel mit anderen in der Gruppe."
    )
    async def gruppenkuscheln(
        self,
        ctx,
    ):
        respones = [
            f"{ctx.author.mention} will den ganzen Chat kuscheln! 🤗",
            f"{ctx.author.mention} lädt alle zum Gruppenkuscheln ein! 🤗",
            f"{ctx.author.mention} kuschelt mit allen! 🤗",
            f"{ctx.author.mention} verbreitet Kuschelstimmung im Chat! 🤗",
            f"{ctx.author.mention} will eine Kuschelparty veranstalten! 🤗",
            f"{ctx.author.mention} kuschelt mit dem gesamten Server! 🤗",
            f"{ctx.author.mention} lädt alle zum Gruppenkuscheln ein! 🤗",
            f"{ctx.author.mention} kuschelt mit allen! 🤗",
            f"{ctx.author.mention} verbreitet Kuschelstimmung im Chat! 🤗",
            f"{ctx.author.mention} zerdrückt den ganzen Chat! 🤗",
        ]
        random.shuffle(respones)
        await ctx.respond(random.choice(respones))

    @discord.slash_command(name="happy", description="Mache andere glücklich!")
    async def happy(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du glücklich machen möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} macht sich selbst happy! 😊")
                return
            await ctx.respond(f"{ctx.author.mention} macht {member.mention} happy! 😊")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} macht sich selbst happy! 😊")

    @discord.slash_command(name="hug", description="Umarme jemanden.")
    async def hug(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du umarmen möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} umarmt sich selbst! 🤗")
                return
            await ctx.respond(f"{ctx.author.mention} umarmt {member.mention}! 🤗")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} umarmt sich selbst! 🤗")

    @discord.slash_command(name="kill", description="Töte andere!")
    async def kill(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du töten möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} tötet sich selbst! 💀")
                return
            await ctx.respond(f"{ctx.author.mention} tötet {member.mention}! 💀")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} tötet sich selbst! 💀")

    @discord.slash_command(name="knife", description="Werfe mit Messer!")
    async def knife(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du mit einem Messer treffen möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    f"{ctx.author.mention} du kannst dich nicht selbst mit einem Messer bewerfen! 🔪",
                    ephemeral=True,
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} wirft ein Messer auf {member.mention}! 🔪"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} hat ein Messer in der Hand! 🔪")

    @discord.slash_command(name="love", description="Hab andere ganz coll lieb!")
    async def love(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du lieb haben möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    f"{ctx.author.mention} hat sich selbst ganz doll lieb! ❤️"
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} hat {member.mention} ganz doll lieb! ❤️"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} hat sich selbst ganz doll lieb! ❤️")

    @discord.slash_command(
        name="morning", description="Wünsche anderen einen guten Morgen!"
    )
    async def morning(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, dem du einen guten Morgen wünschen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    f"{ctx.author.mention} du kannst dir selbst keinen guten Morgen wünschen! 🌞"
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} wünscht {member.mention} einen guten Morgen! 🌞"
            )
        elif not member:
            await ctx.respond(
                f"{ctx.author.mention} wünscht allen einen guten Morgen! 🌞"
            )

    @discord.slash_command(name="niesen", description="Niese. Das wars.")
    async def niesen(
        self,
        ctx,
        member: discord.Option(discord.Member, "User den du zum niesen bringen willst.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dich nicht selbst zum niesen bringen! 🤧", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} bringt {member.mention} zum niesen! 🤧"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} niest! 🤧")

    @discord.slash_command(name="night", description="Wünsche anderen eine gute Nacht!")
    async def night(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, dem du eine gute Nacht wünschen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    f"{ctx.author.mention} du kannst dir selbst keine gute Nacht wünschen! 🌙",
                    ephemeral=True,
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} wünscht {member.mention} eine gute Nacht! 🌙"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} wünscht allen eine gute Nacht! 🌙")

    @discord.slash_command(name="pat", description="Patte jemanden.")
    async def pat(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du paten möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} patted sich selbst! 🐾")
                return
            await ctx.respond(f"{ctx.author.mention} patted {member.mention}! 🐾")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} patted sich selbst! 🐾")

    @discord.slash_command(name="prost", description="Prost!")
    async def prost(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du anstoßen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst nicht zuprosten! 🍻", ephemeral=True
                )
                return
            if random.randint(1, 5) == 1:
                await ctx.respond(
                    f"{ctx.author.mention} stößt mit {member.mention} auf ein Radler an! 🍻"
                )
            else:
                await ctx.respond(
                    f"{ctx.author.mention} stößt mit {member.mention} auf ein Bier an! 🍻"
                )
        elif not member:
            if random.randint(1, 5) == 1:
                await ctx.respond(f"{ctx.author.mention} stoßt auf ein Radler an! 🍻")
            else:
                await ctx.respond(f"{ctx.author.mention} stoßt auf ein Bier an! 🍻")

    @discord.slash_command(name="sad", description="Sei traurig.")
    async def sad(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du traurig machen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dich nicht selbst traurig machen! 😢", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} macht {member.mention} traurig! 😢"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} ist traurig! 😢")

    @discord.slash_command(name="slap", description="Klatsch anderen eine.")
    async def slap(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du klatschen möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} klatscht sich selbst eine! 👋")
                return
            await ctx.respond(
                f"{ctx.author.mention} klatscht {member.mention} eine! 👋"
            )
        elif not member:
            await ctx.respond(
                f"{ctx.author.mention} hat das verlangen jemanden zu klatschen! 👋"
            )

    @discord.slash_command(name="spoon", description="Löffle anderen eine.")
    async def spoon(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du löffeln möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} löffelt sich selbst eine! 🥄")
                return
            await ctx.respond(f"{ctx.author.mention} löffelt {member.mention} eine! 🥄")
        elif not member:
            await ctx.respond(
                f"{ctx.author.mention} hat das Verlangen jemanden eine zu löffeln! 🥄"
            )

    @discord.slash_command(name="stare", description="Starre jemanden an.")
    async def stare(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du anstarren möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} starrt sich selbst an! 👀")
                return
            await ctx.respond(f"{ctx.author.mention} starrt {member.mention} an! 👀")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} starrt in die Leere! 👀")

    @discord.slash_command(name="stups", description="Stupse jemanden.")
    async def stups(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du stupsen möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} stupst sich selbst! 👉")
                return
            await ctx.respond(f"{ctx.author.mention} stupst {member.mention}! 👉")
        elif not member:
            await ctx.respond(
                f"{ctx.author.mention} hat das Verlangen jemanden anzustupsen! 👉"
            )

    @discord.slash_command(name="summon", description="Beschwöre jemanden.")
    async def summon(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du beschwören möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(f"{ctx.author.mention} beschwört sich selbst! 🧙")
                return
            await ctx.respond(f"{ctx.author.mention} beschwört {member.mention}! 🧙")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} beschwört sich selbst! 🧙")

    @discord.slash_command(
        name="tea", description="Trinke oder teile Tee mit jemandem."
    )
    async def tea(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du Tee trinken möchtest.", required=False),  # type: ignore
    ):
        tea = [
            "English Breakfast Tee",
            "Earl Grey Tee",
            "Green Tea",
            "Peppermint Tea",
            "Chamomile Tea",
            "Jasmine Tea",
            "Oolong Tea",
            "White Tea",
            "Matcha Tea",
            "Hibiscus Tea",
            "Rooibos Tea",
            "Lemon Ginger Tea",
            "Mint Verbena Tea",
            "Peach Tranquility Tea",
            "Passion Tango Tea",
            "Mango Black Tea",
            "Strawberry Green Tea",
            "Pineapple Kona Pop Tea",
            "Peach Citrus White Tea",
            "Rev Up Wellness Tea",
            "Royal English Breakfast Tea",
            "Emperor's Clouds and Mist Tea",
            "Mint Majesty Tea",
            "Youthberry Tea",
            "Wild Sweet Orange Tea",
            "Comfort Wellness Tea",
            "Defense Wellness Tea",
            "Rev Up Wellness Tea",
            "Refresh Wellness Tea",
            "Serenity Wellness Tea",
            "Starbucks Chai Tea",
            "Starbucks Green Tea",
            "Starbucks Matcha Tea",
            "Starbucks Earl Grey Tea",
            "Starbucks Passion Tango Tea",
            "Starbucks Peach Tranquility Tea",
            "Starbucks Mint Majesty Tea",
            "Starbucks Royal English Breakfast Tea",
            "Starbucks Emperor's Clouds and Mist Tea",
            "Starbucks Youthberry Tea",
            "Starbucks Wild Sweet Orange Tea",
            "Starbucks Comfort Wellness Tea",
            "Starbucks Defense Wellness Tea",
            "Starbucks Rev Up Wellness Tea",
            "Starbucks Refresh Wellness Tea",
            "Starbucks Serenity Wellness Tea",
        ]
        random.shuffle(tea)
        random_tea = random.choice(tea)
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst keinen Tee ausgeben! ☕", ephemeral=True
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} gibt {member.mention} einen {random_tea} aus! ☕"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} trinkt einen {random_tea}! ☕")

    @discord.slash_command(
        name="truthordare", description="Spiele Wahrheit oder Pflicht."
    )
    async def truthordare(
        self,
        ctx,
        choice: discord.Option(str, "Wähle zwischen Wahrheit oder Pflicht.", choices=["Truth", "Dare"]),  # type: ignore
    ):
        if choice == "Truth":
            truths = [
                "Was ist das peinlichste was dir je passiert ist?",
                "Wie viele Menschen hast du bisher geküsst?",
                "Welches Tier passt am besten zu dir und warum?",
                "Welchen Star findest du heiß?",
                "Wen auf diesen Server würdest du daten wenn du müsstest (falls du schon mit jemand hier zusammen bist, zählt diese Person nicht!)",
                "Hast du schonmal was geklaut?",
                "Wer ist dein geheimer Crush?",
                "Wann hattest du das letzte Mal Sex?",
                "Hast du schonmal eine Straftat begangen?",
                "Was würdest du tun wenn du für einen Monat das andere Geschlecht wärst?",
                "Hast du schonmal Drogen genommen (außer Alkohol und Tabak)?",
                "Wer aus der Runde sollte am dringensten zum Friseur?",
                "Was wissen deine Eltern nicht über dich?",
                "Was war deine Modesünde als Kind?",
                "Was ist der peinlichste Gegenstand in deinem Kleiderschrank?",
                "Wie oft wechselst du deine Bettwäsche?",
                "Warst du schon einmal nackt in der Öffentlichkeit?",
                "Hast du schonmal jemand geghostet?",
                "Was war der größte Fehler den du je begangen hast?",
                "Wen in der Runde würdest du küssen wenn du müsstest?",
                "Was war das schlimmste Date das du je hattest?",
                "Erzähle von deinem peinlichsten Moment.",
                "Was war die größte Lüge, die du jemals erzählt hast?",
                "Teile dein größtes Geheimnis.",
                "Hattest du jemals einen heimlichen Schwarm auf jemanden im Chat?",
                "Was war das Verrückteste, das du jemals getan hast?",
                "Beschreibe deinen größten Albtraum.",
                "Hast du jemals etwas gestohlen?",
                "Erzähle von einem peinlichen Erlebnis in der Öffentlichkeit.",
                "Wann hast du zuletzt jemandem etwas vorgemacht, um ihm zu gefallen?",
                "Was war dein schlimmstes Date?",
                "Wovor hast du am meisten Angst?",
                "Hast du jemals jemanden absichtlich verletzt?",
                "Erzähle von deinem mutigsten Erlebnis.",
                "Welches Gerücht hast du jemals über dich selbst gehört?",
                "Hast du jemals jemanden im Chat angelogen?",
                "Was ist deine seltsamste Angewohnheit?",
                "Erzähle von etwas, das du in der Schule gemacht hast und bereust.",
                "Was war dein größter Fehlkauf?",
                "Erzähle von einem Moment, auf den du wirklich stolz bist.",
                "Was war dein peinlichster Moment auf Social Media?",
                "Wann hast du zuletzt jemandem die Schuld für etwas gegeben, das du getan hast?",
                "Beschreibe den größten Fehler, den du jemals gemacht hast.",
                "Hast du jemals eine Freundschaft wegen eines Streits beendet?",
                "Was ist das Seltsamste, das du jemals gegessen hast?",
                "Wann hast du zuletzt jemandem deine wahren Gefühle gestanden?",
                "Erzähle von deinem schlimmsten Albtraum.",
                "Hast du jemals etwas sehr Wertvolles verloren?",
                "Beschreibe den verrücktesten Traum, den du jemals hattest.",
                "Hast du jemals einen echten Brief geschrieben und verschickt?",
                "Wann warst du zuletzt mutig?",
                "Hast du jemals ein Geheimnis weitergegeben, das du nicht hättest verraten sollen?",
                "Was ist das Seltsamste, das dir jemals passiert ist?",
                "Hast du jemals jemanden im Chat unbewusst verärgert?",
                "Was ist die lustigste Lüge, die du jemals gehört hast?",
                "Hast du jemals einen ganzen Tag im Bett verbracht?",
                "Erzähle etwas Interessantes, das du kürzlich gelernt hast.",
                "Hast du jemals jemanden in einer wichtigen Situation im Stich gelassen?",
                "Was war das Verrückteste, das du jemals auf einer Party gemacht hast?",
                "Hast du jemals eine Regel gebrochen, um etwas zu bekommen, das du wolltest?",
                "Erzähle von einem peinlichen Moment bei der Arbeit.",
                "Hast du jemals einen Prominenten getroffen? Wenn ja, wen?",
                "Was war das Seltsamste, das du jemals in deinem Kühlschrank gefunden hast?",
                "Hast du jemals in der Öffentlichkeit geweint?",
                "Wann hast du zuletzt etwas Schlimmes gesagt, als du wütend warst?",
                "Hast du jemals ein Geheimnis nicht für dich behalten können?",
                "Erzähle von dem besten Erlebnis, das dir jemals passiert ist.",
                "Wann hast du zuletzt einen völlig fremden Menschen um Hilfe gebeten?",
                "Was war das Verrückteste, das du jemals online gekauft hast?",
                "Hast du jemals jemanden geliebt, der dich nicht zurückgeliebt hat?",
                "Was war dein peinlichster Moment bei einem Familientreffen?",
                "Hast du jemals ein Geschenk gehasst, aber so getan, als ob du es liebst?",
                "Was war das Lustigste, das dir jemals in der Schule passiert ist?",
                "Hast du jemals jemanden betrogen?",
                "Was war das Schönste, das dir jemals jemand gesagt hat?",
                "Hast du jemals einen Wettbewerb gewonnen? Wenn ja, welchen?",
                "Was war das Schlimmste, das du jemals bei einem Date gesagt hast?",
                "Hast du jemals etwas Dummes getan, um jemanden zu beeindrucken?",
                "Erzähle etwas Interessantes, das du in einem Buch gelesen hast.",
                "Bereust du jemals etwas, das du nicht getan hast?",
                "Was war das Schlimmste, das dir jemals in den Ferien passiert ist?",
                "Hast du jemals jemanden aus Versehen beleidigt?",
                "Was war das Beste, das du jemals gegessen hast?",
                "Hast du jemals eine Nacht durchgemacht, ohne zu schlafen?",
                "Was war das Lustigste, das dir jemals beim Einkaufen passiert ist?",
                "Hast du jemals einen Preis gewonnen? Wenn ja, welchen?",
                "Erzähle von dem traurigsten Erlebnis, das dir jemals passiert ist.",
                "Wann hast du zuletzt jemanden wirklich beeindruckt?",
                "Was war das Schrägste, das du jemals gesehen hast?",
                "Hast du jemals eine wichtige Deadline verpasst?",
                "Erzähle von dem besten Erlebnis, das dir jemals passiert ist.",
                "Hast du jemals jemanden absichtlich im Stich gelassen?",
                "Was war das Lustigste, das dir jemals auf einer Reise passiert ist?",
                "Hast du jemals eine Mutprobe gemacht? Wenn ja, welche?",
                "Erzähle von dem Seltsamsten, das du jemals im Kino erlebt hast.",
                "Hast du jemals jemanden im Chat angelogen?",
                "Was war das Interessanteste, das du jemals in einem Film gesehen hast?",
                "Hast du jemals ein Versprechen gebrochen?",
                "Was war das Verrückteste, das dir jemals auf einer Party passiert ist?",
                "Erzähle von einem Moment, auf den du wirklich stolz bist.",
                "Was war das Beste, das dir jemals jemand gesagt hat?",
                "Hast du jemals jemanden betrogen?",
                "Was war das Interessanteste, das du jemals online gelesen hast?",
                "Hast du jemals jemanden aus Versehen beleidigt?",
                "Was war das Beste, das du jemals gegessen hast?",
                "Hast du jemals jemanden beeindruckt, ohne es zu merken?",
                "Was war das Lustigste, das dir jemals beim Einkaufen passiert ist?",
                "Hast du jemals einen Wettbewerb gewonnen? Wenn ja, welchen?",
                "Erzähle von dem schlimmsten Erlebnis, das dir jemals in den Ferien passiert ist.",
                "Hast du jemals eine wichtige Deadline verpasst?",
                "Was war das Seltsamste, das dir jemals in deinem Kühlschrank begegnet ist?",
                "Hattest du jemals einen Traum, der wahr wurde?",
                "Was war das beste Erlebnis, das dir jemals in deinem Leben passiert ist?",
                "Hast du jemals jemanden im Stich gelassen?",
                "Was war das Lustigste, das dir jemals auf einer Reise passiert ist?",
                "Hast du jemals eine Mutprobe gemacht? Wenn ja, welche?"
            ]
            random.shuffle(truths)
            await ctx.respond(
                f"{ctx.author.mention} deine Wahrheit ist: {random.choice(truths)}"
            )
        elif choice == "Dare":
            dares = [
                "Verteidige einen Furry wenn einer geflamed wird.",
                "Poste das neueste Bild in deiner Galerie.",
                "Joker: Gib jemanden deiner Wahl eine Aufgabe. Führe den Befehl nochmal aus um die Aufgabe für die Person zu erfahren.",
                "Mach nichts.",
                "Mach ein Foto von deiner Momentanen Sicht und poste es hier",
                "Überzeuge den gesamten Chat dazu dass du das andere Geschlecht bist",
                "Der Chat darf entscheiden was du trinken musst",
                "Der Chat darf entscheiden was deine Aufgabe ist",
                "Benimm dich 2 Minuten wie ein Huhn",
                "Schreibe eine versaute Nachricht an deinen letzten Discord/WhatsApp Kontakt. Der Chat entscheidet welche Plattform",
                "Schicke ein Screenshot von der letzten Privatnachricht die du versendet hast",
                "Sprich mit einem bayrischen/sächsischen/anderem Dialekt",
                "Führe eine 3-Minütige Stand-Up-Comendyshow auf",
                "Mach 10 Liegestütze",
                "Ändere dein Profilbild für die nächsten 24 Stunden zu einem peinlichen Bild.",
                "Schreibe ein Gedicht über einen anderen Chat-Teilnehmer.",
                "Ändere deinen Nickname für die nächsten 30 Minuten zu etwas Lustigem.",
                "Poste ein Meme, das dich am besten beschreibt.",
                "Singe einen kurzen Teil eines Songs im Sprachchat.",
                "Schreibe einen 4-zeiligen Reim über das letzte Thema, das im Chat diskutiert wurde.",
                "Erzähle eine peinliche Geschichte aus deiner Kindheit.",
                "Gib für die nächsten 10 Minuten nur in Emoji-Antworten.",
                "Schreibe den Text des letzten Songs, den du gehört hast, ohne Kontext in den Chat.",
                "Tu so, als ob du ein Influencer bist, und poste eine 'Werbung' für einen imaginären Artikel.",
                "Schreibe einen Satz rückwärts im Chat.",
                "Poste ein Selfie mit einer lustigen Grimasse.",
                "Schicke eine Sprachnachricht, in der du ein Tiergeräusch machst.",
                "Erfinde eine lustige Verschwörungstheorie über einen anderen Chat-Teilnehmer.",
                "Schreibe für die nächsten 5 Minuten alles in Großbuchstaben.",
                "Poste dein letztes Google-Suchergebnis (sofern es sicher ist).",
                "Ändere dein Status zu einem peinlichen Satz.",
                "Schreibe einen Liebesbrief an eine fiktive Figur im Chat.",
                "Erkläre, warum du der beste Chat-Teilnehmer bist, ohne zu lachen.",
                "Poste ein Bild von deinem Schreibtisch oder Arbeitsbereich.",
                "Führe eine kurze Pantomime im Sprachchat vor.",
                "Teile deinen letzten Traum, an den du dich erinnerst.",
                "Erzähle eine gruselige Geschichte im Chat.",
                "Schreibe einen Rap über deinen Tag.",
                "Poste das älteste Foto, das du auf deinem Handy hast.",
                "Imitiere einen anderen Chat-Teilnehmer für die nächsten 10 Minuten.",
                "Erzähle deinen peinlichsten Schulmoment.",
                "Poste das lustigste Video, das du kennst.",
                "Schicke eine Sprachnachricht, in der du deinen Lieblingswitz erzählst.",
                "Erfinde einen neuen Spitznamen für jeden Teilnehmer im Chat.",
                "Poste ein Bild von dem, was du gerade isst oder trinkst.",
                "Beschreibe dein Leben als Titel eines Films und füge eine kurze Beschreibung hinzu.",
                "Schreibe einen Zungenbrecher im Chat.",
                "Poste ein Bild von deinem Lieblingsbuch.",
                "Erzähle von deinem letzten Albtraum.",
                "Imitiere ein bekanntes Meme im Sprachchat.",
                "Poste das letzte Bild, das du in deinen sozialen Medien gepostet hast.",
                "Ändere deinen Status in eine zufällige Tatsache über dich.",
                "Schreibe einen kurzen Dialog zwischen dir und deinem Lieblingscharakter.",
                "Poste ein lustiges GIF, das deine Stimmung beschreibt.",
                "Erzähle eine Lüge und lass die anderen raten, ob es wahr oder falsch ist.",
                "Schreibe ein Haiku über deinen Tag.",
                "Teile das lustigste Erlebnis, das du je hattest.",
                "Poste einen Screenshot von deinem aktuellen Desktop-Hintergrund.",
                "Erkläre ein kompliziertes Thema, als ob du es einem Kind erklärst.",
                "Schreibe für die nächsten 5 Minuten nur in Fragen.",
                "Poste einen Screenshot von deinem Browser-Verlauf (sofern es sicher ist).",
                "Beschreibe dein Lieblingsessen in den verlockendsten Worten.",
                "Erzähle einen Witz im Chat.",
                "Teile das letzte Video, das du auf YouTube gesehen hast.",
                "Poste ein Bild von deinem Lieblingskleidungsstück.",
                "Ändere dein Profilbild in das Bild eines Tieres für die nächsten 24 Stunden.",
                "Schreibe ein kurzes Drehbuch für einen Horrorfilm.",
                "Poste ein Bild von deinem Lieblingstier.",
                "Erfinde eine neue Regel für den Chat und lass sie für die nächsten 10 Minuten gelten.",
                "Teile eine interessante Tatsache über dich, die niemand im Chat weiß.",
                "Schicke eine Sprachnachricht, in der du dich wie ein Roboter anhörst.",
                "Erzähle von deinem ersten Schwarm.",
                "Poste ein Bild von deinem Lieblingsort.",
                "Schreibe ein kurzes Märchen über jemanden im Chat.",
                "Erzähle eine Geschichte, die mit 'Es war einmal...' beginnt.",
                "Poste ein Bild von deinem letzten Urlaub.",
                "Erfinde ein neues Emoji und beschreibe, wie es aussieht und was es bedeutet.",
                "Poste einen Screenshot von deinem letzten Chat-Verlauf (sofern es sicher ist).",
                "Schreibe einen Brief an dein zukünftiges Ich.",
                "Poste ein Bild von etwas, das dich glücklich macht.",
                "Erzähle einen Traum, den du dir unbedingt erfüllen möchtest.",
                "Poste ein Bild von deinem Lieblingsessen.",
                "Schreibe einen Songtext über das heutige Wetter.",
                "Erzähle eine Geschichte, die komplett erfunden ist, aber glaubwürdig klingt.",
                "Poste ein Bild von deinem Lieblingsgetränk.",
                "Erfinde eine lustige Ausrede für ein Verbrechen, das du nicht begangen hast.",
                "Schreibe einen Tagebucheintrag über deinen heutigen Tag.",
                "Poste ein Bild von etwas, das dich inspiriert.",
                "Erzähle eine lustige Anekdote über deine Familie.",
                "Poste ein Bild von deinem Haustier (oder einem imaginären Haustier).",
                "Schreibe einen kurzen, fiktiven Lebenslauf über eine berühmte Persönlichkeit.",
                "Erzähle eine Geschichte, in der du die Hauptfigur bist.",
                "Poste ein Bild von etwas, das du heute gelernt hast.",
                "Erfinde eine neue Superkraft und beschreibe, wie du sie einsetzen würdest.",
                "Poste einen Screenshot von deinem letzten Spiel-Highscore.",
                "Schreibe eine kurze Geschichte, die mit 'Plötzlich passierte es...' beginnt.",
                "Poste ein Bild von deinem Lieblingsfilm.",
                "Erzähle von einem peinlichen Moment, den du erlebt hast.",
                "Poste ein Bild von deiner Lieblingsjahreszeit.",
                "Erfinde eine neue Wortschöpfung und erkläre ihre Bedeutung.",
                "Poste einen Screenshot von deiner aktuellen Playlist.",
                "Schreibe einen kurzen Brief an eine berühmte Person.",
                "Erzähle eine Geschichte, die auf einer wahren Begebenheit basiert, aber übertrieben ist.",
                "Poste ein Bild von deinem Lieblingsspielzeug aus der Kindheit.",
                "Schreibe eine kurze Rezension über das letzte Buch, das du gelesen hast.",
                "Poste ein Bild von deinem letzten Geburtstagsgeschenk.",
                "Erfinde eine neue TV-Show und beschreibe die Handlung.",
                "Poste ein Bild von deinem Lieblingssport.",
                "Erzähle von deinem schlimmsten Urlaubserlebnis.",
                "Poste ein Bild von deinem letzten Konzertbesuch.",
                "Schreibe einen kurzen Aufsatz über dein Lieblingsthema."
            ]
            random.shuffle(dares)
            await ctx.respond(
                f"{ctx.author.mention} deine Pflicht ist: {random.choice(dares)}"
            )

    @discord.slash_command(name="vc", description="Schiebe andere in den Voice Chat.")
    async def vc(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du in den Voice Chat schieben möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    f"{ctx.author.mention} du kannst dich nicht selbst in den Voice Chat schieben! 🎤",
                    ephemeral=True,
                )
                return
            await ctx.respond(
                f"{ctx.author.mention} schiebt {member.mention} in den Voice Chat! 🎤"
            )
        elif not member:
            await ctx.respond(f"{ctx.author.mention} chillt im Voice Chat! 🎤")

    @discord.slash_command(
        name="water", description="Gib oder erhalte Wasser von jemandem."
    )
    async def water(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, mit dem du Wasser teilen möchtest.", required=False),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dir selbst kein Wasser geben! 💧", ephemeral=True
                )
                return
            await ctx.respond(f"{ctx.author.mention} gibt {member.mention} Wasser! 💧")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} trinkt Wasser! 💧")

    @discord.slash_command(name="welcome", description="Begrüße jemanden.")
    async def welcome(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du begrüßen möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    f"{ctx.author.mention} du kannst dich nicht selbst begrüßen! 👋"
                )
                return
            await ctx.respond(f"{ctx.author.mention} begrüßt {member.mention}! 👋")
        elif not member:
            await ctx.respond(f"{ctx.author.mention} begrüßt alle! 👋")

    @discord.slash_command(name="werfen", description="Bewirf andere mit Sachen")
    async def werfen(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du bewerfen möchtest."),  # type: ignore
    ):
        gegenstaende = [
            "einem Toaster",
            "einer Küchenmaschine",
            "einem Kühlschrank",
            "Tom",
            "Deno",
            "einem Fernseher",
            "einer Waschmaschine",
            "einem Trockner",
            "einer Kloschüssel",
            "einer Tür",
            "Tomaten",
            "nassen Lappen",
            "einem Schlappen",
            "einer Glas Flasche",
            "einem Tisch",
            "einer PS1",
            "einer PS2",
            "einer PS3",
            "einer PS4",
            "einer PS5",
            "einer PS6",
            "einer PS7",
            "einer PS8",
            "einer PS69",
            'einer Wii-Mote weil man "vergessen" hat das Bändchen umzubinden',
            "einer Wii-Mote weil man das Bändchen umgebunden hat",
            "einem Auto",
            "einem Opel Astra",
            "einem Keyblade",
            "einem Gecko",
            "einem Sandkorn",
            "einer Genkidama",
            "einem Lichtschwert",
            "einem Pokeball... Gonna catch em all!",
            "einem Controller",
            "einer Lampe",
            "einer Granate",
            "Wurftsternen",
            "Duftbombe weil du stinkst",
            "einem Blatt",
            "einem Wattepad",
            "-1 lagigen Klopapier",
            "einer Europalette",
            "einem Gabelstapler",
            "1ct",
            "einem T-Shirt",
            "einer Jacke",
            "sich selbst. YEEET",
            "einer Portal Gun",
            "einem Waifu-Pillow",
            "einem Schredder",
            "einem Schrank",
            "einem ODM Gear",
            "einem Titan",
            "einem Shonen Protagonist",
            "Nudeln",
            "Ravioli",
            "einem Plastikstrohhalm",
            "einem Glasstrohhalm",
            "einem Plastikteller",
            "einem Pappteller",
            "einem Asthmaspray",
            "einem TicTac",
            "einer Tafel Schokolade",
            "dem Mastersword",
            "der Sonne",
            "der Sonne",
            "der Sonne",
            "der Sonne",
            "der Sonne",
            "einer aufgegessenen Chips Tüte",
            "einem Spiegel",
            "schlechten Game Design",
            "einer Spitzhacke",
            "einem Plastikflugzeug",
            "einem Papierflugzeug",
            "einer Kreditkarte",
            "einem Teddybär",
            "einer RTX 3080",
            "Nintendo Charakteren",
            "Cappy aus Mario Odyssey",
            "den Infinity Stones",
            "Stormbraker",
            "Mjolnir",
            "Captain Americas Schild",
            "einer Gardine",
            "einem Hund",
            "einer Katze",
            "einem Hamster",
            "einem Pferd",
            "einer Schlange",
            "einer giftigen Schlange",
            "einer Oculus Rift",
            "einem Ofen",
            "einem heißen Ofen",
            "einem Lehrer",
            "einem Lehrer. GET EDUCATED!",
            "GLaDOS",
            "einer Zigarette",
            "einem TARDIS",
            "einem Subwoofer",
            "einer Dubstep Gun",
            "einem Schneeball",
            "einem Dalek",
            "einem Feuerball",
            "einem Todesball",
            "einer Majoras Mask",
            "einem Triforce",
            "einer Ocarina of Time",
            "einem Drachi",
            "einem Wolfiii",
            "einem Lutz",
            "einem Floet",
            "einem Greencube",
            "einem Pikmin",
            "einem Bett",
            "Schulden",
            "einer Hochzeit",
            "einem Fussballstadion",
            "der Allianz Arena",
            "Heroin",
            "Obdachlosigkeit",
            "Scheidungspapieren",
            "einer Random Stadt",
            "nichts",
            "einem Auto",
            'ÖKOLJUHBEFPGIWUBEPFGIKUWZGE=F(IPUNWHEPI$O)G=/UZGHWEPOG)IU(HW§=$)T(/"HZ§?)T(U/HGWEPIOVNUDVPOSJvopwu48tzh0ß39284gujhaß9we487zht3ß9rgvjnaße958zg==',
            "Boomern",
            "Lebenshilfe",
            "Depression",
            "einem Bügeleisen",
            "einem traurigen Leben mit einer schlechten Karriere, einer schrecklichen Familie und Krebs im Endstadium",
            "Tot",
            "deiner Mum",
            "einem Hochzeitsring",
            "der Sonne",
            "Rickroll",
            "Hass",
            "schlechten Witzen",
            "Komplimenten",
            "Komplimenten",
            "Komplimenten",
            "~~Komplimenten~~",
            "einem Schwarzen Loch",
            "eine UNO Reverse Karte",
            "Kondomen",
            "einem Kondom",
            "einem Kondom",
            "einem Kondom",
            "einem gebrauchten Kondom",
            "Discord",
            "ICQ",
            "Gardinen",
            "ganz vielen Plüschtieren",
            "einem Kissen",
            "einem Haus",
            "einem Bett",
            "nichts",
            "einer Bibel",
            "Politikern",
            "Mathe",
            "Feenstaub",
            "Diabetis",
            "Atombomben",
            "Dem Bundeskanzler",
            "Zwillingen",
            "einem Average Discord Mod",
            "Internet",
            "einem Laptop",
            "einem IKEA Schrank",
            "einem IKEA Tisch",
            "einer Steckdose",
            "Luft",
            "Kohlenstoffdioxid",
            "Diamanten",
            "Gold",
            "Kupfer",
            "Helium",
            "Wasserbomben",
            "Russland",
            "Deutschland",
            "einem Todesstrahl",
            "einem Buch. GET EDUCATED!",
            "sich selbst",
            "einem Schornstein",
            "einer Geige",
            "Tintenfischen",
            "Salz",
            "Pfeffer",
            "Rattengift",
            "einer Schneelawine",
            "Uran",
            "Iridium",
            "Kalium",
            "einer Dilara",
            "einer Chantal",
            "einem Mehmet",
            "dem Mond",
            "dem Mond (Gewicht: ca. 1/3 deiner Mum)",
            "einem AC-130",
            "Soup",
            "Soupra",
            "Bohnensuppe",
            "Bohnensuppe (Kaffee)",
            "Beans",
            "einer Kettensäge",
            "Corona",
            "einem Affen",
            "Trump",
            "Putin",
            "Angela Merkel",
            "einer Schneeflocke",
            "einem Fussel",
            "AIDS",
            "Ligma",
            "Breath'nt",
            "einer benutzten Atombombe",
            "Kamehameha",
        ]
        gegenstaende = random.choice(gegenstaende)
        if member:
            if member == ctx.author:
                await ctx.respond(
                    "Du kannst dich nicht selbst bewerfen! 🎯", ephemeral=True
                )
                return
            zufallszahl = random.randint(1, 100)
            if zufallszahl <= 5:
                await ctx.respond(
                    f"TRIPLE THROW! {ctx.author.mention} wirft {member.mention} mit {random.choice(gegenstaende)}, {random.choice(gegenstaende)} und {random.choice(gegenstaende)} ab! 🎯"
                )
            elif zufallszahl <= 10:
                await ctx.respond(
                    f"DOUBLE THROW! {ctx.author.mention} wirft {member.mention} mit {random.choice(gegenstaende)} und {random.choice(gegenstaende)} ab! 🎯"
                )
            else:
                await ctx.respond(
                    f"{ctx.author.mention} wirft {member.mention} mit {gegenstaende} ab! 🎯"
                )

    @discord.slash_command(name="yeet", description="Yeet.")
    async def yeet(
        self,
        ctx,
        member: discord.Option(discord.Member, "Der Benutzer, den du yeeten möchtest."),  # type: ignore
    ):
        if member:
            if member == ctx.author:
                await ctx.respond(
                    f"{ctx.author.mention} du kannst dich nicht selbst yeeten! 🚀",
                    ephemeral=True,
                )
                return
            await ctx.respond(f"{ctx.author.mention} yeet {member.mention}! 🚀")
        elif not member:
            await ctx.respond(
                f"{ctx.author.mention} hat das Verlangen jemanden zu yeeten! 🚀"
            )


def setup(bot):  # this is called by Pycord to setup the cog
    bot.add_cog(Fun(bot))  # add the cog to the bot
