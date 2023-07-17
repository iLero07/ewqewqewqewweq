const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "say",
  description: " Sunucuda kaç üye olduğunu gösterir.",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const memberCount = interaction.guild.members.cache.filter((member) => !member.user.bot).size || 0
    const fakeMemberCount = interaction.guild.members.cache.filter((member) => new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime() < 1296000000).size || 0
    const botCount = interaction.guild.members.cache.filter((member) => member.user.bot).size || 0
    const permissionsMemberCount = interaction.guild.members.cache.filter((member) => member.permissions.has(PermissionsBitField.Flags.Administrator)).size || 0
	        const onlinekişi = interaction.guild.members.cache.filter(o => !o.user.bot && o.presence && o.presence.status === 'online').size
        const boştakişi = interaction.guild.members.cache.filter(o => !o.user.bot && o.presence && o.presence.status === 'idle').size
        const retmekişi = interaction.guild.members.cache.filter(o => !o.user.bot && o.presence && o.presence.status === 'dnd').size

    const embed = new EmbedBuilder()
    .setTitle('Al Mazrah Bot')
    .setFooter({text: interaction.user.tag+" İstedi."})
    .setDescription(`<a:giris:1120626782069076048> | Toplam Üye: **${interaction.guild.memberCount}** \n <:tik:1121054586778681455> | Gerçek: **${memberCount}**\n <:unlem:1121054576137740318> | Sahte: **${fakeMemberCount}**\n <:yapaybot:1121058764003483659> | Bot: **${botCount}**\n <:moderator:1121060629483098223> | Yönetici Yetkili: **${permissionsMemberCount}**`)
    .setColor("Random")
interaction.reply({embeds: [embed]})
  }  

};