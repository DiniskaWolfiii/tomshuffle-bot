import discord
from discord.ext import commands

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
        await self.bot.change_presence(activity=discord.Game(name="Was mache ich hier?")) # set the bot's activity to "Toasting..."
def setup(bot): # this is called by Pycord to setup the cog
    bot.add_cog(Setups(bot)) # add the cog to the bot