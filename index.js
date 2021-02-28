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

      const doc2 = {
        spreadsheetId: process.env.SPREADSHEETIDBISC,
        range: 'BISCBotAll!A1:J'
      }
      let req2 = await gsapi.spreadsheets.values.get(doc2);
      let rows2 = req2.data.values;
      let n2 = rows2.length+1;
    
      if (mesajtr.startsWith(`${prefix}`)) {
        let chan = message.channel.id;
        if(chan==='763376896284426280'){
        let mesajorj = mesajtr;
        let disc = message.author.discriminator;
        let timestamp = message.createdTimestamp.toString();
        let uname = message.author.username;
        let uid = message.author.id;
        //! split
        const words = mesajorj.split(`${prefix}`);
        const array1 = [];
        words.forEach(e => {
            if(e != ''){
                array1.push([timestamp, uid, uname, disc, `${prefix}`+e.replace('\n','')])
            }
        });
        const docUpdate = {
            spreadsheetId: process.env.SPREADSHEETIDBISC,
            range: `BISCBot!A${n}`,
            valueInputOption: 'USER_ENTERED',
            resource: {values: array1}
        }

        gsapi.spreadsheets.values.update(docUpdate);
        console.log('Kayit yapan kullanici:' + uname.toString() + ' mesaj:' + mesajorj);
        }
        else if (chan==='813432940448710686'){
        //https://hook.integromat.com/bapwvuj06uneygn2yk78hndw4lqaicnt?email=mcyenikoylu@gmail.com&discord-id=123&message-id=selam
        //813432940448710686
        if (mesajtr.startsWith(`${prefix}email`)){
            var useremail = mesajtr.split(`${prefix}email`);
            var useremailrep = useremail.toString().replace(',',' ');

            console.log('email:' + useremailrep.trim() + ' discord-id:' + message.author.id + ' message-id:' + message.id + " channel-id:813432940448710686");

        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xmlhttp = new XMLHttpRequest();

        //var url = "https://hook.integromat.com/bapwvuj06uneygn2yk78hndw4lqaicnt";

        //https://hook.integromat.com/uiof1nuh5qznih6koltu0fq98yf8q5pl
        var url = "https://hook.integromat.com/uiof1nuh5qznih6koltu0fq98yf8q5pl";

        var data = {"email": useremailrep.trim(),
        "discord-id": message.author.id, 
        "message-id": message.id,
      "channel-id": '813432940448710686'};

        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;");

//var parms = "{'email':'" + useremailrep.trim() + "', 'discord-id':'" + message.author.id + "', 'message-id':'" + message.id + "', 'channel-id':'813432940448710686'"

        xmlhttp.send(JSON.stringify(data));
  //       xmlhttp.send(JSON.stringify({"email":useremailrep.trim(),
  //     "discord-id":message.author.id,
  //   "message-id":message.id,
  // "channel-id":"813432940448710686"}));


  

      }}
      }
      
      // else {
      //   //console.log(message.content);
      //   let timestampp = message.createdTimestamp.toString();
      //   let uidd = message.author.id;
      //   let unamee = message.author.username;
      //   let discc = message.author.discriminator;
      //   let authorname = message.author.tag;
      //   let aname = message.member.displayName;
      //   let chanid = message.channel.id;
      //   let channame = message.channel.name;
      //   let msgid = message.id;
        
      //   const docUpdateMsg = {
      //       spreadsheetId: process.env.SPREADSHEETIDBISC,
      //       range: `BISCBotAll!A${n2}`,
      //       valueInputOption: 'USER_ENTERED',
      //       resource: {values: [
      //           [ timestampp, uidd, unamee, discc, authorname, aname, chanid, channame, msgid, message.content]
      //         ]}
      //       //resource: {values: array1}
      //   }
      //   gsapi.spreadsheets.values.update(docUpdateMsg);
      // }

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