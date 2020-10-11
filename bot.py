import discord
from discord.ext import commands

client = commands.Bot(command_prefix = '.')

@client.event
async def on_ready():
    print('Bot is ready!')

client.login('NzU4NjI1ODY0ODQ1NDkyMjM0.X2xrZA.Ee8dGBaa6NfoKVAeaM6W0oJgrQE')    