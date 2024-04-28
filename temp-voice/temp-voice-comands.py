import discord
from discord.ext import commands
import pickle
import os

tempVoiceCmdIds = {
    0 : "Rename",
    1 : "Limit",
    2 : "Lock",
    3 : "Unlock",
    4 : "Claim"
}

class TempVoiceInterface(discord.ui.Button):
    def __init__(self, cmdId : int):
        super().__init__(
            label=tempVoiceCmdIds[cmdId],
            style=discord.ButtonStyle.secondary,
            custom_id=str(cmdId),
        )

    async def callback(self, interaction: discord.Interaction):
        cmdId = int(self.custom_id)
        if cmdId == 0:
            if not memberIsChannelOwner(interaction.user):
                return await interaction.response.send_message("Du hast keinen temporären Sprachkanal!", ephemeral=True)    
            await interaction.response.send_modal(RenameChannel(title="Benenne Sprachkanal um"))
        elif cmdId == 1:
            if not memberIsChannelOwner(interaction.user):
                return await interaction.response.send_message("Du hast keinen temporären Sprachkanal!", ephemeral=True)
            await interaction.response.send_modal(LimitChannel(title="Setze Nutzerlimit"))
        elif cmdId == 2:
            if not memberIsChannelOwner(interaction.user):
                return await interaction.response.send_message("Du hast keinen temporären Sprachkanal!", ephemeral=True)
            await LockChannel().callback(interaction)
        elif cmdId == 3:
            if not memberIsChannelOwner(interaction.user):
                return await interaction.response.send_message("Du hast keinen temporären Sprachkanal!", ephemeral=True)
            await UnlockChannel().callback(interaction)
        elif cmdId == 4:
            await ClaimChannel().callback(interaction)

class TempVoiceCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.slash_command(name="temp-voice-interface", guild_ids=[1001916230069911703, 297425051639349249], description="Sendet die Nachricht für das Sprachkanal Interface. (Nur für Bot Owner)")
    async def rolebutton(self, ctx: discord.ApplicationContext):
        if ctx.author.id != 327880195476422656:
            return await ctx.respond("Du bist nicht der Bot Owner!", ephemeral=True)
        view = discord.ui.View(timeout=None)

        embed = discord.Embed(
            title="Temp Voice Interface",
            description="Dieses Interface kann genutzt werden um deinen temporären Sprachkanal zu konfigurieren!",
            color=discord.Color.blurple()
        )

        embed.set_footer(text="⚙️ Klicke auf die Buttons um das Interface zu nutzen!")

        for cmdId in tempVoiceCmdIds:
            view.add_item(TempVoiceInterface(cmdId))
        await ctx.send(embed=embed, view=view)
    
    @commands.Cog.listener()
    async def on_ready(self):
        view = discord.ui.View(timeout=None)
        guild = self.bot.get_guild(1001916230069911703)
        for cmdId in tempVoiceCmdIds:
            view.add_item(TempVoiceInterface(cmdId))
        self.bot.add_view(view)

class RenameChannel(discord.ui.Modal):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(
            discord.ui.InputText(
                label="Wähle einen neuen Namen für deinen Kanal aus!",
                placeholder="Leer lassen um den Namen zurückzusetzen",
                required=False,
            ),
            *args,
            **kwargs,
        )
    async def callback(self, interaction: discord.Interaction):

        
        channel = getTempChannelFromMember(interaction.user)
        if channel is not None:
            if self.children[0].value:
                await channel.edit(name=self.children[0].value)
            else:
                await channel.edit(name=f"{interaction.user.display_name}'s Channel")

        embed = discord.Embed(
            title="Update erfolgreich!",
            description=f"Dein Kanal hat nun den Namen {channel.name}!",
        color=discord.Color.embed_background(),
        )
        await interaction.response.send_message(embeds=[embed], ephemeral=True)
        
class LimitChannel(discord.ui.Modal):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(
            discord.ui.InputText(
                label="Wähle das neue Limit für deinen Kanal aus!",
                placeholder="Leer lassen um das Limit zurückzusetzen",
                required=False,
                max_length=2,
            ),
            *args,
            **kwargs,
        )
    async def callback(self, interaction: discord.Interaction):
            
            if not self.children[0].value.isnumeric() or self.children[0].value is None:
                return await interaction.response.send_message("Bitte gebe eine gültige Zahl ein! (1 - 99)", ephemeral=True)
            channel = getTempChannelFromMember(interaction.user)
            if channel is not None:
                if self.children[0].value:
                    await channel.edit(user_limit=int(self.children[0].value))
                else:
                    await channel.edit(user_limit=5)
    
            embed = discord.Embed(
                title="Update erfolgreich!",
                description=f"Dein Kanal hat nun ein Limit von {channel.user_limit}!",
                color=discord.Color.embed_background(),
            )
            await interaction.response.send_message(embeds=[embed], ephemeral=True)

class ClaimChannel():
    async def callback(self, interaction: discord.Interaction):
        
        if interaction.user.voice is None:
            return await interaction.response.send_message("Du musst in einem Sprachkanal sein um einen temporären Sprachkanal zu claimen!", ephemeral=True)
        elif memberIsChannelOwner(interaction.user):
            return await interaction.response.send_message("Du hast bereits einen temporären Sprachkanal!", ephemeral=True)

        channel_id, member_id = pickle.load(open(f"temp-voice-ids/{interaction.user.voice.channel.id}.pkl", "rb"))

        for member in interaction.user.voice.channel.members:
            if member.id == member_id:
                return await interaction.response.send_message("Der Channel Owner ist bereits im temporären Sprachkanal!", ephemeral=True)
        
        os.remove(f"temp-voice-ids/{channel_id}.pkl")
        pickle.dump((channel_id, member.id), open(f"temp-voice-ids/{channel_id}.pkl", "wb"))

        await interaction.user.voice.channel.edit(name=f"{interaction.user.display_name}'s Channel")

        embed = discord.Embed(
            title="Temporärer Sprachkanal geclaimed!",
            description="Du hast den temporären Sprachkanal erfolgreich geclaimed!",
            color=discord.Color.blurple()
        )
        await interaction.response.send_message(embed=embed, ephemeral=True)

class LockChannel():
    async def callback(self, interaction: discord.Interaction):
        
        channel = getTempChannelFromMember(interaction.user)
        await channel.set_permissions(interaction.guild.default_role, connect=False)
        embed = discord.Embed(
            title="Update erfolgreich!",
            description="Dein temporärer Sprachkanal wurde erfolgreich gesperrt!",
            color=discord.Color.blurple()
        )
        await interaction.response.send_message(embed=embed, ephemeral=True)

class UnlockChannel():
    async def callback(self, interaction: discord.Interaction):
        
        channel = getTempChannelFromMember(interaction.user)
        await channel.set_permissions(interaction.guild.default_role, connect=True)
        embed = discord.Embed(
            title="Update erfolgreich!",
            description="Dein temporärer Sprachkanal wurde erfolgreich entsperrt!",
            color=discord.Color.blurple()
        )
        await interaction.response.send_message(embed=embed, ephemeral=True)

def setup(bot):
    bot.add_cog(TempVoiceCog(bot))

def memberIsChannelOwner(member):
    for filename in os.listdir("temp-voice-ids"):
        if filename.endswith(".pkl"):
            channel_id, member_id = pickle.load(open(f"temp-voice-ids/{filename}", "rb"))
            if member_id == member.id:
                return True
    return False

def getTempChannelFromMember(member):
    for filename in os.listdir("temp-voice-ids"):
        if filename.endswith(".pkl"):
            channel_id, member_id = pickle.load(open(f"temp-voice-ids/{filename}", "rb"))
            if member_id == member.id:
                return member.guild.get_channel(channel_id)
    return None