const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
    name: "timeout-sistemi-sıfırla",
    description: " Timeout sistemini sıfırlarsın!",
    type: 1,
    options: [],

    run: async (client, interaction) => {
        // 
        const yetki = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("<:carpi:1121054581888139355> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`<:tik:1121054586778681455> | __**Timeout Sistemi**__ başarıyla sıfırlandı dostum!`)

        db.delete(`timeoutSistemi_${interaction.guild.id}`)
        return interaction.reply({ embeds: [basarili], ephemeral: true }).catch((e) => { })

    }

};