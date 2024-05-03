from discord.ext import commands, tasks
import requests
import os
import googleapiclient.discovery
from dotenv import load_dotenv

load_dotenv()

class StatusPageUpdate(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.update_status.start()

    def cog_unload(self):
        self.update_status.cancel()

    @tasks.loop(seconds=299.0)
    async def update_status(self):
        requests.get(os.getenv("STATUS_PAGE_URL"))

class YouTubeUpdate(commands.Cog): 
    def __init__(self, bot):
        self.bot = bot
        self.check_new_video.start()
        self.latest_video_id = None

    def cog_unload(self):
        self.check_new_video.cancel()

    @commands.Cog.listener()
    async def on_ready(self):
        self.check_new_video.start()

    @tasks.loop(minutes=5.0)
    async def check_new_video(self):
        youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=os.getenv("GOOGLE_API_KEY"))
        request = youtube.search().list(part="snippet", channelId="UCHhzdFRBfKCPFt-K0RAlg3g", maxResults=1, order="date")
        response = request.execute()
        video_id = response["items"][0]["id"]["videoId"]
        
        """if self.latest_video_id is None:
            self.latest_video_id = video_id"""
        if self.latest_video_id != video_id:
            self.latest_video_id = video_id
            channel = self.bot.get_channel(1002248661893398605)
            await channel.send(f"https://www.youtube.com/watch?v={video_id}")

def setup(bot):
    bot.add_cog(StatusPageUpdate(bot))
    bot.add_cog(YouTubeUpdate(bot))