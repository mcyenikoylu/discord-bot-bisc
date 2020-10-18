const Discord = require('discord.js');
const client = new Discord.Client();
const {google} = require('googleapis');
const { prefix, token } = require('./config.json');

let n;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  
  //turkce karakter convert.
  let mesajtr = Cevir(message.content);

  if (mesajtr.startsWith(`${prefix}basvurdum`) 
  || mesajtr.startsWith(`${prefix}guncelledim`) 
  || mesajtr.startsWith(`${prefix}aldim`)) {

    const clientGoogle = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    
    clientGoogle.authorize(function(err,tokens){
      if(err){
          console.log(err);
          //return;
      } else {
        console.log('Connect mcy bot');
          gsrun(clientGoogle);
      }
    });

    async function gsrun(cl){
      const gsapi = google.sheets({version:'v4', auth: cl});
      const doc = {
          spreadsheetId: process.env.SPREADSHEETIDBISC,
          range: 'BISCBot!A1:H'
      }
      let req = await gsapi.spreadsheets.values.get(doc);
      let rows = req.data.values;
      let n = rows.length+1;
    
      let chan = message.channel.id;
      if(chan==='763376896284426280'){
        let mesajorj = mesajtr;
        let disc = message.author.discriminator;
        let timestamp = message.createdTimestamp.toString();
        let uname = message.author.username;
        let uid = message.author.id;
        const docUpdate = {
            spreadsheetId: process.env.SPREADSHEETIDBISC,
            range: `BISCBot!A${n}`,
            valueInputOption: 'USER_ENTERED',
            resource: {values: [
                [ timestamp, uid, uname, disc, mesajorj ]
              ]}
        }
        gsapi.spreadsheets.values.update(docUpdate);
        console.log('Kayit yapan kullanici:' + uname.toString());
      }
    }
  }
});
function Cevir(text)
 {
    var trMap = {
        'çÇ':'c',
        'ğĞ':'g',
        'şŞ':'s',
        'üÜ':'u',
        'ıİ':'i',
        'öÖ':'o'
    };
    for(var key in trMap) {
        text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
    }
    return text;
}
client.login(process.env.BOT_TOKEN);