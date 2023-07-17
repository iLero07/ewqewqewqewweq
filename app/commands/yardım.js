const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
const { createButton, deleteMessageButton } = require("../function/functions");
module.exports = {
  name: "yardım",
  description: " Botun yardım menüsüne bakarsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const embed = new EmbedBuilder()
    .setAuthor({ name: "Al Mazrah Yardım Menüsü", iconURL: client.user.displayAvatarURL({ dynamic: true })})
    .setTitle("・Hangi komutlarım hakkında bilgi almak istiyorsan o butona bas!")
    .setDescription("\n\n**<:baglant:1121054577802891294> Linkler**\n> <:yapaybot:1121058764003483659>・**Botun davet linki: [Tıkla](https://discord.com/oauth2/authorize?client_id=1107593033597337690&scope=bot&permissions=8)**\n> <:kanal:1121064005205774380> ・**Botun destek sunucusu: [Tıkla](https://discord.gg/TE42ArfHXW)**\n> <:ekle:1121056565059919932>・**Botun gizlilik politikası: [Tıkla](https://github.com/iLero07/gizlilik-politikasi)**\n> **<:info:1121070942496493698>・Botun kullanım koşulları: [Tıkla](https://github.com/iLero07/kullanim-kosullari/blob/main/README.md)**")    
    .setColor('Blue')
    const row1 = new Discord.ActionRowBuilder()

    .addComponents(
        new Discord.ButtonBuilder()
            .setEmoji("1039607060775571476")
            .setLabel("Moderasyon")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("moderasyon_"+interaction.user.id)
    )

    .addComponents(
        new Discord.ButtonBuilder()
            .setEmoji("1039607052340834354")
            .setLabel("Kayıt")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("kayıt_"+interaction.user.id)
    )

    .addComponents(
      new Discord.ButtonBuilder()
          .setEmoji("1039607059357913098")
          .setLabel("Kullanıcı")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setCustomId("kullanıcı_"+interaction.user.id)
  )
  .addComponents(
    new Discord.ButtonBuilder()
        .setEmoji("1039607040898781325")
        .setLabel("Sistemler")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setCustomId("sistemler_"+interaction.user.id)
)

  const row2 = new Discord.ActionRowBuilder()
  .addComponents(
            new Discord.ButtonBuilder()
            .setLabel("Koruma")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji("1044325545925672976")
            .setCustomId("korumasystem_"+interaction.user.id),
  )
  .addComponents(
    new Discord.ButtonBuilder()
        .setLabel("ㅤㅤㅤ")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setDisabled(true)
        .setCustomId("süsbuton2")
  )
  .addComponents(
    new Discord.ButtonBuilder()
        .setLabel("Ana Sayfa")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setEmoji('1044325564636471397')
        .setDisabled(true)
        .setCustomId("anasayfa_"+interaction.user.id)
  )  
  .addComponents(
    new Discord.ButtonBuilder()
        .setLabel("ㅤㅤㅤ")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setDisabled(true)
        .setCustomId("süsbuton3")
  )
  .addComponents(
    new Discord.ButtonBuilder()
        .setEmoji("1039607063443161158")
        .setLabel(" ")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setCustomId(".clearMessageButton_"+interaction.user.id)
)
   
   interaction.reply({embeds: [embed], components: [row1, row2]}).then(msg => {
    msg.createMessageComponentCollector(user => user.clicker.user.id == interaction.user.id).on('collect', async (button) => {

   })
   })
  }  

};