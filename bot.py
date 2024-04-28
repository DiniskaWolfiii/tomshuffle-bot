from discord.ext import commands
import discord
import os # default module
from dotenv import load_dotenv
import sys

load_dotenv() # load all the variables from the env file
#bot = commands.Bot(intents=discord.Intents.all())
bot = commands.Bot(debug_guilds=[1001916230069911703], intents=discord.Intents.all()) # for debugging - Wolfiiis Server
#bot = commands.Bot(debug_guilds=[297425051639349249], intents=discord.Intents.all()) # for debugging - Tomshuffle Server

@bot.event
async def on_ready():
    print(f"{bot.user} is ready and online!")

if __name__ == '__main__':
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
                print(f"{i} wurde geladen")

    if os.path.isdir("./../temp-voice"):
        os.chdir("./../temp-voice")
    else:
        os.chdir("./../temp-voice")
    for i in os.listdir():
        if i.endswith(".py"):
            try:
                bot.load_extension(f"temp-voice.{i[:-3]}")
            except Exception as error:
                print('{} konnte nicht geladen werden. [{}]'.format(i, error))
            else:
                print(f"{i} wurde geladen")

bot.run(os.getenv('TOKEN')) # run the bot with the token