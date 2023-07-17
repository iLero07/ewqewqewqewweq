const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "destek-sistemi",
    description: " Destek sistemini ayarlarsın!",
    type: 1,
    options: [
        {
            name: "kanal",
            description: "Destek mesajının atılacağı kanalı ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "log-kanalı",
            description: "Destek kapatıldığında mesaj atılacacak kanalı ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "yetkili-rol",
            description: "Destek yetkilisini ayarlarsın!",
            type: 8,
            required: true,
        },
    ],
    // 
    run: async (client, interaction) => {

        const { user, customId, guild } = interaction;
        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("<:carpi:1121054581888139355> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        const ticketkanal = interaction.options.getChannel('kanal')
        const logkanal = interaction.options.getChannel('log-kanalı')
        const rol = interaction.options.getRole('yetkili-rol')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })
			
		        const ticketSystem = db.fetch(`ticketSystem_${interaction.guild.id}`)
        const ticketSystemDate = db.fetch(`ticketSystemDate_${interaction.guild.id}`)
        
        if (ticketSystem && ticketSystemDate) {
            const date = new EmbedBuilder()
            .setDescription(`<:carpi:1121054581888139355> | Bu sistem <t:${parseInt(ticketSystemDate.date / 1000)}:R> önce açılmış!`)
        
        return interaction.reply({ embeds: [date] })
        }

        const category = await guild.channels.create({
            name: 'Destek Katagorisi',
            type: Discord.ChannelType.GuildCategory,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [Discord.PermissionsBitField.Flags.ViewChannel],
              },
            ],
          });    

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`<:tik:1121054586778681455> | __**Destek Sistemi**__ başarıyla ayarlandı!\n\n 🤜 Destek Kanalı: ${ticketkanal}\n 🤜 Log Kanalı: ${logkanal}\n 🤜 Yetkili Rolü: ${rol}`)
            db.set(`ticketKanal_${interaction.guild.id}`, logkanal.id)
            db.set(`ticketSystem_${interaction.guild.id}`, { yetkili: rol.id, ticketchannel: ticketkanal.id })
            db.set(`ticketCategory_${interaction.guild.id}`, { category:  category.id, log: logkanal.id });
			db.set(`ticketSystemDate_${interaction.guild.id}`, { date: Date.now() })

            const menu = new Discord.EmbedBuilder()
            .setColor("000000")
            .setTitle("❓ | Destek talebi nasıl açabilirim?")
            .setDescription("> Aşağıdaki **Destek Talebi Oluştur** butonuna basarak destek talebi oluşturabilirsin!")
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setFooter({ text: "Al Mazrah" })
  
        const row11 = new Discord.ActionRowBuilder()
  
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1121056565059919932")
                    .setLabel("Destek Talebi Oluştur")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("ticketolustur_everyone"),
                new Discord.ButtonBuilder()
                    .setEmoji("1121054584786407464")
                    .setLabel("Nasıl oluşturabilirim?")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("ticketnasilacilir_everyone")
            )

            ticketkanal.send({ embeds: [menu], components: [row11] })
        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }

};