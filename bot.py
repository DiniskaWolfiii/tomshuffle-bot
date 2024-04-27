from discord.ext import commands
import discord
import os # default module
from dotenv import load_dotenv

load_dotenv() # load all the variables from the env file
#bot = commands.Bot(intents=discord.Intents.all())
bot = commands.Bot(debug_guilds=[1001916230069911703], intents=discord.Intents.all())

@bot.event
async def on_ready():
    print(f"{bot.user} is ready and online!")

"""if __name__ == '__main__':
    if os.path.isdir("commands"):
        os.chdir("commands")
    else:
        os.chdir("app/commands")
    for i in os.listdir():
        if i.endswith(".py"):
            try:
                bot.load_extension(f"commands.{i[:-3]}")
            except Exception as error:
                print('{} konnte nicht geladen werden. [{}]'.format(i, error))
            else:
                print(f"{i} wurde geladen")
    if os.path.isdir("./../events"):
        os.chdir("./../events")
    else:
        os.chdir("./../app/events")
    for i in os.listdir():
        if i.endswith(".py"):
            try:
                bot.load_extension(f"events.{i[:-3]}")
            except Exception as error:
                print('{} konnte nicht geladen werden. [{}]'.format(i, error))
            else:
                print(f"{i} wurde geladen")"""
class MyView(discord.ui.View): # Create a class called MyView that subclasses discord.ui.View
    @discord.ui.button(label="Click me!", emoji="😎") # Create a button with the label "😎 Click me!" with color Blurple
    async def button_callback(self, button, interaction):
        await interaction.response.send_message("You clicked the button!") # Send a message when the button is clicked

@bot.slash_command() # Create a slash command
async def button(ctx):
    await ctx.respond("This is a button!", view=MyView()) # Send a message with our View class that contains the button

bot.run(os.getenv('TOKEN')) # run the bot with the token