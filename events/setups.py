import discord
from discord.ext import commands
import random

class Setups(commands.Cog): # create a class for our cog that inherits from commands.Cog
    # this class is used to create a cog, which is a module that can be added to the bot

    def __init__(self, bot): # this is a special method that is called when the cog is loaded
        self.bot = bot

    @commands.Cog.listener() # we can add event listeners to our cog
    async def on_member_join(self, member): # this is called when a member joins the server
        if member.guild.id == 297425051639349249:
            role_ids = [943973469312413808, 943969798231056414, 941858319969189968, 941857831043358741]  # role ids
            for role_id in role_ids:
                role = discord.utils.get(member.guild.roles, id=role_id) # get the role object
                await member.add_roles(role, reason="Auto role on join") # add the role to the member
    @commands.Cog.listener()
    async def on_ready(self): # this is called when the bot is ready
        stati = [
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
            '👀',
        ]
        await self.bot.change_presence(activity=discord.CustomActivity(name=random.choice(stati)))
def setup(bot): # this is called by Pycord to setup the cog
    bot.add_cog(Setups(bot)) # add the cog to the bot