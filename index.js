const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.content === '!sorular') {
    
    msg.reply('Sorular geliyor..\n'
    +'Ucretsiz izleyenlere bir cift lafim var [ !soru1 ]\n'
    +'Ihracat: Neden ihracat? [ !soru2 ]\n'
    +'Ihracat: Neden dolar kazanmali? [ !soru3 ]\n'
    +'Ihracat: Farkli zaman dilimlerinde calismak [ !soru4 ]\n'
    +'İhracat: #birlikteihracat Slack Topluluğu [ !soru5 ]\n'
    +'Freelance Dünyası: Hiç freelance çalıştın mı? [ !soru6 ]');

  }

  if (msg.content === '!soru1') {
    msg.reply('https://youtu.be/ScHUWVAMK7A');
  }
  if (msg.content === '!soru2') {
    msg.reply('https://youtu.be/SMVgfTMs-Ic');
  }
  if (msg.content === '!soru3') {
    msg.reply('https://youtu.be/ZUnm52tkbHc');
  }
  if (msg.content === '!soru4') {
    msg.reply('https://youtu.be/qGlb0d4Wtxk');
  }
  if (msg.content === '!soru5') {
    msg.reply('https://youtu.be/bjGo5Rcesco');
  }
  if (msg.content === '!soru6') {
    msg.reply('https://youtu.be/iT1zOQ8fyQQ');
  }

});

client.login(process.env.BOT_TOKEN);
