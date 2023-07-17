const Discord = require("discord.js");
const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require("fs");
const db = require('croxydb')
const config = require("./config.json");
const Rest = require("@discordjs/rest");
const DiscordApi = require("discord-api-types/v10");
const client = new Discord.Client({
	intents:  3276543,
    partials: Object.values(Discord.Partials),
	allowedMentions: {
		parse: ["users", "roles", "everyone"]
	},
	retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

/*                         SLASH COMMANDS                               */

console.log(`[-] ${fs.readdirSync("./commands").length} komut algılandı.`)

for(let commandName of fs.readdirSync("./commands")) {
	if(!commandName.endsWith(".js")) return;

	const command = require(`./commands/${commandName}`);	
	client.commands.push({
		name: command.name.toLowerCase(),
		description: command.description.toLowerCase(),
		options: command.options,
		dm_permission: false,
		type: 1
	});

	console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}

/*                         EVENTS                                    */

console.log(`[-] ${fs.readdirSync("./events").length} olay algılandı.`)

for(let eventName of fs.readdirSync("./events")) {
	if(!eventName.endsWith(".js")) return;

	const event = require(`./events/${eventName}`);	
	const evenet_name = eventName.split(".")[0];

	client.on(event.name, (...args) => {
		event.run(client, ...args)
	});

	console.log(`[+] ${eventName} olayı başarıyla yüklendi.`)
}

/*                     LOADING SLASH COMMANDS                     */

//

client.once("ready", async() => {
	const rest = new Rest.REST({ version: "10" }).setToken(process.env.token);
  try {
    await rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
      body: client.commands,  //
    });
  } catch (error) {
    throw error;
  }
});

client.login(process.env.token).then(() => {
	console.log(`[-] Discord API'ye istek gönderiliyor.`)
    console.log(`[+] Discord API botu kabul etti`);
	eval("console.clear()")
}).catch(() => {
	console.log(`[x] Discord API botu reddetti`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return; // Botların mesajlarını yok sayar

    if (message.content.toLowerCase() === 'merhaba') {
        message.channel.send('Merhaba! Nasılsın?');
    } else if (message.content.toLowerCase() === 'nasılsın') {
        message.channel.send('Ben bir botum, bu yüzden her zaman iyiyim! Sana nasıl yardımcı olabilirim?');
    }
});

client.on('messageCreate', message => {
    if (message.author.bot) return; // Botların mesajlarını yok sayar

    if (message.content.toLowerCase().startsWith('/yaz')) {
        const text = message.content.slice(5).trim(); // =wyaz'ın sonrasındaki metni alır
        message.channel.send(text)
            .then(() => {
                message.delete(); // Mesajı siler
            })
            .catch(error => {
                console.error('Mesaj silinirken bir hata oluştu:', error);
            });
    }
});


client.on('message', message => {
  if (message.mentions.users.has(client.user.id)) {
 message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
  }
});

setInterval(() => {
  var links = db.get("UptimeLink");
  if (!links) return;
  links.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("Hata: " + e);
    }
  });
  console.log("Uptime başarılı")
}, 120000);