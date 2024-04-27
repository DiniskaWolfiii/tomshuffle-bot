import discord
from discord.ext import commands

class TempVoice(commands.Cog): # create a class for our cog that inherits from commands.Cog
    # this class is used to create a cog, which is a module that can be added to the bot

    def __init__(self, bot): # this is a special method that is called when the cog is loaded
        self.bot = bot

    @commands.Cog.listener()
    async def on_voice_state_update(self, member, before, after):
        joinToCreateVoice = 941422962056265748 # the voice channel id that will be used to create the channel
        joinToCreateParent = 941422858607931442 # the category id where the channel will be created

        if before.channel is None: # if the member was not in a voice channel before

            if after.channel.id == joinToCreateVoice: # if the member joined the join to create voice channel
                await createTempVoice(self.bot, joinToCreateParent, member) # create the temp channel


        elif after.channel is None: # if the member is not in a voice channel after

            if before.channel.id == joinToCreateVoice: # if the member left the join to create voice channel
                return
            elif len(before.channel.members) == 0 and before.channel.category.id == joinToCreateParent: # if there are no more users in the channel
                await before.channel.delete() # delete the channel
            
        


        else: # if the member moved to another channel
            if before.channel.id == after.channel.id: # if the member is in the same channel
                return
            elif before.channel.id == joinToCreateVoice: # if the member was in the join to create voice channel
                return
            elif before.channel.category_id != joinToCreateParent and after.channel.category_id == joinToCreateParent and after.channel.id != joinToCreateVoice: # if member joined a temp channel and was not in a temp channel before
                return
            elif before.channel.category_id == joinToCreateParent and after.channel.category_id != joinToCreateParent: # if member switched from a temp channel to a normal channel
                if len(before.channel.members) == 0: # if there are no more users in the channel
                    await before.channel.delete() # delete the channel
            elif after.channel.id == joinToCreateVoice: # if the member joined the join to create voice channel
                if before.channel.category_id != joinToCreateParent: # if the member was not in a temp channel before
                    await createTempVoice(self.bot, joinToCreateParent, member) # create the temp channel
                elif before.channel.category_id == joinToCreateParent and before.channel.id != joinToCreateVoice: # if the member was in a temp channel before and joins the join to create voice channel
                    if len(before.channel.members) == 0: # if there are no more users in the channel
                        await before.channel.delete() # delete the channel
                if before.channel.category_id == joinToCreateParent and after.channel.id == joinToCreateVoice:
                    await createTempVoice(self.bot, joinToCreateParent, member) # create the temp channel
            elif before.channel.category_id == joinToCreateParent and after.channel.category_id == joinToCreateParent: # if the member moved between temp channels
                if len(before.channel.members) == 0: # if there are no more users in the channel
                    await before.channel.delete() # delete the channel
        pass




def setup(bot): # this is called by Pycord to setup the cog
    bot.add_cog(TempVoice(bot)) # add the cog to the bot



async def createTempVoice(bot, joinToCreateParent, member):
    category = bot.get_channel(joinToCreateParent) # get the category
    channel = await category.create_voice_channel(f"{member.display_name}'s Channel") # create the channel
    await member.move_to(channel) # move the member to the channel
    return channel