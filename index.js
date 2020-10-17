const Discord = require('discord.js');
const client = new Discord.Client();
const {google} = require('googleapis');
const { prefix, token } = require('./config.json');
//const creds = require(process.env.GOOGLE_CREDENTIALS);
//const creds = process.env.GOOGLE_CREDENTIALS;

const clientGoogle = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,//creds.client_email,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),//creds.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

clientGoogle.authorize(function(err,tokens){
  if(err){
      console.log(err);
      //return;
  } else {
      console.log('Connect mcy');
      gsrun(clientGoogle);
  }
});

async function gsrun(cl){
  const gsapi = google.sheets({version:'v4', auth: cl});
  const doc = {
      spreadsheetId: '1MhXCEKaqYbyHiDr8hmLoqShgp2NhNwQSXHK_eZx8uBk',//process.env.SPREADSHEETID,
      range: 'BISCBot!A1:H'
  }

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', message => {
    if (message.content.startsWith(`${prefix}basvurdum`)) {

      let req = await gsapi.spreadsheets.values.get(doc);
      const rows = req.data.values;
      console.log(rows.length);
      let n = rows.length+1;
      console.log(n);

      let chan = message.channel.id;
      if(chan==='763376896284426280'){
        let mesajorj = message.content;
        let mesajrep = mesajorj.replace(`${prefix}ping`,'');
        let chan = message.channel.id; 
        let disc = message.author.discriminator;
        let time = message.createdAt.toString();
        let timestamp = message.createdTimestamp.toString();
        let uname = message.author.username;
        let uid = message.author.id;
        const docUpdate = {
            spreadsheetId: '1MhXCEKaqYbyHiDr8hmLoqShgp2NhNwQSXHK_eZx8uBk',//process.env.SPREADSHEETID,
            range: `BISCBot!A${n}`,
            valueInputOption: 'USER_ENTERED',
            resource: {values: [
                [ timestamp, uid, uname, disc, mesajorj ]
              ]}
        }
        gsapi.spreadsheets.values.update(docUpdate);
    
      }
    }
  });

}

client.login(process.env.BOT_TOKEN);