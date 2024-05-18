"""from flask import Flask, request
from discord.ext import commands, tasks
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/tomshuffle-bot-ping', methods=['POST'])
def ping():
    return "OK", 200

def run():
    print("Starting Flask server")
    app.run(host='0.0.0.0', port=5000)

class StatusPageUpdate(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.update_status.start()
        

    def cog_unload(self):
        self.update_status.cancel()

    @tasks.loop(seconds=299.0)
    async def update_status(self):
        requests.get(os.getenv("STATUS_PAGE_URL"))

def setup(bot):
    bot.add_cog(StatusPageUpdate(bot))"""