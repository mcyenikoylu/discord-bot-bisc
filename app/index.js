const Discord = require('discord.js');
const client = new Discord.Client();
const {google} = require('googleapis');
//const creds = require('./google-credentials.json'); 
const creds = process.env.GOOGLE_CREDENTIALS;

//discord baglantilarim.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//discord mesaj islemlerim.
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
    msg.reply('ayaktayim.');
    //msg.reply('https://youtu.be/ScHUWVAMK7A');
    
    //google spreadsheet kodlari
    //google api baglantilarim.
const clientGoogle = new google.auth.JWT(
  creds.client_email,
  null,
  creds.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
clientGoogle.authorize(function(err,tokens){
  if(err){
      console.log(err);
      //return;
  } else {
      console.log('Connect');
      gsrun(clientGoogle);
  }
});

    async function gsrun(cl){
      const gsapi = google.sheets({version:'v4', auth: cl});
      const doc = {
        spreadsheetId: process.env.SPREADSHEETID,
        range: 'Class Data!A2:F2'
      }
      let req = await gsapi.spreadsheets.values.get(doc);
      let reqArray = req.data.values;
      let newReqArray = reqArray.map(function(r){
        r.push(r[0]+'-'+r[1]);
        return r;
    });
    const docUpdate = {
      spreadsheetId: process.env.SPREADSHEETID,
      range: 'hot new sheet!!A1',
      valueInputOption: 'USER_ENTERED',
      resource: {values: newReqArray}
    }
    let res = await gsapi.spreadsheets.values.update(docUpdate);
    //console.log(res);

    }
    //
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