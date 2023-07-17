const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"giriş-çıkış",
    description: ' Giriş Çıkış Sistemini Ayarlarsın!',
    type:1,
    options: [
        {
            name: "kanal",
            description: "Giriş çıkış kanalını ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:carpi:1121054581888139355> | Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
   db.set(`hgbb_${interaction.guild.id}`, { channel: kanal2.id, } )
   interaction.reply("<:tik:1121054586778681455> | Hoşgeldin Güle Güle Kanalı Başarıyla <#"+kanal2+"> Olarak Ayarlandı!")
}

};
